/**
 * Video önerisi servisi — kaynak: **mock** (Faz 2D'de Postgres'e geçer).
 *
 * `videos` ve `step_videos` tabloları ile YouTube Data API eşleştirmesi 2D'de.
 */

import { dailyVideo } from "@/mocks";
import type { VideoSuggestion } from "@/types";

export async function getDailyVideo(): Promise<VideoSuggestion | null> {
  return dailyVideo;
}
