/**
 * Çekim orkestrasyonu: kaynakları gez, feed'i al, yeni makaleleri yaz,
 * sembollerle ilişkilendir, her denemeyi `ingestion_runs`'a kaydet.
 *
 * **Yazma yolu.** Okuma yolundan (`server/services`) tamamen ayrı; ikisi yalnız
 * veritabanında buluşur. Bir kaynak çökse okuma yolu etkilenmez.
 */

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { articles, articleTickers, ingestionRuns, sources, tickers } from "@/lib/db/schema";
import { toArticleRow } from "@/server/integrations/rss/article";
import { fetchFeed } from "@/server/integrations/rss/feed";
import { buildMatchers, matchTickers } from "@/server/integrations/rss/tickers";

export interface SourceResult {
  source: string;
  status: "success" | "error";
  itemsSeen: number;
  itemsInserted: number;
  tickerLinks: number;
  error?: string;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return String(error);
}

async function ingestSource(
  source: { id: string; name: string; feedUrl: string },
  matchers: ReturnType<typeof buildMatchers>,
  tickerIdBySymbol: Map<string, string>,
): Promise<SourceResult> {
  // İşleyici kapsamı: bu yol haber tablolarına yazar, kimlik tablosuna
  // erişimi yoktur.
  const db = getDb("isleyici");

  const [run] = await db
    .insert(ingestionRuns)
    .values({ sourceId: source.id, status: "running" })
    .returning({ id: ingestionRuns.id });

  if (!run) throw new Error(`ingestion_runs satırı açılamadı: ${source.name}`);

  try {
    const items = await fetchFeed(source.feedUrl);

    // Feed kendi içinde aynı guid'i iki kez verebiliyor; tek komutta aynı
    // anahtarı iki kez göndermemek için önce burada tekilleştiriliyor.
    const unique = new Map(items.map((item) => [item.guid, item]));
    const rows = [...unique.values()].map((item) => toArticleRow(item, source.id));

    const inserted = rows.length
      ? await db
          .insert(articles)
          .values(rows)
          // Hedef belirtilmiyor: external_guid, slug ve url kısıtlarının
          // üçünü birden karşılasın. Zaten görülmüş makale sessizce atlanır.
          .onConflictDoNothing()
          .returning({ id: articles.id, slug: articles.slug })
      : [];

    // Yalnız YENİ makaleler için sembol araması yapılıyor.
    const insertedSlugs = new Set(inserted.map((row) => row.slug));
    const links: { articleId: string; tickerId: string }[] = [];
    const idBySlug = new Map(inserted.map((row) => [row.slug, row.id]));

    for (const row of rows) {
      if (!insertedSlugs.has(row.slug)) continue;
      const articleId = idBySlug.get(row.slug);
      if (!articleId) continue;

      for (const symbol of matchTickers(matchers, row.title, row.summary, row.contentText)) {
        const tickerId = tickerIdBySymbol.get(symbol);
        if (tickerId) links.push({ articleId, tickerId });
      }
    }

    if (links.length > 0) {
      await db.insert(articleTickers).values(links).onConflictDoNothing();
    }

    await db
      .update(ingestionRuns)
      .set({
        status: "success",
        finishedAt: new Date(),
        itemsSeen: rows.length,
        itemsInserted: inserted.length,
      })
      .where(eq(ingestionRuns.id, run.id));

    await db.update(sources).set({ lastFetchedAt: new Date() }).where(eq(sources.id, source.id));

    return {
      source: source.name,
      status: "success",
      itemsSeen: rows.length,
      itemsInserted: inserted.length,
      tickerLinks: links.length,
    };
  } catch (error) {
    const message = errorMessage(error);

    await db
      .update(ingestionRuns)
      .set({ status: "error", finishedAt: new Date(), error: message })
      .where(eq(ingestionRuns.id, run.id));

    // Bir kaynağın çökmesi turu bitirmez — hata kaydedilir, sıradakine geçilir.
    return {
      source: source.name,
      status: "error",
      itemsSeen: 0,
      itemsInserted: 0,
      tickerLinks: 0,
      error: message,
    };
  }
}

/** Tüm aktif kaynakları sırayla tarar. Sonuç her kaynak için bir satır. */
export async function ingestAllSources(): Promise<SourceResult[]> {
  const db = getDb("isleyici");

  const [activeSources, tickerRows] = await Promise.all([
    db
      .select({ id: sources.id, name: sources.name, feedUrl: sources.feedUrl })
      .from(sources)
      .where(eq(sources.isActive, true)),
    db
      .select({
        id: tickers.id,
        symbol: tickers.symbol,
        name: tickers.name,
        assetType: tickers.assetType,
      })
      .from(tickers),
  ]);

  const matchers = buildMatchers(tickerRows);
  const tickerIdBySymbol = new Map(tickerRows.map((row) => [row.symbol, row.id]));

  const results: SourceResult[] = [];
  // Sıralı: sekiz kaynağa aynı anda yüklenmek engellenme riskini artırır ve
  // kazanç yok — bu iş kullanıcıyı bekletmiyor.
  for (const source of activeSources) {
    results.push(await ingestSource(source, matchers, tickerIdBySymbol));
  }

  return results;
}
