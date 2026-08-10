---
baslik: İmkânsız üçleme ve küresel finansal döngü
ozet: >-
  Klasik üçleme, sabit kur, serbest sermaye hareketi ve bağımsız para
  politikasından yalnız ikisinin seçilebileceğini söyler. Bu ders Hélène Rey'in
  dalgalı kur altında bile küresel finansal döngünün bağımsızlığı daralttığı
  itirazını ve itirazın gerçekten üçlemeyi çürütüp çürütmediğini tartışır.
sure: 55
onkosul:
  - hafta-03/parasal-aktarim-kanallari
  - hafta-05/faiz-paritesi-ve-carry-trade
kaynaklar:
  - tip: video
    baslik: The Impossible Trinity and Currency Systems
    url: https://www.youtube.com/watch?v=1G_D4Z0GbrU
    kaynak: Brian Urlacher
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Sabit kur, sermaye hareketliliği ve para politikası bağımsızlığını
      Mundell-Fleming çerçevesinde karşılaştırır. Rey'in ikilem tezini sınamak
      için önce klasik üçlemenin mantıksal sınırını temiz biçimde kurar.
  - tip: article
    baslik: >-
      Dilemma not Trilemma: The Global Financial Cycle and Monetary Policy Independence
    url: https://www.nber.org/system/files/working_papers/w21162/w21162.pdf
    kaynak: Hélène Rey, NBER Working Paper 21162 (2015)
    seviye: uzman
    ozet: >-
      Sermaye akımları, kredi ve varlık fiyatlarındaki küresel ortak bileşeni
      VIX ile ilişkilendirir. Dalgalı kurun tek başına ulusal finansal koşulları
      merkez ülke politikasından yalıtmadığını ve bağımsızlık için sermaye
      hesabı ya da kaldıraç üzerinde politika gerektiğini savunur.
  - tip: discussion
    baslik: >-
      Dilemma not Trilemma: The global financial cycle and monetary policy independence
    url: https://cepr.org/voxeu/columns/dilemma-not-trilemma-global-financial-cycle-and-monetary-policy-independence
    kaynak: Hélène Rey, VoxEU/CEPR (2013)
    seviye: orta
    ozet: >-
      İkilem tezinin politika sonucunu daha erişilebilir biçimde kurar:
      makroihtiyati araçlar, stres testleri ve gerektiğinde sermaye akımı
      yönetimi. Ampirik bulgudan politika reçetesine geçerken hangi ek
      varsayımların yapıldığını tartışmak için okunur.
sorular:
  - id: sabit-kur-arbitraji
    tip: sayisal
    puan: 20
    soru: >-
      Kurun bir yıl boyunca 10 TL/USD'de kesin sabit tutulacağına inanılıyor.
      Dolar faizi %5, TL faizi %40. Bir yatırımcı 1 milyon dolar borçlanıp TL'ye
      çeviriyor, TL faizini alıyor ve yıl sonunda aynı kurdan dolara dönüyor.
      Borcunu ödedikten sonraki kârı kaç dolardır? İşlem maliyeti yoktur.
    beklenen: 350000
    tolerans: 1
  - id: trilemma-mi-dilemma-mi
    tip: acik
    puan: 45
    soru: >-
      Rey'in küresel finansal döngü bulgusu imkânsız üçlemeyi mantıksal olarak
      çürütür mü, yoksa “para politikası bağımsızlığı”nı daha gerçekçi bir
      ölçüye mi taşır? İki çerçeveyi karşılaştırarak savun.
    olcut:
      - Klasik üçlemenin sabit kur, serbest sermaye hareketi ve bağımsız para politikasından üçünün aynı anda seçilemeyeceğini söylediğini belirtir.
      - Dalgalı kurun klasik modelde politika faizini yabancı faizden ayırmaya izin verdiğini açıklar.
      - Rey'in küresel risk iştahı, kaldıraç, kredi ve varlık fiyatlarında ortak bir döngü bulduğunu söyler.
      - Politika faizi ayrışsa bile uzun vadeli faizler, risk primleri ve kredi koşullarının küresel döngüyle sıkılaşabileceğini belirtir.
      - İkilem tezinin mantıksal olanaksızlıktan çok fiilî politika etkinliği hakkında daha güçlü bir iddia olduğunu tartışır.
      - Kur rejimi, bilanço yapısı ve sermaye hesabı açıklığının kısıtın derecesini değiştirebileceğini kabul eder.
  - id: turkiye-politika-menusu
    tip: acik
    puan: 35
    soru: >-
      Fed sıkılaşırken dış finansmana bağımlı ve şirketleri döviz borçlu bir
      Türkiye'nin politika faizi dışında hangi araçları vardır? Her aracın
      bağımsızlık kazandırırken doğurduğu maliyeti belirt.
    olcut:
      - Bankaların döviz pozisyonu, kredi büyümesi veya kaldıraç üzerinde en az bir makroihtiyati araç önerir.
      - Sermaye akımı yönetimi ya da seçici kontrolün çıkış baskısını azaltabileceğini, fakat finansman maliyeti ve kaçınma davranışı yaratabileceğini belirtir.
      - Rezerv müdahalesinin oynaklığı yumuşatabileceğini, fakat rezerv stokunu tükettiğini söyler.
      - Faiz artışının kur ve sermaye çıkışını sınırlarken iç talep, kredi ve bilanço üzerinde maliyet doğurduğunu açıklar.
      - Araçların politika faizinin tam ikamesi olmadığını ve güvenilirlik sorunu varsa etkilerinin zayıflayacağını kabul eder.
---

## Üç köşe neden aynı anda tutulamaz?

İmkânsız üçleme bir slogan değil, arbitraj kısıtıdır. Bir ekonomi şu üç hedefi
aynı anda kusursuz biçimde sürdüremez: sabit döviz kuru, serbest sermaye
hareketi ve bağımsız para politikası. En fazla ikisi seçilebilir.

Sabit kur ve açık sermaye hesabı seçildiğinde 5.2'deki faiz paritesi merkez
bankasının elini bağlar. Yerli faiz yabancı faizden kalıcı olarak yüksekse ve
kurun değişmeyeceğine inanılıyorsa sermaye kesin getiri farkına akar. Merkez
bankası kuru korumak için döviz alıp yerli para verir; bilançosu genişler ve
yerli faiz aşağı gelir. Yerli faiz düşükse süreç tersine döner, rezerv kaybı
faizi yukarı iter. Sterilizasyon geçici olarak likidite etkisini silebilir ama
sonsuz bilanço ve sınırsız rezerv yaratmaz.

Üç klasik rejim buradan çıkar. Sabit kur ile bağımsız faiz isteniyorsa sermaye
hareketi yönetilir. Sabit kur ile sermaye serbestliği isteniyorsa faiz politikası
çapaya teslim edilir. Sermaye serbestliği ile bağımsız faiz isteniyorsa kurun
dalgalanmasına izin verilir. Modelin keskinliği, her köşeyi ikili değişken gibi
kurmasından gelir. Gerçek ülkeler bant, müdahale ve kısmi kontrollerle kenarlar
arasında dolaşır.

## Rey'in itirazı: kur dalgalansa da finansal koşullar dalgalanmıyor mu?

Klasik anlatıda dalgalı kur şoku emer. Fed faizi yükselttiğinde yerli merkez
bankası kendi faizini sabit tutabilir; sermaye çıkışı yerli parayı zayıflatır ve
yeni kur beklenen getirileri dengeler. Hukuken ve operasyonel olarak politika
faizi hâlâ yerlidir.

Hélène Rey daha zor bir ölçü önerir: politika bağımsızlığı, yalnız gecelik faizi
seçebilmek midir, yoksa ülkedeki kredi ve finansman koşullarını etkileyebilmek
midir? Uluslararası sermaye akımları, riskli varlık fiyatları, banka kaldıracı
ve kredi büyümesinde ortak bir küresel bileşen vardır. Bu bileşen küresel risk
ölçüleriyle, özellikle VIX ile birlikte hareket eder ve merkez ülkelerin para
politikası tarafından etkilenir.

Fed gevşediğinde dolar fonlaması ucuzlar, aracılar kaldıraç artırır ve çevre
ülkelere sermaye akar. Yerli tahvilin risk primi düşer, kredi genişler, varlık
fiyatı yükselir. Fed sıkılaştığında zincir tersine döner. Dalgalı kur bu aktarımı
tam kesmez; hatta döviz borçlu bilançolarda değer kaybı teminatı aşındırıp
sıkılaşmayı büyütebilir. Rey'in sonucu keskindir: sermaye hareketleri serbestse
küresel finansal döngü vardır; anlamlı bağımsızlık için sermaye hesabını veya
finansal aracılık kaldıraçlarını yönetmek gerekir. Üçleme fiilen ikilemdir.

## Çürütme mi, bağımsızlığın yeniden tanımı mı?

Burada uzlaşma biter. Rey'in bulguları, sabit kur ile faiz arbitrajı arasındaki
mantıksal bağı ortadan kaldırmaz. Dalgalı kur kullanan bir merkez bankası hâlâ
politika faizini Fed'den farklı belirleyebilir. Bu dar anlamda üçleme ayaktadır.

Fakat faiz aracının ekonomiye etkisi küresel risk primi tarafından bastırılıyorsa
“bağımsız” kararın sonuç üretme kapasitesi düşer. Politika faizi 500 baz puan
inerken bankaların dış fonlama maliyeti ve uzun vadeli tahvil faizi yükselebilir.
Rey bu geniş, fiilî bağımsızlığı ölçer. O halde üçleme bir olanaksızlık teoremi,
ikilem ise nicel etkinlik iddiası olarak birlikte doğru olabilir.

İtirazın gücü ülkeye göre değişir. Büyük, derin ve kendi parasıyla borçlanan bir
ekonomi küresel çevrime daha fazla direnebilir. Döviz borcu yüksek, bankaları dış
fonlamaya bağımlı küçük bir ekonomi daha az direnebilir. Kur esnekliğinin yine
de bir miktar tampon sağladığını gösteren bulgular da ikilemin “kur rejimi hiç
önemli değildir” diye okunmaması gerektiğini söyler.

Ampirik tanımlama da kolay değildir. VIX'in yükselmesi yalnız Fed politikasını
değil, küresel büyüme korkusunu ve yatırımcı risk algısını birlikte taşıyabilir.
Sermaye akımı düşünce yerli merkez bankasının faiz artırması, bağımsızlığın
kaybolduğunu gösterebilir; aynı hareket yerli enflasyon hedefinin gereği de
olabilir. İkilem tezini sınamak için ortak şok ile ulusal tepkiyi ayırmak, brüt
akımları net akımlardan ve banka kredisini tahvil finansmanından ayrı izlemek
gerekir. Bir ekonominin Fed ile aynı yönde faiz değiştirmesi tek başına bağımlılık
kanıtı değildir. Daha güçlü kanıt, yerli temeller sabitken dış finansal koşulun
uzun faizleri, kredi miktarını ve kaldıracı sistematik olarak sürüklemesidir.
Tezin politika gücü, bu ayrımın ne kadar ikna edici yapıldığına bağlıdır.

## Türkiye'ye iniş

Türkiye üçlemeyi kâğıt üzerinde dalgalı kur ve açık sermaye hesabıyla çözer;
TCMB politika faizini seçer. Fiilî rejim daha melezdir. Kur oynaklığı enflasyon
geçişkenliği ve döviz bilançoları nedeniyle siyaseten maliyetlidir; müdahaleler,
rezervler ve düzenlemeler devreye girer. Böylece kur serbestçe dalgalanırken bile
merkez bankası onu görmezden gelemez.

2018'de küresel dolar koşullarının sıkılaşması, yüksek dış finansman ihtiyacı ve
yerel güven kaybı aynı yönde çalıştı. Faiz artışı kuru savunabildi ama kredi ve
iç talebi sıkıştırdı. Alternatifler de bedelsiz değildi: rezerv satışı stok
tüketir; sermaye kontrolü finansmana erişimi ve piyasa derinliğini azaltabilir;
kredi sınırları kaynak tahsisini bozar. Makroihtiyati politika bu nedenle ek bir
araçtır, sihirli üçüncü köşe değildir.

## Bu dersten sonra

5.4'te küresel şokun yerli bilançoya ve enflasyona hangi kanallardan girdiğini
inceleyeceğiz. 5.5'te rezerv müdahalesi ile KKM benzeri araçların üçleme üzerinde
nasıl geçici hareket alanı satın aldığını, fakat koşullu yükümlülük yarattığını
göreceğiz. 6.4'te makroihtiyati politika Rey'in reçetesini kurum ve araç düzeyine
indirecek.
