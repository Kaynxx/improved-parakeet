"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { youtubeEmbedUrl, youtubeWatchUrl } from "@/lib/utils/youtube";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  provider: string | null;
  durationLabel: string | null;
}

/**
 * Video dersin İÇİNDE oynar — kullanıcı YouTube'a gitmez.
 *
 * **Tıklamadan yükleme yok.** iframe ilk render'da basılsaydı her ders
 * açılışında YouTube'a bağlanılır, çerez yazılır ve birkaç yüz kB script
 * inerdi; oysa videoların çoğu hiç oynatılmıyor. Kapak görseli YouTube'un
 * statik thumbnail uç noktasından geliyor, `nocookie` alan adı da oynatmaya
 * kadar izleme çerezini engelliyor.
 */
export function VideoPlayer({ youtubeId, title, provider, durationLabel }: VideoPlayerProps) {
  const [oynatiliyor, setOynatiliyor] = useState(false);

  return (
    <figure className="flex flex-col gap-2.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-inner)] bg-elevated">
        {oynatiliyor ? (
          <iframe
            src={`${youtubeEmbedUrl(youtubeId)}&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOynatiliyor(true)}
            className="group absolute inset-0 size-full cursor-pointer"
            aria-label={`Videoyu oynat: ${title}`}
          >
            {/* Kapak görseli. `next/image` kullanılmıyor: i.ytimg.com'u
                `remotePatterns`'a eklemek gerekirdi ve tek bir statik görsel
                için optimizasyon uç noktasını açmaya değmez.
                alt="" bilinçli — anlamı düğmenin aria-label'ı taşıyor. */}
            {/* biome-ignore lint/performance/noImgElement: harici thumbnail, yukarıdaki nota bakın */}
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-ink/25 transition-colors duration-200 group-hover:bg-ink/15" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="press flex size-14 items-center justify-center rounded-full bg-ink/95 text-on-ink shadow-[var(--shadow-lift)]">
                <Play className="size-6 translate-x-[2px]" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
            {durationLabel ? (
              <span className="meta absolute right-2.5 bottom-2.5 rounded-[var(--radius-inner)] bg-ink/85 px-1.5 py-0.5 text-on-ink">
                {durationLabel}
              </span>
            ) : null}
          </button>
        )}
      </div>

      <figcaption className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-copy leading-snug font-semibold text-ink">{title}</p>
          {provider ? <p className="mt-0.5 text-sm text-ink-faint">{provider}</p> : null}
        </div>
        {/* Kaçış kapısı: tam ekran, altyazı ayarı ya da kaydetmek isteyen
            kullanıcı YouTube'a gidebilmeli. */}
        <a
          href={youtubeWatchUrl(youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="press meta flex shrink-0 items-center gap-1 text-ink-faint hover:text-accent"
        >
          YouTube
          <ExternalLink className="size-3" strokeWidth={2} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
