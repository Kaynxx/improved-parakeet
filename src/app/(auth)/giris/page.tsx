import type { Metadata, Route } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Giriş" };

/** Açık yönlendirme koruması: yalnız site içi göreli yollar kabul edilir. */
function guvenliDonus(raw: string | undefined): string {
  if (!raw) return "/";
  if (!raw.startsWith("/")) return "/";
  if (raw.startsWith("//")) return "/"; // //evil.com protokol-göreli mutlak URL
  return raw;
}

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ donus?: string }>;
}) {
  const { donus } = await searchParams;
  const hedef = guvenliDonus(donus);

  // Giriş yapmış kullanıcı giriş sayfasını görmemeli.
  const session = await auth();
  // `typedRoutes` derleme anında sabit yol bekliyor; burada yol çalışma anında
  // türüyor. `guvenliDonus` onu zaten site içi göreli bir yola daralttı.
  if (session?.user) redirect(hedef as Route);

  return (
    <div className="w-full max-w-[26rem]">
      <div className="card px-7 py-8 sm:px-9 sm:py-10">
        <svg
          viewBox="0 0 20 20"
          className="size-7 text-accent"
          fill="none"
          role="img"
          aria-label="Finans Programı"
        >
          <path
            d="M2 15.5 L7 9.5 L11 12.5 L18 4"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="mt-5 text-[26px] leading-[1.15] font-semibold tracking-[-0.03em] text-ink">
          Finans Programı
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
          Panelini ve akademi ilerlemeni görmek için giriş yap.
        </p>

        <LoginForm donus={hedef} />

        <p className="mt-6 text-[12px] leading-relaxed text-ink-faint">
          Hesap açmak için terminalde <span className="meta">npm run user:create</span> çalıştır.
        </p>
      </div>
    </div>
  );
}
