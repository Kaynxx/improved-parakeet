import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import { AppShell } from "@/components/layout/AppShell";
import { getTickerItems } from "@/server/services/news";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  /**
   * **Asıl güvenlik sınırı burası.** `middleware.ts` yalnız çerezin varlığına
   * bakıyor; oturumu veritabanından doğrulayan tek yer bu çağrı. Sahte çerezle
   * middleware'i geçen bir istek buradan geri döner.
   */
  const session = await auth();
  if (!session?.user) redirect("/giris");

  const tickerItems = await getTickerItems(10);

  return (
    <AppShell
      tickerItems={tickerItems}
      user={{
        name: session.user.name ?? null,
        email: session.user.email ?? "",
        image: session.user.image ?? null,
      }}
    >
      {children}
    </AppShell>
  );
}
