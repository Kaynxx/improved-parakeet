import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/**
 * Markdown → güvenli HTML.
 *
 * İçerik repodan geliyor, yani teorik olarak güvenilir — ama sanitize yine de
 * var: ders dosyaları ileride başka kanallardan gelebilir ve o gün bu katmanı
 * eklemeyi hatırlamak zorunda kalmak istemiyoruz. Maliyeti önemsiz.
 */
const IZINLI_ETIKETLER = [
  "p",
  "br",
  "hr",
  "h2",
  "h3",
  "h4",
  "strong",
  "em",
  "del",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { async: false, gfm: true, breaks: false });

  return sanitizeHtml(raw, {
    allowedTags: IZINLI_ETIKETLER,
    allowedAttributes: {
      a: ["href", "title"],
      td: ["align"],
      th: ["align"],
    },
    // Yalnız güvenli protokoller; `javascript:` bağlantısı düşer.
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      // Ders metnindeki dış bağlantılar yeni sekmede ve referrer sızdırmadan.
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });
}
