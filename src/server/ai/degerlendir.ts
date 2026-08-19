import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

/** Değerlendiren model. Puan geçmişi hangi modelin verdiğiyle birlikte saklanır. */
export const MODEL = "claude-opus-5";

/**
 * Yapılandırılmış çıktı **şart**: serbest metin isteyip puanı sonradan
 * ayrıştırmak, biçim her yanıtta değiştiği için gürültülü skorlar üretir.
 */
const DegerlendirmeSemasi = z.object({
  puan: z.number().describe("0-100 arası, ölçütteki maddelerin karşılanma oranı"),
  guclu_yanlar: z.array(z.string()).describe("Cevabın ölçüte göre doğru yaptıkları"),
  eksikler: z.array(z.string()).describe("Ölçütte istenip cevapta bulunmayanlar"),
  geri_bildirim_md: z.string().describe("Öğrenciye hitap eden kısa geri bildirim, markdown"),
  takip_sorusu: z.string().describe("Düşünmeyi sürdürecek tek bir soru"),
});

export type Degerlendirme = z.infer<typeof DegerlendirmeSemasi>;

export class DegerlendiriciYok extends Error {
  constructor() {
    super("ANTHROPIC_API_KEY tanımlı değil.");
    this.name = "DegerlendiriciYok";
  }
}

const SISTEM = `Sen ileri seviye bir parasal iktisat dersinin değerlendiricisisin.

Öğrencinin cevabını YALNIZCA verilen ölçüte göre puanla. Ölçütte olmayan bir
şeyi eksik sayma; ölçütteki bir maddeyi karşılıyorsa, ifade biçimi farklı olsa
bile karşılanmış say.

Puanlama: her ölçüt maddesi eşit ağırlıkta. Hepsi karşılanmışsa 100'e yakın,
hiçbiri karşılanmamışsa 0'a yakın puan ver. Kısmi karşılamayı kısmi puanla.

Geri bildirim doğrudan öğrenciye hitap etsin, Türkçe olsun ve kısa olsun.
Övgüyle başlama; neyin doğru neyin eksik olduğunu söyle. Cevabı senin yerine
yazma — eksik olanı nasıl düşüneceğini göster.

Takip sorusu, öğrencinin cevabındaki en zayıf noktayı derinleştirsin.`;

interface DegerlendirmeIstegi {
  soru: string;
  olcut: string;
  cevap: string;
}

/**
 * Bir cevabı ölçüte göre değerlendirir.
 *
 * Anahtar yoksa `DegerlendiriciYok` fırlatır — çağıran taraf bunu kullanıcıya
 * "değerlendirici bağlı değil" olarak gösterir. Uygulamanın geri kalanı
 * anahtarsız da çalışmaya devam eder.
 */
export async function degerlendir({
  soru,
  olcut,
  cevap,
}: DegerlendirmeIstegi): Promise<Degerlendirme> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new DegerlendiriciYok();

  const client = new Anthropic({ apiKey });

  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: SISTEM,
    output_config: { format: zodOutputFormat(DegerlendirmeSemasi) },
    messages: [
      {
        role: "user",
        content: [
          "<soru>",
          soru,
          "</soru>",
          "",
          "<olcut>",
          olcut,
          "</olcut>",
          "",
          "<ogrenci_cevabi>",
          cevap,
          "</ogrenci_cevabi>",
        ].join("\n"),
      },
    ],
  });

  const parsed = response.parsed_output;
  if (!parsed) {
    throw new Error("Değerlendirme çözümlenemedi; model şemaya uymayan bir yanıt döndürdü.");
  }

  // Model şemaya uysa da aralık dışı puan verebilir; sınırla.
  return { ...parsed, puan: Math.max(0, Math.min(100, Math.round(parsed.puan))) };
}
