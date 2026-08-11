CREATE TYPE "public"."sentiment_label" AS ENUM('bullish', 'bearish', 'neutral');--> statement-breakpoint
CREATE TABLE "communities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platform" text DEFAULT 'reddit' NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"subscriber_count" integer NOT NULL,
	CONSTRAINT "communities_name_unique" UNIQUE("name")
);--> statement-breakpoint
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
);--> statement-breakpoint
CREATE TABLE "post_tickers" (
	"post_id" uuid NOT NULL,
	"ticker_id" uuid NOT NULL,
	CONSTRAINT "post_tickers_post_id_ticker_id_pk" PRIMARY KEY("post_id","ticker_id")
);--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tickers" ADD CONSTRAINT "post_tickers_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tickers" ADD CONSTRAINT "post_tickers_ticker_id_tickers_id_fk" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "community_posts_community_id_idx" ON "community_posts" USING btree ("community_id");--> statement-breakpoint
CREATE INDEX "community_posts_sentiment_label_idx" ON "community_posts" USING btree ("sentiment_label");--> statement-breakpoint
CREATE INDEX "post_tickers_ticker_id_idx" ON "post_tickers" USING btree ("ticker_id");
