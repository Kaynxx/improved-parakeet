---
baslik: Merkez bankası bilançosunu okumak
ozet: >-
  Merkez bankası bilançosunun yükümlülük tarafı borç değilmiş gibi okununca,
  emisyon, rezerv ve QE aynı “basılan para” torbasına atılır. Bu ders bilanço
  eşitliğini işlem bazında kurar; büyüklük ile kompozisyonun politika ve risk
  bakımından neden farklı şeyler söylediğini tartışır.
sure: 55
onkosul: [hafta-01/krediyi-banka-yaratir]
kaynaklar:
  - tip: video
    baslik: The Federal Reserve balance sheet explained
    url: https://www.youtube.com/watch?v=GcTGXsO2Ijg
    kaynak: Ted Erhart, CFP®
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Fed örneği üzerinden menkul kıymetlerin varlıkta, banknot ve rezervlerin
      yükümlülükte durduğunu sade bir bilanço diliyle gösterir. Videoyu QE
      işleminde hangi kalemlerin gerçekten değiştiğini görmeden “para basma”
      hükmü vermemek için izle.
  - tip: article
    baslik: Why central bank balance sheets matter
    url: https://www.bis.org/publ/bppdf/bispap66b.pdf
    kaynak: Jaime Caruana, BIS Papers No 66
    seviye: ileri
    ozet: >-
      Caruana bilanço büyüklüğünün yanında varlık türü, vade, karşı taraf ve
      risk dağılımını bağımsız politika boyutları olarak ele alır. Kriz sonrası
      genişlemenin otomatik enflasyon değil, farklı aktarım kanalları ve mali
      riskler ürettiğini değerlendirmek için ana çerçeveyi verir.
  - tip: discussion
    baslik: Why Quantitative Easing Isn't Printing Money
    url: https://www.cnbc.com/2013/05/23/why-quantitative-easing-isnt-printing-money.html
    kaynak: CNBC
    seviye: orta
    ozet: >-
      QE'yi rezerv karşılığı tahvil alımı, yani özel sektörün varlık bileşimini
      değiştiren bir takas olarak okur. Metin, “QE para basmak değildir”
      cümlesinin muhasebe açısından güçlü fakat beklenti, fiyat ve kredi
      kanalları hesaba katılmadığında fazla geniş bir savunma olduğunu tartıştırır.
sorular:
  - id: taban-para-sonrasi
    tip: sayisal
    puan: 30
    soru: >-
      Bir merkez bankasının dolaşımdaki banknot yükümlülüğü 600 milyar, banka
      rezervi yükümlülüğü 150 milyar liradır. Bankalardan 80 milyar liralık
      tahvil alıp bedelini yeni rezervle ödüyor; banknot talebi değişmiyor.
      İşlem sonrası parasal taban kaç milyar liradır?
    beklenen: 830
    tolerans: 0
  - id: yukumluluk-okumasi
    tip: acik
    puan: 35
    soru: >-
      Merkez bankası bilançosunda banknot ve rezervler neden yükümlülükte yer
      alır? “Merkez bankası kendi parasını borçlu olamaz” itirazını, bu iki
      kalemin kullanıcıları ve işlevleri üzerinden yanıtla.
    olcut:
      - Bilanço eşitliğini varlıklar = yükümlülükler + özkaynak biçiminde kurar.
      - Banknotun merkez bankası dışındaki hane ve firmaların taşıdığı merkez bankası yükümlülüğü olduğunu belirtir.
      - Rezervin ticari bankanın merkez bankasındaki alacağı olduğunu ve bankalar arası nihai mutabakatta kullanıldığını açıklar.
      - Günümüzde yükümlülüğün sabit kurdan altına çevrilebilirlik sözü olmak zorunda olmadığını; kabul, vergi, hukuk ve ödeme sistemiyle desteklenebileceğini belirtir.
      - Banknot ile rezervin ikisinin de taban para olduğu hâlde erişim, biçim ve kullanıcı bakımından aynı olmadığını ayırır.
  - id: qe-para-basma-mi
    tip: acik
    puan: 35
    soru: >-
      Merkez bankası ikincil piyasadan uzun vadeli devlet tahvili alıp rezerv
      yaratıyor. “Bu yalnız varlık takasıdır” ve “bu doğrudan para basmaktır”
      iddialarının her birinde doğru ve eksik olan tarafı bilanço, portföy ve
      beklenti kanallarıyla değerlendir.
    olcut:
      - Merkez bankasında tahvil varlığının ve rezerv yükümlülüğünün eşit arttığını çift kayıtla gösterir.
      - Bankadan alımda geniş halkın mevduatının işlem anında zorunlu olarak artmadığını, rezervin bankacılık sistemi içinde kaldığını belirtir.
      - Özel sektörün uzun vadeli tahvil yerine kısa vadeli ve likit rezerv tutmasının vade ve faiz riski bileşimini değiştirdiğini açıklar.
      - Portföy dengesi, getiri eğrisi, teminat, banka davranışı veya beklenti kanalından en az ikisini açıklar.
      - Muhasebe özdeşliğinin enflasyon sonucunu tek başına belirlemediğini; rejim, atıl kapasite, maliye politikası ve beklentilerin sonucu değiştirebileceğini belirtir.
---

## Bilançoda sağ taraf neden önemlidir?

Merkez bankası konuşulurken göz genellikle varlık tarafına gider: döviz, altın,
devlet tahvili, bankalara açılan kredi. Oysa para dediğimiz kalemler büyük
ölçüde sağ taraftadır. Dolaşımdaki banknot, onu tutan kişi için varlık; ihraç
eden merkez bankası için yükümlülüktür. Ticari bankanın merkez bankasındaki
rezerv bakiyesi de aynı çift karakteri taşır.

Temel eşitlik değişmez:

> Varlıklar = Yükümlülükler + Özkaynak

Bu eşitlik yalnız muhasebe disiplini değildir; her politika işleminin hangi
karşı kayıtla yapıldığını zorlar. “Merkez bankası 80 milyar para bastı” cümlesi
tek başına eksiktir. Karşılığında 80 milyarlık tahvil mi aldı, bankaya teminatlı
kredi mi verdi, döviz mi satın aldı, Hazine'ye mi aktardı? Aynı yükümlülük artışı
farklı varlık, vade ve karşı tarafla bambaşka risk ve teşvik üretir.

## Emisyon ile rezerv aynı para değildir

Banknot ve rezerv birlikte **parasal tabanı** oluşturur:

> B = C + R

Burada `C` dolaşımdaki para, `R` banka rezervidir. İkisi merkez bankası
yükümlülüğüdür, fakat kullanıcıları farklıdır. Banknotu banka dışı kesim de
tutabilir ve perakende ödemede kullanabilir. Rezerv hesabına yalnız yetkili
kurumlar erişir; temel işi bankalar arası ödemeyi nihai olarak kapatmaktır.
Bir haneye “rezerv yağması” olmaz. Rezerv, bankanın müşteriye kredi vermesiyle
de müşterinin hesabına düşmez.

Bu ayrım, emisyon artışı ile rezerv artışını aynı davranışsal etkiye sahip
saymayı engeller. Halk daha çok nakit istediğinde bankasından banknot çeker:
bankanın rezervi azalır, dolaşımdaki para artar. Toplam taban para değişmeden
bileşim değişebilir. Merkez bankası tahvil aldığında ise rezerv artar; banknot
talebi değişmediyse emisyon aynı kalır. Başlangıçta `C = 600`, `R = 150` milyar
lira ve tahvil alımı 80 milyarsa yeni taban `600 + 230 = 830` milyardır.

“Yükümlülükse kime ne vaat ediyor?” itirazı altın standardının dilini bugüne
taşır. Dönüştürülemez itibari parada merkez bankası banknotu sabit miktar altına
çevirme sözü vermez. Yükümlülük niteliği yine gerçektir: kendi hesaplarında
kabul edilir, bankaların mutabakatını kapatır, devletin hesap birimiyle aynı
birimdedir ve düzenlenmiş ödeme hiyerarşisinin nihai aracıdır. Borcun anlamı
her zaman başka bir emtiaya dönüştürülebilirlik değildir.

## QE: işlem basit, sonuç tartışmalıdır

Merkez bankası bir bankadan 100 liralık uzun vadeli tahvil aldığında kayıt
şöyledir:

> Merkez bankası varlığı: Tahvil +100  
> Merkez bankası yükümlülüğü: Rezerv +100

Bankanın bilançosunda tahvil azalır, rezerv artar. Toplam varlığı işlem anında
aynıdır; uzun vadeli, faiz riski taşıyan bir varlığın yerine gecelik ve likit
bir merkez bankası alacağı gelmiştir. Bu nedenle “varlık takası” ifadesi
muhasebe açısından doğrudur.

Fakat “yalnız” kelimesi sonucu küçültür. Özel sektörün elindeki vade riski
azalmıştır; uzun tahvil kıtlaşınca fiyatı yükselebilir, getirisi düşebilir.
Teminat kapasitesi, portföy tercihi, kredi fiyatlaması ve kur etkilenebilir.
Merkez bankasının gelecekte faizleri düşük tutacağına ilişkin sinyal beklentiyi
değiştirebilir. Varlık takası nötr olmak zorunda değildir.

Ters iddia, “rezerv arttıysa aynı miktarda harcanabilir halk parası basıldı ve
enflasyon gelecektir”, iki adımı atlar. Rezerv bankanın varlığıdır; hane
mevduatı değildir. Bankanın kredi vermesi rezerv fazlasının mekanik sonucu
değildir; 1.2'de gördüğümüz gibi kredi, sermaye, risk, talep ve kârlılık
kararıdır. Enflasyon etkisi toplam talep, kapasite, mali duruş, kur ve beklenti
kanallarına bağlıdır. QE'nin etkisiz olduğu sonucu da buradan çıkmaz; yalnız
mekanik bire bir eşleme reddedilir.

## Büyüklük mü, kompozisyon mu?

Caruana'nın çerçevesi bilanço toplamına bakıp hüküm vermeyi reddeder. Aynı
büyüklükte iki bilanço farklı vade, kredi ve kur riski taşıyabilir. Kısa vadeli
teminatlı banka kredisi ile uzun vadeli devlet tahvili alımı; yerli para varlığı
ile döviz varlığı; geniş karşı taraf kümesi ile tek sektöre yoğunlaşma aynı
politika değildir. Bilanço kompozisyonu, hangi piyasanın fiyatına ve hangi
kesimin fonlama koşuluna müdahale edildiğini söyler.

Kompozisyon gelir dağılımını ve merkez bankasının kendi mali sonucunu da
değiştirir. Uzun vadeli sabit getirili tahvillerin karşısında faiz ödenen
gecelik rezerv varsa politika faizi yükseldiğinde yükümlülük maliyeti hızla
artar, varlık geliri aynı hızda artmaz. Muhasebe zararı merkez bankasını ticari
banka gibi ödeme aczine düşürmez; kendi para biriminde yükümlülük çıkarabilir.
Yine de Hazine'ye aktarılacak kârı azaltabilir ve politik baskı yaratabilir.
“Sermayesi önemsizdir” ile “negatif özkaynak hemen iflastır” uçlarının ikisi de
kurumsal güven ve mali destek ilişkisini görmez.

TCMB bilançosunu okurken de “rezervler arttı” cümlesi yetmez. Brüt döviz
varlığının hangi yükümlülükle finanse edildiği — bankaların döviz depo ve
zorunlu karşılıkları, swap benzeri işlemler veya özkaynak — likidite tamponunun
niteliğini değiştirir. Varlığı tek başına okuyup karşı yükümlülüğü görmemek,
ödünç alınmış dövizi serbestçe kullanılabilir öz kaynak sanabilir. Aynı biçimde
emisyon artışını, nominal harcama ve fiyat düzeyiyle aradaki kanalları kurmadan
enflasyonun bire bir nedeni ilan etmek bilanço okuması değildir.

## Bu dersten sonra

Artık para hiyerarşisinin iki temel yükümlülüğünü ayırabiliyoruz: banka mevduatı
ticari bankanın, rezerv ve banknot merkez bankasının borcudur. 1.4'te M0, M1,
M2 ve M3'ün bu katmanlardan hangilerini topladığını ve toplamların neden politika
aracı değil çoğu kez ekonomik kararların sonucu olduğunu tartışacağız. 1.5'te
rezerv bakiyesini statik bilanço kalemi olmaktan çıkarıp ödeme sistemi içinde
hareket ettireceğiz; nihai mutabakatın gerçek anlamı orada görünür olacak.
