"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface UserMenuProps {
  name: string | null;
  email: string;
  image: string | null;
}

export function UserMenu({ name, email, image }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklama ve Escape ile kapanır. İkisi de olmazsa menü açık kalıp
  // altındaki içeriği bloklar.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const basHarf = (name ?? email).charAt(0).toLocaleUpperCase("tr-TR");

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="press flex size-10 items-center justify-center overflow-hidden rounded-[var(--radius-inner)] bg-ink text-copy font-semibold text-on-ink hover:bg-accent"
      >
        {image ? (
          // biome-ignore lint/performance/noImgElement: Google CDN alan adı, next/image için remotePatterns gerekir
          <img src={image} alt="" className="size-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span aria-hidden="true">{basHarf}</span>
        )}
        <span className="sr-only">Hesap menüsü</span>
      </button>

      {open ? (
        <div
          role="menu"
          className={cn(
            "glass absolute top-[calc(100%+8px)] right-0 z-30 w-60 overflow-hidden p-1.5",
            "shadow-[var(--shadow-lift)]",
          )}
        >
          <div className="px-3 py-2.5">
            {name ? <p className="truncate text-copy font-semibold text-ink">{name}</p> : null}
            <p className="mt-0.5 truncate text-sm text-ink-faint">{email}</p>
          </div>

          <div className="my-1 h-px bg-hairline" />

          <button
            type="button"
            role="menuitem"
            onClick={() => void signOut({ redirectTo: "/giris" })}
            className="press flex w-full items-center gap-2.5 rounded-[var(--radius-inner)] px-3 py-2.5 text-copy font-medium text-ink-muted hover:bg-elevated hover:text-ink"
          >
            <LogOut className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            Çıkış yap
          </button>
        </div>
      ) : null}
    </div>
  );
}
