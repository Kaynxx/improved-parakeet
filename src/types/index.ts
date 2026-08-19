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
  /**
   * Vekil ise neyin yerine durduğu (`S&P 500` gibi), değilse null.
   *
   * Gerçek endeks değerleri lisanslı veri; SPX/NDX yerine ETF vekili (SPY/QQQ)
   * izleniyor ve fiyat ölçekleri farklı. Kart "S&P 500" deyip 773 gösterirse
   * yalan söyler, bu yüzden vekillik arayüze kadar taşınıyor.
   */
  proxyFor: string | null;
  price: number;
  change: number;
  changePercent: number;
  /**
   * Sparkline için kronolojik günlük kapanış serisi (en eski → en yeni).
   *
   * **Baştan dolu gelmez.** Sağlayıcının ücretsiz katmanında geçmiş seri yok;
   * bu dizi worker her gün bir nokta ekledikçe uzar ve 30 günde dolar.
   */
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

/**
 * Beş aşama, her biri **gözlenebilir bir olaya** bağlı — "anladım" gibi bir
 * hisse değil. `answered` ve sonrası 2F'de (sorular + AI değerlendirmesi)
 * yazılmaya başlar; 2E yalnız okuma yolunu kurar.
 */
export type StepStatus =
  /** Hiç açılmadı. */
  | "not_started"
  /** Ders açıldı. */
  | "reading"
  /** Sorular dolduruldu. */
  | "answered"
  /** AI geri bildirimi geldi. */
  | "reviewed"
  /** Ortalama skor ≥ 70. */
  | "mastered";

export interface RoadmapStep {
  id: string;
  slug: string;
  weekSlug: string;
  title: string;
  summary: string;
  estimatedMin: number;
  orderIndex: number;
  /** DAG kenarları: bu ders açılmadan önce tamamlanması gerekenler. */
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

// --- Destekleyici kaynaklar -----------------------------------------------

export type SourceKind = "video" | "article" | "discussion";
export type SourceLevel = "orta" | "ileri" | "uzman";

export interface LessonSource {
  id: string;
  kind: SourceKind;
  title: string;
  url: string;
  provider: string | null;
  /**
   * Doluysa video kendi sayfamızda gömülü oynatılır; boşsa yalnız bağlantı
   * verilir. YouTube dışı video kaynakları için null kalır.
   */
  youtubeId: string | null;
  durationLabel: string | null;
  level: SourceLevel;
  summary: string;
}

// --- Sorular ve cevaplar ---------------------------------------------------

export type PromptKind = "acik" | "sayisal" | "tahmin";

export interface LessonPrompt {
  id: string;
  key: string;
  kind: PromptKind;
  points: number;
  promptMd: string;
  /** `acik` sorularda dolu; AI değerlendirmesinin tek dayanağı. */
  rubricMd: string | null;
  expectedNumeric: string | null;
  tolerance: string | null;
}

export interface AnswerFeedback {
  model: string;
  score: number;
  strengths: string[];
  gaps: string[];
  feedbackMd: string;
  followUp: string | null;
  createdAt: string;
}

/** Bir sorunun kullanıcıya görünen tam hali: soru + cevabı + değerlendirmesi. */
export interface PromptWithAnswer {
  prompt: LessonPrompt;
  answer: { id: string; body: string; updatedAt: string } | null;
  feedback: AnswerFeedback | null;
}

/**
 * Günün video önerisi. Kaynağı **akademi dersleridir** — ayrı bir video tablosu
 * ya da YouTube Data API yok.
 *
 * Alanlar `lesson_sources`'un gerçekten tuttuklarıyla sınırlı. Önceki sürüm
 * `durationSec`, `publishedAt` ve `thumbnailUrl` taşıyordu; üçünün de karşılığı
 * yok, çünkü tip mock'un şeklinden türetilmişti. Süre `lesson_sources` tarafında
 * "42 dk" gibi serbest metin (`durationLabel`) olarak duruyor.
 */
export interface VideoSuggestion {
  id: string;
  youtubeId: string;
  title: string;
  /** Kanal / yayıncı adı. Kaynak dosyası vermemişse null. */
  channelTitle: string | null;
  durationLabel: string | null;
  level: SourceLevel;
  summary: string;
  /** Videonun ait olduğu ders — kart oraya götürür. */
  weekSlug: string;
  lessonSlug: string;
  lessonTitle: string;
}

// --- Ticker şeridi --------------------------------------------------------

export interface TickerItem {
  id: string;
  label: string;
  headline: string;
  isBreaking: boolean;
}

// --- Kimlik ---------------------------------------------------------------

/**
 * Kabuğun ihtiyaç duyduğu kullanıcı alanları. Auth.js'in `Session["user"]`
 * tipini bileşenlere sızdırmamak için ayrı: bileşenler Auth.js'i tanımaz,
 * sağlayıcı değişirse burada tek bir eşleme güncellenir.
 */
export interface SessionUser {
  name: string | null;
  email: string;
  image: string | null;
}
