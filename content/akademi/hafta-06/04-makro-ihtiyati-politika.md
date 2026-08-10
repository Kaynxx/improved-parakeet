---
baslik: Makro ihtiyati politika, göstergeler ve takdir sorunu
ozet: >-
  Makro ihtiyati politika tek tek kurumların değil, finansal sistemin birlikte
  ürettiği riski sınırlamaya çalışır. Bu ders kredi/GSYİH açığı, döngü karşıtı
  sermaye tamponu ve LTV/DTI sınırlarını kurar; mekanik kural ile denetçi
  takdiri arasındaki kaçınılmaz gerilimi Türkiye deneyimine indirir.
sure: 50
onkosul:
  - hafta-01/krediyi-banka-yaratir
  - hafta-05/imkansiz-ucleme-ve-kuresel-finansal-dongu
kaynaklar:
  - tip: video
    baslik: An insight into macroprudential policy
    url: https://www.youtube.com/watch?v=tb7EPTJZDVs
    kaynak: Warwick Business School
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Tekil banka sağlamlığı ile sistemik istikrar arasındaki farkı ve sermaye
      tamponlarıyla borçlu bazlı araçların temel mantığını tanıtır. Her bankanın
      ayrı ayrı kurala uymasının neden toplam sistemin güvenliğini garanti
      etmediğini görmek için izlenir.
  - tip: article
    baslik: 'The credit-to-GDP gap and countercyclical capital buffers: questions and answers'
    url: https://www.bis.org/publ/qtrpdf/r_qt1403g.htm
    kaynak: 'Drehmann & Tsatsaronis, BIS Quarterly Review, Mart 2014'
    seviye: ileri
    ozet: >-
      Kredi/GSYİH açığının döngü karşıtı sermaye tamponu için neden referans
      gösterge seçildiğini ve ölçüye yöneltilen temel eleştirileri ele alır.
      Göstergenin otomatik karar kuralı değil, denetçi kararını bilgilendiren
      bir sinyal olarak nasıl kullanılacağını değerlendirmek için okunur.
  - tip: discussion
    baslik: Makro İhtiyati Politikalar ve Türkiye Uygulaması
    url: https://www.mahfiegilmez.com/2014/11/makro-ihtiyati-politikalar-ve-turkiye.html
    kaynak: Mahfi Eğilmez (kişisel blog)
    seviye: orta
    ozet: >-
      Türkiye'de kredi kartı limitleri, konut kredisi LTV sınırları ve Finansal
      İstikrar Komitesi üzerinden araçların somut kurumsal kullanımını tartışır.
      Para politikası ile ihtiyati gözetim farklı kurumlara bölündüğünde ortaya
      çıkan koordinasyon sorununu BIS çerçevesine karşı okumak için kullanılır.
sorular:
  - id: sermaye-tamponu-hesabi
    tip: sayisal
    puan: 25
    soru: >-
      Bir bankanın risk ağırlıklı varlıkları 200 milyar TL'dir. Asgari sermaye
      oranı %8 iken otorite %2,5 döngü karşıtı sermaye tamponu etkinleştiriyor.
      Bankanın yalnız bu tampon nedeniyle ek tutması gereken sermaye kaç milyar
      TL'dir?
    beklenen: 5
    tolerans: 0.01
  - id: kredi-acigi-takdir
    tip: acik
    puan: 40
    soru: >-
      Kredi/GSYİH açığını döngü karşıtı sermaye tamponuna bağlayan mekanik bir
      kural ile göstergeler kuruluna dayalı takdir rejimini karşılaştır. Yanlış
      pozitif, zamanlılık ve siyasi ekonomi sorunlarını birlikte değerlendir.
    olcut:
      - Kredi/GSYİH açığını mevcut oranın uzun dönem eğiliminden sapması olarak tanımlar.
      - Mekanik kuralın öngörülebilirlik ve siyasi baskıya direnç avantajını belirtir.
      - Finansal derinleşme veya veri revizyonunun yüksek açığı yanlış kriz sinyali yapabileceğini açıklar.
      - Takdirin döviz borcu, borç servisi ve kredi bileşimi gibi ek bilgiyi kullanabildiğini fakat gecikme ve müdahaleden kaçınma riski taşıdığını söyler.
      - Göstergeyi başlangıç noktası yapan, sapma kararını gerekçeli ve kamuya açık kılan bir hibrit tasarım önerir.
  - id: ltv-dti-dagilim
    tip: acik
    puan: 35
    soru: >-
      Konut kredisinde LTV ve DTI sınırlarının aynı sistemik risk hedefi içinde
      farklı kanallardan çalıştığını açıkla. Bu araçların fiyatları, krediye
      erişimi ve gelir dağılımını nasıl etkileyebileceğini Türkiye bağlamında
      tartış.
    olcut:
      - LTV'nin kredi tutarını teminat değerine, DTI'nin borç servisini borçlunun gelirine bağladığını ayırır.
      - LTV'nin fiyat düşüşünde negatif özkaynak ve banka kaybını, DTI'nin gelir veya faiz şokunda temerrüt olasılığını sınırladığını açıklar.
      - Sıkı sınırların konut talebini ve fiyat artışını azaltabileceğini fakat düşük peşinatlı ve düşük gelirli haneleri dışlayabileceğini belirtir.
      - Türkiye'de yüksek enflasyonun nominal gelir ve konut değerlerini hızla değiştirerek sabit eşikleri aşındırabileceğini söyler.
      - İlk konut, yatırım amaçlı konut veya para birimine göre farklılaştırma gibi bir tasarım seçeneği önerir.
---

## Tek tek sağlam, birlikte kırılgan

Mikro ihtiyati denetim bir bankanın mevduat sahibine zarar vermeden ayakta kalıp
kalamayacağını sorar. Makro ihtiyati politika ise bankaların ve borçluların
birlikte davranışının finansal çevrimi nasıl büyüttüğünü sorar. Ayrım sözcük
oyunu değildir. Her banka riskini azaltmak için aynı anda varlık satarsa fiyat
düşer, teminat değeri bozulur ve başlangıçta sağlam bankalar da sermaye açığına
düşebilir. Bireysel olarak ihtiyatlı davranış topluca zararlı olabilir.

6.1'deki bilanço geri beslemesi ve 6.2'deki kredi döngüsü, müdahalenin gerekçesini
verir. Kredi genişlerken düşük ölçülen risk daha fazla krediye izin verir;
teminat fiyatı yükseldikçe borç kapasitesi artar. Daralmada aynı mekanizma tersine
döner. Ama gerekçeyi kabul etmek hangi aracın ne zaman kullanılacağını çözmez.
Makro ihtiyati politikanın merkezi tartışması budur: önceden tanımlı bir sinyale
mi bağlanmalı, yoksa eksik bilgi altında denetçi takdirine mi bırakılmalı?

## Kredi/GSYİH açığı neyi ölçer?

Kredi/GSYİH oranı finansal yükümlülüklerin gelir üretme kapasitesine göre
büyüklüğünü özetler. **Kredi/GSYİH açığı**, bu oranın tahmin edilen uzun dönem
eğiliminden sapmasıdır:

> kredi açığı = (kredi / GSYİH) − uzun dönem eğilimi

Fikir basittir. Oran kendi tarihsel eğiliminin çok üzerine çıkıyorsa borçlanma,
gelir ve geri ödeme kapasitesinden kopmuş olabilir. Basel III çerçevesi bu
sinyali döngü karşıtı sermaye tamponunun kurulmasında ortak referans noktası
yapar. İyi dönemde ek özkaynak biriktiren banka, kayıplar geldiğinde krediyi
kesmeden tamponu kullanabilir.

Fakat gözlenen oran ile “denge” oranı arasındaki fark doğrudan ölçülmez. Eğilim
istatistiksel filtreyle tahmin edilir ve yeni veri geldikçe geçmiş değerler
revize olabilir. Finansal sistemi yeni gelişen bir ülkede hızlı kredi artışı
tehlikeli patlama değil, banka erişiminin normal derinleşmesi olabilir. Yüksek
enflasyon nominal GSYİH'yı ve kredi stokunu farklı hızlarda oynatır. Döviz
kredisinin lira karşılığı kurla sıçrarsa yeni kredi verilmeden oran yükselebilir.
BIS'in savunusu bu nedenle göstergenin kusursuz olduğu değil, karar için yararlı
bir başlangıç noktası olduğudur.

## Sermaye tamponu: frene ne zaman basılır?

Döngü karşıtı sermaye tamponu genişleme döneminde bankanın risk ağırlıklı
varlıklarına ek özkaynak yükler. Sermaye pahalı olduğu için kredi fiyatı bir
miktar yükselir ve genişleme yavaşlayabilir. Daha önemlisi, daralmada tamponun
serbest bırakılması bankaya zararları emme alanı verir. Araç yalnızca patlamayı
frenlemek değil, çöküşte kredi arzının aniden kesilmesini önlemek için tasarlanır.

Mekanik kuralın avantajı öngörülebilirliktir. Denetçi iyi zamanlarda bankaların
“bu kez farklı” baskısına daha az maruz kalır. Dezavantajı, ölçüm hatasını
karara otomatik taşımaktır. Saf takdir rejimi döviz açık pozisyonu, vade,
sektörel yoğunlaşma ve borç servisi gibi zengin bilgiyi kullanır; fakat siyasi
otorite büyüme yavaşlamasın diye tamponu geciktirebilir. Makul tasarım ikisini
birleştirir: kredi açığı karar sürecini başlatır, kurul sapma kararını veri ve
gerekçesiyle yayımlar. Takdir gizli değil hesap verebilir olmalıdır.

## LTV ve DTI neden aynı şey değildir?

Sermaye tamponu bankaya yöneliktir. Borçlu bazlı araçlar sözleşmenin boyutunu
sınırlar. **LTV** oranı kredi tutarını teminatın değerine bağlar. Konut fiyatı
düşerse borçlunun negatif özkaynağa, bankanın zarara düşme ihtimalini azaltır.
**DTI** ya da borç servisi/gelir sınırı ise taksiti gelire bağlar; gelir düşüşü
veya değişken faiz artışında ödeme güçlüğünü hedefler. Teminatı güçlü fakat
geliri yetersiz borçluyu DTI, geliri yüksek fakat peşinatı az borçluyu LTV
sınırlar.

Bu araçlar risksiz değildir. Sıkı LTV konut talebini ve fiyat ivmesini
zayıflatabilir, fakat ailesinden peşinat alamayan genç ve düşük gelirli haneyi
piyasadan dışlar. Kredi banka dışına veya düzenlenmeyen finansmana kayabilir.
Konut fiyatı ölçümü gecikmeli ve oynaksa sınır görünüşte hassas, gerçekte
yanlıştır. Bu yüzden ilk konut ile yatırım amaçlı ikinci konuta, yerel para ile
döviz borcuna aynı oranı uygulamak zorunlu değildir.

Araç sızıntısı yalnız banka dışına kayış değildir. Sınır konut kredisine
uygulanırken ihtiyaç kredisiyle peşinat finanse edilebilir; yerli bankanın
bilançosu sıkılırken firma dışarıdan doğrudan döviz borçlanabilir. Dar tanımlı
bir araç ölçülen hedefi düzeltip toplam riski başka bilançoya taşıyabilir. Bu
yüzden etki değerlendirmesi yalnız düzenlenen kredi kalemine değil, hane ve
firma sektörünün konsolide borcuna bakmalıdır. Kapsamı sürekli genişletmek de
çözüm değildir; finansmanı kayıt dışına iter ve idari karmaşıklığı büyütür.

## Türkiye'de kurumlar arası hedef çatışması

Türkiye deneyiminde TCMB, BDDK ve mali otorite farklı araçlara sahiptir. Kredi
kartı taksitleri, limitler, konut LTV oranları, zorunlu karşılıklar ve sermaye
şartları aynı çevrimi etkileyebilir. Mahfi Eğilmez'in tartışması, araçları ayrı
kurumlara vermenin koordinasyonu kendiliğinden çözmediğini vurgular. Para
politikası talebi canlandırmaya çalışırken BDDK krediyi sıkıyorsa sinyal
karışabilir; tersi durumda düşük politika faiziyle frenlenen kredi aynı anda
teşvik edilebilir.

Sorun her aracın tek merkezde toplanması gerektiği değildir. Farklı kurumların
bilgi ve bağımsızlık avantajı vardır. Sorun, ortak risk teşhisi ve açık bir
tepki çerçevesi olmadan sorumluluğun dağılmasıdır. Finansal İstikrar Komitesi
ancak karar, gerekçe ve kurumlara düşen eylem izlenebiliyorsa koordinasyon
üretir; toplantının kendisi politika değildir.

## Bu dersten sonra

6.5'te yerel kredi döngüsünü dış finansmanla birleştireceğiz. Kur savunması,
sermaye çıkışı ve döviz borcu aynı anda bilançolara vurduğunda makro ihtiyati
araçların neden geç kalabileceğini göreceğiz. 7.2'de politika şokunu ampirik
olarak tanımlarken burada karşılaşılan sorun dönecek: otorite göstergelere tepki
verdiği için, araç ile sonuç arasındaki basit korelasyon politikanın etkisini
göstermez.
