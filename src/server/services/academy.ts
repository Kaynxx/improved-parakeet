/**
 * Akademi servisi — kaynak: **Postgres** (Faz 2A).
 *
 * İçerik (parçalar, adımlar, ön koşul DAG'ı) veritabanından gelir.
 * Adım DURUMU henüz gelmiyor: `user_progress` tablosu `users`'a bağlı ve auth
 * 2E'de. O yüzden 2A'da her adım `not_started`, ilerleme halkası %0.
 */

import { findStepContent, findTrackBySlug, findTracks } from "@/lib/db/queries/academy";
import type { RoadmapStep, Track } from "@/types";

export function getTracks(): Promise<Track[]> {
  return findTracks();
}

/** Panelde gösterilecek parça: ilerlemesi başlamış ilki, yoksa ilk parça. */
export async function getActiveTrack(): Promise<Track | null> {
  const tracks = await getTracks();
  const started = tracks.find(
    (track) => track.completedSteps > 0 && track.completedSteps < track.totalSteps,
  );
  return started ?? tracks[0] ?? null;
}

export async function getStep(
  trackSlug: string,
  stepSlug: string,
): Promise<{ track: Track; step: RoadmapStep; contentMd: string | null } | null> {
  const track = await findTrackBySlug(trackSlug);
  const step = track?.steps.find((item) => item.slug === stepSlug);
  if (!track || !step) return null;

  const content = await findStepContent(trackSlug, stepSlug);
  return { track, step, contentMd: content?.contentMd ?? null };
}
