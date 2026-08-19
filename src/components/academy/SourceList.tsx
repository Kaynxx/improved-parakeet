import { ExternalLink, FileText, MessagesSquare } from "lucide-react";
import { VideoPlayer } from "@/components/academy/VideoPlayer";
import { cn } from "@/lib/utils/cn";
import type { LessonSource, SourceKind, SourceLevel } from "@/types";

const KIND_LABEL: Record<SourceKind, string> = {
  video: "Video",
  article: "Makale",
  discussion: "Tartışma",
};

const LEVEL_LABEL: Record<SourceLevel, string> = {
  orta: "Orta",
  ileri: "İleri",
  uzman: "Uzman",
};

const LEVEL_STYLE: Record<SourceLevel, string> = {
  orta: "bg-elevated text-ink-muted",
  ileri: "bg-accent-soft text-accent",
  uzman: "bg-ink text-on-ink",
};

/**
 * Dersi destekleyen kaynaklar. Videolar **sayfada oynar** — kullanıcı
 * YouTube'a gitmez; makale ve tartışma yayıncısına bağlantı verilir.
 */
export function SourceList({ sources }: { sources: LessonSource[] }) {
  if (sources.length === 0) return null;

  const videos = sources.filter((s) => s.kind === "video" && s.youtubeId);
  const okumalar = sources.filter((s) => !(s.kind === "video" && s.youtubeId));

  return (
    <section className="mt-10 border-t border-hairline pt-7">
      <h2 className="label">Bu dersi destekleyen kaynaklar</h2>

      {videos.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {videos.map((source) => (
            <div key={source.id} className="flex flex-col gap-2">
              <VideoPlayer
                // biome-ignore lint/style/noNonNullAssertion: filtre youtubeId'nin dolu olmasını garanti ediyor
                youtubeId={source.youtubeId!}
                title={source.title}
                provider={source.provider}
                durationLabel={source.durationLabel}
              />
              <div className="flex items-start gap-2">
                <Rozet level={source.level} />
                <p className="text-sm leading-relaxed text-ink-muted">{source.summary}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {okumalar.length > 0 ? (
        <ul className="mt-5 flex flex-col divide-y divide-rule">
          {okumalar.map((source) => (
            <li key={source.id} className="py-3.5 first:pt-0 last:pb-0">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="press group/src -mx-2 flex items-start gap-3 rounded-[var(--radius-inner)] px-2 py-1.5 hover:bg-elevated/70"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-inner)] bg-elevated text-ink-faint">
                  {source.kind === "discussion" ? (
                    <MessagesSquare className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <FileText className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="label">{KIND_LABEL[source.kind]}</span>
                    {source.provider ? (
                      <span className="meta text-ink-faint">{source.provider}</span>
                    ) : null}
                    <Rozet level={source.level} />
                  </span>
                  <span className="mt-1 block text-md leading-snug font-semibold text-ink group-hover/src:text-accent">
                    {source.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {source.summary}
                  </span>
                </span>

                <ExternalLink
                  className="mt-1 size-3.5 shrink-0 text-ink-faint"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Rozet({ level }: { level: SourceLevel }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-[var(--radius-inner)] px-1.5 py-0.5 text-2xs font-semibold",
        LEVEL_STYLE[level],
      )}
    >
      {LEVEL_LABEL[level]}
    </span>
  );
}
