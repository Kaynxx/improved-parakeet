import assert from "node:assert/strict";
import test from "node:test";

interface YansimaUygulamasi {
  gecerliYansimaPuaniMi(deger: unknown): deger is number;
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

function yansimaUygulamasiniYukle(): Promise<YansimaUygulamasi> {
  return uygulamayiYukle<YansimaUygulamasi>("./lesson-reflection.logic", ["gecerliYansimaPuaniMi"]);
}

test("yansıma ölçeğinde 1 ile 7 arasındaki bütün tam sayıları kabul eder", async () => {
  const { gecerliYansimaPuaniMi } = await yansimaUygulamasiniYukle();

  for (const deger of [1, 2, 3, 4, 5, 6, 7]) {
    assert.equal(gecerliYansimaPuaniMi(deger), true, `${deger} kabul edilmeli`);
  }
});

test("yansıma ölçeğinde aralık dışındaki sayıları reddeder", async () => {
  const { gecerliYansimaPuaniMi } = await yansimaUygulamasiniYukle();

  for (const deger of [
    -1,
    0,
    8,
    9,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NaN,
  ]) {
    assert.equal(gecerliYansimaPuaniMi(deger), false, `${String(deger)} reddedilmeli`);
  }
});

test("yansıma ölçeğinde kesirleri reddeder", async () => {
  const { gecerliYansimaPuaniMi } = await yansimaUygulamasiniYukle();

  for (const deger of [1.1, 3.5, 6.999]) {
    assert.equal(gecerliYansimaPuaniMi(deger), false, `${deger} reddedilmeli`);
  }
});

test("yansıma ölçeğinde sayı görünümlü stringleri ve sayı olmayan değerleri reddeder", async () => {
  const { gecerliYansimaPuaniMi } = await yansimaUygulamasiniYukle();
  const gecersizler: unknown[] = ["1", "4", "7", " 3 ", "", null, undefined, true, {}, []];

  for (const deger of gecersizler) {
    assert.equal(gecerliYansimaPuaniMi(deger), false, `${JSON.stringify(deger)} reddedilmeli`);
  }
});
