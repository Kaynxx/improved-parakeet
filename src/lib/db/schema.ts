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
/**
 * **`tracks`/`steps` değil `weeks`/`lessons`.** Bir "parça" (track) paralel bir
 * yol demek; müfredat 8 SIRALI hafta olduğu için isim yalan söylüyordu. İçerik
 * ve kullanıcı yokken yeniden adlandırmak mekanik; içerik yazıldıktan sonra
 * aynı değişiklik çok daha pahalı olurdu.
 */

export const weeks = pgTable("weeks", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: trackLevel("level").notNull(),
  /** Haftanın sıra numarası: 1-8. URL ve başlıklar bundan türer. */
  orderIndex: integer("order_index").notNull(),
});

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    weekId: uuid("week_id")
      .notNull()
      .references(() => weeks.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    /** Ders gövdesi (markdown). `content/akademi/` altındaki dosyadan gelir. */
    contentMd: text("content_md"),
    estimatedMin: integer("estimated_min").notNull(),
    orderIndex: integer("order_index").notNull(),
  },
  (table) => [
    // Slug yalnız hafta içinde benzersiz — URL zaten /akademi/[hafta]/[ders].
    uniqueIndex("lessons_week_slug_idx").on(table.weekId, table.slug),
  ],
);

/** Ön koşul DAG'ı. Müfredat doğrusal ama yapı esnek kalıyor. */
export const lessonPrerequisites = pgTable(
  "lesson_prerequisites",
  {
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    prerequisiteLessonId: uuid("prerequisite_lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.lessonId, table.prerequisiteLessonId] })],
);

// --- Destekleyici kaynaklar ------------------------------------------------

export const sourceKind = pgEnum("source_kind", ["video", "article", "discussion"]);
export const sourceLevel = pgEnum("source_level", ["orta", "ileri", "uzman"]);

/**
 * Dersi destekleyen video / makale / tartışma. Ders dosyasının frontmatter'ından
 * seed ile türer — tek doğruluk kaynağı repodaki markdown.
 */
export const lessonSources = pgTable(
  "lesson_sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    kind: sourceKind("kind").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    /** Kanal, yayıncı ya da platform adı. */
    provider: text("provider"),
    /**
     * YouTube video kimliği — **seed sırasında URL'den çıkarılır.**
     * Render anında ayrıştırmak her sayfa yüklemesinde tekrar eden bir iş
     * ve bozuk URL'yi kullanıcıya taşırdı; burada bir kez çözülür.
     */
    youtubeId: text("youtube_id"),
    /** "42 dk" gibi serbest metin — kaynak süresini her zaman vermiyor. */
    durationLabel: text("duration_label"),
    level: sourceLevel("level").notNull(),
    summary: text("summary").notNull(),
    orderIndex: integer("order_index").notNull(),
  },
  (table) => [uniqueIndex("lesson_sources_lesson_url_idx").on(table.lessonId, table.url)],
);

// --- Sorular ve cevaplar ---------------------------------------------------

/**
 * `acik`     → serbest metin, AI ölçüte göre değerlendirir
 * `sayisal`  → beklenen değer + tolerans, deterministik kontrol
 * `tahmin`   → cevap kaydedilir, ileride gerçekleşenle karşılaştırılır
 */
export const promptKind = pgEnum("prompt_kind", ["acik", "sayisal", "tahmin"]);

export const lessonPrompts = pgTable(
  "lesson_prompts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    /** Ders içinde sabit anahtar — cevaplar bu anahtara bağlanır, sıraya değil. */
    key: text("key").notNull(),
    kind: promptKind("kind").notNull(),
    points: integer("points").notNull(),
    promptMd: text("prompt_md").notNull(),
    /** Değerlendirme ölçütü. `acik` sorularda ZORUNLU — AI'ın tek dayanağı. */
    rubricMd: text("rubric_md"),
    expectedNumeric: text("expected_numeric"),
    tolerance: text("tolerance"),
    orderIndex: integer("order_index").notNull(),
  },
  (table) => [uniqueIndex("lesson_prompts_lesson_key_idx").on(table.lessonId, table.key)],
);

export const lessonAnswers = pgTable(
  "lesson_answers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => lessonPrompts.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  // Kullanıcı başına soru başına TEK cevap; yeniden yazmak üzerine yazar.
  (table) => [uniqueIndex("lesson_answers_user_prompt_idx").on(table.userId, table.promptId)],
);

export const answerFeedback = pgTable("answer_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  answerId: uuid("answer_id")
    .notNull()
    .references(() => lessonAnswers.id, { onDelete: "cascade" }),
  /** Hangi model değerlendirdi — model değişince eski puanlar bağlamını korusun. */
  model: text("model").notNull(),
  score: integer("score").notNull(),
  strengths: text("strengths").array().notNull(),
  gaps: text("gaps").array().notNull(),
  feedbackMd: text("feedback_md").notNull(),
  followUp: text("follow_up"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// --- Kimlik (2E) ----------------------------------------------------------
/**
 * **Tek tablo.** Giriş e-posta + şifre ile; Auth.js'in `account` / `session` /
 * `verificationToken` tabloları OAuth ve veritabanı oturumu içindi, ikisi de
 * kullanılmıyor. Şifreli giriş (Credentials provider) Auth.js'te **yalnız JWT
 * oturumuyla** çalışıyor, dolayısıyla oturum sunucuda saklanmıyor ve adapter'a
 * hiç ihtiyaç yok.
 *
 * Bedeli: oturum sunucudan iptal edilemez, süresi dolana kadar geçerli.
 * Faydası: JWT Edge'de doğrulanabildiği için middleware artık gerçek bir
 * güvenlik kontrolü yapabiliyor.
 */
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  /** argon2id özeti. **Şifrenin kendisi hiçbir yerde saklanmaz.** */
  passwordHash: text("password_hash").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// --- Akademi ilerlemesi (2E) ----------------------------------------------
/**
 * Beş aşama, ve her biri **gözlenebilir bir olaya** bağlı — "anladım" gibi bir
 * hisse değil:
 *   reading   → ders açıldı
 *   answered  → sorular dolduruldu
 *   reviewed  → AI geri bildirimi geldi
 *   mastered  → ortalama skor ≥ 70
 * `answered` ve sonrası 2F'de (sorular + değerlendirme) yazılmaya başlar;
 * 2E yalnız tabloyu ve okuma yolunu kurar.
 */
export const stepStatus = pgEnum("step_status", [
  "not_started",
  "reading",
  "answered",
  "reviewed",
  "mastered",
]);

export const userProgress = pgTable(
  "user_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    status: stepStatus("status").notNull().default("not_started"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.lessonId] })],
);
