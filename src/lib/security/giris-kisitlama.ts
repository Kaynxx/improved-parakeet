/**
 * Şifreli giriş için deneme sınırlayıcı.
 *
 * **Neden gerekli:** denetimde giriş yolunda istemci düğme kilidinden başka
 * hiçbir sınır yoktu. Açık kayıt olmadığı için hesap sayımı riski düşük, ama
 * uygulama internete açıldığında tek hesabın şifresi sınırsız denenebilirdi.
 *
 * **Neden bellekte, veritabanında değil:** sayaç tek süreçte tutuluyor; her
 * başarısız denemeyi Postgres'e yazmak, kimliği doğrulanmamış isteğin
 * veritabanına yazma yetkisi kazanması demekti — bu da kendi başına bir
 * kaynak tüketimi yüzeyi. Bedeli açık: süreç yeniden başlarsa sayaç sıfırlanır
 * ve çok süreçli dağıtımda süreç başına ayrı sayılır.
 *
 * Sonuç asla saldırgana sızmaz: engellenen istek de yanlış şifre gibi `null`
 * döner, yani "bu hesap var" bilgisi vermez.
 */

export interface GirisKisitlayici {
  izinVar(anahtar: string): boolean;
  basarisizlikKaydet(anahtar: string): void;
  basariKaydet(anahtar: string): void;
}

export interface GirisKisitlayiciAyari {
  maxDeneme: number;
  pencereMs: number;
  engelMs: number;
  simdi?: () => number;
}

/** Aynı hesabın farklı yazımı tek sayaçta buluşsun. */
function anahtarNormalize(anahtar: string): string {
  return anahtar.trim().toLocaleLowerCase("tr-TR");
}

export function olusturGirisKisitlayici(ayar: GirisKisitlayiciAyari): GirisKisitlayici {
  const { maxDeneme, pencereMs, engelMs } = ayar;
  const simdi = ayar.simdi ?? Date.now;

  /** anahtar → başarısız deneme zaman damgaları. */
  const denemeler = new Map<string, number[]>();

  function guncelDenemeler(anahtar: string, an: number): number[] {
    const eskiden = denemeler.get(anahtar) ?? [];
    // Pencere dışına düşenler atılıyor; aksi hâlde harita süresiz büyür.
    const taze = eskiden.filter((zaman) => an - zaman < Math.max(pencereMs, engelMs));
    if (taze.length === 0) {
      denemeler.delete(anahtar);
      return [];
    }
    denemeler.set(anahtar, taze);
    return taze;
  }

  return {
    izinVar(anahtar) {
      const an = simdi();
      const taze = guncelDenemeler(anahtarNormalize(anahtar), an);
      if (taze.length < maxDeneme) return true;

      // Sınır aşıldıysa engel, son başarısız denemeden itibaren sayılır.
      const sonDeneme = taze[taze.length - 1] ?? 0;
      return an - sonDeneme >= engelMs;
    },

    basarisizlikKaydet(anahtar) {
      const an = simdi();
      const normal = anahtarNormalize(anahtar);
      const taze = guncelDenemeler(normal, an);
      taze.push(an);
      denemeler.set(normal, taze);
    },

    basariKaydet(anahtar) {
      denemeler.delete(anahtarNormalize(anahtar));
    },
  };
}

/**
 * Uygulamanın kullandığı tek örnek: 15 dakikada 8 başarısız deneme, sonra 15
 * dakika engel. Sayılar tek kullanıcılı panele göre seçildi — insan üç kez
 * yanlış yazar, otomatik deneme çok daha hızlı tükenir.
 */
export const girisKisitlayici = olusturGirisKisitlayici({
  maxDeneme: 8,
  pencereMs: 15 * 60 * 1000,
  engelMs: 15 * 60 * 1000,
});
