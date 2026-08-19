# Tüm Sistem Güvenlik Denetimi Raporu

**Tarih:** 2026-08-19  
**Durum:** Denetim sürüyor  
**Yetki sınırı:** Yalnız yerel Finans Program uygulaması, yerel PostgreSQL ve yerel Next.js sunucusu.

## Kapsam

- Frontend: giriş, dashboard, haber, topluluk, akademi ve dinamik sayfalar.
- Backend: middleware, Auth.js, Server Action, servisler, RSS/Finnhub/Anthropic entegrasyonları, içerik yükleyicileri.
- Veri: Drizzle şeması/sorguları, migration ve PostgreSQL çalışma rolü.
- Dış hedef, üretim/staging, parola tahmini, yük testi, veri silme ve kalıcı test verisi oluşturma kapsam dışıdır.

## Ortam

| Öğrenim | Kanıt |
| --- | --- |
| Uygulama | Next.js 15.5.22, React 19, TypeScript, Auth.js v5, Drizzle ORM, PostgreSQL |
| Veritabanı | İlk `npm run db:status` çalışmasında duruyordu; `npm run db:up` sonrasında yerel PostgreSQL port 5432 üzerinde çalışıyor. Bağlantı dizesi kaydedilmedi. |
| Geliştirme sunucusu | Yerel Next.js geliştirme sunucusu 127.0.0.1:3000 üzerinde ready durumunda. |
| Çalışma ağacı | Önceden var olan commit’siz değişiklikler korunuyor; denetim yalnız kendi rapor/plan dosyalarını oluşturuyor. |

## Başlangıç Doğrulaması

| Komut | Sonuç | Gözlem |
| --- | --- | --- |
| `npm run typecheck` | Geçti | `tsc --noEmit` hata vermedi. |
| `npm run lint` | Geçti | Biome 87 dosyayı düzeltme yapmadan kontrol etti. |
| `npm run build` | Geçti | Next.js derlemesi, tür kontrolü ve 5 statik sayfa üretimi tamamlandı. |

Üretim derlemesinin gözlemlediği uygulama rotaları: `/`, `/giris`, `/haberler`, `/haberler/[slug]`, `/topluluk`, `/akademi`, `/akademi/[hafta]/[ders]` ve `/api/auth/[...nextauth]`. Middleware derlemeye dahil edildi.

## İşlevsel Kanıt

### Yüzey envanteri

| Sınır | Dosyalar | Durum |
| --- | --- | --- |
| Kimlik ve rota koruması | `src/middleware.ts`, `src/auth.config.ts`, `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/app/(auth)/giris/actions.ts` | Erişim yolu haritalandı; yerel HTTP denetimi sürüyor |
| Korumalı frontend rotaları | Dashboard, haber, topluluk ve akademi sayfaları | Yedi sayfa rotası haritalandı; anonim tarayıcı denetimi sürüyor |
| Sunum bileşenleri | `src/components/{auth,layout,market,news,sentiment,academy,common}` | 31 TSX bileşeni ve bir navigasyon modülü haritalandı; sayfa veri yolu ile denetlenecek |
| Servisler | `src/server/services/{market,news,sentiment,video,academy}.ts`, `src/server/ai/degerlendir.ts` | Altı server-only veri/AI sınırı haritalandı |
| Entegrasyonlar | Finnhub ve dört RSS modülü | Beş dış erişim modülü haritalandı |
| Veri ve içerik | Drizzle şema/sorguları; content loader/render modülleri | Yedi sorgu modülü, şema, migration ve üç içerik modülü haritalandı |

Envanter; yedi kullanıcı sayfası, üç layout, bir Auth.js Route Handler, bir giriş Server Action’ı, altı servis/AI modülü, beş dış entegrasyon modülü, yedi DB sorgu modülü, üç içerik modülü ve dokuz bakım/işletim script’inden oluşuyor. Sadece `advanceProgress` yazma fonksiyonu bulunuyor; kaynak içinde çağrısı yok. Mevcut kullanıcıya ait yanıt/ilerleme yazma yolu bu sürümde kullanıcı arayüzüne bağlı değil.

### Yerel frontend ve kimlik davranışı

- `/giris` gerçek Chromium’da açıldı; erişilebilirlik ağacında zorunlu e-posta/şifre alanları ve giriş düğmesi yer aldı. Görsel yüzey hata vermeden render edildi.
- Bilinmeyen bir test e-postası ve yanlış parola ile tek giriş denemesi `E-posta veya şifre hatalı.` sonucunu verdi. Yanıtta stack trace, sorgu hatası veya sır görünmedi.
- Biçimsiz e-posta yerleşik `type="email"` doğrulamasında reddedildi; form gönderilmedi.
- Anonim olarak `/`, `/haberler`, `/topluluk`, `/akademi`, `/haberler/gecersiz-denetim-slug` ve `/akademi/gecersiz-hafta/gecersiz-ders` istendi. Her biri giriş sayfasına yönlendi; yönlendirilmiş sayfada dashboard verisi bulunmadı.
- Middleware, kök rota için `donus` eklemedi; diğer korumalı rotalarda yalnız URL-kodlanmış yol değeri taşıdı.
- `//evil.example` ve `https://evil.example/` değerleri giriş formunda `/` olarak daraltıldı. `/%5Cevil.example` ise `/\\evil.example` olarak kaldı; WHATWG URL çözümlemesi bunu başka bir origin’e çözümler. Anonim durumda yönlendirme tetiklenmedi; oturumlu `/giris` dalındaki gerçek Location yanıtı kimlik bilgisi olmadığı için henüz gözlenmedi. Bu yol güvenlik yeniden üretimine taşındı.
- Giriş HTML’i ve yüklü üç client chunk’ında `DATABASE_URL`, `AUTH_SECRET`, `ANTHROPIC_API_KEY`, `FINNHUB_API_KEY`, `REDDIT_CLIENT_SECRET`, `passwordHash` ya da JWT-biçimli veri bulunmadı.

### Anonim Auth.js HTTP davranışı

| Uç nokta | Durum | Doğrulanan sözleşme |
| --- | --- | --- |
| `/api/auth/session` | 200 JSON | Gövde `null`; `Cache-Control: private, no-cache, no-store`; CORS origin’i yok; cookie `HttpOnly` ve `SameSite`. Yerel HTTP’de `Secure` bayrağı yok, üretim yapılandırması ayrıca doğrulanacak. |
| `/api/auth/csrf` | 200 JSON | Yalnız `csrfToken` alan adı gözlendi; token değeri kaydedilmedi. `Cache-Control: private, no-cache, no-store`; CORS origin’i yok. |

### Salt-okuma backend ve veri davranışı

- Doğrudan servis probu, `market`, `news`, `sentiment`, `academy` ve `video` servislerini env değeri veya satır içeriği yazdırmadan çalıştırdı. Dönen biçimler: 5 piyasa kaydı, geçmiş derinliği 1, 20 haber, 6 çeşitli haber, 7 izlenen kaynak, 6 gönderi, 5 sembol, 8 hafta, ilk ders ve günün videosu mevcut; rastgele olmayan haber slug’ı `null` döndü.
- AI değerlendirici çağrılmadı: bu çağrı dış Anthropic sistemine istek gönderir ve yerel/tahribatsız yetki sınırının dışındadır.
- `scripts/db-check.ts` salt-okuma sorgusuyla 19 uygulama tablosunu, 8 hafta, 40 ders, 120 ders kaynağı ve 120 soru kaydını doğruladı.
- Kimliği doğrulanmış frontend davranışı ve gerçek hesap için yanlış-parola eşitliği, test hesabı veya mevcut hesap bilgisi bu oturumda verilmediği için doğrulanmadı. Hesap oluşturmadan, parola tahmin etmeden ve kullanıcı verisi okumadan bırakıldı.

## Tehdit Araştırması

### Kaynaklar ve uygulama matrisi

| Saldırı veya duyuru | Birincil kaynak | Yerel durum ve sonraki kanıt |
| --- | --- | --- |
| RSC uzaktan kod yürütme, CVE-2025-66478 | [Next.js, 2025-12-03](https://nextjs.org/blog/CVE-2025-66478) | App Router etkilenir; yerel `next@15.5.22`, bu dal için düzeltme olan 15.5.7’den yeni. Sırların runtime env’de olması da kaynakta doğrulanacak. |
| RSC DoS ve Server Function kaynak ifşası, CVE-2025-55184/CVE-2025-55183 | [Next.js, 2025-12-11](https://nextjs.org/blog/security-update-2025-12-11) | App Router etkilenir; yerel 15.5.22, 15.5.9 düzeltmesinden yeni. Server Action ve server-only sınırları bundle/HTTP taramasında incelenecek. |
| 2026 middleware/proxy bypass, RSC DoS, SSRF, cache poisoning ve XSS duyuruları | [Vercel, 2026-05-07](https://vercel.com/changelog/next-js-may-2026-security-release) | Bu uygulama middleware ile rota koruyor; `next@15.5.22` 15.5.18 düzeltmesinden, `react@19.2.8` 19.2.6 düzeltmesinden yeni. Yine de layout seviyesindeki ikinci `auth()` kontrolü ve prefetch/redirect HTTP davranışı taranacak. |
| Auth.js e-posta yanlış teslimi, GHSA-5jpx-9hw9-2fx4 | [GitHub Advisory, 2025-10-27](https://github.com/nextauthjs/next-auth/security/advisories/GHSA-5jpx-9hw9-2fx4) | Yalnız Nodemailer e-posta sağlayıcısını etkiler; uygulama Credentials kullanıyor ve `next-auth@5.0.0-beta.32`, beta.30 düzeltmesinden yeni. Uygulanmıyor. |
| API1 BOLA, API2 kimlik, API3 aşırı özellik, API4 kaynak tüketimi, API7 SSRF, API8 yapılandırma, API10 üçüncü taraf API tüketimi | [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) | Dinamik slug, kullanıcı ilerlemesi, Auth.js, RSS/Finnhub, cache/headers ve DB sorguları bu sınıflara eşlenecek. Kimliği doğrulanmış yazma yüzeyi bu sürümde bağlı değil; gelecekteki Server Action’lar için sahiplik sınırı tasarım gereksinimidir. |
| LLM01 prompt injection ve hassas çıktı ifşası | [OWASP GenAI, LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | `degerlendir.ts` öğrenci yanıtını modele aktarır; model araç çağrısı yapmaz ve Zod biçimli çıktı kullanır. Gerçek AI çağrısı dış sisteme gideceği için yapılmadı; girdi/çıktı ve anahtar sınırı kaynakta denetlenecek. |

### Bağımlılık araştırması

`npm audit --omit=dev --json`, 75 üretim bağımlılığı içinde dört yüksek önemli kayıt buldu. Yüklü zincir `next@15.5.22 -> postcss@8.4.31 -> nanoid@3.3.17` ve `next@15.5.22 -> sharp@0.34.5` biçiminde.

- `nanoid@3.3.17`, GHSA-2v37-7h3g-55p8 kapsamındadır; sorun boyutu sıfır olan özel generator çağrısında sonsuz döngüdür. Uygulama kaynak ve scriptlerinde `nanoid` çağrısı bulunmadı; kullanılabilirlik etkisi sonraki bağımlılık/yol taramasında sınıflandırılacak.
- `postcss@8.4.31`, GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp ve GHSA-r28c-9q8g-f849 kapsamındadır. Bildirilen saldırılar, saldırgan denetimli CSS veya `sourceMappingURL` girdisinin işlenmesine dayanır; uygulama CSS girdi yüzeyi kaynak denetiminde doğrulanacak.
- `sharp@0.34.5`, [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) kapsamındadır; danışmana göre güvenilmeyen görüntü girdiği durumda libvips güvenlik açıkları etkiler ve 0.35.0+ düzeltmedir. Uygulamanın Next Image veya başka bir görüntü işleme yüzeyi açıp açmadığı çalışma zamanı/config taramasında doğrulanacak.
- `npm audit` yalnız Next 16.3.1’e büyük sürüm yükseltmesini otomatik düzeltme olarak öneriyor. Bu, mimari ve uyumluluk kanıtı olmadan uygulanmayacak; mevcut 15.5 dalı için güvenli override/patch yolu ayrı sertleştirme planında belirlenecek.

## Kaynak ve Çalışma Zamanı Güvenlik Taraması

### Doğrulanan korumalar

- `NEXT_PUBLIC_*` kullanımı yok. `DATABASE_URL`, `ANTHROPIC_API_KEY` ve `FINNHUB_API_KEY` yalnız server/işletim sınırında okunuyor; client bileşenlerinde DB, servis veya auth modülü importu bulunmadı.
- Production giriş HTML’i ve beş yüklenmiş client chunk’ı, tanımlı secret adları, parola özeti veya JWT-biçimli veri içermedi. Bir production chunk için `.map` isteği 404 döndü.
- Markdown çıktısı script etiketi ve `javascript:` `href` değeri olmadan sanitize edildi; HTTPS bağlantı korundu. Taklit edilmiş ve yabancı YouTube hostları ile geçersiz video kimliği reddedildi.
- Kayıtlı 8 feed URL’si HTTPS; 135 haber URL’si/görsel URL’si ve 120 ders kaynağı HTTP(S) biçiminde. Bu mevcut veri kanıtıdır; ingest kodu gelecekteki kayıtları henüz şema/allowlist ile zorlamıyor.
- Aynı server-action isteği aynı Origin ile 200 RSC yanıtı, değişmiş Origin ile 500 RSC yanıtı verdi. İstemci sonucu farklı Origin’e dönmedi; Next’in Origin kontrolü aktif görünüyor.
- Middleware’e değiştirilmiş `Host` başlığı ile gönderilen anonim istek, dış origin yerine göreli `/giris?donus=%2Fhaberler` konumuna yönlendi.

### Doğrulanmış bulgular

| Kimlik | Önem | Katman | Kanıt ve etki |
| --- | --- | --- | --- |
| DB-01 | Yüksek — yerel saldırgan | DB/işletim | `.env.example`, `src/lib/db/index.ts` hata metni ve `scripts/db-check.ts` aynı varsayılan yerel kimlik bilgisini içeriyor. Shell ortamında `DATABASE_URL` yokken bu kimlik `scripts/db-check.ts` ile bağlandı. Salt-okuma katalog sorgusu çalışan `finans` rolünün `SUPERUSER`, `CREATEROLE`, `CREATEDB`, `REPLICATION`, `public CREATE` ve DB CREATE yetkilerine sahip olduğunu doğruladı. Ağ sınırı `127.0.0.1`/`::1`; uzaktan erişim kanıtlanmadı. Buna rağmen aynı makinedeki herhangi bir süreç bilinen kimlikle tam cluster yetkisi alabilir. |
| AUTH-01 | Orta | Frontend/backend yönlendirme | `guvenliDonus` yalnız `/` önekini ve `//` biçimini reddediyor. `/giris?donus=/%5Cevil.example` gizli form alanında `/\\evil.example` kaldı. Tahribatsız, imzalı denetim oturumu ile gerçek uygulama isteği 307 ve `Location: /\\evil.example` döndürdü; WHATWG çözümlemesi bunu farklı origin’e yönlendirir. Saldırı, giriş yapmış kullanıcının saldırgan bağlantısına gitmesini gerektirir; cookie başka origin’e gönderilmez. |
| HTTP-01 | Orta | Frontend/HTTP | Production `/giris` ve `/api/auth/session` yanıtlarında CSP, `X-Frame-Options`, `Referrer-Policy`, `X-Content-Type-Options` ve `Permissions-Policy` yok. Bu, iframe clickjacking, gereğinden geniş referrer ve MIME yorumlama savunmalarını uygulama katmanında bırakıyor. Yerel HTTP’de HSTS beklenmez; HTTPS reverse-proxy davranışı bu denetimde yok. |
| AUTH-02 | Orta — yayınlanırsa | Backend | Credentials giriş yolunda istemci düğme kilidi dışında rate limit, IP/hesap anahtarlı sayaç veya gecikme yok. Açık kayıt yoktur; ancak uygulama internetten erişilebilir yapılırsa online parola denemesi sınırlandırılmaz. |
| DEP-01 | Yüksek bileşen riski | Tedarik zinciri | Production dependency audit’i `nanoid@3.3.17`, `postcss@8.4.31` ve `sharp@0.34.5` için dört yüksek kayıt verdi. `nanoid` çağrısı uygulamada yok; PostCSS saldırısı saldırgan CSS/source map girdisi gerektirir; Sharp saldırısı güvenilmeyen görüntü işleme gerektirir. Bu uygulama koşulları henüz kanıtlanmadı, fakat paketler doğrulanmış etkilenmiş sürümlerde ve sürüm/override düzeltmesi gerektirir. |
| DB-02 | Düşük | Backend/DB | `findLatestFeedback` her çağrıda tüm `answer_feedback` satırlarını seçip bellekte yalnız istenen cevapları filtreliyor. Sonuç istemciye yalnız kullanıcının cevapları için eşleniyor; çapraz kullanıcı sızıntısı gözlenmedi. Yine de gereksiz hassas veri işleme ve büyüyen tabloda kaynak tüketimidir. |

### Doğrulanmayan riskler

- Şu anki UI, `next/image` veya saldırganın denetlediği görüntü işleme API’si kullanmıyor; Sharp için uygulama seviyesi sömürü yolu gösterilmedi.
- RSS `feedUrl` yalnız aktif kaynak tablosundan geliyor ve kullanıcıya açık değişim API’si yok. Bu nedenle doğrudan dış SSRF kanıtlanmadı. DB-01, bu varsayımı aynı-makine saldırganı için zayıflatır; feed hedefi için allowlist yine gereklidir.
- RSS makale/görsel URL’leri React özniteliklerine güvenli metin olarak yazılıyor, fakat ingest aşamasında şema/host doğrulaması yok. Mevcut veriler güvenli şemada; kötü niyetli veya ele geçirilmiş feed için savunma eklenecek.
- AI değerlendirici araç çağrısı yapmıyor, sırları modele vermiyor ve Zod çıktı şeması kullanıyor. Gerçek dış sağlayıcı çağrısı yapılmadığından prompt-injection dayanımı doğrulanmadı.

## Düzeltme Kararı

DB-01, AUTH-01, HTTP-01, AUTH-02, DEP-01 ve DB-02 için DB → backend → frontend etki zincirini kapsayan kesin sertleştirme planı hazırlanacak. SSRF/harici URL ve AI için ise mevcut güvenli varsayımları kodla zorlayan, yeni dış yüzey açmayan korumalar planlanacak.

## Doğrulama

- Başlangıç tür kontrolü, lint ve production build geçti.
- Anonim/oturumlu tarayıcı, HTTP, kaynak, bağımlılık, DB izinleri ve tahribatsız yeniden üretim kontrolleri bekliyor.
