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

## Agent Memory

Yeni oturumda kalıcı kural ve komutlar için bu dosyayı okuduktan sonra
`memory-bank/INDEX.md` ile `memory-bank/now.md` okunur. Göreve göre yalnız
ilgili kanonik belgesi açılır; geçmiş kayıtlar istek üzerine okunur. Kalıcı
kararların tek otoritesi `memory-bank/decisionLog.md`dir.


## Karar sözleşmesi

Bu bölüm kişisel Cognitive OS vault'undaki karar rejiminden alınıp bu depoya
uyarlandı (`cognitive-os-blueprint`: ADR-000 kaynak önceliği, ADR-001 karar
kaydı v2, `docs/governance/autonomy-policy.md`, `approval-policy.md`,
`schemas/decision.schema.json`). Oradaki amaç burada da geçerli: **kararın kim
tarafından, neye dayanarak verildiği ve ne zaman yeniden açılacağı kayıtta
durur.**

### Kaynak önceliği

1. Git geçmişi ve çalışma ağacındaki doğrulanabilir durum
2. Bu dosya — kalıcı proje kuralları
3. `memory-bank/decisionLog.md` — kabul edilmiş kararlar (yeni tarih eskiyi ezer)
4. `docs/superpowers/specs/` tasarım dokümanları
5. `SUREC-GUNLUGU.md` ve `memory-bank/` bağlam dosyaları
6. Eski plan/durum özetleri ve örnekler

İki ifade birlikte yaşayabiliyorsa ikisi de korunur; yaşayamıyorsa üstteki
kazanır. Belirsizlik yetkiye, veri silmeye veya dış etkiye dokunuyorsa **dar ve
güvenli yorum** seçilir ve bir karar kaydı açılır.

### Her karar şu şekilde değerlendirilir

Kalıcı bir karar — şema, katman sınırı, bağımlılık, içerik sözleşmesi, dış
servis, rota/slug adı — `memory-bank/decisionLog.md`'ye şu alanlarla
yazılmadan **uygulanmış sayılmaz**:

| Alan | Zorunlu | Ne yazar |
|---|---|---|
| Soru | evet | Karara konu olan tek cümlelik soru |
| Seçenekler | evet, en az 2 | Gerçekten değerlendirilmiş yollar |
| Karar | evet | Seçilen yol; sahibi kullanıcıdır |
| Gerekçe | evet | Neden bu; diğerleri neden değil |
| Varsayımlar | evet | Yanlış çıkarsa kararı düşüren şeyler |
| Kabul edilen riskler | evet | Bilerek üstlenilen maliyet |
| Kanıt | evet, en az 1 | Dosya/satır, ölçüm, commit veya dış kaynak |
| Güven | evet | `0.0`–`1.0` |
| Durum | evet | `open` / `awaiting_user` / `accepted` / `under_review` / `superseded` |
| Gözden geçirme tetiği | evet | Hangi olay bu kararı yeniden açar |
| Tarih | evet | Kararın alındığı gün |

Kayıt **silinmez**. Yanlış çıkan karar `superseded` olur ve yerine geçen kaydı
işaret eder; sil-yaz, kararın neden verildiğini yok eder. Bu, akademi
sorularındaki kuralın aynısıdır: soru silinmez, güncellenir.

### Öneri karar değildir

Ajanın ürettiği seçenek veya tavsiye `awaiting_user` durumunda bekler. Hiçbir
tavsiye kullanıcı onayı olmadan `accepted` işaretlenemez. Kullanıcının açık
düzeltmesi ajan çıkarımından üstündür. Belirsizlik adlandırılır: "yeterli kanıt
yok" geçerli bir sonuçtur, uydurulmuş gerekçe değildir.

### Otonomi sınıfları

| Sınıf | Ne | Varsayılan |
|---|---|---|
| **O0 Okuma** | Repo, veritabanı ve log okuma | Serbest |
| **O1 Analiz** | Araştırma, karşılaştırma, plan taslağı | Serbest |
| **O2 Yerel, geri alınabilir** | Kod düzenleme, `npm run format`, yeni dosya, ders içeriği yazma | Serbest — geri alma yolu Git'te durduğu sürece |
| **O3 Sonuçlu** | Şema göçü, `npm run seed`, bağımlılık ekleme, dış API çağrısı, rota/slug yeniden adlandırma | Kullanıcı onayı |
| **O4 Geri alınamaz** | Veri silen göç, `lesson_answers`'a dokunma, `.env.local`/gizli anahtar değişikliği, force push, ücretli API | Açık, tek seferlik kullanıcı kararı |

Alt sınıf üst sınıfın iznini genişletemez. Geri alınabilirlik bir iddia değil,
gösterilen bir özelliktir: geri alma adımı yazılamıyorsa iş bir üst sınıfa çıkar.

### Onay paketi

O3/O4 için onay istenirken tek seferde şunlar görünür: ne yapılacağı, hangi
dosya/tablo, önizleme veya diff, gerekçe ve hangi işten doğduğu, risk ve geri
alınabilirlik, reddedilirse ne olacağı. Onay o pakete bağlıdır — kapsam
değişirse yeni onay gerekir. Toplu onay, her kalem ayrı ayrı incelenebiliyorsa
verilebilir.

### Kapsam dışı iş

Faz dışı fikir sessizce uygulanmaz; `memory-bank/decisionLog.md`'ye `open`
durumunda bir öneri kaydı olarak yazılır ve orada bekler.

### Kontrol çalıştırılmadan "geçti" denmez

Bir doğrulama komutunun geçtiği, **bu oturumda** çalıştırılıp çıktısı okunmadan
iddia edilmez. Kurulu olmayan veya çalıştırılmamış komut "başarılı" sayılmaz;
hangi adımın atlandığı açıkça raporlanır.

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
