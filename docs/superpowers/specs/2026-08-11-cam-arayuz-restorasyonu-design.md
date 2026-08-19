# Cam arayüz restorasyonu — koyu, keskin ve veri odaklı

Tarih: 2026-08-11 · Durum: **tasarım onaylandı**

## Bağlam

`2026-08-05-cam-arayuz-tasarimi-design.md` belgesi koyu, gri tonlu ve keskin
hatlı liquid-glass arayüzü tarif ediyor. Bu tasarım geçmişte uygulanmış olsa da
güncel çalışma ağacı daha sonra açık renkli, yumuşak köşeli bir “editorial
luxury” sisteme geçmiş durumda.

Bu çalışma eski commitleri geri almak yerine güncel bileşenleri, yeni veri
akışlarını ve sonraki fazlarda eklenen işlevleri koruyarak 2026-08-05 tasarım
dilini yeniden kurar.

Kullanıcı görsel karşılaştırmada **A — spec’e sadık koyu, keskin cam** yönünü
seçti. Kapsam, bileşen yaklaşımı, veri akışı ve doğrulama ölçütleri ayrı ayrı
onaylandı.

## Amaç

Uygulamanın tüm kullanıcı arayüzünü tek koyu tema altında birleştirmek:

- koyu gri zemin ve düşük alfa cam yüzeyler,
- kartlarda 4 px, iç yüzeylerde 3 px köşe yarıçapı,
- nötr vurgu; yeşil ve kırmızının yalnızca finansal yön bildirmesi,
- makine verisi için mono, anlatı için sans tipografi,
- okunabilir, erişilebilir ve ölçülü bir cam etkisi.

## Kapsam dışı

- Veritabanı şeması, sorgular, servisler ve seed akışları değişmeyecek.
- Faz 2C duyarlılık ve Faz 2F piyasa verileri mock’a geri dönmeyecek.
- Eski tasarım commitleri checkout, revert veya cherry-pick ile geri
  getirilmeyecek.
- Yeni ürün özelliği, yeni sayfa veya yeni veri alanı eklenmeyecek.
- Açık tema veya kullanıcı tarafından seçilebilir tema oluşturulmayacak.

## Tasarım sistemi

### Renk ve yüzey tokenları

2026-08-05 spec’inin ölçülmüş tokenları kaynak kabul edilir:

```css
--color-base: #0a0a0c;
--color-surface: rgb(255 255 255 / 0.045);
--color-elevated: rgb(255 255 255 / 0.055);
--color-hairline: rgb(255 255 255 / 0.10);
--color-hairline-strong: rgb(255 255 255 / 0.20);
--color-ink: #f4f5f7;
--color-ink-muted: #a3a8b2;
--color-ink-faint: #8d929b;
--color-accent: #e8eaee;
--color-up: #2dd4a0;
--color-down: #ef4444;
--radius-card: 4px;
--radius-inner: 3px;
```

Mevcut mavi aksan kaldırılır. Nötr aksan gezinme, odak ve etkileşim vurgusunu;
yeşil/kırmızı ise yalnızca fiyat veya duyarlılık yönünü taşır. Yön bilgisi renk
dışında ok, işaret ve metinle de verilmeye devam eder.

### Cam katmanları

Cam etkisi üç seviyede sınırlandırılır:

1. `.glass-chrome`: Sidebar, TopBar ve NewsTicker için daha güçlü blur.
2. `.glass`: Bento ve iskelet kartları için standart blur.
3. `.inset-panel`: Kart içi kutularda saydam dolgu ve kenar; blur yok.

Blur değerleri yalnızca ortak yardımcı sınıflarda tanımlanır. Bileşenler kendi
blur sayılarını taşımaz. İç içe blur uygulanmaz ve `backdrop-filter` hover
geçişine sokulmaz.

Camı görünür yapan ana unsur yoğun bulanıklık değil, üst kenardaki ışık imzasıdır.
Zemindeki iki çok düşük yoğunluklu radyal ışık alanı, kart altından geçerken cam
yüzeyin okunmasını sağlar; görünür bir dekoratif gradyana dönüşmez.

### Keskinlik

Kartlar 4 px, iç kutular ve rozetler 3 px olur. Yalnızca anlamsal olarak daire
olan durum noktaları, ilerleme göstergeleri, avatarlar ve ölçer topuzları tam
yuvarlak kalır. Büyük `rounded-*` değerleri ve dekoratif pill biçimleri kaldırılır.

### Tipografi

Güncel Schibsted Grotesk, Source Serif ve IBM Plex Mono bileşimi yerine
2026-08-05 sistemine dönülür:

- **Geist Sans:** başlık, açıklama, haber ve ders gibi insan anlatısı,
- **Geist Mono:** sayı, sembol, zaman, bölüm etiketi ve durum gibi makine sesi.

Serif başlıklar kaldırılır. Mono kullanım her metne yayılmaz; cümle akışındaki
durum rozetleri sans kalabilir. Amaç dekorasyon değil, veri ile anlatıyı bakışta
ayırt etmektir.

## Bileşen mimarisi

### Ortak katman

`globals.css` tokenların, cam yardımcı sınıflarının, odak davranışının, ışık
alanının ve erişilebilirlik medya sorgularının tek kaynağı olur. Görsel kararlar
bileşenler arasında kopyalanmaz.

`BentoCard` ve `SkeletonCard` standart kart yüzeyini uygular. Böylece bunları
kullanan haber, akademi, topluluk ve piyasa bölgeleri varsayılan olarak aynı
dili edinir.

### Uygulama kabuğu

`Sidebar`, `TopBar` ve varsa sürekli haber bandı `.glass-chrome` kullanır.
Gezinme aktifliği nötr parlaklık, kenar ve konumla anlatılır; mavi vurguya
bağlanmaz. Arama alanı chrome içinde kaybolmaması için `.inset-panel` olur.

### Veri bileşenleri

`TodayBrief`, piyasa özeti, haber kartları, topluluk gönderileri, duyarlılık
ölçeri, öne çıkan semboller, akademi yol haritası ve video kartları ortak
tokenlardan beslenir. Gerektiğinde yalnızca kendi içerik geometrileri için
hedefli sınıf değişiklikleri alırlar.

Saydam `surface` tokenına yanlışlıkla opaklık görevi yüklenmez:

- Güncel SentimentMeter'ın merkezden ayrışan çubuk modeli korunur; eski tasarımdaki
  ibre geri getirilmez. Ölçek zemini `elevated`, merkez çentiği güçlü hairline
  tokenından beslenir.
- Sparkline son değer çapası taban rengine bağlanır.
- NewsTicker kenar maskeleri taban renginden türetilir.
- Chrome içindeki arama ve benzeri alanlar `inset-panel` kullanır.

### Durum bileşenleri

Yüklenme, boş veri ve hata durumları ana içerikten farklı bir tema oluşturmaz.
İskeletler cam kart geometrisini; boş ve hata durumları aynı metin hiyerarşisini
ve keskin iç panel sistemini kullanır. Mevcut hata yakalama ve veri yokluğu
davranışları değiştirilmez.

## Veri akışı

Sunucu bileşenleri aynı servis fonksiyonlarını çağırmaya devam eder. Sunucudan
gelen veri aynı TypeScript sözleşmeleriyle mevcut sunum bileşenlerine aktarılır;
bu çalışmada veri dönüştürme veya istemci tarafı veri kaynağı eklenmez.

Özellikle:

- piyasa verisi mevcut canlı sağlayıcıdan,
- topluluk gönderileri ve duyarlılık özetleri Postgres/Drizzle sorgularından,
- haber, akademi ve video içeriği mevcut servislerinden gelmeye devam eder.

Bu sınır, görsel restorasyonun iş mantığını ve belirlenimci Faz 2C davranışını
bozmasını engeller.

## Erişilebilirlik ve performans

- Bütün etkileşimli öğelerde görünür `:focus-visible` halkası bulunur.
- Metin tokenları gerçek birleşmiş cam yüzeyi üzerinde WCAG AA kontrastını
  korur.
- `prefers-reduced-motion: reduce` altında dekoratif hareketler kapanır veya
  anlık hâle gelir.
- `prefers-reduced-transparency: reduce` altında blur kapanır ve cam yüzeyler
  opak `#101216` tabana dönüşür.
- İç içe blur kullanılmaz; blur yalnızca kart ve chrome seviyesindedir.
- Yön bilgisi yalnız renkle aktarılmaz.

## Uygulama kapsamındaki dosya grupları

Kesin liste uygulama planında güncel kod taramasıyla çıkarılacak; beklenen gruplar:

- `src/app/globals.css` ve `src/app/layout.tsx`,
- uygulama kabuğu bileşenleri,
- ortak kart ve iskelet bileşenleri,
- piyasa, haber, topluluk ve akademi sunum bileşenleri,
- yalnızca görsel sözleşmeyi doğrulamak için ilgili testler.

İlgisiz dosyalar, veritabanı katmanı ve çalışma ağacındaki kullanıcıya ait diğer
değişiklikler korunur.

## Doğrulama ve kabul ölçütleri

### Otomatik doğrulama

Aşağıdaki komutlar sırayla temiz çıkmalıdır:

1. `npm run format`
2. `npm run typecheck`
3. `npm run lint`
4. `.next` klasörü güvenli biçimde temizlendikten sonra `npm run build`

Format komutu kapsam dışı kullanıcı değişikliklerini etkilerse sonuç diff ile
incelenir ve yalnız bu tasarıma ait değişiklikler teslimata dahil edilir.

### Görsel ve davranışsal doğrulama

1440, 768 ve 375 px genişliklerde en az şu kontroller yapılır:

- yatay taşma yok,
- metin ve kontroller kırpılmıyor,
- Sidebar/TopBar ve kart katmanları birbirinden okunuyor,
- cam yüzey üstünde metin kontrastı yeterli,
- klavye odağı bütün odaklanabilir öğelerde görünür,
- azaltılmış hareket ve azaltılmış saydamlık tercihleri işlevsel,
- tarayıcı konsolunda yeni hata yok,
- topluluk, piyasa, haber ve akademi verileri tasarım değişiminden sonra aynı
  kaynaklardan yükleniyor.

## Başarı tanımı

Çalışma, uygulamanın tüm ana ekranlarında A yönündeki koyu ve keskin cam dilini
tutarlı biçimde gösterdiğinde; mevcut veri akışları değişmediğinde; erişilebilirlik,
responsive görünüm ve üretim derlemesi doğrulandığında tamamlanmış sayılır.
