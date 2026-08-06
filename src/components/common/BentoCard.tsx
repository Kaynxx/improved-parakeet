import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface BentoCardProps {
  title?: string;
  /** Başlığın sağındaki aksiyon alanı — "tümünü gör" bağlantısı, sayaç vb. */
  action?: ReactNode;
  /** İçerik kendi içinde kayar, ızgara zıplamaz. */
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

/**
 * Kâğıdın üstünde duran açık yüzey.
 *
 * Başlık satırı ayrı bir çizgiyle kesilmiyor: başlık ile içerik zaten aynı
 * karta ait, aralarındaki boşluk bunu söylemeye yetiyor. Çizgi kartı iki ayrı
 * kutu gibi gösteriyordu.
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
        "card group flex min-h-0 flex-col overflow-hidden",
        "transition-shadow duration-300 ease-[var(--ease-settle)] hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {title ? (
        <header className="flex shrink-0 items-center justify-between gap-3 px-5 pt-4 pb-1">
          <h2 className="label truncate">{title}</h2>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      ) : null}
      <div
        className={cn(
          "min-h-0 flex-1 px-5 py-4",
          scrollable && "scroll-thin overflow-y-auto",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
