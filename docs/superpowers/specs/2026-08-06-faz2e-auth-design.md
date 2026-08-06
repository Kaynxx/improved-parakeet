# Faz 2E — Kimlik ve İlerleme Temeli (Tasarım)

Tarih: 2026-08-06 · Durum: **uygulandı — Google kimlik bilgileri bekleniyor**

> Kod yazıldı, migration uygulandı, typecheck/lint/build geçiyor. Middleware
> yönlendirmesi, sunucu tarafı sınır, hata halleri ve açık yönlendirme koruması
> çalışma anında doğrulandı. **Google OAuth istemcisi oluşturulmadığı için
> uçtan uca giriş henüz denenmedi** — aşağıdaki "Ön koşul" adımları kullanıcıya
> ait.

## Bağlam

Akademi bölümünü 8 haftalık ileri seviye bir parasal iktisat programına
dönüştürme işi üç alt projeye ayrıldı:

| | Alt proje | Kapsam | Sıra |
|---|---|---|---|
| **A** | **Kimlik ve ilerleme temeli** | Auth.js v5 + Google OAuth, giriş ekranı, `user_progress` | **bu spec** |
| B | Akademi yapısı | 8 hafta şeması, markdown render, sorular, cevap API'si, AI değerlendirme | ayrı spec |
| C | Müfredat | 40 derin ders (~70k kelime) | ayrı spec |

Sıra kullanıcı tarafından **A → B → C** olarak seçildi. Gerekçe: B'deki cevap
kaydı ve C'deki ilerleme takibi bir *kimliğe* bağlı; kimlik olmadan ikisi de
yarım kalır.

## Amaç

Panel bir kimlik kazansın: kullanıcı Google ile giriş yapsın, oturumu
veritabanında tutulsun, ve akademi ilerlemesi o kullanıcıya bağlansın.

**Başarı ölçütü:** Giriş yapmamış bir ziyaretçi herhangi bir sayfayı istediğinde
`/giris`'e yönlenir. Google ile giriş yaptıktan sonra geldiği sayfaya döner,
üst bardaki yer tutucu gerçek oturum menüsüne dönüşür, çıkış yapabilir. Akademi
yol haritası `user_progress` tablosundan okunur — tablo boş olduğu için tüm
adımlar `not_started` görünür, ama okuma yolu uçtan uca çalışır.

## Kapsam

**Dahil:**
- `next-auth@5` (Auth.js v5) + `@auth/drizzle-adapter`, tek sağlayıcı: Google
- Şema: `users`, `accounts`, `sessions`, `verification_tokens`, `user_progress`
- Oturum stratejisi: **veritabanı** (JWT değil)
- Bölünmüş yapılandırma: `auth.config.ts` (Edge-güvenli) + `auth.ts` (adapter'lı)
- `middleware.ts` — tüm uygulamayı kapsayan matcher
- `(auth)/giris` sayfası — kabuk dışı, Mürekkep sistemiyle, hata halleriyle
- `TopBar`'daki "K" yer tutucusunun gerçek oturum menüsüne dönüşmesi
- `StepStatus` tip sözleşmesinin 3 → 5 aşamaya genişlemesi ve onu tüketen
  bileşenlerin güncellenmesi
- `getTracks()` / `getActiveTrack()`'in gerçek ilerlemeyi okuması
- `.env.example` güncellemesi

**Hariç (bilinçli):**
- **İlerleme YAZMA yolu** — "tamamlandı" işaretleme UI'ı B'de, ders okuyucusuyla
  birlikte gelir. A yalnız okuma yolunu kurar ve kanıtlar.
- E-posta/şifre, magic link, ek OAuth sağlayıcıları — Faz 1'de tek sağlayıcı
  kararlaştırıldı, ikincisini eklemek YAGNI
- Rol/yetki (RBAC) — tek kullanıcı tipi var
- Profil düzenleme sayfası — Google'dan gelen ad/avatar yeterli
- Hesap silme / veri dışa aktarma — ayrı bir iş kalemi
- `lesson_prompts` / `lesson_answers` / `answer_feedback` tabloları — B'de
- Oturum süresi özelleştirme, "beni hatırla" — varsayılan 30 gün

## Ön koşul — **kullanıcının yapması gereken**

Google OAuth istemcisini ben oluşturamam (hesap açma ve kimlik bilgisi girme
işlemi). Aşağıdaki adımlar sana ait:

1. [Google Cloud Console](https://console.cloud.google.com/) → yeni proje
2. **APIs & Services → OAuth consent screen** → External → uygulama adı
   "Finans Programı", test kullanıcısı olarak kendi e-postanı ekle
3. **Credentials → Create Credentials → OAuth client ID** → Web application
4. **Authorized redirect URI** olarak tam olarak şunu ekle:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Çıkan `Client ID` ve `Client secret` değerlerini `.env.local`'e yaz

`AUTH_SECRET` için: `npx auth secret` komutu üretir ve `.env.local`'e yazar.

```dotenv
# .env.example'a eklenecek
AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

Bu adımlar tamamlanmadan giriş akışı çalışmaz; kod yazılabilir ama uçtan uca
doğrulama yapılamaz.

## Mimari — koruma nerede uygulanıyor

Buradaki tek gerçek teknik tuzak bu. Next.js middleware varsayılan olarak
**Edge runtime**'da çalışır ve **Postgres'e sorgu atamaz**. Oturum stratejisi
veritabanı olduğu için middleware oturumu doğrulayamaz.

Çözüm **iki katman**, ve güvenlik sınırı bilerek sunucuda:

| Katman | İş | Runtime | Güvenlik sınırı mı? |
|---|---|---|---|
| `middleware.ts` | Oturum çerezi var mı? Yoksa `/giris`'e yönlendir | Edge | **Hayır** — yalnız UX |
| `(dashboard)/layout.tsx` | `await auth()` → oturum yoksa `redirect()` | Node | **Evet** |
| Route handler'lar | Her mutasyonda `auth()` kontrolü | Node | **Evet** |

Middleware yalnız çerezin **varlığına** bakar, geçerliliğine değil. Sahte bir
çerezle middleware'i geçmek mümkündür — ve önemli değil, çünkü layout'taki
`auth()` çağrısı oturumu veritabanından doğrular ve yönlendirir. Middleware'in
işi güvenlik değil, korumalı sayfanın boş render edilip sonra atılmasını
önlemek.

**Neden JWT oturumuna geçip middleware'i tek sınır yapmadık:** JWT ile
middleware oturumu doğrulayabilirdi ve tek katman yeterdi. Ama JWT oturumu
sunucudan iptal edilemez (süresi dolana kadar geçerlidir) ve `user_progress`
zaten veritabanında — oturum için ikinci bir doğruluk kaynağı kurmanın karşılığı
yok. Veritabanı oturumu + sunucu tarafı sınır doğru takas.

### Bölünmüş yapılandırma

Auth.js v5'in Edge uyumluluğu için standart desen:

```
auth.config.ts     sağlayıcı listesi + callback'ler · adapter YOK · Edge-güvenli
   ▲                                                    ▲
   │                                                    │
middleware.ts                                        auth.ts
(NextAuth(authConfig).auth)              (NextAuth({...authConfig, adapter, session}))
                                                        ▲
                                                        │
                                          layout.tsx · route handler'lar ·
                                          app/api/auth/[...nextauth]/route.ts
```

`auth.config.ts` Drizzle'ı import etmez — ettiği anda middleware Edge'de patlar.

## Şema

Auth.js Drizzle adapter'ının beklediği dört tablo + ilerleme tablosu.
`src/lib/db/schema.ts` dosyasına eklenecek (dosyanın başındaki yorumda `2E auth
(users ve ona bağlı her şey)` olarak zaten yer tutulmuş).

```ts
users               id · name · email(unique) · emailVerified · image
accounts            userId → users.id · type · provider · providerAccountId
                    refresh_token · access_token · expires_at · token_type
                    scope · id_token · session_state
                    PK (provider, providerAccountId)
sessions            sessionToken(PK) · userId → users.id · expires
verification_tokens identifier · token · expires · PK (identifier, token)

user_progress       userId → users.id · stepId → steps.id
                    status: step_status · updatedAt
                    PK (userId, stepId)
```

**`verification_tokens` neden var:** yalnız OAuth kullanıyoruz, bu tablo hiç
dolmayacak. Ama `@auth/drizzle-adapter`'ın tip sözleşmesi onu zorunlu kılıyor —
vermezsek TypeScript hatası. Şemaya boş bir tablo olarak eklenir ve yorumla
işaretlenir.

**Silme davranışı:** `accounts`, `sessions`, `user_progress` → `onDelete:
"cascade"`. Kullanıcı silinirse oturumları ve ilerlemesi de gider.

**Yeni enum:**

```ts
export const stepStatus = pgEnum("step_status", [
  "not_started", "reading", "answered", "reviewed", "mastered",
]);
```

## Tip sözleşmesi değişikliği

`src/types/index.ts` projenin tek veri sözleşmesi. `StepStatus` genişliyor:

```ts
// önce
export type StepStatus = "not_started" | "in_progress" | "completed";

// sonra — her aşama GÖZLENEBİLİR bir olaya bağlı, hisse değil
export type StepStatus =
  | "not_started"  // hiç açılmadı
  | "reading"      // ders açıldı
  | "answered"     // sorular dolduruldu
  | "reviewed"     // AI geri bildirimi geldi
  | "mastered";    // ortalama skor ≥ 70
```

**Bu değişiklik neden A'da, B'de değil:** enum ve tablo A'da kuruluyor; sonradan
genişletmek ikinci bir migration ve ikinci bir UI turu demek. Aşamaların
*anlamı* B'de doluyor (cevap, değerlendirme), ama *şekli* şimdi sabitleniyor.

### Etkilenen dosyalar (grep ile doğrulandı)

| Dosya | Satır | Değişiklik |
|---|---|---|
| `src/types/index.ts` | 123 | Tip tanımı genişler |
| `src/lib/db/queries/academy.ts` | 11 | `STATUS_UNTIL_AUTH` sabiti silinir, gerçek sorgu gelir |
| `src/lib/db/queries/academy.ts` | 58 | `completedSteps` filtresi: `=== "completed"` → `=== "mastered"` |
| `src/server/services/academy.ts` | 6 | Yorum güncellenir; fonksiyonlar `userId` parametresi alır |
| `src/components/academy/RoadmapNode.tsx` | 6–15 | `STATUS_LABEL` ve `STATUS_ICON` 5 girdiye çıkar |
| `src/components/academy/RoadmapNode.tsx` | 27–28 | `isDone`/`isActive` yeni aşamalara göre türetilir |
| `src/components/academy/RoadmapPreview.tsx` | 15 | `!== "completed"` → `!== "mastered"` |
| `src/mocks/index.ts` | 302–501, 517–523 | `tracks` ve `getActiveTrack()` **ölü kod** — silinir (aşağıya bakın) |

`ProgressRing` ikili sayı alıyor (`completed`/`total`) — imzası değişmiyor, ama
`completedSteps` artık ağırlıklı hesaplanabilir. **A'da ağırlıklandırma
yapılmıyor**: `mastered` sayılır, gerisi sayılmaz. Ağırlıklı yüzde (her aşama
%25) B'de, gerçek veri akmaya başlayınca eklenir — boş tabloda ağırlıklandırma
görünmez, dolayısıyla şimdi yazmak doğrulanamaz kod olur.

## Dosya haritası

```
auth.config.ts                          YENİ · Edge-güvenli yapılandırma
auth.ts                                 YENİ · adapter + veritabanı oturumu
middleware.ts                           YENİ · matcher + çerez kontrolü
src/app/api/auth/[...nextauth]/route.ts YENİ · Auth.js handler
src/app/(auth)/layout.tsx               YENİ · kabuksuz sade layout
src/app/(auth)/giris/page.tsx           YENİ · giriş ekranı
src/components/auth/GoogleButton.tsx    YENİ · signIn eylemi
src/components/auth/UserMenu.tsx        YENİ · avatar + çıkış
src/lib/db/schema.ts                    5 tablo + 1 enum eklenir
src/lib/db/queries/progress.ts          YENİ · ilerleme okuma
src/lib/db/queries/academy.ts           gerçek ilerlemeyi join eder
src/server/services/academy.ts          userId parametresi alır
src/types/index.ts                      StepStatus genişler
src/components/layout/TopBar.tsx        "K" yer tutucusu → UserMenu
src/components/academy/RoadmapNode.tsx  5 durum
src/components/academy/RoadmapPreview.tsx  mastered
src/mocks/index.ts                      ölü akademi export'ları silinir
.env.example                            3 değişken

# servis imzası değiştiği için çağıran sayfalar da:
src/app/(dashboard)/page.tsx                        getActiveTrack(userId)
src/app/(dashboard)/akademi/page.tsx                getTracks(userId)
src/app/(dashboard)/akademi/[track]/[step]/page.tsx getStep(userId, …)
```

**Servis imzası kararı:** `userId` sayfadan parametre olarak geçer, servis
kendi içinde `auth()` çağırmaz. Sebep Faz 1'de kurulan sınır kuralının aynısı:
servisler bağlam değil veri alır, böylece test edilebilir ve çağrıldıkları yere
bağımlı olmazlar. Sayfa zaten `(dashboard)/layout.tsx` sayesinde oturumun var
olduğunu biliyor; `auth()` çağrısını orada bir kez yapıp aşağı geçirmek hem
tekrarı hem de servis katmanının Auth.js'e bağlanmasını önler.

## Giriş ekranı

`(auth)` rota grubu `(dashboard)`'ın **dışında** — kenar çubuğu, üst bar ve
haber şeridi yok. Tek kart, kâğıt zemin, Mürekkep sisteminden.

Kart içeriği: marka işareti (kenar çubuğundaki yükseliş çentiği), tek satır
başlık, tek Google düğmesi. Pazarlama metni yok — bu bir ürün vitrini değil,
bir kapı.

**`?donus=` parametresi:** middleware korumalı bir rotadan yönlendirirken
istenen yolu ekler; giriş sonrası oraya dönülür. Açık yönlendirme (open
redirect) açığına karşı **yalnız `/` ile başlayan ve `//` ile başlamayan**
göreli yollar kabul edilir.

### Hata halleri

Auth.js hata kodunu `?error=` ile döndürür. Her biri ne olduğunu ve ne
yapılacağını söyler — "bir şeyler ters gitti" yazmıyoruz:

| Kod | Mesaj |
|---|---|
| `OAuthAccountNotLinked` | Bu e-posta başka bir yöntemle kayıtlı. İlk kullandığın yöntemle gir. |
| `AccessDenied` | Google erişim isteğini reddettin. Devam etmek için izin vermen gerekiyor. |
| `Configuration` | Sunucu yapılandırması eksik. `AUTH_GOOGLE_ID` ve `AUTH_GOOGLE_SECRET` tanımlı mı? |
| *(diğer)* | Giriş tamamlanamadı. Tekrar dene. |

`Configuration` mesajı geliştirme ortamında bu haliyle görünür; üretimde
ortam değişkeni adı sızdırılmamalı — ama deployment kararı henüz verilmedi,
o yüzden şimdilik açık bırakılıyor ve kodda `TODO` ile işaretleniyor.

## Doğrulama

Auth akışını birim testle kovalamak kırılgan ve düşük getirili — OAuth
yönlendirmeleri, çerez ayarları ve sağlayıcı davranışı taklit edilmesi zor
şeyler. Gerçekçi plan:

**Otomatik:**
- `npm run typecheck` — `StepStatus` genişlemesi tüm tüketicilerde derlenmelidir.
  Bu, A'nın en değerli otomatik kontrolü: 5 aşamalı enum'u eksik ele alan her
  `Record<StepStatus, …>` derleme hatası verir.
- `npm run lint`
- `npm run build`
- `npm run db:generate && npm run db:migrate` — migration üretilip uygulanır

**Test altyapısı kurulmuyor.** `package.json`'da test script'i yok. A'nın
mantığı neredeyse tamamen yapılandırma ve yönlendirme — birim testle
yakalanabilecek saf fonksiyon yok, ve yazılabilecek tek test (`user_progress`
okuma sorgusu) boş tabloya karşı çalışacağı için boş dizi döndürmekten başka bir
şey doğrulamaz. Vitest kurulumu B'ye bırakılıyor: cevap değerlendirme,
skor eşiği ve aşama geçiş mantığı gerçekten test edilmeye değer.

**Elle duman testi (sıra önemli):**
1. Çıkışken `/akademi` → `/giris?donus=/akademi`'ye yönlenir
2. Google ile giriş → `/akademi`'ye döner
3. Üst barda avatar ve ad görünür
4. `/` → panel açılır, yönlendirme yok
5. Çıkış → `/giris`'e döner, geri tuşu korumalı sayfayı açmaz
6. `sessions` tablosunda satır oluştuğu ve çıkışta silindiği doğrulanır
7. Akademi yol haritası açılır, tüm adımlar `not_started` görünür (tablo boş)

## Riskler ve tuzaklar

**1. Edge runtime.** `auth.config.ts` yanlışlıkla Drizzle veya `pg` import
ederse middleware çalışma anında patlar ve hata mesajı yanıltıcı olur. Kural:
o dosyada `@/lib/db` import'u **yasak**, yorumla işaretlenecek.

**2. TypeScript 5.x sabitlenmeli.** Bellekteki ortam tuzağı hâlâ geçerli —
makinede TS 7.0.2 kuruluydu ve Next 15 `paths` alias'larını sessizce
görmüyordu. `package.json`'daki `typescript: ^5.9.3` korunacak.

**3. Migration sırası.** `user_progress`, `users` ve `steps` tablolarına
yabancı anahtar veriyor; ikisi de mevcut. Yeni migration bu üçünden sonra
gelmeli — `drizzle-kit generate` sırayı kendisi çözer, ama üretilen SQL
gözden geçirilecek.

**4. `.env.local` gerçek sırlar içerecek.** `.gitignore`'da olduğu doğrulandı.
`.env.example` yalnız boş anahtarlar taşır.

**5. Google OAuth ön koşulu bloklayıcı.** Kod yazılabilir ve derlenebilir, ama
duman testi kimlik bilgileri girilmeden yapılamaz. Plan bu adımı ayrı bir
kontrol noktası olarak işaretleyecek.

## Ölü kod temizliği

`src/mocks/index.ts` içindeki hangi export'ların hâlâ kullanıldığı grep ile
doğrulandı:

| Export | Durum |
|---|---|
| `marketQuotes` | **kullanılıyor** — `services/market.ts` |
| `sentimentPosts`, `sentimentSummary`, `tickerSentiments` | **kullanılıyor** — `services/sentiment.ts` |
| `dailyVideo` | **kullanılıyor** — `services/video.ts` |
| `tracks` (302–501) | **ölü** — akademi 2A'da Postgres'e taşındı |
| `getActiveTrack()` (517–523) | **ölü** — aynı sebep |

Son iki export siliniyor. Kalanlar 2C/2D/2F dilimlerine kadar yerinde kalır.
Bu, A'nın kapsamına giren bir temizlik: `tracks` mock'u eski 3 aşamalı
`StepStatus`'u kullanıyor, yani silinmezse tip değişikliğiyle birlikte
derleme hatası verecek ve düzeltilmesi gereken ölü kod olacak.
