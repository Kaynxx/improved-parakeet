import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import type { SessionUser, TickerItem } from "@/types";

interface AppShellProps {
  tickerItems: TickerItem[];
  user: SessionUser;
  children: ReactNode;
}

export function AppShell({ tickerItems, user, children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-transparent">
      <NewsTicker items={tickerItems} />

      <div className="relative z-10 flex w-full flex-1 items-start">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar user={user} />

          <main className="min-w-0 flex-1 px-4 pt-7 pb-32 sm:px-8 sm:pt-9 md:pb-16 lg:px-10">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
