import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * **Artık gerçek bir güvenlik kontrolü.**
 *
 * Veritabanı oturumundayken middleware yalnız çerezin varlığına bakabiliyordu —
 * Edge'de Postgres'e sorgu atılamadığı için oturumu doğrulayamıyordu. JWT'ye
 * geçince bu kısıt kalktı: token imzası Edge'de doğrulanabiliyor, dolayısıyla
 * sahte bir çerez buradan geçemez.
 *
 * `(dashboard)/layout.tsx`'teki `auth()` çağrısı yine de duruyor: kullanıcının
 * kimliğini okumak için zaten gerekiyor ve tek bir katmana güvenmemek ucuz bir
 * sigorta.
 */
const { auth } = NextAuth(authConfig);

export default auth((request) => {
  if (request.auth) return;

  const url = new URL("/giris", request.nextUrl.origin);
  // Yalnız yol + sorgu taşınır; tam URL taşınsaydı `donus` parametresi açık
  // yönlendirme (open redirect) taşıyıcısına dönüşürdü.
  const wanted = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (wanted !== "/") url.searchParams.set("donus", wanted);

  return Response.redirect(url);
});

export const config = {
  /**
   * Giriş sayfası, Auth.js uç noktaları, Next içsel dosyaları ve ikon hariç
   * her şey. `_next/image` ve statik varlıklar da dışarıda — onları
   * yönlendirmek sayfayı bozar.
   */
  matcher: ["/((?!giris|api/auth|_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
