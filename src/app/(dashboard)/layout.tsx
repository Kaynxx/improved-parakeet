import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getTickerItems } from "@/server/services/news";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const tickerItems = await getTickerItems(10);

  return <AppShell tickerItems={tickerItems}>{children}</AppShell>;
}
