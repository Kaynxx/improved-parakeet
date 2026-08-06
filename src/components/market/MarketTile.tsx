import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Sparkline } from "@/components/market/Sparkline";
import { cn } from "@/lib/utils/cn";
import {
  type Direction,
  directionOf,
  formatPercent,
  formatPrice,
  formatSigned,
  priceDigits,
} from "@/lib/utils/format";
import type { MarketQuote } from "@/types";

const TONE: Record<Direction, string> = {
  up: "text-up",
  down: "text-down",
  flat: "text-flat",
};

const CHIP: Record<Direction, string> = {
  up: "bg-up-soft text-up",
  down: "bg-down-soft text-down",
  flat: "bg-sunken text-flat",
};

const ARROW = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const;

/**
 * Yön üç kanaldan birden okunur: ok ikonu, işaretli sayı, renk.
 * Renk asla tek taşıyıcı değil — yeşil/kırmızı ayrımı renk körlüğünde zayıftır.
 *
 * Kutu kenarlıksız: beyaz kartın içinde bir kademe koyu dolgu ayrımı zaten
 * yapıyor, üstüne çizgi koymak gürültü olurdu.
 */
export function MarketTile({ quote }: { quote: MarketQuote }) {
  const direction = directionOf(quote.changePercent);
  const Arrow = ARROW[direction];
  const directionWord = direction === "up" ? "yükseliş" : direction === "down" ? "düşüş" : "yatay";
  const digits = priceDigits(quote.assetType);

  return (
    <article className="flex flex-col gap-3 rounded-[var(--radius-inner)] bg-sunken p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="meta font-medium text-ink">{quote.symbol}</p>
          <p className="mt-0.5 truncate text-[12px] text-ink-faint">{quote.name}</p>
        </div>
        <span
          className={cn(
            "figure flex shrink-0 items-center gap-0.5 rounded-[var(--radius-chip)] px-1.5 py-1 text-[11px] font-semibold",
            CHIP[direction],
          )}
        >
          <Arrow className="size-3" strokeWidth={2.25} aria-hidden="true" />
          {formatPercent(quote.changePercent)}
        </span>
      </div>

      <div>
        <p className="figure text-[19px] leading-none font-semibold text-ink">
          {formatPrice(quote.price, digits)}
        </p>
        <p className={cn("figure mt-1 text-[12px]", TONE[direction])}>
          {formatSigned(quote.change, digits)}
        </p>
      </div>

      <Sparkline
        id={quote.symbol}
        data={quote.history}
        direction={direction}
        label={`${quote.name} son 24 saat: ${directionWord}, ${formatPercent(quote.changePercent)}`}
      />
    </article>
  );
}
