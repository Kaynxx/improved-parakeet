export interface THesapGirdisi {
  baslangic: { varliklar: number; yukumlulukler: number; ozkaynak: number };
  adimlar: Array<{
    etiket: string;
    varlikDegisimi: number;
    yukumlulukDegisimi: number;
    ozkaynakDegisimi: number;
  }>;
}

export interface THesapAnlikDurumu {
  etiket: string;
  varliklar: number;
  yukumlulukler: number;
  ozkaynak: number;
}

/**
 * T-Hesap adımlarını deterministik olarak hesaplar.
 * İlk durumu "Başlangıç" etiketiyle ekler ve her adımda kümülatif toplamı tutar.
 */
export function hesaplaTHesap(girdi: THesapGirdisi): THesapAnlikDurumu[] {
  const sonuc: THesapAnlikDurumu[] = [];
  let mevcut = { ...girdi.baslangic };

  sonuc.push({
    etiket: "Başlangıç",
    ...mevcut,
  });

  for (const adim of girdi.adimlar) {
    mevcut = {
      varliklar: mevcut.varliklar + adim.varlikDegisimi,
      yukumlulukler: mevcut.yukumlulukler + adim.yukumlulukDegisimi,
      ozkaynak: mevcut.ozkaynak + adim.ozkaynakDegisimi,
    };
    sonuc.push({
      etiket: adim.etiket,
      ...mevcut,
    });
  }

  return sonuc;
}

export interface DurasyonKonveksiteGirdisi {
  nominalFiyat: number;
  yillikKuponOrani: number;
  vadeYil: number;
  yillikGetiri: number;
  faizSokuBazPuan: number;
  yillikOdemeSayisi: number;
}

export interface DurasyonKonveksiteSonucu {
  bugunkuTamFiyat: number;
  sokluTamFiyat: number;
  modifiyeDurasyon: number;
  konveksite: number;
  durasyonYaklasimi: number;
  durasyonKonveksiteYaklasimi: number;
}

/**
 * Tahvilin tam fiyatını, durasyonunu ve konveksitesini deterministik olarak hesaplar.
 * Geçersiz girdilerde (vade <= 0, nominal <= 0) hata fırlatır.
 */
export function hesaplaDurasyonKonveksite(
  girdi: DurasyonKonveksiteGirdisi,
): DurasyonKonveksiteSonucu {
  if (girdi.vadeYil <= 0 || girdi.nominalFiyat <= 0) {
    throw new Error("Geçersiz tahvil girdisi: Vade ve nominal fiyat pozitif olmalıdır.");
  }

  const m = girdi.yillikOdemeSayisi;
  const r = girdi.yillikGetiri / m;
  const N = girdi.vadeYil * m;
  const C = (girdi.nominalFiyat * girdi.yillikKuponOrani) / m;

  let P = 0;
  let macaulayPay = 0;
  let konveksitePay = 0;

  // Nakit akışlarının bugünkü değerini ve durasyon/konveksite paylarını hesaplıyoruz.
  for (let t = 1; t <= N; t++) {
    const cf = t === N ? C + girdi.nominalFiyat : C;
    const indirim = Math.pow(1 + r, t);
    const pv = cf / indirim;

    P += pv;
    macaulayPay += (t * pv) / m;
    // Konveksite formülü: (1/P)*sum[t(t+1)*CF_t/(1+y/m)^(t+2)] / m^2
    konveksitePay += (t * (t + 1) * cf) / Math.pow(1 + r, t + 2);
  }

  const modifiyeDurasyon = macaulayPay / P / (1 + r);
  const konveksite = konveksitePay / (P * m * m);

  const dy = girdi.faizSokuBazPuan / 10000;
  const durasyonYaklasimi = P * (1 - modifiyeDurasyon * dy);
  const durasyonKonveksiteYaklasimi = P * (1 - modifiyeDurasyon * dy + 0.5 * konveksite * dy * dy);

  // Şoklu faiz oranı ile yeniden fiyatlama.
  const yeniR = (girdi.yillikGetiri + dy) / m;
  let sokluTamFiyat = 0;
  for (let t = 1; t <= N; t++) {
    const cf = t === N ? C + girdi.nominalFiyat : C;
    sokluTamFiyat += cf / Math.pow(1 + yeniR, t);
  }

  return {
    bugunkuTamFiyat: P,
    sokluTamFiyat,
    modifiyeDurasyon,
    konveksite,
    durasyonYaklasimi,
    durasyonKonveksiteYaklasimi,
  };
}

export interface TufeKalemi {
  ad: string;
  fiyatDegisimiYuzde: number;
  resmiAgirlik: number;
  kisiselAgirlik: number;
}

export interface TufeSepetiSonucu {
  resmiDegisimYuzde: number;
  kisiselDegisimYuzde: number;
  normalizeResmiAgirliklar: number[];
  normalizeKisiselAgirliklar: number[];
}

/**
 * Resmî ve kişisel sepet **ayrı** normalize edilir: iki sepetin farkı yalnız
 * ağırlıklardan gelsin, ölçek farkından değil.
 *
 * Toplam ağırlık sıfırsa hesap tanımsızdır; sessizce `NaN` döndürmek ekranda
 * anlamsız bir yüzde gösterirdi.
 */
export function hesaplaTufeSepeti(kalemler: TufeKalemi[]): TufeSepetiSonucu {
  const toplamResmi = kalemler.reduce((acc, k) => acc + k.resmiAgirlik, 0);
  const toplamKisisel = kalemler.reduce((acc, k) => acc + k.kisiselAgirlik, 0);

  if (toplamResmi <= 0 || toplamKisisel <= 0) {
    throw new Error("Geçersiz sepet: resmî ve kişisel ağırlık toplamı pozitif olmalı.");
  }

  const normalizeResmiAgirliklar = kalemler.map((k) => k.resmiAgirlik / toplamResmi);
  const normalizeKisiselAgirliklar = kalemler.map((k) => k.kisiselAgirlik / toplamKisisel);

  let resmiDegisimYuzde = 0;
  let kisiselDegisimYuzde = 0;

  for (const [i, kalem] of kalemler.entries()) {
    resmiDegisimYuzde += (normalizeResmiAgirliklar[i] ?? 0) * kalem.fiyatDegisimiYuzde;
    kisiselDegisimYuzde += (normalizeKisiselAgirliklar[i] ?? 0) * kalem.fiyatDegisimiYuzde;
  }

  return {
    resmiDegisimYuzde,
    kisiselDegisimYuzde,
    normalizeResmiAgirliklar,
    normalizeKisiselAgirliklar,
  };
}
