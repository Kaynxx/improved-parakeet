# System Patterns

> Mimari, desenler, bileşen ilişkileri ve kritik uygulama yolları.
> Kararların **gerekçesi** için `decisionLog.md`, kullanılan araçlar için
> `techContext.md`.

## Tipografi kuralı: iki ses

| Ses | Yazı tipi | Ne taşır | Nerede |
|---|---|---|---|
| **Makine** | Geist Mono | etiket, sayı, durum | `.eyebrow` (bölüm/eksen etiketleri) · `.tabular` (tüm sayısal veri) |
| **İnsan** | Geist Sans | başlık, özet, ders metni | h1–h3, makale gövdesi, akademi içeriği |

Kural öğrenilebilir olduğu için arayüz gezilirken "bu bir ölçüm mü, anlatı mı"
sorusu okumadan cevaplanır. Panelin **imza öğesi** budur.

**Sınır:** `.eyebrow` bir bölgeyi *adlandıran* etiket içindir. Cümle akışındaki
durum çipleri (Son dakika, Boğa/Ayı) sans kalır — her şey mono olursa iki ses
arasındaki kontrast, dolayısıyla kuralın değeri kaybolur.

## Çekim (ingestion) deseni — 2B'de kuruldu

```
scripts/worker.ts (cron)   scripts/ingest.ts (tek sefer)
         └────────────┬────────────┘
                      ▼
   server/integrations/<kaynak>/ingest.ts   ← orkestrasyon + hata kaydı
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
     feed.ts      article.ts    tickers.ts
   (ağ + biçim)  (saf dönüşüm)  (eşleştirme)
                      ▼
                   lib/db → Postgres
```

Kurallar:

1. **Ağ katmanı hata yutmaz**, yukarı fırlatır. Sessizce boş dizi döndürmek,
   ayakta olmayan bir kaynağı "veri yok" gibi gösterir.
2. **Dönüşüm katmanı saftır** — ağ yok, veritabanı yok. Tek başına akıl
   yürütülebilir.
3. **Bir kaynağın çökmesi turu bitirmez.** Hata `ingestion_runs`'a yazılır,
   sıradaki kaynakla devam edilir.
4. **Her tur kaydedilir.** "Neden yeni veri yok?" sorusunun cevabı ancak
   `ingestion_runs`'ta durur.
5. **Kaynaklar sırayla taranır.** Paralellik engellenme riskini artırır ve
   kullanıcı beklemiyor.

2C (Reddit) ve 2D (YouTube) aynı deseni izleyecek.

## Cam yüzey kuralı

`--color-surface` ve `--color-elevated` **saydamdır**. Bir yerde ayırıcı/maskeleyici
olarak opak bir renk gerekiyorsa `--color-base` kullanılır.

Bu kural dört yerde ihlal edilip onarıldı: duyarlılık ölçeri ibresi, ticker kenar
maskeleri, arama kutusu, sparkline son değer çapası. Yeni bileşen yazarken:
*"bu renk bir şeyin arkasını kapatmak için mi orada?"* — evetse `base`.

`backdrop-filter` yalnız kart (`.glass`) ve chrome (`.glass-chrome`) seviyesinde
bulunur. Kart içi kutular `.inset-panel` alır, blur almaz.

## Temel desen: tek yönlü, üç duraklı veri akışı

```
page.tsx (Server Component)
    │  veriyi çeker
    ▼
src/server/services/*.ts        ← UI'ın konuştuğu TEK katman
    │  DB'ye giden servisler
    ▼
src/lib/db/queries/*.ts  →  Drizzle  →  Postgres
```

Sayfa veriyi çeker ve **prop olarak** bileşenlere geçirir. Bileşenler servis
bile import etmez; yalnız `src/types`'taki tipleri tanır. Bu yüzden veri kaynağı
değiştiğinde tek bir bileşen dosyası bile açılmaz.

## Değişmez sınır kuralı

| Katman | Neyi import edebilir | Neyi ASLA import edemez |
|---|---|---|
| `components/**` | `src/types`, `src/lib/utils` | `services/`, `lib/db/`, `mocks/` |
| `app/**/page.tsx` | `services/`, `src/types` | `lib/db/`, `mocks/` |
| `server/services/` | `lib/db/queries/`, `mocks/` (geçici), `src/types` | `server/integrations/` |
| `server/integrations/` | harici SDK'lar, `src/types` | `components/`, `app/` |
| `worker/` | `server/integrations/`, `lib/db/` | `components/`, `app/` |

`src/types/` tek veri sözleşmesidir. Yukarıdaki tabloyu bozan bir import,
mimarinin kendisini bozar.

## Kademeli veri kaynağı geçişi (Faz 2 boyunca geçerli)

Her servis nereden okuduğunu **kendi içinde** bilir. Faz 2 dilimleri ilerledikçe
servisler tek tek mock'tan DB'ye çevrilir; imzaları değişmez, gövdeleri değişir.

| Servis | 2A'daki kaynak | DB'ye geçtiği dilim |
|---|---|---|
| `news.ts` | Postgres | 2A |
| `academy.ts` | Postgres (içerik) | 2A · durum 2E'de |
| `sentiment.ts` | `src/mocks` | 2C |
| `video.ts` | `src/mocks` | 2D |
| `market.ts` | `src/mocks` | 2F |

Repository arayüzü + çalışma-zamanı dallanması **bilerek kullanılmadı** —
mock'a geri dönme senaryosu yok, soyutlama bedava değil.

## Sembol omurgası

Üç modülü birbirine bağlayan yapı `tickers` tablosu ve iki N—N köprüsü:

```
articles ──< article_tickers >── tickers ──< post_tickers >── posts
                                    │
                                    └──< ticker_sentiment_daily (rollup)
```

`ticker_sentiment_daily` **önceden hesaplanmış** bir rollup'tır: duyarlılık
metresi her render'da binlerce gönderi taramasın diye. Bu tablo worker
tarafından günlük yazılır, UI yalnız okur.

## Okuma/yazma ayrımı

- **Yazma yolu:** `worker/` süreci → `server/integrations/` → `lib/db` → Postgres.
  Yavaş, hataya açık, zamanlanmış (node-cron).
- **Okuma yolu:** Server Component → `services/` → `lib/db/queries` → Postgres.
  Hızlı, senkron, kullanıcı isteğine bağlı.

İki yol yalnız veritabanında buluşur. Reddit çökse okuma yolu etkilenmez —
mimarinin varlık sebebi bu.

## Erişilebilirlik deseni: renk asla tek taşıyıcı değil

Her yön/durum göstergesi en az iki kanal taşır:

| Gösterge | Kanal 1 | Kanal 2 | Kanal 3 |
|---|---|---|---|
| Piyasa yönü | renk | ok ikonu | işaretli sayı |
| Duyarlılık rozeti | renk | metin etiketi | — |
| Aktif nav öğesi | renk | sol çubuk | `aria-current` |
| Adım durumu | renk | ikon | `sr-only` metin |
| Grafikler | — | `role="img"` + `aria-label` | sayısal karşılık |

Yeşil `#2DD4A0` / kırmızı `#EF4444` çifti bile renk körlüğünde sınırda ayrışıyor
(deutan ΔE 14.5); ikincil kodlama olmadan hiçbir yerde kullanılmaz.

## Render deseni

- Varsayılan **Server Component**. `"use client"` yalnız gerçek etkileşim
  gerektiğinde (şu an tek yer: `Sidebar` — `usePathname` + daraltma durumu).
- Bu sayede mock zaman damgaları (`timeAgo`) hidrasyon uyuşmazlığı üretmez:
  sunucuda bir kez render edilir, HTML olarak gider.
- Ticker saf CSS `@keyframes`; hover/focus'ta `animation-play-state: paused`.
  JS yok, compositor'da çalışır.

## Kritik uygulama yolları

**Yeni bir veri tipi eklerken:** önce `src/types` (sözleşme) → sonra `lib/db/schema.ts`
→ migration → `lib/db/queries` → `server/services` → en son sayfa. Ters yönde
çalışmak sözleşmeyi kaynağa esir eder.

**Bir servisi mock'tan DB'ye çevirirken:** yalnız o servisin gövdesi değişir.
İmza, tipler, sayfalar ve bileşenler sabit kalır. Değişiklik başka dosyaya
taşıyorsa sınır kuralı bir yerde çiğnenmiş demektir.

**Odak halkası:** `:focus-visible` kuralı **katmansız** yazılır (`@layer` dışında).
Katmanlı kurallar katmansızlara yenilir; ayrıca `transition-property: none`
taşır çünkü Tailwind'in `transition-colors` listesi `outline-color`'ı kapsıyor
ve halka gecikmeli beliriyordu.

İlgili: `projectbrief.md`, `techContext.md`, `decisionLog.md`
