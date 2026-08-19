import { z } from "zod";

/**
 * Ders gövdesindeki `etkilesim` blokları **kapalı** bir kümedir: yalnız burada
 * tanımlı üç tür render edilir. `.strict()` bilerek: içerikteki yazım hatası
 * sessizce varsayılana düşerse yanlış laboratuvar gösterilir.
 *
 * Sayılar `finite`: `Infinity` bir grafiği bozmadan geçip ekranda `NaN`
 * üretiyordu.
 */
const sayi = z.number().finite();
const pozitif = sayi.positive();

const THesapSemasi = z
  .object({
    tur: z.literal("t-hesap"),
    baslik: z.string().min(1),
    baslangic: z.object({ varliklar: sayi, yukumlulukler: sayi, ozkaynak: sayi }).strict(),
    adimlar: z
      .array(
        z
          .object({
            etiket: z.string().min(1),
            varlikDegisimi: sayi,
            yukumlulukDegisimi: sayi,
            ozkaynakDegisimi: sayi,
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

const DurasyonSemasi = z
  .object({
    tur: z.literal("durasyon-konveksite"),
    baslik: z.string().min(1),
    nominalFiyat: pozitif,
    yillikKuponOrani: sayi.min(0).max(1),
    vadeYil: pozitif,
    yillikGetiri: sayi.gt(-1),
    faizSokuBazPuan: sayi,
    yillikOdemeSayisi: z.number().int().positive(),
  })
  .strict();

const TufeSemasi = z
  .object({
    tur: z.literal("tufe-sepeti"),
    baslik: z.string().min(1),
    kalemler: z
      .array(
        z
          .object({
            ad: z.string().min(1),
            fiyatDegisimiYuzde: sayi,
            resmiAgirlik: sayi.nonnegative(),
            kisiselAgirlik: sayi.nonnegative(),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

/** Kapalı registry. Yeni tür eklemek buraya dokunmayı gerektirir - bilinçli. */
const EtkilesimSemasi = z.discriminatedUnion("tur", [THesapSemasi, DurasyonSemasi, TufeSemasi]);

export type EtkilesimYapilandirmasi = z.infer<typeof EtkilesimSemasi>;

export type DersIcerigiParcasi =
  | { kind: "markdown"; content: string }
  | { kind: "interaction"; config: EtkilesimYapilandirmasi };

/**
 * Markdown metnini normal metin ve etkileşim blokları olarak ayrıştırır.
 * Etkileşim blokları JSON olarak doğrulanır ve hatalar konum bilgisiyle fırlatılır.
 */
export function parseLessonContent(
  contentMd: string,
  location: string = "bilinmeyen-konum",
): DersIcerigiParcasi[] {
  // Regex, ```etkilesim bloğunu yakalar ve metni böler.
  // split ile yakalama grubu kullanıldığında, eşleşen kısımlar da diziye dahil edilir.
  const parts = contentMd.split(/(```etkilesim\n[\s\S]*?\n```)/);
  const result: DersIcerigiParcasi[] = [];

  for (const [i, part] of parts.entries()) {
    if (part === undefined) continue;

    // Çift indeksler markdown metnidir.
    if (i % 2 === 0) {
      if (part !== "") {
        result.push({ kind: "markdown", content: part });
      }
      continue;
    }

    // Tek indeksler etkileşim bloğudur. JSON kısmını ayıklıyoruz.
    const jsonStr = part.replace(/^```etkilesim\n/, "").replace(/\n```$/, "");
    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonStr);
    } catch (error) {
      const neden = error instanceof Error ? error.message : String(error);
      throw new Error(`${location}: etkileşim bloğunda geçersiz JSON - ${neden}`);
    }

    try {
      const config = EtkilesimSemasi.parse(parsed);
      result.push({ kind: "interaction", config });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Tür alanı yoksa veya geçersizse bilinmeyen tür hatası fırlatılır.
        const isUnknown = error.issues.some(
          (iss) => iss.code === "invalid_union" || iss.path[0] === "tur",
        );

        if (isUnknown || typeof (parsed as Record<string, unknown>)?.tur !== "string") {
          throw new Error(`${location}: bilinmeyen etkileşim türü`);
        }

        // Şema dışı (fazladan) alanlar tespit edilir.
        const unrecognized = error.issues.find((iss) => iss.code === "unrecognized_keys");

        if (unrecognized && "keys" in unrecognized) {
          throw new Error(`${location}: şema dışı alan bulundu (${unrecognized.keys.join(", ")})`);
        }

        // Diğer şema hataları için genel mesaj.
        throw new Error(`${location}: şema hatası (${error.message})`);
      }

      // Zod dışı beklenmeyen hatalar yukarı iletilir.
      throw error;
    }
  }

  return result;
}
