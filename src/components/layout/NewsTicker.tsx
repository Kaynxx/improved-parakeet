import type { TickerItem } from "@/types";

/**
 * Saf CSS marquee: JS yok, compositor'da 60fps.
 * Şerit iki kez basılır ve %50 kaydırılır — dikiş görünmez.
 * `aria-hidden` ile kopya içerik ekran okuyucuya iki kez okunmaz; erişilebilir
 * özet gizli listede verilir.
 *
 * Hover'da ve içinden bir öğe odaklandığında durur: kayan metin okunamaz, ve
 * okunamayan bir şeyin üstüne gelmek onu okuma niyetidir.
 */
export function NewsTicker({ items }: { items: TickerItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="ticker relative flex h-10 items-center overflow-hidden border-b border-rule bg-paper-deep">
      <div className="ticker-track flex w-max shrink-0 items-center" aria-hidden="true">
        <TickerRun items={items} />
        <TickerRun items={items} />
      </div>

      {/* Kenarlarda yumuşak geçiş — metin sert kesilmez. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-paper-deep to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-paper-deep to-transparent"
        aria-hidden="true"
      />

      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.id}>
            {item.isBreaking ? "Son dakika: " : ""}
            {item.label} — {item.headline}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TickerRun({ items }: { items: TickerItem[] }) {
  return (
    <div className="flex items-center">
      {items.map((item) => (
        <span
          key={item.id}
          className="flex items-center gap-2.5 px-5 text-[12.5px] whitespace-nowrap"
        >
          {item.isBreaking ? (
            <span className="label rounded-[var(--radius-chip)] bg-accent-soft px-1.5 py-[3px] text-accent">
              Son dakika
            </span>
          ) : null}
          <span className="meta font-medium text-ink">{item.label}</span>
          <span className="text-ink-muted">{item.headline}</span>
          <span className="ml-3.5 text-rule-strong" aria-hidden="true">
            —
          </span>
        </span>
      ))}
    </div>
  );
}
