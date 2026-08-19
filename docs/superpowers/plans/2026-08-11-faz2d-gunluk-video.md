# Faz 2D — Günlük video alanını doğrulanmış ders videolarına bağlama

> Tarih: 2026-08-11 · Dal: `faz2bc-akademi-mufredat`

## Karar

Günlük video paneli **korunur ama kaynağı değişir**: mock yerine akademi
derslerinin doğrulanmış YouTube kaynaklarından beslenir. YouTube Data API
entegrasyonu **gereksiz kapsam olarak kapatılır**.

### Neden Data API değil

Otomatik keşif, video kümesi açık uçlu olduğunda kazanç sağlar. Burada küme
sabit: 8 haftalık müfredat elle araştırıldı, 40 videonun tamamı repoda
frontmatter olarak duruyor ve seed URL çözülemezse **hata fırlatıyor** — yani
kimlikler yayın anında doğrulanmış sayılır. Data API bu durumda kota yönetimi,
anahtar saklama, kanal güvenilirlik ölçütü ve yenileme sıklığı sorunlarını
çözmediğimiz bir problem için getirirdi.

### Bugünkü durumun teşhisi

`getDailyVideo()` tek bir sabit nesne döndürüyor: `youtubeId` alanı düz metin
`"mock-video-id"`, `stepSlug` ise Faz 1'den kalma ve **artık var olmayan**
`portfoy-cesitlendirme`. `VideoCard` ise atıl — bağlantı yok, gömülü oynatıcı
yok, `youtubeId` alanını hiç okumuyor. Panel `/` ve `/akademi` sayfalarında
oynatılamayan, İngilizce başlıklı, ölü bir adıma işaret eden bir süs.

## Kapsam

- `VideoSuggestion` sözleşmesi gerçek veriye göre yeniden yazılır. Mevcut tip
  mock'un şeklini anlatıyor: `durationSec`, `publishedAt`, `thumbnailUrl`
  alanlarının `lesson_sources` tarafında karşılığı yok.
- Seçim **belirlenimci** olur: aynı gün içinde her istekte aynı video gelir,
  ertesi gün değişir. Rastgelelik yok — her sayfa yenilemesinde değişen bir
  "günün videosu" güven vermiyor.
- Kart tıklanabilir olur ve videonun ait olduğu derse götürür.
- `dailyVideo` mock'u ve artık kullanılmayan alanlar silinir.

## Adımlar

1. `src/types/index.ts` — `VideoSuggestion` gerçek alanlarla yeniden yazılır.
2. `src/lib/db/queries/lesson.ts` — `findVideoSources()`: `kind = 'video'` ve
   `youtube_id` dolu kaynakları ders/hafta bilgisiyle birlikte belirlenimci
   sırada döndürür.
3. `src/server/services/video.ts` — mock importu kaldırılır; gün indeksine göre
   seçim yapılır.
4. `src/components/academy/VideoCard.tsx` — bağlantılı karta dönüşür.
5. `src/mocks/index.ts` — `dailyVideo` silinir.
6. Doğrulama: `format` → `typecheck` → `lint` → temiz `build` → oturumlu rota
   kontrolü (`/` ve `/akademi` kartı basıyor, bağlantı derse gidiyor).

## Tamamlanma ölçütü

`video.ts` içinde mock importu kalmaz; günlük video alanı doğrulanmış ders
kaynaklarından beslenir; kart gerçek bir derse götürür; `YOUTUBE_API_KEY`
gerekmez.
