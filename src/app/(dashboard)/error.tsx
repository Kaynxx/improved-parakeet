"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/common/Button";

/**
 * Kabuk (Sidebar/TopBar/ticker) `(dashboard)/layout.tsx`'te — bu sınırın
 * ÜSTÜNDE olduğu için hata sırasında da ayakta kalır. Yalnız bu sayfanın
 * yeri boşalır; kullanıcı geziniyor gibi kalır, "uygulama çöktü" hissi yok.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-down-soft">
        <AlertTriangle className="size-5 text-down" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="text-md font-medium text-ink">Bu sayfa yüklenemedi</p>
        <p className="max-w-xs text-sm leading-relaxed text-ink-faint">
          Bir sunucu hatası oldu. Tekrar denemek genelde çözer; sürerse verisi değişmemiş
          olabilir.
        </p>
      </div>
      <Button variant="ghost" size="sm" onClick={reset}>
        Tekrar dene
      </Button>
    </div>
  );
}
