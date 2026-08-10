import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface BentoCardProps {
  title?: string;
  action?: ReactNode;
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

/**
 * Double-Bezel (Doppelrand) Architecture ile yapılmış yüksek kaliteli kart bileşeni.
 * Etrafında çok ince bir katı yüzeyle korunurken, içerik kendi süspansiyonunda oturur.
 */
export function BentoCard({
  title,
  action,
  scrollable = false,
  className,
  contentClassName,
  children,
}: BentoCardProps) {
  return (
    <section
      className={cn(
        "group isolate relative flex min-h-0 flex-col",
        "p-1.5 rounded-[var(--radius-card)] bg-black/[0.02] ring-1 ring-black/[0.04]",
        "transition-all duration-700 ease-[var(--ease-settle)] hover:bg-black/[0.04]",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-hidden",
          "bg-[var(--color-card)] rounded-[var(--radius-inner)]",
          "shadow-[var(--shadow-card)] transition-shadow duration-700 ease-[var(--ease-settle)]",
          "group-hover:shadow-[var(--shadow-lift)]",
        )}
      >
        {title ? (
          <header className="flex shrink-0 items-center justify-between gap-3 px-6 pt-5 pb-2">
            <h2 className="label truncate rounded-full bg-black/5 px-3 py-1 font-semibold tracking-[0.2em]">
              {title}
            </h2>
            {action ? <div className="shrink-0">{action}</div> : null}
          </header>
        ) : null}
        <div
          className={cn(
            "min-h-0 flex-1 px-6 py-5",
            scrollable && "scroll-thin overflow-y-auto",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
