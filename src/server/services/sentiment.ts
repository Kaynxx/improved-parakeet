import {
  findRecentPosts,
  findSentimentSummary,
  findTrendingTickers,
} from "@/lib/db/queries/sentiment";
import type { SentimentPost, SentimentSummary, TickerSentiment } from "@/types";

export async function getRecentPosts(limit = 20): Promise<SentimentPost[]> {
  return findRecentPosts(limit);
}

export async function getSentimentSummary(): Promise<SentimentSummary> {
  return findSentimentSummary();
}

export async function getTrendingTickers(limit = 6): Promise<TickerSentiment[]> {
  return findTrendingTickers(limit);
}
