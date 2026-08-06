import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * **Bu bir güvenlik sınırı DEĞİL.**
 *
 * Yalnız oturum çerezinin *varlığına* bakar, geçerliliğine değil — Edge
 * runtime'da Postgres'e sorgu atılamadığı için veritabanı oturumu burada
 * doğrulanamaz. Sahte bir çerezle buradan geçilebilir ve bunun bir önemi yok:
 * asıl sınır `(dashboard)/layout.tsx`'teki `auth()` çağrısı, o da oturumu
 * veritabanından doğruluyor.
 *
 * Middleware'in işi korumalı sayfanın boş render edilip sonra atılmasını
 * önlemek: çerez yoksa sunucu hiç çalışmadan `/giris`'e yönlendiriyoruz.
 */
const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"] as const;

export function middleware(request: NextRequest) {
  const hasSessionCookie = SESSION_COOKIES.some((name) => request.cookies.has(name));
  if (hasSessionCookie) return NextResponse.next();

  const url = new URL("/giris", request.url);
  // Giriş sonrası kullanıcıyı gitmek istediği yere döndürmek için. Yalnız yol
  // + sorgu taşınır; tam URL taşınsaydı `donus` parametresi açık yönlendirme
  // (open redirect) taşıyıcısına dönüşürdü.
  const wanted = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (wanted !== "/") url.searchParams.set("donus", wanted);

  return NextResponse.redirect(url);
}

export const config = {
  /**
   * Giriş sayfası, Auth.js uç noktaları, Next içsel dosyaları ve ikon hariç
   * her şey. `_next/image` ve statik varlıklar da dışarıda — onları
   * yönlendirmek sayfayı bozar.
   */
  matcher: ["/((?!giris|api/auth|_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
