# Decision Log

## Technical Decisions

### Ürün Kararı — Auth MVP'de var (2026-08-05)
Kimlik doğrulama Faz 1 şemasında yer alır; Auth.js v5 + Google OAuth kullanılır.

**Status:** accepted
**Impact:** Şema geneli

Rationale:
Akademi roadmap ilerlemesi ve kaydedilen haberler bir kullanıcıya bağlanmak zorunda.
Şema `users` etrafında kurulmazsa sonradan eklemek tüm ilişki tablolarını kırar.

Alternatives Considered:
- Auth'u tamamen Faz 2'ye ertelemek (ilerleme takibi anonim kalırdı)
- localStorage tabanlı anonim ilerleme (cihaz değişince veri kaybı)

### Ürün Kararı — Türkçe UI, İngilizce içerik (2026-08-05)
Arayüz metinleri Türkçe hardcoded; i18n katmanı kurulmaz. Haber ve Reddit içeriği
kaynağından geldiği dilde bırakılır.

**Status:** accepted
**Impact:** Tüm UI bileşenleri

Rationale:
Tek dil hedeflenirken i18n katmanı her string'e dolaylı erişim maliyeti bindirir —
YAGNI. İçeriğin çevrilmesi ayrı bir ürün problemi, Faz 1 kapsamı değil.

Alternatives Considered:
- next-intl / i18next ile baştan çok dilli kurulum
- İçeriği makine çevirisiyle Türkçeleştirmek

### Ürün Kararı — Şimdilik yalnız localhost (2026-08-05)
Deployment hedefi seçilmedi. Geliştirme taşınabilir Postgres 16 ile lokalde yürür.

**Status:** accepted
**Impact:** Altyapı

Rationale:
Deployment kararı, veri toplama yükü ölçülmeden verilirse yanlış çıkar. Worker'ın
gerçek maliyeti Faz 2'de belli olacak; seçimi o noktaya ertelemek bilgiyi artırır.

Alternatives Considered:
- Vercel'e baştan bağlanmak (ayrı worker süreci Vercel'de doğal değil)
- VPS + systemd

### Framework — Next.js 15 (App Router) (2026-08-05)
Uygulama çatısı olarak App Router'lı Next.js 15 seçildi.

**Status:** accepted
**Impact:** Proje geneli

Rationale:
Server Components sayesinde haber/Reddit çekimi sunucuda kalır: API anahtarları
client'a sızmaz, JS bundle küçülür. Suspense streaming, bento grid'de her panelin
bağımsız yüklenmesi için birebir uygun.

Alternatives Considered:
- Vite + React SPA + ayrı API sunucusu
- Remix
- SvelteKit

### Dil — TypeScript (strict) (2026-08-05)
Tüm kod strict modda TypeScript.

**Status:** accepted
**Impact:** Proje geneli

Rationale:
Üç harici veri kaynağının şekli birbirine karışıyor (article / post / video).
Tip güvenliği burada lüks değil, veri sözleşmesinin taşıyıcısı.

Alternatives Considered:
- JavaScript + JSDoc
- TypeScript non-strict

### Stil — Tailwind CSS v4 (2026-08-05)
Tailwind v4, CSS-first `@theme` yapılandırmasıyla.

**Status:** accepted
**Impact:** Tasarım sistemi

Rationale:
Tasarım token'ları doğrudan CSS'te yaşar, `tailwind.config.js` gerekmez.
Token-driven karanlık tema için en temiz zemin.

Alternatives Considered:
- Tailwind v3 + JS config
- CSS Modules
- vanilla-extract

### Bileşenler — shadcn/ui (Radix) (2026-08-05)
Primitifler shadcn/ui ile kod kopyalanarak projeye alınır.

**Status:** accepted
**Impact:** components/ui

Rationale:
Kod `node_modules`'a gömülü değil — tasarım dilinin sahibi biziz. Radix'in
erişilebilirlik davranışı (focus trap, aria) bedava gelir.

Alternatives Considered:
- MUI / Chakra (kendi tasarım dilini dayatır)
- Sıfırdan primitif yazmak (erişilebilirlik maliyeti)

### Animasyon — motion v12 + saf CSS (2026-08-05)
Ticker saf CSS `@keyframes`; motion yalnız panel geçişleri ve mikro-etkileşimlerde.

**Status:** accepted
**Impact:** Performans

Rationale:
Sürekli dönen ticker'ı JS ile sürmek ana thread'i boşuna meşgul eder. CSS
animasyonu compositor'da 60fps, sıfır JS maliyeti.

Alternatives Considered:
- Her şeyi motion ile
- react-spring

### İkonlar — lucide-react (2026-08-05)
İkon seti olarak lucide-react.

**Status:** accepted
**Impact:** UI

Rationale:
İnce çizgili (1.5px) set, "premium ve sade" hissiyatla uyumlu; tree-shake edilebilir.

Alternatives Considered:
- Heroicons
- Phosphor

### Client state — TanStack Query v5 (2026-08-05)
Client tarafı veri yenileme TanStack Query ile. (Faz 2'de fiilen bağlanır.)

**Status:** accepted
**Impact:** Client veri katmanı

Rationale:
İlk yükleme Server Component'ten, canlı yenileme client'ta Query ile. Manuel
`useEffect` polling + stale state kodundan kurtarır.

Alternatives Considered:
- SWR
- Elle useEffect + setInterval

### Backend — Next.js Route Handlers + Server Actions (2026-08-05)
Ayrı backend servisi kurulmaz.

**Status:** accepted
**Impact:** Mimari

Rationale:
İş yükü "çek, cache'le, sun". Ayrı Nest/Express servisi sıfır fayda karşılığında
ikinci bir deploy hedefi ve ikinci bir tip sınırı getirirdi.

Alternatives Considered:
- NestJS
- Express + tRPC

### Veritabanı — PostgreSQL 16 (2026-08-05)
İlişkisel veritabanı olarak Postgres 16.

**Status:** accepted
**Impact:** Veri katmanı

Rationale:
Model doğal olarak ilişkisel (kaynak→makale→sembol→post). Ayrıca Postgres FTS,
makale aramasını Elasticsearch eklemeden karşılar.

Alternatives Considered:
- MongoDB (N—N sembol ilişkileri zorlanır)
- SQLite (worker + web eşzamanlı yazımı sorunlu)
- Postgres + ayrı Elasticsearch

### ORM — Drizzle ORM (2026-08-05)
Veritabanı erişimi Drizzle ile.

**Status:** accepted
**Impact:** lib/db

Rationale:
SQL'e yakın API ve gerçek tip çıkarımı; Prisma'nın ayrı engine binary'si ve
cold-start yükü olmadan.

Alternatives Considered:
- Prisma
- Kysely
- Ham SQL + pg

### Auth — Auth.js v5 + Drizzle adapter + Google OAuth (2026-08-05)
Kimlik doğrulama Auth.js v5 ile, session veritabanında.

**Status:** accepted
**Impact:** Auth şeması

Rationale:
App Router ile resmi entegrasyon. Session DB'de tutulduğu için `user_progress`
tablosuna doğrudan foreign key verilebilir.

Alternatives Considered:
- Clerk (harici bağımlılık, localhost-only hedefle çelişir)
- Lucia
- Elle JWT

### Cache — Postgres cache tablosu + in-process LRU (2026-08-05)
Redis kurulmaz; cache Postgres tablosu ve süreç içi LRU ile.

**Status:** accepted
**Impact:** lib/cache

Rationale:
Tek süreçli localhost için Redis fazladan altyapı. Çok-instance'a geçişte
taşınacak tek yer `lib/cache` içinde izole tutulur.

Alternatives Considered:
- Redis
- Next.js `unstable_cache` tek başına

### Veri toplama — Ayrı worker süreci + node-cron (2026-08-05)
RSS/Reddit/YouTube çekimi `worker/` altında ayrı bir süreçte, node-cron ile. (Faz 2)

**Status:** accepted
**Impact:** Mimari sınır

Rationale:
Yavaş harici I/O request path'inden ayrılır: Reddit çökse dashboard render'ı
etkilenmez. UI yalnız kendi veritabanımızdan okur.

Alternatives Considered:
- Next.js route handler içinde on-demand çekim
- Vercel Cron
- BullMQ + Redis

### Ayrıştırma — rss-parser, Readability + jsdom, sanitize-html (2026-08-05)
Feed ve makale ayrıştırma kütüphaneleri. (Faz 2)

**Status:** accepted
**Impact:** server/integrations

Rationale:
Readability tam makale metnini çıkarır — okuma görünümünün temeli. sanitize-html
harici HTML'in açtığı XSS yüzeyini kapatır.

Alternatives Considered:
- Cheerio ile elle scraping
- Harici okunabilirlik API'si

### Doğrulama — Zod (2026-08-05)
Harici veri sınırda Zod şemasından geçmeden veritabanına girmez.

**Status:** accepted
**Impact:** Veri bütünlüğü

Rationale:
RSS feed'leri kötü şöhretli biçimde bozuk gelir (eksik tarih, kaçırılmamış HTML).
Şema sınırı, bozuk kaydın tabloya ulaşmasını engeller.

Alternatives Considered:
- Valibot
- Elle tip guard

### Test — Vitest + Testing Library (2026-08-05)
Birim/bileşen testleri Vitest ile; E2E için Playwright ileride.

**Status:** accepted
**Impact:** Test altyapısı

Rationale:
Vite tabanlı, Jest'e göre belirgin hızlı ve ESM ile sorunsuz.

Alternatives Considered:
- Jest
- node:test

### Lint/Format — Biome (2026-08-05)
Lint ve format tek araçta: Biome.

**Status:** accepted
**Impact:** Geliştirme akışı

Rationale:
Tek binary; ESLint+Prettier config çakışmaları ve yavaşlığı olmadan.

Alternatives Considered:
- ESLint + Prettier
- oxlint

### Faz sınırı — Faz 1 mock veriyle biter (2026-08-05)
Faz 1 kapsamı: memory bank + stack + mimari + mock veriyle dashboard UI. Harici API
entegrasyonları (RSS, Reddit, YouTube), worker ve Drizzle migration'ları Faz 2.

**Status:** accepted
**Impact:** Proje planı

Rationale:
Tasarım dilini ve veri sözleşmesini API'lere bağlanmadan sabitlemek. `src/types/`
tek sözleşme olduğu için Faz 2'de yalnız veri kaynağı değişir, bileşenler değişmez.
Faz 1 kodunda `fetch(` veya harici URL bulunmaması bu sınırın kanıtıdır.

Alternatives Considered:
- UI ile entegrasyonu aynı anda yazmak (tasarım kararları API şekline esir olurdu)

### Yön rengi #22C55E yerine #2DD4A0 (2026-08-05)
Piyasa yönünün yükseliş rengi, planda yazılı #22C55E'den #2DD4A0'a taşındı.
Düşüş rengi #EF4444 ve kehribar aksan #F5A524 aynı kaldı.
*(Not: kehribar aksan sonradan kaldırıldı — bkz. "Görsel dil: nötr gri + cam".
Yön çifti değişmedi ve yeni cam zemin üstünde yeniden doğrulandı: deutan ΔE 14.5.)*

**Status:** accepted
**Impact:** Tasarım token'ları, tüm yön göstergeleri

Rationale:
Palet doğrulayıcısı (dataviz `validate_palette.js`, dark yüzey #0D0F12) #22C55E ↔
#EF4444 çiftini deuteranopia altında ΔE 7.4 ile ölçtü — 8 eşiğinin altında, yani
kırmızı-yeşil renk körlüğünde ayrışmıyor. #2DD4A0 ↔ #EF4444 ΔE 14.5 veriyor;
kehribarla birlikte üçlü de en kötü 13.1 ile geçiyor. Kontrast ve kroma
kontrolleri üçünde de PASS.
Buna rağmen renk hiçbir yerde tek taşıyıcı değil: her yön göstergesi ok ikonu +
işaretli sayı taşır, her duyarlılık rozeti metin etiketi taşır. Doğrulayıcı
yalnız "kategorik lightness bandı"nda FAIL veriyor; o kural kategorik seri
paletleri içindir, iki kutuplu semantik çift için geçerli değil.

Alternatives Considered:
- #22C55E'yi korumak (renk körlüğünde okunamaz kalırdı)
- Yeşili koyultmak, #16A34A (ΔE 3.7 — daha da kötü)
- Yön için renk yerine yalnız ikon (piyasa panelinde tarama hızını düşürürdü)

### Faz 2, altı dilime bölündü (2026-08-05)
Faz 2 tek spec olarak ele alınmıyor; her biri kendi spec → plan → uygulama turunu
alan altı dilime ayrıldı: 2A veri temeli · 2B haber motoru · 2C topluluk ·
2D akademi videoları · 2E auth · 2F piyasa verisi.

**Status:** accepted
**Impact:** Proje planı

Rationale:
Faz 2'nin orijinal tanımı yedi bağımsız iş kolu içeriyordu. Tek tasarımda
toplanırsa ne incelenebilir ne test edilebilir bir paket çıkar. Dilimlerin
tamamı 2A'ya bağlı olduğu için sıra doğal: önce veri temeli.

Alternatives Considered:
- Faz 2'yi tek spec olarak yürütmek
- Dilim yerine "her tablo bir PR" gibi daha ince bölme (fazla parçalı)

### Piyasa verisi ayrı bir dilim: 2F (2026-08-05)
Piyasa fiyatları ve sparkline serileri Faz 2 kapsamında değildi; 2F olarak
kayda geçti. 2F'e kadar `market.ts` servisi mock döner.

**Status:** accepted
**Impact:** Kapsam, dashboard üst şeridi

Rationale:
Orijinal Faz 2 listesinde (RSS, Reddit, YouTube, worker, migration, auth)
piyasa verisi hiç yoktu — ama panelin en üstündeki beş tile buna bağlı. Plan
olduğu gibi uygulansa o şerit sonsuza kadar sahte kalırdı. Ayrıca gerçek zamanlı
fiyat verisi diğerlerinden farklı bir problem: ücretsiz API'ler gecikmeli veya
kotalı, ve saniyelik yenileme worker/cron modeline oturmuyor.

Alternatives Considered:
- 2A'ya dahil etmek (2A'yı şişirir, harici API tartışmasını erkene çeker)
- Piyasa panelini üründen çıkarmak

### Postgres, Docker Desktop ile çalıştırılacak (2026-08-05)
Yerel Postgres 16, `docker-compose.yml` üzerinden Docker Desktop ile ayağa
kaldırılacak. Kurulum kullanıcı tarafından yapılacak.

**Status:** superseded — bkz. "Postgres taşınabilir ZIP ile çalışır (2026-08-05)"
**Impact:** Geliştirme ortamı, 2A'nın başlangıç koşulu

Rationale:
Plana en sadık seçenek; `docker-compose.yml` zaten yazılmış durumda ve başka
makineye taşınabilir. Makinede Docker da WSL2 de kurulu olmadığı için bir kerelik
kurulum maliyeti var (WSL2 + yönetici hakları + yeniden başlatma), ama karşılığında
ortam tekrar üretilebilir kalıyor.

Alternatives Considered:
- Native Windows Postgres 16 installer (tek MSI, WSL gerekmez — daha hafif ama ortam elle kurulmuş olur)
- Hosted Postgres, Neon/Supabase ("sadece localhost" kararıyla çelişir)
- SQLite/PGlite (Postgres FTS ve jsonb kararlarını bozar, worker/web eşzamanlı yazımında kilitlenir)

### Şema dilim dilim kurulur (2026-08-05)
Tüm tablolar tek migration'da değil; her dilim kendi tablolarını ekler.
2A: sources, articles, tickers, article_tickers, tracks, steps, step_prerequisites.

**Status:** accepted
**Impact:** Migration stratejisi

Rationale:
Migration geçmişi gerçek ilerlemeyi yansıtsın, aylarca boş duran ölü şema
olmasın isteniyor.

Alternatives Considered:
- Tüm şemayı tek seferde (sembol köprü tabloları iki modülü bağladığı için FK sıralaması daha kolay olurdu — bu maliyet bilinerek kabul edildi)
- Auth hariç tümü

### Kademeli veri kaynağı geçişi, servis servis (2026-08-05)
2A'da haber ve akademi servisleri Postgres'ten okur; topluluk, video ve piyasa
servisleri kendi dilimleri gelene kadar `src/mocks`'tan okumaya devam eder.

**Status:** accepted
**Impact:** src/server/services

Rationale:
Faz 1'in sınırı tam da bunun için kurulmuştu: bileşenler `services/` ile
konuştuğu için her servis bağımsız çevrilebilir. Panel hiçbir aşamada yarı boş
görünmez. `src/mocks` 2F bitince silinir.

Alternatives Considered:
- Dürüst boş durumlar (panel dilimler bitene kadar yarı boş kalırdı)
- Mock'ları seed'e çevirmek (sahte satırlar gerçek görünürdü)

### Servis katmanı: düz fonksiyonlar, repository arayüzü yok (2026-08-05)
`src/server/services/*.ts` düz fonksiyonlar ihraç eder. Her servis nereden
okuduğunu kendi gövdesinde bilir; çalışma-zamanı dallanması veya DI yok.

**Status:** accepted
**Impact:** src/server/services

Rationale:
Mock'a geri dönme senaryosu yok — tek kullanıcılı localhost uygulamasında
ortam değişkeniyle implementasyon seçmek bedava olmayan bir soyutlama.
"Hangi servis hâlâ mock'ta" sorusu tek klasörde beş satırda cevaplanıyor.

Alternatives Considered:
- Repository arayüzü + Drizzle/Mock implementasyonları (her veri tipi için üç dosya)
- Tüm servisleri baştan DB'ye bağlamak

### 2A'da akademi ilerlemesi %0 gösterir (2026-08-05)
`user_progress` tablosu `users`'a bağlı ve auth 2E'de geliyor. 2A'da akademi
servisi içeriği DB'den okur ama her adımın durumu `not_started` döner.

**Status:** accepted
**Impact:** Akademi paneli, yol haritası halkası

Rationale:
Kullanıcıya bağlı olmayan bir ilerleme uydurmak sahte veriyi gerçek gibi
gösterirdi. Faz 1'deki "%67" görüntüsünden geriye gidiş gibi hissedilse de
dürüst davranış tercih edildi; 2E'de gerçek ilerlemeyle dolacak.

Alternatives Considered:
- Kullanıcısız "demo ilerleme" satırı seed etmek
- Akademi servisini 2E'ye kadar tamamen mock'ta bırakmak

### Haber kaynakları: yalnız açık RSS verenler (2026-08-05)
`sources` seed'i ücretsiz ve kararlı feed veren kaynaklarla sınırlı: CNBC,
MarketWatch, Yahoo Finance, CoinDesk, Cointelegraph, Investing.com,
Seeking Alpha, The Verge. Faz 1 mock'undaki Reuters, Bloomberg ve FT düştü.

**Status:** accepted
**Impact:** sources seed, 2B'nin çalışabilirliği

Rationale:
Bloomberg ve FT ücretsiz halka açık RSS vermiyor, Reuters feed'lerini büyük
ölçüde kapattı. Mock'taki listeyi korumak 2B'de üç kaynağın çalışmadığını
keşfetmek demekti; liste zaten o noktada değişecekti.

Alternatives Considered:
- Mock'taki beş kaynağı korumak
- Türkçe kaynaklar eklemek ("İngilizce içerik" kararıyla çelişir, karışık dilli akış olur)
- Seed'i boş bırakıp UI'dan ekletmek

### Postgres taşınabilir ZIP ile çalışır, Docker yok (2026-08-05)
Postgres 16.10, EnterpriseDB'nin kurulumsuz `windows-x64-binaries` arşivinden
proje içindeki `.postgres/` altına açılır. `initdb` ile cluster kurulur,
`npm run db:up` / `db:down` ile denetlenir. `docker-compose.yml` silindi.

**Status:** accepted — "Postgres, Docker Desktop ile çalıştırılacak" kararının yerine geçer
**Impact:** Geliştirme ortamı, .gitignore, npm scripts, scripts/pg.ts

Rationale:
Kullanıcı Docker Desktop'ı reddetti. Taşınabilir arşiv yönetici hakkı, WSL2,
Windows servisi ve yeniden başlatma istemiyor; sisteme iz bırakmıyor, klasör
silinince ortam yok oluyor. Gerçek Postgres 16 olduğu için tsvector/GIN ve
jsonb kararlarının hiçbiri bozulmuyor. Arşivden yalnız `bin`, `lib`, `share`
çıkarıldı — pgAdmin ve dokümanlarla 412 MB olan ağırlık 120 MB'a indi.

Bedeli: ortam artık "tekrar üretilebilir tek dosya" değil; kurulum adımları
`scripts/pg.ts` içindeki hata mesajında ve `techContext.md`'de yazılı.

Alternatives Considered:
- Podman (Windows'ta yine WSL2 istiyor — Docker'ı reddetme sebebini çözmüyor)
- Native Windows Postgres installer (yönetici hakkı + kalıcı Windows servisi)
- Hosted Postgres, Neon/Supabase ("sadece localhost" kararıyla çelişir)

### Görsel dil: nötr gri + cam, kehribar kaldırıldı (2026-08-05)
Panel gri tonlara çevrildi. Kehribar aksan (#F5A524) nötr `#e8eaee`'ye döndü;
yüzeyler saydamlaştı (`.glass` / `.glass-chrome`); köşe yarıçapı 16→4px,
kenarlıklar %6→%10 sertleşti.

**Status:** accepted
**Impact:** globals.css token sistemi, 11 bileşen, tüm panel görünümü

Rationale:
Panelde iki renk sistemi yarışıyordu: kehribar "buraya bak", yeşil/kırmızı
"piyasa şu yöne gidiyor". İkisi aynı anda göz çekince yön sinyali zayıflıyordu.
Aksan nötrleşince renk taşıyan tek şey piyasa yönü kaldı — vurgu artık
parlaklıkla yapılıyor. Kullanıcı üç seçeneği de gördü ve bunu seçti.

Bedeli ölçüldü: saydam yüzey metnin arkasını açtığı için `ink-faint` #71767f'ten
#8d929b'ye açılmak zorunda kaldı (cam üstünde 3.40 → 4.58) ve `elevated` %7'den
%5.5'e indi. Detaylı ölçüm:
`docs/superpowers/specs/2026-08-05-cam-arayuz-tasarimi-design.md`

Alternatives Considered:
- Tamamen gri (yön renkleri de gri; piyasa panosunda göz taramasını yavaşlatırdı)
- Kehribarın kalması (istenen "gri tonlara çevir" sonucunu vermezdi)

### Cam etkisi kenardan okutulur, dolgudan değil (2026-08-05)
Liquid glass'ın görünürlüğü `--glass-edge` ile sağlanır: üst rim ışığı + yumuşak
saçılma + alt gölge. Dolgunun üstüne parlama katmanı KONULMAZ.

**Status:** accepted
**Impact:** globals.css, kontrast bütçesi

Rationale:
Dolguya parlama koymak camı daha görünür yapardı ama birleşmiş yüzeyi açıp metin
kontrastını düşürürdü. Kenar, içerik dolgusunun (20px) dışında kaldığı için
kontrast bütçesine hiç dokunmuyor — aynı görsel etki, sıfır maliyet.

Aynı gerekçeyle arkadaki ışık alanı zayıf tutuldu (%3.5/%2.2): güçlendirmek her
senaryoda `ink-faint`'i 4.5'in altına itiyordu, üstelik belirgin radyal gradyan
"şablon yapay zekâ tasarımı" görüntüsüne kayıyor.

Alternatives Considered:
- Dolgu üstü parlama gradyanı (kontrast bütçesini yer)
- Güçlü zemin gradyanı (aynı sorun + şablon görüntü)

### Blur iç içe geçmez (2026-08-05)
`backdrop-filter` yalnız kart ve chrome seviyesinde. Kart içi kutular
`.inset-panel` ile saydam dolgu + kenar alır, kendi blur'unu almaz.

**Status:** accepted
**Impact:** Performans, .inset-panel utility'si

Rationale:
"Her şey cam" kararının gerçek maliyeti iç içe blur'da. 30 bileşende iç içe
`backdrop-filter` compositor'ı her karede yeniden çalıştırır. Ayrıca blur'a
`transition` verilmedi; hover geçişleri yalnız kenarlıkta.

Alternatives Considered:
- Her yüzeye blur (istenen görünümü değiştirmeden GPU'yu yorardı)

### Tipografi kuralı: mono makinenin sesi, sans insanın sesi (2026-08-05)
`.eyebrow` utility'si eklendi (Geist Mono, 11px, 0.18em, uppercase, ink-faint).
Bölüm/eksen etiketleri sans'tan mono'ya taşındı. Durum çipleri sans kaldı.

**Status:** accepted
**Impact:** globals.css, BentoCard, SentimentMeter, ArticleReader, adım sayfası

Rationale:
Bölüm etiketleri 13px sans uppercase idi — herhangi bir web uygulamasından
ayırt edilemezdi. Mono + geniş harf aralığı terminal sütun başlığı dilidir ve
ürünün konusu zaten bir terminal. Kural öğrenilebilir olduğu için "bu bir ölçüm
mü, anlatı mı" sorusu okumadan cevaplanıyor.

Panelin imza öğesi artık cam kenarı değil bu tipografi kuralı: cam kenarı her
liquid-glass arayüzünde var, kural bu panele özgü.

**Sınır bilinçli:** durum çipleri (Son dakika, Boğa/Ayı) sans kaldı. Her şey mono
olsaydı iki ses arasındaki kontrast kaybolur, kuralın değeri giderdi. `.eyebrow`
bir bölgeyi ADLANDIRAN etiket içindir; cümle akışındaki rozet için değil.

Alternatives Considered:
- Her etiketi ve rozeti mono yapmak (kontrastı yok eder)
- Yeni bir display yazı tipi eklemek (font yükü + brief'te yoktu)

### Boş haber paneli izlenen kaynakları gösterir (2026-08-05)
`articles` boşken haber kartı `WatchedSources` render eder: bağlı 8 kaynağın
listesi. Bunun için `findActiveSources()` + `getWatchedSources()` eklendi.

**Status:** accepted
**Impact:** news sorguları/servisi, NewsList API'si, panel ve /haberler

Rationale:
Haber kartı sağdaki iki kartın toplam yüksekliğini kaplıyor (~800px) ve içinde
küçük bir ikon yüzüyordu. Layout DOLU durumda doğru — yanlış olan, boşluğun hiçbir
şey söylememesiydi. Boş ekran eyleme davettir; artık o an doğru olanı yazıyor.

Sorgu yalnız akış boşken çalışır (`articles.length === 0 ? await … : []`), yani
2B geldiğinde maliyeti sıfırlanır. `NewsList` artık `empty?: ReactNode` alıyor —
hangi bağlamın boş olduğunu ve o boşluğun kapladığı yeri sayfa bilir, liste bilmez.

Alternatives Considered:
- Boşluğu olduğu gibi bırakmak (kart bozuk görünüyordu)
- Kartı boşken küçültmek (bento ızgarasında 8 sütunluk delik açardı)
- Sahte makale seed etmek (2A'da bilinçle reddedilmişti)

### Makale gövdesi çıkarılmıyor, kaynağa link veriliyor (2026-08-05)
Readability ile tam metin çıkarma planlanmıştı; yapılmadı. Yalnız yayıncının
feed'de KENDİSİ verdiği tam metin saklanıyor (`content:encoded` ≥1200 karakter),
vermiyorsa özetle yetiniliyor ve makale sayfası kaynağa yönlendiriyor.

**Status:** accepted
**Impact:** articles.content_html/content_text, ArticleReader, Article tipi

Rationale:
Yayıncılar RSS'te bilerek teaser veriyor — trafiği kendi sitelerine çeksinler
diye. Her makalenin HTML'ini çekip gövdesini kopyalamak bu kaynakların kullanım
şartlarıyla çelişir; ayrıca çoğu Cloudflare arkasında olduğu için düzensiz
başarısız olurdu. Ürünün değeri gövdeyi kopyalamak değil, yedi kaynağı tek
akışta toplayıp sembollerle ilişkilendirmek.

Kullanıcı bu soruya cevap vermeden ayrıldı; şartlar sorunu kendisine bildirilmiş
olduğu için riski onun adına almamak tercih edildi. Karar geri alınabilir:
kolonlar ve UI desteği duruyor.

Ölçülen gerçek: sekiz kaynağın hiçbiri tam metin vermiyor (0/141 makale).

Alternatives Considered:
- Readability ile gövde çıkarma (kullanım şartları + bot engelleri)
- Yalnız özet, tam metni hiç saklamama (yayıncı veriyorsa kaybetmek anlamsız)

### Çekim ayrı bir süreçte, çekirdek düz fonksiyon (2026-08-05)
`ingestAllSources()` çekirdeği; `npm run ingest` tek sefer, `npm run worker`
node-cron ile zamanlanmış. Next içinde cron YOK.

**Status:** accepted
**Impact:** scripts/, server/integrations/rss/

Rationale:
systemPatterns'deki okuma/yazma ayrımının uygulaması. Next içi cron dev'de her
derlemede yeniden kurulur ve okuma yolunu çekim hatalarına bağlar. Çekirdeğin
düz fonksiyon olması, çekimi bir sunucu ayakta olmadan test edilebilir kılıyor.

Worker'da iki koruma: önceki tur bitmeden yenisi başlamaz, bir turun çökmesi
zamanlayıcıyı durdurmaz.

Alternatives Considered:
- Next içinde node-cron (dev'de kırılgan, okuma yolunu kirletir)
- Yalnız elle çekim (zamanlama hiç olmazdı)

### Sembol eşleştirme: çıplak sembol aranmaz (2026-08-05)
Yalnız `$SEMBOL` cash-tag'i ve şirket/varlık adı aranıyor. Ayrıca eşleştirmeden
önce metinden deyimler çıkarılıyor (gold standard/rush/medal, golden).

**Status:** accepted
**Impact:** server/integrations/rss/tickers.ts

Rationale:
GOLD, META, ON, ALL gibi semboller normal İngilizce kelimelerle çakışıyor.
Gerçek veride bulunan yanlış pozitif: "Bitcoin's Real Gold **Standard** Test"
başlığı XAU'ya bağlanmıştı — deyim listesi bu yüzden eklendi.

Bilinen sınır: kural değişikliği yalnız yeni makaleleri etkiler; geçmişi
yeniden bağlamak için `article_tickers` temizlenip yeniden çekim gerekir.

Alternatives Considered:
- Çıplak sembolü de aramak (yanlış pozitif üretir)
- Eşleştirmeyi hiç yapmamak (article_tickers boş kalırdı)

### Panel ve şerit kaynak çeşitliliği gözetir (2026-08-05)
`findLatestDiverseArticles(limit, maxPerSource=2)` — panel ve üst şerit bunu
kullanır. Haberler sayfası tam listeyi kullanmaya devam eder.

**Status:** accepted
**Impact:** lib/db/queries/news.ts, services/news.ts, panel, ticker

Rationale:
Düz `order by published_at desc` ile panelin altı satırının altısı da Seeking
Alpha oluyordu — o kaynak onlarca kaydı aynı damgayla döküyor. Tek kaynağı
gösteren şey toplayıcı değildir. Haberler sayfasında ise "her şey, en yeniden
eskiye" doğru davranış, orada çeşitlilik uygulanmıyor.

Alternatives Considered:
- Pencere fonksiyonu ile SQL'de çözmek (satır sayısı küçük, JS daha okunur)
- Kaynak başına 1 (altı kaynakta panel çok seyrekleşirdi)

### Cointelegraph devre dışı (2026-08-05)
`is_active = false`. Kayıt siliniyor değil, kapatılıyor.

**Status:** accepted
**Impact:** sources seed'i ve tablosu

Rationale:
Dört ayrı denemede de ECONNRESET (bot engeli). Her turda sonsuza dek hata
kaydeden bir kaynak bırakmak, `ingestion_runs`'ın "gerçekten ne bozuk" sinyalini
gürültüye boğar. Kayıt tutuluyor ki "neden Cointelegraph yok" sorusu cevaplı
kalsın; engel kalkarsa tek alan değiştirmek yeter.

## Pending Decisions

### Deployment hedefi (2026-08-05)
Uygulamanın nerede çalışacağı seçilmedi.

**Status:** proposed
**Impact:** Altyapı

Rationale:
Ayrı worker süreci Vercel'in serverless modeline oturmuyor; VPS/Fly.io/Railway
karşılaştırması worker'ın gerçek kaynak ihtiyacı Faz 2'de ölçüldükten sonra yapılacak.
