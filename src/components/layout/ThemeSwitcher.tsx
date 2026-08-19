"use client";

import { BookOpen, Moon, TerminalSquare } from "lucide-react";
import { useState, useTransition } from "react";
import { temaSec } from "@/app/theme-actions";
import { cn } from "@/lib/utils/cn";
import type { Tema } from "@/lib/theme";

const SEMALAR: { tema: Tema; label: string; Icon: typeof Moon }[] = [
  { tema: "glass", label: "Koyu Cam", Icon: Moon },
  { tema: "editorial", label: "Açık Editoryal", Icon: BookOpen },
  { tema: "terminal", label: "Terminal", Icon: TerminalSquare },
];

/**
 * Üç tasarım şeması arasında anında geçiş. DOM'u önce iyimser günceller —
 * çerezi yazan sunucu eylemini beklemek bir sonraki sayfa geçişine kadar
 * yanlış şemayı göstermek demekti. Çerez yalnız bir sonraki `<html>`
 * render'ının flaşsız başlaması için kalıcılaştırılıyor.
 */
export function ThemeSwitcher({ collapsed = false }: { collapsed?: boolean }) {
  const [aktif, setAktif] = useState<Tema>(
    () => (document.documentElement.dataset.theme as Tema | undefined) ?? "glass",
  );
  const [, startTransition] = useTransition();

  function semaSec(tema: Tema) {
    document.documentElement.dataset.theme = tema;
    setAktif(tema);
    startTransition(() => {
      void temaSec(tema);
    });
  }

  return (
    <div
      role="radiogroup"
      aria-label="Tasarım şeması"
      className={cn("inset-panel flex gap-0.5 p-0.5", collapsed ? "flex-col" : "flex-row")}
    >
      {SEMALAR.map(({ tema, label, Icon }) => (
        <button
          key={tema}
          type="button"
          role="radio"
          aria-checked={aktif === tema}
          title={label}
          onClick={() => semaSec(tema)}
          className={cn(
            "press flex flex-1 items-center justify-center rounded-[var(--radius-inner)] py-2",
            aktif === tema
              ? "bg-elevated text-ink"
              : "text-ink-faint hover:bg-elevated/70 hover:text-ink-muted",
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}
