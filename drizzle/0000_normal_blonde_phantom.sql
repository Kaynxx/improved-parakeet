CREATE TYPE "public"."asset_type" AS ENUM('equity', 'index', 'crypto', 'commodity', 'fx');--> statement-breakpoint
CREATE TYPE "public"."source_category" AS ENUM('markets', 'crypto', 'macro', 'tech');--> statement-breakpoint
CREATE TYPE "public"."track_level" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TABLE "article_tickers" (
	"article_id" uuid NOT NULL,
	"ticker_id" uuid NOT NULL,
	CONSTRAINT "article_tickers_article_id_ticker_id_pk" PRIMARY KEY("article_id","ticker_id")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"external_guid" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"url" text NOT NULL,
	"author" text,
	"summary" text,
	"content_html" text,
	"content_text" text,
	"image_url" text,
	"published_at" timestamp with time zone NOT NULL,
	"reading_time_min" integer DEFAULT 1 NOT NULL,
	"is_breaking" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"search_tsv" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', coalesce("articles"."title", '') || ' ' || coalesce("articles"."summary", ''))) STORED,
	CONSTRAINT "articles_external_guid_unique" UNIQUE("external_guid"),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"feed_url" text NOT NULL,
	"site_url" text NOT NULL,
	"favicon_url" text,
	"category" "source_category" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_fetched_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sources_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "step_prerequisites" (
	"step_id" uuid NOT NULL,
	"prerequisite_step_id" uuid NOT NULL,
	CONSTRAINT "step_prerequisites_step_id_prerequisite_step_id_pk" PRIMARY KEY("step_id","prerequisite_step_id")
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"track_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"content_md" text,
	"estimated_min" integer NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"symbol" text NOT NULL,
	"name" text NOT NULL,
	"asset_type" "asset_type" NOT NULL,
	CONSTRAINT "tickers_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "tracks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"level" "track_level" NOT NULL,
	"order_index" integer NOT NULL,
	CONSTRAINT "tracks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "article_tickers" ADD CONSTRAINT "article_tickers_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tickers" ADD CONSTRAINT "article_tickers_ticker_id_tickers_id_fk" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "step_prerequisites" ADD CONSTRAINT "step_prerequisites_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "step_prerequisites" ADD CONSTRAINT "step_prerequisites_prerequisite_step_id_steps_id_fk" FOREIGN KEY ("prerequisite_step_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_track_id_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."tracks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "article_tickers_ticker_id_idx" ON "article_tickers" USING btree ("ticker_id");--> statement-breakpoint
CREATE INDEX "articles_published_at_idx" ON "articles" USING btree ("published_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "articles_source_id_idx" ON "articles" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "articles_search_tsv_idx" ON "articles" USING gin ("search_tsv");--> statement-breakpoint
CREATE UNIQUE INDEX "steps_track_slug_idx" ON "steps" USING btree ("track_id","slug");