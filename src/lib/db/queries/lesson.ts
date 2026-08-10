import { and, asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { answerFeedback, lessonAnswers, lessonPrompts, lessonSources } from "@/lib/db/schema";
import type { LessonSource, PromptWithAnswer } from "@/types";

export async function findLessonSources(lessonId: string): Promise<LessonSource[]> {
  const rows = await getDb()
    .select()
    .from(lessonSources)
    .where(eq(lessonSources.lessonId, lessonId))
    .orderBy(asc(lessonSources.orderIndex));

  return rows.map((row) => ({
    id: row.id,
    kind: row.kind,
    title: row.title,
    url: row.url,
    provider: row.provider,
    youtubeId: row.youtubeId,
    durationLabel: row.durationLabel,
    level: row.level,
    summary: row.summary,
  }));
}

/**
 * Dersin soruları + bu kullanıcının cevapları + en son AI değerlendirmesi.
 *
 * Üç tabloyu tek sorguda birleştirmek yerine iki sorgu: `answer_feedback`
 * bir cevaba ait BİRDEN ÇOK satır tutabiliyor (kullanıcı cevabı düzeltip
 * yeniden değerlendirtebilir) ve tek LEFT JOIN'de en yenisini seçmek
 * pencere fonksiyonu gerektirirdi. İki sorgu daha okunur ve soru sayısı
 * ders başına 3-5.
 */
export async function findLessonPrompts(
  lessonId: string,
  userId: string,
): Promise<PromptWithAnswer[]> {
  const rows = await getDb()
    .select({ prompt: lessonPrompts, answer: lessonAnswers })
    .from(lessonPrompts)
    .leftJoin(
      lessonAnswers,
      and(eq(lessonAnswers.promptId, lessonPrompts.id), eq(lessonAnswers.userId, userId)),
    )
    .where(eq(lessonPrompts.lessonId, lessonId))
    .orderBy(asc(lessonPrompts.orderIndex));

  const answerIds = rows.map((r) => r.answer?.id).filter((id): id is string => Boolean(id));
  const feedbackByAnswer = await findLatestFeedback(answerIds);

  return rows.map(({ prompt, answer }) => ({
    prompt: {
      id: prompt.id,
      key: prompt.key,
      kind: prompt.kind,
      points: prompt.points,
      promptMd: prompt.promptMd,
      rubricMd: prompt.rubricMd,
      expectedNumeric: prompt.expectedNumeric,
      tolerance: prompt.tolerance,
    },
    answer: answer
      ? { id: answer.id, body: answer.body, updatedAt: answer.updatedAt.toISOString() }
      : null,
    feedback: answer ? (feedbackByAnswer.get(answer.id) ?? null) : null,
  }));
}

/** Cevap başına EN SON değerlendirme. Boş listede sorgu hiç atılmaz. */
async function findLatestFeedback(answerIds: string[]) {
  const map = new Map<string, PromptWithAnswer["feedback"]>();
  if (answerIds.length === 0) return map;

  const rows = await getDb().select().from(answerFeedback).orderBy(desc(answerFeedback.createdAt));

  for (const row of rows) {
    if (!answerIds.includes(row.answerId)) continue;
    if (map.has(row.answerId)) continue; // ilk gelen en yenisi
    map.set(row.answerId, {
      model: row.model,
      score: row.score,
      strengths: row.strengths,
      gaps: row.gaps,
      feedbackMd: row.feedbackMd,
      followUp: row.followUp,
      createdAt: row.createdAt.toISOString(),
    });
  }

  return map;
}
