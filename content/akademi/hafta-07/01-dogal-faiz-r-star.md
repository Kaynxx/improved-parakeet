---
baslik: >-
  Doğal faiz r*: tahmin belirsizliği ve politika kuralına devredilemezliği
ozet: >-
  Reel faiz gözlemlenen nominal faizden ve beklenen enflasyondan çıkarılıyordu;
  doğal faiz r* ise hiçbir piyasada gözlenmeyen bir denge kavramıdır. Bu ders
  r* tahmininin modelden neden ayrılamadığını ve geniş güven aralıklarına sahip
  bir tahminin mekanik politika kuralına neden dönüşemeyeceğini tartışır.
sure: 55
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
  - hafta-03/parasal-aktarim-kanallari
kaynaklar:
  - tip: video
    baslik: >-
      Video 2 of 2 on r*: neutral rate of interest (aka the natural rate of interest)
    url: https://www.youtube.com/watch?v=b3X0a2HcBck
    kaynak: >-
      Bentley University EC391: Monetary Economics
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Politika faizinin düzeyini tek başına “sıkı” ya da “gevşek” saymak yerine
      onu doğal faizle karşılaştırmanın mantığını kurar. r* düşerken aynı nominal
      faizin neden daha sıkı bir duruşa dönüşebileceğini görmek için kullanılır.
  - tip: article
    baslik: >-
      Measuring the Natural Rate of Interest: International Trends and Determinants
    url: https://www.federalreserve.gov/econres/feds/measuring-the-natural-rate-of-interest-international-trends-and-determinants.htm
    kaynak: >-
      Kathryn Holston, Thomas Laubach & John C. Williams, Federal Reserve FEDS Working Paper (2016; Journal of International Economics 2017)
    seviye: uzman
    ozet: >-
      Doğal faiz, potansiyel çıktı ve trend büyümeyi bir durum-uzayı modeliyle
      eşanlı tahmin eden standart HLW yaklaşımını verir. Nokta tahminin arkasında
      hangi görünmeyen durumların ve filtreleme varsayımlarının bulunduğunu
      görmek için dersin teknik omurgasıdır.
  - tip: discussion
    baslik: Follow R-Star?
    url: https://conversableeconomist.com/2024/04/02/follow-r-star/
    kaynak: >-
      Timothy Taylor, Conversable Economist (2024)
    seviye: orta
    ozet: >-
      Farklı yöntemlerin birbirinden birkaç puan ayrılan r* tahminleri
      üretmesini ve bu tahminlerin politika kararlarıyla döngüsel ilişkisini
      tartışır. r*'ın yararlı bir senaryo girdisi olsa da neden otomatik bir
      politika pusulası olamayacağını sınamak için okunur.
sorular:
  - id: rstar-durus-acigi
    tip: sayisal
    puan: 20
    soru: >-
      Nominal politika faizi %44, bir yıllık beklenen enflasyon %36 ve aynı
      ufuk için r* tahmini %2,50 olsun. Kesin Fisher denklemiyle ex-ante reel
      faizi hesapla; ardından reel faiz eksi r* olarak tanımlanan politika
      duruşu açığını yüzde puan cinsinden, iki ondalıkla ver.
    beklenen: 3.38
    tolerans: 0.05
  - id: rstar-guven-araligi
    tip: acik
    puan: 40
    soru: >-
      Bir merkez bankasının r* nokta tahmini %1,5, %90 güven aralığı ise
      -%0,5 ile %3,5 arasındadır. Banka “politika faizi r* + 1 puan olacak”
      kuralını ilan etmeli mi? Ölçüm, iletişim ve karar teorisi açısından
      değerlendir.
    olcut:
      - r*'ın gözlenmediğini; potansiyel çıktı, trend büyüme ve model parametreleriyle birlikte tahmin edildiğini belirtir.
      - Dört puan genişliğindeki güven aralığının aynı politika faizini kimi tahminde sıkı, kimi tahminde gevşek göstereceğini açıklar.
      - Nokta tahmine mekanik bağlanmanın model revizyonlarını doğrudan politika oynaklığına çevireceğini söyler.
      - r*'ı senaryo ya da çapraz kontrol olarak kullanıp enflasyon, faaliyet, ücret ve finansal koşul verileriyle birlikte değerlendiren bir karar çerçevesi önerir.
  - id: turkiye-rstar-kimlik
    tip: acik
    puan: 40
    soru: >-
      Türkiye için 2021 sonrasında hesaplanan düşük bir r* tahmini “faiz
      indirimleri doğaldı” sonucunu tek başına destekler mi? Tahminin veri ve
      model tarafından nasıl üretildiğini sorgulayan bir karşı argüman kur.
    olcut:
      - Yüksek ve oynak enflasyonda ex-ante reel faizin seçilen beklenti ölçüsüne duyarlı olduğunu belirtir.
      - Potansiyel büyüme, çıktı açığı ve risk priminin Türkiye için kararsız ya da yapısal kırılmalara açık olduğunu açıklar.
      - Politika faizinin kendisinin finansal koşulları ve dolayısıyla modele giren verileri etkileyerek döngüsellik yaratabileceğini söyler.
      - Düşük r* tahmininin nedensel bir politika gerekçesi değil, alternatif modeller ve gerçekleşen enflasyonla sınanması gereken bir çıkarım olduğu sonucuna varır.
---

## Bir çıkarımdan daha görünmez bir büyüklüğe

3.1'de reel faizin ekrandan okunmadığını gördük. Nominal faiz gözlenir; ex-ante
reel faiz, nominal faizden beklenen enflasyon çıkarılarak — yüksek oranlarda
kesin Fisher denklemiyle — **çıkarılır**. Beklenti seçimi değişince reel faiz de
değişir. Yine de hesapta en az bir piyasa fiyatı ve açıkça seçilebilen bir
enflasyon beklentisi vardır.

r* bundan bir adım daha uzaktadır. Doğal faiz, ekonomi potansiyelinde üretirken
ve enflasyon istikrarlıyken tasarruf ile yatırımı dengeleyen kısa vadeli reel
faizdir. Ne bir tahvil getirisi ne de bir anket cevabıdır. Karşı-olgusal bir
denge fiyatıdır: ekonomi şoklardan arınmış olsaydı hangi reel faiz ne
enflasyonu hızlandırır ne de yavaşlatırdı? Bu nedenle reel faiz çıkarsanan bir
büyüklükken r* **hiç gözlemlenemeyen gizli bir durumdur**. İkisini birbirinden
çıkarmak, iki kesin sayının farkını almak değildir.

Politika tartışması buna rağmen basit bir aritmetik gibi sunulur:

> duruş açığı = ex-ante reel politika faizi − r*

Açık pozitifse politika sıkı, negatifse gevşek denir. Bu iyi bir düşünme
aracıdır. Fakat sağ taraftaki iki terimin de tahmin olduğunu unuttuğun anda
ölçüm, karar kuralı kılığına girer.

## r* nasıl tahmin edilir?

Holston–Laubach–Williams yaklaşımı r*'ı, potansiyel çıktıyı ve trend büyümeyi
bir durum-uzayı modelinin görünmeyen durumları olarak kurar. Gözlenen büyüme ve
enflasyon, bu gizli durumların gürültülü işaretleridir. Bir IS ilişkisi çıktı
açığını reel faiz açığına bağlar; Phillips eğrisi çıktı açığını enflasyona
bağlar. Kalman filtresi, yeni veri geldikçe gözlenmeyen durumların en olası
patikasını günceller.

Şema kabaca şöyledir:

> r*_t = trend büyüme bileşeni + diğer yavaş hareketli etkenler

> çıktı açığı_t = geçmiş çıktı açıkları − faiz açığının etkisi + talep şoku

> enflasyon_t = beklenen/geçmiş enflasyon + çıktı açığının etkisi + arz şoku

Bu bir ölçüm cihazı değildir. Hangi enflasyon dinamiğinin, hangi doğal çıktı
sürecinin ve hangi şok varyansının seçildiği sonucu belirler. Potansiyel çıktı
yanlış tahmin edilirse hata yalnız çıktı açığında kalmaz; filtre onu r*'a da
paylaştırır. Dahası, gerçek zamanlı veri ile sonradan revize edilmiş veri aynı
r* tarihini üretmez. Politika kurulu karar verirken gelecekteki veri
revizyonlarını kullanamaz.

Bir de uç-nokta sorunu vardır. Filtre geçmiş dönemi tahmin ederken hem önceki
hem sonraki gözlemlerden yararlanabilir; bugünkü r* içinse gelecek veri yoktur.
Bu yüzden karar anındaki tek taraflı tahmin, yıllar sonra yayımlanan iki taraflı
tarihsel tahminden daha oynak ve daha belirsizdir. Sonradan düzgün görünen bir
r* patikası, kurulun o gün gerçekten sahip olduğu bilgi setini olduğundan temiz
gösterir. Politika değerlendirmesi gerçek zamanlı tahmin arşivi kullanmadıkça
geriye bakış yanlılığı üretir.

## Düşüş hikâyesi ve kimlik sorunu

Gelişmiş ekonomilerde r* tahminlerinin uzun dönemde gerilemesi için güçlü
adaylar var: yaşlanma ve yüksek tasarruf, daha yavaş verimlilik artışı, güvenli
varlık talebi ve küresel tasarruf bolluğu. Dört ekonomide ortak düşüş bulunması,
salt ulusal para politikasından daha geniş bir güce işaret eder.

Fakat burada uzlaşma biter. 2008 sonrasında merkez bankaları faizleri uzun süre
düşük tuttu; aynı dönemin verileri r* tahminini de aşağı çekti. Model gerçekten
bağımsız bir doğal faizi mi buldu, yoksa politikanın yarattığı zayıf yatırım ve
düşük faiz ortamını “doğal” diye mi geri okudu? Nedensellik yönünü yalnız
filtreyle çözemezsin. r* tahmini politika için girdi olurken politika da r*
tahmininin girdilerini değiştirir.

Bu nedenle “faiz düşük, demek ki politika gevşek” cümlesi yanlıştır; fakat
“faiz r*'ın altında, demek ki politika kesin gevşek” cümlesi de gereğinden
fazla iddialıdır. İkinci cümle daha iyi bir kurama dayanır ama r* tahmininin
belirsizliğini gizler.

## Politika neden bir nokta tahmine devredilemez?

r* için %1,5 nokta tahmini ve -%0,5–%3,5 güven aralığı düşün. Reel politika
faizi %2,5 ise aynı duruş bir uçta üç puan sıkı, öteki uçta bir puan gevşektir.
“r* + 1” kuralı bu belirsizliği ortadan kaldırmaz; sadece kararın içine
saklar. Bir veri revizyonu r*'ı değiştirince kural, ekonomide yeni bilgi
olmadan faiz patikasını oynatabilir.

Sağlam kullanım daha mütevazıdır. Kurul birden çok r* modelini, piyasa ve anket
beklentileriyle hesaplanan reel faizleri, ücretleri, talebi, krediyi ve finansal
koşulları birlikte izler. r* bir senaryo ekseni ve çapraz kontroldür; hükmün
kendisi değildir. Belirsizlik yüksekse “temkin” de tek yönlü değildir: fazla
sıkı kalmanın işsizlik maliyeti kadar erken gevşemenin beklenti çıpası maliyeti
de hesaba katılır.

Türkiye'de sorun keskinleşir. Enflasyon beklentisi ölçüleri ayrışır, trend
büyüme yapısal kırılmalar taşır, ülke risk primi iç finansman koşullarına güçlü
biçimde girer. Küresel bir güvenli reel faiz ile Türkiye'deki borçlunun karşı
karşıya olduğu denge reel maliyeti aynı nesne değildir. 2021'de düşük olduğu
iddia edilen r*, faiz indiriminin doğruluğunu kendi başına kanıtlayamaz; çünkü
iddianın ölçüsü de indirimin etkilediği verilerden üretilmiştir.

## Bu dersten sonra

3.1 bize reel faizin ölçü değil çıkarım olduğunu öğretti; 7.1 bu sınırı r* ile
daha da ileri taşıdı. 7.2'de benzer bir kimlik sorununu politika şokunda
göreceğiz: faiz kararından sonra fiyatın hareket etmesi, hareketin saf politika
nedeniyle oluştuğunu göstermez. 7.3 ise r*'ın yerine finansal koşulları koymanın
ölçüm sorununu çözüp çözmediğini soracak.
