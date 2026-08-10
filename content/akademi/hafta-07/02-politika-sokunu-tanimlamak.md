---
baslik: >-
  Politika şokunu tanımlamak: yüksek frekanslı olay çalışması ve içsellik sorunu
ozet: >-
  Faiz kararı ile varlık fiyatı hareketinin aynı anda görülmesi nedensellik için
  yeterli değildir. Bu ders dar olay pencerelerinin tanımlama gücünü, cari faiz
  ile gelecek patikası ayrımını ve merkez bankası bilgi etkisinin “saf şok”
  yorumunu nasıl bozduğunu tartışır.
sure: 55
onkosul:
  - hafta-03/parasal-aktarim-kanallari
kaynaklar:
  - tip: video
    baslik: >-
      Virtual Seminar on Monetary Economics - Emi Nakamura (University of California, Berkeley)
    url: https://www.youtube.com/watch?v=_mhNTXv0TP4
    kaynak: CEPR & VideoVox Economics
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      FOMC duyurusu çevresindeki kısa pencerede ölçülen piyasa sürprizinin neden
      cazip bir şok adayı olduğunu ve merkez bankası bilgi etkisi nedeniyle
      neden saf kalmayabileceğini anlatır. Yöntemin güçlü yanını ve en ciddi
      itirazını aynı çerçevede görmek için izlenir.
  - tip: article
    baslik: >-
      Do Actions Speak Louder Than Words? The Response of Asset Prices to Monetary Policy Actions and Statements
    url: https://www.federalreserve.gov/econres/feds/do-actions-speak-louder-than-words-the-response-of-asset-prices-to-monetary-policy-actions-and-statements.htm
    kaynak: >-
      Refet S. Gürkaynak, Brian Sack & Eric Swanson, FEDS Working Paper 2004-66 (International Journal of Central Banking, 2005)
    seviye: ileri
    ozet: >-
      FOMC duyurularındaki beklenmedik hareketin tek boyutlu olmadığını; cari
      faiz ve gelecek politika patikası olarak yorumlanan iki faktör gerektiğini
      gösterir. Metnin ve yönlendirmenin uzun vadeli fiyatlar için neden kararın
      kendisi kadar önemli olduğunu kuran temel ampirik çalışmadır.
  - tip: discussion
    baslik: >-
      The surprise in monetary surprises: a tale of two shocks
    url: https://bankunderground.co.uk/2017/02/06/the-surprise-in-monetary-surprises-a-tale-of-two-shocks/
    kaynak: >-
      Silvia Miranda-Agrippino, Bank Underground (Bank of England personel blogu, 2017)
    seviye: ileri
    ozet: >-
      Piyasa temelli para politikası sürprizlerinin merkez bankası tahminleriyle
      öngörülebilir olmasını içsellik kanıtı olarak ele alır. Dar pencerenin ortak
      makro haberleri azalttığını ama politika ile bilgi şokunu kendiliğinden
      ayırmadığını görmek için okunur.
sorular:
  - id: olay-penceresi-baz-puan
    tip: sayisal
    puan: 20
    soru: >-
      Bir PPK duyurusundan 10 dakika önce bir aylık TL gecelik endeks takası
      faizi %15,20, duyurudan 20 dakika sonra %15,65 olsun. Başka düzeltme
      yapmadan yüksek frekanslı sürprizi son değer eksi ilk değer olarak baz
      puan cinsinden hesapla.
    beklenen: 45
    tolerans: 1
  - id: bilgi-etkisi-ayrimi
    tip: acik
    puan: 40
    soru: >-
      Merkez bankası beklenmedik biçimde faizi artırdığında hem iki yıllık
      tahvil getirisi hem hisse fiyatları yükseliyor. Bu gözlemi saf daraltıcı
      politika şokuyla açıklamak neden güçtür? Politika şoku ile bilgi şokunu
      ayıracak bir ampirik tasarım öner.
    olcut:
      - Daraltıcı iskonto oranı kanalının tek başına tahvil getirisini yükseltip hisse fiyatını düşürmesinin bekleneceğini belirtir.
      - Merkez bankasının güçlü büyüme ya da enflasyon bilgisi açıklamasının nakit akımı beklentilerini artırarak hisseyi yükseltebileceğini açıklar.
      - Ham yüksek frekanslı sürprizin politika ve bilgi bileşenlerinin toplamı olabileceğini söyler.
      - Hisse ve faizlerin işaret kısıtları, merkez bankası tahminlerine koşullama veya metin ölçümü gibi somut bir ayrıştırma yöntemi önerir.
  - id: tcmb-pencere-tasarimi
    tip: acik
    puan: 40
    soru: >-
      TCMB PPK kararlarının BIST, lira ve tahvil getirileri üzerindeki etkisini
      yüksek frekanslı olay çalışmasıyla ölçmek istiyorsun. Çalışmanın “PPK
      sürprizi varlık fiyatını etkiledi” sonucunu savunabilmesi için veri,
      pencere ve duyuru içeriği bakımından hangi sınamaları yaparsın?
    olcut:
      - Karar öncesi ve sonrası zaman damgalı, yeterince likit bir faiz türevi ya da tahvil göstergesi seçer.
      - Pencereyi diğer makro veri açıklamalarını dışlayacak kadar dar kurar ve farklı pencere uzunluklarıyla sağlamlık sınaması yapar.
      - Beklenen karar ile gerçekleşen kararı ayırmak için anket ya da piyasa fiyatından bir beklenti ölçüsü kurar.
      - Karar oranı ile PPK metni veya gelecek patikası haberini ayrı faktörler olarak modellemeyi önerir.
      - Sığ piyasa, eşzamanlı kur müdahalesi ve bilgi etkisinin nedensel yorumu sınırladığını açıkça belirtir.
---

## Aynı anda olmak, neden olmak değildir

Merkez bankası faizi artırdı, lira değerlendi, tahvil getirisi yükseldi, BIST
düştü. Günlük veride bu dört hareketi yan yana koymak kolaydır; “faiz artışı
bunlara yol açtı” demek zordur. Çünkü merkez bankası faiz kararını ekonomideki
gelişmelere tepki olarak alır. Enflasyon haberi hem kararı hem piyasa fiyatını
aynı yönde hareket ettirebilir. Regresyonda faiz katsayısı bulmak, bu ortak
neden ortadan kalkmadıkça politika etkisini bulmak değildir.

Aranan nesne **politika şoku**dur: kararın sistematik tepki kısmı çıkarıldıktan
sonra kalan, özel sektörün karar öncesinde öngörmediği dışsal değişim. Sorun
şudur: sistematik tepkiyi eksik modelliyorsan “şok” dediğin artık, merkez
bankasının ekonomiye dair okuduğu haberleri de içerir. İçsellik böylece hata
teriminin içine taşınır.

## Dar pencerenin tanımlama vaadi

Yüksek frekanslı olay çalışması akıllı bir kısıt koyar. FOMC ya da PPK duyurusu
çevresindeki örneğin otuz dakikalık pencerede makro temellerin bağımsız biçimde
değişmediğini varsayar. Duyurudan hemen önceki vadeli faiz ile hemen sonraki
faiz arasındaki fark, piyasayı şaşırtan politika haberi sayılır:

> sürpriz_t = vadeli faiz_(duyuru sonrası) − vadeli faiz_(duyuru öncesi)

Bu tasarım günlük ya da aylık veriye göre büyük ilerlemedir. Dar pencere petrol
fiyatı, dış veri, siyasi haber ve risk iştahı gibi eşzamanlı etkenlerin çoğunu
dışarı iter. Ayrıca beklenen faiz artışını şok saymaz: karar bütünüyle
fiyatlandıysa duyuru anında vadeli faiz hareket etmez.

Fakat pencerenin darlığı yalnızca **zaman içindeki** karıştırıcıları azaltır.
Duyurunun kendi içinde birden çok haber varsa onları ayırmaz.

## Tek faiz kararı yoktur

Gürkaynak, Sack ve Swanson'ın temel bulgusu, FOMC duyuru tepkilerinin tek
faktörle açıklanamadığıdır. Birinci faktör cari politika faizindeki beklenmedik
değişimdir. İkinci faktör, gelecekteki faiz patikasına ilişkin haberdir; çoğu
zaman açıklama metni ve yönlendirmeden gelir.

Bu ayrım varlık fiyatları için belirleyicidir. Çok kısa vadeli getiri cari faiz
sürprizine güçlü tepki verirken, uzun vadeli tahviller gelecekte beklenen kısa
faizlerin bütün patikasını fiyatlar. Merkez bankası bugün faizi değiştirmeyip
“sıkılık uzun sürecek” diyebilir; manşette değişiklik sıfırdır ama uzun getiri
ve hisse değerlemesi sert hareket eder. “Faiz kararı etkisizdi” sonucu, ölçülen
şey yalnız karar oranıysa veri tarafından değil tanım tarafından üretilmiştir.

Faktör yaklaşımı duyuru penceresindeki farklı vadeli faiz değişimlerinin ortak
bileşenlerini çıkarır. Sonra faktörleri cari hedef ve patika diye adlandırır.
Bu adlandırma iktisadi kısıt ister; istatistiksel faktör kendi başına yapısal
şok değildir. İşaretler ve vadeler yorumu destekler, kesinleştirmez.

Pencere seçimi de nötr değildir. Çok dar pencere başka haberleri azaltır ama
işlem yapılmayan piyasada eski fiyatı başlangıç değeri sanabilir; geniş pencere
likiditeyi artırır ama yeni makro haberleri içeri alır. Duyuru etkisi fiyatlara
saniyeler içinde değil kademeli giriyorsa otuz dakikalık pencere toplam etkiyi
eksik ölçer. Bu nedenle beş, otuz ve altmış dakikalık sonuçların birlikte
verilmesi, tek “doğru” pencere seçmekten daha dürüst bir sağlamlık sınamasıdır.

## Bilgi etkisi: pencerenin içindeki içsellik

Merkez bankası yalnız araç ayarlamaz; ekonomi hakkında bilgi de üretir. Piyasa,
kurumun tahmin ve veri setinin kendisininkinden üstün olduğunu düşünüyorsa faiz
artışını “enflasyon baskısı sandığımızdan güçlü” ya da “talep sandığımızdan
canlı” haberi olarak okuyabilir. Bu **bilgi etkisi**, aynı otuz dakikada ve aynı
duyuruyla gelir. Pencereyi beş dakikaya indirmek onu temizlemez.

Bu nedenle beklenmedik faiz artışıyla hisselerin yükselmesi anlamsız değildir.
Daraltıcı iskonto oranı hisse fiyatını aşağı iter; daha güçlü büyüme haberi
beklenen kârları yukarı iter. Gözlenen fiyat ikisinin netidir. Ham sürprizi saf
daraltıcı şok diye kullanmak etki-tepki sonuçlarını zayıflatabilir, hatta
“sıkılaşma üretimi artırıyor” gibi ters işaretler yaratabilir.

Miranda-Agrippino'nun keskin testi şudur: şok diye adlandırılan seri, duyurudan
önce mevcut merkez bankası tahminleriyle öngörülebiliyorsa şok değildir. Çözüm
adayları ham sürprizi merkez bankası tahminlerine koşullamak, faiz ve hisse
fiyatının ortak işaretlerinden politika ile bilgi şokunu ayırmak ve metindeki
makro görünüm haberini ayrıca ölçmektir. Hiçbiri varsayımsız değildir. Daha iyi
tanımlama, daha az varsayım değil; varsayımın nerede durduğunu daha açık
göstermektir.

## Türkiye'de olay penceresi

TCMB için aynı tasarım kurulabilir: PPK duyurusu öncesi ve sonrası TL gecelik
endeks takası, tahvil, kur ve BIST hareketleri eşleştirilir. Refet Gürkaynak'ın
kurucu makaledeki rolü de yöntemin Türkiye bağlamına yabancı olmadığını
hatırlatır. Fakat uygulamanın sınırı teoriden çok piyasa mikro yapısıdır.
İşlem görmeyen bir kontratın son fiyatı “duyuru öncesi beklenti” değildir;
alış-satış makası genişse ölçülen sıçrama likidite gürültüsü olabilir.

Ayrıca PPK günü karar oranı, metin, makro ihtiyati düzenleme ve olası döviz
müdahalesi aynı pencereye girebilir. Bunları tek TCMB şoku diye toplamak kolay,
hangi aracın hangi fiyatı etkilediğini söylemek zordur. Türkiye çalışmasında
farklı pencere uzunlukları, işlem hacmi filtresi, eşzamanlı duyuru takvimi ve
metin faktörü lüks değil, tanımlamanın parçasıdır.

## Bu dersten sonra

3.2 aktarım kanallarının teorik yönünü kurmuştu; 7.2 bu yönleri veride ölçmek
için önce şokun kimliğini çözmek gerektiğini gösterdi. 7.3'te faiz, kur, kredi
marjı ve hisseleri tek bir finansal koşullar endeksinde birleştireceğiz. Orada
da aynı soru geri dönecek: endeks politika duruşunu mu ölçüyor, yoksa politika
ile ekonominin birlikte ürettiği sonucu mu?
