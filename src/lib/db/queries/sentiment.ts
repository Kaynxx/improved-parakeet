import { asc, eq, inArray, lte } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { communities, communityPosts, postTickers, tickers } from "@/lib/db/schema";
import type {
  Community,
  SentimentLabel,
  SentimentPost,
  SentimentSummary,
  Ticker,
  TickerSentiment,
} from "@/types";
import {
  type ActiveSentimentPost,
  buildSentimentSummary,
  buildTickerSentiments,
  postedAtFromOffset,
} from "./sentiment.logic";

const ACTIVE_WINDOW_MINUTES = 24 * 60;

const postColumns = {
  id: communityPosts.id,
  communityId: communities.id,
  communityPlatform: communities.platform,
  communityName: communities.name,
  communityDisplayName: communities.displayName,
  communitySubscriberCount: communities.subscriberCount,
  title: communityPosts.title,
  bodyText: communityPosts.bodyText,
  author: communityPosts.author,
  score: communityPosts.score,
  commentCount: communityPosts.commentCount,
  upvoteRatio: communityPosts.upvoteRatio,
  flair: communityPosts.flair,
  minutesAgoOffset: communityPosts.minutesAgoOffset,
  sentimentLabel: communityPosts.sentimentLabel,
  sentimentScore: communityPosts.sentimentScore,
};

interface PostRow {
  id: string;
  communityId: string;
  communityPlatform: string;
  communityName: string;
  communityDisplayName: string;
  communitySubscriberCount: number;
  title: string;
  bodyText: string;
  author: string;
  score: number;
  commentCount: number;
  upvoteRatio: number;
  flair: string | null;
  minutesAgoOffset: number;
  sentimentLabel: SentimentLabel;
  sentimentScore: number;
}

interface ActivePostRow {
  id: string;
  minutesAgoOffset: number;
  sentimentLabel: SentimentLabel;
  sentimentScore: number;
}

function toCommunityPlatform(platform: string): Community["platform"] {
  if (platform === "reddit" || platform === "forum") return platform;
  throw new Error(`Desteklenmeyen topluluk platformu: ${platform}`);
}

async function tickersByPost(postIds: string[]): Promise<Map<string, Ticker[]>> {
  const grouped = new Map<string, Ticker[]>();
  if (postIds.length === 0) return grouped;

  const rows = await getDb()
    .select({
      postId: postTickers.postId,
      symbol: tickers.symbol,
      name: tickers.name,
      assetType: tickers.assetType,
    })
    .from(postTickers)
    .innerJoin(tickers, eq(postTickers.tickerId, tickers.id))
    .where(inArray(postTickers.postId, postIds))
    .orderBy(asc(postTickers.postId), asc(tickers.symbol));

  for (const row of rows) {
    const list = grouped.get(row.postId) ?? [];
    list.push({ symbol: row.symbol, name: row.name, assetType: row.assetType });
    grouped.set(row.postId, list);
  }

  return grouped;
}

async function findActivePostRows(): Promise<ActivePostRow[]> {
  return getDb()
    .select({
      id: communityPosts.id,
      minutesAgoOffset: communityPosts.minutesAgoOffset,
      sentimentLabel: communityPosts.sentimentLabel,
      sentimentScore: communityPosts.sentimentScore,
    })
    .from(communityPosts)
    .where(lte(communityPosts.minutesAgoOffset, ACTIVE_WINDOW_MINUTES))
    .orderBy(asc(communityPosts.minutesAgoOffset), asc(communityPosts.id));
}

function toActivePost(row: ActivePostRow, tickerList: Ticker[]): ActiveSentimentPost {
  return {
    id: row.id,
    minutesAgoOffset: row.minutesAgoOffset,
    sentimentLabel: row.sentimentLabel,
    sentimentScore: row.sentimentScore,
    tickers: tickerList,
  };
}

function toSentimentPost(row: PostRow, tickerList: Ticker[], now: number): SentimentPost {
  return {
    id: row.id,
    community: {
      id: row.communityId,
      platform: toCommunityPlatform(row.communityPlatform),
      name: row.communityName,
      displayName: row.communityDisplayName,
      subscriberCount: row.communitySubscriberCount,
    },
    title: row.title,
    bodyText: row.bodyText,
    author: row.author,
    score: row.score,
    commentCount: row.commentCount,
    upvoteRatio: row.upvoteRatio,
    flair: row.flair,
    postedAt: postedAtFromOffset(now, row.minutesAgoOffset),
    sentiment: {
      label: row.sentimentLabel,
      score: row.sentimentScore,
    },
    tickers: tickerList,
  };
}

export async function findRecentPosts(limit: number): Promise<SentimentPost[]> {
  const normalizedLimit = Math.trunc(limit);
  if (!Number.isFinite(normalizedLimit) || normalizedLimit <= 0) return [];

  const rows = await getDb()
    .select(postColumns)
    .from(communityPosts)
    .innerJoin(communities, eq(communityPosts.communityId, communities.id))
    .orderBy(asc(communityPosts.minutesAgoOffset), asc(communityPosts.id))
    .limit(normalizedLimit);

  const grouped = await tickersByPost(rows.map((row) => row.id));
  const now = Date.now();
  return rows.map((row) => toSentimentPost(row, grouped.get(row.id) ?? [], now));
}

export async function findSentimentSummary(): Promise<SentimentSummary> {
  const rows = await findActivePostRows();
  return buildSentimentSummary(rows.map((row) => toActivePost(row, [])));
}

export async function findTrendingTickers(limit: number): Promise<TickerSentiment[]> {
  const normalizedLimit = Math.trunc(limit);
  if (!Number.isFinite(normalizedLimit) || normalizedLimit <= 0) return [];

  const rows = await findActivePostRows();
  const grouped = await tickersByPost(rows.map((row) => row.id));
  const posts = rows.map((row) => toActivePost(row, grouped.get(row.id) ?? []));
  return buildTickerSentiments(posts, normalizedLimit);
}
