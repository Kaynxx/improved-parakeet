/**
 * Akademi servisi — kaynak: **Postgres**.
 *
 * İçerik (parçalar, adımlar, ön koşul DAG'ı) ve artık adım DURUMU da
 * veritabanından geliyor: `user_progress` 2E'de eklendi.
 *
 * **`userId` neden parametre, servis neden `auth()` çağırmıyor:** Faz 1'de
 * kurulan sınır kuralı — servisler bağlam değil veri alır. Böylece hem test
 * edilebilir kalıyorlar hem de Auth.js'e bağlanmıyorlar; sağlayıcı değişse
 * bu dosya değişmez. Sayfa oturumu `(dashboard)/layout.tsx` sayesinde zaten
 * biliyor, bir kez okuyup aşağı geçiriyor.
 */

import { findStepContent, findTrackBySlug, findTracks } from "@/lib/db/queries/academy";
import type { RoadmapStep, Track } from "@/types";

export function getTracks(userId: string): Promise<Track[]> {
  return findTracks(userId);
}

/** Panelde gösterilecek parça: ilerlemesi başlamış ilki, yoksa ilk parça. */
export async function getActiveTrack(userId: string): Promise<Track | null> {
  const tracks = await getTracks(userId);
  const started = tracks.find(
    (track) => track.completedSteps > 0 && track.completedSteps < track.totalSteps,
  );
  return started ?? tracks[0] ?? null;
}

export async function getStep(
  userId: string,
  trackSlug: string,
  stepSlug: string,
): Promise<{ track: Track; step: RoadmapStep; contentMd: string | null } | null> {
  const track = await findTrackBySlug(userId, trackSlug);
  const step = track?.steps.find((item) => item.slug === stepSlug);
  if (!track || !step) return null;

  const content = await findStepContent(trackSlug, stepSlug);
  return { track, step, contentMd: content?.contentMd ?? null };
}
