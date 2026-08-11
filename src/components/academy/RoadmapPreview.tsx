import { ProgressRing } from "@/components/academy/ProgressRing";
import { RoadmapNode } from "@/components/academy/RoadmapNode";
import type { Track } from "@/types";

const LEVEL_TR = {
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
} as const;

/** Panel özeti: aktif parçanın ilerlemesi + görünürdeki sıradaki adımlar. */
export function RoadmapPreview({ track, limit = 4 }: { track: Track; limit?: number }) {
  // Tamamlanmışların hepsini değil, bağlamı verecek kadarını göster: son bir
  // tamamlanan + devam eden + sıradakiler.
  const firstUnfinished = track.steps.findIndex((step) => step.status !== "mastered");
  const start = Math.max(0, (firstUnfinished === -1 ? track.steps.length : firstUnfinished) - 1);
  const visible = track.steps.slice(start, start + limit);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <ProgressRing completed={track.completedSteps} total={track.totalSteps} />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold tracking-[-0.015em] text-ink">{track.title}</p>
          <p className="meta mt-0.5 text-ink-faint">
            {LEVEL_TR[track.level]} · {track.completedSteps}/{track.totalSteps} adım
          </p>
          <p className="mt-1 line-clamp-1 text-[12.5px] text-ink-muted">{track.description}</p>
        </div>
      </div>

      <ol className="flex flex-col border-t border-hairline pt-5">
        {visible.map((step, index) => (
          <RoadmapNode key={step.id} step={step} isLast={index === visible.length - 1} />
        ))}
      </ol>
    </div>
  );
}
