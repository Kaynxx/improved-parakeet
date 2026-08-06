/**
 * `FeedItem` → `articles` satırı.
 *
 * Slug üretimi, HTML temizliği ve okuma süresi burada. Ağ yok, veritabanı yok —
 * saf dönüşüm, o yüzden tek başına akıl yürütülebilir ve test edilebilir.
 */

import { createHash } from "node:crypto";
import sanitizeHtml from "sanitize-html";
import type { FeedItem } from "@/server/integrations/rss/feed";
import { htmlToText } from "@/server/integrations/rss/feed";

/** Ortalama okuma hızı. Sektör standardı 200–250; alt sınır seçildi. */
const WORDS_PER_MINUTE = 200;

const TURKISH_MAP: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  İ: "i",
};

/**
 * Dış kaynaktan gelen HTML asla ham saklanmaz. İzin listesi bilinçli olarak
 * dar: metin, başlık, liste, alıntı, bağlantı ve görsel. Script, iframe, form,
 * style ve tüm event handler'lar düşer.
 */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "blockquote",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "a",
    "figure",
    "figcaption",
    "img",
    "code",
    "pre",
  ],
  allowedAttributes: {
    a: ["href", "title"],
    img: ["src", "alt", "title"],
  },
  // Yalnız güvenli şemalar; `javascript:` bağlantıları düşer.
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    // Dış bağlantılar yeni sekmede ve referrer sızdırmadan açılır.
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
};

export function slugify(value: string): string {
  const ascii = value.replace(/[çğıöşüİ]/g, (char) => TURKISH_MAP[char] ?? char);
  return ascii
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

/**
 * Slug **benzersiz olmak zorunda** (kolonun unique kısıtı var) ama iki kaynak
 * aynı başlığı atabilir. Sonuna guid'den türetilen kısa bir sağlama ekleniyor:
 * aynı makale her zaman aynı slug'ı üretir, farklı makaleler çakışmaz.
 */
export function articleSlug(title: string, guid: string): string {
  const base = slugify(title) || "haber";
  const hash = createHash("sha1").update(guid).digest("hex").slice(0, 7);
  return `${base}-${hash}`;
}

export function readingTimeMin(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export interface ArticleRow {
  sourceId: string;
  externalGuid: string;
  title: string;
  slug: string;
  url: string;
  author: string | null;
  summary: string | null;
  contentHtml: string | null;
  contentText: string | null;
  imageUrl: string | null;
  publishedAt: Date;
  readingTimeMin: number;
  isBreaking: boolean;
}

export function toArticleRow(item: FeedItem, sourceId: string): ArticleRow {
  const contentHtml = item.contentHtml ? sanitizeHtml(item.contentHtml, SANITIZE_OPTIONS) : null;
  const contentText = contentHtml ? htmlToText(contentHtml) : null;

  return {
    sourceId,
    externalGuid: item.guid,
    title: item.title,
    slug: articleSlug(item.title, item.guid),
    url: item.url,
    author: item.author,
    summary: item.summary,
    contentHtml,
    contentText,
    imageUrl: item.imageUrl,
    publishedAt: item.publishedAt,
    // Gövde yoksa okuma süresi uydurulmaz; UI de o durumda rozeti göstermez.
    readingTimeMin: contentText ? readingTimeMin(contentText) : 1,
    /**
     * Hiçbir kaynak feed'inde "son dakika" işareti yok. Zamana bakıp
     * uydurmak, sinyal gibi görünen bir yalan olurdu — kolon bir kaynak
     * gerçekten işaret verene kadar false kalır.
     */
    isBreaking: false,
  };
}
