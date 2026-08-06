import { GraduationCap, LineChart, MessagesSquare, Newspaper } from "lucide-react";
import type { Route } from "next";

/**
 * Gezinme tek yerde tanımlı — kenar çubuğu ve mobil şerit aynı listeyi okur.
 * İkisi ayrı ayrı yazılsaydı bir öğe eklendiğinde birinde unutulurdu.
 *
 * "Panel" yerine "Bugün": bir gezinme öğesi içeriğinin ADINI taşımalı, onu
 * kapsayan kabın adını değil. "Panel" her şeyi anlatabilir, dolayısıyla hiçbir
 * şey anlatmaz; "Bugün" ne bulacağını söylüyor.
 */
export const NAV = [
  { href: "/", label: "Bugün", icon: LineChart },
  { href: "/haberler", label: "Haberler", icon: Newspaper },
  { href: "/topluluk", label: "Topluluk", icon: MessagesSquare },
  { href: "/akademi", label: "Akademi", icon: GraduationCap },
] as const satisfies ReadonlyArray<{ href: Route; label: string; icon: typeof LineChart }>;

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
