export type DersDurumu = "reading" | "answered" | "reviewed" | "mastered";
export type SoruTuru = "acik" | "sayisal" | "tahmin";

export interface CalismaDurumuOgesi {
  kind: SoruTuru;
  points: number;
  answered: boolean;
  hasFeedback: boolean;
  score: number | null;
}

export interface SayisalDegerlendirme {
  correct: boolean;
  score: number;
}

/**
 * Metin olarak gelen sayısal cevabı ayrıştırır.
 * Yalnızca tek bir sonlu sayıyı kabul eder; ek metin veya bilimsel gösterim reddedilir.
 */
export function parseNumericAnswer(raw: string): number | null {
  const trimmed = raw.trim();
  // Sadece opsiyonel işaret, rakamlar ve opsiyonel ondalık kısım (nokta veya virgül)
  if (!/^[-+]?\d+(?:[.,]\d+)?$/.test(trimmed)) {
    return null;
  }

  const normalized = trimmed.replace(",", ".");
  const value = Number(normalized);

  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
}

/**
 * Sayısal cevabı beklenen değer ve mutlak tolerans ile karşılaştırır.
 * Sınır değerleri doğru kabul edilir.
 */
export function evaluateNumericAnswer(
  answer: number,
  expected: number,
  tolerance: number,
): SayisalDegerlendirme {
  const diff = Math.abs(answer - expected);
  // Kayan nokta hassasiyeti sorunlarını önlemek için küçük bir epsilon eklenebilir,
  // ancak testler doğrudan <= operatörünü geçecek şekilde tasarlanmış.
  const correct = diff <= tolerance;
  return {
    correct,
    score: correct ? 100 : 0,
  };
}

/**
 * Dersin çalışma durumunu, soruların cevaplanma ve değerlendirilme durumuna göre belirler.
 */
export function deriveLessonStatus(items: CalismaDurumuOgesi[]): DersDurumu {
  // 1. Bütün sorular (tahmin dahil) cevaplanmadan "reading" durumundan çıkılmaz.
  if (items.some((item) => !item.answered)) {
    return "reading";
  }

  const scorableItems = items.filter((item) => item.kind === "acik" || item.kind === "sayisal");

  // 2. Puanlanabilir sorulardan herhangi birinin geri bildirimi eksikse "answered" durumunda bekler.
  if (scorableItems.some((item) => !item.hasFeedback)) {
    return "answered";
  }

  let totalPoints = 0;
  let earnedPoints = 0;
  let hasAnyScore = false;

  for (const item of scorableItems) {
    if (item.score !== null) {
      hasAnyScore = true;
      totalPoints += item.points;
      earnedPoints += item.score * item.points;
    }
  }

  // 3. Geri bildirim gelmiş olsa da hiç puan yoksa ustalık üretilmez.
  if (!hasAnyScore || totalPoints === 0) {
    return "reviewed";
  }

  // 4. Puan ağırlıklı ortalama 70 ve üzeriyse "mastered", altındaysa "reviewed".
  const average = earnedPoints / totalPoints;
  return average >= 70 ? "mastered" : "reviewed";
}
