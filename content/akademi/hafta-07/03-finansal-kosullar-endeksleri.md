---
baslik: >-
  Finansal koşullar endeksleri: politika duruşunu faizden başka ne ölçer
ozet: >-
  Politika faizi aktarımın yalnızca ilk fiyatıdır; haneler ve şirketler kredi
  marjı, kur, uzun faiz, hisse fiyatı ve teminat koşullarıyla karşılaşır. Bu
  ders finansal koşullar endekslerinin bu çok boyutlu alanı nasıl sıkıştırdığını
  ve içsel bir sonucu politika hedefi yapmanın geri besleme sorununu tartışır.
sure: 50
onkosul:
  - hafta-07/politika-sokunu-tanimlamak
  - hafta-03/parasal-aktarim-kanallari
kaynaklar:
  - tip: video
    baslik: National Financial Conditions Index (NFCI)
    url: https://www.youtube.com/watch?v=iBhYRWXgQlE
    kaynak: Federal Reserve Bank of Chicago
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Yüzü aşkın para, borç, hisse ve gölge bankacılık göstergesinin tek haftalık
      endekse nasıl indirildiğini tanıtır. Sıfırın nötr politika değil tarihsel
      ortalama anlamına geldiğini ve alt endekslerin hangi bilgiyi koruduğunu
      görmek için başlangıç kaynağıdır.
  - tip: article
    baslik: A New Index to Measure U.S. Financial Conditions
    url: https://www.federalreserve.gov/econres/notes/feds-notes/a-new-index-to-measure-us-financial-conditions-20230630.html
    kaynak: >-
      Ajello, Cavallo, Favara, Peterman, Schindler & Sinha, Federal Reserve FEDS Notes (30 Haziran 2023)
    seviye: ileri
    ozet: >-
      Yedi finansal değişkeni gelecek bir yıllık büyümeye model-tabanlı etkileriyle
      ağırlıklandıran FCI-G'yi kurar. Değişken hareketlerini dışsal kabul etmenin
      neden endeksi bir nedensel politika duruşu ölçüsünden çok kaba bir kural
      yaklaşımı yaptığını doğrudan görmek için okunur.
  - tip: discussion
    baslik: >-
      Financial conditions matter more than interest rates: A new framework for monetary policy
    url: https://cepr.org/voxeu/columns/financial-conditions-matter-more-interest-rates-new-framework-monetary-policy
    kaynak: Ricardo Caballero & Alp Simsek, VoxEU/CEPR
    seviye: ileri
    ozet: >-
      Para politikasının iletişim ve hedefleme çerçevesini r* yerine FCI-star
      etrafında kurmayı önerir. Piyasanın hedeflenen koşulları bilmesinin istikrar
      sağlayacağı savıyla, içsel bir endeksi hedeflemenin geri beslemeyi büyüteceği
      itirazını karşı karşıya getirmek için kullanılır.
sorular:
  - id: fci-agirlikli-toplam
    tip: sayisal
    puan: 20
    soru: >-
      Sıkılaşmanın pozitif olduğu bir FCI; kısa faiz, kredi marjı, hisse fiyatı
      ve kaldıraç z-skorlarını sırasıyla 0,40; 0,30; -0,20 ve 0,10 ağırlıklarıyla
      topluyor. Gözlenen z-skorları sırasıyla 1,20; 0,80; -0,50 ve 0,40 ise
      endeks değerini hesapla. Hisse ağırlığındaki eksi işareti ayrıca yön
      çevirmeyi gerektirmez.
    beklenen: 0.86
    tolerans: 0.01
  - id: fci-durus-mu-sonuc-mu
    tip: acik
    puan: 40
    soru: >-
      Politika faizi değişmediği halde lira değer kaybediyor, kredi marjları
      açılıyor ve BIST düşüyor; bir FCI sert sıkılaşma gösteriyor. “TCMB para
      politikasını sıkılaştırdı” sonucu çıkarılabilir mi? Duruş ile aktarım
      sonucunu ayırarak yanıtla.
    olcut:
      - FCI'nin özel sektörün karşılaştığı toplam finansman koşullarını politika faizinden daha geniş ölçtüğünü belirtir.
      - Kur, marj ve hisse hareketlerinin risk primi, dış şok veya büyüme beklentisi nedeniyle politika kararı olmadan değişebileceğini açıklar.
      - Endeksteki sıkılaşmanın ekonomik etki bakımından anlamlı olduğunu ama yapısal politika şoku anlamına gelmediğini söyler.
      - Nedensel yorum için 7.2'deki gibi dışsal politika sürprizi veya ayrı bir tanımlama stratejisi gerektiğini belirtir.
  - id: fci-star-hedefi
    tip: acik
    puan: 40
    soru: >-
      Merkez bankasının faiz patikası yerine hedeflediği FCI aralığını ilan
      etmesi önerisini değerlendir. Piyasa koordinasyonu yararı ile fiyatların
      içselliği ve merkez bankası “put”u riski arasında açık bir tercih yap.
    olcut:
      - FCI hedefinin uzun faiz, kur, kredi ve hisse kanallarını tek iletişim çerçevesinde toplama yararını açıklar.
      - Piyasaların hedefi bilerek koşulları kısmen kendiliğinden istikrara kavuşturabileceği devşirme etkisini belirtir.
      - Varlık fiyatlarının beklenen politika ve makro haberlerine içsel tepki verdiğini, hedef ile gösterge arasında geri besleme doğacağını söyler.
      - Merkez bankasının her piyasa düşüşünü gevşemeyle karşılayacağı beklentisinin risk almayı teşvik edebileceğini belirtir.
      - Seçtiği yaklaşım için hedef bandı, bileşen sınırı veya karar gerekçesi gibi somut bir güvenlik koşulu önerir.
---

## Faiz bir araçtır, koşul değildir

Politika faizi merkez bankasının doğrudan belirlediği kısa vadeli fiyattır.
Fakat bir şirket yatırım kararını politika faizinden borçlanarak vermez; banka
kredi faizi ya da tahvil getirisi öder. Hane konut kredisi faizine, banka fonlama
maliyeti ile teminat değerine, ihracatçı kura, borsa şirketi özsermaye maliyetine
bakar. Aynı politika faizi altında bu fiyatların tamamı değişebilir.

Bu nedenle para politikasının duruşunu tek faizle okumak eksiktir. Finansal
koşullar endeksi (FCI), aktarım zincirinin piyasa tarafındaki çok sayıda fiyat ve
miktarı tek sayıya sıkıştırır. Tipik bileşenler kısa ve uzun faizler, kredi
marjları, döviz kuru, hisse ve konut fiyatları, oynaklık, kaldıraç ve kredi
standartlarıdır. Endeksin vaadi şudur: ekonominin fiilen karşılaştığı rüzgârı,
merkez bankasının elindeki dümenin açısından daha iyi gösterir.

Vaadin bedeli de açıktır. Tek sayı üretmek için değişken seçmen, işaretleri
aynı yöne çevirmen, ölçekleri standartlaştırman ve ağırlık vermen gerekir. Her
seçim “finansal sıkılık nedir?” sorusuna gömülü bir cevaptır.

## İki farklı endeks felsefesi

Chicago Fed NFCI gibi istatistiksel endeksler yüzü aşkın serideki ortak hareketi
temel bileşen analiziyle çıkarır. Değişkenler z-skorlarına çevrilir; sıfır
tarihsel ortalamadır, pozitif değer ortalamadan sıkı koşulları gösterir. Bu
yaklaşım geniş bilgi setini az varsayımla özetler. Kredi, risk ve kaldıraç alt
endeksleri ortak sayının arkasındaki bileşimi de gösterir.

Fakat “ortalamadan sıkı” ile “ekonomi için daraltıcı” aynı cümle değildir.
Finansal sistem yapısal olarak değişirse tarihsel ortalamanın anlamı da değişir.
Ayrıca en büyük ortak varyansı yakalayan faktör, büyümeyi en çok etkileyen
faktör olmak zorunda değildir.

FCI-G ikinci yolu seçer. Politika faizi, uzun tahvil getirisi, konut kredisi
faizi, şirket tahvili getirisi, hisse ve konut fiyatları ile dolar endeksini,
Fed'in makro modellerinde gelecek bir yıllık büyümeye yaptıkları tahmini katkıyla
ağırlıklandırır. Soru “piyasalar olağandışı mı?” değil, “bugünkü finansal
değişimler büyümeye ne kadar ters rüzgâr yaratıyor?” olur. Bu yorum daha
iktisadidir; fakat model yanlışsa ağırlık da yanlıştır.

Bir endeksin seviyesi tek başına yetmez. Aynı 1 standart sapmalık sıkılık, kredi
marjından geliyorsa banka ve bilanço kanalı; kurdan geliyorsa ithal enflasyon ve
dış borç kanalı; hisseden geliyorsa servet ve özsermaye maliyeti çalışır. Bileşim
hem zaman ufkunu hem dağılım etkisini değiştirir.

## İçsellik geri dönüyor

7.2'de duyuru penceresindeki faiz hareketinin saf politika şoku olmayabileceğini
gördük. FCI bu sorunu büyütür, çünkü bileşenlerin tümü ileriye bakar. Hisse fiyatı
güçlü büyüme beklentisiyle yükselir; uzun faiz aynı nedenle artar. Biri endeksi
gevşetirken diğeri sıkılaştırabilir. Kur, ülke risk primi yüzünden düşebilir;
kredi marjı borçluların beklenen temerrüdü arttığı için açılabilir. Bu
hareketlerin hiçbiri merkez bankasının dışsal eylemi olmak zorunda değildir.

FCI-G hesaplanırken her bileşendeki hareket, büyüme modeli açısından dışsal bir
itki gibi değerlendirilir. Yazarların “kaba kural yaklaşımı” uyarısı tam burada
önemlidir. Endeks, bugünkü finansal fiyat bileşiminin modelde büyümeye ne
yapacağını söyler; bu bileşimin **neden** oluştuğunu söylemez. Dolayısıyla FCI
sert sıkılaşırken “para politikası sıkılaştı” demek yanlış olabilir. Daha dar
ama doğru cümle şudur: “finansal sistem reel ekonomiye daha sıkı koşullar
iletiyor.”

## r* yerine FCI-star mı?

Caballero ve Simsek radikal bir adım önerir: politika zaten finansal koşullar
üzerinden çalışıyorsa merkez bankası faiz patikası yerine uygun bir FCI
patikasını anlatsın. Piyasa hedeflenen koşulları bildiğinde, faiz kararını
beklemeden fiyatları o bölgeye taşıyabilir. Bu “devşirme etkisi”, piyasanın
beklentilerini politika aracına çevirir. 7.1'de geniş güven aralığı taşıyan r*
yerine doğrudan aktarım koşullarına bakmak caziptir.

Fakat içsel bir fiyatlar bileşimini hedeflemek yeni bir döngü kurar. Hisseler
düşünce FCI sıkılaşır; piyasa merkez bankasının bunu telafi edeceğini bekler;
riskli varlık alır; FCI yeniden gevşer. Böylece gösterge politika beklentisiyle
hareket ederken politika da göstergeye tepki verir. Merkez bankası “put”u,
yalnız iletişim sorunu değil ahlaki tehlikedir: aşağı yönlü riskin kamulaştığı
inancı kaldıraç talebini artırabilir.

FCI bu nedenle ne çöpe atılmalı ne de hedefe yükseltilmelidir. İyi kullanım,
seviyeyi ve bileşimi yayımlamak; farklı endeksleri karşılaştırmak; değişimi
politika şoku, dış risk ve makro haber bileşenlerine ayırmaya çalışmak; endeksi
kararın girdilerinden yalnız biri yapmaktır.

## Türkiye için hangi ağırlıklar?

Türkiye'de kur ve kredi kanallarının ABD'ye göre daha büyük ağırlık taşıması
beklenir. Döviz borcu, ithal girdi ve dolarizasyon nedeniyle lira hareketi hem
bilanço hem enflasyon kanalına girer. Kredi büyümesi de politika faizinden,
makro ihtiyati sınırlardan ve kamu bankası davranışından birlikte etkilenir.
TCMB için kurulmuş bir endeks bu yapıyı yansıtmalıdır; ABD ağırlıklarını kopyalamak
ölçüm değil varsayım ithalidir.

2018 gibi bir dönemde kur şoku, kredi daralması ve risk primi aynı endeksi sert
sıkılaştırır. Bunun önemli bir bölümü politika faizinden bağımsız başlayabilir;
ama reel ekonomi üzerindeki etkisi yine gerçektir. Duruş ile koşulu ayırmak,
koşulu önemsiz saymak değildir.

## Bu dersten sonra

7.3, 3.2'deki aktarım kanallarını tek bir göstergeye toplamanın kazancını ve
kaybını gösterdi. 7.4'te aynı finansal fiyatlara yatırımcı tarafından bakacağız:
hangi varlık enflasyon karşısında gerçekten koruma sağlar? 7.5'te ise merkez
bankasının FCI içindeki hisse ve konut fiyatlarına bilerek tepki verip vermemesi,
“lean vs. clean” tartışmasının merkezine oturacak.
