import { and, asc, desc, eq, gte, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { marketDaily, marketQuotes } from "@/lib/db/schema";
import type { MarketQuote } from "@/types";

/** Sparkline penceresi. Seri worker biriktirdikçe bu uzunluğa doğru dolar. */
const GUN_SAYISI = 30;

export interface YazilacakFiyat {
  symbol: string;
  name: string;
  assetType: MarketQuote["assetType"];
  providerSymbol: string;
  proxyFor: string | null;
  price: number;
  change: number;
  changePercent: number;
}

/**
 * Son durumu yazar ve o günün kapanışını günceller.
 *
 * İki tablo tek işlemde: yalnız biri yazılırsa panel fiyatı bugünün sparkline
 * noktasıyla çelişirdi.
 *
 * Gün, **sunucunun yerel takvim günü değil** `Europe/Istanbul` günü olarak
 * hesaplanıyor; sunucu UTC'de çalışırken gece yarısından sonraki fiyat bir
 * önceki güne yazılırdı.
 */
export async function upsertMarketQuotes(fiyatlar: YazilacakFiyat[]): Promise<void> {
  if (fiyatlar.length === 0) return;

  const gun = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const simdi = new Date();

  // Yazma yolu işleyici kapsamında: web rolünün piyasa tablolarına yazma
  // yetkisi yok ve olmamalı.
  await getDb("isleyici").transaction(async (tx) => {
    for (const f of fiyatlar) {
      await tx
        .insert(marketQuotes)
        .values({
          symbol: f.symbol,
          name: f.name,
          assetType: f.assetType,
          providerSymbol: f.providerSymbol,
          proxyFor: f.proxyFor,
          price: f.price,
          change: f.change,
          changePercent: f.changePercent,
          fetchedAt: simdi,
        })
        .onConflictDoUpdate({
          target: marketQuotes.symbol,
          set: {
            name: f.name,
            assetType: f.assetType,
            providerSymbol: f.providerSymbol,
            proxyFor: f.proxyFor,
            price: f.price,
            change: f.change,
            changePercent: f.changePercent,
            fetchedAt: simdi,
          },
        });

      // Gün içinde "kapanış" son görülen fiyat; gün bitince değer donar.
      await tx
        .insert(marketDaily)
        .values({ symbol: f.symbol, day: gun, close: f.price, updatedAt: simdi })
        .onConflictDoUpdate({
          target: [marketDaily.symbol, marketDaily.day],
          set: { close: f.price, updatedAt: simdi },
        });
    }
  });
}

/**
 * Panelin okuduğu tek sorgu: son fiyatlar + biriken günlük seri.
 *
 * Seri ayrı sorguyla çekilip eşleştiriliyor — tek JOIN'de her sparkline
 * noktası için fiyat satırı tekrarlanırdı (`news.ts`'teki sembol deseninin
 * aynısı).
 */
export async function findMarketQuotes(): Promise<MarketQuote[]> {
  const quotes = await getDb().select().from(marketQuotes).orderBy(asc(marketQuotes.symbol));

  if (quotes.length === 0) return [];

  const esik = new Date();
  esik.setUTCDate(esik.getUTCDate() - GUN_SAYISI);
  const esikGun = esik.toISOString().slice(0, 10);

  const gunler = await getDb()
    .select({ symbol: marketDaily.symbol, day: marketDaily.day, close: marketDaily.close })
    .from(marketDaily)
    .where(
      and(
        inArray(
          marketDaily.symbol,
          quotes.map((q) => q.symbol),
        ),
        gte(marketDaily.day, esikGun),
      ),
    )
    .orderBy(asc(marketDaily.symbol), asc(marketDaily.day));

  const seriBySymbol = new Map<string, number[]>();
  for (const satir of gunler) {
    const liste = seriBySymbol.get(satir.symbol) ?? [];
    liste.push(satir.close);
    seriBySymbol.set(satir.symbol, liste);
  }

  return quotes.map((q) => ({
    symbol: q.symbol,
    name: q.name,
    assetType: q.assetType,
    proxyFor: q.proxyFor,
    price: q.price,
    change: q.change,
    changePercent: q.changePercent,
    history: seriBySymbol.get(q.symbol) ?? [],
    updatedAt: q.fetchedAt.toISOString(),
  }));
}

/** Kaç günlük seri birikti — panelin sparkline penceresini dürüst yazması için. */
export async function findHistoryDepth(): Promise<number> {
  const satirlar = await getDb()
    .selectDistinct({ day: marketDaily.day })
    .from(marketDaily)
    .orderBy(desc(marketDaily.day))
    .limit(GUN_SAYISI);

  return satirlar.length;
}

/** Yalnız test/bakım: bir sembolün serisini okur. */
export async function findDailySeries(symbol: string): Promise<{ day: string; close: number }[]> {
  return getDb()
    .select({ day: marketDaily.day, close: marketDaily.close })
    .from(marketDaily)
    .where(eq(marketDaily.symbol, symbol))
    .orderBy(asc(marketDaily.day));
}
