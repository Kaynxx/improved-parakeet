import type { NextAuthConfig } from "next-auth";

/**
 * **Edge-güvenli yapılandırma. Burada veritabanı ve argon2 import etmek YASAK.**
 *
 * `middleware.ts` bu dosyayı Edge runtime'da yüklüyor; oraya Postgres sürücüsü
 * ya da yerel (native) bir kripto modülü girerse middleware çalışma anında
 * patlar. Şifre doğrulaması yapan Credentials sağlayıcısı bu yüzden burada
 * değil, `src/auth.ts`'te — o dosya yalnız Node runtime'dan yükleniyor.
 *
 * `providers` bilerek boş: middleware'in oturumu doğrulamak için sağlayıcıya
 * ihtiyacı yok, yalnız JWT'yi çözmesi yeterli.
 */
export const authConfig = {
  providers: [],
  /**
   * `next start` NODE_ENV=production ile çalışır ve Auth.js o durumda `Host`
   * başlığına varsayılan olarak GÜVENMEZ; middleware her istekte
   * `UntrustedHost` fırlatır, oturumu çözemez ve korumalı rotaların hepsi
   * "oturum yok" sanılıp /giris'e atılır. Hata yalnız üretim derlemesinde
   * görünür — `next dev` host'a kendiliğinden güvendiği için geliştirmede
   * gizli kalır.
   *
   * Uygulama tek kullanıcılı ve kendi sunucusunda çalıştığı için Host'a
   * güvenmek burada doğru karar. Ters vekil (reverse proxy) arkasına
   * konulursa bu yetmez; `AUTH_URL` ile dış adres sabitlenmelidir.
   */
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/giris",
    error: "/giris",
  },
  callbacks: {
    /** Kullanıcı kimliğini token'a yaz — oturum tablosu olmadığı için tek kaynak bu. */
    jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
