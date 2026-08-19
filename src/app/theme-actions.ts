"use server";

import { cookies } from "next/headers";
import { gecerliTemaMi, TEMA_COOKIE, type Tema, VARSAYILAN_TEMA } from "@/lib/theme";

export async function aktifTema(): Promise<Tema> {
  const deger = (await cookies()).get(TEMA_COOKIE)?.value;
  return gecerliTemaMi(deger) ? deger : VARSAYILAN_TEMA;
}

/**
 * Şema seçimini bir yıl kalıcılaştırır. İstemci tarafı `document.documentElement`
 * üzerinde anında güncelliyor (bkz. `ThemeSwitcher`) — bu eylem yalnız
 * bir sonraki sunucu render'ının flaşsız başlaması için çerezi yazıyor.
 */
export async function temaSec(tema: Tema): Promise<void> {
  if (!gecerliTemaMi(tema)) return;
  (await cookies()).set(TEMA_COOKIE, tema, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}
