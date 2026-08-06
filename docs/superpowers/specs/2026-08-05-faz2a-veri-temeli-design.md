# Faz 2A — Veri Temeli (Tasarım)

Tarih: 2026-08-05 · Durum: **tamamlandı ve doğrulandı**

## Amaç

Panel birebir aynı görünmeye devam ederken haber ve akademi verisi mock yerine
Postgres'ten gelsin. Faz 2'nin geri kalan beş dilimi (2B–2F) bu temele oturur.

**Başarı ölçütü:** `npm run dev` ile açılan panelde haber akışı ve akademi
yol haritası veritabanından okunur; topluluk, video ve piyasa panelleri
değişmeden çalışmaya devam eder; hiçbir bileşen dosyası değişmemiştir.

## Kapsam

**Dahil:**
- Taşınabilir Postgres 16 (başta Docker Compose planlanmıştı — bkz. Ön koşul)
- Drizzle şeması: `sources`, `articles`, `tickers`, `article_tickers`,
  `tracks`, `steps`, `step_prerequisites`
- `drizzle-kit` migration akışı
- `src/lib/db/` — bağlantı, şema, sorgular
- `src/server/services/` — beş servis, ikisi DB'den, üçü mock'tan
- Sayfaların `@/mocks` bağımlılığından koparılması
- `scripts/seed.ts` — idempotent referans verisi

**Hariç:** RSS çekimi (2B) · Reddit (2C) · YouTube (2D) · auth (2E) ·
piyasa verisi (2F) · worker/cron · API route'ları · TanStack Query

## Ön koşul (çözüldü)

> Bu bölüm başta "Docker Desktop kurulu değil, kullanıcı kuracak" diyordu.
> Kullanıcı Docker'ı reddetti; karar taşınabilir Postgres lehine değiştirildi
> ve `docker-compose.yml` silindi.

Postgres 16.10, kurulumsuz `windows-x64-binaries` arşivinden `.postgres/`
altına açıldı. Yönetici hakkı, WSL2, Windows servisi ve yeniden başlatma yok.

```
npm run db:up      # 127.0.0.1:5432
npm run db:down
npm run db:status
```

`.env.local` → `DATABASE_URL="postgresql://finans:finans@127.0.0.1:5432/finans"`

Klasör `.gitignore`'da; başka makinede kurulum adımları `techContext.md`'de ve
`scripts/pg.ts`'in hata mesajında yazılı.

## Mimari

```
page.tsx (Server Component)
    ▼
src/server/services/*.ts        ← UI'ın konuştuğu tek katman
    ▼
src/lib/db/queries/*.ts  →  Drizzle  →  Postgres
```

Sayfa veriyi çeker, prop olarak bileşenlere geçirir. Bileşenler servis import
etmez. `@/mocks` yalnız mock servislerinin içinde kalır.

**Yeni dosyalar**

```
drizzle.config.ts
drizzle/                       # üretilen migration SQL'leri
scripts/seed.ts
src/lib/db/index.ts            # postgres.js + drizzle, globalThis guard
src/lib/db/schema.ts
src/lib/db/queries/news.ts
src/lib/db/queries/academy.ts
src/server/services/news.ts       → DB
src/server/services/academy.ts    → DB
src/server/services/sentiment.ts  → mock (2C)
src/server/services/video.ts      → mock (2D)
src/server/services/market.ts     → mock (2F)
```

**Değişen dosyalar:** `src/app/(dashboard)/**/page.tsx` (5 sayfa) — import
kaynağı `@/mocks`'tan `@/server/services`'e döner. Sayfalar `async` olur.

### Neden repository arayüzü yok

Mock'a geri dönme senaryosu yok. Ortam değişkeniyle implementasyon seçmek her
veri tipi için üç dosya ve gerçekte hiç kullanılmayacak bir dallanma demekti.
Her servis nereden okuduğunu kendi gövdesinde bilir; "hangi servis hâlâ mock'ta"
sorusu tek klasörde cevaplanır.

### Bağlantı yönetimi

`postgres.js` tek instance, `globalThis` guard'ıyla — Next dev HMR her
kaydetmede yeni havuz açmasın diye. Havuz boyutu ve zaman aşımı tek yerde.

## Veri modeli (2A tabloları)

| Tablo | Alanlar (özet) |
|---|---|
| `sources` | id, name, slug ᵁ, feed_url, site_url, favicon_url, category, is_active, last_fetched_at |
| `articles` | id, source_id →sources, external_guid ᵁ, title, slug ᵁ, url, author, summary, content_html, content_text, image_url, published_at, reading_time_min, is_breaking, search_tsv |
| `tickers` | id, symbol ᵁ, name, asset_type |
| `article_tickers` | article_id + ticker_id ᴾᴷ |
| `tracks` | id, slug ᵁ, title, description, level, order_index |
| `steps` | id, track_id →tracks, slug, title, summary, content_md, estimated_min, order_index · (track_id, slug) ᵁ |
| `step_prerequisites` | step_id + prerequisite_step_id ᴾᴷ |

**2A'da kurulmayanlar:** `communities`, `posts`, `post_sentiment`,
`post_tickers`, `ticker_sentiment_daily` (2C) · `videos`, `step_videos` (2D) ·
`users`, `accounts`, `sessions`, `verification_tokens`, `user_preferences`,
`user_progress`, `track_enrollments`, `saved_articles` (2E) ·
`ingestion_runs` (2B) · piyasa tabloları (2F).

Dilim dilim şema kararının bilinen maliyeti: `post_tickers` gibi köprü tablolar
2C'de eklenecek ve `tickers`'a geriye dönük FK verecek. Kabul edildi.

### Akademi ilerlemesi

`user_progress` 2E'de geleceği için 2A'da `academy.ts` her adımın durumunu
`not_started` döndürür; yol haritası halkası **%0** gösterir. `RoadmapStep.status`
tipi değişmez — yalnız değeri sabittir. 2E'de gerçek ilerlemeyle dolar.

## Seed verisi

`scripts/seed.ts`, `ON CONFLICT DO NOTHING` ile idempotent. Yazdıkları:

- **`sources`** — yalnız ücretsiz ve kararlı RSS veren kaynaklar: CNBC,
  MarketWatch, Yahoo Finance, CoinDesk, Cointelegraph, Investing.com,
  Seeking Alpha, The Verge. (Bloomberg/FT/Reuters bilinçli olarak yok.)
- **`tickers`** — Faz 1 mock'undaki sekiz sembol.
- **`tracks` / `steps` / `step_prerequisites`** — Faz 1'de yazılmış Türkçe
  akademi içeriği: 3 parça, 15 adım, ön koşul DAG'ı.

`articles` seed edilmez — 2B doldurur. 2A sonrası haber paneli boş görünür;
bu beklenen ve doğru davranıştır.

> **Not:** Bu, "panel her zaman dolu görünür" hedefinden haber paneli için
> sapmadır. Alternatif — mock makaleleri seed etmek — sahte satırları gerçek
> gibi gösterirdi ve 2B geldiğinde hangi satırın seed olduğu karışırdı.
> Haber paneli 2B'ye kadar `EmptyState` gösterir.

## Hata yönetimi

- **Bağlantı yok / DB kapalı:** servisler hatayı yutmaz, yukarı fırlatır.
  Next'in `error.tsx` sınırı devreye girer. Sessiz boş liste döndürmek, ayakta
  olmayan bir veritabanını "veri yok" gibi gösterirdi.
- **Boş sonuç:** normal durum. `NewsList` ve `SentimentFeed` zaten `EmptyState`
  gösteriyor.
- **Migration çakışması:** `drizzle-kit` üretilen SQL'i `drizzle/` altında
  versiyonlar; elle SQL yazılmaz.
- **Eksik `DATABASE_URL`:** `lib/db/index.ts` modül yüklenirken açık bir hata
  fırlatır — belirsiz bağlantı hatası yerine ne eksik olduğunu söyler.

## Test

- `scripts/seed.ts` iki kez çalıştırılır; ikinci çalıştırma satır sayısını
  değiştirmemelidir (idempotence).
- Sorgu katmanı için Vitest henüz kurulmadı; 2A'da doğrulama manuel ve
  derleyici üzerinden. Otomatik test 2B ile birlikte gelir (ingestion'ın
  gerçek mantığı orada).

## Kabul kriterleri

| # | Kriter | Sonuç |
|---|---|---|
| 1 | Postgres 16 sağlıklı | ✅ 16.10, `npm run db:up`, `pg_isready` OK |
| 2 | `db:migrate` → 7 tablo | ✅ 7 tablo, 17 indeks, `search_tsv` ALWAYS generated |
| 3 | `seed` yazar, ikinci çalıştırma değişiklik üretmez | ✅ 8/10/3/15/14 · ikinci tur "0 yeni" |
| 4 | Akademi DB'den render (halka %0), haber `EmptyState`, diğer paneller aynı | ✅ 3 parça / 15 adım, "0/15 adım" |
| 5 | `src/app/**` içinde `@/mocks` yok | ✅ |
| 6 | `src/components/**` değişmemiş | ⚠️ `AppShell` bilerek değişti — aşağıdaki not 2 |
| 7 | tsc 0 · biome 0 · build başarılı | ✅ 49 dosya temiz, tüm veri rotaları ƒ (Dynamic) |

Ek doğrulamalar: adım detayı `content_md`'yi DB'den basıyor · olmayan adım ve
olmayan makale 404 · 1440/768/375px yatay taşma yok · konsol hatası yok ·
dev log'da tek uyarı yok.

## Bilinen sapmalar ve riskler

| Konu | Durum |
|---|---|
| Docker Desktop | **İptal** — taşınabilir Postgres'e geçildi, `docker-compose.yml` silindi |
| Haber paneli ve ticker şeridi 2B'ye kadar boş | Kabul edildi (yukarıdaki not) |
| Akademi halkası %0 | Kabul edildi, 2E'de dolacak |
| `build` sırasında DB gerekir | **Çözüldü** — uygulama notu 1 |
| Postgres kendiliğinden başlamaz | Her açılışta `npm run db:up` — servis kurulmadı |
| `.postgres/` git'e girmez | Başka makinede elle kurulur; adımlar `techContext.md`'de |
| Proje git deposu değil | Bu doküman commit'lenemedi |

## Uygulama notları (2026-08-05, kod yazıldıktan sonra)

**1. Bağlantı tembel kuruldu.** `force-dynamic` tek başına yetmedi: Next, sayfa
yapılandırmasını toplamak için modülü derleme anında değerlendiriyor ve
`lib/db/index.ts` içindeki modül seviyesi `throw` `npm run build`'i düşürüyordu.
Çözüm: `export const db` yerine `export function getDb()`. Bağlantı ilk sorguda
kuruluyor, derleme veritabanı olmadan geçiyor.

**2. `AppShell` değişti — kabul kriteri 6'dan bilinçli sapma.** Kriter
"`src/components/**` içinde hiçbir dosya değişmemiştir" diyordu, ama `AppShell`
doğrudan `@/mocks`'tan ticker verisi çekiyordu; bu `systemPatterns.md`'deki
"bileşenler mock import edemez" kuralının ihlaliydi (Faz 1'den kalma). Ticker
verisi artık `getTickerItems()` servisinden geliyor ve `AppShell`'e prop olarak
geçiliyor. Diğer 20 bileşen dosyası değişmedi.

**3. Ticker şeridi de veritabanına bağlandı.** Ayrı bir kaynak değil, son
makalelerden türetiliyor. `articles` boş olduğu için 2B'ye kadar şerit
görünmeyecek.

**4. `.env.local` hiç okunmuyordu — sessiz hata.** `import "dotenv/config"` yalnız
`.env`'e bakar. Seed açık bir hatayla patladı, ama `db:migrate` **geçti**: çünkü
`drizzle.config.ts` DATABASE_URL yoksa yerel varsayılana düşüyordu ve o varsayılan
tesadüfen doğru URL'di. Yani migration doğru veritabanına ama yanlış sebeple
uygulanmıştı. `scripts/load-env.ts` eklendi (`.env.local` → `.env`, Next'in
önceliğiyle aynı); `drizzle.config.ts` artık varsayılana düşerken uyarı basıyor.

**Doğrulanmış durum (uçtan uca):** `tsc --noEmit` 0 hata · `biome check` 0 uyarı ·
`npm run build` başarılı · migration uygulandı (7 tablo / 17 indeks) · seed
çalıştı ve idempotent · akademi sayfaları gerçek DB satırlarından render oluyor ·
haber paneli `EmptyState` · `@/mocks` importu yalnız üç mock servisinde kaldı.
