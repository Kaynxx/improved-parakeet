import { parseLessonContent } from "@/lib/content/interactions";
import { guvenliHariciUrl } from "@/lib/security/url";
import { youtubeIdFromUrl } from "@/lib/utils/youtube";
import type { PromptKind, SourceKind, SourceLevel } from "@/types";

/**
 * Ders dosyasının sözleşmesi.
 *
 * Sorular ve kaynaklar **frontmatter'da**, gövdede değil. Gövdeye `:::soru{}`
 * gibi bir blok sözdizimi koymak özel bir ayrıştırıcı yazmayı gerektirirdi;
 * YAML hem hazır ayrıştırılıyor hem de soruları sorgulanabilir veri yapıyor.
 */

export interface ParsedSource {
  kind: SourceKind;
  title: string;
  url: string;
  provider: string | null;
  youtubeId: string | null;
  durationLabel: string | null;
  level: SourceLevel;
  summary: string;
}

export interface ParsedPrompt {
  key: string;
  kind: PromptKind;
  points: number;
  promptMd: string;
  rubricMd: string | null;
  expectedNumeric: string | null;
  tolerance: string | null;
}

export interface ParsedLesson {
  slug: string;
  title: string;
  summary: string;
  estimatedMin: number;
  contentMd: string;
  prerequisites: string[];
  sources: ParsedSource[];
  prompts: ParsedPrompt[];
}

const SOURCE_KINDS: SourceKind[] = ["video", "article", "discussion"];
const SOURCE_LEVELS: SourceLevel[] = ["orta", "ileri", "uzman"];
const PROMPT_KINDS: PromptKind[] = ["acik", "sayisal", "tahmin"];

/**
 * Frontmatter'ı doğrulanmış bir derse çevirir.
 *
 * **Hatalar sessizce yutulmaz.** Eksik ölçüt ya da bozuk YouTube adresi
 * `Error` fırlatır; seed durur ve hangi dosyanın hangi satırının bozuk olduğu
 * yazılır. Alternatif — eksik alanı atlayıp devam etmek — içeriği sessizce
 * yarım bırakır ve fark edilmesi haftalar alır.
 */
export function parseLesson(
  slug: string,
  data: Record<string, unknown>,
  body: string,
): ParsedLesson {
  const nerede = `content/akademi/**/${slug}.md`;

  const title = zorunluMetin(data.baslik, "baslik", nerede);
  const summary = zorunluMetin(data.ozet, "ozet", nerede);
  const estimatedMin = zorunluSayi(data.sure, "sure", nerede);

  const prerequisites = (Array.isArray(data.onkosul) ? data.onkosul : [])
    .filter((x): x is string => typeof x === "string")
    .map((x) => x.trim())
    .filter(Boolean);

  const sources = (Array.isArray(data.kaynaklar) ? data.kaynaklar : []).map((raw, i) =>
    parseSource(raw, i, nerede),
  );

  const prompts = (Array.isArray(data.sorular) ? data.sorular : []).map((raw, i) =>
    parsePrompt(raw, i, nerede),
  );

  const contentMd = body.trim();
  if (!contentMd) {
    throw new Error(`${nerede}: ders gövdesi boş.`);
  }

  // Etkileşim blokları **seed sırasında** doğrulanıyor: bozuk bir blok
  // çalışma zamanında ders sayfasını patlatmadan önce burada durmalı.
  parseLessonContent(contentMd, nerede);

  return { slug, title, summary, estimatedMin, contentMd, prerequisites, sources, prompts };
}

function parseSource(raw: unknown, index: number, nerede: string): ParsedSource {
  const s = nesne(raw, `kaynaklar[${index}]`, nerede);
  const alan = `kaynaklar[${index}]`;

  const kind = birinden(s.tip, SOURCE_KINDS, `${alan}.tip`, nerede);
  const level = birinden(s.seviye, SOURCE_LEVELS, `${alan}.seviye`, nerede);
  const hamUrl = zorunluMetin(s.url, `${alan}.url`, nerede);

  /**
   * Adres burada normalize ediliyor: kaynak listesi kullanıcıya bağlantı ve
   * gömülü oynatıcı olarak basılıyor. `javascript:`/`data:` bir ders
   * dosyasına yazılabilir olsaydı sanitize edilmemiş tek yüzey burası olurdu.
   */
  const url = guvenliHariciUrl(hamUrl);
  if (!url) {
    throw new Error(`${nerede}: ${alan}.url geçerli bir http(s) adresi değil: ${hamUrl}`);
  }

  // Video kaynağının kimliği çözülemiyorsa bu bir içerik hatasıdır: gömülü
  // oynatıcı çalışmayacak ve kullanıcı sebebini anlamayacaktı.
  const youtubeId = youtubeIdFromUrl(url);
  if (kind === "video" && !youtubeId) {
    throw new Error(
      `${nerede}: ${alan}.url bir YouTube video adresi değil ya da kimliği çözülemedi: ${url}`,
    );
  }

  return {
    kind,
    title: zorunluMetin(s.baslik, `${alan}.baslik`, nerede),
    url,
    provider: metinYaDaNull(s.kaynak),
    youtubeId,
    durationLabel: metinYaDaNull(s.sure),
    level,
    summary: zorunluMetin(s.ozet, `${alan}.ozet`, nerede),
  };
}

function parsePrompt(raw: unknown, index: number, nerede: string): ParsedPrompt {
  const p = nesne(raw, `sorular[${index}]`, nerede);
  const alan = `sorular[${index}]`;

  const kind = birinden(p.tip, PROMPT_KINDS, `${alan}.tip`, nerede);
  const rubric = metinYaDaNull(p.olcut ?? olcutListesi(p.olcut));

  // Ölçütsüz açık soru, AI'a "iyi mi?" diye sormak demek — puanlar gürültüye
  // döner. Bu yüzden derleme değil, seed hatası.
  if (kind === "acik" && !rubric) {
    throw new Error(
      `${nerede}: ${alan} açık uçlu ama \`olcut\` yok. Açık sorularda ölçüt zorunlu.`,
    );
  }
  if (kind === "sayisal" && p.beklenen === undefined) {
    throw new Error(`${nerede}: ${alan} sayısal ama \`beklenen\` yok.`);
  }

  return {
    key: zorunluMetin(p.id, `${alan}.id`, nerede),
    kind,
    points: zorunluSayi(p.puan, `${alan}.puan`, nerede),
    promptMd: zorunluMetin(p.soru, `${alan}.soru`, nerede),
    rubricMd: rubric,
    expectedNumeric: p.beklenen === undefined ? null : String(p.beklenen),
    tolerance: p.tolerans === undefined ? null : String(p.tolerans),
  };
}

/** `olcut` hem düz metin hem madde listesi olabilir; ikisi de markdown'a iner. */
function olcutListesi(raw: unknown): string | null {
  if (!Array.isArray(raw)) return null;
  const maddeler = raw.filter((x): x is string => typeof x === "string");
  return maddeler.length > 0 ? maddeler.map((m) => `- ${m}`).join("\n") : null;
}

// --- Doğrulama yardımcıları ------------------------------------------------

function nesne(raw: unknown, alan: string, nerede: string): Record<string, unknown> {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error(`${nerede}: ${alan} bir nesne olmalı.`);
  }
  return raw as Record<string, unknown>;
}

function zorunluMetin(raw: unknown, alan: string, nerede: string): string {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error(`${nerede}: \`${alan}\` zorunlu ve metin olmalı.`);
  }
  return raw.trim();
}

function metinYaDaNull(raw: unknown): string | null {
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (Array.isArray(raw)) return olcutListesi(raw);
  return null;
}

function zorunluSayi(raw: unknown, alan: string, nerede: string): number {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n)) {
    throw new Error(`${nerede}: \`${alan}\` zorunlu ve sayı olmalı.`);
  }
  return n;
}

function birinden<T extends string>(raw: unknown, izinliler: T[], alan: string, nerede: string): T {
  if (typeof raw !== "string" || !izinliler.includes(raw as T)) {
    throw new Error(`${nerede}: \`${alan}\` şunlardan biri olmalı: ${izinliler.join(", ")}`);
  }
  return raw as T;
}
