/**
 * Projenin TEK veri sözleşmesi.
 *
 * Faz 1'de `src/mocks/` bu tipleri doldurur, Faz 2'de `src/server/services/`.
 * Bileşenler yalnız buradaki tipleri tanır — `server/integrations/`'ı asla görmez.
 * Bu dosya değişmediği sürece entegrasyon eklendiğinde tek bir bileşen bile değişmez.
 */

// --- Piyasa ---------------------------------------------------------------

export type AssetType = "equity" | "index" | "crypto" | "commodity" | "fx";

export interface MarketQuote {
  symbol: string;
  name: string;
  assetType: AssetType;
  price: number;
  change: number;
  changePercent: number;
  /** Sparkline için kronolojik kapanış serisi (en eski → en yeni). */
  history: number[];
  updatedAt: string;
}

// --- Haber motoru ---------------------------------------------------------

export type SourceCategory = "markets" | "crypto" | "macro" | "tech";

export interface Source {
  id: string;
  name: string;
  slug: string;
  siteUrl: string;
  category: SourceCategory;
}

export interface Ticker {
  symbol: string;
  name: string;
  assetType: AssetType;
}

export interface Article {
  id: string;
  slug: string;
  source: Source;
  title: string;
  /** Yayıncının kendi sayfası. Toplayıcının okuru buraya göndermesi gerekir. */
  url: string;
  summary: string;
  /**
   * Sanitize edilmiş gövde metni — **çoğu zaman null.**
   * Yalnız yayıncı feed'de tam metni kendisi verdiyse dolu olur; 2B'de
   * denenen sekiz kaynağın hiçbiri vermiyor. Gövde çıkarımı bilinçli olarak
   * yapılmıyor (kaynakların kullanım şartları).
   */
  contentText: string | null;
  author: string | null;
  imageUrl: string | null;
  publishedAt: string;
  readingTimeMin: number;
  tickers: Ticker[];
  isBreaking: boolean;
}

// --- Topluluk duyarlılığı -------------------------------------------------

export type SentimentLabel = "bullish" | "bearish" | "neutral";

export interface Community {
  id: string;
  platform: "reddit" | "forum";
  name: string;
  displayName: string;
  subscriberCount: number;
}

export interface SentimentPost {
  id: string;
  community: Community;
  title: string;
  bodyText: string;
  author: string;
  score: number;
  commentCount: number;
  upvoteRatio: number;
  flair: string | null;
  postedAt: string;
  sentiment: {
    label: SentimentLabel;
    /** -1 (tam ayı) … +1 (tam boğa) */
    score: number;
  };
  tickers: Ticker[];
}

/** `ticker_sentiment_daily` rollup'ının UI karşılığı. */
export interface TickerSentiment {
  ticker: Ticker;
  mentionCount: number;
  bullishCount: number;
  bearishCount: number;
  /** -1 … +1 */
  avgScore: number;
  /** Önceki güne göre bahsedilme değişimi, yüzde. */
  mentionChangePercent: number;
}

export interface SentimentSummary {
  /** -1 … +1 — metrenin ibresi. */
  score: number;
  label: SentimentLabel;
  postCount: number;
  bullishCount: number;
  bearishCount: number;
  neutralCount: number;
  windowHours: number;
}

// --- Akademi --------------------------------------------------------------

export type TrackLevel = "beginner" | "intermediate" | "advanced";
export type StepStatus = "not_started" | "in_progress" | "completed";

export interface RoadmapStep {
  id: string;
  slug: string;
  trackSlug: string;
  title: string;
  summary: string;
  estimatedMin: number;
  orderIndex: number;
  /** DAG kenarları: bu adım açılmadan önce tamamlanması gerekenler. */
  prerequisiteIds: string[];
  status: StepStatus;
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: TrackLevel;
  steps: RoadmapStep[];
  completedSteps: number;
  totalSteps: number;
}

export interface VideoSuggestion {
  id: string;
  youtubeId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string | null;
  durationSec: number;
  publishedAt: string;
  /** Hangi adım için önerildiği — "günlük video" eşleştirmesi. */
  stepSlug: string;
  stepTitle: string;
}

// --- Ticker şeridi --------------------------------------------------------

export interface TickerItem {
  id: string;
  label: string;
  headline: string;
  isBreaking: boolean;
}
