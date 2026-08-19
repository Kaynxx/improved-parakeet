import "server-only";

import {
  findLessonPrompts,
  findPromptInLesson,
  insertAnswerFeedback,
  upsertLessonAnswer,
} from "@/lib/db/queries/lesson";
import { advanceProgress } from "@/lib/db/queries/progress";
import { DegerlendiriciYok, MODEL, degerlendir } from "@/server/ai/degerlendir";
import {
  deriveLessonStatus,
  evaluateNumericAnswer,
  parseNumericAnswer,
} from "@/server/services/lesson-practice.logic";

/** Deterministik değerlendirmenin "model" adı — AI puanlarıyla karışmasın diye ayrı. */
const DETERMINISTIK_MODEL = "deterministik-v1";

/** Cevap gövdesi üst sınırı. Rubrik değerlendirmesi için fazlasıyla yeterli. */
const EN_UZUN_CEVAP = 10_000;

export interface SubmitAnswerParams {
  userId: string;
  lessonId: string;
  promptId: string;
  body: string;
}

/**
 * `kaydedildi` cevabın diske indiğini söyler; `degerlendiriciKapali` yalnız
 * açık uçlu soruda anahtar yokken doğrudur. İkisi ayrı: cevap kaydedilmişken
 * "hata" göstermek kullanıcıya veri kaybettiğini düşündürüyordu.
 */
export interface SubmitAnswerResult {
  kaydedildi: boolean;
  degerlendiriciKapali: boolean;
  hata: string | null;
}

export async function submitLessonAnswer(params: SubmitAnswerParams): Promise<SubmitAnswerResult> {
  const body = params.body.trim();

  if (!body) {
    return { kaydedildi: false, degerlendiriciKapali: false, hata: "Cevap boş olamaz." };
  }
  if (body.length > EN_UZUN_CEVAP) {
    return {
      kaydedildi: false,
      degerlendiriciKapali: false,
      hata: `Cevap en fazla ${EN_UZUN_CEVAP} karakter olabilir.`,
    };
  }

  // Soru gerçekten bu derse mi ait: istemciden gelen kimliğe güvenilmez.
  const prompt = await findPromptInLesson(params.promptId, params.lessonId);
  if (!prompt) {
    return { kaydedildi: false, degerlendiriciKapali: false, hata: "Soru bu derse ait değil." };
  }

  // Cevap değerlendirmeden ÖNCE yazılır: AI çağrısı düşse bile emek kaybolmaz.
  const answerId = await upsertLessonAnswer(params.userId, params.promptId, body);

  let degerlendiriciKapali = false;

  if (prompt.kind === "sayisal") {
    await insertAnswerFeedback(sayisalGeriBildirim(answerId, prompt, body));
  } else if (prompt.kind === "acik") {
    try {
      const sonuc = await degerlendir({
        soru: prompt.promptMd,
        // Ölçüt yoksa soru seed doğrulamasından geçmemiş demektir; sessizce boş
        // ölçütle puanlamak keyfi puan üretirdi.
        olcut: prompt.rubricMd ?? "",
        cevap: body,
      });

      await insertAnswerFeedback({
        answerId,
        model: MODEL,
        score: sonuc.puan,
        strengths: sonuc.guclu_yanlar,
        gaps: sonuc.eksikler,
        feedbackMd: sonuc.geri_bildirim_md,
        followUp: sonuc.takip_sorusu,
      });
    } catch (error) {
      if (!(error instanceof DegerlendiriciYok)) throw error;
      degerlendiriciKapali = true;
    }
  }
  // `tahmin` puanlanmaz: sonucu henüz gerçekleşmemiş bir cevaba puan vermek
  // uydurma olurdu. Kayıt yeterli.

  await advanceProgress(params.userId, params.lessonId, await dersDurumu(params));

  return { kaydedildi: true, degerlendiriciKapali, hata: null };
}

async function dersDurumu({ userId, lessonId }: SubmitAnswerParams) {
  const hepsi = await findLessonPrompts(lessonId, userId);

  return deriveLessonStatus(
    hepsi.map(({ prompt, answer, feedback }) => ({
      kind: prompt.kind,
      points: prompt.points,
      answered: answer !== null,
      hasFeedback: feedback !== null,
      score: feedback?.score ?? null,
    })),
  );
}

/**
 * Sayısal cevap AI'a gitmez: beklenen değer ve tolerans soruda yazılı, kontrol
 * deterministik. Beklenen değer okunamıyorsa puan verilmez — yanlış kabul
 * edilmiş bir cevabı doğru saymaktansa açıkça "kontrol edilemedi" demek doğru.
 */
function sayisalGeriBildirim(
  answerId: string,
  prompt: { expectedNumeric: string | null; tolerance: string | null },
  body: string,
) {
  const beklenen =
    prompt.expectedNumeric === null ? null : parseNumericAnswer(prompt.expectedNumeric);
  const tolerans = prompt.tolerance === null ? 0 : (parseNumericAnswer(prompt.tolerance) ?? 0);
  const verilen = parseNumericAnswer(body);

  if (verilen === null) {
    return {
      answerId,
      model: DETERMINISTIK_MODEL,
      score: 0,
      strengths: [] as string[],
      gaps: ["Cevap tek bir sayı olarak okunamadı."],
      feedbackMd:
        "Yalnız tek bir sayı yaz. Ondalık ayırıcı olarak virgül veya nokta kullanabilirsin.",
      followUp: null,
    };
  }

  if (beklenen === null) {
    return {
      answerId,
      model: DETERMINISTIK_MODEL,
      score: 0,
      strengths: [] as string[],
      gaps: ["Sorunun beklenen değeri okunamadı; cevap kontrol edilemedi."],
      feedbackMd:
        "Cevabın kaydedildi fakat bu sorunun beklenen değeri bozuk olduğu için kontrol edilemedi.",
      followUp: null,
    };
  }

  const { correct, score } = evaluateNumericAnswer(verilen, beklenen, tolerans);

  return {
    answerId,
    model: DETERMINISTIK_MODEL,
    score,
    strengths: correct ? ["Sayısal sonuç beklenen değerle uyuşuyor."] : [],
    gaps: correct ? [] : ["Sayısal sonuç beklenen aralığın dışında."],
    feedbackMd: correct
      ? "Sonuç doğru. Kullandığın yolu bir cümleyle kendine açıkla; asıl kalıcı olan o."
      : "Sonuç beklenen aralığın dışında. Hangi büyüklüğü hangi adımda kullandığını yeniden izle.",
    followUp: null,
  };
}
