"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { findLessonIdBySlugs } from "@/lib/db/queries/lesson";
import { yansimaKaydet } from "@/lib/db/queries/lesson-reflection";
import { gecerliYansimaPuaniMi } from "@/server/services/lesson-reflection.logic";

export interface YansimaDurumu {
  hata: string | null;
  basari: string | null;
}

export const BOS_YANSIMA_DURUMU: YansimaDurumu = { hata: null, basari: null };

/** `""` ve `null` `Number` ile 0'a düşer; ölçek 1'den başladığı için ikisi de reddedilir. */
function olcek(formData: FormData, alan: string): number {
  const ham = formData.get(alan);
  return typeof ham === "string" && ham.trim() !== "" ? Number(ham) : Number.NaN;
}

/**
 * Ders sonu üç ölçeği kaydeder.
 *
 * Ders kimliği rota slug'larından sunucuda çözülür; ölçek değerleri hem
 * burada hem veritabanı CHECK'inde 1-7 aralığına kapatılır.
 */
export async function yansimaGonder(
  _onceki: YansimaDurumu,
  formData: FormData,
): Promise<YansimaDurumu> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { hata: "Oturum bulunamadı. Tekrar giriş yap.", basari: null };
  }

  const hafta = String(formData.get("hafta") ?? "").trim();
  const ders = String(formData.get("ders") ?? "").trim();
  const boredom = olcek(formData, "sikilma");
  const effort = olcek(formData, "caba");
  const continueIntent = olcek(formData, "devam");

  if (
    !gecerliYansimaPuaniMi(boredom) ||
    !gecerliYansimaPuaniMi(effort) ||
    !gecerliYansimaPuaniMi(continueIntent)
  ) {
    return { hata: "Üç ölçeğin üçü de 1-7 arasında işaretlenmeli.", basari: null };
  }

  const lessonId = await findLessonIdBySlugs(hafta, ders);
  if (!lessonId) {
    return { hata: "Ders bulunamadı.", basari: null };
  }

  await yansimaKaydet(userId, lessonId, { boredom, effort, continueIntent });
  revalidatePath(`/akademi/${hafta}/${ders}`);

  return { hata: null, basari: "Değerlendirmen kaydedildi." };
}
