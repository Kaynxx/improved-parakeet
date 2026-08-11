import { Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { SourceLevel, VideoSuggestion } from "@/types";

const LEVEL_LABEL: Record<SourceLevel, string> = {
  orta: "Orta",
  ileri: "İleri",
  uzman: "Uzman",
};

const LEVEL_STYLE: Record<SourceLevel, string> = {
  orta: "bg-sunken text-ink-muted",
  ileri: "bg-accent-soft text-accent",
  uzman: "bg-ink text-paper",
};

/**
 * Günün video önerisi. Kart **derse götürür**, videoyu burada oynatmaz:
 * video zaten ders sayfasında `VideoPlayer` ile gömülü oynuyor ve ikinci bir
 * oynatıcı hem aynı işi tekrarlar hem de kullanıcıyı dersin bağlamından
 * kopararak videoyu tek başına izletirdi.
 *
 * Kapak görseli `VideoPlayer` ile aynı yolu izliyor: `i.ytimg.com`'dan düz
 * `img` ile. `next/image` kullanılsaydı tek bir statik kapak için
 * `remotePatterns` açmak gerekirdi.
 */
export function VideoCard({ video }: { video: VideoSuggestion }) {
  return (
    <article>
      <Link
        href={{ pathname: `/akademi/${video.weekSlug}/${video.lessonSlug}` }}
        className="press group/vid -m-2 flex flex-col gap-3.5 rounded-[var(--radius-inner)] p-2 hover:bg-sunken/70"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-inner)] bg-sunken">
          {/* alt="" bilinçli: başlık hemen altta metin olarak duruyor, kapak
              görseli ekran okuyucu için tekrar olurdu. */}
          {/* biome-ignore lint/performance/noImgElement: harici thumbnail, yukarıdaki nota bakın */}
          <img
            src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-[var(--ease-settle)] group-hover/vid:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-ink/25 transition-colors duration-200 group-hover/vid:bg-ink/15" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-paper/95 text-ink shadow-[var(--shadow-lift)]">
              <Play className="size-5 translate-x-[1px]" fill="currentColor" aria-hidden="true" />
            </span>
          </span>
          {video.durationLabel ? (
            <span className="meta absolute right-2 bottom-2 rounded-[var(--radius-chip)] bg-ink/85 px-1.5 py-0.5 text-paper">
              {video.durationLabel}
            </span>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={cn(
                "shrink-0 rounded-[var(--radius-chip)] px-1.5 py-0.5 text-[10px] font-semibold",
                LEVEL_STYLE[video.level],
              )}
            >
              {LEVEL_LABEL[video.level]}
            </span>
            {video.channelTitle ? (
              <span className="meta text-ink-faint">{video.channelTitle}</span>
            ) : null}
          </div>

          <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-snug font-semibold tracking-[-0.01em] text-ink group-hover/vid:text-accent">
            {video.title}
          </p>
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted">
            {video.summary}
          </p>
        </div>

        <p className="rounded-[var(--radius-inner)] bg-sunken px-3.5 py-2.5 text-[12.5px] text-ink-muted">
          <span className="text-ink-faint">Şu ders için:</span>{" "}
          <span className="font-semibold text-ink">{video.lessonTitle}</span>
        </p>
      </Link>
    </article>
  );
}
