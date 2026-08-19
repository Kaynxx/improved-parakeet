export const TEMA_COOKIE = "tema";
export const TEMALAR = ["glass", "editorial", "terminal"] as const;
export type Tema = (typeof TEMALAR)[number];
export const VARSAYILAN_TEMA: Tema = "glass";

export function gecerliTemaMi(deger: string | undefined): deger is Tema {
  return TEMALAR.includes(deger as Tema);
}
