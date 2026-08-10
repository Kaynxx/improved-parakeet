---
baslik: >-
  Para politikası ve konut/hisse fiyatları: “lean vs. clean” tartışması
ozet: >-
  Merkez bankası varlık fiyatı ve kaldıraç yükselişine krizden önce faizle mi
  yaslanmalı, yoksa fiyat istikrarına odaklanıp kriz sonrasında mı temizlemeli?
  Bu ders tartışmayı balon tahmininden çok aracın körlüğü, kriz olasılığı,
  doğrusal olmayan kayıplar ve makro ihtiyati araçların yeterliliği üzerinden kurar.
sure: 60
onkosul:
  - hafta-06/makro-ihtiyati-politika
  - hafta-07/finansal-kosullar-endeksleri
kaynaklar:
  - tip: video
    baslik: >-
      Monetary policy and financial stability | "The Next Financial Crisis?"
    url: https://www.youtube.com/watch?v=tggMPncSKfM
    kaynak: European Central Bank
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Enflasyon hedefi tutarken uzun süre gevşek kalan politikanın varlık fiyatı
      ve kaldıraç riski biriktirip biriktirmediğini tartışır. “İyi enflasyon
      hedeflemesi finansal istikrar için yeterlidir” uzlaşmasının kriz sonrasında
      neden bozulduğunu görmek için izlenir.
  - tip: article
    baslik: A quantitative case for leaning against the wind
    url: https://www.bis.org/publ/work594.htm
    kaynak: >-
      Andrew J. Filardo & Phurichai Rungcharoenkitkul, BIS Working Papers No 594 (9 Aralık 2016)
    seviye: ileri
    ozet: >-
      Finansal döngüyü doğrusal olmayan bir birikme ve çöküş süreci olarak
      modelleyip bütün döngü boyunca sistematik yaslanmanın nicel savunusunu
      yapar. Geç müdahale ile kurala benzer erken tepkinin neden aynı politika
      olmadığını ayırmak için lean cephesinin temel kaynağıdır.
  - tip: discussion
    baslik: >-
      Should monetary policy take into account risks to financial stability?
    url: https://www.brookings.edu/articles/should-monetary-policy-take-into-account-risks-to-financial-stability
    kaynak: >-
      Ben S. Bernanke, Brookings blogu (7 Nisan 2015)
    seviye: orta
    ozet: >-
      Faizin finansal kırılganlığı hedeflerken bütün ekonomiyi yavaşlatan kör bir
      araç olduğunu ve maliyet-fayda hesabının ancak küçük bir tepkiyi
      desteklediğini savunur. Makro ihtiyati araçların yeterli olduğu clean
      yaklaşımını lean önerisiyle doğrudan karşılaştırmak için okunur.
sorular:
  - id: lean-beklenen-net-fayda
    tip: sayisal
    puan: 20
    soru: >-
      Bir puanlık ek faiz artışının yıllık kriz olasılığını %4'ten %3'e
      düşürdüğü, kriz olursa çıktı kaybının yıllık GSYH'nin %20'si olduğu ve
      faiz artışının normal zamandaki kesin çıktı maliyetinin GSYH'nin %0,40'ı
      olduğu varsayılsın. Diğer etkileri yok sayarak beklenen net faydayı
      “azalan beklenen kriz kaybı eksi kesin maliyet” biçiminde GSYH yüzdesi
      olarak hesapla.
    beklenen: -0.20
    tolerans: 0.01
  - id: lean-clean-kosullu-tercih
    tip: acik
    puan: 40
    soru: >-
      Konut fiyatları, konut kredisi ve hane borç servisi birlikte hızlanırken
      TÜFE hedefte ve işsizlik yüksek olsun. Merkez bankası lean mi, clean mi
      seçmeli? Yanıtını politika faizinin ve makro ihtiyati araçların göreli
      etkileri üzerinden koşullu olarak savun.
    olcut:
      - Lean yaklaşımının kriz olasılığı veya kriz şiddetini önceden azaltmayı amaçladığını belirtir.
      - Clean yaklaşımının faizin bütün talebi ve istihdamı etkileyen kör bir araç olduğu itirazını açıklar.
      - Kredi-değer oranı, borç-servis oranı veya karşı-döngüsel sermaye tamponu gibi en az iki hedefli araç önerir.
      - Makro ihtiyati araçların kapsam dışına kaçış, siyasi gevşetme veya uygulama gecikmesi nedeniyle yetersiz kalabileceğini belirtir.
      - Faizin devreye girmesi için kredi büyümesi, kaldıraç ve vade uyumsuzluğu gibi varlık fiyatından daha geniş bir eşik tanımlar.
  - id: turkiye-konut-dongusu
    tip: acik
    puan: 40
    soru: >-
      Türkiye'de negatif ex-ante reel faiz, hızlı konut kredisi büyümesi ve
      reel konut fiyatı artışı aynı dönemde görülüyor. Bu ortak hareketi
      “TCMB konut balonu yarattı” diye yorumlamadan önce hangi nedensellik ve
      refah sorularını çözmek gerekir?
    olcut:
      - Konut arzı, göç, inşaat maliyeti, kur ve enflasyondan kaçış talebini alternatif fiyat nedenleri olarak ayırır.
      - Faiz kararının dışsal kısmını sistematik enflasyon ve büyüme tepkisinden ayırmak için bir tanımlama stratejisi gerektiğini belirtir.
      - Fiyat artışından çok krediyle finansman, kaldıraç, vade uyumsuzluğu ve banka bilançosunun kriz kaybını belirlediğini açıklar.
      - Faizle yaslanmanın kiracı, ilk ev alıcısı, istihdam ve genel talep üzerindeki dağılım maliyetlerini tartışır.
      - Hedefli makro ihtiyati araçlarla politika faizinin hangi koşullarda tamamlayıcı olacağını açıklar.
---

## Balon sorusu yanlış yerden başlayabilir

Konut fiyatı hızla yükseliyor. Merkez bankası faizi artırmalı mı? Tartışma çoğu
zaman “Bu bir balon mu?” sorusuna kilitlenir. Balonu gerçek zamanda kusursuz
tespit etmek elbette zordur; fakat lean ile clean arasındaki asıl ayrım yalnız
tahmin yeteneği değildir. İki taraf, faizin finansal riski ne kadar azalttığı,
normal zamanda ne kadar zarar verdiği ve kriz sonrası temizliğin ne kadar etkili
olduğu konusunda farklı varsayımlar yapar.

**Lean against the wind**, kredi ve varlık fiyatı döngüsüne krizden önce
yaslanmayı savunur. Politika faizi enflasyon görünümünün gerektirdiğinden biraz
daha yüksek tutulur; borçlanma, kaldıraç ve risk iştahı frenlenir. **Clean**
yaklaşımı ise fiyat istikrarına odaklanır, hedefli makro ihtiyati araçları öne
çıkarır ve çöküş olursa likidite ile talep desteği verir. İsimler eşit derecede
tarafsız değildir: “temizlemek”, kriz sonrası müdahalenin gerçekten eski hale
döndürebileceğini varsayar; “yaslanmak” da merkez bankasının doğru rüzgârı
bildiğini ima eder.

## Clean cephesi: aracın körlüğü

Bernanke'nin itirazı “balonlar asla görülemez”den daha güçlüdür. Politika faizi
konut kredisine nokta atışı yapmaz. Balon olduğundan şüphelenilen bir şehirdeki
konutu yavaşlatmak için ülkenin ihracatçısının, küçük işletmesinin ve iş arayanının
finansman koşulunu da sıkılaştırır. 7.3'ün diliyle faiz, FCI'nin bütün bileşimine
ve reel talebe yayılır.

Karar bir beklenen değer hesabıdır:

> net fayda = kriz olasılığındaki azalma × kriz kaybı − normal zaman maliyeti

Faiz artışı kriz olasılığını çok az düşürüyor, buna karşılık işsizlik ve çıktı
maliyeti kesin oluşuyorsa lean pahalıdır. Sorudaki sayılarla kriz olasılığındaki
bir puanlık düşüş, GSYH'nin %20'si büyüklüğündeki kayıpta %0,20 beklenen fayda
sağlar. Kesin maliyet %0,40 olduğundan net fayda -%0,20'dir. Hesap lean'i burada
reddeder; fakat sonuç olasılık ve kayıp tahminlerine bütünüyle bağlıdır.

Bernanke ayrıca İsveç deneyimini uyarı olarak kullanır: Riksbank hane borcu
kaygısıyla faiz artırırken enflasyon hedefin altında kalmış ve istihdam zarar
görmüştür; borç dinamiğinde beklenen iyileşme gelmemiştir. Aracın hedefe etkisi
zayıfsa iyi niyet maliyeti ortadan kaldırmaz.

## Lean cephesi: doğrusal olmayan kayıp

BIS yaklaşımı beklenen değer hesabının girdilerine itiraz eder. Finansal döngü
doğrusal değildir: kaldıraç iyi zamanlarda yavaş yavaş birikir, teminat fiyatı
krediyi; kredi de teminat fiyatını yükseltir. Eşik aşılınca küçük şok satış,
teminat çağrısı, kredi daralması ve yeni satış zinciri yaratır. Kriz kaybı yalnız
o yılın çıktı açığı değildir; yatırım, beceri, kamu bilançosu ve potansiyel
üretim üzerinde yıllarca sürebilir.

Bu dünyada geç müdahale başarısızlığı lean'in değil, zamanlamanın aleyhine
kanıttır. Balon görünür hale geldiğinde kaldıraç zaten yüksektir; sert faiz artışı
çöküşü başlatabilir. Filardo ve Rungcharoenkitkul bu nedenle nokta atışı “balonu
patlat” hamlesi yerine bütün finansal döngü boyunca küçük ve sistematik yaslanmayı
savunur. Politika, iyi zamanlarda riskin birikme hızını azaltır; amaç fiyatı belli
bir düzeye indirmek değil kırılgan bilanço stokunu sınırlamaktır.

Clean stratejisinin diğer zayıflığı, kriz sonrası temizliğin kusursuz olmamasıdır.
Faiz sıfıra yaklaşabilir, bankalar sermaye kaybıyla kredi veremeyebilir, borçlu
haneler transferi harcamak yerine borç kapatabilir. Merkez bankası likiditeyi
sağlar ama iflas etmiş borçluyu ödeme gücüne kavuşturamaz. Önleme ile tedaviyi
aynı maliyetle karşılaştırmak bu asimetriyi kaçırır.

## Fiyat mı, finansman biçimi mi?

Merkez bankasının hisse ya da konut için “doğru fiyat” bilmesi gerekmez. Finansal
istikrar açısından daha sağlam nesneler kredi büyümesi, kaldıraç, vade ve kur
uyumsuzluğu, kredi standartları ve aracılar arası bağlantıdır. Nakit alımla
yükselen konut fiyatı ile kısa vadeli döviz borcuyla finanse edilen yükseliş aynı
kriz riski taşımaz.

Bu ayrım sahte bir orta yolu değil, araç tahsisini mümkün kılar. Kredi-değer
oranı, borç-servis sınırı, karşı-döngüsel sermaye tamponu ve sektör bazlı risk
ağırlığı doğrudan kırılganlığa gider. Politika faizi toplam talep ve enflasyon
için kalır. Ancak makro ihtiyati araçlar kusursuz değildir: düzenleme dışına
kaçış olur, gölge finansman büyür, siyasi baskı iyi zamanda sıkılaştırmayı
geciktirir ve yabancı para fonlama ulusal sınırı aşar. Lean savı en güçlü haline,
hedefli araçlar bu kaçakları kapatamadığında ulaşır.

## Türkiye'de konut döngüsünü okumak

Türkiye'de düşük ya da negatif ex-ante reel faiz, enflasyondan kaçış talebini
konuta ve hisseye yöneltebilir. Kredi genişlemesi bunu kaldıraçla besleyebilir.
Yine de ortak hareket tek başına “TCMB balon yarattı” kanıtı değildir. Kurun
inşaat maliyetine etkisi, konut arzının katılığı, göç, servet saklama talebi ve
vergi yapısı fiyatı aynı anda sürükler. 7.2'deki tanımlama sorunu burada da
geçerlidir: politika faizinin sistematik tepki kısmı ile dışsal gevşeme şokunu
ayırmak gerekir.

Refah hesabı da endeks düzeyinden ibaret değildir. Faizle yaslanma borçlanmayı
azaltırken ilk ev alıcısını piyasadan dışlayabilir, inşaat istihdamını düşürebilir
ve kiraları arz kanalıyla yükseltebilir. Hiç yaslanmamak ise kaldıraçlı haneleri
ve bankaları daha büyük düzeltmeye açık bırakabilir. Doğru gösterge yalnız reel
konut fiyatı değil; fiyatla birlikte kredi, borç servisi ve banka zarar emme
kapasitesidir.

## Uzlaşma nerede bitiyor?

Taraflar üç noktada yaklaşır: varlık fiyatı hedeflenmemeli; bilanço kırılganlığı
izlenmeli; hedefli makro ihtiyati araçlar ilk savunma hattı olmalı. Ayrılık,
bu hattın yetersiz kaldığı durumda başlar. Clean, faizin ek katkısının küçük ve
yan maliyetinin büyük olduğunu söyler. Lean, kriz olasılığı ve kuyruk kaybı
modellerinin bu katkıyı sistematik olarak küçümsediğini savunur. Ampirik sonuç,
gözlenemeyen karşı-olgusala bağlıdır: artırılmayan faiz yüzünden gerçekleşmeyen
kriz gözlenemez; artırılan faiz yüzünden doğmayan iş de gözlenemez.

## Bu dersten sonra

6.4 makro ihtiyati araçların neden ayrı bir politika sütunu olduğunu kurmuştu;
7.3 finansal koşulların faizden geniş olduğunu gösterdi. 7.5 ikisini tek kararda
buluşturdu: faiz finansal istikrar için kullanılabilir, fakat ancak fiyat artışı
değil kaldıraçlı kırılganlık tanımlanmış ve hedefli araçların neden yetmediği
açıklanmışsa. 8.3'te Türkiye'nin 2001 sonrası rejim değişimlerine dönerken fiyat
istikrarı, finansal istikrar ve kur hedeflerinin aynı araç üzerinde nasıl
çatıştığını değerlendireceğiz.
