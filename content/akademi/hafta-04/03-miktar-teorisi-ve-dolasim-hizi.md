---
baslik: Miktar teorisi, dolaşım hızı ve kayıp enflasyon
ozet: >-
  MV=PY her zaman doğru olan bir muhasebe özdeşliğidir; para miktarından
  enflasyon sonucu çıkarması ise dolaşım hızı ve reel üretim hakkında ek teori
  gerektirir. Bu ders 2008–2020 dönemindeki bilanço genişlemesini, çöken dolaşım
  hızı ve faiz getiren rezervler üzerinden okuyarak naif miktar teorisini sınar.
sure: 50
onkosul:
  - hafta-01/para-arzi-tanimlari-ve-icsellik
  - hafta-03/parasal-aktarim-kanallari
kaynaklar:
  - tip: video
    baslik: 'MV = PY Explained: A Guide to the Quantity Theory of Money'
    url: https://www.youtube.com/watch?v=FPxwWwj4ABw
    kaynak: Econbusters
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Değişim denkleminin dört unsurunu ayırır ve özdeşliğin teoriye dönüşmesi
      için hangi varsayımların gerektiğini gösterir. Dolaşım hızı sabit değilse
      para artışından fiyat artışına mekanik geçiş kurulamayacağını hazırlar.
  - tip: article
    baslik: The link between money and inflation since 2008
    url: https://publications.banque-france.fr/en/link-between-money-and-inflation-2008
    kaynak: Banque de France
    seviye: ileri
    ozet: >-
      2008 sonrasında para arzı büyürken enflasyonun neden sınırlı kaldığını M
      ile V'nin ayrışması üzerinden inceler. Rezerv birikimi, likidite tuzağı
      ve parasal genişlemenin harcamaya dönüşmemesi arasındaki bağı kurar.
  - tip: discussion
    baslik: Quantitative Easing yazıları
    url: https://www.johnhcochrane.com/news-op-eds-all/quantitative-easing
    kaynak: John H. Cochrane (blog)
    seviye: uzman
    ozet: >-
      Sıfır faiz çevresinde para ile kısa vadeli devlet borcunun yakın ikame
      olabileceğini savunur. QE'yi otomatik enflasyon ya da sınırsız reel teşvik
      sayan iki karşıt abartıyı bilanço bileşimi üzerinden sorgulatır.
sorular:
  - id: mvpy-tam-hesap
    tip: sayisal
    puan: 25
    soru: >-
      Bir yılda para stoku %30 artarken dolaşım hızı %20 düşüyor ve reel üretim
      %4 büyüyor. MV=PY özdeşliğini büyüme oranlarını toplamak yerine düzey
      oranlarıyla tam hesapla; fiyat düzeyi yüzde kaç değişir?
    beklenen: 0
    tolerans: 0.1
  - id: qe-enflasyon-bilmecesi
    tip: acik
    puan: 40
    soru: >-
      2008 sonrasında merkez bankası bilançosunun katlanması neden aynı oranda
      mal ve hizmet enflasyonu üretmedi? Parasal taban, geniş para, dolaşım hızı
      ve varlık takası ayrımlarını kullanarak mekanizmayı kur.
    olcut:
      - Merkez bankası rezervleri ile hane ve firmaların harcayabildiği mevduatı aynı para toplamı saymaması gerektiğini belirtir.
      - Bankaların fazla rezerv tutmasının kredi talebi ve borçlu kalitesi zayıfken otomatik kredi genişlemesi yaratmadığını açıklar.
      - Faiz getiren rezerv ile kısa vadeli devlet kâğıdının sıfır faize yakın ortamda benzer varlıklar olduğunu ve QE'nin özel sektör portföyünün bileşimini değiştirdiğini söyler.
      - Para talebi artışı ve dolaşım hızı düşüşünün M artışını nominal harcama bakımından dengeleyebileceğini gösterir.
      - Reel kapasite, beklentiler ve maliye politikasının fiyat sonucunu koşulladığını kabul eder.
  - id: miktar-teorisi-nedensellik
    tip: acik
    puan: 35
    soru: >-
      MV=PY doğruysa “para artışı enflasyona neden olur” önermesi de zorunlu
      olarak doğru mudur? Özdeşlik ile davranışsal teori arasındaki farkı ve
      ters nedensellik olasılığını açıkla.
    olcut:
      - MV=PY'nin tanımlar gereği tutan bir muhasebe özdeşliği olduğunu, tek başına nedensellik yönü vermediğini belirtir.
      - Enflasyon sonucu için V'nin davranışı ve Y'nin arz koşulları hakkında ek varsayımlar gerektiğini söyler.
      - Bankaların kredi ve mevduatı harcama talebine karşı içsel yaratmasının nominal gelirden paraya ters nedensellik doğurabileceğini açıklar.
      - Uzun dönemde kalıcı para büyümesi ile enflasyon ilişkisinin güçlü olabileceğini, bunun kısa dönem bire bir geçiş anlamına gelmediğini ayırır.
---

## Özdeşlik ne söyler, ne söylemez?

Değişim denklemi basittir:

> M × V = P × Y

`M` seçilen para stoku, `V` bu stokun nominal harcamaya dönüşme hızı, `P` fiyat
düzeyi ve `Y` reel üretimdir. Sağ taraf nominal gelirdir. Dolaşım hızı da çoğu
uygulamada `V = PY/M` diye hesaplanır. Bu nedenle denklem veri üzerinde yanlış
çıkamaz: V, eşitliği sağlayan oran olarak tanımlanmıştır.

Fakat buradan “M iki katına çıkarsa P iki katına çıkar” sonucu gelmez. Bu sonuç
için V'nin sabit, Y'nin para miktarından bağımsız ve M'nin dışsal olduğunu
varsaymak gerekir. Bunlar muhasebe değil, davranış iddialarıdır. Miktar teorisinin
tartışmalı kısmı eşitlik değil, bu kapanış varsayımlarıdır.

Logaritmik yaklaşık büyüme biçimi sezgiyi verir:

> π ≈ μ + ν − g

Burada `μ` para büyümesi, `ν` hızın büyümesi, `g` reel üretim büyümesidir. Ancak
yüksek oranlarda toplama yaklaşımı hata verir; düzey oranları çarpılmalıdır.
Örneğin M yüzde 30 artar, V yüzde 20 düşer ve Y yüzde 4 büyürse yeni fiyat
oranı `1,30 × 0,80 / 1,04 = 1` olur. Büyük para artışına rağmen fiyat düzeyi
değişmez; hızdaki düşüş ile reel büyüme artışı tam olarak emer.

## Hangi M?

“Merkez bankası para bastı” cümlesi çoğu zaman parasal tabanı anlatır: dolaşımdaki
nakit ile bankaların merkez bankası rezervleri. Hane ve firmaların işlemlerinde
kullandığı geniş para ise büyük ölçüde banka mevduatıdır. Banka kredi verdiğinde
mevduat yaratır; rezervi önce bulup sonra sabit bir çarpanla krediye dönüştürmez.
Bu nedenle tabanın katlanması geniş paranın aynı oranda katlanacağını garanti
etmez.

1.4'te para arzının içselliği bu mekanizmayı kurdu. Kredi talebi zayıfsa, borçlu
riski yüksekse veya banka sermayesi sınırlıysa rezerv bolluğu kredi yaratmaz.
Rezerv bankanın varlığıdır; halkın alışveriş hesabı değildir. Bu ayrım 2008
sonrasının “enflasyon nerede?” sorusunun ilk cevabıdır.

## 2008–2020: bilanço genişledi, hız çöktü

Küresel finansal krizden sonra merkez bankaları uzun vadeli tahvilleri satın
alıp karşılığında rezerv yarattı. Özel sektörün konsolide bilançosunda bir kamu
yükümlülüğü başka bir kamu yükümlülüğüyle değişti: uzun vadeli tahvil azaldı,
likit rezerv veya mevduat arttı. Bu işlem vade ve risk bileşimini değiştirerek
uzun faizleri düşürebilir; fakat her tahvil satıcısına “artık tüket” emri vermez.

Üstelik rezervlere faiz ödenmesi, rezervi faizsiz ve elde tutulması maliyetli
“sıcak patates” olmaktan çıkardı. Politika faizi sıfıra yakınken rezerv ile kısa
vadeli Hazine kâğıdı birbirine yakın ikame hâline geldi. John Cochrane'in itirazı
buradadır: iki benzer kamu varlığını takas etmek, naif para çarpanı kadar güçlü
bir nominal talep patlaması yaratmayabilir.

Kriz aynı anda güvenli ve likit varlık talebini yükseltti. Haneler tasarrufu,
firmalar nakit tamponlarını, bankalar likiditeyi artırdı. Böylece ölçülen para
stokuna karşı nominal harcama düştü; V geriledi. Düşük ücret artışı, atıl kapasite
ve çıpalanmış beklentiler de maliyet baskısını sınırladı. Parasal genişleme
etkisiz değildi: varlık fiyatları, risk primleri ve kredi koşulları üzerinden
çalıştı. Ama bu, tüketici fiyatlarına bire bir geçiş değildir.

### Dolaşım hızı açıklama değil, açıklanacak değişkendir

“V düştüğü için enflasyon gelmedi” eşitliği kapatır, fakat tek başına mekanizma
vermez. Hızın neden düştüğünü portföy tercihi, ödeme teknolojisi, gelir dağılımı,
faiz ve belirsizlik üzerinden açıklamak gerekir. Para tanımı değişince ölçülen
hız da değişir: dar para hızlı, tasarruf mevduatını içeren geniş para daha yavaş
dönebilir. Yeni ödeme araçları aynı harcama için gereken bakiyeyi azaltırken
kriz tampon talebini büyütür.

Bu endojenlik politika öngörüsünü güçleştirir. Geçmiş on yılın ortalama V'sini
sabit alıp bilanço büyümesiyle çarpmak, tam da politika değişiminin para talebini
değiştirdiği noktayı kaçırır. Faydalı tahmin V'yi artık olarak kullanmaz; onu
faiz farkları, risk ve finansal kurumlarla birlikte modeller.

## Bu dönem miktar teorisini çürüttü mü?

Hayır; özdeşlik zaten çürütülemez. Sabit hız ve mekanik çarpan yorumunu çürüttü.
Aynı şekilde 2020 sonrasındaki enflasyon da tek başına “yalnız M önemlidir”
tezini kanıtlamaz. Mali transferler doğrudan hane mevduatını ve harcanabilir
geliri artırdı; tedarik kısıtları Y'yi sınırladı; hız normalleşti. M, V ve Y aynı
anda farklı yönde hareket etti.

Nedensellik de iki yönlü olabilir. Bankalar nominal gelir ve kredi talebi
arttığında mevduat yaratır; merkez bankası ödeme sistemini istikrarlı tutmak
için gerekli rezervi sağlar. Bu durumda para artışı harcamayı izler. Başka bir
rejimde kalıcı açık finansmanı para artışını dışsal biçimde hızlandırır ve
harcamayı önden sürükler. Aynı özdeşlik iki hikâyeyle de uyumludur; ayrım için
kurumlar, zamanlama ve dışsal şok gerekir.

## Türkiye'ye iniş

Türkiye'de M2 büyümesini doğrudan TÜFE'ye eşitlemek; kur, kredi bileşimi, para
ikamesi ve reel üretimi atlar. Lira mevduat artarken döviz talebi ve fiyatlama
davranışı değişebilir; kredi üretim kapasitesi yerine ithalat ve varlığa
yönelebilir. Miktar verisi değerlidir, fakat hangi para toplamının hangi harcama
kanalına bağlandığı gösterilmeden tek başına teşhis değildir.

## Bu dersten sonra

4.3 para–enflasyon bağının rejime bağlı olduğunu gösterdi. 4.4'te bu bağın neden
hiperenflasyonda çok daha sıkı ve patlayıcı göründüğünü Cagan para talebiyle
kuracağız. 8.2'de mali baskınlık, para artışının hangi durumda bütçe rejiminin
sonucu olduğunu açıklayacak.
