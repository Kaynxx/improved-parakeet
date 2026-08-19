CREATE TYPE "public"."asset_type" AS ENUM('equity', 'index', 'crypto', 'commodity', 'fx');--> statement-breakpoint
CREATE TYPE "public"."prompt_kind" AS ENUM('acik', 'sayisal', 'tahmin');--> statement-breakpoint
CREATE TYPE "public"."run_status" AS ENUM('running', 'success', 'error');--> statement-breakpoint
CREATE TYPE "public"."sentiment_label" AS ENUM('bullish', 'bearish', 'neutral');--> statement-breakpoint
CREATE TYPE "public"."source_category" AS ENUM('markets', 'crypto', 'macro', 'tech');--> statement-breakpoint
CREATE TYPE "public"."source_kind" AS ENUM('video', 'article', 'discussion');--> statement-breakpoint
CREATE TYPE "public"."source_level" AS ENUM('orta', 'ileri', 'uzman');--> statement-breakpoint
CREATE TYPE "public"."step_status" AS ENUM('not_started', 'reading', 'answered', 'reviewed', 'mastered');--> statement-breakpoint
CREATE TYPE "public"."track_level" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TABLE "answer_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"answer_id" uuid NOT NULL,
	"model" text NOT NULL,
	"score" integer NOT NULL,
	"strengths" text[] NOT NULL,
	"gaps" text[] NOT NULL,
	"feedback_md" text NOT NULL,
	"follow_up" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	CONSTRAINT "articles_slug_unique" UNIQUE("slug"),
	CONSTRAINT "articles_url_unique" UNIQUE("url")
);
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
CREATE TABLE "ingestion_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"status" "run_status" NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"items_seen" integer DEFAULT 0 NOT NULL,
	"items_inserted" integer DEFAULT 0 NOT NULL,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "lesson_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"prompt_id" uuid NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_prerequisites" (
	"lesson_id" uuid NOT NULL,
	"prerequisite_lesson_id" uuid NOT NULL,
	CONSTRAINT "lesson_prerequisites_lesson_id_prerequisite_lesson_id_pk" PRIMARY KEY("lesson_id","prerequisite_lesson_id")
);
--> statement-breakpoint
CREATE TABLE "lesson_prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"key" text NOT NULL,
	"kind" "prompt_kind" NOT NULL,
	"points" integer NOT NULL,
	"prompt_md" text NOT NULL,
	"rubric_md" text,
	"expected_numeric" text,
	"tolerance" text,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"kind" "source_kind" NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"provider" text,
	"youtube_id" text,
	"duration_label" text,
	"level" "source_level" NOT NULL,
	"summary" text NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"week_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"content_md" text,
	"estimated_min" integer NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "market_daily" (
	"symbol" text NOT NULL,
	"day" date NOT NULL,
	"close" double precision NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "market_daily_symbol_day_pk" PRIMARY KEY("symbol","day")
);
--> statement-breakpoint
CREATE TABLE "market_quotes" (
	"symbol" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"asset_type" "asset_type" NOT NULL,
	"provider_symbol" text NOT NULL,
	"proxy_for" text,
	"price" double precision NOT NULL,
	"change" double precision NOT NULL,
	"change_percent" double precision NOT NULL,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tickers" (
	"post_id" uuid NOT NULL,
	"ticker_id" uuid NOT NULL,
	CONSTRAINT "post_tickers_post_id_ticker_id_pk" PRIMARY KEY("post_id","ticker_id")
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
CREATE TABLE "tickers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"symbol" text NOT NULL,
	"name" text NOT NULL,
	"asset_type" "asset_type" NOT NULL,
	CONSTRAINT "tickers_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"user_id" text NOT NULL,
	"lesson_id" uuid NOT NULL,
	"status" "step_status" DEFAULT 'not_started' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_progress_user_id_lesson_id_pk" PRIMARY KEY("user_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "weeks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"level" "track_level" NOT NULL,
	"order_index" integer NOT NULL,
	CONSTRAINT "weeks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD CONSTRAINT "answer_feedback_answer_id_lesson_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."lesson_answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tickers" ADD CONSTRAINT "article_tickers_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tickers" ADD CONSTRAINT "article_tickers_ticker_id_tickers_id_fk" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingestion_runs" ADD CONSTRAINT "ingestion_runs_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_prompt_id_lesson_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."lesson_prompts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_prerequisites" ADD CONSTRAINT "lesson_prerequisites_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_prerequisites" ADD CONSTRAINT "lesson_prerequisites_prerequisite_lesson_id_lessons_id_fk" FOREIGN KEY ("prerequisite_lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_prompts" ADD CONSTRAINT "lesson_prompts_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_sources" ADD CONSTRAINT "lesson_sources_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_week_id_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."weeks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "market_daily" ADD CONSTRAINT "market_daily_symbol_market_quotes_symbol_fk" FOREIGN KEY ("symbol") REFERENCES "public"."market_quotes"("symbol") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tickers" ADD CONSTRAINT "post_tickers_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tickers" ADD CONSTRAINT "post_tickers_ticker_id_tickers_id_fk" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "article_tickers_ticker_id_idx" ON "article_tickers" USING btree ("ticker_id");--> statement-breakpoint
CREATE INDEX "articles_published_at_idx" ON "articles" USING btree ("published_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "articles_source_id_idx" ON "articles" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "articles_search_tsv_idx" ON "articles" USING gin ("search_tsv");--> statement-breakpoint
CREATE INDEX "community_posts_community_id_idx" ON "community_posts" USING btree ("community_id");--> statement-breakpoint
CREATE INDEX "community_posts_sentiment_label_idx" ON "community_posts" USING btree ("sentiment_label");--> statement-breakpoint
CREATE INDEX "ingestion_runs_source_started_idx" ON "ingestion_runs" USING btree ("source_id","started_at" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_answers_user_prompt_idx" ON "lesson_answers" USING btree ("user_id","prompt_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_prompts_lesson_key_idx" ON "lesson_prompts" USING btree ("lesson_id","key");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_sources_lesson_url_idx" ON "lesson_sources" USING btree ("lesson_id","url");--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_week_slug_idx" ON "lessons" USING btree ("week_id","slug");--> statement-breakpoint
CREATE INDEX "market_daily_symbol_day_idx" ON "market_daily" USING btree ("symbol","day" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "post_tickers_ticker_id_idx" ON "post_tickers" USING btree ("ticker_id");