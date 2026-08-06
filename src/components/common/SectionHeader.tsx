import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Sayfa başlığı. Büyük puntoda tracking negatife gider — harfler büyüdükçe
 * aralarındaki boşluk optik olarak açılır ve sıkılmazsa başlık dağılır.
 */
export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div className="min-w-0">
        <h1 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[32px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-prose text-[14.5px] leading-relaxed text-ink-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 pb-1">{action}</div> : null}
    </div>
  );
}
