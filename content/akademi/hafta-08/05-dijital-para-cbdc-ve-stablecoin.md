---
baslik: >-
  Dijital para: CBDC, stablecoin ve banka aracılığının geleceği
ozet: >-
  Dijital para yeni bir ödeme arayüzünden önce yeni bir yükümlülük mimarisidir.
  Bu ders CBDC ile stablecoin'i ihraççı, rezerv ve itfa riski üzerinden ayırır;
  daha güvenli paranın ödeme verimliliği sağlarken bankaları fonlamadan mahrum
  bırakıp bırakmayacağını tartışır.
sure: 55
onkosul:
  - hafta-01/odeme-sistemleri-ve-rezerv-dolasimi
  - hafta-08/dolarizasyon-histerezisi
kaynaklar:
  - tip: video
    baslik: "Dijital TL nedir? Türkiye'de nakit para gerçekten bitecek mi"
    url: "https://www.youtube.com/watch?v=DXhRAF-ckXw"
    kaynak: "Nöbetçi Gazete"
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Dijital Türk Lirası'nı kripto varlıktan ayırır ve nakdin yerine geçmekten
      çok mevcut ödeme araçlarını tamamlayan yönünü açıklar. Teknik tasarım
      seçeneklerine geçmeden önce Türkiye'deki temel kavram karmaşasını temizler.
  - tip: article
    baslik: "Dijital Türk Lirası İkinci Faz İlerleme Raporu"
    url: "https://tcmb.gov.tr/wps/wcm/connect/e90f13d5-2d7d-423d-91c9-038207fd6021/Dijital+T%C3%BCrk+Liras%C4%B1+%C4%B0kinci+Faz+%C4%B0lerleme+Raporu.pdf?MOD=AJPERES"
    kaynak: "TCMB (24 Kasım 2025)"
    seviye: uzman
    ozet: >-
      Programlanabilir ve çevrimdışı ödemeler ile ekosistem testlerinin hangi
      aşamada olduğunu resmi kaynaktan gösterir. CBDC'nin soyut bir kavram
      değil, banka ve ödeme kuruluşlarıyla tasarlanan bir altyapı tercihi
      olduğunu değerlendirmek için okunur.
  - tip: discussion
    baslik: "Stablecoin Savaşları"
    url: "https://fintechtime.com/2026/03/stablecoin-savaslari/"
    kaynak: "Fintechtime (Mart 2026)"
    seviye: orta
    ozet: >-
      Stablecoin rekabetini dijital doların kontrolü ve Türkiye'deki kripto
      dolarizasyonu üzerinden tartışır. Resmî CBDC tasarımının yalnız yerli
      ödeme verimliliğiyle değil, sınır ötesi özel para rekabetiyle de
      değerlendirilmesini sağlar.
sorular:
  - id: cbdc-fonlama-cikisi
    tip: sayisal
    puan: 25
    soru: >-
      30 milyon yetişkinin her biri faizsiz perakende CBDC cüzdanında ortalama
      4.000 TL tutarsa ve bu bakiyenin tamamı banka mevduatından gelirse,
      bankacılık sisteminden kaç milyar TL mevduat çıkar? Sonucu milyar TL
      cinsinden ver.
    beklenen: 120
    tolerans: 0.1
  - id: guvenli-para-ikilemi
    tip: acik
    puan: 40
    soru: >-
      Hanehalkına doğrudan merkez bankası parası sunmanın ödeme sistemini daha
      güvenli kılarken bankacılığı neden kırılganlaştırabileceğini açıkla.
      Normal zaman, banka hücumu ve merkez bankasının karşı önlemlerini aynı
      bilanço anlatısında birleştir.
    olcut:
      - CBDC'nin merkez bankası yükümlülüğü, ticari banka mevduatının ise banka yükümlülüğü olduğunu ayırır.
      - Mevduattan CBDC'ye geçişin bankaların ucuz ve istikrarlı fonlamasını azaltabileceğini belirtir.
      - Stres anında dijital dönüşümün hızlı ve sürekli erişilebilir olması nedeniyle banka hücumunu hızlandırabileceğini açıklar.
      - Tutma limiti, kademeli faiz, aracılı dağıtım veya dönüşüm sınırı araçlarından en az ikisini değerlendirir.
      - Merkez bankasının kaybolan mevduatı yeniden finansmanla ikame etmesinin kredi tahsisini merkezileştirebileceğini söyler.
  - id: uc-para-rekabeti
    tip: acik
    puan: 35
    soru: >-
      Türkiye'de banka mevduatı, Dijital Türk Lirası ve dolar stablecoin'lerinin
      birlikte bulunduğu bir gelecekte para politikası aktarımı nasıl değişir?
      “CBDC stablecoin'i otomatik olarak tasfiye eder” iddiasını itfa, mahremiyet,
      sınır ötesi kullanım ve dolarizasyon histerezisi üzerinden eleştir.
    olcut:
      - Üç aracın ihraççısını ve taşıdığı kredi, merkez bankası veya rezerv varlık riskini ayrı ayrı belirtir.
      - Stablecoin'in sabit değer vaadinin rezerv kalitesi ve itfa kapasitesine bağlı olduğunu açıklar.
      - Yüksek enflasyon ve dolarizasyon histerezisinin yerli CBDC'ye rağmen dijital dolar talebini sürdürebileceğini söyler.
      - Mahremiyet, programlanabilirlik ve çevrimdışı kullanım tasarımının kullanıcı tercihini etkilediğini belirtir.
      - Stablecoin akımlarının banka mevduatı, sermaye hareketleri ve resmî döviz istatistiklerinin görünürlüğünü değiştirebileceğini açıklar.
---

## Dijital olan para değil, erişim biçimi

Banka mevduatı zaten dijitaldir. Maaş hesaba yatar, kartla harcanır ve mobil
uygulamada görünür. CBDC'yi yeni yapan ekranda sayı olması değil, bu sayının
kimin yükümlülüğü olduğudur. Mevduat ticari bankanın; nakit ve merkez bankası
rezervi merkez bankasının borcudur. Perakende CBDC, hanehalkına dijital biçimde
merkez bankası yükümlülüğü tutma imkânı verir.

Stablecoin ise özel ihraççının belirli bir para birimine karşı sabit değer
vaadidir. Bir token bir dolar değerinde kalıyorsa bu, kodun matematiksel
garantisi değildir. İhraççının rezerv varlıklarının kalitesine, saklamaya,
hukuki ayrıştırmaya ve talep geldiğinde itfaya bağlıdır. CBDC ile stablecoin'i
“ikisi de blokzincirde” diye aynı sınıfa koymak, devlet parasıyla para piyasası
fonu payını aynı saymaktır.

## Üç katmanlı para sistemi

Modern sistemde merkez bankası nihai takas varlığını, ticari bankalar krediyle
mevduatı, ödeme şirketleri ise kullanıcı arayüzünü sağlar. 1.2'de gördüğümüz
gibi banka kredisi yeni mevduat yaratır. 1.5'te bankalar arası ödeme rezervle
sonuçlanır. Bu katmanlaşma kredi değerlendirmesini dağıtırken nihai hesabı
kamusal bir paraya bağlar.

Perakende CBDC tasarımı bu sınırı hareket ettirir. Kullanıcı doğrudan merkez
bankası hesabı tutarsa merkez bankası kimlik, müşteri hizmeti ve işlem
verisini üstlenebilir. Aracılı modelde banka veya ödeme kuruluşu cüzdanı sunar,
fakat alttaki yükümlülük merkez bankasına aittir. Teknoloji tercihi kurumsal
tercihi gizlememelidir: kim hesap açar, kim veriyi görür, kim hatalı ödemeyi
geri alır ve kim yaptırım uygular?

## Daha güvenli para, daha kırılgan banka mı?

Hanehalkı mevduatı CBDC'ye çevirirse bankanın bilançosunda rezerv azalır,
mevduat yükümlülüğü kapanır; merkez bankasının CBDC yükümlülüğü artar. Otuz
milyon kişinin ortalama 4.000 TL taşıması 120 milyar TL fonlama çıkışıdır.
Banka bu kaybı tahvil, toptan fonlama veya merkez bankası kredisiyle ikame
eder. Bunlar genellikle daha pahalı ya da daha oynaktır; kredi faizi artabilir.

Normal zamanda yönetilebilir akış, stres anında farklıdır. Banka şubesinde
kuyruk yerine telefonda birkaç dokunuşla risksiz merkez bankası parasına kaçış
mümkünse 6.3'teki banka hücumu hızlanır. CBDC likidite riskini ortadan
kaldırmaz; güvenli varlığa geçişin sürtünmesini azaltır.

Merkez bankası tutma limiti koyabilir, belirli eşiğin üzerindeki bakiyeye daha
düşük faiz uygulayabilir, cüzdanları bankalar üzerinden dağıtabilir veya kriz
anında dönüşüm hızını sınırlayabilir. Her çözüm amaçla çatışır. Sert limit
CBDC'nin kullanımını azaltır; negatif kademeli faiz anlaşılmayı zorlaştırır;
dönüşüm sınırı “risksiz ve her an ödenebilir” vaadini zedeler. Merkez bankası
bankalara kayıp fonu geri verirse de kredi tahsisinde kamu bilançosunun rolü
büyür.

## Programlanabilirlik ve mahremiyet

Programlanabilir ödeme, belirli koşul gerçekleşince transferin otomatik
olmasıdır. Menkul kıymet teslimiyle ödemenin eşzamanlı yapılması veya çevrimdışı
küçük ödemenin sonra mutabakata girmesi verimlilik sağlayabilir. Fakat
**programlanabilir ödeme** ile **programlanabilir para** aynı değildir. İlki
kullanıcının talimatını uygular; ikincisi paranın nerede ve ne zaman
harcanabileceğini ihraççı düzeyinde kısıtlayabilir.

Bu ayrım mahremiyet tartışmasını belirler. Nakit çevrimdışı ve iz bırakmadan
devredilebilir. Tam izlenebilir CBDC suçla mücadeleyi kolaylaştırırken devletin
işlem verisi gücünü büyütür. Tam anonim tasarım ise kara para ve yaptırım
uygulamasını zorlaştırır. Çevrimdışı küçük limit, katmanlı kimlik ve veri
minimizasyonu teknik seçeneklerdir; ne kadar mahremiyet gerektiği teknik değil
siyasal bir karardır.

TCMB'nin ikinci faz çalışmaları bu yüzden yalnız altyapı deneyi olarak
okunmamalıdır. Programlanabilir ve çevrimdışı kullanım ile banka ve ödeme
kuruluşu katılımı, gelecekteki iş bölümünün prototipidir. Pilotun çalışması,
hangi yönetişim modelinin doğru olduğunu tek başına kanıtlamaz.

## Stablecoin: özel para ve kripto dolarizasyonu

Dolar stablecoin'i Türkiye'deki kullanıcıya banka döviz hesabı dışında,
sınır ötesi ve günün her saati devredilebilen bir dolar benzeri araç sunar.
8.4'teki dolarizasyon histerezisi burada dijital biçim kazanır. Yerli CBDC
kusursuz çalışsa bile lira cinsindendir; kullanıcı kuyruk riskine ve satın alma
gücüne karşı dolar istiyorsa ödeme kalitesi para birimi tercihini değiştirmez.

Stablecoin'in üstün görünen erişimi yeni risk taşır. Rezervde uzun vadeli ya
da riskli varlık varsa toplu itfa fiyatı bozabilir. İhraççı hesap dondurabilir,
saklama anahtarı kaybolabilir ve yabancı düzenleme erişimi kesebilir. Ayrıca
stablecoin'e kayan tasarruf banka mevduatını ve yerli kredi fonlamasını azaltır;
resmî döviz istatistikleri zincir üstündeki bütün pozisyonu göremeyebilir.
Sermaye hareketi denetimi ile ödeme gözetimi arasındaki sınır bulanıklaşır.

## Rekabet mi, iş bölümü mü?

Bir görüş CBDC'nin güvenli kamu parasını verimli arayüzle birleştirip özel
stablecoin'i gereksiz kılacağını savunur. Karşı görüş, devlet altyapısının
yenilik, mahremiyet ve sınır ötesi uyumlulukta özel ağlarla yarışamayacağını;
aşırı güçlü CBDC'nin de banka aracılığını zayıflatacağını söyler. İki görüş de
tasarımı veri olarak değil sonuç olarak ele aldığında hata yapar.

Olası denge üçlüdür: merkez bankası nihai güvenli varlığı ve standartları
sağlar; bankalar kredi üretir ve müşteri ilişkisini taşır; düzenlenmiş özel
tokenlar belirli kullanım alanlarında birlikte çalışabilirlik sunar. Bu denge
kendiliğinden oluşmaz. İtfa hakkı, rezerv şeffaflığı, birlikte çalışabilirlik,
veri erişimi ve batış rejimi açıkça tasarlanmalıdır.

## Programın kapanışı

Sekiz hafta önce “para nedir?” diye başladık. Dijital para aynı soruyu yeni
arayüz altında geri getiriyor: para bir nesne değil, kabul edilen bir
yükümlülük ve kurumlar arası hiyerarşidir. CBDC, stablecoin ve banka mevduatı
arasındaki yarışın sonucu en hızlı teknolojiyle değil; hangi sözün kriz anında
hangi bilanço tarafından tutulduğuyla belirlenecek.
