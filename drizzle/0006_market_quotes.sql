-- Faz 2F — piyasa verisi.
--
-- Elle yazıldı, `drizzle-kit generate` ile değil: `drizzle/meta/` zinciri
-- 0004'te koptu (0004_snapshot.json hiç üretilmemiş, 0005_snapshot.json ise
-- yeniden adlandırma öncesi `tracks`/`steps` durumunu anlatıyor). Generator bu
-- yüzden her çalıştırmada "tracks silindi mi, weeks'e mi dönüştü?" diye
-- interaktif soru soruyor. 0004 ve 0005 de aynı nedenle elle yazılmıştı.
--
-- `asset_type` enum'u 0000'de kurulmuştu, yeniden tanımlanmıyor.

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
CREATE TABLE "market_daily" (
	"symbol" text NOT NULL,
	"day" date NOT NULL,
	"close" double precision NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "market_daily_symbol_day_pk" PRIMARY KEY("symbol","day")
);
--> statement-breakpoint
ALTER TABLE "market_daily" ADD CONSTRAINT "market_daily_symbol_market_quotes_symbol_fk" FOREIGN KEY ("symbol") REFERENCES "public"."market_quotes"("symbol") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "market_daily_symbol_day_idx" ON "market_daily" USING btree ("symbol","day" DESC NULLS LAST);
