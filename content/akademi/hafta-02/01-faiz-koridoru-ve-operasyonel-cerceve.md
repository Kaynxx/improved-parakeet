---
baslik: Faiz koridoru ve operasyonel çerçeve
ozet: >-
  Merkez bankası politika faizini ilan eder; fakat bankalararası gecelik faizi
  emirle belirleyemez. Bu ders koridorun sınırlarını, rezerv talebi ile likidite
  operasyonlarının hedef faizi nasıl piyasa sonucuna çevirdiğini ve sıkı
  kontrol ile piyasa işleyişi arasındaki gerilimi inceler.
sure: 50
onkosul:
  - hafta-01/merkez-bankasi-bilancosu
  - hafta-01/odeme-sistemleri-ve-rezerv-dolasimi
kaynaklar:
  - tip: video
    baslik: >-
      FUNDAMENTALS: Monetary Policy, Interest-Rate Targeting and the Corridor
    url: https://www.youtube.com/watch?v=x5psPDtDH3E
    kaynak: Eric
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Faiz hedeflemesinin bir ilan değil, standart imkânlar ve rezerv arzıyla
      yürütülen bir piyasa düzenlemesi olduğunu adım adım kurar. Gecelik faizin
      koridor içinde neden ve nasıl tutulduğunu görmek için dersin mekanik
      başlangıç noktasıdır.
  - tip: article
    baslik: Monetary Policy under a Corridor Operating Framework
    url: https://www.kansascityfed.org/Economic%20Review/documents/944/2010-Monetary%20Policy%20under%20a%20Corridor%20Operating%20Framework.pdf
    kaynak: George A. Kahn, Federal Reserve Bank of Kansas City, Economic Review (2010)
    seviye: ileri
    ozet: >-
      Klasik koridor sisteminde borç alma ve verme faizlerinin sınırları nasıl
      kurduğunu, merkez bankasının rezerv arzını hedef çevresinde nasıl
      ayarladığını açıklar. Koridor genişliği ile faiz oynaklığı arasındaki
      tercihi resmi ve tarihsel bir çerçevede okumayı sağlar.
  - tip: discussion
    baslik: >-
      From the Floor Back to the Corridor: Why the Choice of Monetary Policy
      Implementation Framework Matters
    url: https://bpi.com/from-the-floor-back-to-the-corridor-why-the-choice-of-monetary-policy-implementation-framework-matters/
    kaynak: Bill Nelson, Bank Policy Institute (Ekim 2024)
    seviye: orta
    ozet: >-
      Bol rezervli floor düzeninden koridora dönülmesini bilanço maliyeti,
      merkez bankası zararı ve bağımsızlık üzerinden savunan güncel bir
      itirazdır. Operasyonel çerçevenin yalnız teknik verimlilik değil, mali ve
      siyasi ekonomi tercihi olduğunu tartışmak için okunur.
sorular:
  - id: koridor-agirlikli-maliyet
    tip: sayisal
    puan: 25
    soru: >-
      Bir banka 60 milyar TL'yi yıllık %45 politika repo faizinden, kalan 40
      milyar TL'yi yıllık %48,5 geç likidite faizinden bir geceliğine fonluyor.
      Basit ağırlıklı ortalamayla yıllık ortalama fonlama maliyeti yüzde kaçtır?
    beklenen: 46.4
    tolerans: 0.01
  - id: koridorda-hedef-ve-sonuc
    tip: acik
    puan: 35
    soru: >-
      Merkez bankasının politika faizini %45 ilan etmesi, bankalararası gecelik
      faizin kendiliğinden %45 olacağı anlamına neden gelmez? Ödeme akımları,
      rezerv talebi, standart imkânlar ve likidite operasyonlarını tek bir
      mekanizma içinde açıkla.
    olcut:
      - Bankaların gün sonu ödeme yükümlülükleri nedeniyle rezerv talep ettiğini ve bu talebin gün içinde kayabildiğini belirtir.
      - Borç alma ya da mevduat faizinin alt sınırı, borç verme faizinin üst sınırı oluşturduğunu açıklar.
      - Açık piyasa işlemleriyle rezerv arzının hedef faiz çevresindeki talep bölgesine taşındığını söyler.
      - Politika faizini ilan edilen hedef, gecelik piyasa faizini ise operasyonların ürettiği gerçekleşme olarak ayırır.
      - Teminat, karşı taraf erişimi veya piyasa bölümlenmesi gibi sürtünmelerin koridor sınırlarını kusursuz olmaktan çıkarabileceğini kabul eder.
  - id: asimetrik-koridor-tercihi
    tip: acik
    puan: 40
    soru: >-
      Enflasyon ve sermaye akımları oynakken merkez bankası geniş ve asimetrik
      bir koridor mu, dar ve simetrik bir koridor mu seçmelidir? Türkiye'de
      ilan edilen bir haftalık repo faizi ile ağırlıklı ortalama fonlama
      maliyetinin ayrışabildiği dönemleri dikkate alarak savunulabilir bir
      tercih geliştir.
    olcut:
      - Dar koridorun gecelik faiz oynaklığını ve politika sinyali belirsizliğini azalttığını belirtir.
      - Geniş ya da asimetrik koridorun likidite şoklarına ve sermaye akımlarına karşı gün içi esneklik sağladığını açıklar.
      - Çoklu fonlama pencerelerinin ilan edilen politika faizi ile fiili fonlama maliyetini ayrıştırabileceğini söyler.
      - Bu ayrışmanın iletişimi zorlaştırıp para politikası duruşunu gözlemlemeyi güçleştirdiğini tartışır.
      - Seçtiği çerçeveyi fiyat istikrarı, piyasa işleyişi veya şok emme ölçütlerinden en az ikisiyle gerekçelendirir.
---

## İlan edilen faiz neden piyasa faizi değildir?

Para Politikası Kurulu bir oran açıklar. Ertesi sabah bütün bankaların o
orandan işlem yapması gerekmez; çünkü kurul bankalararası piyasadaki her
işlemin karşı tarafı değildir. Bankalar gün boyunca müşterilerinin havalelerini,
kart ödemelerini ve menkul kıymet takaslarını sonuçlandırır. Gün sonunda kimi
banka rezerv fazlasıyla, kimi banka açığıyla kalır. Gecelik faiz bu rezervleri
yeniden dağıtan piyasanın fiyatıdır.

Merkez bankasının yaptığı şey, bu fiyatın oluşacağı zemini tasarlamaktır.
**Politika faizi bir emir değil, operasyonel hedeftir.** Hedefin gerçekleşmesi;
rezerv arzının, ödeme sisteminden doğan rezerv talebiyle hangi noktada
buluştuğuna ve bankaların merkez bankası imkânlarına hangi koşullarda
erişebildiğine bağlıdır.

## Koridorun iki duvarı

Basit bir koridorda merkez bankası iki sürekli imkân sunar. Rezerv fazlası olan
banka parasını merkez bankasına yatırıp `i_D` kazanabilir; rezerv açığı olan
banka uygun teminat karşılığında merkez bankasından `i_L` ile borçlanabilir.
Sürtünmesiz bir piyasada gecelik oran `i_m` şu aralıkta kalır:

> i_D ≤ i_m ≤ i_L

Bir banka güvenli biçimde `i_D` kazanabiliyorsa daha düşük faizle başka bankaya
borç vermez. Aynı banka merkez bankasından `i_L` ile fon bulabiliyorsa daha
yüksek oranı da kabul etmez. Koridorun alt ve üst duvarı böyle oluşur. Politika
hedefi çoğu klasik düzende bu iki oranın ortasında yer alır.

Ama eşitsizlik bir doğa yasası değildir. Merkez bankasında hesap tutamayan
kuruluşlar alt imkâna erişemez; teminatı yetersiz banka üst imkânı kullanamaz;
karşı taraf riski aynı gecelik işlemlerin farklı oranlardan geçmesine yol
açar. Bu yüzden gerçekleşen piyasa oranının koridor içinde olması çerçevenin
başarısı için gerekli, hedefe yakın olması için yeterli değildir.

## Rezerv miktarından faiz hedefine

Kıt rezervli bir düzende rezerv talep eğrisi hedef çevresinde diktir. Küçük bir
arz hatası gecelik faizi hızla alt ya da üst sınıra sürükleyebilir. Merkez
bankası bu nedenle Hazine nakit hareketlerini, banknot talebini ve ödeme
akımlarını tahmin eder; geçici rezerv açığını repo ile kapatır, fazlayı ters
repo veya depo işlemiyle çeker. Açık piyasa masası, kurulun kararını piyasa
fiyatına tercüme eden yerdir.

Burada miktar amaç değil araçtır. Merkez bankası belirli bir rezerv stokunu
kutsal saydığı için işlem yapmaz; marjinal rezervin fiyatını hedefe yaklaştırmak
için miktarı ayarlar. Rezerv talebi yanlış tahmin edilirse politika kararı
değişmediği hâlde gecelik oran sapar. Operasyonel başarısızlık ile politika
duruşu değişikliği aynı şey değildir.

### Otonom kalemler neden masayı sürekli meşgul eder?

Rezerv arzı yalnız merkez bankasının o sabah yaptığı ihaleden ibaret değildir.
Hazine'nin merkez bankasındaki hesabından özel sektöre ödeme çıkması bankacılık
sistemine rezerv ekler; vergi tahsilatı ters yönde rezerv çeker. Halk banknot
talebini artırdığında bankalar kasaları için merkez bankası parasına ihtiyaç
duyar ve hesap bakiyeleri azalır. Bunlara “otonom” denir, çünkü faiz kararından
değil başka ekonomik işlemlerden doğarlar.

Rezerv karşılıklarının dönem ortalaması üzerinden tutulabilmesi bankaya günler
arasında ikame olanağı verir: bugün eksik, yarın fazla tutabilir. Bu esneklik
talep eğrisini yumuşatır; karşılık döneminin son gününde ise telafi zamanı
kalmadığı için talep yeniden dikleşir. Aynı koridor genişliği ayın farklı
günlerinde farklı faiz oynaklığı üretebilir. Operasyonel çerçeve yalnız oranlar
listesi değil, hesap dönemi ve takas takvimi tasarımıdır.

## Koridor ne kadar dar olmalı?

Dar koridor faiz oynaklığını sınırlar ve kurulun sinyalini berraklaştırır.
Fakat bankaların birbirine fiyat vermek yerine doğrudan merkez bankasına
gitmesini de teşvik edebilir. Çok dar bant, piyasanın kendi likidite dağıtımını
köreltebilir. Geniş koridor bankalararası ticarete alan açar; bedeli daha oynak
gecelik faiz ve daha zor okunan bir politika duruşudur.

Asimetri tartışmayı büyütür. Üst sınır hedefe çok uzak, alt sınır yakınsa merkez
bankası likidite açığını cezalandırırken fazlayı farklı fiyatlar. Bu, geçici
şoklara karşı esneklik sağlayabilir; aynı zamanda hangi oranın “politika faizi”
olduğu sorusunu bulanıklaştırabilir. Kontrol ile piyasa keşfi arasında bedelsiz
bir seçim yoktur.

## Türkiye'de tek oran yanılgısı

TCMB deneyimi bu ayrımı somutlaştırır. Bir haftalık repo faizi ilan edilen
gösterge olabilir; fakat fonlamanın bir bölümü daha pahalı bir pencereden
yapılıyorsa bankaların karşılaştığı marjinal ve ağırlıklı ortalama maliyet
farklılaşır. Özellikle 2017–2018 çevresinde geç likidite penceresinin ağırlığı,
manşet oran değişmeden fiili sıkılığı değiştirebildi. “TCMB faizi kaç?” sorusu
bu nedenle bazen eksiktir: hangi vade, hangi pencere ve hangi işlem ağırlığı?

Bu esneklik kısa vadede işe yarayabilir; kurul kararı beklemeden fonlama
bileşimi değiştirilebilir. İtiraz da tam burada başlar. Piyasa, duruşu tek bir
fiyattan okuyamıyorsa beklenti yönetimi zayıflar ve operasyonel esneklik
iletişim maliyetine dönüşür.

## Bu dersten sonra

Bu derste rezervlerin kıt olduğu ve merkez bankasının arzı ince ayarladığı
koridoru kurduk. 2.2'de 2008 sonrasında rezervler bol olduğunda aynı talep
eğrisinin yatay bölümüne geçeceğiz: hedef faiz artık rezerv miktarını günlük
ayarlayarak değil, rezervin kendisine faiz ödeyerek tutulabilecek. 2.3'te repo,
ters repo ve zorunlu karşılıkların bu çerçevede hangi bilanço kayıtlarını
ürettiğini açacağız.
