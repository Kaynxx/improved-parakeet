import { lineGeometry } from "@/lib/utils/chart";
import { cn } from "@/lib/utils/cn";
import type { Direction } from "@/lib/utils/format";

interface SparklineProps {
  /** Kronolojik seri (en eski → en yeni). En az iki nokta gerekir. */
  data: number[];
  direction: Direction;
  /** Erişilebilirlik metni — grafik tek başına anlam taşımasın diye zorunlu. */
  label: string;
  /** Sayfada benzersiz olmalı: gradient tanımının id'sini üretir. */
  id: string;
  className?: string;
}

const VIEW_W = 100;
const VIEW_H = 32;
const PAD_Y = 3;

const STROKE: Record<Direction, string> = {
  up: "var(--color-up)",
  down: "var(--color-down)",
  flat: "var(--color-flat)",
};

/**
 * Mikro grafik: eksen yok, ızgara yok, etiket yok — tile zaten güncel değeri
 * yazıyor, sparkline yalnız şekli taşıyor. Büyük çizgiyle aynı geometriden
 * üretiliyor, yalnız ölçeği ve ağırlığı farklı.
 */
export function Sparkline({ data, direction, label, id, className }: SparklineProps) {
  const geometry = lineGeometry(data, VIEW_W, VIEW_H, PAD_Y);
  if (!geometry) return null;

  const stroke = STROKE[direction];
  const gradientId = `spark-${id}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      className={cn("h-8 w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.1" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={geometry.area} fill={`url(#${gradientId})`} />
      <path
        d={geometry.line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Son değer çapası: kartın zeminiyle çevrelenir, çizgiyle karışmaz. */}
      <circle
        cx={geometry.last[0]}
        cy={geometry.last[1]}
        r="3"
        fill={stroke}
        stroke="var(--color-base)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
