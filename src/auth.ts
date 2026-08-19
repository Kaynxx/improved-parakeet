import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { girisKisitlayici } from "@/lib/security/giris-kisitlama";

/**
 * Tam yapılandırma: şifre doğrulayan Credentials sağlayıcısı. Yalnız Node
 * runtime'dan yüklenir (sayfa, layout, route handler, server action) —
 * middleware'den ASLA, çünkü hem Postgres hem argon2 Edge'de çalışmaz.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        const normalEmail = email.trim().toLocaleLowerCase("tr-TR");

        /**
         * Deneme sınırı **veritabanı ve argon2'den önce**: engellenmiş bir
         * anahtar için sorgu atmak ve özet doğrulamak, sınırlamanın amacı olan
         * maliyeti saldırgana değil sunucuya yüklerdi.
         *
         * Dönüş değeri yanlış şifreyle aynı: "engellendin" demek, hesabın var
         * olduğunu doğrulayan bir yan kanal olurdu.
         */
        if (!girisKisitlayici.izinVar(normalEmail)) return null;

        const rows = await getDb()
          .select()
          .from(users)
          .where(eq(users.email, normalEmail))
          .limit(1);

        const user = rows[0];
        /**
         * Kullanıcı yoksa da şifre yanlışsa da **aynı** sonucu döndürüyoruz.
         * Ayırmak, kayıtlı e-postaları saldırgana sayan bir uç nokta üretirdi
         * (hesap sayımı / account enumeration).
         */
        if (!user) {
          girisKisitlayici.basarisizlikKaydet(normalEmail);
          return null;
        }

        const ok = await verify(user.passwordHash, password);
        if (!ok) {
          girisKisitlayici.basarisizlikKaydet(normalEmail);
          return null;
        }

        girisKisitlayici.basariKaydet(normalEmail);

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
});
