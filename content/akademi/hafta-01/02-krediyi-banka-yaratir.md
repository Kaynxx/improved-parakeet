---
baslik: Krediyi banka yaratır
ozet: >-
  Banka kredi vermek için önceden bir başkasının mevduatını beklemez; kredi
  sözleşmesiyle eşzamanlı bir mevduat yaratır. Bu ders mevduat çarpanının neden
  nedensel bir model olmadığını çift kayıtla gösterir ve “bankalar sınırsız
  para yaratır” sonucunun neden aynı ölçüde yanlış olduğunu tartışır.
sure: 50
onkosul: [hafta-01/takas-efsanesi-ve-paranin-kokeni]
kaynaklar:
  - tip: video
    baslik: Money creation in the modern economy - Quarterly Bulletin
    url: https://www.youtube.com/watch?v=CvRAqR2pAgw
    kaynak: Bank of England
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Bank of England, bankaların mevcut tasarrufu aktaran aracı değil, kredi
      açarken mevduat yaratan bilanço kurumları olduğunu kendi resmî kanalında
      özetler. Videoyu, kredi ile mevduatın işlem sırasını doğru kurmak ve
      rezervlerin rolünü yeniden konumlandırmak için izle.
  - tip: article
    baslik: Money creation in the modern economy
    url: https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy
    kaynak: McLeay, Radia, Thomas — Bank of England Quarterly Bulletin 2014 Q1
    seviye: ileri
    ozet: >-
      Makale kredi açılışını banka varlığında kredi, yükümlülüğünde mevduat
      artışı olarak çift kayıtla kurar ve ders kitabı çarpanının nedenselliğini
      tersine çevirir. Para yaratımını, kredi geri ödemesinde paranın yok oluşu
      ve banka kısıtlarıyla birlikte görmek için haftanın temel metnidir.
  - tip: discussion
    baslik: Bank says money multiplier is wrong - should we be shocked?
    url: https://mainlymacro.blogspot.com/2014/03/bank-says-money-multiplier-is-wrong.html
    kaynak: Simon Wren-Lewis, mainly macro
    seviye: orta
    ozet: >-
      Wren-Lewis, 2014 açıklamasının merkez bankacılar için devrim değil,
      lisans öğretimindeki gecikmenin tashihi olduğunu savunur. Tartışmayı
      “bankalar mevduat yaratır mı?” sorusundan, basit çarpan modelinin hangi
      amaçla hâlâ kullanılabileceği sorusuna taşır.
sorular:
  - id: rezerv-acigi
    tip: sayisal
    puan: 30
    soru: >-
      Bir banka 1.000.000 liralık yeni kredi açıp aynı tutarda mevduat
      yaratıyor. Borçlu bunun 800.000 lirasını başka bankadaki satıcıya
      gönderiyor. Gönderen bankanın kullanılabilir fazla rezervi 250.000
      liraysa ve başka giriş yoksa, ödemeyi tamamlamak için bulması gereken ek
      rezerv kaç liradır?
    beklenen: 550000
    tolerans: 0
  - id: carpanin-nedenselligi
    tip: acik
    puan: 35
    soru: >-
      Para tabanı 100, zorunlu karşılık oranı %10 ise mevduat 1.000 olur
      biçimindeki çarpan hesabı bir özdeşlik olarak doğru görünebilir. Bunun
      kredi yaratımını açıklayan nedensel bir model olarak neden yanlış
      olabileceğini bilanço sırasıyla açıkla.
    olcut:
      - Basit çarpanın m = 1 / zorunlu karşılık oranı biçimini ve 100 / 0,10 = 1.000 sonucunu doğru kurar.
      - Gerçek işlem sırasını kredi kararı → kredi ve mevduatın eşzamanlı doğuşu → ödeme → rezerv temini olarak yazar.
      - Bankanın başka bankaya ödeme çıkışı olduğunda rezerv kaybettiğini, aynı banka içi ödemede ise rezerv transferi gerekmediğini ayırır.
      - Merkez bankasının ödeme sistemini ve kısa vadeli faiz hedefini korumak için rezerv talebini tamamen karşılamamayı her zaman seçemeyeceğini belirtir.
      - Gözlenen mevduat/rezerv oranının dönem sonunda hesaplanabilmesinin, rezervin mevduata nedensel olarak öncelik verdiğini kanıtlamadığını söyler.
  - id: sinirsiz-kredi-yanilgisi
    tip: acik
    puan: 35
    soru: >-
      “Kredi mevduat yaratıyorsa bankanın kredi kapasitesi sınırsızdır” iddiasını
      değerlendir. Muhasebe imkânı ile ekonomik ve düzenleyici kısıtları ayır.
    olcut:
      - Yeni kredinin varlık, yeni mevduatın eşit tutarlı yükümlülük olduğunu ve işlem anında özkaynağı artırmadığını belirtir.
      - Sermaye yeterliliğinin risk ağırlıklı varlıklara karşı özkaynak gerektirdiğini ve kredi büyümesini sınırlayabildiğini açıklar.
      - Likidite veya fonlama maliyetinin özellikle mevduat başka bankaya çıktığında bağlayıcı hâle geldiğini açıklar.
      - Kredi talebi, borçlunun geri ödeme kapasitesi, temerrüt riski ve bankanın kârlılık hedeflerinden en az üçünü sayar.
      - Politika faizinin rezerv ve fonlama maliyetini, düzenlemenin de sermaye ve likidite sınırlarını etkilediğini; rezerv önkoşul değil diye etkisiz olmadıklarını belirtir.
---

## Yanlış çizilen banka

Popüler şemada banka bir su deposudur. Hane 100 lira yatırır, banka bunun 10
lirasını rezerv tutar, 90 lirasını ödünç verir; 90 başka bankaya yatırılır,
oradan 81 lira kredi çıkar. Dizi sonunda 100 liralık rezerv tabanı 1.000 lira
mevduata “dönüşür”. Bu anlatının sezgisi kuvvetlidir, çünkü bankayı tasarruf
sahibiyle yatırımcı arasında duran bir aracı gibi resmeder.

Modern bir bankanın ilk kredi kaydı böyle değildir. Banka 1 milyon liralık
kredi sözleşmesini onayladığında bilançosuna iki kayıt düşer:

> Varlıklar: Krediler +1.000.000  
> Yükümlülükler: Müşteri mevduatı +1.000.000

Başka bir müşterinin hesabından 1 milyon eksilmemiştir. Kasadan rezerv de
çıkmamıştır. Banka kendi borcunu — mevduatı — yaratmış, karşılığında müşterinin
gelecekte ödeme taahhüdünü varlık yazmıştır. 1.1'deki Innes dili burada soyut
teori değil, muhasebe kaydıdır.

## Rezerv önce değilse ne zaman gerekir?

Kredi açılışı ile ödeme iki farklı olaydır. Borçlu yeni mevduatı aynı bankadaki
bir satıcıya aktarırsa yalnız bankanın iki müşterisi arasındaki kayıt değişir;
toplam mevduat ve rezerv aynı kalır. Satıcı başka bankadaysa gönderen banka,
alıcının bankasına merkez bankası rezervi göndermek zorundadır. Kredi mevduatı
yaratır; **mevduatın bankalar arası hareketi rezerv talebi yaratır.**

Örnekte yeni kredi 1 milyon, dışarı giden ödeme 800 bin ve kullanılabilir fazla
rezerv 250 bin liraysa banka 550 bin liralık rezerv bulmalıdır. Bunu bankalar
arası piyasadan borçlanarak, bir varlık satarak, yeni fonlama çekerek veya
merkez bankası imkânına başvurarak yapabilir. Her yolun fiyatı vardır. “Rezerv
krediden sonra gelir” demek “rezerv önemsizdir” demek değildir; zaman sırasını
ve kısıtın biçimini doğru söylemektir.

Merkez bankası da pasif bir veznedar değildir. Rezervi hangi faizle sağladığı,
hangi teminatı kabul ettiği ve gün sonunda hangi açığı cezalandırdığı bankanın
kredi fiyatına girer. Fakat merkez bankası rezerv miktarını katı biçimde sabit
tutup ödeme sisteminin kilitlenmesini ve gecelik faizin hedeften kopmasını
izleyemez. Faiz hedefleyen bir sistemde rezerv arzı, ödeme ve rezerv talebine
önemli ölçüde uyum sağlar.

## Çarpan neden nedenselliği ters çevirir?

Zorunlu karşılık oranı `r` ve mevduat `D` ise gerekli rezerv için şu ilişki
yazılabilir:

> R = r × D

Buradan cebirle `D = R/r` çıkar. Bu dönüşüm doğrudur; ama cebir nedensellik
vermez. Dönem sonunda `D/R = 10` gözlemek, merkez bankasının önce `R` miktarını
seçtiğini ve bankaların mekanik olarak on kat mevduat ürettiğini kanıtlamaz.
Bankalar kârlı buldukları kredileri açmış, ödemeler rezerv ihtiyacı doğurmuş,
merkez bankası ve para piyasası bu ihtiyacın fiyatını belirlemiş olabilir.

BoE'nin 2014 tashihinin hedefi tam budur. Bankalar “mevcut mevduatı ödünç
vermez”; verdikleri kredi mevduatı yaratır. Üstelik geri ödeme simetrik biçimde
para yok eder. Müşteri anaparadan 100 bin lira ödediğinde banka varlığındaki
kredi ve yükümlülüğündeki mevduat 100 bin azalır. Faiz ödemesi ise ayrı bir
gelir ve özkaynak etkisi taşır. Kredi stokundaki brüt açılışlar kadar geri
ödemeler de geniş para büyümesini belirler.

Wren-Lewis'in tartışmaya eklediği sert nokta şudur: Bu, 2014'te keşfedilmiş bir
sır değildir. Uygulamacı merkez bankacılığı zaten faiz hedefi, rezerv piyasası
ve bankaların bilanço kararlarıyla çalışıyordu. Şaşırtıcı olan tashih değil,
ders kitaplarının basit modelini açıklama kolaylığı uğruna nedensel gerçeklik
gibi sunmasıdır. Yine de çarpan tümüyle yararsız değildir: belirli bir anda
taban para ile mevduat arasındaki oranı betimleyebilir. Betimleme ile davranış
modeli karıştırılmamalıdır.

## Bankalar neden sonsuz kredi açmaz?

Muhasebe kaydı ucuzdur; kötü kredi pahalıdır. Yeni kredi ilk anda varlık ve
yükümlülüğü eşit büyütür, özkaynak yaratmaz. Risk ağırlıklı varlık büyüdükçe
sermaye yeterliliği bağlayabilir. Mevduat rakip bankaya çıkarsa rezerv ve
fonlama maliyeti yükselir. Borçlunun temerrüdü beklenen zararı, takip giderini
ve karşılık ihtiyacını artırır. Ayrıca krediye, bankanın istediği faizle borç
ödeyebilecek talep bulunmalıdır.

Türkiye'de kredi büyümesini yalnız zorunlu karşılık oranından okumak bu yüzden
eksiktir. TCMB'nin fonlama maliyeti, BDDK'nın sermaye ve likidite kuralları,
kur korumalı veya makroihtiyati düzenlemeler, mevduat rekabeti ve kredi riski
aynı bilançoya farklı yerlerden basar. Rezerv miktarı tek musluk değildir;
fakat rezervin fiyatı bütün bu kararların iskonto oranlarından biridir.

Kredi fiyatı da piyasayı her zaman temizlemez. Banka riski yükseldiğinde faizi
artırırsa güvenli borçlular çekilebilir, daha riskli projeler kalabilir; yüksek
faiz temerrüt olasılığını bizzat büyütebilir. Bu nedenle banka yalnız fiyatı
yükseltmek yerine kredi miktarını kısabilir, teminat isteyebilir veya bazı
sektörleri tümüyle dışlayabilir. Para yaratma kapasitesinin muhasebenin izin
verdiği kadar geniş, fiilî kredi arzının ise bilgi ve teşvik sorunları yüzünden
dar olması çelişki değildir. Banka parası, özel bir risk seçiminin yan ürünüdür.

## Bu dersten sonra

Kredi yaratımını anladığında iki yeni soru doğar. Bankaların birbirine olan
ödemesini kapatan rezerv tam olarak kimin borcudur? 1.3'te merkez bankası
bilançosunun yükümlülük tarafını okuyarak bunu yanıtlayacağız. Kredi kararlarının
ardından M1 ve M2 neden hareket eder, merkez bankası bu toplamları ne ölçüde
seçebilir? 1.4'te çarpan eleştirisini para arzının içselliğine bağlayacağız.
