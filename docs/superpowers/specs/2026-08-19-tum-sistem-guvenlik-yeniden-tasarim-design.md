# Tüm Sistem Güvenlik Yeniden Tasarım Tasarımı

**Tarih:** 2026-08-19

## Amaç

Finans Program'ın yerel çalıştırmasında veritabanı, backend ve frontend boyunca işlevsel davranışı kanıtlamak; güncel API ve veri sızıntısı tehditlerine göre tahribatsız güvenlik denetimi yapmak; yalnız kanıtlanan riskleri ve gerekli ortak korumaları mevcut katman sınırlarını koruyarak uygulamak.

## Kapsam ve yetki sınırı

- Hedef yalnız bu çalışma alanındaki uygulama, yerel PostgreSQL ve yerelde başlatılan Next.js sunucusudur.
- Denetim; kaynak kodu, bağımlılıklar, örnek yapılandırma, yerel HTTP yanıtları, oturum akışı ve tarayıcı yüzeyini içerir.
- Kapsam dışı: üretim/staging sistemleri, harici ağ taraması, parola denemesi, yük üretimi, veri silme/değiştirme ve gerçek sırların rapora yazılması.
- Çalışma ağacındaki önceden var olan değişiklikler bu işin girdisidir; değişiklik sahipliği belirsiz dosyalar yalnız okunur.

## Mevcut mimari

Uygulama Next.js App Router, React, TypeScript, Drizzle ORM/PostgreSQL ve Auth.js Credentials kullanır. Katman sözleşmesi `page -> src/server/services -> src/lib/db/queries` akışını; dış dünya erişimini `src/server/integrations/` altında; AI erişimini `src/server/ai/` altında tutar. Varlığı görünen HTTP API yüzeyi Auth.js handler'ıdır; başka veri akışları SSR sayfaları ve Server Action üzerinden gerçekleşir.

Bu nedenle denetim Route Handler taramasıyla sınırlanamaz. Server Component, Server Action, servis, sorgu, entegrasyon ve istemci prop zinciri aynı veri yolu içinde incelenir.

## Mimari kararı

Seçilen yaklaşım **aşamalı sertleştirme**dir.

- Mevcut SSR ve servis katmanları korunur.
- Kanıtlanmamış risk için ayrı BFF veya bağımsız backend servisi oluşturulmaz.
- Ortak güvenlik kontrolleri yalnız tek bir katmanın varsayımına dayanmayacak biçimde, sorumluluğun bulunduğu katmana konur.
- Her güvenlik değişikliği, önce mevcut davranışını ve ardından kapanan saldırı yolunu gösteren hedefli bir testle doğrulanır.

## Denetim sırası

### 1. İşlevsel envanter ve test

Her yüzey için anonim, geçerli oturumlu ve geçersiz/hatalı girdi davranışı kayda alınır:

- Frontend: giriş, dashboard, haber, topluluk, akademi ve dinamik sayfalar; yükleniyor/boş/hata/erişim engeli durumları.
- Backend girişleri: Auth.js handler, giriş Server Action'ı, SSR sayfa çağrıları, servisler, sorgular, RSS/Finnhub ve Anthropic entegrasyonları.
- Veritabanı: migration, şema kısıtları, bağlantı yaşam döngüsü, uygulama rolünün izinleri ve kullanıcıya bağlı yazılabilir kaynakların sahipliği.

Kanıt; gerçek tarayıcı görünümü, HTTP durum/redirect sonucu, ilgili servis çıktısı ve gerekli olduğu yerde kontrollü test verisi ile toplanır.

### 2. Güncel tehdit araştırması ve güvenlik denetimi

Tehdit modeli birincil kaynaklarla güncellenir: Next.js ve Auth.js güvenlik duyuruları, OWASP API Security Top 10, CVE/advisory kayıtları ve doğrudan bağımlılık duyuruları. Araştırma, uygulamanın gerçek veri yollarına eşlenir.

İncelenecek saldırı sınıfları:

- `NEXT_PUBLIC_*`, istemci bundle'ı, hata sayfası, log, redirect, cache veya props yoluyla API anahtarı, token, DB bağlantı bilgisi ya da kişisel veri sızıntısı.
- JWT/oturum imzası, cookie öznitelikleri, kullanıcı kimliği karışması, açık yönlendirme, CSRF/Origin atlaması ve Server Action yetkisiz kullanımı.
- Kimlik doğrulaması olan fakat nesne/satır sahipliği doğrulanmayan veri erişimi (BOLA/IDOR).
- Harici URL, RSS, HTML/Markdown, video ve AI girdisi üzerinden SSRF, zararlı içerik, prompt injection ya da çıktı sızıntısı.
- İstemciye fazla veri verme, güvenli olmayan cache, eksik CSP/HTTP güvenlik başlıkları, kaynak haritası/stack trace ifşası ve doğrulanmış bağımlılık açıkları.
- Aşırı DB yetkisi, şema kısıtlarının eksikliği, ağdan erişilebilir veritabanı ve sırların uygulama çalışma rolü dışında kullanılması.

Her kanıt tahribatsızdır. Test, veriyi silmez veya değiştirmez; parolaları tahmin etmez; dış sistemlere istek yağdırmaz; sırları konsola veya rapora çıkarmaz.

## Yeniden tasarım hedefleri

### Veritabanı

- Uygulama çalışma rolü en az yetki ile sınırlandırılır; migration/işletim yetkileri bundan ayrılır.
- Kullanıcıyla ilişkili veri erişiminde sahiplik doğrulaması sorgunun çağrıldığı servis sınırında bulunur; istemci kökenli kimlik yetki girdisi değildir.
- Şema kısıtları, benzersizlik, referans bütünlüğü ve veri biçimi için son savunma olur; uygulama katmanı yetki kontrolünü devretmez.
- Bağlantı dizesi server ortamında kalır; yerel DB ağ bağlanması denetlenir; hata ve log yüzeyi sır içermez.

### Backend

- Her giriş noktası için doğrulanmış oturum, yetki, şema doğrulama, güvenli hata dönüşü ve varsayılan olarak kapalı erişim sözleşmesi uygulanır.
- Servis katmanı kullanıcı kimliğini yalnız güvenilir sunucu oturumundan alır.
- Dış entegrasyonlar izinli hedef, doğrulanmış yanıt şeması, süre/yanıt boyutu sınırı ve sırdan arındırılmış hata sözleşmesi kullanır.
- JWT/oturum, redirect, Origin/CSRF, cache ve HTTP güvenlik başlıkları çalışma zamanında doğrulanır.

### Frontend

- İstemci bileşenleri yalnız görüntüleme için gerekli, izinli DTO verisini alır.
- Token, env değişkeni, DB satırı, ham entegrasyon cevabı veya stack trace client prop/bundle sınırını geçmez.
- Yetkisiz, boş, yükleniyor ve hata durumları açık biçimde görünür; UI gizleme hiçbir zaman backend yetkilendirmesinin yerine geçmez.
- HTML, Markdown ve dış gömülü içerik bağlamına uygun sanitize edilir; güvenilmeyen metin çalıştırılabilir içerik olarak işlenmez.

## Doğrulama kapıları

1. İşlevsel testler frontend, backend ve DB veri yolunu birbirinden bağımsız ve birlikte doğrular.
2. Her güvenlik bulgusu için yeniden üretim kanıtı, en küçük doğru katmanda düzeltme ve kapandığını gösteren negatif test bulunur.
3. Değişen web yüzeyleri gerçek tarayıcıyla gözlenir; kimlik/API kontrolleri HTTP veya uygulama sözleşmesi seviyesinde gözlenir.
4. Son kapı `npm run format`, `npm run typecheck`, `npm run lint`, `npm run build` ve değişen sözleşmelerin hedefli testleridir.
5. Nihai rapor her bulgu için önem, etki, kanıt, düzeltme, doğrulama ve kalan riski içerir; sır ve kişisel veri içermez.
