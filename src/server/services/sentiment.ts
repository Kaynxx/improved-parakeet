/**
 * Topluluk duyarlılığı servisi — kaynak: **mock** (Faz 2C'de Postgres'e geçer).
 *
 * `communities`, `posts`, `post_sentiment`, `post_tickers` ve
 * `ticker_sentiment_daily` tabloları 2C'de kurulacak. O gün yalnız bu dosyanın
 * gövdesi değişir; imzalar, tipler, sayfalar ve bileşenler sabit kalır.
 */

import { sentimentPosts, sentimentSummary, tickerSentiments } from "@/mocks";
import type { SentimentPost, SentimentSummary, TickerSentiment } from "@/types";

export async function getRecentPosts(limit = 20): Promise<SentimentPost[]> {
  return sentimentPosts.slice(0, limit);
}

export async function getSentimentSummary(): Promise<SentimentSummary> {
  return sentimentSummary;
}

export async function getTrendingTickers(limit = 6): Promise<TickerSentiment[]> {
  return tickerSentiments.slice(0, limit);
}
