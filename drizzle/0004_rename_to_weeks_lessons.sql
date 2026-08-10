-- Migration: tracks→weeks, steps→lessons, step_prerequisites→lesson_prerequisites
-- Yeni tablolar: lesson_sources, lesson_prompts, lesson_answers, answer_feedback
-- Yeni enum'lar: source_kind, source_level, prompt_kind

-- 1. Eski FK kısıtlamalarını kaldır
ALTER TABLE "step_prerequisites" DROP CONSTRAINT IF EXISTS "step_prerequisites_step_id_steps_id_fk";--> statement-breakpoint
ALTER TABLE "step_prerequisites" DROP CONSTRAINT IF EXISTS "step_prerequisites_prerequisite_step_id_steps_id_fk";--> statement-breakpoint
ALTER TABLE "steps" DROP CONSTRAINT IF EXISTS "steps_track_id_tracks_id_fk";--> statement-breakpoint
ALTER TABLE "user_progress" DROP CONSTRAINT IF EXISTS "user_progress_step_id_steps_id_fk";--> statement-breakpoint

-- 2. Eski PK kısıtlamalarını kaldır
ALTER TABLE "step_prerequisites" DROP CONSTRAINT IF EXISTS "step_prerequisites_step_id_prerequisite_step_id_pk";--> statement-breakpoint
ALTER TABLE "user_progress" DROP CONSTRAINT IF EXISTS "user_progress_user_id_step_id_pk";--> statement-breakpoint

-- 3. Eski index'leri kaldır
DROP INDEX IF EXISTS "steps_track_slug_idx";--> statement-breakpoint

-- 4. Tabloları yeniden adlandır
ALTER TABLE "tracks" RENAME TO "weeks";--> statement-breakpoint
ALTER TABLE "steps" RENAME TO "lessons";--> statement-breakpoint
ALTER TABLE "step_prerequisites" RENAME TO "lesson_prerequisites";--> statement-breakpoint

-- 5. Sütunları yeniden adlandır
ALTER TABLE "lessons" RENAME COLUMN "track_id" TO "week_id";--> statement-breakpoint
ALTER TABLE "lesson_prerequisites" RENAME COLUMN "step_id" TO "lesson_id";--> statement-breakpoint
ALTER TABLE "lesson_prerequisites" RENAME COLUMN "prerequisite_step_id" TO "prerequisite_lesson_id";--> statement-breakpoint
ALTER TABLE "user_progress" RENAME COLUMN "step_id" TO "lesson_id";--> statement-breakpoint

-- 6. Unique constraint'i yeniden adlandır
ALTER TABLE "weeks" RENAME CONSTRAINT "tracks_slug_unique" TO "weeks_slug_unique";--> statement-breakpoint

-- 7. Yeni FK kısıtlamalarını ekle
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_week_id_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."weeks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_prerequisites" ADD CONSTRAINT "lesson_prerequisites_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_prerequisites" ADD CONSTRAINT "lesson_prerequisites_prerequisite_lesson_id_lessons_id_fk" FOREIGN KEY ("prerequisite_lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- 8. PK'ları yeniden oluştur
ALTER TABLE "lesson_prerequisites" ADD CONSTRAINT "lesson_prerequisites_lesson_id_prerequisite_lesson_id_pk" PRIMARY KEY ("lesson_id", "prerequisite_lesson_id");--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_lesson_id_pk" PRIMARY KEY ("user_id", "lesson_id");--> statement-breakpoint

-- 9. Index'leri yeniden oluştur
CREATE UNIQUE INDEX "lessons_week_slug_idx" ON "lessons" USING btree ("week_id","slug");--> statement-breakpoint

-- 10. Yeni enum türleri
CREATE TYPE "public"."source_kind" AS ENUM('video', 'article', 'discussion');--> statement-breakpoint
CREATE TYPE "public"."source_level" AS ENUM('orta', 'ileri', 'uzman');--> statement-breakpoint
CREATE TYPE "public"."prompt_kind" AS ENUM('acik', 'sayisal', 'tahmin');--> statement-breakpoint

-- 11. Yeni tablolar
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
);--> statement-breakpoint
ALTER TABLE "lesson_sources" ADD CONSTRAINT "lesson_sources_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_sources_lesson_url_idx" ON "lesson_sources" USING btree ("lesson_id","url");--> statement-breakpoint

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
);--> statement-breakpoint
ALTER TABLE "lesson_prompts" ADD CONSTRAINT "lesson_prompts_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_prompts_lesson_key_idx" ON "lesson_prompts" USING btree ("lesson_id","key");--> statement-breakpoint

CREATE TABLE "lesson_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"prompt_id" uuid NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_prompt_id_lesson_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."lesson_prompts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_answers_user_prompt_idx" ON "lesson_answers" USING btree ("user_id","prompt_id");--> statement-breakpoint

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
);--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD CONSTRAINT "answer_feedback_answer_id_lesson_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."lesson_answers"("id") ON DELETE cascade ON UPDATE no action;
