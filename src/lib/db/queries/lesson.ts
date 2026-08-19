import { and, asc, desc, eq, inArray, isNotNull, ne } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  answerFeedback,
  lessonAnswers,
  lessonPrompts,
  lessonSources,
  lessons,
  weeks,
} from "@/lib/db/schema";
import type { LessonSource, PromptWithAnswer, VideoSuggestion } from "@/types";

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
 * Günlük öneriye aday videolar: gömülebilir YouTube kimliği olan ders kaynakları.
 *
 * `youtube_id` boşsa aday değil — kart oynatılamayan bir videoyu "günün videosu"
 * diye sunamaz. Sıralama hafta → ders → kaynak sırası üzerinden **sabit**:
 * seçim gün indeksine göre yapılıyor ve sıra oynarsa aynı gün içinde farklı
 * video gelirdi.
 */
export async function findVideoSources(): Promise<VideoSuggestion[]> {
  const rows = await getDb()
    .select({
      id: lessonSources.id,
      youtubeId: lessonSources.youtubeId,
      title: lessonSources.title,
      provider: lessonSources.provider,
      durationLabel: lessonSources.durationLabel,
      level: lessonSources.level,
      summary: lessonSources.summary,
      weekSlug: weeks.slug,
      lessonSlug: lessons.slug,
      lessonTitle: lessons.title,
    })
    .from(lessonSources)
    .innerJoin(lessons, eq(lessons.id, lessonSources.lessonId))
    .innerJoin(weeks, eq(weeks.id, lessons.weekId))
    .where(
      and(
        eq(lessonSources.kind, "video"),
        isNotNull(lessonSources.youtubeId),
        ne(lessonSources.youtubeId, ""),
      ),
    )
    .orderBy(asc(weeks.orderIndex), asc(lessons.orderIndex), asc(lessonSources.orderIndex));

  return rows.map((row) => ({
    id: row.id,
    // `isNotNull` filtresi garanti ediyor; tip daraltmayı Drizzle yapamıyor.
    youtubeId: row.youtubeId as string,
    title: row.title,
    channelTitle: row.provider,
    durationLabel: row.durationLabel,
    level: row.level,
    summary: row.summary,
    weekSlug: row.weekSlug,
    lessonSlug: row.lessonSlug,
    lessonTitle: row.lessonTitle,
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

/** `answer_feedback` satırının bu katmanda kullanılan biçimi. */
export interface GeriBildirimSatiri {
  answerId: string;
  model: string;
  score: number;
  strengths: string[];
  gaps: string[];
  feedbackMd: string;
  followUp: string | null;
  createdAt: Date;
}

/**
 * Cevap başına en yeni değerlendirme. Satırlar **tarihe göre azalan** gelmiş
 * olmalı; ilk görülen kazanır.
 *
 * Saf fonksiyon: seçim kuralı veritabanına gitmeden test edilebilsin. İstenmeyen
 * `answerId` burada da süzülüyor — sorgu zaten daraltıyor, ama iki katman
 * arasındaki sessiz bir uyumsuzluk başka kullanıcının geri bildirimini
 * sızdırırdı.
 */
export function enYeniGeriBildirimiSec(
  rows: GeriBildirimSatiri[],
  answerIds: string[],
): Map<string, PromptWithAnswer["feedback"]> {
  const map = new Map<string, PromptWithAnswer["feedback"]>();
  const istenenler = new Set(answerIds);

  for (const row of rows) {
    if (!istenenler.has(row.answerId)) continue;
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

/**
 * Cevap başına EN SON değerlendirme. Boş listede sorgu hiç atılmaz.
 *
 * **Denetim bulgusu DB-02:** bu sorgu eskiden `answer_feedback` tablosunun
 * TAMAMINI çekip bellekte süzüyordu. Sonuç doğruydu ama gereksiz hassas veri
 * işlemek ve büyüyen tabloda kaynak tüketmek demekti; filtre artık sorguda.
 */
async function findLatestFeedback(
  answerIds: string[],
): Promise<Map<string, PromptWithAnswer["feedback"]>> {
  if (answerIds.length === 0) return new Map();

  const rows = await getDb()
    .select()
    .from(answerFeedback)
    .where(inArray(answerFeedback.answerId, answerIds))
    .orderBy(desc(answerFeedback.createdAt));

  return enYeniGeriBildirimiSec(rows, answerIds);
}

/**
 * Soruyu **ders kimliğiyle birlikte** getirir. Yalnız `id` ile okumak,
 * istemciden gelen bir soru kimliğiyle başka dersin sorusuna cevap
 * yazılmasına izin verirdi.
 */
export async function findPromptInLesson(promptId: string, lessonId: string) {
  const rows = await getDb()
    .select()
    .from(lessonPrompts)
    .where(and(eq(lessonPrompts.id, promptId), eq(lessonPrompts.lessonId, lessonId)))
    .limit(1);

  return rows[0] ?? null;
}

/**
 * Cevabı yazar; aynı soruya ikinci gönderim **üzerine yazar**. Geri bildirim
 * satırları silinmez: revizyon geçmişi denetim izi olarak kalır.
 */
export async function upsertLessonAnswer(
  userId: string,
  promptId: string,
  body: string,
): Promise<string> {
  const [answer] = await getDb()
    .insert(lessonAnswers)
    .values({ userId, promptId, body })
    .onConflictDoUpdate({
      target: [lessonAnswers.userId, lessonAnswers.promptId],
      set: { body, updatedAt: new Date() },
    })
    .returning({ id: lessonAnswers.id });

  return answer.id;
}

/** Değerlendirmeyi ekler — güncellemez; her tur ayrı satır olarak kalır. */
export async function insertAnswerFeedback(
  data: typeof answerFeedback.$inferInsert,
): Promise<void> {
  await getDb().insert(answerFeedback).values(data);
}

/**
 * Rota slug'larından ders kimliği. Sunucu eylemleri kimliği istemciden
 * almasın diye var: slug zaten URL'de görünüyor, kimlik görünmüyor.
 */
export async function findLessonIdBySlugs(
  weekSlug: string,
  lessonSlug: string,
): Promise<string | null> {
  const rows = await getDb()
    .select({ id: lessons.id })
    .from(lessons)
    .innerJoin(weeks, eq(weeks.id, lessons.weekId))
    .where(and(eq(weeks.slug, weekSlug), eq(lessons.slug, lessonSlug)))
    .limit(1);

  return rows[0]?.id ?? null;
}
