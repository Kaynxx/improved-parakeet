# Faz 2C Topluluk Duygu Analizi Tasarımı

## Amaç

Topluluk sayfasının `@/mocks` bağımlılığını kaldırıp gönderileri, anlık duyarlılık
özetini ve öne çıkan sembolleri Postgres ile Drizzle üzerinden dinamik ve
belirlenimci olarak üretmek.

## Kapsam

- `communities`, `community_posts` ve `post_tickers` tablolarını eklemek.
- Gönderi, özet ve trend sorgularını `src/lib/db/queries/sentiment.ts` içinde
  toplamak.
- Servis katmanındaki mevcut fonksiyon imzalarını koruyarak sorgulara bağlamak.
- Topluluk sayfasını her istekte yeniden değerlendirmek.
- Mevcut dört topluluğu, altı gönderiyi ve ticker bağlantılarını idempotent seed
  verisine dönüştürmek.
- Sentiment mock verisini ve ona özel bağımlılıkları kaldırmak.

## Şema

`src/lib/db/schema.ts` içinde `user_progress` tablosunun hemen altında
`// --- Topluluk ve Duyarlılık (2C) ---` bölümü bulunur.

- `sentiment_label`: `bullish`, `bearish`, `neutral` değerli PostgreSQL enum.
- `communities`: UUID birincil anahtar, varsayılan `reddit` platformu, benzersiz
  ad, görünür ad ve abone sayısı.
- `community_posts`: UUID birincil anahtar, topluluk FK'sı, gönderi alanları,
  nullable flair, dakikalık yaş ofseti ve duyarlılık alanları. Topluluk ve
  duyarlılık kolonları indexlenir.
- `post_tickers`: gönderi ve ticker FK'larından oluşan bileşik birincil anahtar.
  Ticker FK'sı ayrıca indexlenir.

FK'lar üst kayıt silindiğinde köprü veya gönderi kayıtlarını cascade ile temizler.
Şemadaki bütün zaman damgaları `timestamp("...", { withTimezone: true })`
kuralını korur. Yeni sentiment tablolarında gerçek zaman damgası tutulmaz;
`minutesAgoOffset` canlı simülasyonun kalıcı girdisidir.

Şema değişikliğinin uygulanabilir olması için Drizzle migration'ı üretilir.

## Veri Akışı

Sayfa yalnız servis katmanını, servis yalnız sorgu katmanını çağırır:

```text
topluluk/page.tsx
  -> server/services/sentiment.ts
    -> lib/db/queries/sentiment.ts
      -> getDb() -> Postgres
```

`getDb()` modül yüklenirken değil, fonksiyon çağrısı sırasında kullanılır. Böylece
Next.js derlemesinin modül keşfi sırasında veritabanı bağlantısı açılmaz.

### Son gönderiler

Gönderiler toplulukla bire-bir JOIN üzerinden `minutesAgoOffset` artan sırada
çekilir. Ticker bağlantıları ayrı bir sorguda alınır ve `Map<postId, Ticker[]>`
ile eşlenir. Boş gönderi kimliği listesinde `inArray()` çağrılmaz.

Her sonuç eşlenirken tek bir `now = Date.now()` değeri alınır ve:

```text
postedAt = new Date(now - minutesAgoOffset * 60_000).toISOString()
```

hesaplanır. Böylece kayıt sırası ve yaş farkları sabit, görünen tarih ise canlıdır.
Ham Drizzle satırları sorgu dosyasının dışına çıkmaz.

### Duyarlılık özeti

Son 24 saati temsil eden `minutesAgoOffset <= 1440` kayıtları kullanılır. Gönderi
sayısı, etiket sayımları ve ortalama `sentimentScore` hesaplanır. Ortalama skor
`0.05` üstündeyse `bullish`, `-0.05` altındaysa `bearish`, aksi durumda `neutral`
etiketi döner. Veri yoksa sıfır sayımlı, nötr ve sıfır skorlu bir özet döner.
`windowHours` değeri 24'tür.

### Öne çıkan semboller

Aynı 24 saatlik aktif gönderi kümesindeki ticker geçişleri sayılır. Her ticker
için toplam mention, bullish/bearish sayıları ve ortalama skor hesaplanır.

Geçmiş rollup tablosu olmadığı için değişim, aktif kayıtların yenilik sırasına
göre iki eşit döneme ayrılmasıyla belirlenir. Tek sayıdaki kayıtta yeni dönem bir
fazla kayıt alır. Her ticker için yeni ve eski dönem mention sayıları karşılaştırılır:

- Eski dönem sıfır, yeni dönem pozitifse değişim `100`.
- İki dönem de sıfırsa değişim `0`.
- Diğer durumda `((yeni - eski) / eski) * 100`, bir ondalığa yuvarlanır.

Sonuçlar önce mention sayısına göre azalan, eşitlikte sembole göre alfabetik
sıralanır ve istenen limite kesilir. Aynı veritabanı durumu her zaman aynı trend
sonucunu verir; rastgelelik ve sistem saatine dayalı sıralama kullanılmaz.

## Seed

Projenin çalışan seed giriş noktası `scripts/seed.ts` olduğundan değişiklik burada
yapılır; kullanılmayan `src/lib/db/seed.ts` oluşturulmaz.

- Dört topluluk adlarına göre `onConflictDoNothing` ile eklenir.
- Altı gönderi sabit UUID'lerle ve mock'taki tarih yaşları
  `minutesAgoOffset` değerlerine çevrilerek eklenir.
- Topluluk kimlikleri benzersiz adlardan, ticker kimlikleri mevcut sembollerden
  sorgulanır; eksik zorunlu bağlantı sessizce atlanmaz, hata verir.
- Gönderiler sabit UUID birincil anahtarlarıyla, köprü kayıtları bileşik anahtarla
  `onConflictDoNothing` kullanır.
- Tekrarlanan `npm run seed` mevcut sentiment kayıtlarını çoğaltmaz.

Statik `sentimentSummary` ve `tickerSentiments` seed edilmez; bunlar sorgu anında
altı gönderiden türetilir.

## Mock ve Servis Temizliği

`src/server/services/sentiment.ts` içindeki `@/mocks` importu kaldırılır. Mevcut
`getRecentPosts`, `getSentimentSummary` ve `getTrendingTickers` imzaları korunur
ve sorgu fonksiyonlarına doğrudan delege edilir.

`src/mocks/index.ts` içinden şunlar kaldırılır:

- Topluluk sabitleri.
- Altı sentiment gönderisi.
- Statik sentiment özeti ve ticker trendleri.
- Yalnız sentiment için kullanılan ticker girdileri ve tip importları.
- Faz 2C'nin hâlâ mock olduğu yönündeki geçersiz yorumlar.

Piyasa mock verisi ve onun kullandığı `ago()` yardımcısı korunur.

## Sayfa ve Önbellek

`src/app/(dashboard)/topluluk/page.tsx` dosyasına
`export const dynamic = "force-dynamic";` eklenir. Sayfanın paralel servis çağrıları
ve UI sözleşmesi değişmez.

## Hata Davranışı

- Boş sorgu sonuçları geçerli boş tip sözleşmelerine dönüştürülür.
- Seed sırasında bulunamayan topluluk veya ticker sessizce atlanmaz.
- Sorgu katmanı veritabanı hatalarını maskelemez; servis çağrısı reddedilir.
- Limit uygulanmadan önce sıralama belirlenimci hale getirilir.

## Test ve Doğrulama

Saf özet ve trend dönüşümleri test-öncelikli geliştirilir. Testler boş veri,
etiket eşikleri, ticker sayımları, iki dönem değişim hesabı ve eşitlik sıralamasını
kapsar.

Uygulamadan sonra komutlar şu sırayla çalıştırılır:

1. `npm run format`
2. `npm run typecheck`
3. `npm run lint`
4. `.next` klasörünü güvenli biçimde temizleme
5. `npm run build`

Her komutun exit kodu doğrulanır. Kullanıcı talebi gereği
`finishing-a-development-branch` çağrılmaz.
