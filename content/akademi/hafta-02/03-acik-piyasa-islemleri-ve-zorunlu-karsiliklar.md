---
baslik: Açık piyasa işlemleri, repo ve zorunlu karşılıklar
ozet: >-
  Repo, kesin alım ve zorunlu karşılık aynı “likidite aracı” değildir; vade,
  teminat ve dağılım etkileri farklıdır. Bu ders TCMB'nin araç setini bilanço
  kayıtları üzerinden kurar ve araç çeşitliliğinin esneklik mi, politika
  duruşunu örten bir karmaşıklık mı olduğu tartışmasını açar.
sure: 55
onkosul:
  - hafta-01/merkez-bankasi-bilancosu
  - hafta-02/kit-rezerv-ve-bol-rezerv-rejimleri
kaynaklar:
  - tip: video
    baslik: >-
      Segment 406: Open Market Operations
    url: https://www.youtube.com/watch?v=jvRwFkDdWZU
    kaynak: Federal Reserve Bank of Philadelphia
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Menkul kıymet alım ve satımlarının rezerv arzını nasıl değiştirdiğini
      temel bilanço mantığıyla anlatır. TCMB'nin daha karmaşık araçlarına
      geçmeden önce açık piyasa işlemlerinin evrensel çekirdeğini kurar.
  - tip: article
    baslik: >-
      2.2 Para Politikasının Operasyonel Çerçevesi — TCMB 2023 Faaliyet Raporu
    url: https://www3.tcmb.gov.tr/yillikrapor/2023/m-2-2/
    kaynak: TCMB
    seviye: ileri
    ozet: >-
      TCMB'nin açık piyasa işlemleri, swaplar, zorunlu karşılıklar ve diğer
      tesislerden oluşan fiili 2023 araç setini birincil kaynaktan listeler.
      Ders kitabındaki sade şemanın Türkiye koşullarında neden çoğaldığını
      bilanço ve düzenleme boyutlarıyla okumayı sağlar.
  - tip: discussion
    baslik: Para Politikası Araçları El Kitabı
    url: https://www.mahfiegilmez.com/2020/09/para-politikas-araclar-el-kitab.html
    kaynak: Mahfi Eğilmez (Kendi Gündemim, Eylül 2020)
    seviye: orta
    ozet: >-
      Geleneksel ve gelenek dışı para politikası araçlarını pratisyen gözüyle
      aynı haritada toplar. Resmi belgenin “ne yapıldı” dilini, araçların neden
      seçildiği ve birbirinin yerine geçip geçemediği tartışmasıyla karşılaştırmak
      için okunur.
sorular:
  - id: repo-yedi-gun-maliyeti
    tip: sayisal
    puan: 25
    soru: >-
      Bir banka TCMB'den yıllık basit %45 faizle 7 gün vadeli 25 milyar TL repo
      fonlaması alıyor. 365 gün esasıyla vade sonunda ödeyeceği faiz kaç milyon
      TL'dir? Sonucu iki ondalıkla ver.
    beklenen: 215.75
    tolerans: 0.02
  - id: araclarin-bilanco-izi
    tip: acik
    puan: 35
    soru: >-
      TCMB'nin bir bankaya bir haftalık repo ile 10 milyar TL vermesi ile
      bankadan 10 milyar TL'lik devlet tahvilini kesin olarak satın alması
      başlangıç anında aynı miktarda rezerv yaratır. Buna rağmen iki işlem neden
      ekonomik olarak eşdeğer değildir?
    olcut:
      - Her iki işlemin de başlangıçta bankanın TCMB nezdindeki rezerv bakiyesini artırdığını belirtir.
      - Repo işleminde likiditenin vadeli ve geri döndürücü, kesin alımda ise ayrıca bir satış yapılmadıkça kalıcı olduğunu açıklar.
      - Repoda teminatın rolünü, kesin alımda menkul kıymetin merkez bankası portföyüne geçtiğini ayırır.
      - İki işlemin merkez bankasının faiz riski, vade riski veya bilanço bileşimi üzerindeki etkilerinden en az birini karşılaştırır.
      - Repo vadesi ve miktarının yenilenme beklentisi üzerinden politika sinyali taşıyabileceğini kabul eder.
  - id: tcmb-arac-coklugu
    tip: acik
    puan: 40
    soru: >-
      TCMB'nin APİ, swap, TL ve yabancı para zorunlu karşılıkları ile belirli
      mevduat türlerine bağlı ilave yükümlülükleri birlikte kullanması politika
      etkinliğini artırır mı, yoksa tek politika faizi sinyalini bozar mı? Araç
      hedef eşlemesi yaparak iki tarafı tartış.
    olcut:
      - APİ ve repo işlemlerini kısa vadeli TL rezerv miktarı ile gecelik faiz kontrolüne bağlar.
      - Zorunlu karşılıkları likidite talebi, fonlama maliyeti veya kredi bileşimi kanallarından en az biriyle ilişkilendirir.
      - Swapların TL likiditesi sağlarken merkez bankası bilançosunda döviz bağlantılı bir pozisyon oluşturduğunu belirtir.
      - Hedefli araçların belirli bilanço davranışlarını değiştirebildiğini, fakat göreli fiyatları ve aracılığı bozabileceğini tartışır.
      - Araç çokluğunun fiili politika duruşunu tek bir manşet faizden okumayı zorlaştırdığını açıklar.
---

## Aynı rezerv artışı, aynı politika değildir

Merkez bankası araçları çoğu anlatıda tek sepete atılır: “likidite verir” veya
“likidite çeker.” Bu ifade muhasebe anını yakalar, ekonomik sözleşmeyi kaçırır.
Bir haftalık repo, kesin tahvil alımı ve zorunlu karşılık oranı değişikliği
rezerv bakiyesini etkileyebilir; fakat vade, teminat, fiyat riski ve hangi
bankanın etkilendiği bakımından aynı işlem değildir.

Araç seçimini anlamanın en güvenli yolu sözlü etiketten değil, iki bilançodan
başlamaktır. Merkez bankasının varlığı ve yükümlülüğü ne oldu? Ticari bankanın
hangi varlığı serbest, hangisi bağlı, hangi borcu vadeli hâle geldi? Para
politikasının operasyonel içeriği bu sorulardadır.

## Repo: rezervin vadeli kiralanması

Repoda banka bir menkul kıymeti teminat göstererek merkez bankasından fon alır
ve vade sonunda işlemi tersine çevirmeyi taahhüt eder. Merkez bankası tarafında
repo alacağı varlık, yaratılan rezerv ise yükümlülüktür. Banka tarafında rezerv
varlığı ile merkez bankasına repo borcu birlikte büyür; teminat olarak verilen
menkul kıymetin serbest kullanımı kısıtlanır.

Bu yüzden repo “karşılıksız para” değildir. Fiyatı faiz, miktarı ihale, kredi
riski teminat ve iskonto oranıyla yönetilen vadeli bir sözleşmedir. Vade
geldiğinde yenilenmezse rezerv geri çekilir. Fakat sürekli yenilenen kısa vadeli
repo ekonomik olarak kalıcı fonlamaya yaklaşabilir. Hukuki vade ile piyasanın
yenileme beklentisi aynı şey değildir.

Ters repo bunun yönünü çevirir: merkez bankası piyasadan geçici olarak nakit
çeker ve karşılığında menkul kıymet verir. Kıt rezervli koridorda iki işlem
gecelik faizi hedefe taşımak için günlük ince ayarın çekirdeğidir.

## Kesin alım: miktarın yanında süre riski

Merkez bankası ikincil piyasadan devlet tahvilini kesin satın aldığında yine
rezerv yaratır; bu kez bilançosuna repo alacağı değil tahvil girer. İşlemin
kendiliğinden geri dönüş tarihi yoktur. Tahvil vadesi dolana, satılana veya başka
bir araçla sterilize edilene kadar rezerv sistemde kalır.

Fark yalnız kalıcılık değildir. Uzun vadeli tahvili özel sektörün elinden alan
merkez bankası süre ve faiz riskini kendi bilançosuna taşır. Özel sektörün
tutmak zorunda olduğu vade riski azalır; bu, 2.4'teki portföy dengesi kanalının
başlangıcıdır. Bir haftalık repo ise esas olarak kısa vadeli fonlama fiyatını
hedefler. Aynı ilk rezerv kaydı, farklı aktarım üretir.

## Zorunlu karşılık: arz değil talep aracıdır

Zorunlu karşılık, bankanın belirli yükümlülüklerine karşı merkez bankasında
tutması gereken bakiyeyi belirler. Oran yükseldiğinde merkez bankası doğrudan
tahvil satmadan da serbest rezervi azaltabilir; bankanın fonlama maliyeti ve
likidite tercihi değişir. Karşılığa faiz ödenip ödenmemesi bu maliyeti belirgin
biçimde değiştirir.

Eski para çarpanı anlatısı burada yanıltır. Zorunlu karşılık oranı yüzde 10 ise
mevduatın mekanik olarak on katına kadar “yaratılacağı” sonucu, bankaların önce
rezerv bulup sonra kredi verdiğini varsayar. Oysa kredi talebi, sermaye
yeterliliği, risk ve fonlama fiyatı belirleyicidir; ödeme sonrası gereken rezerv
merkez bankası operasyonları ve piyasa aracılığıyla bulunur. Zorunlu karşılık
krediyi etkileyebilir, ama sabit bir çarpanın düğmesi değildir.

## Sterilizasyon işlemin ilk etkisini nasıl ayırır?

Merkez bankası piyasadan döviz aldığında karşılığında TL rezerv yaratır. Amaç
kur veya rezerv biriktirmek olabilir; doğan TL likiditesi gecelik faizi hedefin
altına itebilir. Merkez bankası aynı miktarı ters repo, depo ihalesi veya menkul
kıymet satışıyla çekerse işlemi **sterilize etmiş** olur. Döviz varlığı
bilançoda kalırken ilk rezerv etkisi geri alınır.

Sterilizasyon, ilk işlemi ekonomik olarak yok etmez. Merkez bankası artık kur
riski taşıyan bir varlığa ve sterilizasyon aracına bağlı faiz giderine sahiptir.
Döviz alımının kur sinyali ile TL çekiminin faiz sinyali farklı yönlerde
çalışabilir. Üstelik sterilizasyon vadesi kısaysa sürekli yenileme gerekir;
yenilenmeyeceği beklentisi bugünkü fiyatları etkiler. Bu örnek araç-hedef
eşlemesinin neden bilanço bütününde okunması gerektiğini gösterir: net rezerv
miktarı aynı kalsa da merkez bankasının risk bileşimi ve gelecekteki işlem
taahhüdü değişmiştir.

## TCMB araç seti neden kalabalıklaştı?

TCMB'nin 2023 operasyonel çerçevesi yalnız APİ ve politika faizinden oluşmaz.
Döviz veya altın karşılığı swaplar TL likiditesi sağlar; TL ve yabancı para
zorunlu karşılıkları farklı bilanço kalemlerinin maliyetini değiştirir; belirli
mevduat türlerine bağlı ilave karşılıklar ve menkul kıymet tesisi, bankaların
portföy tercihlerini hedefler. Reeskont kredileri ise ihracat ve döviz kazanımı
bağlantısı taşır.

Bu çeşitlilik için güçlü bir gerekçe vardır: Türkiye'de dolarizasyon, kur riski
ve mevduat bileşimi tek kısa vadeli faizle yakalanamayabilir. Hedefli araç,
doğrudan sorunlu marja dokunur. Fakat her hedef yeni bir göreli fiyat yaratır.
Bankalar düzenlemenin istediği bilanço biçimine geçerken kredi tahsisi bozulabilir;
manşet politika faizi bankanın gerçek marjinal maliyetini anlatmaz hâle gelir.

Tartışma “çok araç iyi mi kötü mü?” kadar basit değildir. Doğru ölçüt, her
aracın açık bir hedefe atanması ve toplam duruşun hesaplanabilir olmasıdır. Aynı
araçla hem kur, hem kredi büyümesi, hem mevduat bileşimi, hem enflasyon
beklentisi yönetilmeye çalışılırsa sinyal kaybolur.

## Bu dersten sonra

Hafta 1'de merkez bankası bilançosunun muhasebesini kurduk; 2.1 ve 2.2'de bu
bilanço üzerinden gecelik faizin nasıl kontrol edildiğini gördük. 2.4'te kesin
alımları günlük likidite yönetiminden ayırıp QE/QT olarak inceleyeceğiz. 6.4'te
zorunlu karşılıkların ve hedefli düzenlemelerin para politikasından makro-ihtiyati
politikaya geçtiği sınır yeniden karşımıza çıkacak.
