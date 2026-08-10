---
baslik: Negatif reel faiz ve finansal baskı
ozet: >-
  Negatif reel faiz yalnız piyasa sonucu değil, kamu borcunun reel değerini
  azaltan bir politika bileşeni olabilir. Bu ders faiz tavanı, yönlendirilmiş
  kredi, sermaye kontrolü ve enflasyonun birlikte nasıl örtük vergi ürettiğini;
  finansal baskının istikrar aracı mı servet transferi mi olduğunu tartışır.
sure: 50
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
  - hafta-03/parasal-aktarim-kanallari
kaynaklar:
  - tip: video
    baslik: Financial Repression Explained — What It Means for Savers
    url: https://www.youtube.com/watch?v=ex8Q4-qAS10
    kaynak: APEX MACRO
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Enflasyon ile düşük nominal faizin tasarruf sahibinden borçluya yarattığı
      satın alma gücü transferini gündelik dille açıklar. Finansal baskının
      görünmez vergi niteliğini tarihsel ve teknik okumaya geçmeden önce kurmak
      için izlenir.
  - tip: article
    baslik: The Liquidation of Government Debt
    url: https://www.bis.org/publ/work363.htm
    kaynak: Carmen M. Reinhart, M. Belen Sbrancia
    seviye: uzman
    ozet: >-
      1945-1980 döneminde negatif reel faiz, faiz tavanı, sermaye kontrolü ve
      yönlendirilmiş kredinin kamu borcunu nasıl erittiğini ampirik olarak
      ölçer. Finansal baskının münferit müdahale değil, birlikte çalışan bir
      kurumlar sistemi olduğunu görmek için temel kaynaktır.
  - tip: discussion
    baslik: >-
      Financial repression: Then and now
    url: https://cepr.org/voxeu/columns/financial-repression-then-and-now
    kaynak: CEPR VoxEU
    seviye: ileri
    ozet: >-
      Savaş sonrası borç tasfiyesiyle günümüzün yüksek kamu borcu ortamını
      karşılaştırır. Aynı araçların liberal finansal sistemde hangi yeni
      adlarla ve sınırlamalarla dönebileceğini tartışmak için tarihsel makaleye
      güncel bir karşılık sağlar.
sorular:
  - id: reel-borc-erimesi
    tip: sayisal
    puan: 25
    soru: >-
      Bir yıllık devlet tahvilinin nominal faizi yüzde 20'de tutuluyor ve aynı
      yıl fiyat düzeyi yüzde 50 artıyor. Kesin Fisher hesabıyla tahvilin
      gerçekleşen reel getirisi yüzde kaçtır?
    beklenen: -20
    tolerans: 0.2
  - id: ortuk-vergi-tartismasi
    tip: acik
    puan: 40
    soru: >-
      Negatif reel faize “tasarruf sahibinden alınan örtük vergi” demek hangi
      koşullarda analitik olarak doğrudur, hangi koşullarda yanıltıcıdır?
      Karşı-olgusal piyasa faizi, gönüllülük ve dağılım etkilerini kullan.
    olcut:
      - Nominal getirinin enflasyonun altında kalmasıyla alacaklının satın alma gücü kaybettiğini kesin Fisher mantığıyla açıklar.
      - Vergi benzetmesinin anlamlı olması için politikanın getiriyi karşı-olgusal piyasa düzeyinin altında tuttuğunu belirtir.
      - Mevduat garantisi, likidite hizmeti veya kriz sigortasının düşük getirinin karşılığında fayda sağlayabileceğini kabul eder.
      - Sermaye kontrolü ya da zorunlu tahvil tutma varsa tasarruf sahibinin kaçış seçeneğinin sınırlanmasının vergi benzetmesini güçlendirdiğini söyler.
      - Transferin mevduat sahibi, borçlu hane, banka, firma ve devlet arasında eşit dağılmadığını somutlaştırır.
  - id: baski-mi-ihtiyat-mi
    tip: acik
    puan: 35
    soru: >-
      Bankalara devlet tahvili tutma zorunluluğu getiren bir düzenleme finansal
      baskı mı, makroihtiyati politika mı? Amaç, fiyatlama, süre ve çıkış
      ölçütleriyle iki yorumu ayıran bir değerlendirme çerçevesi kur.
    olcut:
      - Düzenlemenin sistemik likidite veya faiz riskini azaltma amacı taşıması hâlinde makroihtiyati gerekçenin mümkün olduğunu belirtir.
      - Tahvil talebini yapay biçimde artırıp kamu borçlanma maliyetini piyasa düzeyinin altında tutuyorsa finansal baskı niteliği taşıdığını söyler.
      - Maliyetin banka kârı, kredi faizi, mevduat getirisi veya vergi mükellefine nasıl dağıldığını izlemeyi önerir.
      - Geçici, şeffaf ve durum koşullu bir araçla kalıcı, seçici ve çıkışı belirsiz bir yükümlülüğü ayırır.
      - Aynı aracın hem finansal istikrar hem kamu finansmanı amacı taşıyabileceğini ve etiket yerine ölçülebilir etkiye bakılması gerektiğini kabul eder.
---

## Negatif reel faiz kendiliğinden baskı değildir

Nominal faizin enflasyonun altında kalması alacaklının satın alma gücünü azaltır.
3.1'deki kesin Fisher denklemiyle nominal getiri yüzde 20, enflasyon yüzde 50
ise reel getiri `1,20/1,50 − 1 = −%20` olur. Devlete 100 birim satın alma gücü
veren kişi yıl sonunda faiz dâhil yalnız 80 birimlik satın alma gücü geri alır.
Borçlunun reel yükü aynı miktarda hafiflemiştir.

Fakat her negatif reel faiz **finansal baskı** değildir. Beklenmeyen enflasyon
serbest piyasada fiyatlanmış uzun vadeli tahvili de zarara uğratabilir. Finansal
baskı daha dar bir iddiadır: devlet, düzenlemeler ve piyasa erişim kısıtlarıyla
tasarrufu kendi borcuna veya tercih ettiği sektörlere yönlendirir; nominal
getiriyi karşı-olgusal serbest piyasa düzeyinin altında tutar; enflasyon da borcun
reel değerini eritir.

Tartışmanın zor kısmı bu karşı-olgusaldır. “Müdahale olmasaydı faiz kaç olurdu?”
doğrudan gözlenemez. Negatif reel getiriyi görmek kolay, bunun bilinçli borç
tasfiyesi olduğunu kanıtlamak zordur.

## Bir araç değil, bir sistem

Savaş sonrası finansal baskı rejimleri birkaç aracın birlikte çalışmasına
dayanıyordu:

- Mevduat ve tahvil faizlerine tavan konur.
- Banka ve emeklilik fonlarına devlet kâğıdı tutma zorunluluğu getirilir.
- Kredi belirli sektörlere idari olarak yönlendirilir.
- Sermaye kontrolleri tasarruf sahibinin yabancı varlığa kaçmasını zorlaştırır.
- Ilımlı ya da yüksek enflasyon nominal borcun reel değerini düşürür.

Faiz tavanı tek başına sürdürülemez; tasarruf sahibi dövize veya altına geçer.
Sermaye ve portföy kısıtları bu kaçışı sınırlar. Zorunlu yerli talep devletin
düşük faizle borçlanmasını sağlar. Enflasyon ise sabit nominal alacağın satın
alma gücünü aşındırır. Reinhart ve Sbrancia'nın tarihsel katkısı, bu bileşimi
yalnız nitel olarak değil, kamu borcu tasfiyesi büyüklüğüyle ölçmesidir.

Bu mekanizma bütçede vergi satırı oluşturmaz. Bu yüzden siyasi olarak açık vergi
artışından daha az görünürdür. Ama görünmezlik maliyetsizlik değildir: kayıp,
mevduat sahibi ve tahvil yatırımcısının bilançosunda gerçekleşir.

## İstikrar aracı mı, örtük vergi mi?

Finansal düzenlemelerin tamamını baskı diye adlandırmak da hatadır. Bankaların
yüksek kaliteli likit varlık tutması, mevduat kaçışı anında ödeme gücünü
koruyabilir. Sermaye akımına geçici sınır, paniğin kendi kendini beslediği bir
krizde koordinasyon aracı olabilir. Mevduat garantisi düşük getirili güvenli
hesaba sigorta hizmeti ekler. Tasarruf sahibi yalnız faiz satın almaz; likidite
ve güvenlik de satın alır.

Ayırıcı test niyetten çok tasarımdır. Araç sistemik riske bağlı, şeffaf, genel ve
çıkış koşulu belirliyse makroihtiyati yorum güçlenir. Bankaları kalıcı biçimde
düşük getirili kamu borcuna zorluyor, kredi fiyatlarını bütçe ihtiyacına göre
belirliyor ve alternatif varlığa geçişi cezalandırıyorsa finansal baskı yorumu
güçlenir. Aynı düzenleme iki amaca birden hizmet edebilir. Etiket ikili, gerçek
dünya değildir.

## Dağılım etkisi ortalamada kaybolur

Negatif reel faizden devlet ve sabit nominal faizle borçlananlar kazanır;
mevduat sahibi ve sabit getirili tahvil taşıyanlar kaybeder. Fakat haneler aynı
portföye sahip değildir. Varlıklı hane döviz, altın, hisse ve gayrimenkule
kaçabilir. Banka mevduatına mahkûm küçük tasarrufçu daha az korunur. Değişken
faizli borçlu ise nominal faiz yeniden fiyatlandığında beklenen kazancı elde
edemeyebilir.

Bankalar da yalnız kazanan ya da kaybeden değildir. Ucuz mevduat ile yüksek
getirili varlık arasındaki marj bankayı destekleyebilir; zorunlu düşük getirili
tahvil tutma ise özkaynağı aşındırabilir. Maliyet daha yüksek kredi faiziyle
firmalara aktarılırsa kamu borcunu ucuzlatan düzenleme özel yatırımı dışlar.
Dolayısıyla “devlet kazandı, tasarrufçu kaybetti” doğru yönü gösterir ama aktarım
zincirini eksik bırakır.

## Türkiye'ye iniş

Türkiye'de negatif ex-post reel mevduat faizleri yeni değildir; 2021 sonrası
yüksek enflasyon dönemi farkı keskinleştirdi. Dövize yönelişi sınırlamak için
kur korumalı mevduat, liralaşma hedefleri, menkul kıymet yükümlülükleri ve kredi
büyümesi kuralları birlikte kullanıldı. Bunları tek tek değil sistem olarak
okumak gerekir: bir araç diğerinin yarattığı kaçış kanalını kapatabilir.

Kur korumalı mevduat örneği dağılım sorununu görünür kılar. Mevduat sahibine kur
farkı koruması sunarken kur riskini kamu bilançosuna taşıdı. Böylece finansal
baskının maliyeti tamamen ortadan kalkmadı; vergi mükellefi, para yaratımı veya
gelecekteki bütçe üzerinden yeniden dağıtıldı. Şu neden “ücretsiz koruma” değil:
özel bilançodaki kur riski kamulaştırıldığında toplumsal bilanço kaybolmaz.

Finansal baskı kısa vadede borç dinamiğini ve finansal istikrarı yönetebilir.
Uzun vadede tasarrufun vadesini kısaltabilir, dolarizasyonu kalıcılaştırabilir ve
fiyat sinyalini bozabilir. Hüküm, aracın varlığıyla değil; karşı-olgusal faiz,
kalıcılık, kaçış seçenekleri ve maliyetin kimde kaldığıyla verilmelidir.

Bir başka ölçüt beklenirliktir. Enflasyon önceden bütünüyle fiyatlanırsa devletin
nominal borçlanma maliyeti yükselir ve eritme kanalı daralır. Baskı rejimi bu
yeniden fiyatlamayı faiz tavanı ve zorunlu taleple engellediği ölçüde çalışır.
Dolayısıyla borç tasfiyesi yalnız enflasyon üretme kapasitesine değil,
tasarrufçunun korunma aracına erişimini sınırlama kapasitesine de bağlıdır.

## Bu dersten sonra

4.5'te enflasyon vergisi ile senyorajı açık bütçe hesabına dönüştüreceğiz;
finansal baskı bunlarla akraba ama aynı kavram değildir. 6.4'te makroihtiyati
politikanın meşru istikrar hedefleriyle, 8.2'de mali baskınlığın para politikası
sınırlarıyla karşılaştırma yapacağız. 8.4'te ise baskı sona erse bile
dolarizasyon davranışının neden hemen geri dönmediğini göreceğiz.
