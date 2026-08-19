"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { findLessonIdBySlugs } from "@/lib/db/queries/lesson";
import { submitLessonAnswer } from "@/server/services/lesson-practice";

/**
 * `uyari` hata değildir: cevap kaydedilmiş fakat değerlendirici bağlı
 * olmadığı için puanlanmamıştır. İkisini tek alanda birleştirmek kullanıcıya
 * emeğini kaybettiğini düşündürüyordu.
 */
export interface CevapDurumu {
  hata: string | null;
  basari: string | null;
  uyari: string | null;
}

export const BOS_CEVAP_DURUMU: CevapDurumu = { hata: null, basari: null, uyari: null };

/**
 * Ders sorusu cevabını alan sunucu eylemi.
 *
 * İstemci yalnız soru kimliği ve cevap gönderir. Ders kimliği rota
 * slug'larından **sunucuda** çözülür; ölçüt, beklenen değer ve tolerans hiçbir
 * zaman istemciye inmez.
 */
export async function cevapGonder(_onceki: CevapDurumu, formData: FormData): Promise<CevapDurumu> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { ...BOS_CEVAP_DURUMU, hata: "Oturum bulunamadı. Tekrar giriş yap." };
  }

  const promptId = String(formData.get("promptId") ?? "").trim();
  const cevap = String(formData.get("cevap") ?? "");
  const hafta = String(formData.get("hafta") ?? "").trim();
  const ders = String(formData.get("ders") ?? "").trim();

  if (!promptId || !hafta || !ders) {
    return { ...BOS_CEVAP_DURUMU, hata: "İstek eksik alan içeriyor." };
  }

  const lessonId = await findLessonIdBySlugs(hafta, ders);
  if (!lessonId) {
    return { ...BOS_CEVAP_DURUMU, hata: "Ders bulunamadı." };
  }

  const sonuc = await submitLessonAnswer({ userId, lessonId, promptId, body: cevap });

  if (!sonuc.kaydedildi) {
    return { ...BOS_CEVAP_DURUMU, hata: sonuc.hata };
  }

  // Cevap yazıldıysa - değerlendirici kapalı olsa bile - ilerleme ve cevap
  // gövdesi değişmiştir; sayfa tazelenmezse kullanıcı eski hâli görür.
  revalidatePath(`/akademi/${hafta}/${ders}`);
  revalidatePath("/akademi");

  if (sonuc.degerlendiriciKapali) {
    return {
      hata: null,
      basari: "Cevabın kaydedildi.",
      uyari: "Değerlendirici bağlı değil; bu cevap henüz puanlanmadı.",
    };
  }

  return { hata: null, basari: "Cevabın kaydedildi ve değerlendirildi.", uyari: null };
}
