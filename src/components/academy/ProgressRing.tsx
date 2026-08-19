import { cn } from "@/lib/utils/cn";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
  className?: string;
}

/**
 * Tek değerlik gösterge: halka çevre olarak oranı, merkezdeki sayı da aynı
 * oranı doğrudan yazar. Halka tek başına okunmaz — o yüzden ikisi birlikte.
 */
export function ProgressRing({ completed, total, size = 56, className }: ProgressRingProps) {
  const ratio = total > 0 ? Math.min(1, completed / total) : 0;
  const percent = Math.round(ratio * 100);
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${total} adımın ${completed} tanesi tamamlandı, %${percent}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-elevated)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span
        className="figure absolute inset-0 flex items-center justify-center text-sm font-semibold text-ink"
        aria-hidden="true"
      >
        %{percent}
      </span>
    </div>
  );
}
