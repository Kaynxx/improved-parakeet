/**
 * Faz 2A + 2B şeması.
 *
 * Şema **dilim dilim** kuruluyor. 2C topluluk (communities/posts/post_sentiment/
 * post_tickers/ticker_sentiment_daily), 2D video (videos/step_videos),
 * 2E auth (users ve ona bağlı her şey), 2F piyasa tabloları kendi dilimlerinde
 * eklenecek.
 */

import { type SQL, sql } from "drizzle-orm";
import {
  boolean,
  customType,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/** Postgres tam metin arama vektörü — Drizzle'da yerleşik karşılığı yok. */
const tsvector = customType<{ data: string; driverData: string }>({
  dataType() {
    return "tsvector";
  },
});

export const sourceCategory = pgEnum("source_category", ["markets", "crypto", "macro", "tech"]);
export const assetType = pgEnum("asset_type", ["equity", "index", "crypto", "commodity", "fx"]);
export const trackLevel = pgEnum("track_level", ["beginner", "intermediate", "advanced"]);
export const runStatus = pgEnum("run_status", ["running", "success", "error"]);

// --- Haber motoru ---------------------------------------------------------

export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  feedUrl: text("feed_url").notNull(),
  siteUrl: text("site_url").notNull(),
  faviconUrl: text("favicon_url"),
  category: sourceCategory("category").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  /** 2B'de worker her başarılı çekimde günceller. */
  lastFetchedAt: timestamp("last_fetched_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "cascade" }),
    /** Feed'in kendi kimliği — aynı makalenin iki kez girmesini engeller. */
    externalGuid: text("external_guid").notNull().unique(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    /**
     * Benzersiz: bazı feed'ler aynı makaleye zamanla farklı guid üretiyor.
     * guid tek başına tekilleştirme için yetmez, URL ikinci savunma hattı.
     */
    url: text("url").notNull().unique(),
    author: text("author"),
    summary: text("summary"),
    /** Readability çıktısının sanitize edilmiş hâli (2B). */
    contentHtml: text("content_html"),
    contentText: text("content_text"),
    imageUrl: text("image_url"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
    readingTimeMin: integer("reading_time_min").notNull().default(1),
    isBreaking: boolean("is_breaking").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    /**
     * Üretilmiş kolon: başlık + özet üzerinden arama vektörü. Generated olması
     * bilinçli — elle güncellenen bir tsvector er ya da geç bayatlar.
     */
    searchTsv: tsvector("search_tsv").generatedAlwaysAs(
      (): SQL =>
        sql`to_tsvector('english', coalesce(${articles.title}, '') || ' ' || coalesce(${articles.summary}, ''))`,
    ),
  },
  (table) => [
    index("articles_published_at_idx").on(table.publishedAt.desc()),
    index("articles_source_id_idx").on(table.sourceId),
    index("articles_search_tsv_idx").using("gin", table.searchTsv),
  ],
);

/**
 * Her kaynak çekiminin kaydı (2B). Bir satır = bir kaynağın bir taraması.
 *
 * Neden tutuluyor: çekim ağ üzerinden, dış sistemlere bağlı ve sessizce
 * bozulabilen bir iş. "Neden yeni haber yok?" sorusunun cevabı ancak burada
 * durur — kaynak mı 403 dönüyor, feed mi boş, yoksa hepsi zaten görülmüş mü.
 */
export const ingestionRuns = pgTable(
  "ingestion_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "cascade" }),
    status: runStatus("status").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    /** Feed'de görülen kayıt sayısı. */
    itemsSeen: integer("items_seen").notNull().default(0),
    /** Bunlardan kaçı yeni satır oldu — gerisi zaten vardı. */
    itemsInserted: integer("items_inserted").notNull().default(0),
    /** Yalnız status='error' iken dolu. */
    error: text("error"),
  },
  (table) => [
    index("ingestion_runs_source_started_idx").on(table.sourceId, table.startedAt.desc()),
  ],
);

// --- Semboller (modülleri birbirine bağlayan omurga) ----------------------

export const tickers = pgTable("tickers", {
  id: uuid("id").primaryKey().defaultRandom(),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  assetType: assetType("asset_type").notNull(),
});

export const articleTickers = pgTable(
  "article_tickers",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    tickerId: uuid("ticker_id")
      .notNull()
      .references(() => tickers.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.articleId, table.tickerId] }),
    index("article_tickers_ticker_id_idx").on(table.tickerId),
  ],
);

// --- Akademi --------------------------------------------------------------

export const tracks = pgTable("tracks", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: trackLevel("level").notNull(),
  orderIndex: integer("order_index").notNull(),
});

export const steps = pgTable(
  "steps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    trackId: uuid("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    /** Ders metni; 2A'da boş, içerik üretimi ayrı bir iş. */
    contentMd: text("content_md"),
    estimatedMin: integer("estimated_min").notNull(),
    orderIndex: integer("order_index").notNull(),
  },
  (table) => [
    // Slug yalnız parça içinde benzersiz — URL zaten /akademi/[track]/[step].
    uniqueIndex("steps_track_slug_idx").on(table.trackId, table.slug),
  ],
);

/** Yol haritasının DAG kenarları. */
export const stepPrerequisites = pgTable(
  "step_prerequisites",
  {
    stepId: uuid("step_id")
      .notNull()
      .references(() => steps.id, { onDelete: "cascade" }),
    prerequisiteStepId: uuid("prerequisite_step_id")
      .notNull()
      .references(() => steps.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.stepId, table.prerequisiteStepId] })],
);
