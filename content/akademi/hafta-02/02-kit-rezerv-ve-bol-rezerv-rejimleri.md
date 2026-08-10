---
baslik: Kıt rezerv ve bol rezerv rejimleri
ozet: >-
  2008 sonrasında merkez bankaları faizi kontrol etmek için rezervleri kıt
  tutmak zorunda olmadıklarını öğrendi. Bu ders corridor ve floor rejimlerini
  aynı rezerv talep eğrisi üzerinde karşılaştırır; bol rezervin operasyonel
  dayanıklılığını, bilanço ayak izi ve siyasi maliyetiyle birlikte tartışır.
sure: 50
onkosul:
  - hafta-02/faiz-koridoru-ve-operasyonel-cerceve
  - hafta-01/odeme-sistemleri-ve-rezerv-dolasimi
kaynaklar:
  - tip: video
    baslik: >-
      Lecture: How the Federal Reserve Implements Monetary Policy
    url: https://www.youtube.com/watch?v=TA6IiUw9_Oo
    kaynak: Federal Reserve Bank of St. Louis
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Fed'in rezerv faizi ve gecelik ters repo imkânıyla federal fon oranını
      nasıl yönettiğini resmi bir eğitim anlatısıyla gösterir. Bol rezerv
      rejiminde günlük ince ayarın neden eski merkezi rolünü kaybettiğini
      anlamak için izlenir.
  - tip: article
    baslik: >-
      Implementing Monetary Policy in an "Ample-Reserves" Regime: The Basics
      (Note 1 of 3)
    url: https://www.federalreserve.gov/econres/notes/feds-notes/implementing-monetary-policy-in-an-ample-reserves-regime-the-basics-note-1-of-3-20200701.html
    kaynak: Federal Reserve Board, FEDS Notes (2020)
    seviye: ileri
    ozet: >-
      Bol rezerv rejiminin rezerv faizi, ON RRP ve birincil kredi faizinden
      oluşan taban-destekli yapısını teknik olarak açıklar. 2008 öncesi
      koridordan kalıcı operasyonel kopuşun birincil kaynak çerçevesidir.
  - tip: discussion
    baslik: Corridors and Floors in Monetary Policy
    url: https://libertystreeteconomics.newyorkfed.org/2012/04/corridors-and-floors-in-monetary-policy/
    kaynak: New York Fed, Liberty Street Economics (2012)
    seviye: orta
    ozet: >-
      Koridor ve floor düzenlerini yan yana koyup bol rezervin finansal
      verimlilik sağlayabileceğini tartışır. Koridora dönüşü savunan görüşle
      çatıştığı için rejim seçiminin açık kalan refah sorusunu görünür kılar.
sorular:
  - id: rezerv-faizi-firsat-getirisi
    tip: sayisal
    puan: 25
    soru: >-
      Bir banka 200 milyon dolarlık rezervi yıllık %4,9 rezerv faizinde
      tutmak yerine risksiz gecelik piyasada yıllık %5,1 ile bir günlüğüne
      kullandırabiliyor. 360 gün esasına göre ek bir günlük faiz geliri kaç
      dolardır?
    beklenen: 1111.11
    tolerans: 1
  - id: corridor-floor-karsilastirma
    tip: acik
    puan: 35
    soru: >-
      Aynı hedef gecelik faizi tutturmak isteyen iki merkez bankasından biri
      kıt rezervli corridor, diğeri bol rezervli floor rejimi kullanıyor.
      Rezerv talep eğrisindeki konum, marjinal rezervin fiyatı ve günlük
      operasyon ihtiyacı bakımından iki rejimi karşılaştır.
    olcut:
      - Corridor rejiminde rezerv arzının talep eğrisinin dik bölümünde ve hedef faiz çevresinde ayarlandığını belirtir.
      - Floor rejiminde rezerv arzının talep eğrisinin yatay ya da faize duyarsız bölümüne taşındığını açıklar.
      - Corridor'da marjinal rezervin fiyatını piyasa kıtlığının, floor'da rezerv faizinin belirlediğini söyler.
      - Kıt rezerv rejiminde likidite tahmini ve sık açık piyasa işlemi ihtiyacının daha yüksek olduğunu belirtir.
      - Bol rezervin toplam rezerv miktarı ile hedef faiz arasındaki kısa dönem bağını gevşettiğini açıklar.
  - id: bol-rezerv-refah-tercihi
    tip: acik
    puan: 40
    soru: >-
      Bol rezerv rejiminin 2008 sonrasında kalıcılaşması toplumsal açıdan
      verimli bir operasyonel yenilik mi, yoksa merkez bankasının bilanço ve
      kredi tahsisi ayak izini gereksiz büyüten bir tercih mi? Her iki tarafın
      en güçlü savını kur ve kendi hükmünü ver.
    olcut:
      - Bol rezerv lehine ödeme güvenliği, faiz kontrolü veya likidite şoklarına dayanıklılık yararlarından en az ikisini açıklar.
      - Bol rezerv aleyhine merkez bankası bilançosunun büyüklüğü, rezerv faizi ödemeleri veya piyasa aracılığının zayıflaması maliyetlerinden en az ikisini tartışır.
      - Rezerv faizi ödeyebilmenin politika faizini bilanço miktarından kısmen ayırdığını belirtir.
      - ON RRP gibi erişimi genişleten taban araçlarının alt sınırdaki sızıntıyı neden azalttığını açıklar.
      - Tercihini ölçülebilir bir ölçüte bağlar: faiz oynaklığı, bilanço maliyeti, ödeme sistemi riski veya piyasa derinliği.
---

## 2008'in asıl kırılması bilanço büyüklüğü değildi

Küresel finans krizinden önce ders kitabı şeması açıktı: rezervler kıt tutulur,
merkez bankası rezerv arzını küçük açık piyasa işlemleriyle ayarlar, gecelik
faiz talep eğrisinin dik bölümündeki hedefe yerleşirdi. Krizde yapılan varlık
alımları bankacılık sistemine çok büyük miktarda rezerv bıraktı. Eski mantık
değişmeden kalsaydı gecelik faiz koridorun tabanına çökecekti.

Çözüm rezervleri hemen geri çekmek olmadı. Merkez bankaları rezervlere faiz
ödeyerek marjinal rezervin fırsat maliyetini doğrudan belirledi. Böylece iki
politika değişkeni ayrıştı: bilançonun büyüklüğü finansal istikrar veya varlık
alımı kararlarıyla, kısa vadeli faiz ise rezerv faiziyle yönetilebildi. 2008'in
operasyonel mirası budur.

## Aynı talep eğrisinde iki rejim

Bankaların rezerv talebi doğrusal değildir. Rezerv çok kıtken küçük bir eksik,
ödeme yapamama veya pahalı merkez bankası kredisini kullanma riski yaratır;
bankalar ek bir rezerv birimi için yüksek faiz ödemeye razıdır. Rezerv arttıkça
bu sigorta değeri düşer. Yeterince bol rezerv düzeyinde banka, ek birimi
piyasaya vermek ile merkez bankasında faiz kazanarak tutmak arasında neredeyse
kayıtsızdır. Talep eğrisi yataylaşır.

**Corridor rejimi** arzı dik bölümde tutar. Hedef faizi değiştirmeden rezerv
arzındaki küçük bir tahmin hatası oranı sıçratabilir. Buna karşılık bilanço
daha küçüktür ve bankaların birbirinden likidite bulma teşviki güçlüdür.

**Floor rejimi** arzı yatay bölgeye taşır. Piyasa oranı rezerv faizinin biraz
üzerinde oluşur; rezerv miktarındaki makul dalgalanmalar oranı fazla oynatmaz.
Merkez bankası her gün “tam doğru” rezerv miktarını bulmak zorunda değildir.
Fiyat kontrolünün aracı kıtlık değil, merkez bankasının rezerv bakiyesine
ödediği faizdir.

## Taban neden bazen sızdırır?

Teoride hiçbir banka rezerv faizinden daha düşük oranla borç vermez. Gerçekte
federal fon piyasasının bütün satıcıları rezerv faizi kazanamaz. ABD'de bazı
kamu destekli kuruluşlar Fed'de faizli rezerv hesabına sahip değildir; nakdi
daha düşük oranla bankalara verebilir. Banka da bilanço maliyeti, kaldıraç
oranı veya karşı taraf sınırı nedeniyle kusursuz arbitraj yapmaz.

Gecelik ters repo imkânı (ON RRP) bu sızıntıyı azaltır. Banka dışı uygun
kuruluşlara da merkez bankasıyla belirli bir taban orandan işlem yapma seçeneği
verir. Üstte birincil kredi faizi, altta rezerv faizi ve ON RRP birlikte hedef
aralığı destekler. Floor bu nedenle tek bir faiz değil, erişim kurallarıyla
kurulmuş bir sistemdir.

## “Bol” ne kadar boldur?

Bol rezerv sabit bir sayı değildir. Banka bilançosunun büyüklüğü, düzenleyici
likidite gereksinimleri, mevduat oynaklığı ve ödeme trafiği değiştikçe talep
eğrisinin dirseği de yer değiştirir. Niceliksel sıkılaşma sırasında merkez
bankası bu dirseği doğrudan gözlemleyemez. Rezervler bir süre azalırken faiz
hiç tepki vermeyebilir; kritik bölgeye gelindiğinde küçük bir azalış repo
oranını sıçratabilir. ABD'deki Eylül 2019 repo gerilimi, doğrusal düşünmenin
tehlikesini gösterdi.

Bu yüzden “rezervler hâlâ çok büyük” cümlesi operasyonel olarak yeterli değildir.
Doğru soru, rezervlerin sistemdeki dağılımı ve bankaların ihtiyat talebi
dikkate alındığında marjinal birimin hâlâ faiz esnekliği düşük bölgede olup
olmadığıdır.

## Rejim seçimi ile politika yönünü karıştırma

Floor rejimi gevşek, corridor rejimi sıkı para politikası demek değildir. Bol
rezervli bir merkez bankası rezerv faizini sert biçimde yükselterek finansal
koşulları sıkılaştırabilir. Kıt rezervli bir merkez bankası da koridorun bütün
oranlarını indirerek gevşeyebilir. Rejim, hedef fiyatın piyasada nasıl
uygulanacağını; duruş ise o hedef fiyatın ekonomi için ne kadar kısıtlayıcı
olduğunu anlatır.

Bu ayrım bilanço yorumunda kritiktir. Merkez bankası QE'den kalan büyük
portföyünü taşırken politika faizini yükseltebilir; bilanço büyük diye o günkü
duruş otomatik olarak gevşek değildir. Buna karşılık bilanço küçülmesinin vade
primi ve piyasa likiditesi üzerinden ayrıca sıkılaştırıcı etkisi olabilir. Faiz
politikası ile bilanço politikası ayrışabilir, fakat bütünüyle bağımsız değildir.
Hangi göstergenin hangi aktarım kanalını temsil ettiğini söylemeden “para
politikası sıkılaştı” demek analizi eksik bırakır.

## Verimlilik mi, büyük merkez bankası mı?

Floor savunusu güçlüdür: ödeme sistemi daha dayanıklı olur, rezerv kıtlığı için
gereksiz kaynak harcanmaz ve kısa vadeli faiz günlük likidite tahmin hatalarına
daha az duyarlı hâle gelir. Bankaların likit ve risksiz bir varlık tutması da
finansal istikrarı destekler.

İtiraz da hafif değildir. Büyük bilanço, merkez bankasını hangi varlıkları
tutacağı konusunda kredi tahsisine yaklaştırır. Piyasa faizleri yükseldiğinde
rezervlere yapılan yüksek faiz ödemeleri siyasi görünürlük kazanır; merkez
bankasının zararı bağımsızlık tartışmasını besler. Bankalararası piyasa
zayıflarsa özel likidite fiyatlaması körelebilir. Operasyonel dayanıklılığın
bedeli kurumsal ayak izidir.

Türkiye'yi doğrudan “floor” veya “corridor” etiketiyle açıklamak bu yüzden
yanıltıcı olabilir. Zorunlu karşılıklar, swap fonlaması ve farklı vadeli
pencereler rezerv bolluğunu banka bazında parçalar. Sistemde yüksek toplam
likidite varken belirli bir bankanın marjinal TL maliyeti yine kıtlık
yansıtabilir. Rejim adı yerine marjinal fiyatı ve erişim koşulunu izlemek gerekir.

## Bu dersten sonra

2.1'de koridorun fiyat sınırlarını, burada rezerv miktarı ile faizin bağının
hangi rejimde koptuğunu gördük. 2.3'te merkez bankasının bu miktarı repo, ters
repo, menkul kıymet işlemleri ve zorunlu karşılıklarla nasıl değiştirdiğini
bilanço kayıtları üzerinden izleyeceğiz. 2.4'te aynı ayrım daha büyük ölçekte
geri dönecek: bilanço miktarı faiz hedefinden ayrışabiliyorsa QE tam olarak
hangi kanaldan çalışır?
