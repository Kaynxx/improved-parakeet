/**
 * Henüz kendi dilimi gelmemiş modüllerin verisi.
 *
 * **Küçülüyor, büyümüyor.** 2A akademiyi, 2B haberleri gerçek veriye taşıdı;
 * makale ve ticker-şeridi mock'ları o noktada silindi. Kalanlar:
 * topluluk (2C), video (2D), piyasa (2F) ve akademi parçaları — sonuncusu
 * yalnız `getActiveTrack()` yardımcısı için duruyor.
 *
 * Burada hiçbir ağ çağrısı yok — modül tamamen statiktir.
 */

import type {
  Community,
  MarketQuote,
  SentimentPost,
  SentimentSummary,
  Ticker,
  TickerSentiment,
  Track,
  VideoSuggestion,
} from "@/types";

const NOW = Date.now();

/** n dakika önceyi ISO olarak verir — mock zaman damgaları modül yüklenirken sabitlenir. */
function ago(minutes: number): string {
  return new Date(NOW - minutes * 60_000).toISOString();
}

// --- Semboller ------------------------------------------------------------

const tickers = {
  SPX: { symbol: "SPX", name: "S&P 500", assetType: "index" },
  NVDA: { symbol: "NVDA", name: "NVIDIA Corp.", assetType: "equity" },
  AAPL: { symbol: "AAPL", name: "Apple Inc.", assetType: "equity" },
  TSLA: { symbol: "TSLA", name: "Tesla Inc.", assetType: "equity" },
  BTC: { symbol: "BTC", name: "Bitcoin", assetType: "crypto" },
  ETH: { symbol: "ETH", name: "Ethereum", assetType: "crypto" },
  XAU: { symbol: "XAU", name: "Altın (ons)", assetType: "commodity" },
  MSFT: { symbol: "MSFT", name: "Microsoft Corp.", assetType: "equity" },
} satisfies Record<string, Ticker>;

// --- Piyasa özeti ---------------------------------------------------------

export const marketQuotes: MarketQuote[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    assetType: "index",
    price: 6482.31,
    change: 41.18,
    changePercent: 0.64,
    history: [
      6428, 6431, 6425, 6439, 6444, 6437, 6449, 6455, 6451, 6462, 6458, 6466, 6471, 6465, 6474,
      6469, 6478, 6483, 6477, 6486, 6480, 6488, 6479, 6482,
    ],
    updatedAt: ago(2),
  },
  {
    symbol: "NDX",
    name: "Nasdaq 100",
    assetType: "index",
    price: 23914.7,
    change: 212.44,
    changePercent: 0.9,
    history: [
      23640, 23668, 23652, 23701, 23689, 23724, 23755, 23738, 23779, 23762, 23806, 23791, 23833,
      23812, 23857, 23841, 23879, 23864, 23901, 23886, 23923, 23898, 23930, 23915,
    ],
    updatedAt: ago(2),
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    assetType: "crypto",
    price: 91248.62,
    change: -2734.9,
    changePercent: -2.91,
    history: [
      94120, 94380, 93940, 94210, 93760, 93980, 93420, 93610, 92980, 93240, 92610, 92880, 92310,
      92540, 91980, 92220, 91760, 91940, 91480, 91690, 91220, 91410, 91060, 91249,
    ],
    updatedAt: ago(1),
  },
  {
    symbol: "XAU",
    name: "Altın",
    assetType: "commodity",
    price: 3421.85,
    change: 18.62,
    changePercent: 0.55,
    history: [
      3398, 3402, 3396, 3407, 3403, 3411, 3406, 3414, 3409, 3417, 3412, 3419, 3415, 3422, 3417,
      3424, 3419, 3426, 3421, 3428, 3423, 3429, 3424, 3422,
    ],
    updatedAt: ago(3),
  },
  {
    symbol: "EURUSD",
    name: "EUR/USD",
    assetType: "fx",
    price: 1.0842,
    change: -0.0009,
    changePercent: -0.08,
    history: [
      1.0856, 1.0859, 1.0853, 1.0857, 1.0851, 1.0854, 1.0849, 1.0852, 1.0847, 1.085, 1.0845, 1.0848,
      1.0844, 1.0847, 1.0843, 1.0846, 1.0841, 1.0844, 1.084, 1.0843, 1.0839, 1.0842, 1.0838, 1.0842,
    ],
    updatedAt: ago(1),
  },
];

// --- Topluluk -------------------------------------------------------------

const communities = {
  investing: {
    id: "com-1",
    platform: "reddit",
    name: "r/investing",
    displayName: "Investing",
    subscriberCount: 2_940_000,
  },
  wsb: {
    id: "com-2",
    platform: "reddit",
    name: "r/wallstreetbets",
    displayName: "WallStreetBets",
    subscriberCount: 17_200_000,
  },
  stocks: {
    id: "com-3",
    platform: "reddit",
    name: "r/stocks",
    displayName: "Stocks",
    subscriberCount: 8_100_000,
  },
  cryptocurrency: {
    id: "com-4",
    platform: "reddit",
    name: "r/CryptoCurrency",
    displayName: "CryptoCurrency",
    subscriberCount: 9_600_000,
  },
} satisfies Record<string, Community>;

export const sentimentPosts: SentimentPost[] = [
  {
    id: "post-1",
    community: communities.wsb,
    title: "NVDA guidance was fine, the market just wanted a miracle",
    bodyText:
      "Sequential data-center growth of 18% is absurd for a company this size. Everyone anchoring on the whisper number is going to look silly in two quarters.",
    author: "u/theta_gang_survivor",
    score: 4820,
    commentCount: 1146,
    upvoteRatio: 0.91,
    flair: "DD",
    postedAt: ago(38),
    sentiment: { label: "bullish", score: 0.72 },
    tickers: [tickers.NVDA],
  },
  {
    id: "post-2",
    community: communities.cryptocurrency,
    title: "Four days of ETF outflows and nobody is talking about it",
    bodyText:
      "This is the longest redemption streak since launch. Either the marginal buyer is gone or someone big is rotating out. Neither reading is comfortable.",
    author: "u/onchain_only",
    score: 3140,
    commentCount: 892,
    upvoteRatio: 0.78,
    flair: "DISCUSSION",
    postedAt: ago(64),
    sentiment: { label: "bearish", score: -0.68 },
    tickers: [tickers.BTC],
  },
  {
    id: "post-3",
    community: communities.investing,
    title: "The Fed statement changed three words and the whole curve moved",
    bodyText:
      "Dropping the reference to additional firming is not nothing. Rates desks clearly read it as the end of the hiking discussion.",
    author: "u/macro_and_chill",
    score: 2210,
    commentCount: 417,
    upvoteRatio: 0.94,
    flair: "Discussion",
    postedAt: ago(21),
    sentiment: { label: "bullish", score: 0.41 },
    tickers: [tickers.SPX],
  },
  {
    id: "post-4",
    community: communities.stocks,
    title: "Is anyone else uncomfortable with how narrow breadth has gotten?",
    bodyText:
      "Under 200 names above their 50-day while the index prints highs. I have seen this movie before and I did not like the ending.",
    author: "u/breadth_watcher",
    score: 1870,
    commentCount: 603,
    upvoteRatio: 0.83,
    flair: null,
    postedAt: ago(96),
    sentiment: { label: "bearish", score: -0.52 },
    tickers: [tickers.SPX, tickers.NVDA],
  },
  {
    id: "post-5",
    community: communities.stocks,
    title: "TSLA European share loss is real but the bear case is overcooked",
    bodyText:
      "Margin compression is priced. What is not priced is the energy storage segment, which nobody in this thread ever models.",
    author: "u/ev_supply_chain",
    score: 1420,
    commentCount: 508,
    upvoteRatio: 0.66,
    flair: "Industry Discussion",
    postedAt: ago(151),
    sentiment: { label: "neutral", score: 0.06 },
    tickers: [tickers.TSLA],
  },
  {
    id: "post-6",
    community: communities.investing,
    title: "Staking yields are compressing and that changes the ETH thesis",
    bodyText:
      "If the risk-free comparison stays where it is, the yield argument for holding stops working. The queue length is the number to watch.",
    author: "u/duration_risk",
    score: 980,
    commentCount: 244,
    upvoteRatio: 0.72,
    flair: null,
    postedAt: ago(233),
    sentiment: { label: "bearish", score: -0.34 },
    tickers: [tickers.ETH],
  },
];

export const sentimentSummary: SentimentSummary = {
  score: -0.14,
  label: "neutral",
  postCount: 3812,
  bullishCount: 1402,
  bearishCount: 1687,
  neutralCount: 723,
  windowHours: 24,
};

export const tickerSentiments: TickerSentiment[] = [
  {
    ticker: tickers.NVDA,
    mentionCount: 1284,
    bullishCount: 812,
    bearishCount: 331,
    avgScore: 0.44,
    mentionChangePercent: 62.4,
  },
  {
    ticker: tickers.BTC,
    mentionCount: 966,
    bullishCount: 288,
    bearishCount: 574,
    avgScore: -0.39,
    mentionChangePercent: 41.7,
  },
  {
    ticker: tickers.SPX,
    mentionCount: 741,
    bullishCount: 402,
    bearishCount: 246,
    avgScore: 0.18,
    mentionChangePercent: -8.3,
  },
  {
    ticker: tickers.TSLA,
    mentionCount: 588,
    bullishCount: 231,
    bearishCount: 274,
    avgScore: -0.07,
    mentionChangePercent: 12.9,
  },
  {
    ticker: tickers.ETH,
    mentionCount: 412,
    bullishCount: 134,
    bearishCount: 219,
    avgScore: -0.31,
    mentionChangePercent: 23.5,
  },
  {
    ticker: tickers.AAPL,
    mentionCount: 307,
    bullishCount: 168,
    bearishCount: 92,
    avgScore: 0.26,
    mentionChangePercent: -14.2,
  },
];

// --- Akademi --------------------------------------------------------------

export const tracks: Track[] = [
  {
    id: "trk-1",
    slug: "temeller",
    title: "Temeller",
    description: "Para, risk ve piyasa mekaniğinin sıfırdan kurulumu.",
    level: "beginner",
    completedSteps: 4,
    totalSteps: 6,
    steps: [
      {
        id: "stp-1",
        slug: "paranin-zaman-degeri",
        trackSlug: "temeller",
        title: "Paranın zaman değeri",
        summary: "Bugünkü 100 lira neden yarınki 100 liradan değerli?",
        estimatedMin: 12,
        orderIndex: 1,
        prerequisiteIds: [],
        status: "completed",
      },
      {
        id: "stp-2",
        slug: "bilesik-getiri",
        trackSlug: "temeller",
        title: "Bileşik getiri",
        summary: "Zamanın en güçlü finansal kaldıraç olmasının matematiği.",
        estimatedMin: 15,
        orderIndex: 2,
        prerequisiteIds: ["stp-1"],
        status: "completed",
      },
      {
        id: "stp-3",
        slug: "risk-ve-getiri",
        trackSlug: "temeller",
        title: "Risk ve getiri ilişkisi",
        summary: "Yüksek getiri neden bedava gelmez.",
        estimatedMin: 18,
        orderIndex: 3,
        prerequisiteIds: ["stp-2"],
        status: "completed",
      },
      {
        id: "stp-4",
        slug: "varlik-siniflari",
        trackSlug: "temeller",
        title: "Varlık sınıfları",
        summary: "Hisse, tahvil, emtia, kripto — her biri hangi işi yapar?",
        estimatedMin: 20,
        orderIndex: 4,
        prerequisiteIds: ["stp-3"],
        status: "completed",
      },
      {
        id: "stp-5",
        slug: "portfoy-cesitlendirme",
        trackSlug: "temeller",
        title: "Portföy çeşitlendirme",
        summary: "Korelasyonun tek bedava öğle yemeği olmasının nedeni.",
        estimatedMin: 22,
        orderIndex: 5,
        prerequisiteIds: ["stp-4"],
        status: "in_progress",
      },
      {
        id: "stp-6",
        slug: "enflasyon-ve-reel-getiri",
        trackSlug: "temeller",
        title: "Enflasyon ve reel getiri",
        summary: "Nominal kazanç ile gerçek kazancı ayırt etmek.",
        estimatedMin: 16,
        orderIndex: 6,
        prerequisiteIds: ["stp-5"],
        status: "not_started",
      },
    ],
  },
  {
    id: "trk-2",
    slug: "analiz",
    title: "Analiz",
    description: "Bilanço okumaktan değerleme çarpanlarına.",
    level: "intermediate",
    completedSteps: 1,
    totalSteps: 5,
    steps: [
      {
        id: "stp-7",
        slug: "gelir-tablosu",
        trackSlug: "analiz",
        title: "Gelir tablosu okuma",
        summary: "Ciro ile nakit akışının aynı şey olmadığı yer.",
        estimatedMin: 25,
        orderIndex: 1,
        prerequisiteIds: ["stp-4"],
        status: "completed",
      },
      {
        id: "stp-8",
        slug: "bilanco",
        trackSlug: "analiz",
        title: "Bilanço ve borçluluk",
        summary: "Kaldıracın şirketi nasıl kırılgan hale getirdiği.",
        estimatedMin: 28,
        orderIndex: 2,
        prerequisiteIds: ["stp-7"],
        status: "in_progress",
      },
      {
        id: "stp-9",
        slug: "degerleme-carpanlari",
        trackSlug: "analiz",
        title: "Değerleme çarpanları",
        summary: "F/K, PD/DD ve bunların yanıltıcı olduğu durumlar.",
        estimatedMin: 30,
        orderIndex: 3,
        prerequisiteIds: ["stp-8"],
        status: "not_started",
      },
      {
        id: "stp-10",
        slug: "nakit-akisi-iskontosu",
        trackSlug: "analiz",
        title: "İndirgenmiş nakit akışı",
        summary: "Varsayımların sonucu nasıl belirlediğini görmek.",
        estimatedMin: 35,
        orderIndex: 4,
        prerequisiteIds: ["stp-9"],
        status: "not_started",
      },
      {
        id: "stp-11",
        slug: "sektor-karsilastirma",
        trackSlug: "analiz",
        title: "Sektör karşılaştırması",
        summary: "Bir çarpanın yüksek mi ucuz mu olduğuna karar vermek.",
        estimatedMin: 24,
        orderIndex: 5,
        prerequisiteIds: ["stp-9"],
        status: "not_started",
      },
    ],
  },
  {
    id: "trk-3",
    slug: "davranis",
    title: "Davranışsal Finans",
    description: "En pahalı hataların kaynağı: yatırımcının kendisi.",
    level: "advanced",
    completedSteps: 0,
    totalSteps: 4,
    steps: [
      {
        id: "stp-12",
        slug: "kayip-kacinma",
        trackSlug: "davranis",
        title: "Kayıptan kaçınma",
        summary: "Zararı kesmenin neden bu kadar zor olduğu.",
        estimatedMin: 18,
        orderIndex: 1,
        prerequisiteIds: ["stp-5"],
        status: "not_started",
      },
      {
        id: "stp-13",
        slug: "onyargi-dogrulama",
        trackSlug: "davranis",
        title: "Doğrulama önyargısı",
        summary: "Tezini destekleyen yorumları aramanın maliyeti.",
        estimatedMin: 16,
        orderIndex: 2,
        prerequisiteIds: ["stp-12"],
        status: "not_started",
      },
      {
        id: "stp-14",
        slug: "surunun-etkisi",
        trackSlug: "davranis",
        title: "Sürü davranışı",
        summary: "Topluluk duyarlılığını sinyal sanmanın tuzağı.",
        estimatedMin: 20,
        orderIndex: 3,
        prerequisiteIds: ["stp-13"],
        status: "not_started",
      },
      {
        id: "stp-15",
        slug: "yatirim-gunlugu",
        trackSlug: "davranis",
        title: "Yatırım günlüğü tutmak",
        summary: "Kararı sonuçtan ayırmanın tek pratik yolu.",
        estimatedMin: 14,
        orderIndex: 4,
        prerequisiteIds: ["stp-14"],
        status: "not_started",
      },
    ],
  },
];

export const dailyVideo: VideoSuggestion = {
  id: "vid-1",
  youtubeId: "mock-video-id",
  title: "Why Diversification Is the Only Free Lunch in Investing",
  channelTitle: "Ben Felix",
  thumbnailUrl: null,
  durationSec: 762,
  publishedAt: ago(2880),
  stepSlug: "portfoy-cesitlendirme",
  stepTitle: "Portföy çeşitlendirme",
};

// --- Türetilmiş yardımcılar ----------------------------------------------

export function getActiveTrack(): Track {
  const active = tracks.find(
    (track) => track.completedSteps > 0 && track.completedSteps < track.totalSteps,
  );
  // tracks dizisi boş olamaz; ilk parça daima mevcut.
  return active ?? (tracks[0] as Track);
}
