import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { userProgress } from "@/lib/db/schema";
import type { StepStatus } from "@/types";

/**
 * Bir kullanıcının tüm adım durumları, `stepId → status` eşlemesi olarak.
 *
 * Adım başına sorgu yerine tek sorgu + Map: yol haritasında 40 adım var ve
 * her biri için ayrı sorgu atmak N+1 üretir. Kaydı olmayan adım haritada
 * bulunmaz; çağıran taraf `not_started` varsayar.
 */
export async function findProgressByUser(userId: string): Promise<Map<string, StepStatus>> {
  const rows = await getDb()
    .select({ stepId: userProgress.stepId, status: userProgress.status })
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  return new Map(rows.map((row) => [row.stepId, row.status]));
}
