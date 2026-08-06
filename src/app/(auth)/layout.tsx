import type { ReactNode } from "react";

/**
 * Kabuksuz layout: kenar çubuğu, üst bar ve haber şeridi yok. Giriş bir ürün
 * vitrini değil, bir kapı — gezinme sunmak yanıltıcı olurdu, çünkü hiçbir
 * bağlantı giriş yapılmadan açılmıyor.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="flex min-h-dvh items-center justify-center px-4 py-10">{children}</main>;
}
