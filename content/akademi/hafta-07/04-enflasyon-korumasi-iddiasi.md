---
baslik: >-
  Enflasyon koruması iddiası: TIPS, altın, emtia, hisse senedi — kanıt ne diyor
ozet: >-
  Bir varlığın enflasyon döneminde bazen yükselmesi, güvenilir enflasyon koruması
  olduğu anlamına gelmez. Bu ders TIPS, altın, emtia ve hisseleri vade, enflasyon
  sürprizi, likidite, kur ve değerleme kanallarıyla karşılaştırır; nominal
  kazançtan reel korunma sonucu çıkarmanın neden hatalı olduğunu gösterir.
sure: 50
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
  - hafta-04/tufe-nin-insasi
kaynaklar:
  - tip: video
    baslik: >-
      Gold Inflation Hedge Is A Myth: Duke Professor - Kitco News
    url: https://www.youtube.com/watch?v=xrQLiljkh6w
    kaynak: Kitco NEWS
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Campbell Harvey altının yüzyıllar ölçeğindeki reel ortalamaya dönüşü ile
      yatırımcının 5-20 yıllık ufkundaki zayıf enflasyon ilişkisini ayırır.
      “Altın değersizdir” demeden “altın güvenilir enflasyon koruması değildir”
      sonucunun nasıl savunulduğunu görmek için izlenir.
  - tip: article
    baslik: The Golden Dilemma
    url: https://www.nber.org/papers/w18706
    kaynak: >-
      Claude B. Erb & Campbell R. Harvey, NBER Working Paper 18706 (2013; Financial Analysts Journal 69(4))
    seviye: uzman
    ozet: >-
      Altının enflasyon koruması dahil altı popüler rolünü uzun dönemli veriyle
      sınar ve reel altın fiyatı ikilemini kurar. Çok uzun dönem ortalaması ile
      yatırım ufkundaki koruma olasılığını karıştırmamak için dersin temel
      kanıt kaynağıdır.
  - tip: discussion
    baslik: >-
      Myth-Busting: Equities Are an Inflation Hedge
    url: https://rpc.cfainstitute.org/blogs/enterprising-investor/2021/myth-busting-equities-are-an-inflation-hedge
    kaynak: >-
      Nicolas Rabener, CFA Institute — Enterprising Investor blogu (19 Temmuz 2021)
    seviye: orta
    ozet: >-
      Şirketlerin fiyat geçirme gücünün hisseleri otomatik enflasyon korumasına
      dönüştürdüğü iddiasını reel getirilerle sınar. Ilımlı ve yüksek enflasyon
      rejimlerinde sonuçların neden ayrıştığını, sektör seçiminin de neden
      koşulsuz çözüm olmadığını tartışmak için okunur.
sorular:
  - id: altin-reel-getiri
    tip: sayisal
    puan: 20
    soru: >-
      Bir yılda gram altının TL fiyatı %80, TÜFE %65 artıyor. Kesin Fisher
      dönüşümünü kullanarak yatırımcının reel altın getirisini yüzde cinsinden,
      iki ondalıkla hesapla.
    beklenen: 9.09
    tolerans: 0.05
  - id: dort-varlik-karsilastirma
    tip: acik
    puan: 40
    soru: >-
      Beklenmeyen, enerji arzından kaynaklanan ve üç yıl süren yüksek enflasyon
      senaryosunda TIPS, geniş emtia sepeti, altın ve genel hisse endeksinin
      koruma gücünü karşılaştır. Hiçbirini koşulsuz kazanan ilan etme.
    olcut:
      - TIPS'in anaparayı resmi endekse bağladığını; buna karşılık reel faiz, vergi ve likidite riskinin fiyatı etkileyebileceğini belirtir.
      - Emtianın arz şokuna doğrudan maruz kaldığı için kısa vadede güçlü olabileceğini ama oynaklık, taşıma ve geri dönüş riskleri taşıdığını açıklar.
      - Altının nakit akımı olmayan ve enflasyonla kısa-orta vadeli ilişkisi kararsız bir varlık olduğunu söyler.
      - Hisselerde fiyat geçirme gücünü daha yüksek iskonto oranı, marj baskısı ve sektör farklılıklarıyla birlikte değerlendirir.
      - Koruma sonucunun enflasyonun kaynağına, beklenip beklenmediğine, ufka ve başlangıç değerlemesine bağlı olduğunu belirtir.
  - id: bist-koruma-iddiasi
    tip: acik
    puan: 40
    soru: >-
      BIST 100'ün bir yılda %70 yükseldiği, TÜFE'nin %65 olduğu ve liranın dolar
      karşısında %50 değer kaybettiği bir dönemde “BIST enflasyona karşı mükemmel
      korudu” iddiasını değerlendir. Hangi karşılaştırmalar yapılmadan bu sonuç
      kurulamaz?
    olcut:
      - Nominal BIST getirisini kesin biçimde TÜFE'den arındırmanın yaklaşık %3 reel getiri verdiğini gösterir ya da doğru yöntemi açıklar.
      - Temettülerin ve işlem/vergi maliyetlerinin toplam getiriye dahil edilmesi gerektiğini belirtir.
      - Dolar bazlı getirinin lira değer kaybı nedeniyle farklı bir servet koruması sonucu vereceğini açıklar.
      - Endeks içindeki ihracatçı, banka ve iç talep şirketlerinin enflasyon ve kur şokuna farklı maruz kaldığını söyler.
      - Tek yıllık gerçekleşmenin farklı başlangıç değerlemeleri ve ufuklar için güvenilir koruma kanıtı olmadığını belirtir.
---

## Önce “koruma”yı tanımla

“Altın enflasyondan korur” cümlesi test edilebilir görünür, fakat en az dört
ayrı iddiayı saklar. Varlık fiyat düzeyindeki beklenen enflasyona mı, beklenmeyen
enflasyon sürprizine mi tepki veriyor? Bir ayda mı, on yılda mı? Yerel TÜFE'ye
mi, küresel dolar enflasyonuna mı karşı korunuyor? Nominal getiri mi, satın alma
gücünü koruyan reel getiri mi ölçülüyor?

3.1'deki ders burada doğrudan geçerlidir. Nominal varlık getirisi %80 ve TÜFE
%65 ise reel getiri %15 değildir:

> reel getiri = (1 + nominal getiri) / (1 + enflasyon) − 1

Sonuç 1,80/1,65 − 1 = %9,09'dur. Yaklaşık çıkarma yüksek enflasyonda korumayı
abartır. Üstelik gerçekleşen TÜFE'yi kullanmak ex-post başarıyı ölçer; yatırım
kararı anındaki koruma beklentisini değil.

Güçlü bir enflasyon koruması üç özellik ister: enflasyon şokuyla güvenilir
pozitif ortak hareket, yatırımcının ufkuna uygun hız ve kabul edilebilir temel
risk. Dört varlık bu ölçütlerin farklı parçalarını karşılar; hiçbiri hepsini
koşulsuz karşılamaz.

## TIPS: sözleşmesel koruma, fiyatsız koruma değil

ABD TIPS anaparası resmi tüketici fiyat endeksine göre ayarlanır. Vadeye kadar
tutulan bir TIPS, kupon ve anapara bakımından ölçülen enflasyona doğrudan
endekslidir. Altın ya da hisse için bulunmayan sözleşmesel bağ budur. Bu yüzden
dört aday arasında “enflasyon ne olursa nakit akımım ona uyarlansın” sorusuna en
yakın cevap TIPS'tir.

Fakat TIPS fiyatı reel faiz değişimine duyarlıdır. Enflasyon yükselirken merkez
bankası sıkılaşır ve reel getiriler artarsa, uzun vadeli TIPS'in piyasa fiyatı
durasyon nedeniyle düşebilir. Vade öncesi satan yatırımcı “enflasyona endeksli
varlığım düştü” derken sözleşme bozulmuş değildir; reel iskonto oranı değişmiştir.
Ayrıca likidite primi, vergi uygulaması ve kullanılan resmi endeks ile hanenin
kişisel sepeti arasındaki fark korunmayı aşındırır. 3.1'de breakeven'ı kirleten
likidite, burada da piyasa fiyatını kirletir.

## Emtia: şokun kaynağına en yakın varlık

Enflasyon petrol, doğal gaz ya da gıda arzı şokundan doğuyorsa emtia fiyatı
TÜFE'den önce hareket eder. Geniş bir emtia sepeti bu nedenle beklenmeyen
enflasyona kısa vadede güçlü duyarlılık gösterebilir. Bu, emtiayı özellikle arz
enflasyonunda iyi bir taktik koruma adayı yapar.

Ama spot emtia ile yatırım getirisi aynı değildir. Yatırımcı çoğunlukla vadeli
kontrat taşır; kontrat eğrisi, teminat getirisi, yenileme maliyeti ve depolama
koşulları toplam getiriyi belirler. Şok çözülünce fiyat hızlı geri dönebilir.
Petrolün koruduğu bir dönemde tarım ya da metal aynı yönde gitmeyebilir. Emtia,
enflasyonun kaynağına yakın olduğu ölçüde güçlü; çeşitlendirilmiş tüketim
sepetine uzak olduğu ölçüde eksiktir.

## Altın: yüzyıllık doğru, yatırım ufkunda yanlış olabilir

Erb ve Harvey'nin “altın ikilemi” koruma tartışmasının ufuk hatasını açığa
çıkarır. Altının reel fiyatı çok uzun tarih boyunca bir ortalama çevresinde
dolaşmış olabilir. Buradan beş ya da on yıllık dönemde TÜFE'yi güvenilir biçimde
izleyeceği sonucu çıkmaz. Yüzyıllar ölçeğinde ortalamaya dönüş, bir yatırımcının
ufkunda devasa ve kalıcı sapmalara izin verir.

Altının kuponu ve kârı yoktur; değeri kıtlık, reel faiz, dolar, kriz talebi,
merkez bankası alımları ve yatırımcı anlatılarıyla oluşur. Enflasyon sırasında
yükselebilir, fakat neden enflasyon değil düşen reel faiz ya da zayıflayan dolar
olabilir. “Güvenli liman”, “kur koruması” ve “enflasyon koruması” aynı özellik
değildir. Kaynakların altın piyasasına yakın bir kanalda bu iddiayı reddetmesi
de tartışmanın pazarlama anlatısıyla ampirik kanıt arasındaki mesafesini gösterir.

## Hisseler: fiyat geçirme gücü iskonto oranını yenebilir mi?

Hisse için sezgi güçlüdür: şirket fiyatlarını enflasyonla artırabiliyorsa nominal
kâr ve temettü de artar; reel varlıkların mülkiyeti satın alma gücünü korur.
Fakat şirket bir TÜFE endeksli tahvil değildir. Girdi ve ücret maliyetleri satış
fiyatından hızlı artabilir, talep düşebilir, işletme sermayesi ihtiyacı büyüyebilir.
Merkez bankasının tepkisi iskonto oranını yükselterek aynı nominal kârı daha düşük
bugünkü değere indirir.

Kanıt bu nedenle rejime bağlıdır. Ilımlı enflasyonda fiyat geçirme gücü işe
yarayabilir; yüksek enflasyonda genel endeksin reel performansı zayıflar. Enerji
ve madencilik gibi kazanan sektörleri önceden seçmek ise “hisseler korur”
iddiasına zamanlama becerisi ekler. Koruma ancak sonuç görüldükten sonra doğru
sektörü işaret ediyorsa yatırım stratejisi değildir.

## Türkiye'de altın ve BIST neyi koruyor?

Gram altının TL getirisi kabaca dolar altın fiyatı ile dolar/TL hareketinin
bileşimidir. Türkiye'de gram altının TÜFE'yi yenmesi, küresel altının enflasyona
karşı iyi koruduğunu değil liranın değer kaybına karşı koruduğunu gösterebilir.
Bu ayrım anlamsal değildir: lira istikrar kazanırsa aynı stratejinin beklenen
getirisi değişir.

BIST için de nominal rekor satın alma gücü rekoru değildir. TÜFE ile arındırma,
temettü, vergi ve maliyet, dolar bazlı karşılaştırma ve endeks bileşimi birlikte
incelenmelidir. İhracatçı şirket kurdan yararlanırken döviz borçlu şirket zarar
görebilir; banka yüksek enflasyonda düzenleme ve aktif kalitesi kanallarına
maruz kalır. “BIST korur” ancak hangi şirket, hangi başlangıç değeri ve hangi
ufuk sorularından sonra anlam kazanır.

## Bu dersten sonra

4.1'de TÜFE'nin inşası, korunulan endeksin kendisinin neden hane deneyiminden
ayrılabileceğini göstermişti. 7.4 varlık seçiminin bu ölçüm sorununu ortadan
kaldırmadığını kurdu. 7.5'te bakış açısını yatırımcıdan merkez bankasına
çevireceğiz: hisse ve konut fiyatlarındaki yükseliş enflasyon hedefi için sorun
değilse bile finansal istikrar adına faizle karşılanmalı mı?
