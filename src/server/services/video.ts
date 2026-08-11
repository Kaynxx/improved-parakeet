/**
 * Günün video önerisi — kaynak: **Postgres** (akademi ders kaynakları).
 *
 * Ayrı bir `videos` tablosu ve YouTube Data API entegrasyonu **bilinçli olarak
 * yapılmadı.** Otomatik keşif, video kümesi açık uçlu olduğunda kazandırır;
 * buradaki küme sabit: müfredat elle araştırıldı, 40 videonun kimliği repoda
 * duruyor ve seed URL'yi çözemezse hata fırlatıyor. Data API bu durumda kota,
 * anahtar ve kanal güvenilirliği sorunlarını karşılığında bir şey vermeden
 * getirirdi.
 */

import { findVideoSources } from "@/lib/db/queries/lesson";
import type { VideoSuggestion } from "@/types";

/** Panelin gününü belirleyen saat dilimi — kullanıcı tek ve burada. */
const SAAT_DILIMI = "Europe/Istanbul";

/**
 * Takvim gününü tam sayıya çevirir (epoch'tan bu yana geçen gün).
 *
 * `Date.getDate()` yerine biçimlendirici kullanılıyor: sunucu UTC'de çalışırken
 * yerel gece yarısı ile UTC gece yarısı ayrışıyor ve video günü yanlış saatte
 * dönüyordu. `en-CA` seçilmesinin tek nedeni `YYYY-MM-DD` üretmesi.
 */
function gunIndeksi(an: Date): number {
  const gun = new Intl.DateTimeFormat("en-CA", {
    timeZone: SAAT_DILIMI,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(an);

  return Math.floor(Date.parse(`${gun}T00:00:00Z`) / 86_400_000);
}

/**
 * Günün videosu. Seçim **belirlenimci**: aynı gün içinde her istekte aynı video
 * gelir, ertesi gün sıradakine geçer.
 *
 * Rastgele seçim reddedildi — her sayfa yenilemesinde değişen bir "günün
 * videosu" öneri değil gürültüdür ve kullanıcı yarım bıraktığı videoyu geri
 * bulamazdı.
 */
export async function getDailyVideo(an: Date = new Date()): Promise<VideoSuggestion | null> {
  const adaylar = await findVideoSources();
  if (adaylar.length === 0) return null;

  // Negatif tarihlerde `%` negatif dönebiliyor; ikinci modülo onu toparlıyor.
  const sira = ((gunIndeksi(an) % adaylar.length) + adaylar.length) % adaylar.length;
  return adaylar[sira] ?? null;
}
