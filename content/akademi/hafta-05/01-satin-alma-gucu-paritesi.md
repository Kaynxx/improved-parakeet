---
baslik: Satın alma gücü paritesi ve reel efektif kur
ozet: >-
  Satın alma gücü paritesi kuru açıklayan güçlü bir uzun dönem sezgisi, fakat
  güvenilir bir değerleme saati değildir. Bu ders tek fiyat kanunundan reel
  efektif kura geçer ve SGP sapmalarının neden hiçbir yatırım ufkunda kolayca
  kapanmadığını tartışır.
sure: 50
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
  - hafta-04/tufe-nin-insasi
kaynaklar:
  - tip: video
    baslik: Purchasing Power Parity Explained
    url: https://www.youtube.com/watch?v=e9Wf7TqJMkU
    kaynak: EPM
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Mutlak ve göreli SGP ile tek fiyat kanunu arasındaki bağı kurar. Taşıma
      maliyetleri, ticarete konu olmayan mallar ve ticaret engellerinin mekanik
      bir “doğru kur” hesabını neden bozduğunu görmek için kavramsal başlangıçtır.
  - tip: article
    baslik: The Purchasing Power Parity Puzzle
    url: https://www.sfu.ca/~kkasa/rogoff96.pdf
    kaynak: Kenneth Rogoff, Journal of Economic Literature (1996)
    seviye: uzman
    ozet: >-
      Kısa vadeli kur oynaklığı ile SGP'ye 3-5 yıllık yavaş dönüşün aynı modelde
      açıklanamamasını kurucu bir bulmaca olarak ortaya koyar. Fiyat yapışkanlığı,
      reel şoklar ve risk primi açıklamalarının nerede yetersiz kaldığını izletir.
  - tip: discussion
    baslik: Reel Efektif Döviz Kuru Endeksi Nedir?
    url: https://www.mahfiegilmez.com/2012/11/reel-efektif-doviz-kuru-endeksi-nedir.html
    kaynak: Mahfi Eğilmez (kişisel blog)
    seviye: orta
    ozet: >-
      SGP'nin soyut ikili kurundan TCMB'nin ticaret ağırlıklı reel efektif kur
      endeksine geçişi Türkiye verisiyle somutlaştırır. Endeks düzeyinin neden
      kendiliğinden denge kuru ya da müdahale eşiği sayılamayacağını tartışmaya açar.
sorular:
  - id: sgp-nominal-deger-kaybi
    tip: sayisal
    puan: 25
    soru: >-
      Türkiye fiyat düzeyi bir yılda %50, ABD fiyat düzeyi %5 artacaksa göreli
      SGP'ye göre TL/USD kuru yüzde kaç artmalıdır? Yani kur bugün 30 TL/USD
      ise, yıl sonundaki kurun bugüne göre yüzde değişimini sor. (Dikkat: bu,
      "TL'nin değeri yüzde kaç azaldı" sorusuyla aynı sayı değildir; kurdaki
      yüzde değişim isteniyor.) Kesin çarpımsal hesabı kullan, iki ondalıkla ver.
    beklenen: 42.86
    tolerans: 0.05
  - id: sgp-bulmacasi
    tip: acik
    puan: 40
    soru: >-
      Kur sapmaları kısa vadede çok oynakken SGP'ye dönüşün yarı ömrünün 3-5 yıl
      bulunması neden bir bulmacadır? “Fiyatlar yapışkan” cevabının niçin tek
      başına yetmediğini açıkla.
    olcut:
      - Nominal kurun mal fiyatlarından çok daha hızlı ve oynak hareket ettiğini belirtir.
      - SGP sapmasının yarı ömrünü, sapmanın yarısının kapanması için gereken süre olarak açıklar.
      - Kısa süreli nominal fiyat yapışkanlığının 3-5 yıllık kalıcılığı açıklamakta zorlandığını söyler.
      - Ticarete konu olmayan mallar, taşıma maliyetleri veya ticaret engellerinden en az ikisini mekanizmaya bağlar.
      - Balassa-Samuelson türü verimlilik farkı ya da zamanla değişen risk primi gibi en az bir reel açıklama verir.
  - id: rek-adil-deger-mi
    tip: acik
    puan: 35
    soru: >-
      TCMB reel efektif kur endeksi tarihsel ortalamasının çok altındaysa
      “lira kesin ucuzdur ve yükselecektir” sonucu neden çıkmaz? Endeksin
      inşasını ve Türkiye'nin yüksek enflasyon deneyimini birlikte kullan.
    olcut:
      - Reel efektif kurun tek bir ikili kur değil, ticaret ortakları ve fiyat endeksleriyle ağırlıklandırılmış bir endeks olduğunu belirtir.
      - Baz yılının endeks seviyesini normalize ettiğini, ekonomik denge değerini belirlemediğini söyler.
      - Verimlilik, dış ticaret hadleri veya sermaye akımları gibi denge reel kurunu değiştiren en az iki unsur verir.
      - Yüksek iç enflasyon nedeniyle nominal değer kaybı sürerken liranın reel olarak değer kazanabileceğini açıklar.
      - SGP'nin dönüş yönü hakkında bilgi verebilse de zamanlama ve işlem stratejisi vermediğini kabul eder.
---

## Aynı mal, hangi kur?

Satın alma gücü paritesi (SGP) ilk bakışta açık ekonominin en sağlam önermesi
gibi görünür. Aynı ticarete konu mal iki ülkede farklı fiyata satılıyorsa
arbitrajcı ucuz piyasadan alır, pahalı piyasada satar ve farkı kapatır. Tek fiyat
kanunu bir mal için yazılır; SGP bu mantığı bütün tüketim sepetine taşır.

Mutlak SGP'nin yalın biçimi şöyledir:

> S = P / P*

`S`, bir birim yabancı para için ödenen yerli para; `P` yerli, `P*` yabancı
fiyat düzeyidir. Göreli SGP ise düzey yerine değişimi söyler: iç enflasyon dış
enflasyondan yüksekse yerli para yaklaşık olarak aradaki fark kadar değer
kaybetmelidir. Fisher denkleminde olduğu gibi yüksek oranlarda çıkarma değil
çarpımsal hesap gerekir:

> (1 + ΔS) = (1 + π) / (1 + π*)

Bu ilişki bir muhasebe özdeşliği değildir. Sepetler aynı değilse, mallar
taşınamıyorsa veya fiyat farkına vergi giriyorsa arbitraj zinciri kopar.
Dolayısıyla SGP “kur budur” demez; belirli ve sert varsayımlar altında kurun
hangi yönde baskı göreceğini söyler.

## Reel kur, nominal kurun enflasyonla sınanmasıdır

İkili reel kur şu biçimde yazılabilir:

> q = S × P* / P

Bu tanımda `q` yükseliyorsa yerli mallar yabancı mallara göre ucuzlar; reel
değer kaybı vardır. Fakat işaret sözleşmesi kurumdan kuruma ters kurulabilir.
Bir endeksi yorumlamadan önce “artış reel değerlenme mi, değer kaybı mı?” diye
sormak ayrıntı değil, zorunluluktur.

Reel efektif kur (REK) tek bir ülkeyi değil, ticaret ortaklarını kapsar. İkili
reel kurlar ticaret ağırlıklarıyla birleştirilir; tüketici ya da üretici fiyat
endeksi seçilir ve bir baz dönemde 100'e eşitlenir. Her seçim sonuç üretir.
TÜFE hane refahına yakın, üretici fiyatları dış rekabete daha yakın olabilir;
ama ikisi de “gerçek rekabet gücü”nü eksiksiz ölçmez. 4.1'de gördüğümüz sepet,
ikame ve kalite sorunları burada doğrudan kur değerlemesinin içine girer.

Bu nedenle REK'in 100 olması denge demek değildir. Baz yıl yalnız cetvelin
başlangıcıdır. Ticaret ortakları, ürün bileşimi ve verimlilik değiştikçe aynı
endeks düzeyi farklı bir iktisadi durumu temsil eder.

## Rogoff bulmacası: çok hızlı şok, çok yavaş dönüş

Kurun SGP'den sapması şaşırtıcı değildir. Şaşırtıcı olan iki ampirik olgunun
birlikte görülmesidir. Nominal kurlar kısa vadede finansal varlık gibi sıçrar;
SGP sapmalarının ortalamaya dönüş yarı ömrü ise kabaca 3-5 yıl bulunur. Fiyat
yapışkanlığı birkaç çeyreklik ayrışmayı açıklayabilir. Aynı model hem kurdaki
ani oynaklığı hem yıllarca süren düzeltmeyi üretmekte zorlanır.

“Uzun vadede SGP tutar” cümlesi de sorunu çözmez. Üç yıllık yarı ömür, sapmanın
üç yılda bittiği anlamına gelmez; yalnız yarıya indiği anlamına gelir. Birden
fazla yarı ömür yatırımcının, firmanın ve merkez bankasının karar ufkunu aşar.
Üstelik denge yerinde durmaz. Ticarete konu olmayan hizmetlerin fiyatı,
verimlilik farkları, dış ticaret hadleri, gümrükler ve risk primi değişirken
kurun döneceği hedef de hareket eder. SGP bu anlamda hiçbir kullanışlı ufukta
kesin çalışan bir saat değildir.

Buradaki tartışma açıktır. Bir görüş, ölçüm hatası ve geçici nominal katılıkların
uzun örneklemlerde temizleneceğini savunur. Diğer görüş, kalıcı reel şoklar
varken sabit bir SGP çapası aramanın yanlış soru olduğunu söyler. Ampirik
ortalama dönüş ilk görüşü tamamen reddetmez; dönüşün yavaşlığı ve kararsızlığı
ikinci görüşü canlı tutar.

SGP'nin tahmin performansı ayrıca ufuk seçimine bağlı bir sınama sorunu taşır.
Bir yıllık kur tahmininde başarısız olması uzun dönem kısıtını reddetmez; on
yıllık ortalamada yönü doğru bulması da işlem yapılabilir bir model olduğunu
kanıtlamaz. Başlangıç tarihini değiştirmek hem ölçülen sapmayı hem dönüş hızını
değiştirir. Üstelik merkez bankasının enflasyonu düşürmesi veya sermaye risk
priminin sıçraması tahmin döneminde denge patikasını kırabilir. Bu nedenle SGP
en yararlı hâliyle nokta tahmini değil, senaryo tutarlılığı testidir: iç fiyatlar
dış fiyatlardan kalıcı biçimde hızlı artarken hiç nominal değer kaybı varsayan
bir senaryo hangi verimlilik veya sermaye girişiyle ayakta kalacaktır? SGP kesin
cevap vermez ama saklı varsayımı görünür kılar.

## Türkiye: nominal kayıp, reel değerlenme

Türkiye'de “dolar yükseldi, lira ucuzladı” cümlesi çoğu zaman nominal ile reeli
karıştırır. Dolar kuru bir yılda %30 yükselirken Türkiye fiyatları %50, ticaret
ortaklarının fiyatları %5 yükselirse lira nominal olarak değer kaybetmiş ama
reel olarak değerlenmiş olabilir. İhracatçı kur ekranındaki artışa rağmen ücret,
enerji ve ara malı maliyetlerinin daha hızlı yükseldiğini görür.

TCMB'nin REK endeksi bu ayrımı görünür kılar, fakat politika kararını otomatikleştirmez.
Tarihsel bir alt banttan dönüş gözlenmiş olması nedensel bir taban yaratmaz.
2001 sonrası verimlilik kazanımları, 2018 sonrası risk primi ve değişen enerji
faturası aynı endeks düzeyinin anlamını değiştirir. REK teşhis aracıdır; adil
değer makinesi değildir.

## Bu dersten sonra

SGP, mal piyasası arbitrajının kur için neden zayıf bir çapa olduğunu gösterdi.
5.2'de aynı soruyu varlık piyasasına taşıyacağız: faiz farkı forward kurla
kapandığında arbitraj güçlüdür, kur riski açık bırakıldığında değildir. 5.4'te
ise yön tersine dönecek; kurun fiyat düzeyini nasıl değiştirdiğini inceleyip
SGP'deki `P` ile `S` arasındaki nedenselliğin tek yönlü olmadığını göreceğiz.
