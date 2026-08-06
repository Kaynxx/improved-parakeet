# Active Context

## Current Session
Started: 2026-08-04 00:25:48
Mode: Development
Current Task: Initial Setup

## Tasks
### In Progress
- [ ] Project initialization
- [ ] Environment setup

## Open Questions
- What are the primary project goals?
- What are the key technical requirements?

## Recent Updates
- 2026-08-04: Project initialized

## Session Update (2026-08-05)
- Mode: architect
- Task: Faz 1 — stack, mimari ve mock dashboard UI

## Session Update (2026-08-05)
- Mode: code
- Task: Faz 1 tamamlandı; Faz 2 (harici API entegrasyonları) onay bekliyor

## Session Update (2026-08-05)
- Mode: architect → code
- Task: Faz 2A (veri temeli) — tasarım onaylandı, uygulama başladı

## Session Update (2026-08-05)
- Mode: code
- Task: **Faz 2A tamamlandı ve uçtan uca doğrulandı.** Docker kararı geri alındı;
  taşınabilir Postgres 16.10 ayağa kalktı, migration + seed uygulandı.

## Şu Anki Odak

**Faz 2A bitti.** Panel Faz 1'deki görünümünü koruyor ama haber ve akademi
verisi artık Postgres'ten geliyor.

Çalışan ortam:
- Postgres 16.10 `.postgres/` altında, `npm run db:up` ile başlar
- `DATABASE_URL="postgresql://finans:finans@127.0.0.1:5432/finans"` → `.env.local`
- 7 tablo + GIN indeksi + `search_tsv` generated kolonu kurulu
- Seed: 8 kaynak, 10 sembol, 3 parça, 15 adım, 14 ön koşul kenarı — idempotent
- `articles` kasıtlı olarak boş → haber paneli ve ticker şeridi 2B'ye kadar boş

**Görsel dil değişti (2026-08-05, 2A'dan sonra).** Panel gri tonlara çevrildi,
kehribar aksan kaldırıldı, yüzeyler cam oldu, köşeler 4px'e indi. Ayrıntı ve
ölçümler: `docs/superpowers/specs/2026-08-05-cam-arayuz-tasarimi-design.md`.
Sunum katmanı dışına çıkılmadı — veri, servis ve sorgu katmanları aynı.

**Faz 2B bitti (2026-08-05).** Haber motoru çalışıyor: 7 kaynaktan RSS çekimi,
tekilleştirme, sembol eşleştirme, `ingestion_runs` kaydı, `npm run worker` ile
15 dakikada bir zamanlanmış tur. Panelde gerçek haber var.

Ayrıntı: `docs/superpowers/specs/2026-08-05-faz2b-haber-motoru-design.md`

**Sıradaki dilimler kullanıcıdan kimlik bilgisi bekliyor:**
- 2C Reddit → `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET`
- 2D YouTube → `YOUTUBE_API_KEY`
- 2E Auth → `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` + `AUTH_SECRET`
- 2F Piyasa verisi → sağlayıcı kararı verilmedi

Anahtarlar `.env.local`'e yazılmadan bu dilimler kodlanamaz — sahte anahtarla
yazılan entegrasyon test edilemez, yani doğrulanmamış kod olur.

## Sonraki Adımlar

- 2A tamamlandığında sırayla: **2B** haber motoru → **2C** topluluk →
  **2D** akademi videoları → **2E** auth → **2F** piyasa verisi
- Her dilim kendi spec → plan → uygulama turunu alır; her dilim sonunda durulup
  onay istenir (kullanıcının açık talimatı)

## Öğrenilenler ve Dikkat Edilecekler

- Faz 1'de `src/server/services/` **hiç yazılmamıştı**; sayfalar doğrudan
  `@/mocks`'tan import ediyordu. Mimaride vardı ama Adım 3'ün dosya listesinde
  yoktu. 2A'nın ilk işi bu boşluğu kapatmak.
- Planda piyasa verisini çeken hiçbir faz yoktu — 2F olarak eklendi.
- Proje henüz bir **git deposu değil**. Tasarım dokümanlarını commit'leyemiyoruz.
- `import "dotenv/config"` **yalnız `.env` okur, `.env.local`'i okumaz.** Seed
  script'i bu yüzden DATABASE_URL'i göremiyordu; migration ise `drizzle.config.ts`
  içindeki fallback URL sayesinde sessizce geçmişti — yani "çalışıyor" görüntüsü
  yanıltıcıydı. Node script'leri artık `scripts/load-env.ts` üzerinden yükleniyor
  (`.env.local` önce, `.env` sonra — Next'in önceliğiyle aynı).

## Bilinen Ortam Notları
- `typescript` **5.x'te sabit tutulmalı**. Makinede TS 7.0.2 kuruluydu; Next 15
  tsconfig'i kendi TS API'siyle okuduğu için `paths` alias'ları ve `next.config.ts`
  hiç görünmüyordu ("Cannot read properties of undefined (reading 'fileExists')").
- `next@15` bağımlılıkları (postcss, sharp) 3 high-severity audit uyarısı veriyor;
  `npm audit fix --force` Next 16'ya çıkarır — plandaki Next 15 kararına aykırı,
  o yüzden uygulanmadı.
