---
baslik: Enflasyon vergisi, senyoraj ve Laffer sınırı
ozet: >-
  Para yaratmak devlete reel kaynak aktarabilir, fakat senyoraj ile enflasyon
  vergisi aynı muhasebe kalemi değildir. Bu ders vergi tabanını reel para
  bakiyesi olarak kurar, Cagan para talebinden senyoraj Laffer eğrisini türetir
  ve bu görünmez verginin dağılım ile sürdürülebilirlik sınırlarını tartışır.
sure: 50
onkosul:
  - hafta-01/krediyi-banka-yaratir
  - hafta-03/negatif-reel-faiz-ve-finansal-baski
kaynaklar:
  - tip: video
    baslik: 'KPSS - Para Banka: Senyoraj Geliri, Enflasyon Vergisi, Para İkamesi, Para Aldanması'
    url: https://www.youtube.com/watch?v=-vt7wIVo3w0
    kaynak: İndeks Akademi (Emel Aksaç)
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Senyorajı, enflasyon vergisini ve para ikamesini aynı kavramsal çerçevede
      tanıtır. Vatandaşın yerli paradan kaçışıyla vergi tabanının nasıl
      daraldığını görüp Laffer eğrisine geçmek için sezgi sağlar.
  - tip: article
    baslik: 'Dynamic Seigniorage Theory: An Exploration'
    url: https://www.nber.org/papers/w2869
    kaynak: Maurice Obstfeld
    seviye: uzman
    ozet: >-
      Borç ve para finansmanını rasyonel beklentili çok dönemli bir modelde
      birlikte ele alır. Optimal enflasyon vergisinin yalnız bugünkü gelir değil,
      gelecekteki para talebi ve politika güvenilirliğiyle belirlendiğini gösterir.
  - tip: discussion
    baslik: How is inflation a tax?
    url: https://www.reddit.com/r/AskEconomics/comments/13gh571/how_is_inflation_a_tax/
    kaynak: Reddit r/AskEconomics
    seviye: orta
    ozet: >-
      Enflasyon vergisini nakit ve vadesiz para tutanlardan devlete reel kaynak
      aktarımı olarak gündelik dille açıklar. Yasal bir vergi oranı olmadan kimin
      kayba uğradığı sorusunu senyoraj muhasebesine bağlar.
sorular:
  - id: laffer-tepe-orani
    tip: sayisal
    puan: 25
    soru: >-
      Sürekli zamanlı Cagan para talebi h(π)=A·exp(−απ), senyoraj geliri
      S(π)=π·h(π) olsun. α=2,5 ise senyorajı azamileştiren yıllık enflasyon
      oranı yüzde kaçtır?
    beklenen: 40
    tolerans: 0.1
  - id: senyoraj-vergi-ayrimi
    tip: acik
    puan: 35
    soru: >-
      Senyoraj ile enflasyon vergisi neden yakın ama özdeş kavramlar değildir?
      Merkez bankası bilançosu, reel para bakiyesi ve beklenmeyen enflasyon
      üzerinden muhasebe farkını kur.
    olcut:
      - Senyorajı yeni çıkarılan parasal yükümlülüklerle elde edilen reel kaynak, yani yaklaşık ΔM/P olarak tanımlar.
      - Enflasyon vergisini mevcut nominal para bakiyesinin satın alma gücü kaybı, yani uygun zaman tanımıyla yaklaşık π·M/P olarak tanımlar.
      - Durağan durumda para büyümesi ile enflasyon yakınsa iki büyüklüğün yaklaşabileceğini, geçiş döneminde ayrışabileceğini belirtir.
      - Reel büyüme ve para talebi artarken sıfır enflasyonla da pozitif senyoraj elde edilebileceğini açıklar.
      - Beklenmeyen enflasyonun nominal kamu borcunu da aşındırabildiğini, bunun dar anlamda para tabanı vergisinden ayrı bir servet transferi olduğunu söyler.
  - id: gorunmez-vergi-dagilimi
    tip: acik
    puan: 40
    soru: >-
      Enflasyon vergisinin “kimseye zorla uygulanmadığı için gönüllü” olduğu
      iddiasını değerlendir. Para ikamesine erişim, gelir dağılımı ve senyorajın
      Laffer sınırı üzerinden hem etkinlik hem adalet boyutunu tartış.
    olcut:
      - Nakit ve vadesiz mevduat kullanma zorunluluğunun düşük gelirli ve finansal erişimi sınırlı hanelerde daha yüksek olabileceğini belirtir.
      - Döviz, altın, kısa vadeli faizli araç veya fiyat ayarlama imkânı olanların vergi tabanından daha kolay kaçtığını açıklar.
      - Kaçışın yerli reel para talebini düşürerek aynı geliri toplamak için daha yüksek enflasyon gerektirebileceğini söyler.
      - Laffer eğrisinin tepesinden sonra daha yüksek enflasyonun senyoraj gelirini azaltabileceğini mekanizmasıyla anlatır.
      - Tahsilatın kanunsuz olmadığını söylemekle demokratik onay, öngörülebilirlik ve dağılım bakımından adil olduğunu söylemenin farklı olduğunu kabul eder.
---

## Devlet para basınca ne kazanır?

Devlet, maliyeti düşük bir parasal yükümlülük çıkarıp karşılığında mal, hizmet
veya faiz getiren varlık aldığında reel kaynak elde eder. Bu gelir senyorajdır.
Basitleştirilmiş reel ölçüsü şöyledir:

> S_t = (M_t − M_{t−1}) / P_t

Buradaki `M` hangi parasal yükümlülüklerin konsolide kamuya ait sayıldığına göre
değişir. Dolaşımdaki banknot açık örnektir. Faiz ödenen rezervler ise ekonomik
olarak kısa vadeli kamu borcuna yaklaşır; brüt para yaratımını gelir sayıp rezerv
faizini yok saymak kazancı abartır. Merkez bankasının varlıklarından elde ettiği
faiz ve Hazine'ye aktardığı kâr da bilanço muhasebesinde ayrıştırılmalıdır.

Senyoraj “bedava kaynak” değildir. Parasal yükümlülüğü tutan kesim vazgeçtiği
faiz veya satın alma gücüyle maliyeti taşır. Maliyetin hangi kanaldan doğduğu,
enflasyon vergisiyle senyoraj arasındaki farkı açar.

## Enflasyon vergisi aynı şey değildir

Enflasyon vergisinin tabanı mevcut reel para bakiyesidir. Fiyat düzeyi yükselince
eldeki banknot ve faizsiz mevduatın satın alma gücü azalır. Sürekli zaman
yaklaşımında gelir şöyle yazılır:

> T_π = π · (M/P)

Vergi oranı `π`, vergi tabanı `M/P` gibidir. Oysa senyoraj akım para yaratımına,
`ΔM/P`ye bakar. Durağan durumda reel para talebi sabit, para büyümesi enflasyona
eşitse ikisi birbirine yaklaşır. Geçişte ayrışırlar. Reel ekonomi büyüyüp işlem
amaçlı para talebi artıyorsa fiyatlar sabitken bile devlet ek para çıkarıp
senyoraj elde edebilir. Tersine beklenmedik bir fiyat sıçraması, yeni para
çıkarımı sınırlı olsa da mevcut bakiyeyi aşındırabilir.

Beklenmeyen enflasyon sabit faizli nominal devlet borcunun reel değerini de
düşürür. Bu da kamunun bilançosunu rahatlatan bir servet transferidir; fakat dar
anlamda para tabanı üzerindeki enflasyon vergisi değildir. Kavramları birleştirmek
kimin ne kadar ödediğini görünmez kılar.

## Laffer eğrisi: oran artarken taban kaçar

Devlet enflasyonu yükselterek sınırsız gelir toplayamaz. Cagan tipi reel para
talebi düşünelim:

> h(π) = A · exp(−απ)

Enflasyon arttıkça insanlar nakit bakiyesini azaltır, maaşı daha hızlı harcar,
dövize veya faizli araca geçer. Senyorajın durağan durum yaklaşımı:

> S(π) = π · A · exp(−απ)

Türevi `S'(π)=A exp(−απ)(1−απ)` olur. Tepe `π*=1/α` noktasındadır. Bu noktanın
altında daha yüksek oran taban kaybından baskındır; üstünde reel para talebi o
kadar hızlı çöker ki oran artmasına rağmen gelir düşer. Hiperenflasyon rejiminde
devlet daha hızlı para basıp daha az reel kaynak toplayabilir.

Bu tepe mekanik bir politika hedefi değildir. `α` sabit olmayabilir; finansal
yenilik, dolarizasyon ve güven kaybı para talebini aniden daha duyarlı yapar.
Ayrıca geliri azamileştiren oran toplumsal refahı azamileştirmez. İşlem
bozulması, fiyat sinyallerinin kaybı ve yeniden dağılım maliyeti tepe hesabında
yoktur.

## Dinamik politika: bugün toplamak yarının tabanını küçültür

Obstfeld'in dinamik yaklaşımı tek dönemli Laffer eğrisinin ötesine geçer. Hükümet
bugün para finansmanına başvurduğunda özel sektör yarının politikasını günceller.
Beklenen enflasyon yükselir ve daha bugünden reel bakiye düşer. Böylece gelecekte
aynı miktar geliri toplamak zorlaşır. İtibar, senyoraj kapasitesinin bir parçasıdır.

Borçlanma bu maliyeti zamana yayabilir; ancak borcun sonunda vergi, harcama
kesintisi veya senyorajla karşılanacağı beklentisi bütçe kısıtını geri getirir.
Takdir yetkisi olan hükümetin kısa vadeli gelir dürtüsü ile uzun vadeli para
talebini koruma hedefi çatışır. 2.5'teki zaman tutarsızlığı burada doğrudan vergi
tabanını aşındırır.

## Vergi kimin üzerine düşer?

Enflasyon vergisi parlamentoda oranı ilan edilen bir vergi değildir, fakat bu
onu gönüllü yapmaz. Gündelik ödeme için nakit ve vadesiz mevduata bağımlı hane
kaçınamaz. Finansal bilgisi, dövize erişimi, altını, kısa vadeli faizli hesabı
veya fiyatını sık ayarlama gücü olan kesim bakiyesini küçültür. Vergi tabanı en
az korunabilenlerin üzerinde yoğunlaşabilir.

Borçlu–alacaklı ayrımı da önemlidir. Beklenmeyen enflasyon sabit nominal borçluyu
rahatlatır, alacaklıyı kayba uğratır. Ücret ve emekli aylığı geriden
güncelleniyorsa çalışan ile emekli reel gelir kaybeder; stok ve gayrimenkul
tutanlar kısmen korunabilir. “Herkes fiyat artışını aynı anda görüyor” demek,
yeniden fiyatlama hızlarının eşitsizliğini yok sayar.

## Türkiye'de senyoraj kapasitesi ve para ikamesi

Türkiye'de lira mevduattan döviz, altın ve benzeri araçlara geçiş enflasyon
vergisi tabanını daraltır. Devlet daha yüksek nominal para büyümesiyle gelir
aramaya devam ederse Laffer eğrisinin aşağı eğimli bölümüne yaklaşabilir. Para
ikamesi yalnız bugünkü geliri azaltmaz; fiyatlama biriminin dövize kayması kur
geçişkenliğini büyütür ve para politikasının etkisini zayıflatır.

Bu nedenle senyoraj kısa vadeli bütçe rahatlığı ile uzun vadeli parasal kapasite
arasında takastır. Vergi sistemi çalışmıyor ya da borçlanma kapısı kapanıyorsa
çekici görünür; sık kullanıldıkça kendi tabanını ve kurumsal güveni yok eder.

## Bu dersten sonra

4.4'te para talebi çöküşünün hiperenflasyonu nasıl beslediğini gördük; 4.5 aynı
mekanizmanın kamu gelirindeki sınırını kurdu. 5.4'te dolarizasyon ve kur
geçişkenliği, para ikamesinin fiyat dinamiğine dönüşünü gösterecek. 8.2'de mali
baskınlık ve mali fiyat düzeyi teorisiyle “bütçe açığı sonunda hangi nominal
değişkenle kapanır?” sorusuna geri döneceğiz.
