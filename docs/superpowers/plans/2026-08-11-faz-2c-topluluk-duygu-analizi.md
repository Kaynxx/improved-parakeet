# Faz 2C Topluluk Duygu Analizi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Topluluk gönderilerini, anlık duyarlılık özetini ve ticker trendlerini mock yerine Postgres/Drizzle verisinden dinamik ve belirlenimci olarak sunmak.

**Architecture:** Sayfa mevcut servis kapısını korur; servis yeni sorgu modülüne delege eder. Sorgu modülü gönderi/topluluk satırlarını çeker, N:M ticker ilişkilerini ayrı sorgu ve `Map` ile eşler; saf dönüşüm modülü özet ve trend hesaplarını Drizzle satırlarından bağımsız tutar. Seed, sabit gönderi UUID'leri ve mevcut community/ticker doğal anahtarlarıyla idempotent çalışır.

**Tech Stack:** Next.js 15 App Router, TypeScript 5.9, Drizzle ORM 0.45, PostgreSQL, Node `node:test`, Biome.

## Global Constraints

- ORM yalnız Drizzle'dır; Prisma eklenmez.
- `src/app/` veriye yalnız `src/server/services/` üzerinden erişir.
- Ham Drizzle satırları sorgu katmanının dışına çıkmaz; bütün dönüşler `src/types/index.ts` sözleşmelerine uyar.
- N:M ticker eşlemesinde büyük JOIN yerine ayrı sorgu ve `Map` kullanılır; boş kimlik dizisinde `inArray()` çağrılmaz.
- Bütün `timestamp` çağrıları ikinci argüman olarak `{ withTimezone: true }` kullanır.
- Seed `onConflictDoNothing` ile tekrar çalıştırılabilir kalır ve zorunlu ilişkileri sessizce atlamaz.
- Kod, yorumlar ve hata mesajları Türkçedir; kütüphane API'leri ve veritabanı kolonları İngilizce kalabilir.
- Doğrulama sırası `npm run format`, `npm run typecheck`, `npm run lint`, `.next` temizliği, `npm run build` şeklindedir.
- `finishing-a-development-branch` çağrılmaz.

## Dosya Haritası

- `src/lib/db/schema.ts`: enum ve sentiment tablolarının tek şema tanımı.
- `drizzle/0005_community_sentiment.sql` (CLI'nin ürettiği kesin ad kullanılır): şema değişikliğinin özel SQL migration'ı.
- `drizzle/meta/_journal.json`: `drizzle-kit generate --custom` tarafından güncellenen migration günlüğü.
- `src/lib/db/queries/sentiment.logic.ts`: saatten ve veritabanından bağımsız özet/trend dönüşümleri.
- `src/lib/db/queries/sentiment.ts`: lazy `getDb()` kullanan Drizzle sorguları ve tip eşlemeleri.
- `src/lib/db/queries/sentiment.test.ts`: şema, saf dönüşüm ve bağlantısız guard davranışları.
- `src/server/services/sentiment.ts`: sayfanın korunan servis API'si.
- `src/app/(dashboard)/topluluk/page.tsx`: dinamik render bildirimi.
- `scripts/seed.ts`: mevcut gerçek seed giriş noktası; topluluk, gönderi ve köprü seed'i.
- `src/mocks/index.ts`: yalnız piyasa mock'u kalacak şekilde sentiment temizliği.

---

### Task 1: Drizzle Şeması ve Migration

**Files:**
- Create: `src/lib/db/queries/sentiment.test.ts`
- Modify: `src/lib/db/schema.ts`
- Create: `drizzle/0005_community_sentiment.sql` (gerçek sıra/ad CLI çıktısına göre)
- Modify: `drizzle/meta/_journal.json` (CLI tarafından)

**Interfaces:**
- Consumes: mevcut `tickers.id` UUID anahtarı ve `userProgress` şema konumu.
- Produces: `sentimentLabel`, `communities`, `communityPosts`, `postTickers` Drizzle exportları.

- [ ] **Step 1: Şema sözleşmesini ifade eden başarısız testi yaz**

`src/lib/db/queries/sentiment.test.ts` dosyasını şu başlangıçla oluştur:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getTableConfig } from "drizzle-orm/pg-core";
import {
  communities,
  communityPosts,
  postTickers,
  sentimentLabel,
} from "@/lib/db/schema";

test("Faz 2C şeması enum, kolon ve index sözleşmesini taşır", () => {
  assert.deepEqual(sentimentLabel.enumValues, ["bullish", "bearish", "neutral"]);

  const communityConfig = getTableConfig(communities);
  assert.equal(communityConfig.columns.find((column) => column.name === "platform")?.default, "reddit");
  assert.ok(communityConfig.uniqueConstraints.some((constraint) =>
    constraint.columns.some((column) => column.name === "name"),
  ));

  const postConfig = getTableConfig(communityPosts);
  assert.ok(postConfig.indexes.some((item) => item.config.name === "community_posts_community_id_idx"));
  assert.ok(postConfig.indexes.some((item) => item.config.name === "community_posts_sentiment_label_idx"));

  const bridgeConfig = getTableConfig(postTickers);
  assert.equal(bridgeConfig.primaryKeys.length, 1);
  assert.ok(bridgeConfig.indexes.some((item) => item.config.name === "post_tickers_ticker_id_idx"));
});
```

- [ ] **Step 2: Testi çalıştırıp beklenen kırmızıyı doğrula**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: FAIL; `communities`, `communityPosts`, `postTickers` veya `sentimentLabel` exportlarının bulunmadığını göstermeli.

- [ ] **Step 3: Şemayı en küçük kapsamla uygula**

`src/lib/db/schema.ts` değişiklikleri:

1. Dosya başındaki faz listesi yorumunu kaldır.
2. `drizzle-orm/pg-core` importuna `doublePrecision` ekle.
3. `userProgress` tanımının hemen altına şu yapıyı ekle:

```ts
// --- Topluluk ve Duyarlılık (2C) -----------------------------------------

export const sentimentLabel = pgEnum("sentiment_label", ["bullish", "bearish", "neutral"]);

export const communities = pgTable("communities", {
  id: uuid("id").primaryKey().defaultRandom(),
  platform: text("platform").notNull().default("reddit"),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  subscriberCount: integer("subscriber_count").notNull(),
});

export const communityPosts = pgTable(
  "community_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    communityId: uuid("community_id")
      .notNull()
      .references(() => communities.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    bodyText: text("body_text").notNull(),
    author: text("author").notNull(),
    score: integer("score").notNull(),
    commentCount: integer("comment_count").notNull(),
    upvoteRatio: doublePrecision("upvote_ratio").notNull(),
    flair: text("flair"),
    minutesAgoOffset: integer("minutes_ago_offset").notNull().default(0),
    sentimentLabel: sentimentLabel("sentiment_label").notNull(),
    sentimentScore: doublePrecision("sentiment_score").notNull(),
  },
  (table) => [
    index("community_posts_community_id_idx").on(table.communityId),
    index("community_posts_sentiment_label_idx").on(table.sentimentLabel),
  ],
);

export const postTickers = pgTable(
  "post_tickers",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => communityPosts.id, { onDelete: "cascade" }),
    tickerId: uuid("ticker_id")
      .notNull()
      .references(() => tickers.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tickerId] }),
    index("post_tickers_ticker_id_idx").on(table.tickerId),
  ],
);
```

- [ ] **Step 4: Şema testini yeşile getir ve timestamp kuralını tara**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: PASS.

Run:

```powershell
Select-String -Path 'src/lib/db/schema.ts' -Pattern 'timestamp\(' |
  Where-Object { $_.Line -notmatch 'withTimezone: true' }
```

Expected: çıktı yok.

- [ ] **Step 5: Özel Drizzle migration'ını üret ve SQL'i doldur**

Repo, `0004` için snapshot üretmeyen özel migration kalıbı kullandığından otomatik diff ile eski rename işlemlerini yeniden üretme. Run:

`npm run db:generate -- --custom --name community_sentiment`

CLI'nin oluşturduğu SQL dosyasına enum, üç tablo, FK'lar ve üç index için kesin PostgreSQL DDL'ini yaz. SQL aşağıdaki yapıyı içermeli:

```sql
CREATE TYPE "public"."sentiment_label" AS ENUM('bullish', 'bearish', 'neutral');
--> statement-breakpoint
CREATE TABLE "communities" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "platform" text DEFAULT 'reddit' NOT NULL,
  "name" text NOT NULL,
  "display_name" text NOT NULL,
  "subscriber_count" integer NOT NULL,
  CONSTRAINT "communities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "community_posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "community_id" uuid NOT NULL,
  "title" text NOT NULL,
  "body_text" text NOT NULL,
  "author" text NOT NULL,
  "score" integer NOT NULL,
  "comment_count" integer NOT NULL,
  "upvote_ratio" double precision NOT NULL,
  "flair" text,
  "minutes_ago_offset" integer DEFAULT 0 NOT NULL,
  "sentiment_label" "sentiment_label" NOT NULL,
  "sentiment_score" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tickers" (
  "post_id" uuid NOT NULL,
  "ticker_id" uuid NOT NULL,
  CONSTRAINT "post_tickers_post_id_ticker_id_pk" PRIMARY KEY("post_id", "ticker_id")
);
--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "post_tickers" ADD CONSTRAINT "post_tickers_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "post_tickers" ADD CONSTRAINT "post_tickers_ticker_id_tickers_id_fk" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "community_posts_community_id_idx" ON "community_posts" USING btree ("community_id");
--> statement-breakpoint
CREATE INDEX "community_posts_sentiment_label_idx" ON "community_posts" USING btree ("sentiment_label");
--> statement-breakpoint
CREATE INDEX "post_tickers_ticker_id_idx" ON "post_tickers" USING btree ("ticker_id");
```

Kolonların null/default özellikleri Drizzle şemasıyla birebir eşleşmeli. Statement'lar `--> statement-breakpoint` ile ayrılmalı.

- [ ] **Step 6: Task 1 doğrulaması ve commit**

Run: `npm run typecheck`

Expected: exit 0.

Run: `git diff --check -- src/lib/db/schema.ts src/lib/db/queries/sentiment.test.ts drizzle`

Expected: çıktı yok.

Commit yalnız Task 1 dosyalarını:

```powershell
git add -- src/lib/db/schema.ts src/lib/db/queries/sentiment.test.ts drizzle
git commit -m "feat: topluluk duyarlılık şemasını ekle"
```

---

### Task 2: Saf Aggregate Mantığı ve Drizzle Sorguları

**Files:**
- Create: `src/lib/db/queries/sentiment.logic.ts`
- Modify: `src/lib/db/queries/sentiment.test.ts`
- Create: `src/lib/db/queries/sentiment.ts`

**Interfaces:**
- Consumes: Task 1'in `communities`, `communityPosts`, `postTickers` exportları ve mevcut `tickers` tablosu.
- Produces: `findRecentPosts(limit: number): Promise<SentimentPost[]>`, `findSentimentSummary(): Promise<SentimentSummary>`, `findTrendingTickers(limit: number): Promise<TickerSentiment[]>`.

- [ ] **Step 1: Saf dönüşümlerin başarısız testlerini ekle**

Test dosyasına `sentiment.logic.ts` içinden şu API'yi isteyen testler ekle:

```ts
import {
  buildSentimentSummary,
  buildTickerSentiments,
  postedAtFromOffset,
  type ActiveSentimentPost,
} from "./sentiment.logic";

const btc = { symbol: "BTC", name: "Bitcoin", assetType: "crypto" as const };
const nvda = { symbol: "NVDA", name: "NVIDIA Corp.", assetType: "equity" as const };
const eth = { symbol: "ETH", name: "Ethereum", assetType: "crypto" as const };

test("postedAt tek referans zamandan ofset kadar geriye gider", () => {
  assert.equal(postedAtFromOffset(1_800_000, 10), new Date(1_200_000).toISOString());
});

test("boş kayıt kümesi nötr ve sıfır özet döndürür", () => {
  assert.deepEqual(buildSentimentSummary([]), {
    score: 0,
    label: "neutral",
    postCount: 0,
    bullishCount: 0,
    bearishCount: 0,
    neutralCount: 0,
    windowHours: 24,
  });
});

test("özet sayımları, ortalamayı ve ±0.05 etiket eşiğini hesaplar", () => {
  const rows: ActiveSentimentPost[] = [
    { id: "1", minutesAgoOffset: 1, sentimentLabel: "bullish", sentimentScore: 0.4, tickers: [] },
    { id: "2", minutesAgoOffset: 2, sentimentLabel: "bearish", sentimentScore: -0.2, tickers: [] },
    { id: "3", minutesAgoOffset: 3, sentimentLabel: "neutral", sentimentScore: -0.05, tickers: [] },
  ];
  assert.deepEqual(buildSentimentSummary(rows), {
    score: 0.05,
    label: "neutral",
    postCount: 3,
    bullishCount: 1,
    bearishCount: 1,
    neutralCount: 1,
    windowHours: 24,
  });
});

test("ticker trendi mentionları iki dönemde sayar ve eşitliği sembolle çözer", () => {
  const rows: ActiveSentimentPost[] = [
    { id: "1", minutesAgoOffset: 10, sentimentLabel: "bullish", sentimentScore: 0.6, tickers: [btc] },
    { id: "2", minutesAgoOffset: 20, sentimentLabel: "bearish", sentimentScore: -0.4, tickers: [nvda] },
    { id: "3", minutesAgoOffset: 30, sentimentLabel: "bearish", sentimentScore: -0.6, tickers: [btc] },
    { id: "4", minutesAgoOffset: 40, sentimentLabel: "neutral", sentimentScore: 0, tickers: [eth] },
  ];
  const result = buildTickerSentiments(rows, 3);
  assert.deepEqual(result.map((item) => item.ticker.symbol), ["BTC", "ETH", "NVDA"]);
  assert.deepEqual(result.map((item) => item.mentionChangePercent), [0, -100, 100]);
  assert.deepEqual(result[0], {
    ticker: btc,
    mentionCount: 2,
    bullishCount: 1,
    bearishCount: 1,
    avgScore: 0,
    mentionChangePercent: 0,
  });
});
```

- [ ] **Step 2: Saf dönüşüm testlerini kırmızı doğrula**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: FAIL; `./sentiment.logic` modülü veya istenen exportlar henüz yok.

- [ ] **Step 3: Saf dönüşüm modülünü uygula**

`src/lib/db/queries/sentiment.logic.ts` şu sözleşmeleri üretmeli:

```ts
import type { SentimentLabel, SentimentSummary, Ticker, TickerSentiment } from "@/types";

export interface ActiveSentimentPost {
  id: string;
  minutesAgoOffset: number;
  sentimentLabel: SentimentLabel;
  sentimentScore: number;
  tickers: Ticker[];
}

export function postedAtFromOffset(now: number, minutesAgoOffset: number): string;
export function buildSentimentSummary(rows: ActiveSentimentPost[]): SentimentSummary;
export function buildTickerSentiments(rows: ActiveSentimentPost[], limit: number): TickerSentiment[];
```

Uygulama kuralları:

- Skor ve yüzde değerlerini bir ondalık gürültüsünden arındırmak için en fazla dört ondalığa yuvarla; `mentionChangePercent` bir ondalık olsun.
- Trend girdisini `minutesAgoOffset` artan, eşitlikte `id` alfabetik sırasına sok.
- Dönem sınırı `Math.ceil(rows.length / 2)` olsun.
- Ticker accumulator'ını `Map<string, TickerAccumulator>` ile tut; `TickerAccumulator`
  ticker, toplam/bullish/bearish/yeni/eski mention ve skor toplamı alanlarını taşısın.
- Sonuçları `mentionCount` azalan, ardından
  `left.ticker.symbol.localeCompare(right.ticker.symbol, "en")` artan sırala.
- `limit <= 0` için boş dizi dön.

- [ ] **Step 4: Saf dönüşümleri yeşile getir**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: bütün testler PASS.

- [ ] **Step 5: Sorgular için bağlantısız guard testlerini önce yaz**

Test dosyasına ekle:

```ts
import { findRecentPosts, findTrendingTickers } from "./sentiment";

test("sıfır limit gönderi sorgusunda veritabanına bağlanmadan boş döner", async () => {
  assert.deepEqual(await findRecentPosts(0), []);
});

test("sıfır limit trend sorgusunda veritabanına bağlanmadan boş döner", async () => {
  assert.deepEqual(await findTrendingTickers(0), []);
});
```

- [ ] **Step 6: Guard testlerini kırmızı doğrula**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: FAIL; `./sentiment` sorgu modülü henüz yok.

- [ ] **Step 7: Drizzle sorgu modülünü uygula**

`src/lib/db/queries/sentiment.ts` içinde:

```ts
export async function findRecentPosts(limit: number): Promise<SentimentPost[]>;
export async function findSentimentSummary(): Promise<SentimentSummary>;
export async function findTrendingTickers(limit: number): Promise<TickerSentiment[]>;
```

Özel kurallar:

- `getDb()` yalnız fonksiyon gövdelerinde çağrılır.
- `findRecentPosts` önce `limit <= 0` guard'ı uygular; sonra gönderileri toplulukla JOIN eder, `minutesAgoOffset` ve `communityPosts.id` ile sıralar, limiti uygular.
- `tickersByPost(postIds: string[]): Promise<Map<string, Ticker[]>>` özel fonksiyonu boş dizide sorgu yapmadan boş Map döner. Diğer durumda `postTickers` ile `tickers` JOIN edilir, `inArray(postTickers.postId, postIds)` uygulanır ve ticker sembolüyle sıralanır.
- `findRecentPosts` bütün satırlar için bir kez `const now = Date.now()` alır; `postedAtFromOffset(now, row.minutesAgoOffset)` kullanır.
- `platform` text kolonunu `Community["platform"]` sözleşmesine taşırken yalnız `reddit` veya `forum` kabul eden doğrulayıcı kullanılır; farklı değer açıklayıcı hata üretir.
- `findSentimentSummary`, `minutesAgoOffset <= 24 * 60` kayıtlarını seçer ve `buildSentimentSummary` çağırır.
- `findTrendingTickers`, aynı aktif kayıtları belirlenimci sırada seçer, ticker Map'ini bağlar ve `buildTickerSentiments` çağırır.
- Drizzle row interface'leri ve kolon seçimleri dosya içinde kalır.

- [ ] **Step 8: Task 2 testleri, tip kontrolü ve commit**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: bütün testler PASS; `limit=0` sırasında `DATABASE_URL` gerekmemeli.

Run: `npm run typecheck`

Expected: exit 0.

Commit yalnız Task 2 dosyalarını:

```powershell
git add -- src/lib/db/queries/sentiment.logic.ts src/lib/db/queries/sentiment.ts src/lib/db/queries/sentiment.test.ts
git commit -m "feat: duyarlılık sorgularını ekle"
```

---

### Task 3: Servis ve Dinamik Sayfa Bağlantısı

**Files:**
- Modify: `src/server/services/sentiment.ts`
- Modify: `src/app/(dashboard)/topluluk/page.tsx`

**Interfaces:**
- Consumes: Task 2'nin üç `find*` sorgusu.
- Produces: değişmeyen `getRecentPosts`, `getSentimentSummary`, `getTrendingTickers` servis API'leri ve force-dynamic sayfa.

- [ ] **Step 1: Servisi sorgulara bağla ve sayfayı dinamik yap**

Serviste `@/mocks` importunu sil, üç `find*` sorgusunu import et ve mevcut fonksiyonları doğrudan delege et:

```ts
export async function getRecentPosts(limit = 20): Promise<SentimentPost[]> {
  return findRecentPosts(limit);
}
```

Aynı desen özet ve trend fonksiyonlarına uygulanır. Eski mock/Faz 2C gelecek zaman yorumları kaldırılır.

Sayfada metadata exportunun yakınına ekle:

```ts
export const dynamic = "force-dynamic";
```

- [ ] **Step 2: Task 3 doğrulaması ve commit**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: bütün testler PASS.

Run: `npm run typecheck`

Expected: exit 0.

Commit:

```powershell
git add -- 'src/server/services/sentiment.ts' 'src/app/(dashboard)/topluluk/page.tsx'
git commit -m "feat: topluluk sayfasını Postgres verisine bağla"
```

---

### Task 4: İdempotent Seed ve Sentiment Mock Temizliği

**Files:**
- Modify: `scripts/seed.ts`
- Modify: `src/mocks/index.ts`

**Interfaces:**
- Consumes: Task 1 tabloları, mevcut `TICKER_SEED` ve mock'taki dört topluluk/altı gönderi içeriği.
- Produces: tekrar çalıştırılabilir community/post/post-ticker seed'i; yalnız piyasa verisi içeren mock modülü.

- [ ] **Step 1: Seed sabitlerini ekle**

`scripts/seed.ts` şema importlarına `communities`, `communityPosts`, `postTickers` ekle. Dört topluluğu şu sabitlerle tanımla:

```ts
const COMMUNITY_SEED = [
  { platform: "reddit", name: "r/investing", displayName: "Investing", subscriberCount: 2_940_000 },
  { platform: "reddit", name: "r/wallstreetbets", displayName: "WallStreetBets", subscriberCount: 17_200_000 },
  { platform: "reddit", name: "r/stocks", displayName: "Stocks", subscriberCount: 8_100_000 },
  { platform: "reddit", name: "r/CryptoCurrency", displayName: "CryptoCurrency", subscriberCount: 9_600_000 },
] as const;
```

Altı gönderiye şu sabit UUID, içerik ve ofsetleri ver:

```ts
const SENTIMENT_POST_SEED = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    communityName: "r/wallstreetbets",
    title: "NVDA guidance was fine, the market just wanted a miracle",
    bodyText: "Sequential data-center growth of 18% is absurd for a company this size. Everyone anchoring on the whisper number is going to look silly in two quarters.",
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
    bodyText: "This is the longest redemption streak since launch. Either the marginal buyer is gone or someone big is rotating out. Neither reading is comfortable.",
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
    bodyText: "Dropping the reference to additional firming is not nothing. Rates desks clearly read it as the end of the hiking discussion.",
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
    bodyText: "Under 200 names above their 50-day while the index prints highs. I have seen this movie before and I did not like the ending.",
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
    bodyText: "Margin compression is priced. What is not priced is the energy storage segment, which nobody in this thread ever models.",
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
    bodyText: "If the risk-free comparison stays where it is, the yield argument for holding stops working. The queue length is the number to watch.",
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
```

- [ ] **Step 2: `seedSentiment()` fonksiyonunu uygula**

Fonksiyon sırası:

1. Community satırlarını `onConflictDoNothing({ target: communities.name })` ile ekle.
2. Seed adlarını `inArray(communities.name, COMMUNITY_SEED.map((item) => item.name))`
   ile geri oku ve `Map<string, string>` kur.
3. `const tickerSymbols = [...new Set(SENTIMENT_POST_SEED.flatMap((item) => item.tickerSymbols))]`
   listesini oluştur; `inArray(tickers.symbol, tickerSymbols)` ile ticker'ları oku ve
   `Map<string, string>` kur.
4. Eksik community/ticker varsa hangi anahtarın eksik olduğunu söyleyen hata fırlat.
5. Altı post satırını çözümlenmiş `communityId` ile `onConflictDoNothing()` ekle.
6. Köprü satırlarını çözümlenmiş `tickerId` ile `onConflictDoNothing()` ekle.
7. Yeni community/post/köprü sayılarını döndür.

`main()` içinde `seedTickers()` çağrısından sonra `seedSentiment()` çağır ve üç sayıyı logla. Böylece ticker FK'ları seed sırasından önce hazırdır.

- [ ] **Step 3: Mock sentiment bloğunu ve bağımlılıklarını temizle**

`src/mocks/index.ts` içinde:

- Importu yalnız `MarketQuote` tipine indir.
- Sentiment ticker nesnesini, communities nesnesini, altı gönderiyi, summary'yi ve trend listesini sil.
- Üst yorumu yalnız piyasa mock verisini tarif edecek şekilde güncelle.
- `NOW`, `ago()` ve `marketQuotes` içeriğini koru.
- Geçersiz Faz 2C ve eski dailyVideo yorumlarını kaldır.

- [ ] **Step 4: Task 4 testleri ve seed entegrasyon doğrulaması**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: bütün testler PASS.

Run: `npm run typecheck`

Expected: exit 0.

Veritabanı çalışıyorsa migration ve seed'i iki kez çalıştır:

```powershell
npm run db:migrate
npm run seed
npm run seed
```

Expected: ikinci seed çalışması community/post/köprü satırlarını çoğaltmaz. Ortam veritabanı başlatmaya izin vermiyorsa bu entegrasyon kontrolünü açıkça raporla; statik ve build doğrulamasını sürdür.

- [ ] **Step 5: Task 4 commit**

```powershell
git add -- scripts/seed.ts src/mocks/index.ts
git commit -m "feat: topluluk duyarlılık verisini seed et"
```

---

### Task 5: Tam Doğrulama ve Teslim

**Files:**
- Modify: yalnız doğrulama bir sorun gösterirse ilgili Faz 2C dosyaları.
- Delete: `.next/` (üretilmiş ve yeniden oluşturulabilir build cache'i; kullanıcı açıkça istedi).

**Interfaces:**
- Consumes: Task 1-4'ün tamamlanmış entegrasyonu.
- Produces: temiz format, tip kontrolü, lint ve production build kanıtı.

- [ ] **Step 1: Test paketini yeniden çalıştır**

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: bütün testler PASS, uyarı veya beklenmedik log yok.

- [ ] **Step 2: İstenen kalite komutlarını kesin sırayla çalıştır**

Run: `npm run format`

Expected: exit 0.

Run: `npm run typecheck`

Expected: exit 0.

Run: `npm run lint`

Expected: exit 0.

Bir komut dosya değiştirir veya hata gösterirse yalnız Faz 2C kapsamındaki nedeni düzelt, ardından sıra başından `format -> typecheck -> lint` çalıştır.

- [ ] **Step 3: `.next` hedefini doğrula ve temizle**

Run:

```powershell
$workspacePath = (Get-Location).Path
$nextPath = (Resolve-Path -LiteralPath '.next').Path
if ([IO.Path]::GetDirectoryName($nextPath) -ne $workspacePath -or
    [IO.Path]::GetFileName($nextPath) -ne '.next') {
  throw "Güvensiz .next hedefi: $nextPath"
}
Remove-Item -LiteralPath $nextPath -Recurse -Force
```

`.next` zaten yoksa `Resolve-Path` yerine önce `Test-Path -LiteralPath '.next'` guard'ı kullan ve silme adımını başarıyla atla.

- [ ] **Step 4: Production build'i çalıştır**

Run: `npm run build`

Expected: exit 0; `/topluluk` rota çıktısında dinamik olarak işaretlenir ve build sırasında veritabanı bağlantısı zorlanmaz.

- [ ] **Step 5: Son diff ve kapsam denetimi**

Run:

```powershell
git status --short
git diff --check
git diff --stat HEAD~4..HEAD
```

Faz 2C dışındaki başlangıçta mevcut kullanıcı değişikliklerinin commitlere girmediğini doğrula. `src/server/services/sentiment.ts` veya başka bir yeni üretim dosyasında `@/mocks` sentiment bağımlılığı kalmadığını ara:

```powershell
Get-ChildItem -Path 'src' -Recurse -File |
  Select-String -Pattern 'sentimentPosts|sentimentSummary|tickerSentiments'
```

Expected: eski mock exportlarına üretim referansı yok.

- [ ] **Step 6: Doğrulama düzeltmeleri varsa commit et ve teslim et**

Yalnız doğrulamanın gerektirdiği Faz 2C dosyaları değiştiyse onları ayrı commit et:

```powershell
git add -- src/lib/db/schema.ts drizzle src/lib/db/queries/sentiment.logic.ts src/lib/db/queries/sentiment.ts src/lib/db/queries/sentiment.test.ts scripts/seed.ts src/mocks/index.ts 'src/server/services/sentiment.ts' 'src/app/(dashboard)/topluluk/page.tsx'
git commit -m "fix: Faz 2C doğrulama bulgularını gider"
```

Son yanıtta değişen mimariyi, seed yolu kararını, test/format/typecheck/lint/build exit durumlarını ve varsa çalıştırılamayan veritabanı entegrasyon kontrolünü kısaca bildir. `finishing-a-development-branch` çağırma.
