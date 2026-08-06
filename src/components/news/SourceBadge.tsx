import { cn } from "@/lib/utils/cn";
import type { Source, SourceCategory } from "@/types";

const CATEGORY_LABEL: Record<SourceCategory, string> = {
  markets: "Piyasalar",
  crypto: "Kripto",
  macro: "Makro",
  tech: "Teknoloji",
};

/** Favicon yerine kaynak adının baş harfi — harici görsel yüklenmez. */
export function SourceBadge({ source, className }: { source: Source; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        aria-hidden="true"
        className="flex size-[17px] shrink-0 items-center justify-center rounded-[5px] bg-ink text-[10px] font-semibold text-paper"
      >
        {source.name.charAt(0)}
      </span>
      <span className="text-[12.5px] font-medium text-ink-muted">{source.name}</span>
      <span className="sr-only">, {CATEGORY_LABEL[source.category]} kategorisi</span>
    </span>
  );
}
