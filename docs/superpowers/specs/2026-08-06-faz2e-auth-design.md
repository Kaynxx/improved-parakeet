# Faz 2E — Kimlik ve İlerleme Temeli (Tasarım)

Tarih: 2026-08-06 · Durum: **uygulandı ve doğrulandı**

> **Yön değişikliği.** Bu spec başta Google OAuth ile yazıldı ve o haliyle
> uygulandı. Google Cloud Console tarafında yönlendirme adresi doğru istemciye
> kaydedilemeyince kullanıcı OAuth'u bırakıp e-posta + şifreye geçme kararı
> verdi. Aşağısı **uygulanan** halin tasarımı; OAuth bölümleri "Neden
> vazgeçildi" başlığında özetlendi.

## Bağlam

Akademi bölümünü 8 haftalık ileri seviye bir parasal iktisat programına
dönüştürme işi üç alt projeye ayrıldı:

| | Alt proje | Kapsam | Sıra |
|---|---|---|---|
| **A** | **Kimlik ve ilerleme temeli** | Şifreli giriş, `user_progress`, 5 aşamalı durum | **bu spec** |
| B | Akademi yapısı | 8 hafta şeması, markdown render, sorular, cevap API'si, AI değerlendirme | ayrı spec |
| C | Müfredat | 40 derin ders (~70k kelime) | ayrı spec |

Sıra **A → B → C**. Gerekçe: B'deki cevap kaydı ve C'deki ilerleme takibi bir
*kimliğe* bağlı; kimlik olmadan ikisi de yarım kalır.

## Amaç

Panel bir kimlik kazansın: kullanıcı e-posta ve şifreyle giriş yapsın, akademi
ilerlemesi o kullanıcıya bağlansın.

**Başarı ölçütü:** Giriş yapmamış ziyaretçi herhangi bir sayfayı istediğinde
`/giris`'e yönlenir. Giriş yaptıktan sonra geldiği sayfaya döner, üst barda
oturum menüsü çıkar, çıkış yapabilir. Akademi yol haritası `user_progress`
tablosundan okunur.

## Kapsam

**Dahil:**
- `next-auth@5` Credentials sağlayıcısı, argon2id ile şifre doğrulama
- **JWT oturumu** (zorunlu — aşağıya bakın)
- Bölünmüş yapılandırma: `auth.config.ts` (Edge-güvenli) + `auth.ts` (Node)
- `middleware.ts` — tüm uygulamayı kapsayan matcher, JWT doğrulaması
- `(auth)/giris` ekranı: kabuk dışı, sunucu eylemi, açık yönlendirme koruması
- `npm run user:create` — hesap açma/şifre güncelleme script'i
- `StepStatus` 3 → 5 aşama ve onu tüketen bileşenler
- `getTracks()` / `getActiveTrack()` gerçek ilerlemeyi okur

**Hariç (bilinçli):**
- **Kayıt sayfası yok.** Kişisel panel, tek kullanıcı; açık kayıt kazanç
  sağlamadan saldırı yüzeyi ekliyordu. Hesap terminalden açılır.
- **İlerleme YAZMA yolu** — "tamamlandı" işaretleme UI'ı B'de, ders
  okuyucusuyla gelir. A yalnız okuma yolunu kurar ve kanıtlar.
- Şifre sıfırlama ve e-posta doğrulama — ikisi de SMTP kurulumu ister
- Rol/yetki (RBAC) — tek kullanıcı tipi var
- Oturum iptali — JWT'nin doğrudan sonucu (aşağıya bakın)

## Neden JWT — ve bedeli

**Auth.js'te Credentials sağlayıcısı veritabanı oturumuyla çalışmıyor**, yalnız
JWT ile. Bu bir tercih değil, kütüphanenin kısıtı. Sonuçları:

| | Sonuç |
|---|---|
| **Bedel** | Oturum sunucudan iptal edilemez; süresi dolana kadar geçerli. "Tüm cihazlardan çık" istenirse ek mekanizma gerekir (token sürümü sütunu vb.). |
| **Fayda** | JWT Edge'de doğrulanabiliyor, dolayısıyla **middleware gerçek bir güvenlik kontrolü yapabiliyor** — OAuth + veritabanı oturumu tasarımında yapamıyordu. |
| **Sadeleşme** | `account`, `session`, `verificationToken` tabloları ve `@auth/drizzle-adapter` bağımlılığı tamamen gereksiz kaldı. |

## Mimari — koruma katmanları

```
middleware.ts          JWT imzasını Edge'de doğrular       → güvenlik sınırı
   ▲
   │ authConfig (veritabanı ve argon2 İÇERMEZ)
   │
auth.config.ts ──────────────┐
                             ▼
                          auth.ts   Credentials + argon2 + Postgres
                             ▲
                             │
              (dashboard)/layout.tsx · sunucu eylemleri
              `auth()` — kimliği okur, ikinci sigorta
```

**`auth.config.ts`'e veritabanı veya argon2 import etmek yasak.** Middleware o
dosyayı Edge'de yüklüyor; Postgres sürücüsü ya da yerel kripto modülü girerse
çalışma anında patlar ve hata mesajı sebebi göstermez. Bu yüzden Credentials
sağlayıcısı `auth.ts`'te ve `authConfig.providers` bilerek boş — middleware'in
oturumu doğrulamak için sağlayıcıya ihtiyacı yok, JWT'yi çözmesi yeterli.

## Şema

Tek tablo. Auth.js'in `account` / `session` / `verificationToken` tabloları
OAuth ve veritabanı oturumu içindi, ikisi de kullanılmıyor.

```
user            id · name · email(unique) · password_hash · image · created_at
user_progress   user_id → user.id · step_id → steps.id · status · updated_at
                PK (user_id, step_id)
```

`password_hash` argon2id özeti; tuz özetin içinde saklanıyor, ayrı sütun yok.
**Şifrenin kendisi hiçbir yerde saklanmıyor.**

`step_status` enum'u beş değerli: `not_started`, `reading`, `answered`,
`reviewed`, `mastered`.

## Tip sözleşmesi değişikliği

`StepStatus` 3 → 5 aşama. Her aşama **gözlenebilir bir olaya** bağlı, hisse
değil: ders açıldı → sorular dolduruldu → AI geri bildirimi geldi → ortalama
skor ≥ 70.

`answered` ve sonrası B'de yazılmaya başlar. A'da `completedSteps` yalnız
`mastered` sayar; ara aşamalara ağırlık vermek (her biri %25) B'ye bırakıldı —
boş tabloda ağırlıklandırma görünmez, dolayısıyla şimdi yazmak doğrulanamaz
kod olurdu.

Etkilenen dosyalar grep ile bulundu ve güncellendi: `types/index.ts`,
`queries/academy.ts`, `services/academy.ts`, `RoadmapNode`, `RoadmapPreview`,
ve servisleri çağıran üç sayfa.

**Servis imzası:** `userId` sayfadan parametre olarak geçer, servis kendi içinde
`auth()` çağırmaz. Faz 1'de kurulan sınır kuralı — servisler bağlam değil veri
alır; böylece test edilebilir kalıyorlar ve Auth.js'e bağlanmıyorlar.

## Güvenlik kararları

- **Kullanıcı yok / şifre yanlış ayrımı yapılmıyor.** İkisi de "E-posta veya
  şifre hatalı" döndürüyor. Ayırmak, kayıtlı e-postaları saldırgana sayan bir
  uç nokta üretirdi (hesap sayımı).
- **Şifre yalnız sunucuda görülüyor.** Giriş bir sunucu eylemi; `formData`
  üzerinden tek yön akıyor, istemciye hiç inmiyor.
- **Şifre terminalde de görünmez.** `user:create` girdiyi ekrana basmıyor ve
  argümandan almıyor — argümandan alsaydı `.bash_history`'de düz metin kalırdı.
- **Açık yönlendirme koruması.** `?donus=` yalnız `/` ile başlayan ve `//` ile
  başlamayan göreli yolları kabul ediyor.

## Doğrulama

**Otomatik:** `typecheck`, `lint`, `build` — üçü de temiz. Migration üretildi ve
uygulandı; tablolar, enum ve OAuth tablolarının yokluğu veritabanından
doğrulandı.

**Test altyapısı kurulmadı.** A'nın mantığı neredeyse tamamen yapılandırma ve
yönlendirme. Vitest B'ye bırakıldı: cevap değerlendirme, skor eşiği ve aşama
geçiş mantığı gerçekten test edilmeye değer.

**Elle duman testi — tamamı geçti** (geçici test hesabıyla, sonra silindi):

| # | Test | Sonuç |
|---|---|---|
| 1 | Çıkışken `/akademi` | 302 → `/giris?donus=%2Fakademi` |
| 2 | Yanlış şifre | "E-posta veya şifre hatalı." |
| 3 | Doğru şifre | 303 → `/akademi`, `?donus` onurlandırıldı |
| 4 | Üst bar | Ad, e-posta ve çıkış menüsü |
| 5 | Çıkış | `POST /api/auth/signout` 200 |
| 6 | Çıkış sonrası `/topluluk` | → `/giris?donus=%2Ftopluluk` |
| 7 | Akademi yol haritası | 0/15 adım, tümü `not_started` (tablo boş) |
| 8 | Şifre saklama | `$argon2id` özeti, düz metin yok |

## Neden OAuth'tan vazgeçildi

Kod tarafında sorun yoktu: yetkilendirme URL'si doğru kuruluyordu
(`accounts.google.com`, doğru `client_id`, `redirect_uri` beklenen değerde) ve
Google'a kadar gidiliyordu. Engel Console'daydı — yönlendirme adresi, kullanılan
istemciden **farklı bir OAuth istemcisine** ekleniyordu (`4oehu…` vs `9mmmc3…`),
bu yüzden `redirect_uri_mismatch` sürdü. Kullanıcı düzeltmek yerine şifreli
girişe geçmeyi seçti.

Not: OAuth'a dönmek istenirse `account` tablosu ve adapter geri gelmeli, ve
oturum stratejisi tekrar seçilmeli — Credentials ile OAuth'u birlikte
kullanmak JWT'de kalmayı gerektirir.

## Riskler ve tuzaklar

**1. Edge runtime.** `auth.config.ts`'e `@/lib/db` veya `@node-rs/argon2`
import edilirse middleware çalışma anında patlar. Dosyanın başında yorumla
işaretli.

**2. TypeScript 5.x sabitlenmeli.** Makinede TS 7.0.2 kuruluydu ve Next 15
`paths` alias'larını sessizce görmüyordu. `typescript: ^5.9.3` korunuyor.

**3. `drizzle-kit generate` TTY istiyor.** Sütun ekleme/silme birlikte olduğunda
"bu bir yeniden adlandırma mı?" diye soruyor ve TTY yoksa patlıyor. Bu turda
tablolar boş olduğu için migration geri alınıp temiz üretildi; ileride dolu
tabloda aynı durum olursa migration elle yazılmalı.

**4. Oturum iptali yok.** JWT'nin doğrudan sonucu. Gerekirse `user` tablosuna
bir `token_version` sütunu eklenip JWT callback'inde karşılaştırılabilir.
