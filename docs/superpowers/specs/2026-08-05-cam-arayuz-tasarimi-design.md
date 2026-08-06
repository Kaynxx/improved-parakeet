# Cam arayüz — gri tonlar, keskin hatlar, liquid glass (Tasarım)

Tarih: 2026-08-05 · Durum: **uygulandı ve doğrulandı**

## Brief

Kullanıcının isteği: paneli gri tonlara çevirmek, hatları keskinleştirmek,
liquid glass eklemek. Üç karar kullanıcıya soruldu:

| Soru | Seçim |
|---|---|
| Kehribar aksan ve piyasa renkleri | Kehribar gitsin, yeşil/kırmızı kalsın |
| Köşe yarıçapı | 4px — keskin ama tıraşlı |
| Cam nereye | **Her şey cam** (riskleri bildirilerek seçildi) |

Bu tamamen sunum katmanı. Veri katmanına, servislere, sorgulara dokunulmadı.

## Token sistemi

```
zemin        --color-base            #0a0a0c
kart camı    --color-surface         rgb(255 255 255 / 0.045)
iç kutu      --color-elevated        rgb(255 255 255 / 0.055)
kenarlık     --color-hairline        rgb(255 255 255 / 0.10)
             --color-hairline-strong rgb(255 255 255 / 0.20)
metin        --color-ink             #f4f5f7
             --color-ink-muted       #a3a8b2
             --color-ink-faint       #8d929b
aksan        --color-accent          #e8eaee
yön          --color-up / --color-down   #2dd4a0 / #ef4444   (değişmedi)
yarıçap      --radius-card / --radius-inner   4px / 3px
```

`surface` ve `elevated` artık **opak değil**. Beyazın düşük alfalı katmanları;
altlarındaki ışık alanını geçirmeleri gerekiyor. Opak olsalardı blur'un kıracağı
hiçbir şey kalmazdı.

### Neden kehribar gitti

Panelde iki farklı renk sistemi vardı: kehribar "buraya bak" diyordu, yeşil/kırmızı
"piyasa şu yöne gidiyor" diyordu. İkisi aynı anda göz çekince yön sinyali
zayıflıyordu. Aksan nötrleşince panelde renk taşıyan **tek** şey piyasa yönü kaldı;
vurgu artık parlaklıkla yapılıyor.

## Cam sistemi

İki utility, iki değişken. Blur tek yerde tanımlı; bileşenler `.glass` veya
`.glass-chrome` yazar, sayı yazmaz.

```
.glass         surface + blur(14px) saturate(140%) + --glass-edge   → bento kartlar
.glass-chrome  surface + blur(24px) saturate(160%) + --glass-edge   → sidebar, üst bar, ticker
.inset-panel   elevated + 1px üst çizgi, blur YOK                   → kart içi kutular
```

### İmza öğe: kenar, blur değil

Liquid glass'ı okutan şey bulanıklık değil, kenardaki ışık.

```css
--glass-edge:
  inset 0 1px 0 rgb(255 255 255 / 0.2),        /* sert rim */
  inset 0 6px 10px -8px rgb(255 255 255 / 0.3), /* yumuşak saçılma */
  inset 0 -1px 0 rgb(0 0 0 / 0.4);              /* alt gölge */
```

Işığın **dolguya değil kenara** binmesi bilinçli: dolgunun üstüne parlama koymak
camı daha görünür yapardı ama birleşmiş yüzeyi açıp metin kontrastını düşürürdü.
Kenar, içerik dolgusunun (20px) dışında kaldığı için bedava.

### Işık alanı

Düz koyu zemin üstünde `backdrop-filter` görünmez bir işlemdir — bulanıklaştıracak
doku yoksa sonuç yine düz koyudur. `body`'ye iki geniş radyal gradyan konuldu
(beyaz %3,5 sol üst · %2,2 sağ alt), `background-attachment: fixed`. Sayfa
kayarken kartların altındaki ışık kayıyor ve kenar parlaklığı buna göre değişiyor.

Gradyan bilinçli olarak **zayıf** tutuldu. Güçlendirmek camı daha görünür yapardı
ama iki bedeli vardı: her senaryoda `ink-faint`'i 4.5'in altına itiyordu, ve
görünür bir radyal gradyan tam olarak "yapay zekâ tasarımı" kümesine düşen şeydir.

### Blur iç içe geçmiyor

Yalnız kart ve chrome seviyesi `backdrop-filter` alır. İç kutular saydam dolgu +
kenar alır, kendi blur'unu almaz. 30 bileşende iç içe blur compositor'ı her karede
yeniden çalıştırır; asıl maliyet oradadır.

`backdrop-filter`'a `transition` yok — hover geçişleri yalnız kenarlık üzerinde.

## Erişilebilirlik — "her şey cam" kararının bedeli ölçüldü

Kontrast, token değerine karşı değil **camın zemin üstünde birleşmiş gerçek
rengine** karşı ölçüldü (alan → kart → iç kutu üst üste yığılarak).

| Yüzey | Birleşmiş renk | ink | ink-muted | ink-faint |
|---|---|---|---|---|
| kart camı | rgb(30,30,32) | 16,7 | 6,98 | 5,32 |
| iç kutu | rgb(42,42,44) | 15,8 | 6,50 | **4,58** |

İki token bu ölçüm yüzünden değişti:

- **`ink-faint` #71767f → #8d929b.** Saydam yüzey metnin arkasını açtığı için
  üçüncül ton 3,40'a düşüyordu. Cam kararının doğrudan bedeli.
- **`elevated` %7 → %5,5.** İlk ölçümde iç kutuları yanlış yığmıştım (doğrudan
  zemin üstüne). Kutular camın *içinde*; doğru yığınla %7 hâlâ 4,33 veriyordu.

`muted` ile `faint` arasında 1,31'lik parlaklık basamağı korundu — hiyerarşi
düzleşmedi.

Yön çifti yeniden doğrulandı: deutan ΔE **14,5** · normal ΔE **36,6** · yüzey
kontrastı ≥ 3:1. Renk zaten hiçbir yerde tek taşıyıcı değil (▲/▼ + işaretli sayı).

`prefers-reduced-transparency: reduce` → cam kapanır, düz `#101216` gelir.
Efekt gider, işlev kalır.

## Saydamlaşan token'ın kırdığı yerler

`surface` opaklığını kaybedince ona *opak* olduğu için güvenen üç yer bozuldu:

1. **`SentimentMeter` ibresi** — `border-surface` halkası ibreyi renkli çizgiden
   ayırıyordu; saydam olunca ayıramaz oldu. `border-base`'e bağlandı.
2. **`NewsTicker` kenar maskeleri** — `from-surface` gradyanı artık hiçbir şeyi
   maskelemiyordu. `from-base`'e çevrildi.
3. **`TopBar` arama kutusu** — `bg-surface` chrome camının üstünde kayboluyordu.
   `.inset-panel`'e geçti.

## Keskinlik

`radius-card` 16 → 4px, `radius-inner` 10 → 3px, `hairline` %6 → %10,
`hairline-strong` %12 → %20.

Pill rozetler (Son dakika, Boğa/Ayı çipleri) `rounded-full`'dan `radius-inner`'a
indi — 5 nokta. Gerçekten daire olanlar daire kaldı: durum noktaları, yol haritası
düğümleri, ölçer topuzu, ilerleme çubukları.

## Bu iş sırasında kapatılan boşluk

`TopBar` arama kutusunda `focus:outline-none` vardı; odak göstergesi olarak yalnız
kenarlığın %10'dan %20'ye çıkmasına güveniyordu. Bu görünür bir odak göstergesi
değil. Kaldırıldı, ortak `:focus-visible` halkası artık orada da beliriyor.
Faz 1'den kalma bir açıktı.

## Değişen dosyalar

`globals.css` (token + cam sistemi) · `BentoCard` · `SkeletonCard` · `Sidebar` ·
`TopBar` · `NewsTicker` · `SentimentMeter` · `NewsCard` · `ArticleReader` ·
`PostCard` · `TrendingTickers`. Kalan ~20 bileşen token'lardan beslendiği için
kendiliğinden döndü.

## Doğrulama

- `tsc --noEmit` 0 hata · `biome check` 0 uyarı (49 dosya) · `npm run build` başarılı
- 1440 / 768 / 375px: yatay taşma yok, konsol hatası yok
- Odak halkası: bizim 16 odaklanabilir öğemizin **16'sında** `2px solid #e8eaee`,
  anında. (Ölçümde görünen 17. öğe Next'in geliştirme aracı düğmesi — üretimde yok.)
- Kontrast ve CVD ölçümleri yukarıda

## İkinci geçiş — tipografi, boşluk, sessizleştirme (2026-08-05)

İlk geçiş renk ve yüzeyi çözdü ama tasarımı tamamlamadı. Ekrana bakınca üç şey
kaldı: **ses yok, boşluk konuşmuyor, en gürültülü şey imza değil.**

### 1. İki ses — imza öğe artık tipografi

Panelin tipografik kuralı:

> **Mono = makinenin sesi.** Etiket, sayı, durum.
> **Sans = insanın sesi.** Başlık, özet, ders metni.

Kural öğrenilebilir olduğu için arayüz gezilirken "bu bir ölçüm mü, anlatı mı"
sorusu okumadan cevaplanıyor.

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--color-ink-faint);
}
```

Bölüm etiketleri 13px **sans** uppercase idi — herhangi bir web uygulamasından
ayırt edilemezdi. Terminal sütun başlığı diline taşındı: `BentoCard` başlıkları,
duyarlılık ölçerinin eksen ve istatistik etiketleri, makale altındaki "İlgili
semboller", akademi adımındaki parça adı.

**Sınır bilinçli:** durum çipleri (Son dakika, Boğa/Ayı) **sans kaldı.** Her şey
mono olsaydı iki ses arasındaki kontrast kaybolur ve kuralın değeri giderdi.
`.eyebrow` bir bölgeyi *adlandıran* etiket içindir; cümle akışındaki rozet değil.

Cam kenarı (ilk geçişin imzası) artık ikinci planda: her liquid-glass arayüzünde
var, bu panele özgü değil. Tipografi kuralı bu panele özgü.

### 2. Boş ekran eyleme davettir

Haber kartı sağdaki iki kartın toplam yüksekliğini kaplıyor (~800px) ve
`articles` boş olduğu için içinde küçük bir ikon yüzüyordu. **Layout dolu durumda
doğru** — yanlış olan, boşluğun hiçbir şey söylememesiydi.

Önce keyfi `lg:min-h-[36rem]` zemini kaldırıldı (yükseklik artık gerçek
içerikten türüyor). Sonra boşluk gerçekle dolduruldu: `WatchedSources`, o an
DOĞRU olanı yazıyor — hangi 8 kaynak bağlı, sırada ne var.

Bunun için `findActiveSources()` sorgusu ve `getWatchedSources()` servisi eklendi.
Sorgu **yalnız akış boşken** çalışır: `articles.length === 0 ? await … : []`.
Haberler akmaya başlayınca hiç sorulmaz.

`NewsList` artık `empty?: ReactNode` alıyor. Hangi bağlamın boş olduğunu ve o
boşluğun ne kadar yer kapladığını sayfa bilir, liste bilmez.

Kopya, arayüzün sesiyle ve etken çatıda: *"Akış henüz boş. Aşağıdaki 8 kaynak
izleniyor. İlk tarama tamamlandığında başlıklar buraya düşer."* Özür yok, belirsiz
değil, sayı gerçek.

### 3. Bir aksesuar çıkar

- **Sparkline alan dolguları 0.18 → 0.10.** Panel nötr griye dönünce bu dolgular
  sayfadaki en büyük renk alanları haline gelmişti ve yön sinyalini bastırıyordu.
  Şekli çizgi, değeri sayı taşıyor.
- **Kaynak listesindeki madde işaretleri silindi.** `size-1` noktalar neredeyse
  görünmüyordu ve ayırma işini zaten hairline çizgiler yapıyordu.

### 4. Saydam token'ın kırdığı dördüncü yer

`Sparkline`'ın son değer çapası `stroke="var(--color-surface)"` kullanıyordu.
Halkanın işi noktayı çizgiden ayırmaktı; `surface` saydamlaşınca ayıramaz oldu.
`--color-base`'e bağlandı — ölçer ibresiyle aynı hata sınıfı.

### İkinci geçiş doğrulaması

`tsc` 0 · `biome` 0 (50 dosya) · `build` başarılı · 1440/768/375 taşma ve konsol
hatası yok.

> Not: `npm run build 2>&1 | …` PowerShell 5.1'de yanıltıcı bir hata üretiyor —
> native stderr'i ErrorRecord'a sarıp çıkış kodunu bozuyor. Build'in gerçek
> durumu `npx next build > log` ile ölçüldü: exit 0.

## Bilinen sınırlar

| Konu | Durum |
|---|---|
| Cam efekti veri yoğun panelde ölçülü | Bilinçli — okunabilirlik gösterişten önce |
| `ink-faint` bir kademe açıldı | Cam kararının kabul edilmiş bedeli |
| Haber kartı 2B'ye kadar kaynak listesi gösterir | Bilinçli; boşluk artık bilgi taşıyor |
| Yazı tipi ailesi değişmedi | Geist Sans/Mono duruyor — değişen şey **rol dağılımı** |
| Açık tema yok | Ürün kararı gereği yalnız koyu tema |
