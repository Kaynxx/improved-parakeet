import { asc, desc, eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { articles, articleTickers, sources, tickers } from "@/lib/db/schema";
import type { Article, Source, SourceCategory, Ticker } from "@/types";

/**
 * Makale satırı + kaynağı. Semboller ayrı bir sorguyla çekilip eşleştiriliyor —
 * tek JOIN ile çekilse her sembol için makale satırı tekrarlanır ve satır sayısı
 * gereksiz şişer.
 */
const articleColumns = {
  id: articles.id,
  slug: articles.slug,
  title: articles.title,
  url: articles.url,
  summary: articles.summary,
  contentText: articles.contentText,
  author: articles.author,
  imageUrl: articles.imageUrl,
  publishedAt: articles.publishedAt,
  readingTimeMin: articles.readingTimeMin,
  isBreaking: articles.isBreaking,
  sourceId: sources.id,
  sourceName: sources.name,
  sourceSlug: sources.slug,
  sourceSiteUrl: sources.siteUrl,
  sourceCategory: sources.category,
};

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  url: string;
  summary: string | null;
  contentText: string | null;
  author: string | null;
  imageUrl: string | null;
  publishedAt: Date;
  readingTimeMin: number;
  isBreaking: boolean;
  sourceId: string;
  sourceName: string;
  sourceSlug: string;
  sourceSiteUrl: string;
  sourceCategory: SourceCategory;
}

async function tickersByArticle(articleIds: string[]): Promise<Map<string, Ticker[]>> {
  const grouped = new Map<string, Ticker[]>();
  if (articleIds.length === 0) return grouped;

  const rows = await getDb()
    .select({
      articleId: articleTickers.articleId,
      symbol: tickers.symbol,
      name: tickers.name,
      assetType: tickers.assetType,
    })
    .from(articleTickers)
    .innerJoin(tickers, eq(articleTickers.tickerId, tickers.id))
    .where(inArray(articleTickers.articleId, articleIds));

  for (const row of rows) {
    const list = grouped.get(row.articleId) ?? [];
    list.push({ symbol: row.symbol, name: row.name, assetType: row.assetType });
    grouped.set(row.articleId, list);
  }
  return grouped;
}

function toArticle(row: ArticleRow, tickerList: Ticker[]): Article {
  return {
    id: row.id,
    slug: row.slug,
    source: {
      id: row.sourceId,
      name: row.sourceName,
      slug: row.sourceSlug,
      siteUrl: row.sourceSiteUrl,
      category: row.sourceCategory,
    },
    title: row.title,
    url: row.url,
    summary: row.summary ?? "",
    // Boş dizeye çevirmek yok: gövdenin olmaması gerçek bir durum ve UI'ın
    // bunu bilmesi gerekiyor.
    contentText: row.contentText,
    author: row.author,
    imageUrl: row.imageUrl,
    publishedAt: row.publishedAt.toISOString(),
    readingTimeMin: row.readingTimeMin,
    tickers: tickerList,
    isBreaking: row.isBreaking,
  };
}

export async function findLatestArticles(limit: number): Promise<Article[]> {
  const rows = await getDb()
    .select(articleColumns)
    .from(articles)
    .innerJoin(sources, eq(articles.sourceId, sources.id))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);

  const grouped = await tickersByArticle(rows.map((row) => row.id));
  return rows.map((row) => toArticle(row, grouped.get(row.id) ?? []));
}

/**
 * Kaynak çeşitliliği gözeten son makaleler.
 *
 * Düz `order by published_at desc` panelde işe yaramıyor: Seeking Alpha gibi
 * kaynaklar onlarca kaydı aynı damgayla döküyor ve altı satırın altısını da
 * kendisi dolduruyor. Tek kaynağı gösteren şey toplayıcı değildir.
 *
 * Pencere fonksiyonu yerine geniş bir dilim çekip JS'te seçiyoruz: satır sayısı
 * küçük, mantık okunur ve "kaynak başına en fazla kaç" kuralı tek yerde.
 */
export async function findLatestDiverseArticles(
  limit: number,
  maxPerSource = 2,
): Promise<Article[]> {
  const pool = await findLatestArticles(Math.max(limit * 6, 60));

  const takenBySource = new Map<string, number>();
  const picked: Article[] = [];

  for (const article of pool) {
    if (picked.length >= limit) break;
    const taken = takenBySource.get(article.source.id) ?? 0;
    if (taken >= maxPerSource) continue;
    takenBySource.set(article.source.id, taken + 1);
    picked.push(article);
  }

  // Kaynak kotası yüzünden liste dolmadıysa kalanı sırayla tamamla —
  // az kaynak varken panel yarı boş kalmasın.
  if (picked.length < limit) {
    const chosen = new Set(picked.map((a) => a.id));
    for (const article of pool) {
      if (picked.length >= limit) break;
      if (!chosen.has(article.id)) picked.push(article);
    }
  }

  return picked;
}

/** İzlenen kaynaklar. Boş haber panelinin "ne bekleniyor" sorusunu cevaplar. */
export async function findActiveSources(): Promise<Source[]> {
  const rows = await getDb()
    .select({
      id: sources.id,
      name: sources.name,
      slug: sources.slug,
      siteUrl: sources.siteUrl,
      category: sources.category,
    })
    .from(sources)
    .where(eq(sources.isActive, true))
    .orderBy(asc(sources.name));

  return rows;
}

export async function findArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await getDb()
    .select(articleColumns)
    .from(articles)
    .innerJoin(sources, eq(articles.sourceId, sources.id))
    .where(eq(articles.slug, slug))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const grouped = await tickersByArticle([row.id]);
  return toArticle(row, grouped.get(row.id) ?? []);
}
