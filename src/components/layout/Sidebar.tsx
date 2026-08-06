"use client";

import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isActive, NAV } from "@/components/layout/nav";
import { cn } from "@/lib/utils/cn";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-rule md:flex",
        "transition-[width] duration-300 ease-[var(--ease-settle)]",
        collapsed ? "w-[68px]" : "w-60",
      )}
    >
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-4">
        {/* Marka işareti: aksan mürekkebiyle çizilmiş bir yükseliş çentiği.
            Yuvarlak bir nokta yerine çizgi, çünkü panelin imzası da bir çizgi. */}
        <svg
          viewBox="0 0 20 20"
          className="size-5 shrink-0 text-accent"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 15.5 L7 9.5 L11 12.5 L18 4"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {!collapsed ? (
          <span className="truncate text-[15px] font-semibold tracking-[-0.02em] text-ink">
            Finans Programı
          </span>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3" aria-label="Ana gezinme">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "press relative flex items-center gap-3 rounded-[var(--radius-inner)] px-3 py-2.5",
                "text-[14px] font-medium",
                active
                  ? "bg-card text-ink shadow-[var(--shadow-card)]"
                  : "text-ink-muted hover:bg-card/60 hover:text-ink",
                collapsed && "justify-center px-0",
              )}
            >
              {/* Aktiflik renk dışında ikinci bir kanal daha taşır: sol çubuk. */}
              {active ? (
                <span
                  className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-accent"
                  aria-hidden="true"
                />
              ) : null}
              <Icon
                className={cn("size-[18px] shrink-0", active && "text-accent")}
                strokeWidth={active ? 2 : 1.75}
                aria-hidden="true"
              />
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 p-3">
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-expanded={!collapsed}
          className={cn(
            "press flex w-full items-center gap-3 rounded-[var(--radius-inner)] px-3 py-2.5",
            "text-[13px] text-ink-faint hover:bg-card/60 hover:text-ink",
            collapsed && "justify-center px-0",
          )}
        >
          <PanelLeft
            className={cn(
              "size-[18px] shrink-0 transition-transform duration-300",
              collapsed && "rotate-180",
            )}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {!collapsed ? <span>Daralt</span> : <span className="sr-only">Menüyü genişlet</span>}
        </button>
      </div>
    </aside>
  );
}
