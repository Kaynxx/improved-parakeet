import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCompact, formatPercent } from "@/lib/utils/format";
import type { SentimentLabel, TickerSentiment } from "@/types";

const SENTIMENT_TR: Record<SentimentLabel, string> = {
  bullish: "Boğa",
  bearish: "Ayı",
  neutral: "Nötr",
};

const SENTIMENT_STYLE: Record<SentimentLabel, string> = {
  bullish: "bg-up-soft text-up",
  bearish: "bg-down-soft text-down",
  neutral: "bg-sunken text-ink-muted",
};

function labelOf(avgScore: number): SentimentLabel {
  if (avgScore > 0.05) return "bullish";
  if (avgScore < -0.05) return "bearish";
  return "neutral";
}

/**
 * Burada iki farklı büyüklük var ve karıştırılmaları kolay:
 *  - bahsedilme SAYISI + günlük DEĞİŞİMİ → hacim. Çubuğun uzunluğu bu.
 *  - duyarlılık YÖNÜ (boğa/ayı) → yalnız yandaki metin rozeti.
 * İkisi tek satırda tek okla birleştirilirse "kırmızı ok + artı sayı" gibi
 * kendi kendisiyle çelişen bir gösterge çıkıyor; o yüzden ayrık tutuldular.
 *
 * Çubuk bilerek nötr. Rengi duyarlılığa bağlamak rozetin zaten söylediğini
 * tekrar ediyordu ve altı satır yan yana gelince sağ kolon sayfanın en yüksek
 * renk yoğunluğuna sahip alanı oluyordu — vurgu tek yerde durmalı.
 */
export function TrendingTickers({ items }: { items: TickerSentiment[] }) {
  const max = items.reduce((acc, item) => Math.max(acc, item.mentionCount), 0) || 1;

  return (
    <ol className="flex flex-col gap-4">
      {items.map((item) => {
        const width = (item.mentionCount / max) * 100;
        const label = labelOf(item.avgScore);
        const rising = item.mentionChangePercent >= 0;
        const ChangeArrow = rising ? ArrowUpRight : ArrowDownRight;

        return (
          <li key={item.ticker.symbol} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="figure text-[13.5px] font-semibold text-ink">
                  {item.ticker.symbol}
                </span>
                <span className="truncate text-[12px] text-ink-faint">{item.ticker.name}</span>
              </div>
              <span className="figure flex shrink-0 items-baseline gap-1.5 text-[12.5px] text-ink-muted">
                {formatCompact(item.mentionCount)}
                <span className="flex items-center gap-0.5 text-[11px] text-ink-faint">
                  <ChangeArrow className="size-3" strokeWidth={2.25} aria-hidden="true" />
                  {formatPercent(item.mentionChangePercent)}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sunken">
                <div
                  className="h-full rounded-full bg-flat"
                  style={{ width: `${width}%` }}
                  aria-hidden="true"
                />
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-[var(--radius-chip)] px-1.5 py-0.5 text-[11px] font-semibold",
                  SENTIMENT_STYLE[label],
                )}
              >
                {SENTIMENT_TR[label]}
              </span>
            </div>

            <span className="sr-only">
              {item.ticker.name}: {item.mentionCount} bahsedilme, bir önceki güne göre{" "}
              {formatPercent(item.mentionChangePercent)}, duyarlılık {SENTIMENT_TR[label]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
