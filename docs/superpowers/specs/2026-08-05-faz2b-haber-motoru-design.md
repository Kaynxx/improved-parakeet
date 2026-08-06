# Faz 2B — Haber motoru (Tasarım)

Tarih: 2026-08-05 · Durum: **uygulandı ve doğrulandı**

## Amaç

`articles` tablosu gerçek RSS verisiyle dolsun; haber paneli, haberler sayfası
ve üst şerit canlı içerik göstersin. Makaleler sembollerle ilişkilensin.

## Tasarımı belirleyen ölçüm

Tasarım yapmadan önce sekiz feed test edildi. İki sonuç her şeyi belirledi:

| Bulgu | Sonuç |
|---|---|
| **Hiçbir feed tam makale metni vermiyor** — özetler 155–379 karakter | Gövde saklama kararı değişti |
| **Cointelegraph her istekte ECONNRESET** (4/4 deneme) | Kaynak devre dışı bırakıldı |

Kalan yedi kaynak 200 dönüyor ve 7–42 arası kayıt veriyor.

## Kritik karar: gövde çıkarılmıyor

Plandaki orijinal niyet Readability ile tam metin çıkarmaktı. Yapılmadı.

Yayıncılar RSS'te bilerek teaser veriyor — trafiği kendi sitelerine çeksinler
diye. Her makalenin HTML'ini çekip gövdesini kopyalamak bu kaynakların kullanım
şartlarıyla çelişir, ayrıca çoğu Cloudflare arkasında olduğu için düzensiz
başarısız olurdu.

Uygulanan kural: **yayıncı feed'de tam metni kendisi verirse saklanır, vermezse
özetle yetinilir.** `content:encoded` alanı ≥1200 karakter metin taşıyorsa gövde
sayılır, altındaki teaser'dır ve özet olarak kullanılır.

Ölçülen gerçek: sekiz kaynağın **hiçbiri** tam metin vermiyor (0/141 makale).
Yani pratikte her makale "başlık + özet + link" olarak duruyor.

> Karar geri alınabilir. `content_html` / `content_text` kolonları duruyor ve
> UI ikisini de destekliyor; dolduran bir yol eklenirse sayfa kendiliğinden
> gövdeyi gösterir.

Bu, ürünün değer önermesini de netleştiriyor: değer gövdeyi kopyalamak değil,
**yedi kaynağı tek akışta toplayıp sembollerle ilişkilendirmek.**

## Mimari

```
scripts/worker.ts  (node-cron)      scripts/ingest.ts  (tek sefer)
        └──────────────┬──────────────────┘
                       ▼
        server/integrations/rss/ingest.ts     ← orkestrasyon
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     feed.ts       article.ts     tickers.ts
   (ağ + XML)   (slug, sanitize)  (eşleştirme)
                       ▼
                    lib/db → Postgres
```

Her dosya tek işi biliyor: `feed.ts` ağ ve XML lehçelerini, `article.ts` saf
dönüşümü (ağsız, veritabanısız), `tickers.ts` eşleştirmeyi, `ingest.ts` sırayı
ve hata kaydını.

**Yazma yolu okuma yolundan ayrı.** `systemPatterns.md`'deki kural burada
uygulanıyor: worker ayrı bir süreç, Next sunucusuyla yalnız veritabanında
buluşuyor. Bir feed 20 saniye takılsa panel etkilenmez.

## Şema dilimi (2B)

**`ingestion_runs`** — bir satır = bir kaynağın bir taraması.
`sourceId, status(running|success|error), startedAt, finishedAt, itemsSeen,
itemsInserted, error`.

Neden var: çekim ağ üzerinden, dış sistemlere bağlı ve sessizce bozulabilen bir
iş. "Neden yeni haber yok?" sorusunun cevabı ancak burada durur — kaynak mı 403
dönüyor, feed mi boş, yoksa hepsi zaten görülmüş mü.

**`articles.url` benzersiz yapıldı.** Bazı feed'ler aynı makaleye zamanla farklı
guid üretiyor; guid tek başına tekilleştirme için yetmiyor, URL ikinci savunma
hattı. `onConflictDoNothing()` hedefsiz kullanılıyor ki guid, slug ve url
kısıtlarının üçünü birden karşılasın.

## Tekilleştirme ve slug

- Feed içi tekrarlar önce JS'te `Map` ile eleniyor (aynı komutta aynı anahtar
  gönderilmesin).
- Slug: `slugify(başlık) + guid'in sha1'inin ilk 7 hanesi`. Aynı makale her
  zaman aynı slug'ı üretir, farklı makaleler çakışmaz. Türkçe karakterler
  çevriliyor.

**Doğrulandı:** ikinci çalıştırma 0 yeni satır üretti (Yahoo'nun o dakika
yayınladığı 7 gerçek yeni makale hariç).

## Sembol eşleştirme

Çıplak sembol **aranmıyor** — GOLD, META, ON, ALL gibi semboller normal
kelimelerle çakışıyor. İki güvenilir sinyal:

1. `$NVDA` biçiminde cash-tag
2. Şirket/varlık adı — "Nvidia", "Bitcoin", "S&P 500"

Adlar kurumsal ekler temizlenerek türetiliyor ("NVIDIA Corp." → "nvidia").
Basında farklı ad kullanılan haller küçük bir `EXTRA_ALIASES` tablosunda
(XAU → "gold", EURUSD → "eur/usd" gibi) — elle bakılan tek yer orası.

**Gerçek veride bulunan yanlış pozitif:** "Bitcoin's Real Gold **Standard** Test"
başlığı XAU'ya bağlanmıştı. "gold standard" bir deyim, metal değil. Eşleştirmeden
önce metinden çıkarılan bir deyim listesi eklendi (`gold standard/rush/medal/age`,
`golden`).

> Eşleştirme kuralı değişirse **yalnız yeni makaleleri** etkiler. Geçmişi
> yeniden bağlamak için `article_tickers` temizlenip yeniden çekim gerekir.

## Zamanlama

```
npm run ingest    # tek sefer — test ve hata ayıklama için
npm run worker    # node-cron, varsayılan */15 * * * * (INGEST_CRON ile değişir)
```

Çekirdek düz bir fonksiyon (`ingestAllSources`); ikisi de onu çağırıyor.
Worker'da iki koruma var: önceki tur bitmeden yenisi başlamaz, ve bir turun
çökmesi zamanlayıcıyı durdurmaz.

Kaynaklar **sırayla** taranıyor — paralel gitmek engellenme riskini artırır ve
kazanç yok, bu iş kullanıcıyı bekletmiyor.

## Hata yönetimi

- **Kaynak çökerse:** hata `ingestion_runs`'a yazılır, tur sıradaki kaynakla
  devam eder. Bir kaynağın 403'ü diğer yedisini durdurmaz.
- **Feed boşsa / kayıt bozuksa:** başlıksız veya linksiz kayıtlar sessizce
  atlanır; tarihi çözülemeyen kayıt da atlanır.
- **Ağ hatası `fetchFeed`'de yutulmaz,** yukarı fırlatılır — çağıran onu kaydeder.

## UI sonuçları

Gövde olmayınca üç şey düzeltilmek zorunda kaldı:

1. **`Article.url` eklendi.** Tip ve mapper bu alanı düşürüyordu — bir haber
   toplayıcısında kaynağa çıkan link olmaması gerçek bir eksikti.
2. **`Article.contentText` nullable oldu.** Boş dizeye çevirmek gövdenin
   olmadığı gerçeğini gizliyordu; UI'ın bunu bilmesi gerekiyor.
3. **Okuma süresi rozeti koşullu.** Gövde yoksa gösterilmiyor — teaser'dan
   hesaplanmış bir süre uydurma olurdu.

`ArticleReader` artık gövdesiz duruma göre kurulu: başlık, kaynak, zaman,
görsel, özet ve belirgin bir **"Haberin tamamını kaynakta oku"** bağlantısı.
Görsel `next/image` yerine düz `img` ile yükleniyor; kaynak alan adları önceden
bilinemediği için joker `remotePatterns` gerekirdi ve o da Next'in optimizasyon
uç noktasını keyfi URL'leri çeken bir vekile çevirirdi.

### Kaynak çeşitliliği

Düz `order by published_at desc` panelde işe yaramadı: Seeking Alpha onlarca
kaydı aynı damgayla döküyor ve altı satırın altısını da kendisi dolduruyordu.
Tek kaynağı gösteren şey toplayıcı değildir.

`findLatestDiverseArticles(limit, maxPerSource = 2)` eklendi. Panel ve üst şerit
bunu kullanıyor; haberler sayfası tam listeyi (`findLatestArticles`) kullanmaya
devam ediyor — orada "her şey, en yeniden eskiye" doğru davranış.

## Temizlik

`src/mocks/index.ts`'ten makale ve ticker-şeridi mock'ları silindi (144 satır).
2A haberleri DB'ye taşımıştı; hiçbir yer import etmiyordu. `sources` mock bloğu
da yalnız onlar tarafından kullanılıyordu, o da gitti. Mock dosyası artık
küçülüyor: kalan içerik topluluk (2C), video (2D), piyasa (2F).

## Doğrulanmış durum

- `tsc --noEmit` 0 hata · `biome check` 0 uyarı (56 dosya) · `next build` exit 0
- İlk çekim: **134 yeni makale**, 7/8 kaynak (Cointelegraph engelli)
- İkinci çekim: 0 yeni satır → tekilleştirme kanıtlandı
- Cointelegraph devre dışı bırakıldıktan sonra: **7/7 kaynak başarılı**
- Worker gerçekten çalıştırıldı: açılış turu + zamanlanmış tur, ikisi de doğru
- `article_tickers`: 27 bağ, yanlış pozitifler denetlendi ve temizlendi
- 1440/768/375px: yatay taşma yok, konsol hatası yok

## Bilinen sınırlar

| Konu | Durum |
|---|---|
| Makale gövdesi yok | Bilinçli — yukarıdaki karar |
| Cointelegraph engelli | `is_active=false`, kayıt duruyor |
| 141 makalenin 75'inde özet var | Yahoo/Investing/SeekingAlpha feed'i özet vermiyor |
| `is_breaking` hep false | Hiçbir feed işaret vermiyor; uydurulmuyor |
| Kaynaklar arası aynı haber iki kez | Farklı guid + farklı URL — tekilleştirilmiyor |
| Eşleştirme değişikliği geçmişe uygulanmaz | Yeniden bağlama yolu yok (henüz gerekmedi) |
| Otomatik test yok | Vitest hâlâ kurulmadı; doğrulama gerçek çekimle yapıldı |
