/**
 * Referans verisini yazar. **Idempotent** — istediğin kadar çalıştırabilirsin.
 *
 * Yazdıkları: haber kaynakları, semboller, akademi parçaları/adımları ve
 * ön koşul DAG'ı. `articles` KASITLI olarak seed edilmez — onu 2B'deki RSS
 * çekimi doldurur. Sahte makale yazmak, 2B geldiğinde hangi satırın gerçek
 * olduğunu belirsizleştirirdi.
 *
 * Çalıştırma:  npm run seed
 */

import "./load-env";
import { and, eq } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { sources, stepPrerequisites, steps, tickers, tracks } from "../src/lib/db/schema";

// --- Haber kaynakları -----------------------------------------------------
// Yalnız ücretsiz ve kararlı RSS verenler. Bloomberg, FT ve Reuters bilinçli
// olarak yok: ya halka açık feed vermiyorlar ya da büyük ölçüde kapattılar.

const SOURCE_SEED = [
  {
    name: "CNBC Markets",
    slug: "cnbc-markets",
    feedUrl: "https://www.cnbc.com/id/20910258/device/rss/rss.html",
    siteUrl: "cnbc.com",
    category: "markets" as const,
  },
  {
    name: "MarketWatch",
    slug: "marketwatch",
    feedUrl: "https://feeds.content.dowjones.io/public/rss/mw_topstories",
    siteUrl: "marketwatch.com",
    category: "markets" as const,
  },
  {
    name: "Yahoo Finance",
    slug: "yahoo-finance",
    feedUrl: "https://finance.yahoo.com/news/rssindex",
    siteUrl: "finance.yahoo.com",
    category: "markets" as const,
  },
  {
    name: "Seeking Alpha",
    slug: "seeking-alpha",
    feedUrl: "https://seekingalpha.com/market_currents.xml",
    siteUrl: "seekingalpha.com",
    category: "markets" as const,
  },
  {
    name: "Investing.com",
    slug: "investing-com",
    feedUrl: "https://www.investing.com/rss/news.rss",
    siteUrl: "investing.com",
    category: "macro" as const,
  },
  {
    name: "CoinDesk",
    slug: "coindesk",
    feedUrl: "https://www.coindesk.com/arc/outboundfeeds/rss/",
    siteUrl: "coindesk.com",
    category: "crypto" as const,
  },
  {
    name: "Cointelegraph",
    slug: "cointelegraph",
    // 2B'de ölçüldü: her istekte ECONNRESET (bot engeli). Kayıt tutuluyor ki
    // "neden Cointelegraph yok" sorusu cevaplı kalsın; engel kalkarsa
    // `is_active` true yapmak yeter.
    isActive: false,
    feedUrl: "https://cointelegraph.com/rss",
    siteUrl: "cointelegraph.com",
    category: "crypto" as const,
  },
  {
    name: "The Verge",
    slug: "the-verge",
    feedUrl: "https://www.theverge.com/rss/index.xml",
    siteUrl: "theverge.com",
    category: "tech" as const,
  },
];

// --- Semboller ------------------------------------------------------------

const TICKER_SEED = [
  { symbol: "SPX", name: "S&P 500", assetType: "index" as const },
  { symbol: "NDX", name: "Nasdaq 100", assetType: "index" as const },
  { symbol: "NVDA", name: "NVIDIA Corp.", assetType: "equity" as const },
  { symbol: "AAPL", name: "Apple Inc.", assetType: "equity" as const },
  { symbol: "MSFT", name: "Microsoft Corp.", assetType: "equity" as const },
  { symbol: "TSLA", name: "Tesla Inc.", assetType: "equity" as const },
  { symbol: "BTC", name: "Bitcoin", assetType: "crypto" as const },
  { symbol: "ETH", name: "Ethereum", assetType: "crypto" as const },
  { symbol: "XAU", name: "Altın (ons)", assetType: "commodity" as const },
  { symbol: "EURUSD", name: "EUR/USD", assetType: "fx" as const },
];

// --- Akademi --------------------------------------------------------------
// Ön koşullar slug ile veriliyor; id'ler ekleme sırasında çözülüyor.

interface StepSeed {
  slug: string;
  title: string;
  summary: string;
  estimatedMin: number;
  /** "parcaSlug/adimSlug" biçiminde — parçalar arası ön koşul mümkün. */
  prerequisites: string[];
}

interface TrackSeed {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  steps: StepSeed[];
}

const TRACK_SEED: TrackSeed[] = [
  {
    slug: "temeller",
    title: "Temeller",
    description: "Para, risk ve piyasa mekaniğinin sıfırdan kurulumu.",
    level: "beginner",
    steps: [
      {
        slug: "paranin-zaman-degeri",
        title: "Paranın zaman değeri",
        summary: "Bugünkü 100 lira neden yarınki 100 liradan değerli?",
        estimatedMin: 12,
        prerequisites: [],
      },
      {
        slug: "bilesik-getiri",
        title: "Bileşik getiri",
        summary: "Zamanın en güçlü finansal kaldıraç olmasının matematiği.",
        estimatedMin: 15,
        prerequisites: ["temeller/paranin-zaman-degeri"],
      },
      {
        slug: "risk-ve-getiri",
        title: "Risk ve getiri ilişkisi",
        summary: "Yüksek getiri neden bedava gelmez.",
        estimatedMin: 18,
        prerequisites: ["temeller/bilesik-getiri"],
      },
      {
        slug: "varlik-siniflari",
        title: "Varlık sınıfları",
        summary: "Hisse, tahvil, emtia, kripto — her biri hangi işi yapar?",
        estimatedMin: 20,
        prerequisites: ["temeller/risk-ve-getiri"],
      },
      {
        slug: "portfoy-cesitlendirme",
        title: "Portföy çeşitlendirme",
        summary: "Korelasyonun tek bedava öğle yemeği olmasının nedeni.",
        estimatedMin: 22,
        prerequisites: ["temeller/varlik-siniflari"],
      },
      {
        slug: "enflasyon-ve-reel-getiri",
        title: "Enflasyon ve reel getiri",
        summary: "Nominal kazanç ile gerçek kazancı ayırt etmek.",
        estimatedMin: 16,
        prerequisites: ["temeller/portfoy-cesitlendirme"],
      },
    ],
  },
  {
    slug: "analiz",
    title: "Analiz",
    description: "Bilanço okumaktan değerleme çarpanlarına.",
    level: "intermediate",
    steps: [
      {
        slug: "gelir-tablosu",
        title: "Gelir tablosu okuma",
        summary: "Ciro ile nakit akışının aynı şey olmadığı yer.",
        estimatedMin: 25,
        prerequisites: ["temeller/varlik-siniflari"],
      },
      {
        slug: "bilanco",
        title: "Bilanço ve borçluluk",
        summary: "Kaldıracın şirketi nasıl kırılgan hale getirdiği.",
        estimatedMin: 28,
        prerequisites: ["analiz/gelir-tablosu"],
      },
      {
        slug: "degerleme-carpanlari",
        title: "Değerleme çarpanları",
        summary: "F/K, PD/DD ve bunların yanıltıcı olduğu durumlar.",
        estimatedMin: 30,
        prerequisites: ["analiz/bilanco"],
      },
      {
        slug: "nakit-akisi-iskontosu",
        title: "İndirgenmiş nakit akışı",
        summary: "Varsayımların sonucu nasıl belirlediğini görmek.",
        estimatedMin: 35,
        prerequisites: ["analiz/degerleme-carpanlari"],
      },
      {
        slug: "sektor-karsilastirma",
        title: "Sektör karşılaştırması",
        summary: "Bir çarpanın yüksek mi ucuz mu olduğuna karar vermek.",
        estimatedMin: 24,
        prerequisites: ["analiz/degerleme-carpanlari"],
      },
    ],
  },
  {
    slug: "davranis",
    title: "Davranışsal Finans",
    description: "En pahalı hataların kaynağı: yatırımcının kendisi.",
    level: "advanced",
    steps: [
      {
        slug: "kayip-kacinma",
        title: "Kayıptan kaçınma",
        summary: "Zararı kesmenin neden bu kadar zor olduğu.",
        estimatedMin: 18,
        prerequisites: ["temeller/portfoy-cesitlendirme"],
      },
      {
        slug: "onyargi-dogrulama",
        title: "Doğrulama önyargısı",
        summary: "Tezini destekleyen yorumları aramanın maliyeti.",
        estimatedMin: 16,
        prerequisites: ["davranis/kayip-kacinma"],
      },
      {
        slug: "surunun-etkisi",
        title: "Sürü davranışı",
        summary: "Topluluk duyarlılığını sinyal sanmanın tuzağı.",
        estimatedMin: 20,
        prerequisites: ["davranis/onyargi-dogrulama"],
      },
      {
        slug: "yatirim-gunlugu",
        title: "Yatırım günlüğü tutmak",
        summary: "Kararı sonuçtan ayırmanın tek pratik yolu.",
        estimatedMin: 14,
        prerequisites: ["davranis/surunun-etkisi"],
      },
    ],
  },
];

// --- Çalıştırma -----------------------------------------------------------

async function seedSources(): Promise<number> {
  // `isActive` artık kaynağın kendi kaydında; belirtilmeyenler aktif.
  const rows = SOURCE_SEED.map((source) => ({ isActive: true, ...source }));
  const inserted = await getDb()
    .insert(sources)
    .values(rows)
    .onConflictDoNothing({ target: sources.slug })
    .returning({ id: sources.id });
  return inserted.length;
}

async function seedTickers(): Promise<number> {
  const inserted = await getDb()
    .insert(tickers)
    .values(TICKER_SEED)
    .onConflictDoNothing({ target: tickers.symbol })
    .returning({ id: tickers.id });
  return inserted.length;
}

async function seedAcademy(): Promise<{ tracks: number; steps: number; edges: number }> {
  let trackCount = 0;
  let stepCount = 0;

  // "parcaSlug/adimSlug" → adım id'si. Ön koşulları çözmek için gerekli.
  const stepIdByKey = new Map<string, string>();

  for (const [trackIndex, track] of TRACK_SEED.entries()) {
    const insertedTracks = await getDb()
      .insert(tracks)
      .values({
        slug: track.slug,
        title: track.title,
        description: track.description,
        level: track.level,
        orderIndex: trackIndex + 1,
      })
      .onConflictDoNothing({ target: tracks.slug })
      .returning({ id: tracks.id });

    trackCount += insertedTracks.length;

    // Zaten varsa id'sini oku — idempotent çalışmanın gereği.
    const trackId =
      insertedTracks[0]?.id ??
      (await getDb().select({ id: tracks.id }).from(tracks).where(eq(tracks.slug, track.slug)))[0]
        ?.id;

    if (!trackId) throw new Error(`Parça bulunamadı ve eklenemedi: ${track.slug}`);

    for (const [stepIndex, step] of track.steps.entries()) {
      const insertedSteps = await getDb()
        .insert(steps)
        .values({
          trackId,
          slug: step.slug,
          title: step.title,
          summary: step.summary,
          estimatedMin: step.estimatedMin,
          orderIndex: stepIndex + 1,
        })
        .onConflictDoNothing()
        .returning({ id: steps.id });

      stepCount += insertedSteps.length;

      // Slug yalnız parça içinde benzersiz — trackId olmadan aramak yanlış
      // parçanın adımını bulabilir.
      const stepId =
        insertedSteps[0]?.id ??
        (
          await getDb()
            .select({ id: steps.id })
            .from(steps)
            .where(and(eq(steps.trackId, trackId), eq(steps.slug, step.slug)))
            .limit(1)
        )[0]?.id;

      if (!stepId) throw new Error(`Adım bulunamadı ve eklenemedi: ${track.slug}/${step.slug}`);
      stepIdByKey.set(`${track.slug}/${step.slug}`, stepId);
    }
  }

  // Ön koşullar en sona bırakılıyor: parçalar arası kenarlar da çözülebilsin.
  const edges: { stepId: string; prerequisiteStepId: string }[] = [];
  for (const track of TRACK_SEED) {
    for (const step of track.steps) {
      const stepId = stepIdByKey.get(`${track.slug}/${step.slug}`);
      if (!stepId) continue;
      for (const key of step.prerequisites) {
        const prerequisiteStepId = stepIdByKey.get(key);
        if (!prerequisiteStepId) throw new Error(`Tanımsız ön koşul: ${key}`);
        edges.push({ stepId, prerequisiteStepId });
      }
    }
  }

  const insertedEdges = edges.length
    ? await getDb()
        .insert(stepPrerequisites)
        .values(edges)
        .onConflictDoNothing()
        .returning({ stepId: stepPrerequisites.stepId })
    : [];

  return { tracks: trackCount, steps: stepCount, edges: insertedEdges.length };
}

async function main() {
  console.log("Seed başlıyor…\n");

  const sourceCount = await seedSources();
  console.log(`  kaynaklar        : ${sourceCount} yeni / ${SOURCE_SEED.length} toplam`);

  const tickerCount = await seedTickers();
  console.log(`  semboller        : ${tickerCount} yeni / ${TICKER_SEED.length} toplam`);

  const academy = await seedAcademy();
  const totalSteps = TRACK_SEED.reduce((sum, track) => sum + track.steps.length, 0);
  console.log(`  akademi parçaları: ${academy.tracks} yeni / ${TRACK_SEED.length} toplam`);
  console.log(`  akademi adımları : ${academy.steps} yeni / ${totalSteps} toplam`);
  console.log(`  ön koşul kenarı  : ${academy.edges} yeni`);

  console.log("\nSeed tamam. (articles KASITLI olarak boş — onu Faz 2B dolduracak.)");
  process.exit(0);
}

main().catch((error) => {
  console.error("\nSeed başarısız:\n", error);
  process.exit(1);
});
