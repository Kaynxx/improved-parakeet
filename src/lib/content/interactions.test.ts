import assert from "node:assert/strict";
import test from "node:test";

type EtkilesimYapilandirmasi =
  | {
      tur: "t-hesap";
      baslik: string;
      baslangic: { varliklar: number; yukumlulukler: number; ozkaynak: number };
      adimlar: Array<{
        etiket: string;
        varlikDegisimi: number;
        yukumlulukDegisimi: number;
        ozkaynakDegisimi: number;
      }>;
    }
  | {
      tur: "durasyon-konveksite";
      baslik: string;
      nominalFiyat: number;
      yillikKuponOrani: number;
      vadeYil: number;
      yillikGetiri: number;
      faizSokuBazPuan: number;
      yillikOdemeSayisi: number;
    }
  | {
      tur: "tufe-sepeti";
      baslik: string;
      kalemler: Array<{
        ad: string;
        fiyatDegisimiYuzde: number;
        resmiAgirlik: number;
        kisiselAgirlik: number;
      }>;
    };

type DersIcerigiParcasi =
  | { kind: "markdown"; content: string }
  | { kind: "interaction"; config: EtkilesimYapilandirmasi };

interface EtkilesimUygulamasi {
  parseLessonContent(contentMd: string, location?: string): DersIcerigiParcasi[];
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

function etkilesimUygulamasiniYukle(): Promise<EtkilesimUygulamasi> {
  return uygulamayiYukle<EtkilesimUygulamasi>("./interactions", ["parseLessonContent"]);
}

function etkilesimBlogu(yapilandirma: unknown): string {
  return `\`\`\`etkilesim\n${JSON.stringify(yapilandirma)}\n\`\`\``;
}

const tHesapYapilandirmasi = {
  tur: "t-hesap",
  baslik: "Kredi yaratımı",
  baslangic: { varliklar: 100, yukumlulukler: 80, ozkaynak: 20 },
  adimlar: [
    {
      etiket: "Kredi açılışı",
      varlikDegisimi: 50,
      yukumlulukDegisimi: 50,
      ozkaynakDegisimi: 0,
    },
  ],
} as const;

const durasyonYapilandirmasi = {
  tur: "durasyon-konveksite",
  baslik: "Faiz şoku",
  nominalFiyat: 1000,
  yillikKuponOrani: 0.08,
  vadeYil: 5,
  yillikGetiri: 0.1,
  faizSokuBazPuan: 100,
  yillikOdemeSayisi: 1,
} as const;

const tufeYapilandirmasi = {
  tur: "tufe-sepeti",
  baslik: "Resmî ve kişisel sepet",
  kalemler: [
    { ad: "Gıda", fiyatDegisimiYuzde: 20, resmiAgirlik: 5, kisiselAgirlik: 2 },
    { ad: "Konut", fiyatDegisimiYuzde: 10, resmiAgirlik: 3, kisiselAgirlik: 1 },
  ],
} as const;

test("Markdown ve doğrulanmış etkileşim parçalarını kaynak sırasıyla döndürür", async () => {
  const { parseLessonContent } = await etkilesimUygulamasiniYukle();
  const once = "# Giriş\n\nİlk açıklama.\n\n";
  const sonra = "\n\n## Sonuç\n\nKapanış.";
  const icerik = `${once}${etkilesimBlogu(tHesapYapilandirmasi)}${sonra}`;

  assert.deepEqual(parseLessonContent(icerik, "hafta-01/kredi.md"), [
    { kind: "markdown", content: once },
    { kind: "interaction", config: tHesapYapilandirmasi },
    { kind: "markdown", content: sonra },
  ]);
});

test("kapalı registry içindeki üç etkileşim türünü doğrular", async () => {
  const { parseLessonContent } = await etkilesimUygulamasiniYukle();
  const yapilandirmalar = [tHesapYapilandirmasi, durasyonYapilandirmasi, tufeYapilandirmasi];

  for (const yapilandirma of yapilandirmalar) {
    assert.deepEqual(parseLessonContent(etkilesimBlogu(yapilandirma), "pilot.md"), [
      { kind: "interaction", config: yapilandirma },
    ]);
  }
});

test("bilinmeyen etkileşim türünü konum ve nedenle reddeder", async () => {
  const { parseLessonContent } = await etkilesimUygulamasiniYukle();

  assert.throws(
    () => parseLessonContent(etkilesimBlogu({ tur: "canli-kod" }), "hafta-02/bilinmeyen.md"),
    (hata: unknown) => {
      assert.ok(hata instanceof Error);
      assert.match(hata.message, /hafta-02\/bilinmeyen\.md/);
      assert.match(hata.message, /bilinmeyen etkileşim türü/i);
      return true;
    },
  );
});

test("bozuk JSON'u konum ve nedenle reddeder", async () => {
  const { parseLessonContent } = await etkilesimUygulamasiniYukle();
  const icerik = '```etkilesim\n{"tur": "t-hesap",\n```';

  assert.throws(
    () => parseLessonContent(icerik, "hafta-01/bozuk-json.md"),
    (hata: unknown) => {
      assert.ok(hata instanceof Error);
      assert.match(hata.message, /hafta-01\/bozuk-json\.md/);
      assert.match(hata.message, /geçersiz JSON/i);
      return true;
    },
  );
});

test("şema dışı alanı konum ve alan adıyla reddeder", async () => {
  const { parseLessonContent } = await etkilesimUygulamasiniYukle();
  const semaDisi = { ...tHesapYapilandirmasi, fazladan: true };

  assert.throws(
    () => parseLessonContent(etkilesimBlogu(semaDisi), "hafta-01/fazla-alan.md"),
    (hata: unknown) => {
      assert.ok(hata instanceof Error);
      assert.match(hata.message, /hafta-01\/fazla-alan\.md/);
      assert.match(hata.message, /şema dışı/i);
      assert.match(hata.message, /fazladan/i);
      return true;
    },
  );
});
