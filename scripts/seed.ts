/**
 * Referans verisini yazar. **Idempotent** — istediğin kadar çalıştırabilirsin.
 *
 * Yazdıkları: haber kaynakları, semboller, topluluk gönderileri, akademi
 * haftaları ve — diskteki `content/akademi/` dosyalarından okuyarak — dersler,
 * ders kaynakları, sorular ve ön koşul DAG'ı.
 *
 * `articles` KASITLI olarak seed edilmez — onu `npm run ingest` doldurur.
 * Sahte makale yazmak hangi satırın gerçek olduğunu belirsizleştirirdi.
 *
 * Çalıştırma:  npm run seed
 */

import "./load-admin-env";
import { eq, inArray } from "drizzle-orm";
import { type LoadedLesson, loadWeekLessons } from "../src/lib/content/load";
import { getDb } from "../src/lib/db";
import {
  communities,
  communityPosts,
  lessonPrerequisites,
  lessonPrompts,
  lessonSources,
  lessons,
  postTickers,
  sources,
  tickers,
  weeks,
} from "../src/lib/db/schema";

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

// --- Topluluk duyarlılığı -------------------------------------------------

const COMMUNITY_SEED = [
  {
    platform: "reddit",
    name: "r/investing",
    displayName: "Investing",
    subscriberCount: 2_940_000,
  },
  {
    platform: "reddit",
    name: "r/wallstreetbets",
    displayName: "WallStreetBets",
    subscriberCount: 17_200_000,
  },
  {
    platform: "reddit",
    name: "r/stocks",
    displayName: "Stocks",
    subscriberCount: 8_100_000,
  },
  {
    platform: "reddit",
    name: "r/CryptoCurrency",
    displayName: "CryptoCurrency",
    subscriberCount: 9_600_000,
  },
] as const;

const SENTIMENT_POST_SEED = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    communityName: "r/wallstreetbets",
    title: "NVDA guidance was fine, the market just wanted a miracle",
    bodyText:
      "Sequential data-center growth of 18% is absurd for a company this size. Everyone anchoring on the whisper number is going to look silly in two quarters.",
    author: "u/theta_gang_survivor",
    score: 4820,
    commentCount: 1146,
    upvoteRatio: 0.91,
    flair: "DD",
    minutesAgoOffset: 38,
    sentimentLabel: "bullish",
    sentimentScore: 0.72,
    tickerSymbols: ["NVDA"],
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    communityName: "r/CryptoCurrency",
    title: "Four days of ETF outflows and nobody is talking about it",
    bodyText:
      "This is the longest redemption streak since launch. Either the marginal buyer is gone or someone big is rotating out. Neither reading is comfortable.",
    author: "u/onchain_only",
    score: 3140,
    commentCount: 892,
    upvoteRatio: 0.78,
    flair: "DISCUSSION",
    minutesAgoOffset: 64,
    sentimentLabel: "bearish",
    sentimentScore: -0.68,
    tickerSymbols: ["BTC"],
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    communityName: "r/investing",
    title: "The Fed statement changed three words and the whole curve moved",
    bodyText:
      "Dropping the reference to additional firming is not nothing. Rates desks clearly read it as the end of the hiking discussion.",
    author: "u/macro_and_chill",
    score: 2210,
    commentCount: 417,
    upvoteRatio: 0.94,
    flair: "Discussion",
    minutesAgoOffset: 21,
    sentimentLabel: "bullish",
    sentimentScore: 0.41,
    tickerSymbols: ["SPX"],
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    communityName: "r/stocks",
    title: "Is anyone else uncomfortable with how narrow breadth has gotten?",
    bodyText:
      "Under 200 names above their 50-day while the index prints highs. I have seen this movie before and I did not like the ending.",
    author: "u/breadth_watcher",
    score: 1870,
    commentCount: 603,
    upvoteRatio: 0.83,
    flair: null,
    minutesAgoOffset: 96,
    sentimentLabel: "bearish",
    sentimentScore: -0.52,
    tickerSymbols: ["SPX", "NVDA"],
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    communityName: "r/stocks",
    title: "TSLA European share loss is real but the bear case is overcooked",
    bodyText:
      "Margin compression is priced. What is not priced is the energy storage segment, which nobody in this thread ever models.",
    author: "u/ev_supply_chain",
    score: 1420,
    commentCount: 508,
    upvoteRatio: 0.66,
    flair: "Industry Discussion",
    minutesAgoOffset: 151,
    sentimentLabel: "neutral",
    sentimentScore: 0.06,
    tickerSymbols: ["TSLA"],
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    communityName: "r/investing",
    title: "Staking yields are compressing and that changes the ETH thesis",
    bodyText:
      "If the risk-free comparison stays where it is, the yield argument for holding stops working. The queue length is the number to watch.",
    author: "u/duration_risk",
    score: 980,
    commentCount: 244,
    upvoteRatio: 0.72,
    flair: null,
    minutesAgoOffset: 233,
    sentimentLabel: "bearish",
    sentimentScore: -0.34,
    tickerSymbols: ["ETH"],
  },
] as const;

// --- Akademi --------------------------------------------------------------
/**
 * **Haftalar burada, dersler diskte.** Haftanın başlığı ve sırası müfredatın
 * kendisi — nadiren değişir, kodda durması doğru. Ders gövdeleri ise
 * `content/akademi/hafta-NN/` altındaki markdown dosyalarından okunur; burada
 * ikinci bir kopya tutmak iki doğruluk kaynağı yaratırdı.
 *
 * İskelet: `docs/superpowers/specs/2026-08-08-mufredat-8-hafta.md`
 */

interface WeekSeed {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
}

const WEEK_SEED: WeekSeed[] = [
  {
    slug: "hafta-01",
    title: "Para nedir: yaratım, ölçüm, kurum",
    description: "Paranın kökeni, banka parası yaratımı ve para arzının ölçülmesi.",
    level: "intermediate",
  },
  {
    slug: "hafta-02",
    title: "Para politikası nasıl uygulanır",
    description: "Faiz koridoru, rezerv rejimleri, bilanço politikası ve bağımsızlık.",
    level: "intermediate",
  },
  {
    slug: "hafta-03",
    title: "Faiz ve vadeli yapı",
    description: "Fisher denklemi, aktarım kanalları, getiri eğrisi ve finansal baskı.",
    level: "advanced",
  },
  {
    slug: "hafta-04",
    title: "Enflasyon: ölçüm, mekanizma, rejim",
    description: "TÜFE'nin inşası, Phillips eğrisi, miktar teorisi ve hiperenflasyon.",
    level: "advanced",
  },
  {
    slug: "hafta-05",
    title: "Açık ekonomi: kur ve sermaye akımları",
    description: "Pariteler, imkânsız üçleme, kur geçişkenliği ve dolarizasyon.",
    level: "advanced",
  },
  {
    slug: "hafta-06",
    title: "Kredi, kırılganlık, kriz",
    description: "Finansal hızlandıran, Minsky, banka hücumu ve makro ihtiyati politika.",
    level: "advanced",
  },
  {
    slug: "hafta-07",
    title: "Para politikası ve varlık fiyatları",
    description: "Doğal faiz, politika şoku tanımlama, finansal koşullar ve enflasyon koruması.",
    level: "advanced",
  },
  {
    slug: "hafta-08",
    title: "Rejimler ve Türkiye",
    description: "Para rejimleri tarihi, mali baskınlık, Türkiye vakası ve dijital para.",
    level: "advanced",
  },
];

// --- Çalıştırma -----------------------------------------------------------

async function seedSources(): Promise<number> {
  // `isActive` artık kaynağın kendi kaydında; belirtilmeyenler aktif.
  const rows = SOURCE_SEED.map((source) => ({ isActive: true, ...source }));
  const inserted = await getDb("yonetim")
    .insert(sources)
    .values(rows)
    .onConflictDoNothing({ target: sources.slug })
    .returning({ id: sources.id });
  return inserted.length;
}

async function seedTickers(): Promise<number> {
  const inserted = await getDb("yonetim")
    .insert(tickers)
    .values(TICKER_SEED)
    .onConflictDoNothing({ target: tickers.symbol })
    .returning({ id: tickers.id });
  return inserted.length;
}

interface SentimentCounts {
  communities: number;
  posts: number;
  tickerLinks: number;
}

function requiredSeedId(ids: Map<string, string>, kind: string, key: string): string {
  const id = ids.get(key);
  if (!id) throw new Error(`Topluluk seed'i için ${kind} bulunamadı: ${key}`);
  return id;
}

async function seedSentiment(): Promise<SentimentCounts> {
  const db = getDb("yonetim");
  const insertedCommunities = await db
    .insert(communities)
    .values([...COMMUNITY_SEED])
    .onConflictDoNothing({ target: communities.name })
    .returning({ id: communities.id });

  const communityRows = await db
    .select({ id: communities.id, name: communities.name })
    .from(communities)
    .where(
      inArray(
        communities.name,
        COMMUNITY_SEED.map((item) => item.name),
      ),
    );
  const communityIds = new Map(communityRows.map((row) => [row.name, row.id]));

  const tickerSymbols = [...new Set(SENTIMENT_POST_SEED.flatMap((item) => item.tickerSymbols))];
  const tickerRows = await db
    .select({ id: tickers.id, symbol: tickers.symbol })
    .from(tickers)
    .where(inArray(tickers.symbol, tickerSymbols));
  const tickerIds = new Map(tickerRows.map((row) => [row.symbol, row.id]));

  const postRows = SENTIMENT_POST_SEED.map(
    ({ communityName, tickerSymbols: _tickerSymbols, ...post }) => ({
      ...post,
      communityId: requiredSeedId(communityIds, "topluluk", communityName),
    }),
  );
  const insertedPosts = await db
    .insert(communityPosts)
    .values(postRows)
    .onConflictDoNothing({ target: communityPosts.id })
    .returning({ id: communityPosts.id });

  const tickerLinks = SENTIMENT_POST_SEED.flatMap((post) =>
    post.tickerSymbols.map((symbol) => ({
      postId: post.id,
      tickerId: requiredSeedId(tickerIds, "sembol", symbol),
    })),
  );
  const insertedTickerLinks = await db
    .insert(postTickers)
    .values(tickerLinks)
    .onConflictDoNothing()
    .returning({ postId: postTickers.postId });

  return {
    communities: insertedCommunities.length,
    posts: insertedPosts.length,
    tickerLinks: insertedTickerLinks.length,
  };
}

interface AcademyCounts {
  weeks: number;
  lessons: number;
  sources: number;
  prompts: number;
  edges: number;
  /** İçeriği henüz yazılmamış haftalara giden ön koşullar. */
  bekleyenOnkosullar: string[];
}

async function seedAcademy(): Promise<AcademyCounts> {
  const db = getDb("yonetim");

  // "hafta-03/fisher-denklemi" → ders id'si. Ön koşulları çözmek için.
  const lessonIdByKey = new Map<string, string>();
  // Hafta slug'ı → o haftadan kaç ders yüklendi. Ön koşul hatasını "içerik
  // yazılmadı" durumundan ayırmanın tek yolu.
  const lessonCountByWeek = new Map<string, number>();
  const derslerByWeek = new Map<string, LoadedLesson[]>();

  let weekCount = 0;
  let lessonCount = 0;
  let sourceCount = 0;
  let promptCount = 0;

  for (const [weekIndex, week] of WEEK_SEED.entries()) {
    // Upsert: müfredat iskeleti değişince başlık ve sıra veritabanına yansısın.
    const [insertedWeek] = await db
      .insert(weeks)
      .values({
        slug: week.slug,
        title: week.title,
        description: week.description,
        level: week.level,
        orderIndex: weekIndex + 1,
      })
      .onConflictDoUpdate({
        target: weeks.slug,
        set: {
          title: week.title,
          description: week.description,
          level: week.level,
          orderIndex: weekIndex + 1,
        },
      })
      .returning({ id: weeks.id });

    const weekId = insertedWeek?.id;
    if (!weekId) throw new Error(`Hafta eklenemedi: ${week.slug}`);
    weekCount += 1;

    const dersler = loadWeekLessons(week.slug);
    derslerByWeek.set(week.slug, dersler);
    lessonCountByWeek.set(week.slug, dersler.length);

    for (const ders of dersler) {
      const [insertedLesson] = await db
        .insert(lessons)
        .values({
          weekId,
          slug: ders.slug,
          title: ders.title,
          summary: ders.summary,
          contentMd: ders.contentMd,
          estimatedMin: ders.estimatedMin,
          orderIndex: ders.orderIndex,
        })
        .onConflictDoUpdate({
          target: [lessons.weekId, lessons.slug],
          set: {
            title: ders.title,
            summary: ders.summary,
            contentMd: ders.contentMd,
            estimatedMin: ders.estimatedMin,
            orderIndex: ders.orderIndex,
          },
        })
        .returning({ id: lessons.id });

      const lessonId = insertedLesson?.id;
      if (!lessonId) throw new Error(`Ders eklenemedi: ${week.slug}/${ders.slug}`);

      lessonCount += 1;
      lessonIdByKey.set(`${week.slug}/${ders.slug}`, lessonId);

      // Kaynaklar sil-yaz: dosyadan çıkarılan bir kaynak veritabanında kalmasın.
      // Kimse kaynağa referans vermiyor, silmek veri kaybetmez.
      await db.delete(lessonSources).where(eq(lessonSources.lessonId, lessonId));
      if (ders.sources.length > 0) {
        await db.insert(lessonSources).values(
          ders.sources.map((kaynak, i) => ({
            lessonId,
            kind: kaynak.kind,
            title: kaynak.title,
            url: kaynak.url,
            provider: kaynak.provider,
            youtubeId: kaynak.youtubeId,
            durationLabel: kaynak.durationLabel,
            level: kaynak.level,
            summary: kaynak.summary,
            orderIndex: i + 1,
          })),
        );
        sourceCount += ders.sources.length;
      }

      // **Sorular ASLA silinmez, yalnız güncellenir.** `lesson_answers` soruya
      // cascade ile bağlı; sil-yaz yapmak kullanıcının verdiği cevapları ve
      // aldığı geri bildirimi sessizce yok ederdi. Dosyadan çıkarılan bir soru
      // veritabanında öksüz kalır — bu, cevap kaybetmeye yeğdir.
      for (const [i, soru] of ders.prompts.entries()) {
        await db
          .insert(lessonPrompts)
          .values({
            lessonId,
            key: soru.key,
            kind: soru.kind,
            points: soru.points,
            promptMd: soru.promptMd,
            rubricMd: soru.rubricMd,
            expectedNumeric: soru.expectedNumeric,
            tolerance: soru.tolerance,
            orderIndex: i + 1,
          })
          .onConflictDoUpdate({
            target: [lessonPrompts.lessonId, lessonPrompts.key],
            set: {
              kind: soru.kind,
              points: soru.points,
              promptMd: soru.promptMd,
              rubricMd: soru.rubricMd,
              expectedNumeric: soru.expectedNumeric,
              tolerance: soru.tolerance,
              orderIndex: i + 1,
            },
          });
        promptCount += 1;
      }
    }
  }

  // Ön koşullar en sona bırakılıyor: haftalar arası kenarlar da çözülebilsin.
  const edges: { lessonId: string; prerequisiteLessonId: string }[] = [];
  const bekleyenOnkosullar: string[] = [];

  for (const week of WEEK_SEED) {
    for (const ders of derslerByWeek.get(week.slug) ?? []) {
      const lessonId = lessonIdByKey.get(`${week.slug}/${ders.slug}`);
      if (!lessonId) continue;

      for (const key of ders.prerequisites) {
        const prerequisiteLessonId = lessonIdByKey.get(key);
        if (prerequisiteLessonId) {
          edges.push({ lessonId, prerequisiteLessonId });
          continue;
        }

        // Hedef hafta hiç ders yüklemediyse içerik henüz yazılmamış demektir —
        // müfredat sırayla yazılıyor, bu beklenen bir durum. Ama hafta doluysa
        // slug yanlış yazılmış demektir ve bunu geçirmek kenarı sessizce yer.
        const hedefHafta = key.split("/")[0] ?? "";
        if ((lessonCountByWeek.get(hedefHafta) ?? 0) > 0) {
          throw new Error(
            `Tanımsız ön koşul: \`${key}\` — ${week.slug}/${ders.slug} dosyasında. ` +
              `\`${hedefHafta}\` yüklendi ama içinde \`${key.split("/")[1]}\` yok.`,
          );
        }
        bekleyenOnkosullar.push(`${week.slug}/${ders.slug} → ${key}`);
      }
    }
  }

  // Kenarlar sil-yaz: dosyadan kaldırılan bir ön koşul haritada asılı kalmasın.
  const seededLessonIds = [...lessonIdByKey.values()];
  if (seededLessonIds.length > 0) {
    await db
      .delete(lessonPrerequisites)
      .where(inArray(lessonPrerequisites.lessonId, seededLessonIds));
  }
  if (edges.length > 0) {
    await db.insert(lessonPrerequisites).values(edges).onConflictDoNothing();
  }

  return {
    weeks: weekCount,
    lessons: lessonCount,
    sources: sourceCount,
    prompts: promptCount,
    edges: edges.length,
    bekleyenOnkosullar,
  };
}

async function main() {
  console.log("Seed başlıyor…\n");

  const sourceCount = await seedSources();
  console.log(`  kaynaklar        : ${sourceCount} yeni / ${SOURCE_SEED.length} toplam`);

  const tickerCount = await seedTickers();
  console.log(`  semboller        : ${tickerCount} yeni / ${TICKER_SEED.length} toplam`);

  const sentiment = await seedSentiment();
  console.log(
    `  topluluklar      : ${sentiment.communities} yeni / ${COMMUNITY_SEED.length} toplam`,
  );
  console.log(
    `  gönderiler       : ${sentiment.posts} yeni / ${SENTIMENT_POST_SEED.length} toplam`,
  );
  console.log(`  gönderi-sembol   : ${sentiment.tickerLinks} yeni`);

  const academy = await seedAcademy();
  console.log(`  akademi haftaları: ${academy.weeks} / ${WEEK_SEED.length}`);
  console.log(`  akademi dersleri : ${academy.lessons} (content/akademi/ altından)`);
  console.log(`  ders kaynakları  : ${academy.sources}`);
  console.log(`  ders soruları    : ${academy.prompts}`);
  console.log(`  ön koşul kenarı  : ${academy.edges}`);

  if (academy.bekleyenOnkosullar.length > 0) {
    // Sessizce atlamak, yol haritasında eksik kenarı fark edilmez kılardı.
    console.log("\n  ⚠ İçeriği henüz yazılmamış derslere giden ön koşullar atlandı:");
    for (const satir of academy.bekleyenOnkosullar) console.log(`      ${satir}`);
    console.log("    O haftanın dersleri yazıldıktan sonra seed'i tekrar çalıştırın.");
  }

  console.log("\nSeed tamam. (articles KASITLI olarak boş — onu `npm run ingest` doldurur.)");
  process.exit(0);
}

main().catch((error) => {
  console.error("\nSeed başarısız:\n", error);
  process.exit(1);
});
