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
