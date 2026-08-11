import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

/**
 * Boş ekran bir kusur değil, yön verme anı: ne olduğunu ve sırada ne
 * olduğunu söyler. İkon kâğıt tonunda bir daire içinde durur — çıplak gri bir
 * ikon boşluğu daha da boş gösteriyordu.
 */
export function EmptyState({ icon: Icon = Inbox, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-elevated">
        <Icon className="size-5 text-ink-faint" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="text-[14.5px] font-medium text-ink">{title}</p>
      {description ? (
        <p className="max-w-xs text-[13px] leading-relaxed text-ink-faint">{description}</p>
      ) : null}
    </div>
  );
}
