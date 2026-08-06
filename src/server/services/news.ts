/**
 * Haber servisi — kaynak: **Postgres** (Faz 2A).
 *
 * 2B'ye kadar `articles` tablosu boş kalır; haber panelleri EmptyState gösterir.
 * Bu beklenen davranış: mock makaleleri seed etmek sahte satırları gerçek gibi
 * gösterirdi ve 2B geldiğinde hangisinin seed olduğu karışırdı.
 */

import {
  findActiveSources,
  findArticleBySlug,
  findLatestArticles,
  findLatestDiverseArticles,
} from "@/lib/db/queries/news";
import type { Article, Source, TickerItem } from "@/types";

/** Tam liste, en yeniden eskiye. Haberler sayfası bunu kullanır. */
export function getLatestArticles(limit = 20): Promise<Article[]> {
  return findLatestArticles(limit);
}

/**
 * Panel özeti: kaynak başına en fazla iki başlık. Panelin işi "her kaynakta ne
 * var" sorusunu bir bakışta cevaplamak; tek kaynağın akışı basması bunu bozar.
 */
export function getDiverseArticles(limit = 6): Promise<Article[]> {
  return findLatestDiverseArticles(limit);
}

/** İzlenen kaynaklar — haber akışı boşken neyin beklendiğini göstermek için. */
export function getWatchedSources(): Promise<Source[]> {
  return findActiveSources();
}

export function getArticleBySlug(slug: string): Promise<Article | null> {
  return findArticleBySlug(slug);
}

/**
 * Üst şeritteki kayan başlıklar. Ayrı bir veri kaynağı değil — son makalelerden
 * türetiliyor, çünkü şeridin işi zaten "şu an ne var" sorusunu cevaplamak.
 * `articles` boşken şerit de boş döner ve `NewsTicker` hiç render edilmez.
 */
export async function getTickerItems(limit = 10): Promise<TickerItem[]> {
  // Şerit de çeşitlilik gözetir: aynı kaynağın on başlığı kayarsa şerit
  // "piyasada ne oluyor" değil "Seeking Alpha ne yazdı" anlatır.
  const articles = await findLatestDiverseArticles(limit);
  return articles.map((article) => ({
    id: article.id,
    label: article.tickers[0]?.symbol ?? article.source.name,
    headline: article.title,
    isBreaking: article.isBreaking,
  }));
}
