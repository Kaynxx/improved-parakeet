# Tech Context

> Kullanılan teknolojiler, geliştirme kurulumu, teknik kısıtlar, bağımlılıklar
> ve araç kullanım kalıpları. Seçimlerin **gerekçesi** `decisionLog.md`'de.

## Çalışma ortamı

| | |
|---|---|
| OS | Windows 11 Pro (26200) |
| Node | v24.18.0 |
| Paket yöneticisi | **npm 11.16.0** — pnpm/bun kurulu değil |
| Git | 2.55 — **ama proje henüz bir git deposu değil** (`git init` yapılmadı) |
| Docker | ❌ kurulu değil · WSL2 ❌ kurulu değil · **kullanılmıyor** |
| Postgres | ✅ **16.10 taşınabilir** — `.postgres/` altında, servis kurulu değil |

## Stack

**Kurulu ve kullanımda (Faz 1 + 2A + 2B):**
`next@15` · `react@19` · `typescript@5` (strict) · `tailwindcss@4` ·
`lucide-react` · `motion` · `clsx` + `tailwind-merge` ·
`class-variance-authority` · `geist` (font) · `@biomejs/biome` ·
`drizzle-orm` + `drizzle-kit` + `postgres` · `dotenv` · `tsx` ·
`rss-parser` + `sanitize-html` + `node-cron`

**Planlanan (kalan Faz 2 dilimlerinde eklenecek):**
`next-auth@5` + `@auth/drizzle-adapter` (2E) ·
`@tanstack/react-query` (2C, canlı yenileme gerektiğinde) ·
`vitest` + Testing Library

`@mozilla/readability` ve `jsdom` **planlanmıştı ama kurulmadı** — 2B'de makale
gövdesi çıkarma kararı reddedildi (bkz. decisionLog).

## Kritik kısıtlar

### 1. TypeScript 5.x'te sabit tutulmalı — yükseltmeyin

Makinede TS **7.0.2** kuruluydu. Next 15 tsconfig'i kendi TS API'siyle okuduğu
için TS 7 ile:
- `next.config.ts` yüklenemiyor → `Cannot read properties of undefined (reading 'fileExists')`
- `paths` alias'ları (`@/*`) webpack'e hiç ulaşmıyor → tüm import'lar "Module not found"

Sinsi tarafı: hata mesajları TypeScript'i işaret etmiyor. `typescript@^5`
`devDependencies`'te sabitlendi. TS 7'ye geçiş ancak Next 16 ile birlikte
değerlendirilmeli.

### 2. Postgres taşınabilir — `.postgres/` git'e girmez, elde kurulur

Docker kullanılmıyor. Postgres 16.10, EnterpriseDB'nin kurulumsuz arşivinden
`.postgres/pgsql` altına açıldı; cluster `.postgres/data`, log
`.postgres/postgres.log`. Klasör `.gitignore`'da (120 MB), yani **başka bir
makinede veya klasör silindiğinde elle kurulmalı:**

1. `postgresql-16.10-1-windows-x64-binaries.zip` → https://get.enterprisedb.com/postgresql/
2. Arşivden yalnız `pgsql/bin`, `pgsql/lib`, `pgsql/share` → `.postgres/`
   (pgAdmin + doc dahil edilirse 412 MB olur, gereksiz)
3. `.postgres/pgsql/bin/initdb -D .postgres/data -U finans --auth-local=trust
   --auth-host=scram-sha-256 --encoding=UTF8 --locale=C` (parola: `finans`)
4. `npm run db:up` → `createdb -h 127.0.0.1 -U finans finans`

Aynı adımlar `scripts/pg.ts` içindeki hata mesajında da yazılı — kurulum eksikse
script bunu ekrana basar.

### 2b. `dotenv/config` `.env.local`'i okumaz

Next.js `.env.local`'i kendi yükler; `tsx` ve `drizzle-kit` yüklemez ve düz
`import "dotenv/config"` yalnız `.env`'e bakar. Node script'leri
`scripts/load-env.ts` üzerinden yükleniyor (`.env.local` → `.env` sırasıyla).
`drizzle.config.ts` hâlâ bir fallback URL taşıyor ama artık DATABASE_URL yoksa
uyarı basıyor — sessizce yanlış veritabanına migration uygulanmasın diye.

### 3. npm audit: 3 high-severity uyarı, bilerek bırakıldı

`next@15`'in bağımlılıkları `postcss` ve `sharp` üzerinden uyarı veriyor.
`npm audit fix --force` **Next 16'ya çıkarır** — Next 15 kararına aykırı.
İkisi de build-time bağımlılığı; localhost geliştirmede saldırı yüzeyi yok.
Next 16 değerlendirmesiyle birlikte yeniden bakılacak.

### 4. Biome, Tailwind ve SVG ayarları

- `css.parser.tailwindDirectives: true` — yoksa `@theme` bloğunu parse edemiyor.
- `!**/*.svg` hariç tutuldu — `src/app/icon.svg`'yi JSX sanıp `noSvgWithoutTitle`
  hatası veriyordu.
- `prefers-reduced-motion` bloğundaki `!important`'lar satır bazında
  bastırıldı (`biome-ignore-start`); Biome'un "kaldır" düzeltmesi erişilebilirlik
  garantisini bozardı.

## Komutlar

```bash
npm run dev         # localhost:3000
npm run build       # üretim derlemesi + tip kontrolü
npm run typecheck   # tsc --noEmit
npm run lint        # biome check src scripts drizzle.config.ts
npm run format      # biome format --write ...
```

**Veritabanı (2A ile geldi):**
```bash
npm run db:up        # taşınabilir Postgres'i başlat (127.0.0.1:5432)
npm run db:down      # temiz kapat (-m fast)
npm run db:status    # çalışıyor mu?
npm run db:generate  # migration SQL üretir (DB'ye bağlanmaz)
npm run db:migrate   # migration'ları uygular (DB gerekir)
npm run db:studio    # Drizzle Studio
npm run seed         # referans verisi, idempotent
```

**Haber çekimi (2B ile geldi):**
```bash
npm run ingest       # tek seferlik çekim — 7 kaynak, ~15 sn
npm run worker       # zamanlanmış çekim, varsayılan */15 * * * *
                     # INGEST_CRON ile değiştirilir, Ctrl+C ile durur
```

Çekim tekilleştirilmiş: aynı komutu istediğin kadar çalıştırabilirsin, yalnız
yeni makaleler yazılır.

`db:up` bilgisayar her açıldığında gerekli — Windows servisi kurulmadı, yani
Postgres kendiliğinden başlamaz.

## Doğrulama alışkanlığı

Faz 1'de kullanılan ve sürdürülecek olan kontrol listesi:

1. `npx tsc --noEmit` → 0 hata
2. `npx biome check src` → 0 uyarı
3. `npm run build` → başarılı
4. 1440 / 768 / 375px'te yatay kaydırma yok, konsol hatası yok
5. Tab ile gezilen her öğede nötr beyaz odak halkası (anında, gecikmesiz)
6. Ticker hover'da duruyor; her grafik öğesinde `aria-label` var
7. Faz sınırının kanıtı: kodda beklenmeyen `fetch(` / harici URL yok

Ekran görüntüsü ve erişilebilirlik denetimi Playwright ile yapıldı. Makinede
`ms-playwright` önbelleğinde **chromium-1228** var ama `playwright` npm paketi
1234 bekliyor; `executablePath` ile önbellekteki binary'ye elle işaret edilerek
indirme yapılmadan kullanıldı.

## Ortam değişkenleri

`.env.example` şablon olarak duruyor. 2A itibarıyla fiilen okunan tek değişken
`DATABASE_URL`; `.env.local` içinde ve `.gitignore`'da. Kalan anahtarlar
(Auth.js, Reddit, YouTube) ilgili dilimlerinde devreye girecek.

İlgili: `systemPatterns.md`, `decisionLog.md`, `projectbrief.md`
