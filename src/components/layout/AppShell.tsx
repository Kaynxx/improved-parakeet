import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import type { SessionUser, TickerItem } from "@/types";

interface AppShellProps {
  /** Veriyi kabuk kendisi çekmez — sınır kuralı: bileşenler servis bilmez. */
  tickerItems: TickerItem[];
  user: SessionUser;
  children: ReactNode;
}

export function AppShell({ tickerItems, user, children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <NewsTicker items={tickerItems} />
      <div className="flex flex-1 items-start">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar user={user} />
          {/* Alt dolgu mobil gezinme şeridinin altında kalan içeriği kurtarır;
              `md` üstünde şerit yok, dolgu da yok. */}
          <main className="min-w-0 flex-1 px-4 pt-5 pb-28 sm:px-7 sm:pt-7 md:pb-10">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
