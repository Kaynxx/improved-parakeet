import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { findProgressByUser } from "@/lib/db/queries/progress";
import { lessonPrerequisites, lessons, weeks } from "@/lib/db/schema";
import type { RoadmapStep, Track } from "@/types";

/**
 * `userId` zorunlu — bu sorgu her zaman bir kullanıcıya ait. Kaydı olmayan
 * ders `not_started` sayılır, yani ilerleme tablosu boşken davranış tutarlı.
 */
export async function findTracks(userId: string): Promise<Track[]> {
  const [weekRows, lessonRows, prereqRows, progress] = await Promise.all([
    getDb().select().from(weeks).orderBy(asc(weeks.orderIndex)),
    getDb().select().from(lessons).orderBy(asc(lessons.orderIndex)),
    getDb().select().from(lessonPrerequisites),
    findProgressByUser(userId),
  ]);

  const prereqsByLesson = new Map<string, string[]>();
  for (const row of prereqRows) {
    const list = prereqsByLesson.get(row.lessonId) ?? [];
    list.push(row.prerequisiteLessonId);
    prereqsByLesson.set(row.lessonId, list);
  }

  const lessonsByWeek = new Map<string, RoadmapStep[]>();
  const weekSlugById = new Map(weekRows.map((row) => [row.id, row.slug]));

  for (const row of lessonRows) {
    const weekSlug = weekSlugById.get(row.weekId);
    if (!weekSlug) continue; // yetim ders — hafta silinmişse

    const list = lessonsByWeek.get(row.weekId) ?? [];
    list.push({
      id: row.id,
      slug: row.slug,
      weekSlug,
      title: row.title,
      summary: row.summary,
      estimatedMin: row.estimatedMin,
      orderIndex: row.orderIndex,
      prerequisiteIds: prereqsByLesson.get(row.id) ?? [],
      status: progress.get(row.id) ?? "not_started",
    });
    lessonsByWeek.set(row.weekId, list);
  }

  return weekRows.map((row) => {
    const weekLessons = lessonsByWeek.get(row.id) ?? [];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      level: row.level,
      steps: weekLessons,
      // Yalnız `mastered` sayılır. Ara aşamalara ağırlık vermek (her biri %25)
      // gerçek veri akmaya başlayınca eklenecek.
      completedSteps: weekLessons.filter((lesson) => lesson.status === "mastered").length,
      totalSteps: weekLessons.length,
    };
  });
}

export async function findTrackBySlug(userId: string, slug: string): Promise<Track | null> {
  const all = await findTracks(userId);
  return all.find((week) => week.slug === slug) ?? null;
}

/** Ders slug'ı yalnız hafta içinde benzersiz — iki koşul birlikte daraltır. */
export async function findStepContent(
  weekSlug: string,
  lessonSlug: string,
): Promise<{ contentMd: string | null } | null> {
  const rows = await getDb()
    .select({ contentMd: lessons.contentMd })
    .from(lessons)
    .innerJoin(weeks, eq(lessons.weekId, weeks.id))
    .where(and(eq(weeks.slug, weekSlug), eq(lessons.slug, lessonSlug)))
    .limit(1);

  const row = rows[0];
  return row ? { contentMd: row.contentMd } : null;
}
