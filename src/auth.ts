import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { getDb } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

/**
 * Tam yapılandırma: adapter + **veritabanı** oturumu. Yalnız Node runtime'dan
 * import edilir (layout, route handler, server action) — middleware'den ASLA.
 *
 * Oturum stratejisi neden JWT değil: JWT sunucudan iptal edilemez, süresi
 * dolana kadar geçerlidir. `user_progress` zaten veritabanında olduğu için
 * oturum adına ikinci bir doğruluk kaynağı kurmanın karşılığı yok.
 *
 * Bedeli: middleware oturumu doğrulayamaz. Bu yüzden güvenlik sınırı
 * middleware değil, `(dashboard)/layout.tsx`'teki `auth()` çağrısı.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(getDb(), {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "database" },
  callbacks: {
    /** Oturumdaki `user.id` varsayılan tiplerde yok; sayfaların ihtiyacı var. */
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
