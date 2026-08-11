import { cn } from "@/lib/utils/cn";
import type { SentimentLabel, SentimentSummary } from "@/types";

const LABEL_TR: Record<SentimentLabel, string> = {
  bullish: "Boğa ağırlıklı",
  bearish: "Ayı ağırlıklı",
  neutral: "Nötr",
};

const LABEL_TONE: Record<SentimentLabel, string> = {
  bullish: "text-up",
  bearish: "text-down",
  neutral: "text-ink-muted",
};

/**
 * Merkezden ıraksayan çubuk.
 *
 * Önceki hali gökkuşağı bir zemin üstünde gezen bir ibreydi; ibrenin konumu
 * okunabiliyordu ama BÜYÜKLÜĞÜ okunamıyordu — 0,10 ile 0,80 arasındaki fark
 * yalnız birkaç piksellik yer değişimiydi. Dolgu merkezden taştığında hem yön
 * (hangi tarafa) hem şiddet (ne kadar) aynı anda görünüyor.
 */
export function SentimentMeter({ summary }: { summary: SentimentSummary }) {
  const clamped = Math.max(-1, Math.min(1, summary.score));
  const magnitude = Math.abs(clamped) * 50;
  const total = summary.bullishCount + summary.bearishCount + summary.neutralCount;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-3">
        <p
          className={cn("text-[19px] font-semibold tracking-[-0.02em]", LABEL_TONE[summary.label])}
        >
          {LABEL_TR[summary.label]}
        </p>
        <p className="figure text-[15px] font-semibold text-ink">
          {clamped > 0 ? "+" : clamped < 0 ? "−" : ""}
          {Math.abs(clamped).toFixed(2)}
        </p>
      </div>

      <div>
        <div
          className="relative h-2.5 w-full overflow-hidden rounded-full bg-elevated"
          role="img"
          aria-label={`Son ${summary.windowHours} saatte topluluk duyarlılığı: ${LABEL_TR[summary.label]}, skor ${clamped.toFixed(2)}`}
        >
          {/* Merkez çentiği: dolgu sıfırken bile ölçeğin ortası görünsün. */}
          <span
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-hairline-strong"
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute inset-y-0 rounded-full",
              clamped >= 0 ? "left-1/2 bg-up" : "right-1/2 bg-down",
            )}
            style={{ width: `${magnitude}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="label mt-2.5 flex justify-between">
          <span>Ayı</span>
          <span>Boğa</span>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3 border-t border-rule pt-4">
        <Counter label="Boğa" value={summary.bullishCount} total={total} tone="text-up" />
        <Counter label="Nötr" value={summary.neutralCount} total={total} tone="text-ink-muted" />
        <Counter label="Ayı" value={summary.bearishCount} total={total} tone="text-down" />
      </dl>

      <p className="meta text-ink-faint">
        Son {summary.windowHours} saatte {summary.postCount.toLocaleString("tr-TR")} gönderi
      </p>
    </div>
  );
}

function Counter({
  label,
  value,
  total,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  tone: string;
}) {
  const share = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <dt className="label">{label}</dt>
      <dd className={cn("figure text-[15px] font-semibold", tone)}>
        {value.toLocaleString("tr-TR")}
        <span className="ml-1 text-[11px] font-normal text-ink-faint">%{share}</span>
      </dd>
    </div>
  );
}
