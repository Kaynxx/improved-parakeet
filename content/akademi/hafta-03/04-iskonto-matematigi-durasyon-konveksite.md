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

## Laboratuvar Kurulumu: İskonto Fonksiyonu ve Fiyat Dinamikleri

Bir tahvilin fiyatı, piyasa mekanizmasının rastgele bir çıktısı değil, gelecekteki nakit akımlarının bugünkü değerini veren deterministik bir iskonto fonksiyonudur. Sürekli bileşik yıllık getiri `y`, nakit akımı `CFₜ` ve ödeme zamanı `t` parametreleri altında temel fiyatlama modeli şu şekilde kurulur:

> P(y) = Σ CFₜ e^(−yt)

Bu modelleme iki temel analitik gerçeği ortaya koyar. Birincisi, zaman parametresi (`t`) üs konumunda yer aldığından, uzak vadeli nakit akımlarının faiz duyarlılığı üstel olarak artar. İkincisi, tahvil fiyatı ile getiri arasındaki ilişki doğrusal olmayan (non-lineer) bir yapıdadır. Fiyat fonksiyonunun birinci türevi durasyonu (eğimi), ikinci türevi ise konveksiteyi (eğriliği) tanımlar.

Ancak bu matematiksel kesinlik, ekonomik bir kesinlik anlamına gelmez. Tek bir iskonto oranı (`y`) kullanmak, getiri eğrisinin tüm vadelerde paralel hareket ettiği yönünde kısıtlayıcı bir varsayım içerir. Kısa vadeli faiz beklentileri ile vade priminin bağımsız hareket edebildiği piyasa koşullarında, doğru türetilmiş bir durasyon ölçütü bile yanlış şok senaryosuna uygulandığında analitik sapmalara yol açar.

## Birinci Derece Duyarlılık Testi: Durasyon ve Teğet Yaklaşımı

Fiyat fonksiyonunun getiriye göre türevi alınarak birinci derece yerel duyarlılık ölçülür:

> dP/dy = −Σ t · CFₜ e^(−yt)

Elde edilen türev fiyata bölünüp işareti ters çevrildiğinde, sürekli bileşik varsayımı altında modifiye durasyon denklemi elde edilir:

> D = −(1/P)(dP/dy) = [Σ t · CFₜ e^(−yt)] / P

Bu formülasyon, aynı zamanda bugünkü değer ağırlıklı ortalama ödeme zamanını ifade eder. Getirideki marjinal değişimler için fiyat tepkisi şu doğrusal yaklaşımla test edilir:

> ΔP/P ≈ −D · Δy

**İşlem Örneği:** Durasyon parametresi 4,2 olan bir tahvilde getiri 100 baz puan (0,01) yükselirse, model fiyatın yaklaşık yüzde 4,2 düşeceğini öngörür. Hesaplamalarda baz puan ile yüzde puan ayrımına dikkat edilmelidir; denkleme 1 değil, mutlak değer olan 0,01 girilir.

Kesikli bileşik faiz modellemesinde Macaulay durasyonu ile modifiye durasyon birbirinden ayrışır. Yılda `m` kez bileşik getiri sunan bir modelde modifiye durasyon, Macaulay durasyonunun `1 + y/m` faktörüne bölünmesiyle elde edilir. Sürekli bileşik modelde ise bu düzeltme çarpanı ortadan kalkar. Literatürdeki formül farklılıkları genellikle bu bileşik konvansiyonu ayrımından kaynaklanır.

## İkinci Derece Hata Düzeltmesi: Konveksite

Doğrusal teğet yaklaşımı, büyük şoklarda fiyat eğrisinin dışbükey yapısını kaçırır. İkinci türev, bu eğriliği yakalar ve daima pozitiftir:

> d²P/dy² = Σ t² · CFₜ e^(−yt)

Fiyata normalize edilmiş konveksite parametresi `C` ile gösterildiğinde, ikinci derece Taylor serisi açılımı şu düzeltilmiş modeli sunar:

> ΔP/P ≈ −D · Δy + ½ C(Δy)²

Pozitif konveksite, faiz oranlarındaki simetrik değişimlerde asimetrik bir getiri profili yaratır: Faiz düştüğündeki fiyat kazancı, faiz aynı oranda yükseldiğindeki fiyat kaybından daha büyüktür. Küçük şoklarda ikinci terim ihmal edilebilirken, 200 baz puan gibi geniş çaplı hareketlerde konveksite düzeltmesi zorunlu hale gelir.

**İşlem Örneği:** Fiyatı 100, durasyonu 4,2 ve konveksitesi 22 olan bir tahvilde `Δy = 0,02` (200 baz puan) şoku test edilsin. Birinci derece (durasyon) yaklaşımı yüzde 8,4 kayıp öngörür. İkinci derece (konveksite) düzeltmesi `0,5 × 22 × 0,02² = 0,0044` (yüzde 0,44) olarak hesaplanır. Toplam değişim yüzde −7,96 olur ve düzeltilmiş yeni fiyat 92,04 olarak bulunur. Bu değer tam fiyatlama değil, ikinci derece yaklaşımdır.

Aşağıdaki simülasyon modülü, varsayımsal parametreler üzerinden durasyon ve konveksite etkileşimini test etmek için tasarlanmıştır. Bu araç, faiz şoklarının fiyat üzerindeki mekanik etkisini gösterir; ancak getiri eğrisinin paralel hareket edeceği varsayımına dayandığı için gerçek piyasa koşullarındaki asimetrik riskleri veya vade primi değişimlerini KANITLAMAZ.

```etkilesim
{
  "tur": "durasyon-konveksite",
  "baslik": "Fiyat Duyarlılığı ve Şok Simülasyonu",
  "nominalFiyat": 100,
  "yillikKuponOrani": 0.05,
  "vadeYil": 5,
  "yillikGetiri": 0.04,
  "faizSokuBazPuan": 200,
  "yillikOdemeSayisi": 2
}
```

## Model Sınırları ve Asimetrik Maliyetler

Aynı getiri ve durasyon seviyesinde yüksek pozitif konveksite, faiz oynaklığının her iki yönünde de yatırımcı lehine çalıştığı için caziptir. Ancak piyasa dengesi bu asimetrik avantajı fiyatlar. Daha yüksek konveksiteye sahip tahviller, genellikle daha yüksek bir primle işlem görür veya daha düşük bir başlangıç getirisi sunar. "Konveksite her koşulda iyidir" önermesi, maliyet kısıtı eklendiğinde geçerliliğini yitirir.

Opsiyonlu tahviller, bu modelin sınırlarını keskin bir şekilde çizer. İhraççıya erken itfa hakkı veren (callable) tahvillerde, faizler düştüğünde fiyat yükselişi itfa fiyatıyla sınırlanır. Bu durum, tahvilin negatif konveksite bölgesine girmesine neden olur. Yatırımcının korunma beklediği anda nakit akışının vadesi kısalır. Sabit nakit akımı varsayımı çöktüğü için basit türevler işlevsiz kalır; opsiyon kullanım olasılıklarının stokastik faiz patikaları altında modellenmesi gerekir.

## Portföy Düzeyinde Stres Testi ve İmmünizasyon

Bir portföyün ağırlıklı ortalama durasyonunu sıfırlamak, yalnızca küçük ve paralel getiri eğrisi kaymalarına karşı koruma sağlar. Gerçek piyasa dinamiklerinde getiri eğrisi düzey, eğim ve eğrilik şoklarına maruz kalır. Örneğin, merkez bankasının kısa vadeli politika faizini artırdığı, uzun vadeli tahvil getirilerinin ise dezenflasyon beklentisiyle düştüğü bir burulma (twist) senaryosunda, toplam durasyonu sıfırlanmış bir portföy ciddi değer kayıpları yaşayabilir.

Bu yapısal riskleri yönetmek için laboratuvar ortamından çıkıp şu profesyonel araçlara başvurulur:

1.  **Anahtar Faiz Durasyonları (Key Rate Durations):** Portföyün belirli vade düğümlerine (örneğin 2, 5, 10 yıl) olan kısmi duyarlılıkları ayrı ayrı ölçülür.
2.  **Yeniden Yatırım Riski Analizi:** Kuponlu tahvillerde fiyat kazancı, elde edilen kuponların daha düşük faiz oranlarıyla yeniden yatırılması sonucu kısmen nötralize olabilir.
3.  **İmmünizasyon:** Macaulay durasyonunun yatırım ufkuna eşitlenmesi stratejisidir. Faiz yükseldiğinde yaşanan anlık fiyat kaybı, kuponların daha yüksek faizle yeniden yatırılmasından doğan kazançla dengelenir. Ancak bu denge statik değildir; zaman geçtikçe veya eğri paralel olmayan şekilde hareket ettikçe portföyün yeniden dengelenmesi (rebalancing) gerekir.

Özellikle Türkiye gibi yüksek faiz oynaklığına sahip piyasalarda, yerel yaklaşımın sınırları belirginleşir. 500 baz puanlık bir politika şokunu, 10 baz puanlık marjinal değişimler için türetilmiş doğrusal bir ölçütle analiz etmek, analitik bir hassasiyet değil, sahte bir kesinlik üretir.

## İleri Analiz Gündemi

Nominal iskonto matematiğinin sınırlarını belirledikten sonra, analitik çerçevemizi reel getiri dinamiklerine genişletmemiz gerekir. Takip eden aşamalarda, negatif reel faizin tahvil sahibinin satın alma gücü üzerindeki erozyon etkisi Fisher denklemi üzerinden modellenecek; durasyonun ölçtüğü nominal fiyat riski ile enflasyonun yarattığı reel getiri riski ayrıştırılacaktır. Ayrıca, çeşitli varlık sınıflarının nakit akımları ve iskonto oranları üzerinden "enflasyondan korunma" kapasiteleri ampirik olarak yeniden sınanacaktır.
