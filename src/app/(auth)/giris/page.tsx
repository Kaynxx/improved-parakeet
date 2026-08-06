import type { Metadata, Route } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { GoogleButton } from "@/components/auth/GoogleButton";

export const metadata: Metadata = { title: "Giriş" };

/**
 * Auth.js hata kodları. Her mesaj ne olduğunu VE ne yapılacağını söyler —
 * "bir şeyler ters gitti" okuru hiçbir yere götürmüyor.
 */
const HATA: Record<string, string> = {
  OAuthAccountNotLinked:
    "Bu e-posta adresi başka bir yöntemle kayıtlı. İlk kullandığın yöntemle giriş yap.",
  AccessDenied: "Google erişim isteğini reddettin. Devam etmek için izin vermen gerekiyor.",
  // TODO(deployment): üretimde ortam değişkeni adı sızdırılmamalı. Deployment
  // kararı verilince bu mesaj genelleştirilecek.
  Configuration: "Sunucu yapılandırması eksik. AUTH_GOOGLE_ID ve AUTH_GOOGLE_SECRET tanımlı mı?",
  Verification: "Bağlantının süresi dolmuş. Yeniden dene.",
};

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
  searchParams: Promise<{ donus?: string; error?: string }>;
}) {
  const { donus, error } = await searchParams;
  const hedef = guvenliDonus(donus);

  // Giriş yapmış kullanıcı giriş sayfasını görmemeli.
  const session = await auth();
  // `typedRoutes` derleme anında sabit yol bekliyor; burada yol çalışma anında
  // türüyor. `guvenliDonus` onu zaten site içi göreli bir yola daralttı.
  if (session?.user) redirect(hedef as Route);

  const mesaj = error ? (HATA[error] ?? "Giriş tamamlanamadı. Tekrar dene.") : null;

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

        {mesaj ? (
          <p
            role="alert"
            className="mt-5 rounded-[var(--radius-inner)] bg-down-soft px-4 py-3 text-[13px] leading-relaxed text-down"
          >
            {mesaj}
          </p>
        ) : null}

        <div className="mt-7">
          <GoogleButton donus={hedef} />
        </div>

        <p className="mt-5 text-[12px] leading-relaxed text-ink-faint">
          Giriş yaptığında adın, e-postan ve profil görselin hesabına kaydedilir. Akademi ilerlemen
          bu hesaba bağlanır.
        </p>
      </div>
    </div>
  );
}
