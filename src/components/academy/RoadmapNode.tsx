import { Check, Dot, Loader } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { RoadmapStep, StepStatus } from "@/types";

const STATUS_LABEL: Record<StepStatus, string> = {
  completed: "Tamamlandı",
  in_progress: "Devam ediyor",
  not_started: "Başlanmadı",
};

const STATUS_ICON = {
  completed: Check,
  in_progress: Loader,
  not_started: Dot,
} as const;

/**
 * Yol haritasının tek düğümü.
 *
 * Dikey çizgi burada süs değil: adımlar birbirinin ön koşulu, yani sıra
 * gerçekten bilgi taşıyor. Numaralandırılmış bir liste de olabilirdi ama
 * numara "kaçıncı"yı söyler, çizgi "neye bağlı"yı — burada gereken ikincisi.
 */
export function RoadmapNode({ step, isLast = false }: { step: RoadmapStep; isLast?: boolean }) {
  const Icon = STATUS_ICON[step.status];
  const isDone = step.status === "completed";
  const isActive = step.status === "in_progress";

  return (
    <li className="relative flex gap-3.5 pb-5 last:pb-0">
      {!isLast ? (
        <span
          className={cn(
            // `bg-rule` (%9) beyaz kartın üstünde kayboluyordu ve yol haritası
            // düz bir listeye dönüşüyordu. Çizgi burada bağımlılığı taşıyan
            // yapısal öğe — görünmesi gerekiyor.
            "absolute top-8 bottom-0 left-[14px] w-[2px] rounded-full",
            isDone ? "bg-accent-line" : "bg-rule-strong",
          )}
          aria-hidden="true"
        />
      ) : null}

      <span
        className={cn(
          "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full",
          isDone && "bg-accent text-paper",
          isActive && "bg-card text-accent ring-2 ring-accent",
          !isDone && !isActive && "bg-sunken text-ink-faint",
        )}
      >
        <Icon
          className={cn(isDone || isActive ? "size-4" : "size-5")}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <Link
            href={{ pathname: `/akademi/${step.trackSlug}/${step.slug}` }}
            className={cn(
              "text-[14.5px] font-semibold tracking-[-0.01em] transition-colors hover:text-accent",
              isDone ? "text-ink-muted" : "text-ink",
            )}
          >
            {step.title}
          </Link>
          <span className="meta text-ink-faint">{step.estimatedMin} dk</span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-faint">{step.summary}</p>
        <span className="sr-only">Durum: {STATUS_LABEL[step.status]}</span>
      </div>
    </li>
  );
}
