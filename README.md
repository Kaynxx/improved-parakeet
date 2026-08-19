# improved-parakeet

Tek kullanıcılı Türkçe finans panosu: RSS haber akışı, piyasa göstergeleri, topluluk
duyarlılığı ve sekiz haftalık para-ekonomisi akademisi. Next.js 15 (App Router) +
Auth.js v5 + Drizzle ORM + taşınabilir Postgres 16 altyapısı üzerine kuruludur.

> **Durum:** Tek geliştirici, tek kullanıcı. Faz 2 (kimlik doğrulama, veri
> toplama, akademi) tamamlandı. Üretim altyapısı bu repoda değildir; bkz.
> [Dağıtım](#dağıtım-deploy).

---

## İçindekiler

- [Özet](#özet)
- [Özellikler](#özellikler)
- [Mimari](#mimari)
- [Yerel kurulum](#yerel-kurulum)
- [Komutlar](#komutlar)
- [Ortam değişkenleri](#ortam-değişkenleri)
- [Akademi içeriği](#akademi-içeriği)
- [Güvenlik notları](#güvenlik-notları)
- [Dağıtım](#dağıtım-deploy)
- [Geliştirme kuralları](#geliştirme-kuralları)

---

## Özet

| Katman | Teknoloji |
|---|---|
| Çatı | Next.js `15.5` (App Router, Server Actions) |
| Arayüz | React `19.2`, Tailwind CSS `4`, `motion`, `lucide-react`, `geist` |
| Kimlik | Auth.js v5 + Credentials provider + `@node-rs/argon2` |
| Veritabanı | PostgreSQL 16 (taşınabilir ikili, `.postgres/`) + Drizzle ORM |
| İçerik | Statik Markdown (`content/akademi/hafta-NN/ders-M.md`), `gray-matter` + `marked` |
| Dış kaynaklar | RSS (`rss-parser`), Finnhub (piyasa), Reddit (duyarlılık) |
| Testler | `node:test` (yerleşik), `tsx` çalıştırıcı |
| Biçim / statik analiz | Biome (`check`, `format`) |

Tek kullanıcı, tek dil (Türkçe), tek sekme: tek `finans_web` / `finans_worker`
/ `finans_admin` rol ayrımı veritabanında oturur; uygulama köküne tek bir hesapla
giriş yapılır.

---

## Özellikler

- **Haber akışı:** `/haberler` — izlenen kaynaklardan RSS çekimi, okuma
  görünümü, kaynak rozetleri, yatay ticker.
- **Piyasa:** `/` ve `/piyasa` kartları — Finnhub'dan canlı semboller ve
  sparkline (worker üzerinden saatlik yenileme).
- **Topluluk duyarlılığı:** `/topluluk` — Reddit akışı, sentiment skoru,
  trend ticker'lar.
- **Akademi:** `/akademi` — 8 hafta × 5 ders, etkileşimli lab'ler (TÜFE
  sepeti, T-hesap, duration/convexity), yansıma günlüğü, ilerleme halkası.
- **Kimlik:** `/giris` — e-posta + şifre (argon2), başarısız deneme sınırlama
  (in-memory + DB destekli), açık yönlendirme koruması.
- **Tema:** Sistem / açık / koyu, kalıcı, kök layout'ta FOUC'süz.

---

## Mimari

```
src/
├── app/                      # App Router sayfaları + server actions
│   ├── (auth)/giris/         # Giriş sayfası + Credentials action
│   ├── (dashboard)/          # /, /akademi, /haberler, /topluluk
│   └── api/auth/[...nextauth]/route.ts
├── components/               # Sunucu + istemci bileşenleri
│   ├── academy/              # Ders oynatıcı, lab'ler, roadmap, yansıma
│   ├── news/, market/, sentiment/
│   ├── auth/, layout/, common/
├── lib/
│   ├── db/                   # Drizzle bağlantısı, şema, sorgular
│   ├── security/             # URL doğrulama, deneme sınırlama
│   ├── content/              # Akademi Markdown render + etkileşimler
│   └── utils/                # cn, format, chart, youtube
├── server/
│   ├── services/             # İş mantığı (academy, news, market, video)
│   ├── integrations/         # RSS, Finnhub
│   └── ai/                   # Anthropic değerlendirme
├── auth.ts                   # Auth.js v5 — Credentials + argon2
├── auth.config.ts            # Edge-uyumlu yapılandırma (middleware ile paylaşılır)
└── middleware.ts
```

**Üç rol, üç bağlantı dizesi:** `DATABASE_URL` (web, oku + kullanıcı verisi
yaz), `DATABASE_WORKER_URL` (worker, sadece haber/piyasa yaz), `DATABASE_ADMIN_URL`
(migration, seed, hesap açma). Üretimde bu üçü farklı şifrelerle ayrılmış
Postgres kullanıcıları olmalıdır.

**Akademi:** Tüm ders içeriği `content/akademi/hafta-NN/ders-M.md` altında
Markdown + frontmatter. Veritabanına derlenmez; sayfa isteğinde dosya
sisteminden okunur (bkz. `src/lib/content/lesson.ts`).

---

## Yerel kurulum

Gereksinimler: **Node 24+**, **npm 11+**, **Git 2.55+**, **Windows / macOS /
Linux**. Dış veritabanı gerekmez: Postgres 16 ikilisi repoda
`.postgres/pgsql/` altındadır.

```powershell
# 1) Bağımlılıkları kur
npm install

# 2) Veritabanını ayağa kaldır (yerel Postgres 16, .postgres/data)
npm run db:up

# 3) Veritabanı rollerini üret (.env.local/.env.worker.local/.env.admin.local)
npm run db:harden

# 4) Şemayı uygula
npm run db:migrate

# 5) Akademiyi ve örnek verileri yükle
npm run seed

# 6) Geliştirme sunucusunu başlat
npm run dev

# 7) Ayrı bir terminalde: RSS / piyasa / duyarlılık toplayan worker
npm run worker
```

Uygulama: <http://localhost:3000>. Tek hesap açmak için:

```powershell
npm run user:create
```

Komut sizden e-posta, ad ve şifre ister; argon2 ile özetlenir
`finans_admin` rolü üzerinden kaydedilir.

---

## Komutlar

| Komut | İş |
|---|---|
| `npm run dev` | Next.js geliştirme sunucusu |
| `npm run build` | Üretim derlemesi |
| `npm run start` | Üretim sunucusu (build sonrası) |
| `npm run typecheck` | TypeScript `--noEmit` |
| `npm run lint` | Biome statik analiz |
| `npm run format` | Biome ile yaz |
| `npm run test:security` | `src/lib/security/*.test.ts` yerleşik test |
| `npm run db:up` / `db:down` / `db:status` | Taşınabilir Postgres'i başlat/durdur/sorgula |
| `npm run db:harden` | Üç rolü üretir, `.env*.local` dosyalarına rastgele parolaları yazar |
| `npm run db:generate` | Drizzle şema değişikliğinden migration üret |
| `npm run db:migrate` | Bekleyen migration'ları uygula |
| `npm run db:studio` | Drizzle Studio (GUI) |
| `npm run seed` | Akademiyi ve örnek verileri yükle |
| `npm run ingest` | RSS toplama (tek seferlik) |
| `npm run worker` | node-cron zamanlı toplayıcı (RSS, piyasa, duyarlılık) |
| `npm run user:create` | Tek kullanıcı oluştur |

---

## Ortam değişkenleri

`.env.example` tüm anahtarların şemasını içerir (değersiz). Gerçek değerler
`.env.local`, `.env.worker.local`, `.env.admin.local` dosyalarında oturur; **bu
üçü Git tarafından izlenmez** (bkz. `.gitignore`).

| Anahtar | Dosya | Açıklama |
|---|---|---|
| `DATABASE_URL` | `.env.local` | `finans_web` rolü (oku + kullanıcı yaz) |
| `DATABASE_WORKER_URL` | `.env.worker.local` | `finans_worker` (haber/piyasa yaz) |
| `DATABASE_ADMIN_URL` | `.env.admin.local` | `finans_admin` (migration, seed, hesap) |
| `AUTH_SECRET` | `.env.local` | Auth.js JWT imzalama anahtarı |
| `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USER_AGENT` | `.env.worker.local` | Reddit uygulama kimliği |
| `FINNHUB_API_KEY` | `.env.worker.local` | Piyasa verisi (ücretsiz kayıt) |

**Üretim:** Hiçbir gizli anahtar depoya yazılmaz. Dağıtım platformu (Vercel,
Fly, kendi sunucu) env değişkenlerini sağlar; `db:harden` çıktılarını oraya
taşırsın.

---

## Akademi içeriği

`content/akademi/hafta-NN/ders-M.md` — toplam 8 hafta × 5 ders = **40** Markdown
dosyası. Her dersin frontmatter alanları:

- `hafta`, `sira`, `baslik`, `ozet`
- `kaynaklar` (liste), `sorular` (önizleme)
- `interactions` (varsa) — TÜFE sepeti, T-hesap, duration/convexity lab'leri

İçerik `src/lib/content/lesson.ts` üzerinden sunulur; veritabanına derlenmez.
Yeni ders eklemek için ilgili klasöre `.md` dosyası bırakmanız yeterlidir; rota
otomatik olarak `[hafta]/[ders]` dinamik segmentleriyle yakalar.

---

## Güvenlik notları

- **Şifre:** `@node-rs/argon2` ile özetlenir; düz metin hiçbir yerde bulunmaz.
- **Giriş denemesi:** `src/lib/security/giris-kisitlama.ts` — bellek içi sayaç
  (Edge uyumlu), 5 dakikada 10 deneme sonrası kısa süreli blok. DB destek
  katmanı ile kalıcı sayaç gerektiğinde genişletilebilir.
- **Açık yönlendirme:** `src/lib/security/url.ts` — `donus` parametresi
  yalnızca aynı origin veya güvenli iç yolları kabul eder.
- **Auth.js:** `authConfig` (Edge) ve `auth.ts` (Node) ikiye ayrılmıştır;
  middleware asla Postgres'e veya argon2'ye dokunmaz.
- **SQL injection:** Tüm sorgular Drizzle ORM üzerinden parametreli gider;
  ham SQL yalnız migration dosyalarındadır.
- **HTML sanitizasyonu:** RSS ve topluluk metinleri `sanitize-html` ile temizlenir.

**Üretim için ek öneriler (bu repoda yapılmadı):**

- Rate limiting (ör. Cloudflare, Upstash).
- CSP başlığı (`next.config.ts`).
- HTTPS zorlaması ve güvenli cookie bayrakları (Auth.js v5 prod'da otomatik).
- Günlük yedek (`.postgres/data`).

---

## Dağıtım (deploy)

Bu repo **dağıtım altyapısını içermez**. Üretime götürmek için tipik yol:

1. **Statik hedefler:** Next.js 15 → [Vercel](https://vercel.com), [Netlify](https://netlify.com),
   veya kendi Node 24+ sunucun.
2. **Veritabanı:** Üretim Postgres (Supabase, Neon, RDS, veya kendi sunucu).
   `db:harden` çıktısındaki rolleri birebir üret; `DATABASE_URL`,
   `DATABASE_WORKER_URL`, `DATABASE_ADMIN_URL` env değişkenlerini dağıtım
   platformuna yaz.
3. **Worker:** Ayrı bir süreç (`npm run worker`) — Vercel Cron / Fly Machines /
   Railway cron, ya da `node-cron` ile kendi sunucunda.
4. **Asset'ler:** Hiçbir büyük ikili repoya yazılmaz (`.gitignore` doğru).

> **Şu anki sınır:** Tek kullanıcı, tek sekme; birden çok kullanıcı veya
> çoklu sekme desteği için kimlik altyapısı hazır, ancak veri modeli
> genişletilmemiştir.

---

## Geliştirme kuralları

- **Dil:** Kod, yorumlar, değişken adları, arayüz metni Türkçe. İngilizce
  yalnız kütüphane API'lerinde ve standart terimlerde.
- **Biçim:** `biome format --write` + `biome check` commit öncesi çalıştırılır.
- **Tipler:** `npm run typecheck` sıfır hata vermeden commit'lenmez.
- **Karar:** Mimari veya kalıcı tercihler `memory-bank/decisionLog.md`'ye
  kaydedilir; güncel durum `memory-bank/now.md`'de özetlenir.
- **Bilgi:** Bütün yeni iş için önce `CLAUDE.md` ve `AGENTS.md` okunur.

---

## Lisans

Tek geliştiricinin kişisel projesi. Lisans belirtilmemiştir; kopyalama ve
dağıtım için geliştiriciyle iletişime geçin.
