import { eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { userProgress } from "@/lib/db/schema";
import type { StepStatus } from "@/types";

/** Aşamaların sırası. İlerleme bu dizide yalnız ileri gidebilir. */
const SIRA = ["not_started", "reading", "answered", "reviewed", "mastered"] as const;

/**
 * Bir kullanıcının tüm ders durumları, `lessonId → status` eşlemesi olarak.
 *
 * Ders başına sorgu yerine tek sorgu + Map: yol haritasında 40 ders var ve
 * her biri için ayrı sorgu atmak N+1 üretir. Kaydı olmayan ders haritada
 * bulunmaz; çağıran taraf `not_started` varsayar.
 */
export async function findProgressByUser(userId: string): Promise<Map<string, StepStatus>> {
  const rows = await getDb()
    .select({ lessonId: userProgress.lessonId, status: userProgress.status })
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  return new Map(rows.map((row) => [row.lessonId, row.status]));
}

/**
 * İlerlemeyi ileri taşır. **Geri gitmez** — `mastered` olmuş bir ders,
 * kullanıcı sayfayı yeniden açtı diye `reading`'e düşmemeli.
 *
 * Koşul veritabanı tarafında (`setWhere`): oku-sonra-yaz yapsaydık iki
 * eşzamanlı istek arasında yarış olurdu.
 */
export async function advanceProgress(
  userId: string,
  lessonId: string,
  status: StepStatus,
): Promise<void> {
  const index = SIRA.indexOf(status as (typeof SIRA)[number]);
  const oncekiler = SIRA.slice(0, index) as unknown as StepStatus[];

  const insert = getDb().insert(userProgress).values({ userId, lessonId, status });

  if (oncekiler.length === 0) {
    // `not_started`'a dönüş yok; kayıt zaten varsa dokunma.
    await insert.onConflictDoNothing();
    return;
  }

  await insert.onConflictDoUpdate({
    target: [userProgress.userId, userProgress.lessonId],
    set: { status, updatedAt: new Date() },
    setWhere: inArray(userProgress.status, oncekiler),
  });
}
