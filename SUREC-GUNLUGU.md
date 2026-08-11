# Finans Programı — Süreç Günlüğü

> Son güncelleme: 2026-08-11  
> Aktif dal: `faz2bc-akademi-mufredat`

## Nasıl kullanılır

Bu belge, yeni bir çalışma oturumunda projenin nerede kaldığını ve sıradaki
somut işi görmek için ilk okunacak operasyonel özettir. Her anlamlı çalışmanın
sonunda mevcut durum, yol haritası, açık sorunlar ve en üstteki kronolojik kayıt
güncellenir.

Bilgi kaynakları arasındaki öncelik sırası şöyledir:

1. Git geçmişi ve çalışma ağacındaki doğrulanabilir durum,
2. [CLAUDE.md](CLAUDE.md) içindeki kalıcı proje kuralları,
3. [Memory Bank](memory-bank/) içindeki bağlam, karar ve geçmiş kayıtları,
4. eski plan ve durum özetleri.

Çelişki olduğunda daha eski bir belgedeki ifade güncel gerçek kabul edilmez.
Ayrıntılı mimari kararlar [decisionLog.md](memory-bank/decisionLog.md), kalıcı
teknik kurallar ise [CLAUDE.md](CLAUDE.md) içinde tutulmaya devam eder.

## Projenin amacı

Finans Programı; bireysel yatırımcı için haber akışını, piyasa göstergelerini,
topluluk duyarlılığını ve 8 haftalık ileri seviye parasal iktisat akademisini
tek Türkçe panelde birleştiren, yatırım tavsiyesi üretmeyen kişisel finans
uygulamasıdır. Haber, topluluk ve piyasa verisini semboller üzerinden
ilişkilendirerek dağınık bilgiyi bağlama dönüştürmeyi hedefler.

## Mevcut durum

- Proje `faz2bc-akademi-mufredat` özellik dalındadır. Akademi yapısı, müfredat
  ve ders rotası düzeltmesi commit'lidir.
- Tek kullanıcılı e-posta/şifre girişi ve kullanıcıya bağlı akademi ilerleme
  temeli tamamlanmıştır. Açık kayıt yoktur; hesap terminalden oluşturulur.
- RSS haber motoru, sembol eşleştirme, tekilleştirme ve 15 dakikalık worker
  akışı tamamlanmıştır.
- Akademi `weeks`/`lessons` yapısındadır. Kaynak katmanı arayüzde çalışır; soru,
  cevap ve AI değerlendirme katmanı ise **yalnız şema, seed ve servis
  düzeyindedir — arayüze bağlı değildir**. Ders sayfası soruları hiç basmıyor
  ve `src/server/ai/degerlendir.ts` hiçbir yerden çağrılmıyor (2026-08-11
  doğrulaması).
- Repoda ve veritabanında 8 hafta, 40 ders, 120 kaynak, 120 soru ve **70 ön
  koşul kenarı** vardır. 64/70 farkı kapandı: eski statik sayım yalnız blok
  liste (`- hafta-NN/...`) biçimini tanıyor, satır içi
  (`onkosul: [a, b]`) biçimindeki 6 bildirimi atlıyordu. Doğru sayı 70'tir.
- Ders ayrıntı sayfasındaki 404 hatası `eeb0e19` commit'iyle giderilmiştir.
- Topluluk duyarlılığı mock'tan ayrılmıştır. Altı referans gönderi Postgres'te
  tutulur; gönderi zamanları dakikalık ofsetlerden canlı üretilir, özet ve ticker
  trendleri sorgu anında belirlenimci biçimde hesaplanır. `src/mocks/index.ts`
  kaldırılmıştır.
- Günün videosu akademi derslerinin doğrulanmış YouTube kaynaklarından gelir;
  seçim güne göre belirlenimcidir ve 40 videoluk döngüyle ilerler. Kart ilgili
  derse götürür. YouTube Data API bilinçli olarak kullanılmaz.
- **Mock katmanı tamamen kalktı.** `src/mocks/` boş ve kod tabanında tek bir
  `@/mocks` importu yok. Üç servisin üçü de (`sentiment.ts`, `video.ts`,
  `market.ts`) Postgres'ten okuyor.
- Piyasa kartları Finnhub'ın ücretsiz katmanından besleniyor. Beş sembolün
  dördü ETF vekili (SPY, QQQ, GLD, FXE): endeks değerleri lisanslı veri ve
  ücretsiz katmanda forex tamamen kapalı. Vekillik arayüzde açıkça yazılıyor.
  Sağlayıcıda geçmiş seri olmadığı için sparkline'ı worker biriktiriyor —
  seri boş başlar ve 30 günde dolar.
- Drizzle migration zinciri onarıldı: yedi migration `0000_baseline.sql`
  içinde toplandı. `db:migrate` ve `db:generate` otonom/CI ortamında soru
  sormadan, exit 0 ile çalışıyor.
- Güncel çalışma odağı Faz 0'ın kalan dokümantasyon işi ile akademi
  sorularının arayüze bağlanmasıdır.

## Tamamlanan aşamalar

| Tarih | Aşama | Sonuç ve kanıt |
|---|---|---|
| 2026-08-05 | Faz 1 — Mock dashboard | Türkçe, erişilebilir, responsive dashboard ve temel tasarım sistemi tamamlandı. |
| 2026-08-05 | Faz 2A — Veri temeli | Taşınabilir Postgres 16, Drizzle şeması/migration'ları, seed ve servis katmanı kuruldu. |
| 2026-08-05 | Faz 2B — Haber motoru | RSS çekimi, sembol eşleştirme, tekilleştirme, çekim kayıtları ve worker tamamlandı. |
| 2026-08-06 | Faz 2E — Kimlik ve ilerleme | Auth.js v5 temeli kuruldu; Google OAuth kararı e-posta/şifre tabanlı tek kullanıcı girişine çevrildi (`df5a785`, `ac40d13`). |
| 2026-08-10 | Akademi alt projesi B — Yapı | `weeks`/`lessons` şeması, kaynaklar, sorular, cevaplar ve AI değerlendirme katmanı commit'lendi (`9a728ce`). |
| 2026-08-10 | Akademi alt projesi C — Müfredat | 8 haftalık 40 ders, 120 kaynak ve 120 soru repoya eklendi (`352c2cb`). |
| 2026-08-11 | Ders rotası düzeltmesi | `[hafta]/[ders]` rota parametreleri servis sorgusuyla eşleştirildi; 404 giderildi (`eeb0e19`). |
| 2026-08-11 | Süreç günlüğü tasarımı | Yaşayan günlük yapısı ve fazlara ayrılmış yol haritası tasarlandı (`a9b2103`, `2711207`). |
| 2026-08-11 | Faz 0 — Doğrulama | Migration, idempotent seed, üretim derlemesi ve rota kontrolleri gerçek çıktılarıyla kaydedildi; üretimdeki auth hatası bulunup giderildi (`d6b110b`). |
| 2026-08-11 | Faz 2C — Topluluk duyarlılığı | Sentiment mock'u Postgres/Drizzle şemasına, dinamik sorgulara ve idempotent seed'e taşındı; `/topluluk` dinamik render ediliyor (`4520e57`, `0d97dcc`, `72861b2`, `e8d9bc1`, `3f4bfba`). |
| 2026-08-11 | Faz 2D — Günlük video | Panel mock'tan doğrulanmış ders videolarına geçti; YouTube Data API gerekçesiyle kapsam dışı bırakıldı (`3c64c45`). |
| 2026-08-11 | Faz 2F — Piyasa verisi | Fiyatlar Finnhub'a bağlandı; ücretsiz katmanda mum uçları kapalı olduğu için geçmiş worker tarafından biriktiriliyor, endeks/emtia/FX ETF vekiliyle izleniyor (`2d7b753`). |
| 2026-08-11 | Teknik borç — Drizzle zinciri | Yedi migration `0000_baseline.sql`'de toplandı, snapshot zinciri yeniden üretildi; `generate` artık TTY istemiyor. 2C/2F commit sınırları ayrıştırıldı (`218eaa5`). |

## Bundan sonra yapılacaklar

### Faz 0 — Mevcut sürümü sağlamlaştırma

**Amaç:** Commit'li ürün durumunu yeniden üretilebilir biçimde doğrulamak ve
operasyonel belgeleri gerçek kod durumuyla eşitlemek.

**Durum:** Aktif. Kod ve veri doğrulaması **bitti** — typecheck, lint, migration,
idempotent seed, üretim derlemesi ve oturumlu/oturumsuz rota kontrolleri gerçek
çıktılarıyla kaydedildi. Geriye dokümantasyon ve çalışma ağacı eşitlemesi kaldı.

**Bağımlılıklar:** Taşınabilir Postgres'in erişilebilir olması ve kullanıcıya
ait çalışma ağacı dosyalarının korunması. (Önceki turu durduran Node/Windows
`uv_os_get_passwd` `ENOMEM` hatası bu turda tekrarlamadı.)

**Konu — Kod ve veri doğrulaması**

- [x] `npm run typecheck` çalıştır ve sonucu kaydet.
- [x] `npm run lint` çalıştır; mevcut uyarıları başarıdan ayrı göster.
- [x] `npm run db:status`, migration ve idempotent seed turunu çalıştır.
- [x] Seed sonucuyla ders, kaynak, soru ve ön koşul sayılarını kesinleştir.
- [x] Uygulamayı üretim derlemesi ve temel rota kontrolleriyle doğrula.

**Konu — Dokümantasyon ve çalışma ağacı**

-


**Tamamlanma ölçütü:** Typecheck, lint, build, migration ve seed sonuçları
kaydedilmiş; çekirdek durum belgeleri Git ile tutarlı; çalışma ağacındaki
dosyaların sahipliği ve kapsamı açık.

### Faz 2C — Topluluk duyarlılığı

**Amaç:** Topluluk gönderilerini, anlık duyarlılık özetini ve ticker trendlerini
mock yerine Postgres/Drizzle verisinden dinamik ve belirlenimci olarak sunmak.

**Durum:** **Bitti** (2026-08-11). Servis Postgres sorgularına geçti, sayfa
force-dynamic oldu ve sentiment mock'u kaldırıldı.

**Bağımlılıklar:** Yok. Bu faz canlı Reddit API çekimi değil, onaylanan altı
referans gönderiyle akan ve yeniden üretilebilir bir veritabanı simülasyonudur.

**Konu — Tasarım ve veri modeli**

- [x] Tasarım ve uygulama planını yaz, kullanıcı onaylarıyla yürüt.
- [x] `sentiment_label`, `communities`, `community_posts` ve `post_tickers`
  şemasını FK, index ve migration'la kur.
- [x] Gönderi-ticker N:M ilişkisini ayrı sorgu ve `Map` ile eşle.

**Konu — Sorgu, seed ve ürünleştirme**

- [x] Gönderi zamanını `Date.now()` ve `minutesAgoOffset` ile canlı üret.
- [x] 24 saatlik özet ve iki dönemli deterministic ticker trendini sorgu anında
  hesapla.
- [x] Dört topluluğu, altı gönderiyi ve yedi ticker bağlantısını idempotent seed
  et; ikinci seed turunda yeni kayıt sayısını sıfırla doğrula.
- [x] `sentiment.ts` servisini Postgres'e geçir, `/topluluk` sayfasını dinamik yap
  ve `src/mocks/index.ts` dosyasını kaldır.

**Tamamlanma ölçütü:** Karşılandı — mock importu kalmadı; migration, iki seed
turu, servis smoke testi, yedi otomatik test, typecheck, lint ve production build
gerçek çıktılarla doğrulandı.

Tasarım ve plan:
[2026-08-11-faz-2c-topluluk-duygu-analizi-design.md](docs/superpowers/specs/2026-08-11-faz-2c-topluluk-duygu-analizi-design.md),
[2026-08-11-faz-2c-topluluk-duygu-analizi.md](docs/superpowers/plans/2026-08-11-faz-2c-topluluk-duygu-analizi.md)

### Faz 2D — Video ve akademi kaynaklarını sonlandırma

**Amaç:** Günlük video özelliğinin gerçekten YouTube Data API gerektirip
gerektirmediğini karara bağlamak; akademi kaynak deneyimini eksiksiz kapatmak.

**Durum:** **Bitti** (2026-08-11). Günlük video paneli korundu, kaynağı
derslerin doğrulanmış YouTube kaynaklarına çevrildi; YouTube Data API
entegrasyonu gerekçesiyle kapsam dışı bırakıldı.

**Bağımlılıklar:** Yok. `YOUTUBE_API_KEY` gerekmiyor.

**Konu — Ürün kararı**

- [x] Günlük video panelinin korunması, akademi kaynaklarına dönüştürülmesi veya
  kaldırılması seçeneklerini değerlendir.
- [x] Otomatik keşif gerekmiyorsa Data API entegrasyonunu gereksiz kapsam olarak
  kapat ve mock paneli kaldır ya da gerçek ders kaynaklarına bağla.

**Konu — Gerekirse entegrasyon**

- [x] ~~Kota, kanal güvenilirliği, yenileme sıklığı ve eşleştirme ölçütleri~~ —
  Data API kapsam dışı bırakıldığı için gereksiz.
- [x] ~~YouTube çekimini worker desenine ekle~~ — gereksiz; `video.ts` yine de
  Postgres'e geçti, kaynağı `lesson_sources`.

**Tamamlanma ölçütü:** Karşılandı — `video.ts` mock import etmiyor, günlük alan
doğrulanmış ders kaynaklarından besleniyor.

Tasarım ve gerekçe: [2026-08-11-faz2d-gunluk-video.md](docs/superpowers/plans/2026-08-11-faz2d-gunluk-video.md)

### Faz 2F — Gerçek piyasa verisi

**Amaç:** Piyasa kartlarındaki mock fiyatları gerçek bir veri kaynağıyla
değiştirmek.

**Kapsam düzeltmesi:** Fazın özgün amacı "üst ticker ve piyasa kartları"
diyordu; **üst ticker'da fiyat yok.** `TickerItem` `{id, label, headline,
isBreaking}` taşıyor ve `getTickerItems` son makalelerden türüyor — zaten
Postgres'ten gelen gerçek veri. Fazın tek tüketicisi `MarketOverview`.

**Durum:** **Bitti** (2026-08-11). `market.ts` Postgres'ten okuyor, worker
Finnhub'dan çekiyor, mock katmanı tamamen kalktı.

**Bağımlılıklar:** `FINNHUB_API_KEY` (ücretsiz). Worker çalışmazsa kartlar boş
kalır; sayfa kendi çekim yapmaz.

**Konu — Sağlayıcı ve sözleşme**

- [x] Sağlayıcıları kapsam, gecikme, kota ve kullanım hakkına göre karşılaştır.
- [x] Fiyat, değişim, sparkline zaman aralığı ve bayat veri davranışını
  kesinleştir.

**Konu — Entegrasyon**

- [x] Çekim modelini seç; migration ve sorgu katmanını ekle.
- [x] `market.ts` servisini gerçek veriye geçir ve hata durumlarını doğrula.

**Alınan kararlar**

| Konu | Karar |
|---|---|
| Sağlayıcı | Finnhub, ücretsiz katman |
| Endeks/emtia/FX | ETF vekili — gerçek endeks değerleri lisanslı veri |
| Sparkline | 30 günlük günlük kapanış, **worker biriktiriyor** |
| Çekim | Worker + Postgres; request path'inde çekim yok |

Sembol kümesi: `SPY` (S&P 500), `QQQ` (Nasdaq 100), `GLD` (altın), `FXE`
(EUR/USD) ve `BTC` (`BINANCE:BTCUSDT`). Dördü vekil; vekillik `proxyFor` ile
arayüze kadar taşınıyor.

**Tamamlanma ölçütü:** Karşılandı — `market.ts` mock import etmiyor, kartlar
gerçek ve zaman damgalı veri gösteriyor, sağlayıcı hatası paneli düşürmüyor
(kısmi sonuç yazılıyor, son bilinen veri kalıyor).

Tasarım, ölçüm sonuçları ve bilinen sınırlar:
[2026-08-11-faz2f-piyasa-verisi.md](docs/superpowers/plans/2026-08-11-faz2f-piyasa-verisi.md)

### Faz 3 — Ürün bütünlüğü ve kalite

**Amaç:** Gerçek veri dilimleri tamamlandıktan sonra ürünü sistematik test,
erişilebilirlik, güvenlik, performans ve hata toleransı açısından sağlamlaştırmak.

**Durum:** Planlanmış; gerçek veri fazlarına bağlı.

**Bağımlılıklar:** Faz 2C, 2D kararı ve Faz 2F'nin kapanması.

**Konu — Test ve kullanıcı durumları**

- [ ] Vitest/Testing Library altyapısını kur; servis, içerik ve kritik bileşen
  davranışlarını kapsa.
- [ ] Kritik giriş, haber ve akademi akışları için E2E kontrolleri ekle.
- [ ] Hata, boş, yüklenme, bayat veri ve yetkisiz erişim durumlarını tamamla.

**Konu — Kalite kapısı**

- [ ] Klavye, odak, ekran okuyucu, kontrast ve azaltılmış hareket kontrollerini
  tüm rotalarda çalıştır.
- [ ] Performans, güvenlik başlıkları, bağımlılık açıkları ve veri saklama
  risklerini değerlendir.

**Tamamlanma ölçütü:** Otomatik test paketi ve temel E2E akışları geçiyor;
erişilebilirlik, güvenlik ve performans bulguları kapatılmış veya gerekçeli
olarak kayıt altına alınmış.

### Faz 4 — Dağıtım kararı ve operasyon

**Amaç:** Localhost-only geliştirme kararını bilinçli biçimde sürdürmek veya
uygulamayı kalıcı bir çalışma ortamına taşımak.

**Durum:** Öneri aşamasında; deployment hedefi seçilmedi.

**Bağımlılıklar:** Worker yükü, Postgres kapasitesi, gizli anahtar yönetimi,
yedekleme ihtiyacı ve tek kullanıcı erişim modeli.

**Konu — Hedef ve mimari**

- [ ] Localhost, VPS, Fly.io ve Railway benzeri seçenekleri web + sürekli
  worker + Postgres gereksinimleriyle karşılaştır.
- [ ] Seçilen hedef için süreç yönetimi, migration, yedekleme, gözlemleme ve
  gizli anahtar akışını tasarla.

**Konu — Yayına alma**

- [ ] Tekrarlanabilir kurulum ve geri dönüş prosedürünü yaz.
- [ ] Üretim doğrulama turunu ve operasyon kontrol listesini çalıştır.

**Tamamlanma ölçütü:** Dağıtım hedefi gerekçeli olarak seçilmiş veya localhost
kararı yeniden onaylanmış; seçildiyse web, worker ve Postgres için belgelenmiş,
doğrulanmış operasyon akışı var.

## Açık kararlar ve sorunlar

| Konu | Güncel durum | Kapanması için gereken |
|---|---|---|
| Canlı Reddit erişimi | Faz 2C'nin Postgres tabanlı belirlenimci simülasyonu tamamlandı; canlı API çekimi bu fazın kapsamında değildi. | Canlı veri istenirse API erişimi, saklama politikası ve worker akışı için ayrı tasarım → plan → uygulama turu. |
| Piyasa sparkline'ı boş başlıyor | Finnhub'ın ücretsiz katmanında mum uçları 403; geçmiş worker tarafından günde bir nokta biriktiriliyor ve 30 günde doluyor. Kart o zamana kadar "Geçmiş birikiyor" yazıyor. | Zaman, ya da geçmiş serisi veren ikinci bir kaynak kararı. |
| Piyasa vekil sembolleri | Endeks değerleri lisanslı, ücretsiz katmanda forex kapalı; SPX/NDX/XAU/EURUSD yerine SPY/QQQ/GLD/FXE izleniyor. Fiyat ölçekleri asıllarından farklı. | Gerçek endeks/kur değeri istenirse lisanslı sağlayıcı kararı. |
| Deployment | Uygulama şimdilik localhost-only. | Worker/Postgres'e uygun hedef ve operasyon modeli. Worker artık piyasa için de gerekli: çalışmazsa kartlar boş kalır. |
| Akademi soruları arayüzde yok | 120 soru ve AI değerlendirme kodu var ama ders sayfası soru basmıyor; `degerlendir.ts` çağrılmıyor. Akademi şu an "okunur" bir ürün. | Soru/cevap arayüzü ve değerlendirmeyi tetikleyen server action için ayrı tasarım → plan → uygulama turu. |
| Üretim derlemesi ve webpack önbelleği | Kaynak değişikliğinden sonraki `next build` webpack kalıcı önbelleğinde `WasmHash` `TypeError` ile çöküyor; önbellek proje kökündeki 532 junction'ı (`.adal`, `.claude/skills`, `skills/`, `agent/`, `data/`) tarıyor. Temiz `.next` ile derleme geçiyor. | Ajan araç klasörlerini proje kökünden çıkarmak ya da webpack anlık görüntüsünden dışlamak; kalıcı çözüme kadar üretim derlemesi öncesi `.next` silinir. |
| Durum belgeleri | Bazı Memory Bank dosyaları auth'u bekliyor, akademiyi yazılmamış veya Git'i kurulmamış gösteriyor. | Faz 0 dokümantasyon eşitlemesi. |
| Lint tabanı | Komut başarılı fakat 12 CSS uyarısı var. | Bilinçli erişilebilirlik istisnalarını yapılandır, kalanları düzelt. |
| Bağımlılık uyarıları | Next 15 zincirinde 3 high-severity audit uyarısı daha önce kabul edildi. | Next 16 geçişiyle birlikte yeniden değerlendirme. |

## Çalışma kuralları

- Kod, yorumlar, değişken adları, dokümantasyon ve arayüz metni Türkçedir;
  İngilizce yalnız kütüphane API'leri, DB kolonları ve kaynak içerikte kullanılır.
- Sayfalar veriye yalnız `src/server/services/` üzerinden erişir; bileşenler veri
  çekmez, DB veya mock import etmez.
- Ders gövdelerinin tek doğruluk kaynağı `content/akademi/` altındaki
  `NN-slug.md` dosyalarıdır. Slug ve ön koşul değişiklikleri ilişkileriyle
  birlikte ele alınır.
- Sorular sil-yaz yapılmaz; kullanıcı cevapları ve AI geri bildirimi korunur.
- Harici veri çekimi request path'inden ayrıdır; bir kaynağın hatası paneli veya
  diğer kaynakları durdurmaz.
- Her ürün fazı ayrı tasarım → plan → uygulama turu alır ve sonunda kullanıcı
  onayı için durulur.
- Kullanıcıya ait mevcut çalışma ağacı değişiklikleri değiştirilmez veya ilgisiz
  commit'lere alınmaz.
- Bir iş ancak gerçek doğrulama sonucuyla tamamlandı olarak kaydedilir. Kod
  değişikliklerinde en az `npm run format`, `npm run typecheck` ve `npm run lint`
  çalıştırılır; başarısızlık ve uyarılar gizlenmez.
- TypeScript 5.x ve Next 15 mevcut kararlardır; zorlayıcı dependency düzeltmeleri
  bu kararlar gözden geçirilmeden uygulanmaz.

## Kronolojik süreç günlüğü

### 2026-08-11 — Teknik borç: Drizzle zinciri ve commit sınırları onarıldı

**Amaç:** `drizzle-kit generate`'i otonom ortamda çalışabilir hale getirmek ve
2C/2F commit sınırlarındaki karışmayı düzeltmek.

**Sorun 1 — generate TTY istiyordu.** Her çalıştırmada "Interactive prompts
require a TTY terminal" ile çöküyordu. Kök neden metadata zincirinin 0004'te
kopması: `0004_snapshot.json` hiç üretilmemiş (0004 elle yazılmıştı) ve
`0005_snapshot.json` yeniden adlandırma **öncesi** durumu anlatıyordu — hâlâ
`tracks`/`steps` içeriyor, `weeks`/`lessons`'ı da topluluk tablolarını da
bilmiyordu. Generator `schema.ts`'i 0003 dönemine ait bir snapshot'la
karşılaştırıp "tracks silindi mi, weeks'e mi dönüştü?" diye sormak zorunda
kalıyordu.

**Çözüm:** Yedi migration tek `0000_baseline.sql` içinde toplandı, snapshot
zinciri `schema.ts`'ten yeniden üretildi. Veritabanı defteri yedi kayıttan tek
baseline kaydına indirildi; hash drizzle'ın kendi algoritmasıyla (dosya
içeriğinin sha256'sı) hesaplandığı için `db:migrate` baseline'ı yeniden
çalıştırmaya kalkmıyor. Eski migration'lar git geçmişinde duruyor — tek
geliştiricili ve push edilmemiş bir depoda ara adımları korumanın karşılığı
yoktu.

**Sorun 2 — 2C commit'leri 2F kodunu içeriyordu.** `274a663` (2C şeması)
`marketQuotes`/`marketDaily` tanımlarını da taşıyordu. Hiçbir şey push
edilmediği için geçmiş yeniden yazıldı: ayrı bir worktree'de sekiz commit
replay edildi, piyasa şeması 2C commit'inden çıkarılıp 2F commit'ine taşındı.

**Güvenlik önlemi:** Yeniden yazma öncesi `yedek-onarim-oncesi` etiketi atıldı
ve sonuçta **ağaç hash'lerinin birebir aynı olduğu** doğrulandı
(`949be177…`) — yani içerik kayıpsız, yalnız commit sınırları değişti. Çalışma
ağacına hiç dokunulmadı; dal işaretçisi `reset --soft` ile taşındı.

**Doğrulama:**

- `db:migrate` → exit 0, no-op. `db:generate` → exit 0, "No schema changes",
  hiç soru sormadan.
- Mevcut veritabanının yapısı değişmedi (134 kolonluk `information_schema`
  dökümü birebir aynı); veri duruyor: 135 makale, 40 ders, 120 soru, 70 ön
  koşul, 4 topluluk, 6 gönderi, 5 piyasa sembolü, 1 kullanıcı.
- **Sıfırdan kurulan veritabanı sınandı:** boş bir DB'ye yalnız baseline
  uygulandığında ortaya çıkan yapı mevcut veritabanıyla birebir aynı.
- `git diff yedek-onarim-oncesi HEAD` → boş.

### 2026-08-11 — Faz 2F: piyasa verisi Finnhub'a bağlandı

**Amaç:** Piyasa kartlarındaki mock fiyatları gerçek veriyle değiştirmek.

**Önce kapsam düzeltildi.** Fazın amaç cümlesi "üst ticker ve piyasa
kartlarındaki mock fiyatlar" diyordu; üst ticker'da fiyat yok — `TickerItem`
başlık taşıyor ve zaten haberlerden besleniyor. Gerçek kapsam tek tüketiciydi.

**Sağlayıcı seçimi ölçümle yapıldı, varsayımla değil.** Alpha Vantage'ın 25
istek/gün kotası 15 dakikalık worker'ın 96 turuna yetmiyordu. Twelve Data'nın
kotası yeterliydi ama lisans dili "internal non-display usage" — veriyi ekranda
göstermeyi kapsamayabilir. Finnhub'ın ücretsiz katmanı açıkça "kişisel, ticari
olmayan kullanım" diyor ve bu uygulama tam olarak öyle.

**Yoklama iki varsayımı çürüttü:**

```
/quote  SPY, QQQ, GLD, FXE, BINANCE:BTCUSDT   → 200
/quote  OANDA:EUR_USD                          → 403
/stock|crypto|forex/candle, /forex/rates       → 403
```

1. **Mum uçlarının hepsi kapalı.** "30 günlük kapanışı sağlayıcıdan çekeriz"
   planı geçersizdi. Geçmişi worker biriktiriyor: `market_daily` gün başına tek
   satır tutuyor, gün içinde kapanış son görülen fiyat demek, gün bitince donuyor.
   Tur başına satır yazılsaydı günde 96 × 5 satır birikirdi ve sparkline yine
   günlük seri isterdi.
2. **Forex tamamen kapalı**, `/quote` bile. EUR/USD de ETF vekiline (`FXE`)
   düştü. Buna karşılık kripto `/quote`'un çalışması belgelenmemiş bir davranıştı
   — ölçülmeseydi BTC de kaybedilirdi.

Endeks ve emtia zaten vekildi: gerçek endeks değerleri lisanslı veri, bu yüzden
SPX→SPY, NDX→QQQ, XAU→GLD. Vekillik `proxyFor` ile arayüze taşınıyor; kart
"S&P 500" deyip 773 gösterirse yalan söyler, "S&P 500 ETF · S&P 500 yerine"
diyor.

**Yol boyunca çıkan iki hata:**

- `FXE` şemada `fx` işaretlenmişti ve `priceDigits` dört ondalık basıp
  "106,5100" gibi kur görüntüsü üretiyordu. FXE bir hisse ETF'i, fiyatı kur
  değil — `equity` yapıldı. `assetType` ayrıca `TodayBrief`'in manşet varlığı
  seçiminde kullanılıyor, o yüzden SPY/QQQ `index` kaldı.
- Sparkline iki noktaya ulaşmadan `null` dönüp kartta açıklamasız boşluk
  bırakıyordu. Seri birikene kadar "Geçmiş birikiyor" yazıyor.

**Doğrulama:**

- Worker turu 5/5 sembolü yazdı; ikinci tur `market_daily`'yi 5 satırda tuttu
  (idempotent) ve `fetched_at` güncellendi.
- format/typecheck/lint exit 0 (yalnız 12 mevcut CSS uyarısı), temiz build 0.
- Oturumlu panelde beş kart gerçek fiyatla basılıyor (SPY 773,03 · QQQ 720,87 ·
  GLD 402,54 · BTC 64.340 · FXE 106,51), vekil etiketleri görünüyor, eski mock
  sembolleri (SPX/NDX/XAU/EURUSD) sıfır.
- Doğrulama için açılan geçici hesap ve iki geçici betik silindi.

### 2026-08-11 — Faz 2C: topluluk duyarlılığının Postgres'e taşınması

**Amaç:** `src/server/services/sentiment.ts` içindeki mock bağımlılığını tamamen
kesmek; topluluk gönderilerini, anlık özeti ve ticker trendlerini Postgres/Drizzle
üzerinden canlı zamanlı ve belirlenimci üretmek.

**Yapılanlar ve kararlar:**

- Onaylı tasarım ve uygulama planı sırasıyla `4600e64` ve `b10f31d` commitleriyle
  kaydedildi; uygulama kullanıcı tercihiyle aynı oturumda inline yürütüldü.
- `sentiment_label`, `communities`, `community_posts` ve `post_tickers` şeması
  `0005_community_sentiment.sql` migration'ıyla eklendi. Bütün mevcut timestamp
  çağrılarının timezone kuralı korundu.
- Gönderiler toplulukla çekiliyor; ticker'lar ayrı N:M sorgusu ve `Map` ile
  eşleniyor. Boş kimlik dizisinde `inArray()` çağrılmıyor.
- `postedAt`, tek `Date.now()` referansından `minutesAgoOffset` çıkarılarak her
  istekte yeniden üretiliyor. 24 saatlik özet ve iki dönemli mention değişimi
  ham satır sızdırmadan `SentimentSummary` ve `TickerSentiment[]` sözleşmelerine
  dönüştürülüyor.
- Servis üç yeni sorguya bağlandı ve `/topluluk` için `force-dynamic` eklendi.
- Çalışan seed giriş noktası olan `scripts/seed.ts`, dört topluluk, altı gönderi
  ve yedi ticker bağlantısını `onConflictDoNothing` ile yazacak şekilde
  güncellendi. Artık başka mock kalmadığı için `src/mocks/index.ts` silindi.
- Canlı Reddit API/worker entegrasyonu yapılmadı; onaylanan kapsam, orijinal altı
  gönderinin veritabanından beslediği belirlenimci canlı simülasyondur.

**Doğrulama:**

- TDD kırmızı/yeşil döngülerinden sonra 7/7 Node testi geçti.
- Migration gerçek yerel Postgres'e uygulandı. İlk seed 4 topluluk, 6 gönderi ve
  7 köprü ekledi; ikinci seed 0/0/0 yeni sentiment kaydı üretti.
- Servis smoke testi 6 gönderi, 6 gönderilik özet ve 5 trend ticker döndürdü;
  anlık skor `-0.0583`, etiket `bearish` oldu.
- `npm run format`, `npm run typecheck` ve `npm run lint` exit 0 verdi. Lint,
  reduced-motion CSS'indeki 12 mevcut uyarıyı korudu.
- Doğrulanmış `.next` hedefi temizlendikten sonra ağ erişimli `npm run build`
  exit 0 verdi; `/topluluk` rota tablosunda `ƒ Dynamic` göründü. Mevcut
  Auth.js/jose Edge Runtime uyarıları gizlenmedi.

**Commitler:** Şema/migration `4520e57`, sorgular `0d97dcc`, servis/sayfa
`72861b2`, seed/mock temizliği `e8d9bc1`, son lint düzeni `3f4bfba`.
(Hash'ler teknik borç onarımında geçmiş yeniden yazıldığı için değişti; önceki
karşılıkları `274a663`, `2c5a7bb`, `d074075`, `87b4fe7`, `721c2b3` idi.)

**Sıradaki adım:** Kullanıcı Faz 2C sonucunu onayladıktan sonra kalan yol haritası
Faz 0 belge eşitlemesi, Faz 2F piyasa çalışması ve akademi soru/cevap arayüzüdür.

### 2026-08-11 — Faz 0: süreç günlüğü planının SDD ile yürütülmesi

**Amaç:** `superpowers:executing-plans` isteğiyle süreç günlüğü planını kullanıcıya
ait çalışma ağacını ve eşzamanlı ajan işlerini koruyarak yürütmek; uygulama,
inceleme ve bitirme kanıtlarını kalıcı kayda geçirmek.

**Kapsam ve faz sahipliği:** Bu çalışma bir ürün entegrasyonu değil, **Faz 0 —
dokümantasyon ve çalışma ağacı eşitlemesi** işidir. Faz 2D bu çalışma tarafından
uygulanmadı; başka ajanın `3c64c45` commit'iyle video servisini mock'tan
doğrulanmış ders kaynaklarına geçirdiği Git gerçeği yalnız eski planla
uzlaştırıldı ve belgeye doğru yansıtıldı. Faz 2C kodu veya diğer ürün fazları bu
çalışmaya atfedilmez.

**Yapılanlar ve kararlar:**

- `superpowers:executing-plans` zaten kurulu olduğu için indirme yapılmadı;
  `using-superpowers`, `using-git-worktrees` ve `subagent-driven-development`
  akışları yüklendi.
- Kullanıcının kirli ana checkout'unu korumak için `d6b110b` tabanından
  `codex/surec-gunlugu-plan` branch'i ve geçici izole worktree oluşturuldu.
  Kullanıcı, ana checkout'taki gelişmiş günlüğün korunmasını ve güncel Git
  gerçeğinin eski brief varsayımlarının önüne geçmesini onayladı.
- İzole worktree'de `npm install` 132 paket kurdu; audit 4 moderate ve 3 high
  mevcut bağımlılık uyarısı bildirdi. Zorlayıcı `npm audit fix --force`
  çalıştırılmadı.
- Başlangıçta `npm run typecheck` exit 0 verdi. `npm run lint` exit 0 verdi ve
  `src/app/globals.css` içindeki 12 mevcut CSS uyarısını korudu. Windows
  `core.autocrlf`/stat önbelleğinin içerik farkı olmayan dosyaları yanlış `M`
  göstermesi nedeniyle bütün stage ve commit işlemleri hedef yola özel yapıldı.
- Implementer `2b167ab` ile günlüğü ekledi. Bağımsız task review faz
  hiyerarşisi, Faz 2D karar kaydı, gerçek komut sonuçları ve 8/40/120/120/70
  kilometre taşı eksiklerini buldu; fix round 1 bunları `dba9805` ile kapattı.
- Scoped re-review dört bulgunun tamamını kapattı. En güçlü modelle yapılan
  bütün-branch review kritik/önemli bulgu bulmadı ve `Ready to merge: Yes`
  verdi. Tek minor commit izlenebilirliği bulgusu `37cf426` ile düzeltildi;
  final scoped re-review temiz döndü.
- Son doğrulamada UTF-8 okuma, yasaklı kalıp taraması, altı fazın meta/hiyerarşi
  sayımları ve `git diff --check` başarılıydı; değişiklik kapsamı yalnız
  `SUREC-GUNLUGU.md` idi. `typecheck` ve `lint` yeniden exit 0 verdi; aynı 12
  CSS uyarısı sürdü.
- Plan-özel SDD brief/ledger/review paketleri final review sonrasında silindi;
  kalıcı kanıt üç Git commit'inde kaldı. Geçici worktree ve branch korunuyor.
- Bitirme sırasında ana branch başka Codex/Claude çalışmalarıyla ilerledi ve ana
  `SUREC-GUNLUGU.md` izole kopyadan önemli ölçüde ayrıştı. Merge veya PR diğer
  ajanların güncel içeriğini ezebileceği için yapılmadı; en güvenli seçenek olan
  branch'i olduğu gibi koruma seçildi.
- Bu kaydın kısa tasarımı `672b433` commit'iyle
  `docs/superpowers/specs/2026-08-11-faz0-sdd-gunluk-kaydi-design.md` dosyasına
  alındı.
- Uygulama adımları
  `docs/superpowers/plans/2026-08-11-faz0-sdd-gunluk-kaydi.md` dosyasına
  yazıldı; kullanıcı uygulama yöntemi olarak fresh implementer ve bağımsız
  review içeren Subagent-Driven seçeneğini seçti.

**Değişen ve üretilen kayıtlar:** İzole branch'te `SUREC-GUNLUGU.md`
(`2b167ab`, `dba9805`, `37cf426`); ana branch'te günlük kaydı tasarımı
(`672b433`), uygulama planı ve bu ana kronolojik kayıt. Kullanıcıya veya diğer
ajanlara ait başka dosya bu çalışma kapsamında değiştirilmedi.

**Doğrulama:** İzole çalışma ve review turlarında `Get-Content -Encoding UTF8`,
`Select-String`, `git diff --check`, `git diff-tree`, `npm run typecheck` ve
`npm run lint` çalıştırıldı. Sonuçlar: UTF-8 başlık doğru, yasaklı eski kalıp 0,
diff whitespace hatası 0, typecheck exit 0, lint exit 0 ve 12 mevcut CSS
uyarısı. Üç izole branch commit'i yalnız `SUREC-GUNLUGU.md` dosyasını değiştirdi.

**Sıradaki adım:** Diğer ajanların Faz 2C ve ilgili eşzamanlı işleri bittikten
sonra ana günlük ile `codex/surec-gunlugu-plan` branch'i seçici olarak
karşılaştırılmalı; yalnız eksik kanıtlar taşınmalı, ardından UTF-8, kapsam,
typecheck ve lint kontrolleri yeniden çalıştırılmalıdır.

### 2026-08-11 — Faz 2D: günlük video ders kaynaklarına bağlandı

**Amaç:** Günlük video panelinin YouTube Data API gerektirip gerektirmediğini
karara bağlamak ve alanı mock'tan kurtarmak.

**Karar:** Panel korunur, kaynağı derslerin doğrulanmış YouTube kaynaklarına
çevrilir; Data API **kapsam dışı** bırakılır. Gerekçe: otomatik keşif ancak
video kümesi açık uçluysa kazandırır. Buradaki küme sabit — 8 haftalık müfredat
elle araştırıldı, 40 videonun kimliği repoda duruyor ve seed URL'yi çözemezse
hata fırlatıyor. Data API kota, anahtar saklama, kanal güvenilirliği ve
yenileme sıklığı sorunlarını, çözmediğimiz bir problem için getirirdi.

**Teşhis — panel sanıldığından kötüydü:** `getDailyVideo()` tek sabit nesne
döndürüyordu; `youtubeId` alanı düz metin `"mock-video-id"`, `stepSlug` ise
Faz 1'den kalma ve artık **var olmayan** `portfoy-cesitlendirme`. `VideoCard`
ise atıldı: bağlantı yok, oynatıcı yok, `youtubeId`'yi hiç okumuyordu. Yani `/`
ve `/akademi` sayfalarında oynatılamayan, İngilizce başlıklı, ölü bir adıma
işaret eden bir süs duruyordu.

**Yapılanlar:**

- `VideoSuggestion` tipi gerçek veriye göre yeniden yazıldı. Eski tip mock'un
  şeklinden türemişti: `durationSec`, `publishedAt` ve `thumbnailUrl`
  alanlarının `lesson_sources` tarafında karşılığı yok.
- `findVideoSources()` eklendi: `kind = 'video'` ve `youtube_id` dolu kaynaklar,
  hafta → ders → kaynak sırasıyla. Sıra sabit tutuluyor, çünkü seçim indekse
  dayanıyor ve sıra oynarsa aynı gün içinde video değişirdi.
- Seçim **belirlenimci**: gün indeksi × 40 videoluk döngü. Rastgelelik reddedildi
  — her yenilemede değişen "günün videosu" öneri değil gürültü olurdu ve
  kullanıcı yarım bıraktığı videoyu geri bulamazdı.
- Gün sınırı Europe/Istanbul'a sabitlendi; sunucu UTC'de çalışırken yerel gece
  yarısı ile UTC gece yarısı ayrışıyordu.
- `VideoCard` tıklanabilir hale geldi ve ilgili derse götürüyor. Video kartta
  değil derste oynuyor: ikinci bir oynatıcı aynı işi tekrarlar ve kullanıcıyı
  dersin bağlamından koparırdı. Kapak görseli `VideoPlayer` ile aynı yolu
  izliyor (`i.ytimg.com`, düz `img`).
- `dailyVideo` mock'u silindi.

**Değişen dosyalar:** `src/types/index.ts`, `src/lib/db/queries/lesson.ts`,
`src/server/services/video.ts`, `src/components/academy/VideoCard.tsx`,
`src/mocks/index.ts` ve tasarım notu
`docs/superpowers/plans/2026-08-11-faz2d-gunluk-video.md`.

**Doğrulama:**

- `npm run format`, `npm run typecheck`, `npm run lint` → üçü de exit 0
  (lint'te yalnız 12 mevcut CSS uyarısı). Temiz `npm run build` → exit 0.
- Oturumlu `/` ve `/akademi`: kart gerçek videoyla basılıyor
  (`i.ytimg.com/vi/tIA_UtvRQQU`), bağlantı
  `/akademi/hafta-08/mali-baskinlik-ve-ftpl` adresine gidiyor, hedef ders 200
  dönüyor ve aynı videoyu içeriyor. Her iki sayfada `mock-video-id` kalıntısı 0.
- Belirlenimcilik: aynı gün üç istek → aynı video. Farklı günler → farklı
  videolar. Aynı gün farklı saatler → sabit. 21:00Z (İstanbul gece yarısı) →
  değişiyor. 2026-08-11 ile 2026-09-20 aynı videoya düşüyor: 40 günlük döngü
  beklendiği gibi.
- Doğrulama için açılan geçici hesap ve iki geçici betik silindi; `user` tablosu
  yeniden 1 satır.

**Sıradaki adım:** Faz 0'ın dokümantasyon ve çalışma ağacı konusu; ardından
kalan mock'lar (Faz 2C topluluk, Faz 2F piyasa) ve akademi sorularının arayüze
bağlanması.

### 2026-08-11 — Faz 0 kod ve veri doğrulaması

**Amaç:** Commit'li ürün durumunu çalışan veritabanı, üretim derlemesi ve
gerçek rota istekleriyle yeniden üretilebilir biçimde doğrulamak.

**Yapılanlar ve kararlar:**

- Önceki turu durduran `uv_os_get_passwd` `ENOMEM` hatası tekrarlamadı;
  `db:up`, `db:migrate` ve seed sorunsuz çalıştı.
- Seed **iki kez** çalıştırıldı, çıktı bit bazında aynı kaldı: idempotentlik
  iddiası artık gözlemle destekli.
- Sayılar seed çıktısıyla değil, doğrudan `psql` satır sayımıyla doğrulandı.
- 64/70 ön koşul farkı kapandı ve içerik hatası **çıkmadı**: eski statik sayım
  yalnız blok liste biçimini tanıyordu, satır içi `onkosul: [a, b]` biçimindeki
  6 bildirimi görmüyordu. 64 + 6 = 70.
- Üretim derlemesi iki gerçek hata ortaya çıkardı; ikisi de yalnız `next build`
  altında görünüyor, `next dev` ikisini de gizliyordu.

**Bulunan ve giderilen hata — üretimde kimlik doğrulama kırıktı:**

`next start` altında middleware her istekte `UntrustedHost` fırlatıyordu.
Korumalı rotaların `/giris`'e atılması "oturum yok" kararı değil, **auth
katmanının çökmesiydi**; `/api/auth/session` 500 dönüyordu. Auth.js v5 üretimde
`Host` başlığına varsayılan olarak güvenmiyor, geliştirmede güveniyor. Tek
kullanıcılı ve kendi sunucusunda çalışan bu uygulama için `src/auth.config.ts`
içine gerekçesiyle `trustHost: true` eklendi. Düzeltmeden sonra
`/api/auth/session` 200 + `null` dönüyor ve sunucu günlüğünde tek bir auth
hatası kalmadı.

**Bulunan, giderilmeyen sorun — webpack önbelleği üretim derlemesini çökertiyor:**

Kaynak değişikliğinden sonraki `next build`, webpack'in kalıcı önbelleğinde
`WasmHash._updateWithBuffer` içinde `TypeError: Cannot read properties of
undefined (reading 'length')` ile çöküyor. Kök neden A/B ile kanıtlandı: eski
`.next` → hata, temiz `.next` → derleme geçiyor, `config.cache = false` → üç
ardışık derleme de geçiyor. Önbellek dosyalarında proje kökündeki ajan araç
klasörleri (`.adal`, `.claude/skills`, `skills/`, `agent/`, `data/`) geçiyor;
kökte 532 junction var ve webpack anlık görüntü alırken bunları dolaşıyor.
Klasörler kullanıcıya ait olduğu için **taşınmadı**; açık sorunlara yazıldı.
Geçici kural: üretim derlemesi öncesi `.next` silinir.

**Bulunan, giderilmeyen boşluk — akademi soruları arayüzde yok:**

Veritabanında 120 soru var, `degerlendir.ts` yazılmış, ama ders sayfası hiç soru
basmıyor ve `degerlendir.ts` kod tabanında **hiçbir yerden çağrılmıyor**
(giriş dışında server action da yok). Akademi şu an okunur bir ürün; belgelerin
"soru, cevap ve AI değerlendirme katmanları vardır" ifadesi yalnız veri katmanı
için doğruydu, bu ayrım günlüğe işlendi.

**Değişen önemli dosyalar:** `src/auth.config.ts` (`trustHost`) ve bu günlük.
`next.config.ts` yalnız tanı amacıyla geçici olarak değiştirildi, deney bitince
geri alındı; çalışma ağacında izi yok.

**Doğrulama:**

- `npm run db:status` → çalışıyor (PID 11104); `db:migrate` → uygulandı.
- `npm run seed` ×2 → her ikisinde 40 ders, 120 kaynak, 120 soru, 70 ön koşul.
- `psql` satır sayımı: weeks 8, lessons 40, lesson_sources 120,
  lesson_prompts 120, lesson_prerequisites 70, sources 8, tickers 10,
  articles 0.
- `npm run typecheck` → exit 0. `npm run lint` → exit 0, 12 mevcut CSS uyarısı.
- `npm run build` (temiz `.next`) → exit 0, 9 rota derlendi.
- Oturumsuz rotalar: `/giris` 200, korumalı rotalar 302 → `/giris?donus=…`,
  `/api/auth/session` 200 + `null`.
- Oturumlu rotalar (geçici hesapla): `/` 200, `/akademi` 200, `/haberler` 200,
  `/topluluk` 200, `hafta-01` ve `hafta-08` ders sayfaları 200 ve gerçek başlık
  + gövde + kaynak basıyor; olmayan slug 404.
- Doğrulama için açılan geçici hesap ve betik iş sonunda **silindi**; `user`
  tablosu yeniden 1 satır.

**Sıradaki adım:** Faz 0'ın dokümantasyon ve çalışma ağacı konusu — çekirdek
durum belgelerini Git ile eşitlemek ve `trustHost` düzeltmesini ayrı commit'e
almak.

### 2026-08-11 — Süreç günlüğünün kurulması

**Amaç:** Projenin doğrulanmış geçmişini, güncel durumunu ve faz/konu/görev
hiyerarşisindeki gelecek yol haritasını yaşayan tek belgede toplamak.

**Kaynaklar:** Git geçmişi ve çalışma ağacı; [CLAUDE.md](CLAUDE.md); Memory Bank
çekirdek dosyaları; [süreç günlüğü tasarımı](docs/superpowers/specs/2026-08-11-surec-gunlugu-design.md)
ve [uygulama planı](docs/superpowers/plans/2026-08-11-surec-gunlugu.md).

**Yapılanlar ve kararlar:**

- Eski Memory Bank durumları Git geçmişiyle karşılaştırıldı; auth, akademi
  yapısı ve 40 dersin tamamlanmış/commit'li olduğu esas alındı.
- Yol haritası Faz 0, Faz 2C, Faz 2D, Faz 2F, Faz 3 ve Faz 4 olarak; her fazın
  içinde amaç, durum, bağımlılık, iş paketi ve tamamlanma ölçütüyle yazıldı.
- Güncel servislerin üçünde mock bağımlılığı kaldığı doğrudan kaynak koddan
  doğrulandı.
- Ön koşul sayısındaki belge/içerik farkı tamamlanmış gibi gösterilmedi; Faz 0
  doğrulama maddesine ve açık sorunlara alındı.
- Kullanıcıya ait mevcut Memory Bank, araç klasörleri, scriptler ve
  `skills-lock.json` değişikliklerine dokunulmadı.

**Değişen önemli dosyalar:** Günlük tasarımı
`docs/superpowers/specs/2026-08-11-surec-gunlugu-design.md`, uygulama planı
`docs/superpowers/plans/2026-08-11-surec-gunlugu.md` ve bu çalışma kaydı
`SUREC-GUNLUGU.md`.

**Doğrulama:**

- `git log --oneline --decorate --all`, `git status --short` ve
  `git branch --show-current`: dal ve kilometre taşları doğrulandı.
- `npm run typecheck`: başarılı, TypeScript hatası yok.
- `npm run lint`: exit code 0; `src/app/globals.css` içinde 12 mevcut CSS uyarısı
  raporlandı.
- Statik içerik sayımı: 40 ders, 120 kaynak, 120 soru ve 64 ön koşul bildirimi.
- `npm run db:status`: proje script'i başlamadan Node 24/Windows
  `uv_os_get_passwd` çağrısında `ENOMEM` ile durdu; DB/seed sonucu doğrulanamadı.
- Günlük dosyası UTF-8 olarak okundu; başlık ve Türkçe karakterler doğrulandı.
  Planın yasakladığı yer tutucu ve eski durum kalıpları bulunmadı; yalnız bu
  dosyaya uygulanan `git diff --check` exit code 0 verdi.

**Sıradaki adım:** Faz 0 sağlamlaştırma kapsamında belge bütünlüğü kontrollerini
tamamlamak, ardından Node/DB doğrulamasını çalışan bir ortamda tekrarlayıp
çekirdek durum belgelerini Git ile eşitlemek.
