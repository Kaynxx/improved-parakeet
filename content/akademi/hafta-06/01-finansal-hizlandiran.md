---
baslik: Finansal hızlandıran ve bilanço kanalının sınırları
ozet: >-
  Küçük bir reel ya da parasal şok, borçlunun net değerini aşındırarak dış
  finansman primini ve yatırım daralmasını büyütebilir. Bu ders
  Bernanke–Gertler mekanizmasını kurar ve asıl tartışmayı açar: döngüyü
  borçlunun bilançosu mu, bankaların kredi yaratma kararı mı sürüklüyor?
sure: 50
onkosul:
  - hafta-01/krediyi-banka-yaratir
  - hafta-05/kur-geciskenligi-ve-dolarizasyon
kaynaklar:
  - tip: video
    baslik: Applied Macroeconomic - The Financial Accelerator
    url: https://www.youtube.com/watch?v=fNLUlYNFOak
    kaynak: GaMa Insight
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Firma net değeri, teminat ve dış finansman primi arasındaki geri besleme
      zincirini sezgisel olarak kurar. Küçük bir şokun kredi koşulları üzerinden
      neden daha büyük yatırım ve çıktı hareketi üretebildiğini görmek için
      makaledeki formel modelden önce izlenir.
  - tip: article
    baslik: The Financial Accelerator in a Quantitative Business Cycle Framework
    url: https://www.nber.org/papers/w6455
    kaynak: Bernanke, Gertler & Gilchrist (NBER WP 6455, 1998)
    seviye: ileri
    ozet: >-
      Finansal hızlandıranı dinamik genel denge çerçevesine yerleştiren temel
      metindir. Net değer ile dış finansman primi arasındaki ters ilişkiyi ve
      bu ilişkinin parasal politika şokunun yatırım tepkisini nasıl uzattığını
      formel olarak izlemek için okunur.
  - tip: discussion
    baslik: 'Steve Keen: Bye Bye, Bernanke'
    url: https://www.nakedcapitalism.com/2014/01/steve-keen-bye-bye-bernanke.html
    kaynak: naked capitalism (Steve Keen)
    seviye: orta
    ozet: >-
      Bernanke çerçevesinin banka bilançosunu ve özel borcun kendi dinamiğini
      ikincil bıraktığı itirazını temsil eder. Finansal hızlandıranın güçlü bir
      aktarım mekanizması mı, yoksa kredi yaratımını eksik anlatan bir model mi
      olduğu tartışmasını keskinleştirir.
sorular:
  - id: dis-finansman-primi
    tip: sayisal
    puan: 25
    soru: >-
      Bir firmanın 100 birimlik yatırımının başlangıçta 60 birimi dış
      finansmanla karşılanıyor. Net değer kaybından sonra dış finansman ihtiyacı
      75 birime çıkıyor. Banka, dış finansman payındaki her 10 yüzde puanlık
      artış için primi 40 baz puan yükseltiyorsa dış finansman primi kaç yüzde
      puan artar?
    beklenen: 0.6
    tolerans: 0.01
  - id: net-deger-mi-kredi-arzi-mi
    tip: acik
    puan: 40
    soru: >-
      Aynı yatırım düşüşünü Bernanke–Gertler bilanço kanalı ile Steve Keen'in
      kredi arzı itirazı nasıl farklı açıklar? İki yaklaşımın nedensellik
      yönünü, politika önerisini ve ampirik olarak ayrıştırılabileceği bir
      gözlemi karşılaştır.
    olcut:
      - Bernanke–Gertler yaklaşımında düşük net değerin vekâlet sorununu ve dış finansman primini artırdığını söyler.
      - Keen itirazında bankaların kredi yaratma ve bilanço genişletme kararının yalnızca borçlu talebine verilen pasif bir cevap olmadığını belirtir.
      - İlk yaklaşımın borçlu net değerini destekleyen, ikinci yaklaşımın banka kredi arzını ve özel borç stokunu doğrudan sınırlayan politikalara ağırlık vereceğini ayırır.
      - Kredi standartları, reddedilen başvurular ya da banka sermaye şokları gibi arzı borçlu bilançosundan ayırabilecek en az bir ampirik gözlem önerir.
  - id: kur-soku-bilanco-kanali
    tip: acik
    puan: 35
    soru: >-
      Döviz geliri olmayan fakat döviz borcu bulunan bir Türkiye firmasına
      liranın sert değer kaybı finansal hızlandıran üzerinden nasıl yayılır?
      Mekanizmayı kur etkisinden toplam talebe kadar zincir halinde açıkla ve
      zincirin otomatik olmadığını gösteren bir koşul ekle.
    olcut:
      - Kur artışının döviz borcunun lira karşılığını yükselterek firma net değerini düşürdüğünü belirtir.
      - Düşen net değeri daha zayıf teminat ve daha yüksek dış finansman primiyle ilişkilendirir.
      - Yüksek primin yatırım ve istihdamı, bunların da gelir ve toplam talebi azaltacağını açıklar.
      - Döviz geliri, kur koruması, uzun vade ya da güçlü banka sermayesi gibi mekanizmayı zayıflatacak en az bir koşul verir.
---

## Küçük şok neden küçük kalmaz?

Standart sürtünmesiz modelde firmanın yatırımı hangi kaynaktan finanse ettiği
ikincildir. İçeride tutulan kârla alınan bir makine ile bankadan borçlanarak
alınan aynı makine aynı üretimi yapar. Finansal hızlandıran bu eşdeğerliği
bozar. Borç veren, projenin kalitesini girişimci kadar iyi göremez; sözleşmeyi
izlemek, temerrüdü doğrulamak ve teminatı nakde çevirmek maliyetlidir. Bu nedenle
dış finansman, firmanın kendi kaynağından pahalıdır.

Asıl sonuç fiyat farkı değil, farkın döngüyle beraber hareket etmesidir. Firma
net değeri düştüğünde borç verenin kaybı üstlenebileceği tampon incelir. Vekâlet
sorunu ağırlaşır, istenen faiz ya da teminat artar. Yatırım düşer; varlık
fiyatları ve firma kârları geriler; net değer bir kez daha aşınır. Başlangıçtaki
şok kendi mali büyüklüğünden daha büyük bir reel daralma üretir. Hızlandıran
budur: yeni bir şok değil, mevcut şoku büyüten içsel geri besleme.

## Bilanço kanalının çekirdeği

Basitçe, dış finansman primini `s`, firmanın net değerini `N`, finanse edilen
varlıkları `A` ile gösterelim:

> s = s(A / N), s′ > 0

`A/N` yükseldikçe girişimcinin projede riske attığı kendi payı küçülür. Borç
veren daha yüksek bir prim ister. Net değeri artıran kâr veya varlık fiyatı
yükselişi primi düşürürken, borç yükünü sabit bırakıp teminat fiyatını düşüren
bir şok primi yükseltir. Yatırım da sermayenin beklenen getirisi ile bu pahalı
dış finansmanın maliyeti arasındaki farka tepki verir.

Parasal aktarım burada doğrusal değildir. Politika faizi yükseldiğinde yalnızca
iskonto oranı artmaz. Faize duyarlı varlık fiyatları düşebilir, faiz gideri
yükselebilir ve satışlar zayıflayabilir. Üçü de net değeri azaltır. Dolayısıyla
aynı 500 baz puanlık sıkılaşma, düşük kaldıraçlı firmada sınırlı; borcu yüksek,
teminatı oynak firmada sert bir yatırım kesintisi yaratabilir. “Faiz kaç puan
arttı?” sorusu bu yüzden tek başına yetersizdir; “hangi bilançoya çarptı?” diye
sormak gerekir.

## Model neyi dışarıda bırakıyor?

Bernanke–Gertler–Gilchrist çerçevesi finansı reel dalgalanmaya eklenmiş pasif
bir ayrıntı olmaktan çıkarır. Yine de eleştiri tam burada başlar. Tipik modelde
odak borçlunun net değeri ve sözleşme maliyetidir; bankanın kredi yaratma
kapasitesi çoğu kez ayrı bir çevrim motoru olarak modellenmez. Steve Keen'in
itirazı şudur: özel borcun ve banka bilançosunun büyümesi yalnızca daha iyi
teminatın sonucu değil, talebi bizzat finanse eden bir akımdır. Kredi büyümesi
durduğunda harcama, net değer henüz çökmeden de yavaşlayabilir.

Bu iki anlatı aynı veriye farklı nedensellik yükleyebilir. Kredi ve yatırım
birlikte düşüyorsa, firmalar zayıfladığı için mi bankalar kredi vermedi, yoksa
bankalar bilançolarını kıstığı için mi firmalar yatırım yapamadı? Toplam kredi
serisi cevap vermez. Bankaya özgü sermaye kayıpları, kredi başvurularının ret
oranı, sözleşme teminatı ve benzer firmaların farklı bankalara bağlı oluşu gibi
tanımlama araçları gerekir. Uzlaşma, bilançoların aktarımı büyüttüğündedir;
uzlaşmanın bittiği yer, ilk itkinin hangi bilançodan geldiğidir.

## Teminat fiyatı hem sonuç hem nedendir

Mekanizmanın en zor parçası teminat fiyatının dışarıdan verilmemesidir. Kredi
genişlediğinde daha çok alıcı aynı gayrimenkul veya makine stokuna yönelir;
fiyat yükselir, ölçülen kaldıraç düşer ve yeni kredi için alan açılır. Daralmada
zorunlu satış fiyatı aşağı iter; daha önce ihtiyatlı görünen borçlu da teminat
açığına düşer. Banka tek bir müşteriye ek teminat istemekle kendi riskini
azaltabilir, fakat bütün bankalar aynı anda bunu yaptığında güvence olarak
kullandıkları varlığın fiyatını birlikte çökertir.

Bu endojenlik ölçümü de bozar. Teminat değerindeki artışı firmanın gelecekteki
üretkenliğine dair iyi haber diye okursak, kredi artışı haklı görünür. Artışın
kendisinin ucuz krediyle finanse edildiğini düşünürsek aynı veri kırılganlık
sinyalidir. Nedenselliği ayırmak için yalnız bilanço stoklarına değil, kredi
sözleşmesindeki teminat iskonto oranına, ekspertiz değerinin işlem fiyatından
sapmasına ve kredi arzı şokuna da bakmak gerekir. Finansal hızlandıran bu yüzden
tek denklem değil, fiyat ile miktarın birlikte belirlendiği bir sistemdir.

## Türkiye'de kur, teminat ve nakit akışı

Türkiye'de bilanço kanalı döviz pozisyonuyla keskinleşir. Döviz geliri olmayan
bir firmanın dolar borcu, lira değer kaybettiğinde üretim kapasitesi değişmeden
lira cinsinden büyür. Net değer düşer, teminat oranı bozulur ve banka yeni
krediye daha yüksek fiyat ya da ek teminat koyar. Firma yatırımı ve işletme
sermayesini kısar. Tedarikçisinin nakit akışı da bozulduğunda şok ağ boyunca
yayılır.

Fakat “kur yükseldi, yatırım zorunlu olarak çöker” sonucu da fazla hızlıdır.
Döviz geliri olan ihracatçı doğal korumaya sahiptir; uzun vadeli borç çevirme
baskısını geciktirir; türev koruması açık pozisyonu kapatabilir. Bankanın güçlü
sermayesi geçici nakit akışı sorununu vade uzatarak emebilir. Bilanço etkisinin
büyüklüğü, brüt döviz borcundan çok açık pozisyona, vadeye ve alacaklı bankanın
dayanıklılığına bağlıdır.

## Bu dersten sonra

Bu ders tek bir firmanın net değeriyle başlayan büyütme mekanizmasını kurdu.
6.2'de bakışı sistemin zaman içindeki davranışına çevireceğiz: sakin dönemler
borçlanmayı ve risk iştahını artırarak neden sonraki krizin koşullarını üretir?
6.4'te ise aynı geri beslemeyi sermaye tamponları ve borçlu bazlı sınırlarla
yavaşlatmanın mümkün olup olmadığını tartışacağız. Geriye doğru bağlantı da
açıktır: 1.2'de bankanın krediyle mevduat yaratması, burada o kredinin neden
her bilanço durumunda aynı miktar ve aynı fiyatla yaratılmadığını gösterir.
