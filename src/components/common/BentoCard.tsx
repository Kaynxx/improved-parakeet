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

/** Ortak veri yüzeyi. Blur burada bir kez uygulanır; çocuk paneller blur almaz. */
export function BentoCard({
  title,
  action,
  scrollable = false,
  className,
  contentClassName,
  children,
}: BentoCardProps) {
  return (
    <section className={cn("glass relative flex min-h-0 flex-col overflow-hidden", className)}>
      {title ? (
        <header className="flex shrink-0 items-center justify-between gap-3 px-5 pt-5 pb-2">
          <h2 className="label truncate">{title}</h2>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      ) : null}
      <div
        className={cn(
          "min-h-0 flex-1 px-5 py-5",
          scrollable && "scroll-thin overflow-y-auto",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
