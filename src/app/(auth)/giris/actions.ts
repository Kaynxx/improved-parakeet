"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export interface GirisDurumu {
  hata: string | null;
}

/**
 * Giriş sunucu eylemi. Şifre yalnız burada, sunucuda görülür — istemciye
 * hiçbir zaman inmez ve `formData` üzerinden tek yön akar.
 */
export async function girisYap(_onceki: GirisDurumu, formData: FormData): Promise<GirisDurumu> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const donus = String(formData.get("donus") ?? "/");

  if (!email || !password) {
    return { hata: "E-posta ve şifre gerekli." };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: donus });
    return { hata: null };
  } catch (error) {
    /**
     * `signIn` başarılı olduğunda Next'in yönlendirme sinyalini **fırlatarak**
     * çalışır. Onu yakalayıp hata sanmamak için yeniden fırlatmak zorundayız;
     * yoksa giriş çalışır ama kullanıcı giriş ekranında kalır.
     */
    if (error instanceof AuthError) {
      // Kullanıcı yok / şifre yanlış ayrımı yapılmıyor: ayırmak kayıtlı
      // e-postaları sayan bir uç nokta üretirdi.
      if (error.type === "CredentialsSignin") {
        return { hata: "E-posta veya şifre hatalı." };
      }
      return { hata: "Giriş tamamlanamadı. Tekrar dene." };
    }
    throw error;
  }
}
