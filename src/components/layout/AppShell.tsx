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
    <div className="flex min-h-dvh flex-col bg-[var(--color-paper)]">
      {/* Superbrain Streaming efekti arka planına yerleştirildi */}
      <div className="superbrain-stream border-b border-black/[0.04]">
        <NewsTicker items={tickerItems} />
      </div>

      <div className="flex flex-1 items-start relative z-10 w-full max-w-[1536px] mx-auto">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar user={user} />

          <main className="min-w-0 flex-1 px-4 pt-10 pb-32 sm:px-12 sm:pt-14 md:pb-24">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
