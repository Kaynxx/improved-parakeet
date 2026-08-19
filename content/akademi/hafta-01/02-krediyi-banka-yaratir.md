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

## Gözlem 1: Aracı Kurum Yanılgısı ve Bilanço Mekaniği

Popüler ders kitapları bankayı bir "su deposu" veya salt aracı olarak modeller: Tasarruf sahibi mevduat yatırır, banka zorunlu karşılığı ayırır ve kalanı ödünç verir. Bu modelde rezerv, kredinin önkoşuludur ve tasarruf, yatırıma mekanik bir çarpan dizisiyle aktarılır.

Modern para teorisi ve muhasebe pratiği ise bu nedenselliği reddeder. Bir banka kredi sözleşmesini onayladığında, bilançosunda eşzamanlı bir genişleme yaratır. Başka bir deyişle, banka kendi borcunu (mevduat) ihraç ederek müşterinin gelecekteki ödeme taahhüdünü (kredi) satın alır. Kredi açılışında başka bir müşterinin hesabından para eksilmez veya kasadan rezerv çıkmaz. Innes'in kredi teorisi dili, burada soyut bir kavram değil, doğrudan çift kayıtlı muhasebenin kendisidir.

Aşağıdaki etkileşimli T-hesap tablosu, bu eşzamanlı yaratım sürecini ve ardından gelen ödeme akışını göstermektedir. Bu tablo, kredinin anında mevduat yarattığı muhasebe gerçeğini kanıtlar; ancak bankaların hiçbir kısıta tabi olmadan sonsuz kredi açabileceğini KANITLAMAZ. Tablodaki değerler tamamen varsayımsaldır.

```etkilesim
{"tur":"t-hesap","baslik":"Kredi Yaratımı ve Rezerv Kaybı (Varsayımsal Değerler)","baslangic":{"varliklar":500000,"yukumlulukler":400000,"ozkaynak":100000},"adimlar":[{"etiket":"Kredi Sözleşmesi (Varlık: Kredi, Yükümlülük: Mevduat)","varlikDegisimi":1000000,"yukumlulukDegisimi":1000000,"ozkaynakDegisimi":0},{"etiket":"Başka Bankaya Ödeme (Varlık: Rezerv Çıkışı, Yükümlülük: Mevduat Çıkışı)","varlikDegisimi":-800000,"yukumlulukDegisimi":-800000,"ozkaynakDegisimi":0}]}
```

## Gözlem 2: İşlem Sırası ve Rezerv Kısıtının Doğası

Kredi açılışı ile ödemenin takası (settlement) analitik olarak iki ayrı evredir. Borçlu, yaratılan yeni mevduatı aynı bankadaki bir satıcıya aktarırsa, banka içi bir virman gerçekleşir; toplam mevduat ve rezerv değişmez. Ancak satıcı başka bir bankadaysa, gönderen banka alıcının bankasına merkez bankası rezervi transfer etmek zorundadır.

> **Mekanizma Kuralı:** Kredi mevduatı yaratır; mevduatın bankalar arası hareketi ise rezerv talebi yaratır.

Örneğin, 1.000.000 liralık yeni kredi açan bir bankadan 800.000 liralık dışarı ödeme çıkarsa ve bankanın kullanılabilir fazla rezervi yalnızca 250.000 lira ise, banka takası tamamlamak için 550.000 liralık ek rezerv bulmak zorundadır. Bu rezerv bankalar arası piyasadan borçlanarak, varlık satarak, yeni fonlama çekerek veya merkez bankası imkânlarına başvurarak temin edilir. Rezervin krediden *sonra* gelmesi, rezervin önemsiz olduğu anlamına gelmez; kısıtın zamanlamasını ve maliyet yapısını tanımlar.

Merkez bankası da pasif bir veznedar değildir. Rezervi hangi faizle sağladığı ve gün sonu açıklarını nasıl cezalandırdığı bankanın kredi fiyatlamasına doğrudan girer. Ancak faiz hedefleyen bir sistemde merkez bankası, rezerv miktarını katı biçimde sabit tutup ödeme sisteminin kilitlenmesini izleyemez; rezerv arzı, rezerv talebine büyük ölçüde uyum sağlar.

## Gözlem 3: Çarpan Modelinin Nedensellik Hatası

Geleneksel modeldeki $R = r \times D$ (Rezerv = Zorunlu Karşılık Oranı $\times$ Mevduat) denklemi, cebirsel olarak $D = R/r$ biçiminde yazılabilir. Bu matematiksel dönüşüm doğrudur, ancak cebir nedensellik vermez. Dönem sonunda mevduatın rezerve oranının 10 olması, merkez bankasının önce $R$ miktarını belirlediği ve bankaların mekanik olarak on kat mevduat ürettiğini kanıtlamaz.

Bank of England'ın (BoE) 2014 tarihli bülteninde vurguladığı hedef tam olarak budur: Bankalar mevcut mevduatı ödünç vermez; verdikleri kredi mevduatı yaratır. Üstelik süreç simetriktir; müşteri anapara ödemesi yaptığında, banka bilançosunun her iki tarafı da küçülür ve para yok olur. Kredi stokundaki brüt açılışlar kadar geri ödemeler de geniş para büyümesini belirler.

Simon Wren-Lewis'in tartışmaya getirdiği kritik nokta şudur: Bu durum uygulamacı merkez bankacıları için yeni bir sır veya devrim değildir. Şaşırtıcı olan, ders kitaplarının basit çarpan modelini açıklama kolaylığı uğruna nedensel bir gerçeklik gibi sunmaya devam etmesidir. Çarpan tümüyle yararsız değildir; belirli bir anda taban para ile mevduat arasındaki oranı betimleyebilir. Ancak betimleme (ex-post özdeşlik) ile davranış modeli (ex-ante karar) birbirine karıştırılmamalıdır.

## Gözlem 4: Optimizasyon ve Sınırlar: Banka Neden Sonsuz Kredi Açmaz?

Muhasebe kaydı ucuz, kötü kredi ise pahalıdır. Yeni kredi ilk anda varlık ve yükümlülüğü eşit büyütür, ancak özkaynak yaratmaz. Bankanın para yaratma kapasitesi muhasebesel olarak esnek olsa da, fiilî kredi arzı katı ekonomik ve düzenleyici kısıtlara tabidir:

1.  **Sermaye Yeterliliği:** Risk ağırlıklı varlıklar büyüdükçe, düzenleyici sermaye rasyoları bağlayıcı hâle gelir ve kredi büyümesini sınırlar.
2.  **Likidite ve Fonlama Maliyeti:** Yaratılan mevduat rakip bankaya transfer edildiğinde, banka rezerv kaybeder. Bu durum, özellikle politika faizinin yüksek olduğu ortamlarda marjinal fonlama maliyetini artırır.
3.  **Kredi Riski ve Karlılık:** Borçlunun temerrüt olasılığı beklenen zararı, takip giderlerini ve karşılık ihtiyacını artırır.
4.  **Kredi Talebi:** Bankanın talep ettiği faiz oranından borçlanabilecek ve geri ödeme kapasitesine sahip makroekonomik bir talep bulunmalıdır.

Bilgi asimetrisi ve teşvik sorunları nedeniyle kredi piyasası her zaman fiyatla (faizle) temizlenmez. Banka, riski fiyatlamak için faizi artırdığında güvenli borçlular piyasadan çekilebilir (ters seçim) ve yüksek faiz temerrüt olasılığını bizzat büyütebilir. Bu nedenle bankalar, kredi miktarını rasyonlayabilir, teminat şartlarını ağırlaştırabilir veya belirli sektörleri dışlayabilir. Banka parası, bu özel risk seçim sürecinin bir yan ürünüdür.

## Laboratuvar Çıktıları ve İleri Analiz Gündemi

Bu modelleme süreci, kredi yaratımının dışsal bir rezerv tabanına dayalı mekanik bir çarpan süreci olmadığını; aksine, banka bilançolarındaki eşzamanlı kayıtlarla işleyen içsel bir mekanizma olduğunu göstermiştir. Rezerv, kredi yaratımının önkoşulu değil, ödeme sisteminin takas aracı ve merkez bankasının faiz politikasının aktarım kanalıdır.

Bir sonraki analiz aşamasında, bankalar arası takası sağlayan bu rezervlerin merkez bankası bilançosunun neresinde yer aldığı incelenecek ve ticari bankaların kredi kararlarının M1 ve M2 para arzı büyüklüklerini nasıl şekillendirdiği, içsel para teorisinin makroekonomik dinamikleriyle birlikte modellenecektir.
