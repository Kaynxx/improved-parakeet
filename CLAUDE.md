# Finans Program

Kişisel finans paneli: haber akışı, piyasa göstergeleri ve 8 haftalık ileri
seviye bir parasal iktisat akademisi. **Tek kullanıcılık** — açık kayıt yok,
hesap terminalden açılır.

Kod, yorumlar, değişken adları ve arayüz metni **Türkçe**. İngilizce yalnız
kütüphane API'lerinde ve veritabanı kolon adlarında.

## Komutlar

```bash
npm run dev          # Next dev sunucusu
npm run typecheck    # tsc --noEmit          ← "bitti" demeden önce ZORUNLU
npm run lint         # biome check           ← "bitti" demeden önce ZORUNLU
npm run format       # biome format --write  (lint hatalarının çoğunu bu çözer)
npm run build        # next build

npm run db:up        # taşınabilir Postgres 16.10'u .postgres/ altından başlatır
npm run db:status    # çalışıyor mu
npm run db:generate  # drizzle-kit generate (şema değişince)
npm run db:migrate   # drizzle-kit migrate
npm run seed         # referans verisi + content/akademi/ derslerini yazar (idempotent)

npm run ingest       # RSS'ten haber çeker (tek sefer)
npm run worker       # node-cron, 15 dakikada bir çeker
npm run user:create  # hesap açar / şifre günceller
```

`npm run dev` çalışmadan önce `npm run db:up` gerekir.

## Stack

Next 15 (App Router, React 19) · TypeScript · Tailwind 4 · Drizzle ORM +
Postgres (`postgres` sürücüsü) · next-auth v5 (Credentials + argon2id) ·
Biome (lint + format) · `@anthropic-ai/sdk` (ders cevabı değerlendirme).

## Katmanlar — sınırlar delinmez

```
src/app/          Sayfalar. Veriye YALNIZ src/server/services/ üzerinden erişir.
src/server/services/   Sayfaların çağırdığı tek kapı.
src/server/integrations/  Dış dünya (RSS çekimi vb.)
src/server/ai/    Anthropic çağrıları (degerlendir.ts)
src/lib/db/queries/    Drizzle sorguları. Sayfalar buraya DOĞRUDAN gitmez.
src/lib/content/  Markdown ders dosyalarının okunması ve doğrulanması
src/components/   Sunum. Veri çekmez.
src/types/        Katmanlar arası veri sözleşmesi.
```

Faz 1'de sayfalar doğrudan `@/mocks`'tan import ediyordu; bu kapatıldı.
`src/mocks/` hâlâ var ama küçülüyor — yeni kod oraya bağlanmaz.

## Akademi içerik sözleşmesi

Ders gövdeleri **repoda**, veritabanında değil. Tek doğruluk kaynağı:

```
content/akademi/hafta-03/01-fisher-denklemi-ve-reel-faiz.md
                └ hafta   └ NN- sıra öneki + slug
```

- Dosya adı `NN-slug.md` biçiminde olmak zorunda; sıra **dosya adında** durur,
  frontmatter'da değil (aynı numarayı iki dosyaya vermeyi zorlaştırır).
- Frontmatter alanları Türkçe: `baslik`, `ozet`, `sure`, `onkosul`,
  `kaynaklar[]` (`tip`/`baslik`/`url`/`kaynak`/`sure`/`seviye`/`ozet`),
  `sorular[]` (`id`/`tip`/`puan`/`soru`/`olcut`/`beklenen`/`tolerans`).
- `onkosul` biçimi: `hafta-02/ders-slug`.
- Soru tipleri: `acik` (AI ölçüte göre puanlar — `olcut` ZORUNLU), `sayisal`
  (`beklenen` + `tolerans`), `tahmin`.
- Video kaynağının URL'si çözülebilir bir YouTube adresi olmalı; seed sırasında
  `youtubeId` çıkarılır. Çözülemezse seed **hata fırlatır**.
- Yazım hataları sessizce yutulmaz: bozuk dosya seed'i durdurur.

`npm run seed` haftaları koddan (`WEEK_SEED`), dersleri diskten okur.
**Sorular asla silinmez, yalnız güncellenir** — `lesson_answers` onlara cascade
ile bağlı, sil-yaz kullanıcının cevaplarını yok ederdi.

Müfredat iskeleti: `docs/superpowers/specs/2026-08-08-mufredat-8-hafta.md`
Kaynak araştırmaları: `docs/superpowers/research/akademi-kaynaklar-hafta-*.md`
Dosya adları (kesin): `docs/superpowers/specs/2026-08-10-ders-slug-listesi.md`

Slug'lar sabit tutulur. `onkosul` haftalar arası kenar kurar ve seed
çözülemeyen bir ön koşulda hata fırlatır; bir dersi yeniden adlandırmak ona
işaret eden bütün dosyaları da değiştirmeyi gerektirir.

## Nerede kaldık

Akademiyi 8 haftalık programa çevirme işi üç alt projeye ayrıldı:

| | Alt proje | Durum |
|---|---|---|
| **A** | Kimlik ve ilerleme temeli | **bitti**, commit'li |
| **B** | Akademi yapısı (şema, render, sorular, AI değerlendirme) | **çalışma ağacında, commit'siz** |
| **C** | Müfredat — 40 ders | **çalışma ağacında, commit'siz** — 8 haftanın kaynak araştırması ve 40 ders gövdesi yazıldı, seed geçiyor |

B'de `tracks`/`steps` → `weeks`/`lessons` olarak yeniden adlandırıldı;
`lesson_sources`, `lesson_prompts`, `lesson_answers`, `answer_feedback`
tabloları eklendi. `content/akademi/` sekiz haftanın 40 dersiyle **dolu**;
`npm run seed` 40 ders, 120 kaynak, 120 soru ve 70 ön koşul kenarı yazıyor.

Önceki fazlar: `docs/superpowers/specs/` altındaki tasarım dokümanları.

## Ortam tuzakları — bunlar tekrar tekrar ısırdı

- **`typescript` 5.x'te sabit tutulmalı.** Makinede TS 7 kuruluyken Next 15
  tsconfig'i kendi TS API'siyle okuyamıyor; `paths` alias'ları ve
  `next.config.ts` görünmez oluyor ("Cannot read properties of undefined
  (reading 'fileExists')").
- **`import "dotenv/config"` `.env.local`'i OKUMAZ**, yalnız `.env`. Node
  script'leri bu yüzden `scripts/load-env.ts` üzerinden yüklenir.
- **Rota yeniden adlandırınca `.next/types/` bayat kalır** ve `tsc` var olmayan
  modül hatası verir. `.next/types/app/.../<eski-rota>` dizinini silmek yeter.
- `next@15` postcss/sharp üzerinden 3 high-severity audit uyarısı veriyor.
  `npm audit fix --force` Next 16'ya çıkarır — **uygulanmadı**, bilinçli.
- Postgres taşınabilir, `.postgres/` altında; Docker kararı geri alındı.
- `DATABASE_URL` ve auth sırları `.env.local`'de.

## Yazım tarzı

- Yorumlar **neden**i anlatır, neyi değil. "Şu alternatif neden seçilmedi"
  cümlesi bu depoda değerlidir; kodu tekrar eden yorum değildir.
- Hata mesajları hangi dosyanın hangi alanının bozuk olduğunu yazar.
- Sessiz `catch`, sessiz `continue` ve "eksik alanı atla, devam et" davranışı
  bilinçli olarak reddedildi — içeriği görünmez biçimde kaybediyordu.
- Değişiklikten sonra `npm run format`, sonra `npm run typecheck` ve
  `npm run lint`. Üçü de temiz değilse iş bitmemiştir.
