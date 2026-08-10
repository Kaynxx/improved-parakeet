/**
 * Akademi servisi — kaynak: **Postgres**.
 *
 * Hafta ve ders içeriği `content/akademi/` altındaki markdown dosyalarından
 * seed ile veritabanına iner; bu katman yalnız okur.
 *
 * **`userId` neden parametre, servis neden `auth()` çağırmıyor:** Faz 1'de
 * kurulan sınır kuralı — servisler bağlam değil veri alır. Böylece hem test
 * edilebilir kalıyorlar hem de Auth.js'e bağlanmıyorlar.
 */

import { findStepContent, findTrackBySlug, findTracks } from "@/lib/db/queries/academy";
import { findLessonPrompts, findLessonSources } from "@/lib/db/queries/lesson";
import type { LessonSource, PromptWithAnswer, RoadmapStep, Track } from "@/types";

export function getTracks(userId: string): Promise<Track[]> {
  return findTracks(userId);
}

/** Panelde gösterilecek hafta: ilerlemesi başlamış ilki, yoksa ilk hafta. */
export async function getActiveTrack(userId: string): Promise<Track | null> {
  const weeks = await getTracks(userId);
  const started = weeks.find(
    (week) => week.completedSteps > 0 && week.completedSteps < week.totalSteps,
  );
  return started ?? weeks[0] ?? null;
}

export interface LessonView {
  track: Track;
  step: RoadmapStep;
  contentMd: string | null;
  sources: LessonSource[];
  prompts: PromptWithAnswer[];
}

export async function getStep(
  userId: string,
  weekSlug: string,
  lessonSlug: string,
): Promise<LessonView | null> {
  const track = await findTrackBySlug(userId, weekSlug);
  const step = track?.steps.find((item) => item.slug === lessonSlug);
  if (!track || !step) return null;

  const [content, sources, prompts] = await Promise.all([
    findStepContent(weekSlug, lessonSlug),
    findLessonSources(step.id),
    findLessonPrompts(step.id, userId),
  ]);

  return { track, step, contentMd: content?.contentMd ?? null, sources, prompts };
}
