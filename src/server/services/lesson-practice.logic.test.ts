import assert from "node:assert/strict";
import test from "node:test";

type DersDurumu = "reading" | "answered" | "reviewed" | "mastered";
type SoruTuru = "acik" | "sayisal" | "tahmin";

interface CalismaDurumuOgesi {
  kind: SoruTuru;
  points: number;
  answered: boolean;
  hasFeedback: boolean;
  score: number | null;
}

interface SayisalDegerlendirme {
  correct: boolean;
  score: number;
}

interface DersCalismaUygulamasi {
  parseNumericAnswer(raw: string): number | null;
  evaluateNumericAnswer(answer: number, expected: number, tolerance: number): SayisalDegerlendirme;
  deriveLessonStatus(items: CalismaDurumuOgesi[]): DersDurumu;
}

async function uygulamayiYukle<T extends object>(
  yol: string,
  disariAktarimlar: readonly string[],
): Promise<T> {
  let modul: object;

  try {
    // Üretim modülü RED aşamasında bilerek yok; yükleyici hatasını kontrollü AssertionError'a çeviririz.
    modul = await import(yol);
  } catch (hata) {
    const neden = hata instanceof Error ? hata.message : String(hata);
    assert.fail(`${yol}: uygulama henüz yok (${neden})`);
  }

  const modulKaydi = modul as Record<string, unknown>;
  for (const ad of disariAktarimlar) {
    if (typeof modulKaydi[ad] !== "function") {
      assert.fail(`${yol}: ${ad} uygulaması henüz yok`);
    }
  }

  return modul as T;
}

function dersCalismaUygulamasiniYukle(): Promise<DersCalismaUygulamasi> {
  return uygulamayiYukle<DersCalismaUygulamasi>("./lesson-practice.logic", [
    "parseNumericAnswer",
    "evaluateNumericAnswer",
    "deriveLessonStatus",
  ]);
}

function oge(
  kind: SoruTuru,
  {
    answered = true,
    hasFeedback = true,
    points = 1,
    score = 80,
  }: Partial<Omit<CalismaDurumuOgesi, "kind">> = {},
): CalismaDurumuOgesi {
  return { kind, points, answered, hasFeedback, score };
}

test("Türkçe ve noktalı tek sonlu sayıları ayrıştırır", async () => {
  const { parseNumericAnswer } = await dersCalismaUygulamasiniYukle();
  const ornekler: ReadonlyArray<readonly [ham: string, beklenen: number]> = [
    ["12.5", 12.5],
    ["12,5", 12.5],
    ["  -0,25  ", -0.25],
    ["42", 42],
  ];

  for (const [ham, beklenen] of ornekler) {
    assert.equal(parseNumericAnswer(ham), beklenen, `${JSON.stringify(ham)} ayrıştırılmalı`);
  }
});

test("tek sonlu sayı dışındaki sayısal cevapları reddeder", async () => {
  const { parseNumericAnswer } = await dersCalismaUygulamasiniYukle();
  const reddedilenler = [
    "",
    "   ",
    "12 TL",
    "12 13",
    "1,2,3",
    "NaN",
    "Infinity",
    "-Infinity",
    "1e309",
  ];

  for (const ham of reddedilenler) {
    assert.equal(parseNumericAnswer(ham), null, `${JSON.stringify(ham)} reddedilmeli`);
  }
});

test("sayısal cevabı mutlak toleransın iki sınırında doğru, sınırın dışında yanlış sayar", async () => {
  const { evaluateNumericAnswer } = await dersCalismaUygulamasiniYukle();
  const ornekler: ReadonlyArray<readonly [cevap: number, correct: boolean, score: number]> = [
    [99.5, true, 100],
    [100.5, true, 100],
    [99.499_999, false, 0],
    [100.500_001, false, 0],
  ];

  for (const [cevap, correct, score] of ornekler) {
    assert.deepEqual(evaluateNumericAnswer(cevap, 100, 0.5), { correct, score });
  }
});

test("bütün sorular cevaplanmadan answered durumuna geçmez", async () => {
  const { deriveLessonStatus } = await dersCalismaUygulamasiniYukle();
  const ogeler = [
    oge("sayisal"),
    oge("acik", { answered: false, hasFeedback: false, score: null }),
  ];

  assert.equal(deriveLessonStatus(ogeler), "reading");
});

test("bütün puanlanabilir soruların geri bildirimi gelmeden reviewed durumuna geçmez", async () => {
  const { deriveLessonStatus } = await dersCalismaUygulamasiniYukle();
  const ogeler = [oge("sayisal"), oge("acik", { hasFeedback: false, score: null })];

  assert.equal(deriveLessonStatus(ogeler), "answered");
});

test("tahmin cevabı gerekir fakat geri bildirimi bekletmez ve ortalamaya katılmaz", async () => {
  const { deriveLessonStatus } = await dersCalismaUygulamasiniYukle();

  assert.equal(
    deriveLessonStatus([
      oge("sayisal", { points: 1, score: 70 }),
      oge("tahmin", { answered: false, hasFeedback: false, points: 100, score: null }),
    ]),
    "reading",
  );
  assert.equal(
    deriveLessonStatus([
      oge("sayisal", { points: 1, score: 70 }),
      oge("tahmin", { hasFeedback: false, points: 100, score: null }),
    ]),
    "mastered",
  );
});

test("ustalığı aritmetik değil puan ağırlıklı ortalamayla hesaplar", async () => {
  const { deriveLessonStatus } = await dersCalismaUygulamasiniYukle();
  const ogeler = [oge("sayisal", { points: 100, score: 80 }), oge("acik", { points: 1, score: 0 })];

  assert.equal(deriveLessonStatus(ogeler), "mastered");
});

test("puan ağırlıklı ortalamanın 70 sınırında mastered, altında reviewed üretir", async () => {
  const { deriveLessonStatus } = await dersCalismaUygulamasiniYukle();

  assert.equal(
    deriveLessonStatus([
      oge("sayisal", { points: 3, score: 80 }),
      oge("acik", { points: 1, score: 40 }),
    ]),
    "mastered",
  );
  assert.equal(
    deriveLessonStatus([
      oge("sayisal", { points: 3, score: 79 }),
      oge("acik", { points: 1, score: 40 }),
    ]),
    "reviewed",
  );
});

test("geri bildirim gelmiş olsa da puan yoksa ustalık üretmez", async () => {
  const { deriveLessonStatus } = await dersCalismaUygulamasiniYukle();

  assert.equal(deriveLessonStatus([oge("acik", { score: null })]), "reviewed");
  assert.equal(
    deriveLessonStatus([oge("tahmin", { hasFeedback: false, points: 100, score: null })]),
    "reviewed",
  );
});
