---
baslik: Fisher denklemi, reel faizin ölçülemezliği ve breakeven enflasyon
ozet: >-
  Reel faiz gözlemlenebilir bir fiyat değil, bir çıkarımdır. Bu ders Fisher
  denkleminin kesin biçimini kurar, ex-ante ile ex-post reel faizi ayırır ve
  TIPS makasından okunan breakeven oranının neden saf bir beklenti ölçüsü
  olmadığını gösterir.
sure: 45
onkosul: []
kaynaklar:
  - tip: video
    baslik: Deriving the Precise Fisher Equation
    url: https://www.youtube.com/watch?v=JIW6hCykf6s
    kaynak: Economics in Many Lessons
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      "Nominal ≈ reel + enflasyon" yaklaşımından (1+i)=(1+r)(1+π) kesin
      türevine geçişi adım adım gösterir. Yaklaşık biçimin düşük enflasyonda
      neden zararsız, yüzde 50'lik enflasyonda neden kullanılamaz olduğunu
      görmek için başlangıç noktası.
  - tip: article
    baslik: 10-Year Breakeven Inflation Rate (T10YIE)
    url: https://fred.stlouisfed.org/series/T10YIE
    kaynak: FRED / St. Louis Fed
    seviye: ileri
    ozet: >-
      Nominal 10 yıllık Hazine getirisi ile aynı vadeli TIPS getirisi
      arasındaki farkın günlük serisi. Breakeven yönteminin canlı uygulaması;
      seriyi kriz dönemlerinde izlemek likidite priminin beklentiyi nasıl
      kirlettiğini çıplak gösterir.
  - tip: discussion
    baslik: What real interest rate formula should I use?
    url: https://www.reddit.com/r/AskEconomics/comments/10kyqba/what_real_interest_rate_formula_should_i_use/
    kaynak: Reddit r/AskEconomics
    seviye: orta
    ozet: >-
      Hangi reel faiz formülünün doğru olduğu sorusuna verilen yanıtlar, "tek
      doğru sayı" olmadığını somutlaştırır: seçilen enflasyon beklentisi ve
      vade değiştikçe cevap değişir.
sorular:
  - id: kesin-vs-yaklasik
    tip: sayisal
    puan: 20
    soru: >-
      Nominal faiz yıllık %65, beklenen enflasyon yıllık %50. Kesin Fisher
      denklemine göre ex-ante reel faiz yüzde kaçtır? Yanıtı yüzde cinsinden,
      iki ondalıkla ver.
    beklenen: 10
    tolerans: 0.5
  - id: breakeven-kirliligi
    tip: acik
    puan: 40
    soru: >-
      Mart 2020'de ABD 10 yıllık breakeven oranı birkaç hafta içinde %1,7'den
      %0,5'in altına düştü. Bunu "piyasa deflasyon bekliyor" diye okumak neden
      eksik bir yorumdur? Breakeven'ı beklenen enflasyon, enflasyon risk primi
      ve likidite primi bileşenlerine ayırarak açıkla.
    olcut:
      - Breakeven'ın üç bileşene ayrıştığını adlandırır: beklenen enflasyon, enflasyon risk primi, TIPS likidite primi.
      - Mart 2020'de TIPS piyasasının nominal Hazine piyasasına göre çok daha ince olduğunu ve likidite priminin TIPS getirisini yukarı iterek breakeven'ı aşağı çektiğini söyler.
      - Düşüşün tamamını beklentiye yazmanın, fiyattan çıkarılan her ölçünün risk ve likidite primi taşıdığı gerçeğini ihmal ettiğini belirtir.
      - Bileşenlerin ayrıştırılmasının model gerektirdiğini, dolayısıyla "gerçek" beklentinin de gözlemlenemediğini kabul eder.
  - id: turkiye-reel-faiz
    tip: acik
    puan: 40
    soru: >-
      Türkiye'de enflasyona endeksli tahvil (TÜFEX) piyasası ABD TIPS
      piyasasına göre çok sığ ve TÜFE'nin kendisi tartışmalı. Bu iki koşul
      altında Türkiye için ex-ante reel faizi ölçmeye çalışan bir analistin
      hangi seçenekleri var ve her birinin hangi zayıflığı taşıyor?
    olcut:
      - En az iki alternatif kaynak sayar: TCMB Piyasa Katılımcıları Anketi beklentileri, TÜFEX breakeven'ı, geçmiş enflasyondan ex-post hesap, ENAG gibi alternatif endeksler.
      - Anket beklentilerinin küçük ve homojen bir katılımcı kümesinden geldiğini, sürü davranışı ve çıpalanma taşıdığını belirtir.
      - Sığ TÜFEX piyasasında likidite priminin ABD'dekinden çok daha büyük olacağını, dolayısıyla breakeven'ın daha az güvenilir olduğunu söyler.
      - Ex-post reel faizin politika kararını değerlendirmek için yanlış ölçü olduğunu — karar anında bilinmeyen bir enflasyonu kullandığını — açıklar.
      - Ölçünün seçiminin sonucu belirlediğini, yani "Türkiye'de reel faiz negatif mi" sorusunun tek cevabı olmadığını kabul eder.
---

## Sorunun kendisi

Bir tahvilin nominal getirisini ekrandan okursun. Reel getirisini okuyamazsın.
Reel faiz bir piyasa fiyatı değil, iki şeyin farkıdır ve o iki şeyden biri —
enflasyon beklentisi — hiç kimsenin doğrudan gözlemleyemediği bir büyüklüktür.
Bu ders, "reel faiz şu anda yüzde kaç?" sorusunun neden her zaman "hangi
varsayımla?" diye karşılık gerektirdiğini kurar.

## Kesin Fisher, yaklaşık Fisher

Ders kitabı yazımı tanıdıktır:

> i ≈ r + π

Buradaki `≈` işareti masum değildir. Doğru ilişki çarpımsaldır:

> (1 + i) = (1 + r)(1 + π)

Buradan reel faizi çekersek:

> r = (1 + i) / (1 + π) − 1

İki biçim arasındaki fark `r · π` terimidir. Enflasyon %2 iken bu terim ihmal
edilebilir; toplama yaparsın, kimse fark etmez. Enflasyon %50 iken ihmal
edilemez. Nominal %65, enflasyon %50 örneğinde yaklaşık biçim reel faizi %15
der; kesin biçim 1,65/1,50 − 1 = %10 der. Beş puanlık bir sapma, üstelik hep
aynı yönde: **yaklaşık biçim yüksek enflasyonda reel faizi sistematik olarak
olduğundan yüksek gösterir.** Türkiye üzerine yazılmış piyasa yorumlarında bu
hatanın sıklığı, konunun akademik bir incelikten ibaret olmadığını gösterir.

## Ex-ante ve ex-post: iki farklı soru

Fisher denklemindeki π hangi enflasyondur?

- **Ex-ante reel faiz** *beklenen* enflasyonu kullanır. Karar anında oluşan,
  tasarruf ve yatırım kararlarını fiilen yönlendiren büyüklük budur. Ama
  gözlemlenemez, çünkü beklenti gözlemlenemez.
- **Ex-post reel faiz** *gerçekleşen* enflasyonu kullanır. Hesaplanabilir, ama
  geçmişe aittir ve karar anında kimsenin bilmediği bir bilgiyi içerir.

Bu ayrım politika değerlendirmesinde doğrudan sonuç doğurur. "Merkez bankası
2021'de reel faizi eksiye düşürdü" cümlesi, ex-post hesapla bakıldığında
neredeyse tanım gereği doğrudur — enflasyon beklenenden çok yükseldiği için.
Ex-ante bakıldığında soru başkalaşır: karar anındaki beklentilere göre faiz
neredeydi? İki hesap farklı hikâyeler anlatır ve hangisinin kullanıldığını
söylemeyen bir analiz, tartışmayı seçtiği ölçüyle kazanmıştır.

## Breakeven: beklentiyi fiyattan çıkarsamak

Enflasyona endeksli tahviller bir çıkış yolu sunar. Aynı vadedeki nominal
tahvil ile endeksli tahvilin getiri farkı — **breakeven enflasyon oranı** —
piyasanın enflasyon beklentisinin bir okuması olarak sunulur.

Sunulur, ama öyle değildir. Breakeven en az üç şeyi birden içerir:

1. **Beklenen enflasyon** — aranan büyüklük.
2. **Enflasyon risk primi** — yatırımcının enflasyonun *belirsizliğini*
   üstlenmek için istediği ek getiri. Beklenti sabitken bile belirsizlik
   arttığında bu prim büyür.
3. **Likidite primi** — endeksli tahvil piyasası nominal piyasadan incedir.
   Stres anında yatırımcı likit olana kaçar; endeksli tahvilin fiyatı düşer,
   getirisi yükselir, breakeven mekanik olarak daralır.

Mart 2020 bu üçünün nasıl karıştığının ders kitabı örneğidir. ABD 10 yıllık
breakeven'ı haftalar içinde çöktü. Piyasa gerçekten deflasyon mu bekliyordu,
yoksa TIPS piyasası mı kurumuştu? Sonradan gelen enflasyon verisi ikinci
açıklamanın ağırlığını gösterdi. Buradaki ders geneldir ve bu programın
tamamına yayılır: **fiyattan çıkarılan hiçbir beklenti ölçüsü saf beklenti
değildir.** Getiri eğrisindeki vade primi (3.3) ve kur beklentisindeki forward
premium bulmacası (5.2) aynı ailenin başka üyeleridir.

## Türkiye'de ölçü sorunu ikiye katlanır

ABD'de tartışma primlerin büyüklüğü üzerinedir; payda — TÜFE'nin kendisi —
tartışma dışıdır. Türkiye'de her ikisi de tartışmalıdır. TÜFEX piyasası sığ
olduğu için likidite primi büyük ve oynak; TÜİK enflasyonunun ölçüm
tartışması ise breakeven'ın *neyin* beklentisi olduğunu belirsizleştirir.
Enflasyona endeksli bir tahvil, endekslendiği seriyi ne kadar temsil ederse o
kadar korur. Bu, 4.1'de TÜFE'nin inşasına döneceğimiz yerin habercisidir.

Pratikte analistler üç yola başvurur: TCMB Piyasa Katılımcıları Anketi,
TÜFEX'ten breakeven, ya da ex-post hesap. Üçü de farklı sayılar üretir ve
üçünün de savunulabilir bir gerekçesi vardır. Doğru refleks bir tanesini seçip
"gerçek reel faiz budur" demek değil, hangi soruya cevap aradığını belirleyip
ölçüyü ona göre seçmek ve seçimi açıkça yazmaktır.

## Bu dersten sonra

Reel faizin çıkarsanan bir büyüklük olduğu fikri, programın geri kalanında
tekrar tekrar karşına çıkacak. 3.5'te negatif reel faizin bir politika aracı
olarak kullanılışını (finansal baskı) tartışacağız; 7.1'de doğal faiz r\* ile
karşılaşacağız — o, reel faizden bir adım daha uzakta, hiç gözlemlenemeyen ve
yalnız modelle tahmin edilebilen bir büyüklük. Ölçülemeyenle politika yapmanın
zorluğu, bu programın sürekli dönen temalarından biridir.
