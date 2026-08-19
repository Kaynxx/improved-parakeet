---
baslik: Getiri eğrisi, beklentiler hipotezi ve vade primi
ozet: >-
  Uzun vadeli faiz, beklenen kısa faizlerin mekanik ortalaması değildir; vade
  primi bu okumayı bozar. Bu ders ters getiri eğrisinin neden güçlü ama
  kusurlu bir resesyon sinyali olduğunu ve sinyalin beklenti ile prim arasında
  nasıl ayrıştırılabileceğini tartışır.
sure: 50
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
  - hafta-03/parasal-aktarim-kanallari
kaynaklar:
  - tip: video
    baslik: >-
      The 3 Theories of the Yield Curve: Expectations, Segmented Markets, Liquidity Premium
    url: https://www.youtube.com/watch?v=0pslBcyrlms
    kaynak: Financism by Dr. Phil
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Beklentiler hipotezi, segmentli piyasalar ve likidite primi yaklaşımlarını
      aynı eğrinin farklı şekilleri üzerinden karşılaştırır. Yukarı eğimin tek
      açıklaması olmadığını görmek ve vade priminin rolünü sezgisel olarak
      kurmak için izlenir.
  - tip: article
    baslik: Treasury Yield Premiums
    url: https://www.frbsf.org/research-and-insights/data-and-indicators/treasury-yield-premiums/
    kaynak: San Francisco Fed
    seviye: uzman
    ozet: >-
      Christensen–Rudebusch terim yapısı modeliyle gözlenen getiriyi beklenen
      kısa faiz ve vade risk primine ayrıştırır. Ters eğrinin hangi bileşenden
      doğduğunu doğrudan gözlemleyemediğimiz için neden modele ihtiyaç
      duyduğumuzu teknik düzeyde gösterir.
  - tip: discussion
    baslik: >-
      Getiri Eğrisi İllüzyonu: Tersine Dönüş (Inversion) Yerine Neden Dikleşmeye Bakmalı
    url: https://ugurtukenmez.com/getiri-egrisi-inversion-steepening-resesyon/
    kaynak: Uğur Tükenmez (blog)
    seviye: ileri
    ozet: >-
      Tersine dönüş kadar, sonrasında gelen dikleşmenin de çevrim bilgisi
      taşıdığını savunur ve bull/bear steepening ayrımını gündeme getirir.
      Getiri eğrisini tek başına otomatik resesyon çağrısına çevirmemek için
      karşı görüş olarak okunur.
sorular:
  - id: uc-yillik-getiri
    tip: sayisal
    puan: 25
    soru: >-
      Saf beklentiler hipotezi altında önümüzdeki üç yıl için beklenen bir
      yıllık kısa faizler sırasıyla yüzde 40, yüzde 32 ve yüzde 24'tür. Sürekli
      bileşik getiriler kullanılıyor ve üç yıllık vade primi 2 yüzde puandır.
      Üç yıllık sıfır kuponlu tahvilin yıllıklandırılmış getirisi yüzde kaçtır?
    beklenen: 34
    tolerans: 0.1
  - id: ters-egri-ayristirma
    tip: acik
    puan: 40
    soru: >-
      On yıllık getiri politika faizinin altına indiğinde “piyasa kesin resesyon
      bekliyor” sonucuna varmak neden fazla güçlüdür? Beklenen kısa faiz patikası
      ile vade primini ayrı ayrı kullanarak en az iki alternatif açıklama kur.
    olcut:
      - Uzun vadeli getiriyi beklenen kısa faizlerin ortalaması ile vade priminin toplamı olarak yazar.
      - Eğrinin beklenen gelecekteki faiz indirimleri nedeniyle tersine dönebileceğini açıklar.
      - Vade priminin güvenli varlık talebi, merkez bankası alımları veya süre riski algısıyla düşmesinin de eğriyi ters çevirebileceğini belirtir.
      - Gözlenen getiriden iki bileşenin doğrudan ayrıştırılamadığını ve bir terim yapısı modeli gerektiğini söyler.
      - Resesyon sinyalinin tarihsel korelasyon olduğunu, mekanizmanın dönem ve politika rejimine göre değişebileceğini kabul eder.
  - id: diklesme-sinyali
    tip: acik
    puan: 35
    soru: >-
      Ters eğrinin ardından kısa vadeli faizler hızla düşerken eğrinin yeniden
      dikleşmesi iyi haber midir, kötü haber mi? Bull steepening ile bear
      steepening ayrımını yaparak politika ve büyüme açısından tartış.
    olcut:
      - Bull steepening'i kısa vadeli getirilerin uzun vadeli getirilerden daha hızlı düşmesi olarak tanımlar.
      - Bear steepening'i uzun vadeli getirilerin kısa vadeli getirilerden daha hızlı yükselmesi olarak tanımlar.
      - Bull steepening'in yaklaşan faiz indirimini ve bozulmuş büyüme görünümünü yansıtabileceğini, bu yüzden otomatik iyi haber olmadığını belirtir.
      - Bear steepening'in daha güçlü büyüme beklentisinden veya yükselen enflasyon ve vade priminden kaynaklanabileceğini ayırır.
      - Eğrinin düzeyini, enflasyon verisini ve kredi göstergelerini birlikte okumadan hüküm verilemeyeceğini söyler.
---

## Eğri bir tahmin makinesi mi?

Aynı devlet bugün üç ay, iki yıl ve on yıl vadeyle borçlanırken farklı faizler
öder. Bu faizleri vadeye göre çizdiğinde getiri eğrisi oluşur. Normal eğri yukarı
eğimli, ters eğri kısa vadede yüksek ve uzun vadede düşük getirili görünür.
Piyasa yorumunun kestirme cümlesi şudur: ters eğri resesyon habercisidir.

Kestirme güçlüdür çünkü uzun faiz gelecekteki kısa faizlere dair bilgi taşır.
Eksiktir çünkü yalnız onu taşımaz. Gözlenen her uzun vadeli getiri iki ayrı
büyüklüğün toplamıdır: beklenen kısa faiz patikası ve yatırımcının vade riski
taşımak için istediği prim. Bunlardan ikincisi oynadığında eğrinin şekli,
ekonomik büyüme beklentisi değişmeden de dönüşebilir.

## Saf beklentiler hipotezi

Sürekli bileşik getirilerle `n` yıllık sıfır kuponlu tahvil getirisi için saf
beklentiler hipotezi şu ilişkiyi önerir:

> yₙ = (1/n) Σ Eₜ(iₜ₊ⱼ)

Yani bugün üç yıllık tahvili tutmak ile her yıl bir yıllık tahvili yenilemenin
beklenen getirisi eşitlenir. Gelecek kısa faizlerin yüzde 40, 32 ve 24 olması
bekleniyorsa ortalama yüzde 32'dir. Bu çerçevede aşağı eğim, piyasanın ileride
faiz indirimi beklediği anlamına gelir.

Hipotezin sert biçimi veri karşısında zorlanır. Uzun tahvilin fiyatı enflasyon,
büyüme ve arz şoklarına daha duyarlıdır; yatırımcı bu süre riskini bedelsiz
taşımak zorunda değildir. Dahası emeklilik fonu gibi bazı kurumlar uzun vadeli
yükümlülükleri nedeniyle uzun tahvili özellikle ister. Aynı vade, herkes için
aynı risk değildir.

Eğriden hesaplanan **forward faiz** de aynı uyarıyı taşır. İki ve üç yıllık
getirilerden çıkarılan bir yıl sonraki bir yıllık forward, risksiz arbitraj
ilişkisiyle belirlenen bir fiyat oranıdır; doğrudan anket beklentisi değildir.
Beklentiler hipotezi doğru ve primler sabitse gelecekteki kısa faizin tahmini
olarak okunabilir. Bu koşullar sağlanmadığında forward, beklenen faize zamanla
değişen bir forward primi ekler. “Piyasa şu faizi bekliyor” başlıkları çoğu kez
bu ikinci terimi sessizce sıfıra eşitler. Oysa tartışmanın bütün ağırlığı,
sıfırlanan terimin gerçekten sabit olup olmadığındadır.

## Vade primi denkleme girince

Daha gerçekçi ayrıştırma şöyledir:

> yₙ = (1/n) Σ Eₜ(iₜ₊ⱼ) + TPₙ,ₜ

`TP`, vade primidir. Pozitif olmak zorunda değildir. Uzun tahvil resesyonda
değer kazanarak portföyü koruyorsa yatırımcı bu sigorta için daha düşük getiriye
razı olabilir ve prim negatife inebilir. Merkez bankasının uzun vadeli tahvil
alımı, düzenleyici güvenli varlık talebi veya küresel tasarruf fazlası da uzun
getiriyi kısa faiz beklentisinden bağımsız aşağı çekebilir.

Burada 3.1'deki breakeven sorunu geri gelir: gözlenen fiyattan saf beklenti
okumaya çalışıyoruz, fakat fiyat risk ve likidite primlerini de taşıyor. Bir
eğrinin tersine dönmesi, beklenen kısa faizlerin düştüğünü gösterebilir; vade
priminin çöktüğünü de gösterebilir. Tek gözlem, iki bilinmeyen vardır.

San Francisco Fed gibi kurumların terim yapısı modelleri bu nedenle kullanılır.
Afin modeller birkaç gizli faktörün zaman içindeki hareketinden hem kısa faiz
beklentisini hem primi tahmin eder. Kalman filtresi gözlenmeyen durumları
getirilerden çıkarır. Sonuç ölçüm değil, model koşullu tahmindir. Faktör sayısı,
risk fiyatı dinamiği veya örneklem değiştiğinde “vade primi” de değişir.

## Tersine dönme neden yine de işe yarar?

Kusurlu sinyal yararsız sinyal değildir. Sıkılaştırma döneminde kısa faiz hızla
yükselirken uzun faiz gelecekte enflasyonun ve politikanın normalleşeceğini
fiyatlıyorsa eğri düzleşir. Finansal aracılar kısa vadeden fonlanıp uzun vadeye
kredi verdiğinde marjların daralması kredi arzını da zayıflatabilir. Böylece eğri
yalnız resesyonu tahmin etmez; aktarım mekanizmasının parçası olarak resesyona
katkıda bulunabilir.

Fakat korelasyonu değişmez yasa saymak üç nedenle yanlıştır. Birincisi, tahvil
alımları ve bilanço politikaları vade primini bastırır. İkincisi, düzenlemeler ve
küresel güvenli varlık talebi uzun ucu etkiler. Üçüncüsü, yüksek ve oynak
enflasyonda uzun vadeli nominal tahvil piyasası sığlaşabilir; gözlenen eğri
makro beklentiden çok piyasa yapısını yansıtır.

Türkiye'de bu üçüncü sorun belirgindir. TCMB'nin politika yönlendirmesi kadar
bankaların menkul kıymet tutma düzenlemeleri, Hazine'nin ihraç bileşimi ve
enflasyon riski de TL eğrisini şekillendirir. Uzun getiri politika faizinin
altındaysa bunu doğrudan “piyasa dezenflasyona inanıyor” diye okumak, kurumsal
talebi ve düzenleme primini yok sayar.

## Ters eğriden sonra dikleşme

Eğrinin yeniden pozitif eğime dönmesi de tek anlamlı değildir. **Bull
steepening**, kısa getirilerin uzun getirilerden hızlı düşmesidir. Merkez bankası
faiz indiriyorsa finansal koşullar gevşiyor gibi görünür; fakat indirim ağır bir
daralmaya cevap veriyorsa dikleşme kötü haberin gerçekleştiğini gösterir.

**Bear steepening** ise uzun getirilerin daha hızlı yükselmesidir. Güçlü büyüme
beklentisi bunu yaratabilir; ama çıpasız enflasyon veya artan tahvil arzı vade
primini yükseltiyorsa aynı şekil mali koşulların sertleştiğini anlatır. “Eğri
dikleşti” cümlesi, hangi ucun hareket ettiğini söylemeden bilgi taşımaz.

## Bu dersten sonra

Getirideki küçük değişimin tahvil fiyatını ne kadar oynattığını 3.4'te durasyon
ve konveksiteyle hesaplayacağız. 7.3'te getiri eğrisini daha geniş finansal
koşullar endeksinin bir girdisi olarak, 8.2'de ise yükselen kamu borcu ve mali
baskınlık altında vade priminin nasıl rejim değişkenine dönüştüğünü göreceğiz.
