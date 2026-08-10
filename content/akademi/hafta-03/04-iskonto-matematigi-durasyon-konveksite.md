---
baslik: İskonto matematiği, durasyon ve konveksite
ozet: >-
  Tahvil fiyatı gelecekteki nakit akımlarının iskonto edilmiş toplamıdır; faiz
  riski de bu fiyat fonksiyonunun türevlerinde saklıdır. Bu ders sürekli
  bileşik iskonto altında durasyon ve konveksiteyi türetir, ardından bu iki
  ölçünün büyük ve paralel olmayan faiz hareketlerinde neden yetmediğini
  tartışır.
sure: 55
onkosul:
  - hafta-03/getiri-egrisi-ve-vade-primi
kaynaklar:
  - tip: video
    baslik: Bond Convexity and Duration | Convexity explained with example
    url: https://www.youtube.com/watch?v=OQ3JDGy4hw0
    kaynak: FIN-Ed
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Durasyonun birinci, konveksitenin ikinci derece fiyat duyarlılığını
      yakaladığını sayısal örnekle gösterir. Büyük faiz hareketlerinde yalnız
      doğrusal tahmine güvenmenin hata yönünü görmek için matematikten önce
      sezgisel bir giriş sağlar.
  - tip: article
    baslik: Yield-Based Bond Convexity and Portfolio Properties
    url: https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/yield-based-bond-convexity-and-portfolio-properties
    kaynak: CFA Institute
    seviye: uzman
    ozet: >-
      Getiriye dayalı durasyon ve konveksiteyi tahvil ve portföy düzeyinde
      formel olarak kurar. Ağırlıklı ortalama yaklaşımının ve paralel getiri
      eğrisi kayması varsayımının sınırlarını profesyonel portföy bağlamında
      incelemek için okunur.
  - tip: discussion
    baslik: >-
      Bond Convexity: Relationship between discrete and continuous interest rate
    url: https://quant.stackexchange.com/questions/22806/bond-convexity-relationship-between-discrete-and-continuous-interest-rate
    kaynak: Quantitative Finance Stack Exchange
    seviye: uzman
    ozet: >-
      Sürekli ve kesikli bileşik altında konveksite formüllerinin neden aynı
      görünmediğini türetmeler üzerinden tartışır. Formül ezberinin bileşik
      konvansiyonunu gizlediği noktayı açığa çıkarmak için dersin teknik itiraz
      kaynağıdır.
sorular:
  - id: durasyon-konveksite-fiyati
    tip: sayisal
    puan: 30
    soru: >-
      Fiyatı 100 TL, modifiye durasyonu 4,2 ve konveksitesi 22 olan bir tahvilin
      getirisi 200 baz puan yükseliyor. İkinci derece yaklaşımı
      ΔP/P ≈ −D·Δy + 0,5·C·(Δy)^2 kullanarak yeni fiyatı kaç TL bulursun?
    beklenen: 92.04
    tolerans: 0.05
  - id: paralel-kayma-itirazi
    tip: acik
    puan: 35
    soru: >-
      Bir portföy yöneticisi “portföy durasyonu sıfırsa faiz riski yoktur” diyor.
      Bu iddiayı getiri eğrisinin paralel olmayan hareketleri, nakit akımı
      yeniden yatırımı ve konveksite açısından değerlendir.
    olcut:
      - Durasyonun yalnız küçük ve paralel getiri değişimleri için birinci derece yerel duyarlılık olduğunu belirtir.
      - Kısa ve uzun vadelerin farklı hareket ettiği eğim veya eğrilik şoklarında tek bir durasyon sayısının yetersiz kaldığını söyler.
      - Kuponların yeniden yatırım faizinin değişmesinin ufuk getirisi yarattığını ve fiyat etkisinden ayrı olduğunu açıklar.
      - Durasyon sıfır olsa bile ikinci derece konveksite etkisinin kalabileceğini belirtir.
      - Anahtar faiz durasyonları, senaryo analizi veya tam yeniden fiyatlama yöntemlerinden en az birini önerir.
  - id: konveksite-bedava-mi
    tip: acik
    puan: 35
    soru: >-
      Aynı getiri ve durasyona sahip iki tahvilden daha yüksek pozitif
      konveksiteli olan her koşulda daha iyi midir? Fiyat, opsiyonluluk ve model
      varsayımları üzerinden tartış.
    olcut:
      - Pozitif konveksitenin simetrik faiz hareketlerinde kazancı büyütüp kaybı sınırladığını açıklar.
      - Daha yüksek konveksitenin genellikle daha yüksek fiyat veya daha düşük başlangıç getirisi karşılığında satın alındığını belirtir.
      - Çağrılabilir tahvillerde faiz düşünce erken itfa olasılığının negatif konveksite yaratabileceğini söyler.
      - Getiriye dayalı ölçünün kredi spreadi ve faiz eğrisi hareketini tek iskonto oranına sıkıştırdığını belirtir.
      - Kararın yatırım ufku, şok senaryosu ve yeniden fiyatlama modeli olmadan verilemeyeceği sonucuna varır.
---

## Fiyat, geleceğin bugünkü değeridir

Bir tahvilin fiyatı gizemli bir piyasa etiketi değil, gelecekteki nakit
akımlarının bugünkü değeridir. Sürekli bileşik yıllık getiri `y`, nakit akımı
`CFₜ` ve ödeme zamanı `t` ise:

> P(y) = Σ CFₜ e^(−yt)

Bu yazım iki şeyi berraklaştırır. Birincisi, uzaktaki nakit akımı faiz
değişimine daha duyarlıdır; üs içindeki `t` bunu büyütür. İkincisi, tahvil
fiyatı ile getiri arasındaki ilişki doğrusal değildir. Fiyat fonksiyonunun
eğimi durasyonu, eğriliği konveksiteyi verir.

Ama matematiksel kesinlik ekonomik kesinlik değildir. Tek bir `y` kullanmak,
getiri eğrisinin bütün vadelerde paralel hareket ettiğini varsayar. 3.3'te
gördüğümüz gibi kısa faiz beklentisi ile vade primi ayrı ayrı oynar. Dolayısıyla
durasyon doğru türetilmiş olsa bile yanlış şok için kullanıldığında yanıltır.

## Durasyon: fiyat eğrisinin teğeti

Fiyatı getiriye göre türevleyelim:

> dP/dy = −Σ t · CFₜ e^(−yt)

Türevi fiyata bölüp işareti ters çevirdiğimizde sürekli bileşik altında
modifiye durasyonu elde ederiz:

> D = −(1/P)(dP/dy) = [Σ t · CFₜ e^(−yt)] / P

Bu aynı zamanda bugünkü değer ağırlıklı ortalama ödeme zamanıdır. Getiri küçük
bir miktar değiştiğinde:

> ΔP/P ≈ −D · Δy

Durasyonu 4,2 olan bir tahvilde getiri 100 baz puan, yani 0,01 yükselirse fiyat
yaklaşık yüzde 4,2 düşer. Baz puanı yüzde puanla karıştırmak burada pahalı bir
hatadır: formüle 1 değil 0,01 girilir.

Kesikli bileşikte Macaulay durasyonu ile modifiye durasyon ayrılır. Yılda `m`
kez bileşik getiri için modifiye durasyon, Macaulay durasyonunun
`1 + y/m` değerine bölünmesidir. Sürekli bileşikte bu düzeltme kaybolur. Farklı
kaynaklardaki formüllerin çatışıyor görünmesinin nedeni çoğu kez farklı
bileşik konvansiyonudur; biri yanlış olmak zorunda değildir.

## Konveksite: teğetin kaçırdığı eğrilik

İkinci türev pozitiftir:

> d²P/dy² = Σ t² · CFₜ e^(−yt)

Fiyata bölünmüş konveksiteyi `C` ile gösterirsek ikinci derece Taylor yaklaşımı:

> ΔP/P ≈ −D · Δy + ½ C(Δy)²

Pozitif konveksite, faiz aynı büyüklükte düştüğünde fiyat kazancının, faiz
yükseldiğindeki fiyat kaybından daha büyük olmasıdır. Durasyon fiyat-getiri
eğrisine bir teğet çizer; konveksite teğeti eğriye yaklaştırır. Küçük şokta
ikinci terim ihmal edilebilir. 200 baz puan gibi büyük bir harekette hata görünür
hâle gelir.

Örneğin fiyat 100, durasyon 4,2 ve konveksite 22 iken `Δy = 0,02` olsun.
Durasyon yüzde 8,4 kayıp tahmin eder. Konveksite düzeltmesi
`0,5 × 22 × 0,02² = 0,0044`, yani yüzde 0,44'tür. Toplam değişim yüzde
−7,96; tahmini yeni fiyat 92,04'tür. Bu hâlâ tam fiyat değildir, ikinci derece
yaklaşımdır.

## Yüksek konveksite bedava değildir

Aynı getiri ve durasyonda yüksek pozitif konveksite caziptir: faiz oynaklığı
iki yönde de yatırımcı lehine asimetri yaratır. Fakat piyasa bu özelliği
fiyatlar. Daha konveks tahvil genellikle daha pahalıdır veya daha düşük başlangıç
getirisi sunar. “Konveksite iyidir” doğru; “ne kadar pahalı olursa olsun daha
iyidir” yanlış.

Opsiyonlu tahviller tartışmayı keskinleştirir. Faiz düşünce ihraççı tahvili
erken itfa edebiliyorsa fiyat yükselişi sınırlanır. Çağrılabilir tahvil negatif
konveksite bölgesine girebilir: tam da korunma beklenen anda nakit akışının
vadesi kısalır. Sabit nakit akımı varsayımı bozulduğu için basit türevler yeterli
olmaz; faiz patikası altında opsiyon kullanımını modellemek gerekir.

## Tek sayı neden portföyü korumaz?

Bir portföyün ağırlıklı ortalama durasyonunu hedeflemek, küçük paralel kaymalara
karşı yararlıdır. Oysa gerçek eğri düzey, eğim ve eğrilik olarak hareket eder.
TCMB kısa ucu politika faiziyle yükseltirken uzun uç dezenflasyon beklentisiyle
düşebilir. Toplam durasyonu sıfırlanmış portföy böyle bir burulmada zarar
edebilir.

Bu nedenle pratikte **anahtar faiz durasyonları** kullanılır: portföyün belirli
vade düğümlerine duyarlılığı ayrı ölçülür. Büyük şoklarda tam yeniden fiyatlama,
farklı eğri senaryoları ve kredi spreadi şokları gerekir. Kuponlu tahvil için
yeniden yatırım riski de ayrıca hesaba katılır; fiyat kazancı, kuponların daha
düşük faizle yeniden yatırılmasıyla kısmen silinebilir.

Durasyon eşleştirmesi bu iki riski belirli bir yatırım ufkunda dengelemeye
çalışır. Faiz yükseldiğinde tahvilin bugünkü fiyatı düşer, fakat kuponlar daha
yüksek faizle yeniden yatırılır. Macaulay durasyonu yatırım ufkuna eşitse küçük
paralel şoklarda iki etki yaklaşık birbirini götürür; buna **immünizasyon**
denir. Garanti değildir. Zaman geçtikçe durasyon değişir ve portföyün yeniden
dengelenmesi gerekir; büyük şok, temerrüt, nakit akımı değişikliği ya da paralel
olmayan hareket eşleşmeyi bozar. Böylece “durasyonu eşitledim” ifadesi riski yok
etmekten çok hangi şok sınıfına karşı koruma kurulduğunu söyler.

Türkiye'de yüksek ve ani faiz hareketleri yerel yaklaşımın sınırını özellikle
önemli kılar. 500 baz puanlık politika adımını 10 baz puanlık şok için türetilmiş
doğrusal ölçüyle taşımak hassasiyet değil, sahte kesinlik üretir.

## Bu dersten sonra

3.5'te negatif reel faizin tahvil sahibinin satın alma gücünü nasıl erittiğini
inceleyeceğiz; durasyon nominal fiyat riskini, Fisher denklemi ise reel getiri
riskini ayırmamıza yardım edecek. 7.4'te “enflasyondan korunma” iddiasını farklı
varlıkların nakit akımları ve iskonto oranları üzerinden yeniden sınayacağız.
