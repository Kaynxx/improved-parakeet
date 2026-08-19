import { Compass } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/common/Button";

/**
 * `(dashboard)` altında — kabuk ayakta kalır. Kök `not-found.tsx` olsaydı
 * `notFound()` çağıran ders/haber sayfaları Sidebar'sız, çıplak bir sayfaya
 * düşerdi (Next varsayılanı yalnız çağrıldığı segmentin katmanına bakar).
 */
export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-elevated">
        <Compass className="size-5 text-ink-faint" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="text-md font-medium text-ink">Burada bir şey yok</p>
        <p className="max-w-xs text-sm leading-relaxed text-ink-faint">
          Aradığın ders ya da haber kaldırılmış veya hiç var olmamış olabilir.
        </p>
      </div>
      <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        Panele dön
      </Link>
    </div>
  );
}
