import assert from "node:assert/strict";
import test from "node:test";

interface THesapGirdisi {
  baslangic: { varliklar: number; yukumlulukler: number; ozkaynak: number };
  adimlar: Array<{
    etiket: string;
    varlikDegisimi: number;
    yukumlulukDegisimi: number;
    ozkaynakDegisimi: number;
  }>;
}

interface THesapAnlikDurumu {
  etiket: string;
  varliklar: number;
  yukumlulukler: number;
  ozkaynak: number;
}

interface DurasyonKonveksiteGirdisi {
  nominalFiyat: number;
  yillikKuponOrani: number;
  vadeYil: number;
  yillikGetiri: number;
  faizSokuBazPuan: number;
  yillikOdemeSayisi: number;
}

interface DurasyonKonveksiteSonucu {
  bugunkuTamFiyat: number;
  sokluTamFiyat: number;
  modifiyeDurasyon: number;
  konveksite: number;
  durasyonYaklasimi: number;
  durasyonKonveksiteYaklasimi: number;
}

interface TufeKalemi {
  ad: string;
  fiyatDegisimiYuzde: number;
  resmiAgirlik: number;
  kisiselAgirlik: number;
}

interface TufeSepetiSonucu {
  resmiDegisimYuzde: number;
  kisiselDegisimYuzde: number;
  normalizeResmiAgirliklar: number[];
  normalizeKisiselAgirliklar: number[];
}

interface HesaplayiciUygulamasi {
  hesaplaTHesap(girdi: THesapGirdisi): THesapAnlikDurumu[];
  hesaplaDurasyonKonveksite(girdi: DurasyonKonveksiteGirdisi): DurasyonKonveksiteSonucu;
  hesaplaTufeSepeti(kalemler: TufeKalemi[]): TufeSepetiSonucu;
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

function hesaplayicilariYukle(): Promise<HesaplayiciUygulamasi> {
  return uygulamayiYukle<HesaplayiciUygulamasi>("./calculators", [
    "hesaplaTHesap",
    "hesaplaDurasyonKonveksite",
    "hesaplaTufeSepeti",
  ]);
}

function yaklasikEsit(gercek: number, beklenen: number, tolerans = 1e-9): void {
  assert.ok(
    Math.abs(gercek - beklenen) <= tolerans,
    `${gercek}, ${beklenen} değerine ±${tolerans} yakın olmalı`,
  );
}

const tahvilGirdisi: DurasyonKonveksiteGirdisi = {
  nominalFiyat: 1000,
  yillikKuponOrani: 0.08,
  vadeYil: 5,
  yillikGetiri: 0.1,
  faizSokuBazPuan: 100,
  yillikOdemeSayisi: 1,
};

test("T-hesap başlangıçta ve her işlem adımında bilanço eşitliğini korur", async () => {
  const { hesaplaTHesap } = await hesaplayicilariYukle();
  const sonuc = hesaplaTHesap({
    baslangic: { varliklar: 100, yukumlulukler: 80, ozkaynak: 20 },
    adimlar: [
      {
        etiket: "Kredi açılışı",
        varlikDegisimi: 50,
        yukumlulukDegisimi: 50,
        ozkaynakDegisimi: 0,
      },
      {
        etiket: "Faiz tahakkuku",
        varlikDegisimi: 5,
        yukumlulukDegisimi: 0,
        ozkaynakDegisimi: 5,
      },
    ],
  });

  assert.deepEqual(sonuc, [
    { etiket: "Başlangıç", varliklar: 100, yukumlulukler: 80, ozkaynak: 20 },
    { etiket: "Kredi açılışı", varliklar: 150, yukumlulukler: 130, ozkaynak: 20 },
    { etiket: "Faiz tahakkuku", varliklar: 155, yukumlulukler: 130, ozkaynak: 25 },
  ]);
  for (const adim of sonuc) {
    assert.equal(
      adim.varliklar,
      adim.yukumlulukler + adim.ozkaynak,
      `${adim.etiket} dengeli olmalı`,
    );
  }
});

test("duration, convexity ve tam tahvil fiyatını aynı girdiden deterministik hesaplar", async () => {
  const { hesaplaDurasyonKonveksite } = await hesaplayicilariYukle();
  const ilk = hesaplaDurasyonKonveksite(tahvilGirdisi);
  const ikinci = hesaplaDurasyonKonveksite(tahvilGirdisi);

  assert.deepEqual(ikinci, ilk);
  yaklasikEsit(ilk.bugunkuTamFiyat, 924.184_264_611_830_8);
  yaklasikEsit(ilk.sokluTamFiyat, 889.123_089_470_515_7);
  yaklasikEsit(ilk.modifiyeDurasyon, 3.892_192_805_394_024_5);
  yaklasikEsit(ilk.konveksite, 20.097_315_358_878_53);
  yaklasikEsit(ilk.durasyonYaklasimi, 888.213_231_156_025_5);
  yaklasikEsit(ilk.durasyonKonveksiteYaklasimi, 889.141_912_286_806_4);
});

test("sıfır vade ve negatif nominal fiyat gibi geçersiz tahvil girdilerini reddeder", async () => {
  const { hesaplaDurasyonKonveksite } = await hesaplayicilariYukle();
  const gecersizler: DurasyonKonveksiteGirdisi[] = [
    { ...tahvilGirdisi, vadeYil: 0 },
    { ...tahvilGirdisi, nominalFiyat: -1 },
  ];

  for (const girdi of gecersizler) {
    assert.throws(() => hesaplaDurasyonKonveksite(girdi), /geçersiz/i);
  }
});

test("TÜFE ağırlıklarını ayrı ayrı normalize eder ve resmî/kişisel değişimi ayırır", async () => {
  const { hesaplaTufeSepeti } = await hesaplayicilariYukle();
  const sonuc = hesaplaTufeSepeti([
    { ad: "Gıda", fiyatDegisimiYuzde: 20, resmiAgirlik: 5, kisiselAgirlik: 2 },
    { ad: "Konut", fiyatDegisimiYuzde: 10, resmiAgirlik: 3, kisiselAgirlik: 1 },
    { ad: "Ulaşım", fiyatDegisimiYuzde: -5, resmiAgirlik: 2, kisiselAgirlik: 1 },
  ]);

  assert.deepEqual(sonuc.normalizeResmiAgirliklar, [0.5, 0.3, 0.2]);
  assert.deepEqual(sonuc.normalizeKisiselAgirliklar, [0.5, 0.25, 0.25]);
  yaklasikEsit(
    sonuc.normalizeResmiAgirliklar.reduce((toplam, agirlik) => toplam + agirlik, 0),
    1,
  );
  yaklasikEsit(
    sonuc.normalizeKisiselAgirliklar.reduce((toplam, agirlik) => toplam + agirlik, 0),
    1,
  );
  yaklasikEsit(sonuc.resmiDegisimYuzde, 12);
  yaklasikEsit(sonuc.kisiselDegisimYuzde, 11.25);
});
