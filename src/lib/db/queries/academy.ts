import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { stepPrerequisites, steps, tracks } from "@/lib/db/schema";
import type { RoadmapStep, Track } from "@/types";

/**
 * 2A'da adım durumu kullanıcıya bağlı değil: `user_progress` tablosu `users`'a
 * bağlı ve auth 2E'de geliyor. O yüzden her adım `not_started` döner ve
 * ilerleme halkası %0 gösterir. 2E'de burada `user_progress` join'i açılacak.
 */
const STATUS_UNTIL_AUTH = "not_started" as const;

export async function findTracks(): Promise<Track[]> {
  const [trackRows, stepRows, prereqRows] = await Promise.all([
    getDb().select().from(tracks).orderBy(asc(tracks.orderIndex)),
    getDb().select().from(steps).orderBy(asc(steps.orderIndex)),
    getDb().select().from(stepPrerequisites),
  ]);

  const prereqsByStep = new Map<string, string[]>();
  for (const row of prereqRows) {
    const list = prereqsByStep.get(row.stepId) ?? [];
    list.push(row.prerequisiteStepId);
    prereqsByStep.set(row.stepId, list);
  }

  const stepsByTrack = new Map<string, RoadmapStep[]>();
  const trackSlugById = new Map(trackRows.map((row) => [row.id, row.slug]));

  for (const row of stepRows) {
    const trackSlug = trackSlugById.get(row.trackId);
    if (!trackSlug) continue; // yetim adım — parça silinmişse

    const list = stepsByTrack.get(row.trackId) ?? [];
    list.push({
      id: row.id,
      slug: row.slug,
      trackSlug,
      title: row.title,
      summary: row.summary,
      estimatedMin: row.estimatedMin,
      orderIndex: row.orderIndex,
      prerequisiteIds: prereqsByStep.get(row.id) ?? [],
      status: STATUS_UNTIL_AUTH,
    });
    stepsByTrack.set(row.trackId, list);
  }

  return trackRows.map((row) => {
    const trackSteps = stepsByTrack.get(row.id) ?? [];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      level: row.level,
      steps: trackSteps,
      completedSteps: trackSteps.filter((step) => step.status === "completed").length,
      totalSteps: trackSteps.length,
    };
  });
}

export async function findTrackBySlug(slug: string): Promise<Track | null> {
  const all = await findTracks();
  return all.find((track) => track.slug === slug) ?? null;
}

/** Adım slug'ı yalnız parça içinde benzersiz — iki koşul birlikte daraltır. */
export async function findStepContent(
  trackSlug: string,
  stepSlug: string,
): Promise<{ contentMd: string | null } | null> {
  const rows = await getDb()
    .select({ contentMd: steps.contentMd })
    .from(steps)
    .innerJoin(tracks, eq(steps.trackId, tracks.id))
    .where(and(eq(tracks.slug, trackSlug), eq(steps.slug, stepSlug)))
    .limit(1);

  const row = rows[0];
  return row ? { contentMd: row.contentMd } : null;
}
