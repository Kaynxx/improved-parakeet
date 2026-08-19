---
baslik: Zaman tutarsızlığı, bağımsızlık ve enflasyon hedeflemesi
ozet: >-
  İyi niyetli bir politika yapıcı bile gelecekte yeniden optimizasyon yaptığında
  bugün verdiği sözü bozmak isteyebilir. Bu ders Kydland–Prescott zaman
  tutarsızlığını enflasyon yanlılığına bağlar; bağımsızlık ve enflasyon
  hedeflemesini çözüm adayı olarak kurup nedensellik ve hesap verebilirlik
  itirazlarıyla sınar.
sure: 55
onkosul:
  - hafta-02/faiz-koridoru-ve-operasyonel-cerceve
kaynaklar:
  - tip: video
    baslik: >-
      Why should we care about central bank independence? | Macro Musings
    url: https://www.youtube.com/watch?v=DEJ5tzc-pBY
    kaynak: Mercatus Center
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Merkez bankası bağımsızlığını siyasetten kopuş değil, teşvik ve
      hesap verebilirlik tasarımı olarak tartışır. Zaman tutarsızlığı
      argümanının gerçek kurumlara nasıl çevrildiğini görmek için izlenir.
  - tip: article
    baslik: >-
      Rules Rather than Discretion: The Inconsistency of Optimal Plans
    url: https://www.econ.puc-rio.br/mgarcia/Macro%20II%20-%20Mestrado/KydlandPrescott1977.pdf
    kaynak: Finn E. Kydland, Edward C. Prescott, Journal of Political Economy, Cilt 85, Sayı 3 (1977)
    seviye: uzman
    ozet: >-
      Bugün optimal görünen bir planın beklentiler oluştuktan sonra neden
      uygulanmak istenmeyebileceğini formel olarak kuran temel metindir.
      İhtiyari politikanın iyi niyet altında bile kötü denge üretebilmesini ve
      kural arayışının teorik kökenini anlamak için okunur.
  - tip: discussion
    baslik: >-
      Central bank independence and inflation: Weak causality at best
    url: https://cepr.org/voxeu/columns/central-bank-independence-and-inflation-weak-causality-best
    kaynak: Enzo Rossi, Michael Schomaker, Philipp F. M. Baumann, CEPR / VoxEU (Temmuz 2021)
    seviye: ileri
    ozet: >-
      Bağımsızlıktan düşük enflasyona giden nedensel bağın sanıldığı kadar
      güçlü olmayabileceğini ileri sürer. Kurumsal çözümün başarısını korelasyonla
      kanıtlamanın neden yetersiz olduğunu ve uzlaşmanın ampirik sınırını açar.
sorular:
  - id: enflasyon-yanliligi-hesabi
    tip: sayisal
    puan: 25
    soru: >-
      Kanonik modelde kayıp L=(1/2)π²+(λ/2)(y−y*)², Phillips ilişkisi
      y−y_n=α(π−πᵉ) ve hedef y*=y_n+k olsun. Rasyonel beklentili ihtiyari
      dengede enflasyon yanlılığı π=λαk'dır. λ=0,5, α=1 ve k=4 yüzde puan ise
      denge enflasyonu yüzde kaçtır?
    beklenen: 2
    tolerans: 0.01
  - id: soz-neden-bozulur
    tip: acik
    puan: 35
    soru: >-
      Hükümet bugün sıfır enflasyon sözü veriyor ve özel sektör buna inanarak
      ücretleri belirliyor. Yarın neden sürpriz enflasyon yaratmak isteyebilir
      ve rasyonel beklentiler bu girişimi neden kalıcı üretim kazancı olmadan
      pozitif enflasyon yanlılığına dönüştürür?
    olcut:
      - Beklentiler ve nominal sözleşmeler sabitlendikten sonra sürpriz enflasyonun reel ücreti geçici düşürüp üretimi artırma teşviki yarattığını açıklar.
      - Özel sektörün bu teşviki bildiği için sıfır enflasyon sözüne koşulsuz inanmayacağını belirtir.
      - Rasyonel beklentili dengede beklenen ve gerçekleşen enflasyonun eşitlendiğini söyler.
      - Sürpriz ortadan kalkınca üretimin doğal düzeyde kaldığını, buna karşılık pozitif enflasyon maliyetinin sürdüğünü açıklar.
      - Sorunun kötü niyetten değil, sıralı karar yapısı ve yeniden optimizasyon teşvikinden doğduğunu vurgular.
  - id: bagimsizlik-nedensellik
    tip: acik
    puan: 40
    soru: >-
      Ülkeler arası veride daha bağımsız merkez bankalarının daha düşük
      enflasyona sahip olduğunu gözlemlemek, bağımsızlığın enflasyonu düşürdüğünü
      kanıtlar mı? Ters nedensellik, ortak belirleyiciler, hedef ve araç
      bağımsızlığı ile demokratik hesap verebilirliği içeren bir değerlendirme yap.
    olcut:
      - Düşük enflasyon tercihine sahip toplumların aynı zamanda bağımsız kurum kurabileceğini söyleyerek ters nedenselliği açıklar.
      - Hukuk devleti, mali disiplin veya siyasi istikrar gibi hem bağımsızlığı hem enflasyonu etkileyen en az bir ortak belirleyici verir.
      - Yasal bağımsızlık ile fiili bağımsızlığın farklı olabileceğini belirtir.
      - Araç bağımsızlığını hedefi gerçekleştirecek faiz ve operasyonları seçme, hedef bağımsızlığını nihai amacı seçme yetkisi olarak ayırır.
      - Bağımsızlığın atanma, raporlama, açık hedef ve parlamento denetimi gibi hesap verebilirlik düzenekleriyle sınırlandırılması gerektiğini tartışır.
---

## Sorun kötü niyet değil, kararların sırasıdır

Bir hükümet veya merkez bankası bugün düşük enflasyon sözü verebilir. Ücretler,
fiyatlar ve borç sözleşmeleri bu söze göre kurulduktan sonra yarın küçük bir
sürpriz enflasyon cazip hâle gelir: reel ücret geçici olarak düşer, üretim ve
istihdam doğal düzeyin üzerine itilebilir, nominal kamu borcunun reel yükü
hafifleyebilir. Dün verilen söz, bugün yeniden optimizasyon yapan karar alıcı
için artık en iyi seçenek değildir.

Kydland ve Prescott'un zaman tutarsızlığı sonucu tam olarak budur. Başlangıçta
optimal olan plan, özel sektör planı ciddiye alıp davranışını değiştirdikten
sonra uygulanmak istenmez. Politika yapıcının amacı değişmemiştir; bilgi ve
teşvik kümesi değişmiştir. Bu nedenle “iyi insanlar seçersek söz tutulur” bir
kurumsal çözüm değildir.

## Enflasyon yanlılığının kanonik modeli

Sonraki literatürün sadeleştirdiği Barro–Gordon çerçevesinde politika yapıcı hem
enflasyondan hem üretimin hedefin altında kalmasından hoşlanmaz:

> L = (1/2)π² + (λ/2)(y − y*)²

Kısa dönem Phillips ilişkisi sürpriz enflasyonun üretimi doğal düzeyden
saptırmasına izin versin:

> y − y_n = α(π − πᵉ), y* = y_n + k

`k > 0`, politika yapıcının üretimi sürdürülebilir doğal düzeyin üzerinde
hedeflediğini söyler. Beklentiler önceden verilmişken daha yüksek `π`, üretim
açığını kapatır. Fakat özel sektör bu birinci derece koşulu bilir. Rasyonel
beklentili dengede `π = πᵉ` olur; sürpriz kaybolur, üretim yine `y_n` düzeyinde
kalır. Buna rağmen denge enflasyonu pozitiftir:

> π = λαk

Sonuç serttir: ihtiyari politika daha yüksek ortalama üretim satın alamaz,
yalnız enflasyon üretir. Buradaki “yanlılık” her dönemde yüksek enflasyon olacağı
iddiası değil, bağlanma olanağı bulunan çözüme göre sistematik yukarı sapmadır.

## Kural çözüm müdür?

Tam mekanik bir para büyüme kuralı yeniden optimizasyonu engelleyebilir; fakat
talep şoku, finansal kriz veya ödeme sistemi paniği karşısında gereken esnekliği
de yok eder. İhtiyarilik esnektir ama güvenilir değildir; katı kural güvenilir
olabilir ama dünyadaki bütün durumları önceden yazamaz. Modern kurumlar bu iki
uçtan birini saf biçimde seçmedi.

Merkez bankası bağımsızlığı, seçilmiş hükümetin kısa seçim ufkuyla para
politikası aracını ayıran bir yetki devridir. Özellikle **araç bağımsızlığı**,
fiyat istikrarı hedefi siyasi sistem tarafından verildikten sonra faiz ve
operasyonel araçların merkez bankasınca seçilmesidir. **Hedef bağımsızlığı** ise
enflasyon hedefinin kendisini seçme yetkisidir ve demokratik meşruiyet sorusunu
daha keskin doğurur.

Bağımsızlık siyasetin yokluğu değildir. Başkanın atanma biçimi, görev süresi,
bütçe yapısı ve görevden alınma koşulları teşvikleri belirler. Aynı ölçüde,
karar metinleri, tahmin raporları, parlamento sunumları ve hedef sapması
açıklamaları hesap verebilirliği kurar. Denetlenmeyen teknokrasi zaman
tutarsızlığını çözebilirken başka bir temsil sorununu büyütebilir.

Atanmış bir “muhafazakâr” merkez bankacı, enflasyona seçilmiş hükümetten daha
yüksek ağırlık vererek yanlılığı azaltabilir; bedeli arz şoklarında daha büyük
üretim oynaklığı olabilir. İtibar da bağlanma aracı sayılabilir: bugün yaratılan
sürprizin kısa kazancı, yarın daha yüksek beklenen enflasyonla ödenir. Fakat
görev süresi kısa, yönetim sık değişiyor veya hedefler sürekli yeniden
tanımlanıyorsa bu gelecek maliyeti karar alıcı için küçülür. Kurumsal tasarımın
işi erdem ilan etmek değil, söz bozmanın bugünkü faydasını gelecekteki maliyetle
karşılaştıran teşviki değiştirmektir.

## Enflasyon hedeflemesi: kural ile ihtiyarilik arasında

Enflasyon hedeflemesi katı bir faiz formülü değildir. Sayısal hedef, tahmin
ufku, düzenli iletişim ve sapmaların açıklanmasıyla **sınırlandırılmış
ihtiyarilik** yaratır. Merkez bankası şoka nasıl tepki vereceğini seçebilir;
ama kararını orta vadeli hedefle tutarlı göstermek ve sonradan hesabını vermek
zorundadır. Kurum böylece yalnız bugünkü faizi değil, gelecekteki tepki
fonksiyonunu satmaya çalışır.

Başarı burada hedefi her ay tutturmak değildir. Arz şokuna anında karşılık
vermek üretimde gereksiz oynaklık yaratabilir. Asıl sınav, geçici sapmanın
beklentileri kalıcı biçimde hedeften koparmamasıdır. “Esnek” hedefleme bu
nedenle başarısızlığa mazeret değil; hedef ufku ile çıktı istikrarı arasındaki
açık bir tercihtir.

## Bağımsızlık düşük enflasyona gerçekten neden olur mu?

Ülkeler arası negatif korelasyon ikna edici görünür: bağımsızlık arttıkça
enflasyon düşer. Nedensellik bundan çıkmaz. Fiyat istikrarına güçlü toplumsal
talebi olan ülkeler hem düşük enflasyon politikası izleyip hem bağımsız kurum
kurabilir. Hukuk devleti, mali disiplin ve siyasi istikrar her ikisini de
üretebilir. Kâğıt üzerindeki görev süresi fiili siyasi baskıyı ölçmeyebilir.

Rossi, Schomaker ve Baumann'ın itirazı teoriyi mantıksız kılmaz; ampirik
iddianın gücünü sınırlar. Bağımsızlık bazı koşullarda güvenilirliği artırabilir,
ama mali baskınlık, zayıf hukuk veya hedef çatışması varsa yasal metin tek başına
enflasyonu düşürmez.

Türkiye'nin 2001 sonrası çerçevesi bu ayrımı okumak için verimlidir. Yasa,
fiyat istikrarı amacı ve araç yetkisi önemliydi; sonraki dönemler ise fiili
bağımsızlığın yalnız mevzuatla korunmadığını gösterdi. 2021'de faiz kararları,
kur ve enflasyon beklentileri arasındaki kopuşu yalnız “yanlış oran” diye okumak
eksiktir: piyasa gelecekteki tepki fonksiyonunun değiştiğine hükmettiğinde
bugünkü kararın sinyali katlanır.

## Bu dersten sonra

2.1–2.4 merkez bankasının faizi ve bilançosunu hangi araçlarla değiştirdiğini
anlattı; bu ders aynı araçların etkisinin neden kurumsal güvenilirliğe bağlı
olduğunu gösterdi. 3.2'de politika faizinden harcama ve fiyatlara uzanan aktarım
kanallarını, 4.2'de beklentilerle genişletilmiş Phillips eğrisini kuracağız.
8.2'de mali baskınlık, bağımsızlığın bütçe rejiminden ayrı düşünülemeyeceğini
yeniden gösterecek; 8.3'te Türkiye'nin rejim değişimlerini bu çerçeveyle
okuyacağız.
