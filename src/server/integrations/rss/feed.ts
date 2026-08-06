/**
 * RSS/Atom feed'ini çeker ve tek bir normalize biçime indirger.
 *
 * Bu dosya **ağ ve biçim** işiyle sınırlı: veritabanını, slug'ı, sembolü
 * bilmez. Sekiz kaynağın sekiz farklı XML lehçesi burada biter; aşağısı tek
 * bir `FeedItem` görür.
 */

import Parser from "rss-parser";

/** Kaynaklara kim olduğumuzu söylüyoruz; kimliksiz istekler daha çok engelleniyor. */
const USER_AGENT = "Mozilla/5.0 (compatible; FinansProgrami/0.1; +http://localhost:3000)";
const TIMEOUT_MS = 20_000;

/**
 * Yayıncının feed'e KOYDUĞU tam metin ile teaser'ı ayıran eşik.
 *
 * `content:encoded` alanı hem tam makale hem 200 karakterlik özet taşıyabiliyor.
 * Bu eşiğin altındaki her şey özet sayılır — kısa bir teaser'ı "makale gövdesi"
 * diye saklamak, okuma süresi ve makale sayfası dahil her şeyi yanlış gösterir.
 */
const FULL_CONTENT_MIN_CHARS = 1200;

interface CustomItem {
  "content:encoded"?: string;
  "media:content"?: { $?: { url?: string; medium?: string } };
  "media:thumbnail"?: { $?: { url?: string } };
  "dc:creator"?: string;
}

export interface FeedItem {
  /** Tekilleştirme anahtarı. Feed guid vermezse URL'e düşer. */
  guid: string;
  title: string;
  url: string;
  author: string | null;
  /** Düz metin özet. Her zaman dolu olmayabilir. */
  summary: string | null;
  /** Yalnız yayıncı feed'de tam metni kendisi verdiyse dolu. */
  contentHtml: string | null;
  imageUrl: string | null;
  publishedAt: Date;
}

const parser = new Parser<Record<string, unknown>, CustomItem>({
  timeout: TIMEOUT_MS,
  headers: { "User-Agent": USER_AGENT, Accept: "application/rss+xml, application/xml, text/xml" },
  customFields: {
    item: ["content:encoded", "media:content", "media:thumbnail", "dc:creator"],
  },
});

/** HTML'i düz metne indirir — özet alanı için. Sanitize DEĞİLDİR. */
export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(item: CustomItem & Parser.Item): string | null {
  const media = item["media:content"]?.$;
  if (media?.url && (media.medium === undefined || media.medium === "image")) return media.url;

  const thumb = item["media:thumbnail"]?.$?.url;
  if (thumb) return thumb;

  if (item.enclosure?.url && item.enclosure.type?.startsWith("image/")) return item.enclosure.url;

  // Son çare: gövdedeki ilk <img>.
  const body = item["content:encoded"] ?? item.content ?? "";
  const match = body.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function parseDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Tek bir feed'i çeker. Ağ hatası, zaman aşımı ve bozuk XML **fırlatılır** —
 * çağıran taraf bunu `ingestion_runs` satırına yazacak. Sessizce boş dizi
 * döndürmek, ayakta olmayan bir kaynağı "haber yok" gibi gösterirdi.
 */
export async function fetchFeed(feedUrl: string): Promise<FeedItem[]> {
  const feed = await parser.parseURL(feedUrl);
  const items: FeedItem[] = [];

  for (const item of feed.items) {
    const url = item.link?.trim();
    const title = item.title?.trim();
    // Başlıksız veya linksiz kayıt kullanılamaz; sessizce atlanır.
    if (!url || !title) continue;

    const publishedAt = parseDate(item.isoDate) ?? parseDate(item.pubDate);
    if (!publishedAt) continue;

    const encoded = item["content:encoded"] ?? null;
    const encodedText = encoded ? htmlToText(encoded) : "";
    const isFullBody = encodedText.length >= FULL_CONTENT_MIN_CHARS;

    // Özet sırası: açık özet alanı → tam metin değilse encoded → content.
    const summaryHtml =
      item.contentSnippet ?? (isFullBody ? null : (encoded ?? item.content ?? null));
    const summary = summaryHtml ? htmlToText(summaryHtml) : null;

    items.push({
      guid: item.guid?.trim() || url,
      title,
      url,
      author: item.creator?.trim() || item["dc:creator"]?.trim() || null,
      summary: summary && summary.length > 0 ? summary : null,
      contentHtml: isFullBody ? encoded : null,
      imageUrl: firstImage(item),
      publishedAt,
    });
  }

  return items;
}
