import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * **Edge-güvenli yapılandırma. Burada veritabanı import etmek YASAK.**
 *
 * `middleware.ts` Edge runtime'da çalışır ve Postgres'e bağlanamaz. Bu dosya
 * middleware tarafından import edildiği için `@/lib/db`, `postgres` ya da
 * `@auth/drizzle-adapter` buraya giremez — girdiği anda middleware çalışma
 * anında patlar ve hata mesajı sebebi göstermez.
 *
 * Adapter ve veritabanı oturumu `src/auth.ts`'te; o dosya yalnız Node
 * runtime'dan (layout, route handler) import edilir.
 */
export const authConfig = {
  providers: [Google],
  pages: {
    signIn: "/giris",
    error: "/giris",
  },
} satisfies NextAuthConfig;
