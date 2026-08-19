import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { lessonReflections } from "@/lib/db/schema";

export interface YansimaKaydi {
  boredom: number;
  effort: number;
  continueIntent: number;
}

/**
 * Kullanıcının belirli bir ders için daha önce yansıma yapıp yapmadığını okur.
 * Neden: Formu ilk açılışta kullanıcının eski cevaplarıyla doldurmak için.
 */
export async function yansimaGetir(userId: string, lessonId: string): Promise<YansimaKaydi | null> {
  const db = getDb();
  const kayitlar = await db
    .select({
      boredom: lessonReflections.boredom,
      effort: lessonReflections.effort,
      continueIntent: lessonReflections.continueIntent,
    })
    .from(lessonReflections)
    .where(and(eq(lessonReflections.userId, userId), eq(lessonReflections.lessonId, lessonId)))
    .limit(1);

  return kayitlar[0] ?? null;
}

/**
 * Yansıma kaydını oluşturur veya varsa günceller.
 * Neden: Kullanıcı fikrini değiştirebilir, aynı ders için birden fazla kayıt
 * tutmak yerine son durumu yansıtmak istiyoruz (upsert).
 */
export async function yansimaKaydet(
  userId: string,
  lessonId: string,
  veriler: YansimaKaydi,
): Promise<void> {
  const db = getDb();
  await db
    .insert(lessonReflections)
    .values({
      userId,
      lessonId,
      boredom: veriler.boredom,
      effort: veriler.effort,
      continueIntent: veriler.continueIntent,
    })
    .onConflictDoUpdate({
      target: [lessonReflections.userId, lessonReflections.lessonId],
      set: {
        boredom: veriler.boredom,
        effort: veriler.effort,
        continueIntent: veriler.continueIntent,
        updatedAt: new Date(),
      },
    });
}
