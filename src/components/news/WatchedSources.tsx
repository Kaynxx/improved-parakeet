import { Rss } from "lucide-react";
import type { Source, SourceCategory } from "@/types";

const CATEGORY_LABEL: Record<SourceCategory, string> = {
  markets: "Piyasalar",
  crypto: "Kripto",
  macro: "Makro",
  tech: "Teknoloji",
};

/**
 * Haber akışı boşken gösterilir. Küçük bir ikon ve "veri yok" cümlesi yerine
 * o an DOĞRU olan şeyi yazar: hangi kaynaklar bağlı ve sırada ne var.
 *
 * Boşluk bir kusur değil, bilgi taşıyabilecek bir alan.
 */
export function WatchedSources({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-elevated">
          <Rss className="size-5 text-ink-faint" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="text-md font-medium text-ink">Henüz kaynak tanımlı değil</p>
        <p className="max-w-xs text-copy leading-relaxed text-ink-faint">
          Haber akışı için önce izlenecek kaynaklar eklenmeli.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center py-6">
      <div className="mx-auto w-full max-w-md">
        <p className="text-md font-semibold text-ink">Akış henüz boş</p>
        <p className="mt-1.5 text-copy leading-relaxed text-ink-faint">
          Aşağıdaki {sources.length} kaynak izleniyor. İlk tarama tamamlandığında başlıklar buraya
          düşer.
        </p>

        <ul className="mt-5 flex flex-col divide-y divide-rule">
          {sources.map((source) => (
            <li key={source.id} className="flex items-center gap-4 py-2.5">
              <span className="min-w-0 flex-1 truncate text-copy text-ink-muted">
                {source.name}
              </span>
              <span className="label shrink-0">{CATEGORY_LABEL[source.category]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
