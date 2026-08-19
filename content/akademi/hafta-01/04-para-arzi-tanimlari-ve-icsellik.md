---
baslik: M0, M1, M2, M3 ve para arzının içselliği
ozet: >-
  Para arzı tek bir sayı değil, farklı likidite derecelerini toplayan kurumsal
  sınıflandırmalar ailesidir. Bu ders M0'dan M3'e ölçümün ne kazandırıp neyi
  gizlediğini kurar; para stokunun merkez bankasının seçtiği dışsal bir miktar
  mı, kredi ve portföy kararlarının içsel sonucu mu olduğunu tartışır.
sure: 50
onkosul: [hafta-01/krediyi-banka-yaratir, hafta-01/merkez-bankasi-bilancosu]
kaynaklar:
  - tip: video
    baslik: >-
      Money supply: M0, M1, and M2
    url: https://www.youtube.com/watch?v=_LPh72gx6GE
    kaynak: Khan Academy
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      M0, M1 ve M2'yi giderek genişleyen likidite kümeleri olarak adım adım
      kurar. Videoyu tanımları ezberlemek için değil, her yeni katmanın ödeme
      kolaylığı karşılığında hangi tasarruf aracını eklediğini görmek için izle.
  - tip: article
    baslik: >-
      Endogenous Money: Structuralist and Horizontalist
    url: https://www.levyinstitute.org/pubs/wp_512.pdf
    kaynak: L. Randall Wray, Levy Economics Institute Working Paper No. 512 (2007)
    seviye: ileri
    ozet: >-
      Wray, kredi talebinin mevduatı ve ardından rezerv talebini doğurduğu
      içsel para yaklaşımında yataycı ve yapısalcı kolları karşılaştırır. Para
      arzının içsel olduğu uzlaşmasının, fonlama maliyeti ve merkez bankası
      uyumunun derecesi üzerindeki anlaşmazlığı bitirmediğini gösterir.
  - tip: discussion
    baslik: Para Arzı Nedir ve Nasıl Ölçülür?
    url: https://www.mahfiegilmez.com/2018/07/para-arz-nedir-ve-nasl-olculur.html
    kaynak: Mahfi Eğilmez
    seviye: orta
    ozet: >-
      Dar ve geniş para tanımlarını Türkiye pratiğine indirir ve para stoku ile
      dolaşım hızının birlikte okunması gerektiğini vurgular. Kur, vadeli
      mevduat ve TCMB serileri üzerinden bir toplamın büyümesinin ekonomik
      yoruma nasıl çevrileceğini sınamak için kullanılır.
sorular:
  - id: m2-hesabi
    tip: sayisal
    puan: 30
    soru: >-
      Basitleştirilmiş bir ekonomide dolaşımdaki nakit 200, vadesiz mevduat
      600, vadeli ve tasarruf mevduatı 900, repo fonları 100 milyar liradır.
      M1 nakit + vadesiz mevduat; M2 ise M1 + vadeli ve tasarruf mevduatı
      olarak tanımlanıyorsa M2 kaç milyar liradır?
    beklenen: 1700
    tolerans: 0
  - id: toplam-ne-soyler
    tip: acik
    puan: 35
    soru: >-
      Türkiye'de M2'nin bir yılda %70 büyüdüğünü gözleyen analist “bankalar
      ekonomiye %70 yeni satın alma gücü pompaladı” diyor. Bu çıkarım için
      işlem, yeniden değerleme ve portföy kayması ayrımını kurarak bir teşhis
      çerçevesi öner.
    olcut:
      - M2'nin dolaşımdaki para, vadesiz mevduat ve daha az likit vadeli veya tasarruf mevduatlarını bir araya getiren stok ölçüsü olduğunu belirtir.
      - Yeni banka kredisiyle yaratılan mevduatın işlem kaynaklı büyüme yaratabileceğini açıklar.
      - Döviz mevduatlarının lira karşılığının kur yükseldiğinde yeni döviz veya kredi işlemi olmadan artabileceğini belirtir.
      - M1'den vadeli mevduata veya tersi yöndeki portföy kaymasının alt toplamları değiştirebileceğini, bazı kaymaların M2 toplamını değiştirmeyebileceğini ayırır.
      - Nominal M2 büyümesini enflasyon, reel faaliyet, kredi akımları ve kur etkisiyle ayrıştırmadan satın alma gücü hükmü verilemeyeceğini söyler.
  - id: icsellik-politika
    tip: acik
    puan: 35
    soru: >-
      Para arzının içsel olması merkez bankasının para ve kredi koşulları
      üzerinde etkisiz olduğu anlamına gelir mi? Yataycı ve yapısalcı
      yaklaşımların ortak noktasını ve ayrıldıkları yeri kullanarak yanıtla.
    olcut:
      - Ortak içsellik tezini bankaların kredi talebine yanıt verip mevduat yaratması ve rezervi sonradan araması biçiminde kurar.
      - Yataycı yaklaşımın merkez bankasının hedef faizden rezerv sağladığı için kısa vadeli rezerv arzını büyük ölçüde yatay gördüğünü belirtir.
      - Yapısalcı yaklaşımın fonlama bileşimi, likidite tercihi, bilanço kısıtları ve artan marjinal maliyetlerden en az ikisini vurguladığını açıklar.
      - Merkez bankasının politika faizi, teminat, karşı taraf erişimi, likidite ve düzenleme yoluyla kredi fiyatı ile koşullarını etkilediğini belirtir.
      - Miktarın içsel olmasının fiyatın, risk iştahının veya kurumsal sınırların dışsal ve etkisiz olduğu anlamına gelmediği sonucuna varır.
---

## Tek para arzı yoktur

“Para arzı arttı” cümlesi, hangi toplamın arttığını söylemeden tamamlanmış
değildir. Cebindeki banknot ile üç aylık vadeli mevduat aynı hızda harcanamaz;
ama ikisi de nominal satın alma gücü taşır. Parasal büyüklükler bu nedenle
doğada bulunan türler değil, likidite derecesine göre çizilmiş kurumsal
sınırlardır.

Basitleştirilmiş merdiven şöyledir:

- **M0**, en dar fiziksel para göstergesidir: dolaşımdaki banknot ve madeni
  para. Ülke ve istatistik kurumu uygulamasında parasal tabanla aynı adın
  kullanılıp kullanılmadığı kontrol edilmelidir; rezervleri içeren “taban para”
  ile halkın elindeki nakit kavramsal olarak aynı değildir.
- **M1**, M0'a hemen ödemede kullanılabilen vadesiz mevduatları ekler.
- **M2**, M1'e vadeli ve tasarruf niteliğindeki, paraya yakın fakat aynı anda
  harcanması daha maliyetli kalemleri ekler.
- **M3**, M2'ye repo fonları, para piyasası araçları veya ihraç edilmiş belirli
  kısa vadeli menkul kıymetler gibi daha geniş likit yükümlülükleri ekleyebilir.

Kesin bileşenler ülkeye ve döneme göre değişebilir. Bu bir kusur değil, ölçümün
kurumsal niteliğidir. Finansal yenilik, dün “mevduat dışı” sayılan bir aracın
bugün ödemeye çok yakın hâle gelmesine yol açabilir. Seri karşılaştırmadan önce
tanım ve yöntem notu okunmalıdır.

Sınırın politika hedefi hâline gelmesi davranışı da değiştirir. Otorite M2
büyümesini sıkı bir tavana bağlarsa bankalar benzer işlev gören fakat M2 dışında
kalan fonlama araçları geliştirebilir; tasarruf sahipleri de faiz farkına göre
kalemler arasında geçer. Dün harcamayı iyi haber veren toplam, hedeflendiği için
bugün bilgi kaybedebilir. Bu Goodhart mantığı, istatistik sınıfını ekonomik öz
sanmamak için ikinci uyarıdır: ölçü sabit görünürken ölçülen kurum değişir.

## Genişledikçe bilgi artar mı?

Daha geniş toplam daha fazla varlık kapsar; fakat her soruya daha iyi yanıt
vermez. Günlük harcama kapasitesini izlemek için M1, hanelerin likit nominal
portföyünü izlemek için M2 daha uygun olabilir. M3 fonlama sistemindeki daha
geniş para benzerlerini yakalar, fakat bileşenlerin ödeme kolaylığı birbirinden
uzaklaştığı için tek katsayıyla davranış tahmin etmek zorlaşır.

Basit örnekte nakit 200, vadesiz mevduat 600, vadeli mevduat 900 ve repo 100
milyar liraysa `M1 = 800`, `M2 = 1.700`, verilen tanımla `M3 = 1.800` milyardır.
Bu toplamlar bilanço sınıflandırmasıdır; 1.800 milyarın tamamının yarın mal ve
hizmete koşacağını söylemez. Harcama için stok kadar **dolaşım hızı**, gelir,
faiz farkı ve beklenti gerekir.

Bir alt toplamın hareketi de yeni para yaratımı demek değildir. Hane vadesiz
hesaptan vadeli hesaba geçerse M1 düşer, M2 değişmeyebilir. Tahvilini satıp
vadesiz mevduat tutarsa M1 artabilir; bankacılık sisteminin toplam yükümlülüğü
ve özel kesimin net serveti farklı biçimde etkilenebilir. Toplam, işlemin
karşı tarafını söylemez.

## İçsel para: miktarı kim seçiyor?

1.2'de banka kredisinin mevduat yarattığını gördük. Kredi talebi, bankanın risk
ve kârlılık değerlendirmesinden geçerse geniş para artar; borç geri ödenince
azalır. Bu akışta M1 veya M2 merkez bankasının önce seçtiği ve bankalara
dağıttığı bir kota değildir. Ekonomideki kredi, ödeme ve portföy kararlarının
sonucudur. **Para arzının içselliği** bu nedensel iddiadır.

Yataycı yaklaşım mekanizmayı keskinleştirir. Merkez bankası kısa vadeli faiz
hedefliyorsa, bankacılık sisteminin ihtiyaç duyduğu rezervi hedef fiyattan
sağlamak zorundadır; aksi hâlde piyasa faizi hedeften kopar. Bu nedenle rezerv
arzı faiz-miktar düzleminde yataya yakındır. Bankalar önce kredi verir, sonra
rezervi bulur; merkez bankası miktarı değil fiyatı sabitler.

Yapısalcı itiraz içselliği reddetmez, “tam yatay” sonucunu reddeder. Her banka
aynı teminata, fonlama ağına ve bilanço esnekliğine sahip değildir. Kredi
genişledikçe mevduat faizi, toptan fonlama maliyeti, likidite primi veya sermaye
ihtiyacı yükselebilir. Merkez bankasının iskonto penceresine erişim koşullu ve
itibar maliyetli olabilir. Para arzı kredi talebine yanıt verir, fakat bu yanıt
sabit maliyetle ve sınırsız değildir.

Tartışmanın ortak zemini önemlidir: iki taraf da mekanik mevduat çarpanını
reddeder. Ayrılık, merkez bankası uyumunun derecesi ve finansal kurumların
artan marjinal maliyetlerinin ne kadar belirleyici olduğu üzerindedir.

## İçsellik politika etkisizliği değildir

Merkez bankası M2 miktarını doğrudan seçmiyor diye önemsizleşmez. Politika
faizi kredi ve mevduat fiyatlamasının referansını değiştirir. Teminat kuralları,
zorunlu karşılık, likidite imkânları ve düzenleyici çerçeve hangi bilançonun ne
maliyetle genişleyebileceğini belirler. Merkez bankası miktarı bir düğmeden
ayarlamak yerine, miktarı üreten kararların fiyatını ve sınırlarını etkiler.

Türkiye verisinde bir ek ayrım zorunludur. Döviz mevduatlarının lira karşılığı,
kur yükseldiğinde hesapta yeni dolar oluşmasa bile büyür. M2'nin nominal
büyümesinin bir kısmı yeni kredi veya işlem değil **yeniden değerleme** olabilir.
Ayrıca yüksek enflasyonda nominal stok artışı reel likidite artışı anlamına
gelmez. Sağlam analiz; kredi akımını, kur etkisini, mevduat türleri arasındaki
geçişi ve fiyat düzeyini ayrı ayrı gösterir. “M2 yüzde 70 arttı, o hâlde yüzde
70 para basıldı” cümlesi bu ayrımların hepsini siler.

## Bu dersten sonra

Bu derste para stokunu sınıflandırdık; henüz paranın gün içinde nasıl hareket
ettiğini görmedik. 1.5'te bir M1 mevduatının başka bankaya aktarılmasıyla rezerv
akışının nasıl doğduğunu, RTGS'nin bu akışı neden tek tek kapattığını ve
likidite tasarrufu ile mutabakat riski arasındaki değiş tokuşu kuracağız. 4.3'te
Miktar Teorisi'ne geldiğimizde `M × V = P × Y` eşitliğindeki `M` harfinin hangi
toplam olduğu ve `V`'nin neden sabit sayı olmadığı artık saklanamayacak.
