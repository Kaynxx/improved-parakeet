"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { TickerItem } from "@/types";

/**
 * Saf CSS marquee: JS yok, compositor'da 60fps.
 * Şerit iki kez basılır ve %50 kaydırılır — dikiş görünmez.
 * `aria-hidden` ile kopya içerik ekran okuyucuya iki kez okunmaz; erişilebilir
 * özet gizli listede verilir.
 *
 * Hover'da ve içinden bir öğe odaklandığında durur, ama bu dokunmatik ve
 * yalnız-klavye kullanıcısını kapsamaz — WCAG 2.2.2 5 saniyeden uzun süren
 * otomatik hareket için görünür bir durdur/oynat denetimi istiyor.
 */
export function NewsTicker({ items }: { items: TickerItem[] }) {
  const [duraklatildi, setDuraklatildi] = useState(false);

  if (items.length === 0) return null;

  return (
    <div
      className="ticker glass-chrome relative flex h-10 items-center overflow-hidden border-x-0 border-t-0 border-b border-hairline"
      data-paused={duraklatildi}
    >
      <div className="ticker-track flex w-max shrink-0 items-center" aria-hidden="true">
        <TickerRun items={items} />
        <TickerRun items={items} />
      </div>

      {/* Kenarlarda yumuşak geçiş — metin sert kesilmez. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-base to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-base to-transparent"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setDuraklatildi((v) => !v)}
        aria-pressed={duraklatildi}
        title={duraklatildi ? "Şeridi oynat" : "Şeridi duraklat"}
        className={cn(
          "press absolute inset-y-0 right-0 z-10 flex w-9 items-center justify-center",
          "bg-gradient-to-l from-base via-base to-transparent text-ink-faint hover:text-ink",
        )}
      >
        {duraklatildi ? (
          <Play className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Pause className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
        )}
        <span className="sr-only">{duraklatildi ? "Şeridi oynat" : "Şeridi duraklat"}</span>
      </button>

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
        <span key={item.id} className="flex items-center gap-2.5 px-5 text-sm whitespace-nowrap">
          {item.isBreaking ? (
            <span className="label rounded-[var(--radius-inner)] bg-accent-soft px-1.5 py-[3px] text-accent">
              Son dakika
            </span>
          ) : null}
          <span className="meta font-medium text-ink">{item.label}</span>
          <span className="text-ink-muted">{item.headline}</span>
          <span className="ml-3.5 text-hairline-strong" aria-hidden="true">
            —
          </span>
        </span>
      ))}
    </div>
  );
}
