import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { type ParsedLesson, parseLesson } from "@/lib/content/lesson";

/**
 * Ders dosyalarını diskten okur. **Yalnız seed çalıştırırken** kullanılır —
 * istek anında dosya okunmuyor, içerik seed ile veritabanına iniyor.
 *
 * Dizin düzeni tek doğruluk kaynağı:
 *
 *     content/akademi/hafta-03/01-fisher-denklemi-ve-reel-faiz.md
 *                     └ hafta   └ sıra ve ders slug'ı
 *
 * Sıranın dosya adında durması bilinçli: frontmatter'a `sira: 3` yazmak aynı
 * numarayı iki dosyada kullanmayı kolaylaştırırdı ve dizin listesi artık
 * okuma sırasını göstermezdi.
 */

export interface LoadedLesson extends ParsedLesson {
  /** Dosya adındaki `NN-` önekinden gelir. */
  orderIndex: number;
}

/** `03-getiri-egrisi.md` → sıra 3, slug `getiri-egrisi`. */
const DOSYA_ADI = /^(\d{2})-([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.md$/;

export const AKADEMI_KOKU = join(process.cwd(), "content", "akademi");

/**
 * Bir haftanın derslerini sırayla okur.
 *
 * Hafta dizini yoksa **boş liste döner, hata fırlatmaz**: müfredat sekiz hafta
 * ama içerik hafta hafta yazılıyor, henüz yazılmamış hafta seed'i durdurmamalı.
 * Buna karşılık dizin varken içindeki bozuk bir dosya hata fırlatır — orada
 * niyet bellidir ve sessizce atlamak dersi görünmez biçimde kaybederdi.
 */
export function loadWeekLessons(weekSlug: string, root: string = AKADEMI_KOKU): LoadedLesson[] {
  const dizin = join(root, weekSlug);
  if (!existsSync(dizin)) return [];

  const dersler: LoadedLesson[] = [];
  const sirayaGore = new Map<number, string>();

  for (const dosya of readdirSync(dizin).sort()) {
    if (!dosya.endsWith(".md")) continue;

    const eslesme = DOSYA_ADI.exec(dosya);
    if (!eslesme) {
      throw new Error(
        `content/akademi/${weekSlug}/${dosya}: dosya adı \`NN-slug.md\` biçiminde olmalı ` +
          `(örn. 03-getiri-egrisi.md). Slug küçük harf, rakam ve tire içerebilir.`,
      );
    }

    const [, siraMetni = "", slug = ""] = eslesme;
    const orderIndex = Number(siraMetni);

    const cakisan = sirayaGore.get(orderIndex);
    if (cakisan) {
      throw new Error(
        `content/akademi/${weekSlug}: ${siraMetni} sırası iki derste birden — ` +
          `\`${cakisan}\` ve \`${slug}\`. Sıra numaraları benzersiz olmalı.`,
      );
    }
    sirayaGore.set(orderIndex, slug);

    const { data, content } = matter(readFileSync(join(dizin, dosya), "utf8"));
    dersler.push({ ...parseLesson(slug, data, content), orderIndex });
  }

  return dersler.sort((a, b) => a.orderIndex - b.orderIndex);
}
