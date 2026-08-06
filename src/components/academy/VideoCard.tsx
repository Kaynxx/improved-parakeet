import { Play } from "lucide-react";
import { formatDuration, timeAgo } from "@/lib/utils/format";
import type { VideoSuggestion } from "@/types";

/**
 * Günün video önerisi. Thumbnail henüz yüklenmiyor (harici URL yok) — yerine
 * yüzey basamağından bir yer tutucu. `thumbnailUrl` dolduğunda `next/image`
 * ile değişecek tek yer burası.
 */
export function VideoCard({ video }: { video: VideoSuggestion }) {
  return (
    <article className="flex flex-col gap-3.5">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[var(--radius-inner)] bg-sunken">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-paper">
          <Play className="size-5 translate-x-[1px]" fill="currentColor" aria-hidden="true" />
        </span>
        <span className="meta absolute right-2 bottom-2 rounded-[var(--radius-chip)] bg-ink/85 px-1.5 py-0.5 text-paper">
          {formatDuration(video.durationSec)}
        </span>
      </div>

      <div className="min-w-0">
        <p className="line-clamp-2 text-[14.5px] leading-snug font-semibold tracking-[-0.01em] text-ink">
          {video.title}
        </p>
        <p className="mt-1 text-[12.5px] text-ink-muted">{video.channelTitle}</p>
        <p className="meta mt-0.5 text-ink-faint">{timeAgo(video.publishedAt)}</p>
      </div>

      <p className="rounded-[var(--radius-inner)] bg-sunken px-3.5 py-2.5 text-[12.5px] text-ink-muted">
        <span className="text-ink-faint">Şu adım için önerildi:</span>{" "}
        <span className="font-semibold text-ink">{video.stepTitle}</span>
      </p>
    </article>
  );
}
