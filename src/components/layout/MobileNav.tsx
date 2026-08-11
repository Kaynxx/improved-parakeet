"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, NAV } from "@/components/layout/nav";
import { cn } from "@/lib/utils/cn";

/**
 * Mobilde gezinme. Kenar çubuğu `md` altında gizli olduğu için telefonda
 * sayfalar arasında geçilemiyordu — panel açılıyor ama terk edilemiyordu.
 *
 * Açılır menü yerine sabit şerit: dört öğe için menü açmak fazladan bir adım,
 * ve hedefler başparmağın erişemeyeceği üst kenarda kalıyor.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Ana gezinme"
      className="glass-chrome fixed inset-x-0 bottom-0 z-30 border-t border-hairline md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "press flex flex-col items-center gap-1 py-2.5",
                  active ? "text-accent" : "text-ink-faint",
                )}
              >
                {/* Aktif sekmenin üstündeki kısa çubuk: renk tek kanal kalmasın. */}
                <span
                  className={cn(
                    "h-[3px] w-7 rounded-[var(--radius-inner)] transition-colors duration-200",
                    active ? "bg-accent" : "bg-transparent",
                  )}
                  aria-hidden="true"
                />
                <Icon className="size-[19px]" strokeWidth={active ? 2 : 1.75} aria-hidden="true" />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
