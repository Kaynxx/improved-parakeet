---
baslik: Hiperenflasyon anatomisi, Cagan modeli ve mali baskınlık
ozet: >-
  Hiperenflasyon yalnız “çok para basılması” değil, para talebinin beklentilerle
  çöküp bütçe finansmanını daha da zorlaştırdığı bir rejimdir. Bu ders Cagan
  modelinin geri besleme mekanizmasını kurar ve istikrarın parasal sıkılaştırmadan
  mı, mali rejim değişiminden mi geldiği tartışmasını tarihsel vakalara taşır.
sure: 55
onkosul:
  - hafta-01/para-arzi-tanimlari-ve-icsellik
  - hafta-03/negatif-reel-faiz-ve-finansal-baski
kaynaklar:
  - tip: video
    baslik: How Hyperinflation Destroys Nations || Zimbabwe, Weimar, Venezuela
    url: https://www.youtube.com/watch?v=S4Spfrrx0s4
    kaynak: Financial Codex
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Weimar Almanyası, Zimbabve ve Venezuela'da açık finansmanı ile toplumsal
      çözülmenin kronolojisini karşılaştırır. Cagan modelindeki ortak geri
      beslemeyi somut vakalarda tanımak için tarihsel zemin sağlar.
  - tip: article
    baslik: The Ends of Four Big Inflations
    url: https://www.nber.org/chapters/c11452
    kaynak: 'Thomas J. Sargent, NBER (*Inflation: Causes and Effects* içinde, ed. Robert E. Hall, 1982)'
    seviye: uzman
    ozet: >-
      Dört Avrupa hiperenflasyonunun ani bitişini mali rejim ve inandırıcı
      kurumsal taahhüt değişikliğiyle açıklar. Kademeli para daraltmasının değil,
      açığın parasallaşmayacağı beklentisinin belirleyiciliğini sınar.
  - tip: discussion
    baslik: What Caused Hyperinflation In Weimar, Zimbabwe And Venezuela?
    url: https://www.reddit.com/r/mmt_economics/comments/m2e4gq/what_caused_hyperinflation_in_weimar_zimbabwe_and/
    kaynak: Reddit r/mmt_economics
    seviye: ileri
    ozet: >-
      Üç vakayı üretim kapasitesi çöküşü, arz şoku ve döviz yükümlülükleri
      üzerinden yeniden okuyan MMT itirazlarını bir araya getirir. Salt para
      arzı anlatısının hangi tarihsel ayrıntıları dışarıda bıraktığını gösterir.
sorular:
  - id: cagan-para-talebi
    tip: sayisal
    puan: 25
    soru: >-
      Cagan reel para talebi M/P = A·exp(−απᵉ) olsun. α=1,5 iken beklenen aylık
      enflasyon 0,40'tan 0,80'e çıkarsa reel para talebi yüzde kaç azalır?
      A'nın değişmediğini varsay ve sonucu iki ondalıkla ver.
    beklenen: 45.12
    tolerans: 0.2
  - id: hiperenflasyon-nedeni
    tip: acik
    puan: 40
    soru: >-
      “Hiperenflasyon para basıldığı için olur” cümlesi neden hem doğru bir
      mekanizmaya işaret eder hem de eksik bir nedensellik anlatısı kurar?
      Cagan geri beslemesi, bütçe kısıtı ve arz kapasitesini birlikte kullan.
    olcut:
      - Açığın para yaratımıyla finansmanının nominal para büyümesini ve fiyat baskısını başlattığını açıklar.
      - Beklenen enflasyon yükseldikçe reel para talebinin düştüğünü, aynı reel geliri toplamak için daha hızlı para basılması gerektiğini Cagan mekanizmasıyla gösterir.
      - Vergi tabanı, borçlanma erişimi ve merkez bankası finansmanı arasındaki bütçe kısıtını nedensellik zincirine ekler.
      - Savaş, üretim çöküşü, ithalat kapasitesi veya döviz borcunun Y ve kur üzerinden fiyatları büyütebileceğini belirtir.
      - Para basımını yakın neden, onu zorlayan mali ve reel rejimi daha derin neden olarak ayırır.
  - id: sargent-rejim-degisimi
    tip: acik
    puan: 35
    soru: >-
      Sargent'ın dört büyük enflasyon okumasına göre hiperenflasyonu bitirmek
      için para büyümesini yavaşlatma ilanı neden yetmez? İnandırıcı bir istikrar
      paketinin mali ve kurumsal bileşenlerini tartış.
    olcut:
      - Gelecekteki açıkların yeniden parasallaştırılacağı beklentisi sürerse geçici para sıkılaştırmasının güven yaratmayacağını belirtir.
      - Harcama veya gelir reformuyla birincil açığın kalıcı biçimde kapatılmasını gerekli bileşen olarak sayar.
      - Merkez bankasının Hazine finansmanına sınır koyan uygulanabilir bir kurumsal taahhüt gerektiğini açıklar.
      - Vergi tahsilatı, borçlanma kapasitesi veya dış finansman gibi para basımı dışı finansman kaynağının gösterilmesini ister.
      - Arz kapasitesini onarmayan salt nominal programın toplumsal ve siyasi sürdürülebilirlik sorunu taşıyacağını kabul eder.
---

## Yüksek enflasyon ne zaman hiper olur?

Hiperenflasyon için sık kullanılan Cagan eşiği aylık yüzde 50'dir. Bu eşik
iktisadi bir doğa sabiti değil, vakaları sınıflandırma kuralıdır. Asıl rejim
değişimi takvimde değil davranışta görülür: ücretler ve fiyatlar giderek daha
kısa aralıklarla ayarlanır, yerli para elde tutulmaz, vergi tahsil edildiği anda
reel değer kaybeder ve hesap birimi işlevi dövize ya da mala geçer.

Normal yüksek enflasyonda insanlar bir miktar yerli para bakiyesi taşımaya devam
eder. Hiperenflasyonda paradan kaçış, enflasyonun sonucu olmaktan çıkıp nedeni
de olur. Devlet aynı reel harcamayı finanse etmek için daha çok nominal para
yaratır; fakat halk bu parayı daha hızlı elden çıkardıkça fiyatlar para stokundan
da hızlı koşabilir.

## Cagan modeli: beklenti para talebini eritir

Cagan'ın temel katkısı para talebini beklenen enflasyona bağlamaktır:

> M_t / P_t = A · exp(−απᵉ_t)

`M/P` reel para bakiyesi, `πᵉ` beklenen enflasyon ve `α` yarı esnekliktir.
Beklenen enflasyon yükseldiğinde yerli para tutmanın fırsat maliyeti artar;
hane maaşını alınca dövize, dayanıklı mala veya stoka geçer. Reel para talebi
üstel biçimde küçülür. Aynı nominal para stoku daha yüksek fiyat düzeyiyle
uyumlu hâle gelir.

Modelin patlayıcı yanı beklenti geri beslemesidir. Hükümet açığı kapatmak için
para yaratır. İnsanlar gelecekte daha hızlı yaratım bekler, para talebini
düşürür. Fiyatlar daha hızlı artar; devletin vergi gelirleri tahsilat gecikmesi
yüzünden reel olarak erir. Açık büyür ve daha fazla para finansmanı gerekir.
Sonuç tek yönlü “M arttı, P arttı” zinciri değil, mali açık–beklenti–para talebi
arasında dönen bir sarmaldır.

Vergi tahsilatındaki gecikme bu sarmalı ayrıca besler. Fiyatlar beyan dönemi ile
ödeme günü arasında katlanıyorsa nominal olarak hesaplanan verginin reel değeri
tahsil edilmeden erir; bu Olivera–Tanzi etkisidir. Hükümet oranları yükseltse bile
reel gelir düşebilir. Daha kısa tahsilat süresi ve endeksleme geçici koruma
sağlar, fakat idari kapasite çökmüşse yetmez. Böylece enflasyon yalnız harcamayı
finanse eden araç değil, normal vergi sistemini bozan ve parasal finansman
ihtiyacını yeniden üreten neden hâline gelir.

## Mali baskınlık: merkez bankasının aritmetik sınırı

Merkez bankası politika faizini yükseltebilir veya para tabanını geçici olarak
kısabilir. Fakat Hazine'nin kalıcı açığı, vadesi gelen borcu ve piyasanın satın
almadığı yükümlülükleri varsa birinin bütçe kısıtını kapatması gerekir. Vergi,
harcama kesintisi, borç yeniden yapılandırması veya dış finansman yoksa son alıcı
merkez bankasıdır. Para politikası fiyat istikrarını değil mali ödeme kabiliyetini
sağlamak zorunda kalır; buna mali baskınlık denir.

Bu çerçeve merkez bankasının her durumda etkisiz olduğunu söylemez. Faiz artışı
beklentiyi kısa süreli düzeltebilir. Fakat yüksek faiz kamu borcu servis yükünü
büyütüp gelecekteki parasallaştırma ihtiyacını artırıyorsa sonuç tersine dönebilir.
Konsolide kamu bütçesi hesaba katılmadan yalnız merkez bankası bilançosuna bakmak
rejimin yarısını görür.

## “Para mı, arz çöküşü mü?” yanlış ikiliği

Weimar, Zimbabve ve Venezuela yalnız matbaa hikâyesi değildir. Savaş tazminatı,
tarımsal ve sanayi üretimindeki çöküş, ihracat gelirinin kaybı, döviz cinsi
yükümlülük ve siyasi parçalanma vergi kapasitesini daralttı. Reel mal arzı
düşerken kamu harcaması sürdü; kur şoku ithal maliyeti büyüttü. Bunları atmak,
para yaratımının neden başladığını açıklamamaktır.

Öte yandan arz çöküşünü söyleyip parasal finansmanı önemsiz saymak da eksiktir.
Bir defalık üretim kaybı fiyat düzeyini sıçratabilir; sürekli hızlanan enflasyon
için nominal talebin ve beklentilerin tekrar tekrar uyum sağlaması gerekir.
MMT tartışmasının güçlü yanı tarihsel bağlamı geri getirmesidir. Zayıf yanı,
yakın parasal mekanizmayı yalnız “sonuç” diye küçümseme riskidir. Daha iyi
teşhis iki katman kurar: reel ve siyasi şok mali açığı yaratır; parasal finansman
ile para talebi çöküşü onu hiperenflasyon rejimine dönüştürür.

## Hiperenflasyon neden bazen bir gecede biter?

Sargent'ın dört Avrupa vakasında vurguladığı şey, enflasyonun para büyümesi
yavaşça azaldığı için değil, gelecekteki bütçe rejimine ilişkin inanç değiştiği
için hızla durabilmesidir. Yeni vergi düzeni, harcama sınırı, merkez bankası
finansman yasağı ve uygulanabilir borçlanma kaynağı birlikte geldiğinde insanlar
yarın yeniden matbaaya dönülmeyeceğine inanabilir. Para talebi toparlanır; aynı
nominal stok artık daha düşük dolaşım hızıyla tutulur.

“İnandırıcılık” burada konuşma becerisi değildir. Bütçe aritmetiğini değiştiren
kurum ve kaynak demektir. Program üretim kapasitesini onarmıyor, vergi toplama
yeteneğini kurmuyor veya siyasi olarak sürdürülemiyorsa ilan edilen çıpa kırılır.
Başarılı istikrarın bedelsiz olması da gerekmez: fiyatlar durulurken bankacılık,
borç sözleşmeleri ve gelir dağılımı ağır hasar taşımaya devam edebilir.

## Türkiye açısından sınır nerede?

Türkiye'nin yüksek enflasyon deneyimlerini hiperenflasyonla eşitlemek analitik
olarak yanlıştır; aylık dinamik, para ikamesinin derecesi ve mali kapasite farklıdır.
Yine de ders geçerlidir. Kur koruması, kamu bankaları, yönetilen fiyatlar ve
merkez bankası transferleri birlikte değerlendirilmeden rejim okunamaz. Soru
yalnız para tabanının ne kadar büyüdüğü değil, konsolide kamu açığının hangi
gelecek kaynakla kapatılacağıdır.

## Bu dersten sonra

4.4'teki Cagan para talebi, 4.5'te senyoraj Laffer eğrisinin aşağı dönen kısmını
açıklayacak: oran yükselirken vergi tabanı olan reel para bakiyesi çöker. 8.2'de
mali baskınlığı FTPL ile daha genel bir fiyat düzeyi belirleme rejimine
yerleştireceğiz; 8.3'te Türkiye'nin 2001 sonrası kurumsal dönüşümüne döneceğiz.
