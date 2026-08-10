---
baslik: Mali baskınlık ve fiyat düzeyinin mali teorisi
ozet: >-
  Bir merkez bankası bütçe rejiminden bağımsız olarak enflasyonu belirleyebilir
  mi? Bu ders mali baskınlığı, hükümetin dönemler arası bütçe kısıtını ve
  FTPL'nin fiyat düzeyi iddiasını kurar; teorinin güçlü teşhisi ile tartışmalı
  denge seçimini birbirinden ayırır.
sure: 55
onkosul:
  - hafta-02/zaman-tutarsizligi-ve-bagimsizlik
  - hafta-04/enflasyon-vergisi-ve-senyoraj
kaynaklar:
  - tip: video
    baslik: "Chapter 1: Fiscal Policy and Inflation with John Cochrane | LFHSPBC"
    url: "https://www.youtube.com/watch?v=tIA_UtvRQQU"
    kaynak: "PolicyEd"
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      FTPL'nin temel sezgisini, nominal kamu yükümlülükleri ile gelecekteki
      birincil fazlalar arasındaki bağ üzerinden kurar. Enflasyonu yalnız para
      arzına bağlayan açıklamanın hangi mali varsayımları sessizce yaptığını
      görmek için okunur.
  - tip: article
    baslik: "Explaining the Fiscal Theory of the Price Level"
    url: "https://www.minneapolisfed.org/research/quarterly-review/explaining-the-fiscal-theory-of-the-price-level"
    kaynak: "Federal Reserve Bank of Minneapolis, Quarterly Review"
    seviye: ileri
    ozet: >-
      Hükümet bütçe kısıtının FTPL içinde fiyat düzeyini belirleyen bir koşula
      nasıl dönüştüğünü sistematik biçimde açıklar. Parasal ve mali rejimlerin
      birlikte sınıflandırılması için kurumsal bir referans sağlar.
  - tip: discussion
    baslik: "The Fallacy of the Fiscal Theory of the Price Level – Once More"
    url: "https://willembuiter.com/fallacy2.pdf"
    kaynak: "Willem H. Buiter (21 Mayıs 2017)"
    seviye: uzman
    ozet: >-
      Bütçe kısıtını bir değerleme denklemi gibi kullanan FTPL yorumunun
      mantıksal olarak hatalı olduğunu savunan güçlü itirazdır. Teorinin
      teşhis gücüyle genel denge tutarlılığının aynı şey olmadığını sınamak
      için karşı cepheyi verir.
sorular:
  - id: ftpl-fiyat-duzeyi
    tip: sayisal
    puan: 25
    soru: >-
      Basitleştirilmiş bir FTPL ekonomisinde vadesi gelen nominal kamu
      yükümlülükleri 1.500 milyar TL, gelecekteki reel birincil fazlaların
      bugünkü değeri 1.000 milyar TL'dir. B/P = PV(S) değerleme koşuluna göre
      fiyat düzeyi P kaçtır?
    beklenen: 1.5
    tolerans: 0.01
  - id: butce-kisiti-mi-denge-mi
    tip: acik
    puan: 40
    soru: >-
      Hükümetin dönemler arası bütçe kısıtını bir muhasebe özdeşliği olarak
      okumak ile fiyat düzeyini belirleyen bir denge koşulu olarak okumak
      arasındaki farkı açıkla. Buiter'ın itirazının neden sıradan bir katsayı
      tartışması olmadığını göster.
    olcut:
      - Nominal borcun reel değerini B/P olarak, karşılığını gelecekteki birincil fazlaların bugünkü değeri olarak yazar.
      - Ricardocu rejimde mali politikanın her fiyat düzeyinde bütçe kısıtını sağlayacak biçimde fazlaları ayarladığını belirtir.
      - Ricardocu olmayan rejimde fazlaların fiyat düzeyinden bağımsız belirlendiğini ve P'nin uyum değişkeni olduğunu açıklar.
      - Buiter'ın bütçe kısıtının ihlal edilebilir bir davranış denklemi gibi kullanılmasına itiraz ettiğini belirtir.
      - Teorinin geçerliliğinin hangi değişkenin dışsal ve hangi politikanın pasif sayıldığına bağlı olduğunu sonuçlandırır.
  - id: bagimsiz-banka-yeter-mi
    tip: acik
    puan: 35
    soru: >-
      Yüksek borç ve kısa vade ortamında yasal olarak bağımsız bir merkez
      bankasının sert faiz artışı neden enflasyonu kalıcı biçimde düşürmeyebilir?
      Para ve maliye otoritelerinin tepkilerini, borç servis maliyetini ve
      beklentileri birlikte kur; FTPL lehine ve aleyhine birer yorum ver.
    olcut:
      - Faiz artışının talebi ve kur geçişkenliğini sınırlayarak dezenflasyon sağlayabileceği parasal kanalı açıklar.
      - Kısa vadeli borçta yükselen faiz giderinin gelecekteki açık veya parasallaştırma beklentisini büyütebileceğini belirtir.
      - Mali otorite birincil fazla üretmezse merkez bankasının bilançosu ya da enflasyon vergisi üzerinde baskı oluşacağını söyler.
      - FTPL lehine yorumda servet etkisi ve kamu yükümlülüklerinin reel değerlemesini kullanır.
      - FTPL aleyhine yorumda parasal sıkılığın mali uyum olmadan da belirli vadelerde fiyatları etkileyebileceğini ve teorinin tek denge iddiasının tartışmalı olduğunu belirtir.
---

## Merkez bankası tek başına mı?

Para politikası anlatılarında merkez bankası faizi seçer, özel kesim harcama
ve fiyatlama kararlarını değiştirir, enflasyon hedefe döner. Bu zincir, mali
otoritenin bütçesini sonunda uyarlayacağını varsayar. O varsayım kalkarsa faiz
kararının anlamı da değişir.

**Parasal baskınlıkta** maliye politikası, merkez bankasının fiyat istikrarı
hedefiyle uyumlu bir borç patikası üretir. Vergiler ya da harcamalar gerektiği
kadar ayarlanır. **Mali baskınlıkta** ise mali otorite birincil açık patikasını
önceden belirler; merkez bankası temerrüt, finansal çöküş veya parasallaştırma
arasında sıkışır. Yasal bağımsızlık bu aritmetiği ortadan kaldırmaz.

## Bütçe kısıtından fiyat düzeyine

Basitleştirilmiş bir dönemler arası ilişki şöyle yazılabilir:

> Bₜ₋₁ / Pₜ = PVₜ(S) + PVₜ(M)

Sol taraf, geçmişte çıkarılmış nominal kamu yükümlülüklerinin bugünkü reel
değeridir. Sağ taraf gelecekteki reel birincil fazlaların ve senyoraj
gelirlerinin bugünkü değeridir. Geleneksel okumada bu bir bütçe kısıtıdır:
hükümet borçlandıysa ileride vergi artırmalı, harcama kısmalı, senyoraj elde
etmeli veya temerrüde düşmelidir.

FTPL aynı ilişkiye daha iddialı bir rol verir. Gelecekteki fazlalar fiyat
düzeyinden bağımsız belirlenmişse nominal borcun reel değeri, dengeyi sağlayacak
fiyat düzeyi üzerinden ayarlanır:

> Pₜ = Bₜ₋₁ / PVₜ(S)

Nominal borç 1.500, beklenen reel fazlaların bugünkü değeri 1.000 ise P=1,5
olur. Hükümet hiçbir karşılık yaratmadan yeni nominal yükümlülük çıkardığında
hanehalkı kendini daha zengin sanıp harcamayı artırır; fiyatlar yükselerek bu
servet artışını geri alır. Bu anlatıda enflasyon için merkez bankasının para
basması gerekmez.

## Rejim ayrımı sonucu değiştirir

Bu denklemin fiyatı belirleyip belirlememesi politika rejimine bağlıdır.
**Ricardocu rejimde** mali otorite, hangi fiyat düzeyi oluşursa oluşsun bütçe
kısıtını sağlayacak fazlayı üretir. O zaman denklem P'yi seçmez; mali politika
P'ye uyar. **Ricardocu olmayan rejimde** fazlalar uyarlanmaz. P, nominal borcun
reel değerini mali karşılığa eşitleyen değişken olur.

Aynı anda hem merkez bankasının fiyat düzeyini hem mali otoritenin reel fazla
patikasını koşulsuz seçebildiğini söyleyemeyiz. İki otoritenin tepki
fonksiyonlarından biri “pasif” olmak zorundadır. FTPL'nin kalıcı katkısı bu
koordinasyon problemine sert ışık tutmasıdır: fiyat istikrarı, yalnız merkez
bankası sözleşmesine bırakılamaz.

Buradaki “aktif” ve “pasif” gündelik dilde güçlü ve zayıf anlamına gelmez.
Aktif para politikası enflasyona karşı faizi yeterince sert artırırken maliye
borcu istikrara kavuşturacak fazlayı üretir. Aktif maliye ise fazlayı fiyat
düzeyine göre ayarlamaz; bu durumda para politikasının kamu yükümlülüklerinin
reel değerini doğrulayacak bir patikaya uyum sağlaması gerekir. İki taraf aynı
anda kendi nominal çıpasını dayatırsa modelde denge bulunmayabilir; ikisi de
uyum sağlarsa birden fazla fiyat patikası doğabilir. Teori, bir denklemden çok
bu rejim kapanışıdır.

## İtiraz: özdeşlik davranış denklemi değildir

Tartışma burada başlar. Buiter'ın itirazı, mali açıkların enflasyonla ilgisiz
olduğu değildir. İtiraz, hükümetin dönemler arası bütçe kısıtının herhangi bir
fiyat düzeyinde ihlal edilebilen bir piyasa temizleme koşulu gibi
kullanılmasıdır. Bir ödeme gücü koşulunu, nominal tahvilin değerleme denklemi
saymak yanlış denge seçebilir; temerrüt olasılığını ya da başka varlıkların
fiyatlarını dışarıda bırakabilir.

FTPL savunucusu buna devlet yükümlülüklerinin hanehalkı serveti olduğunu,
fiyatların bu varlık için de arz-talep dengesini kurduğunu söyleyerek cevap
verir. Eleştirmen ise model kapanışının sonucu baştan kurduğunu söyler.
Dolayısıyla anlaşmazlık “maliye önemlidir” önermesinde değil, fiyat düzeyinin
tekil biçimde nasıl belirlendiğindedir.

## Faiz artışı neden ters sonuç verebilir?

Borç kısa vadeli ve yeniden fiyatlanıyorsa politika faizi yükseldiğinde kamu
faiz gideri hızla artar. Mali otorite daha yüksek birincil fazla taahhüt
etmezse özel kesim gelecekte vergi değil yeni borç ya da parasallaştırma
bekleyebilir. Nominal servet ve enflasyon beklentisi kanalı, talebi daraltan
klasik faiz kanalına karşı çalışır. Bazı FTPL modellerindeki “faiz artışı
enflasyonist olabilir” sonucu buradan çıkar.

Bu sonuç mekanik değildir. Borcun vadesi uzunsa, mali çerçeve güvenilir
biçimde sıkılaşıyorsa ve faiz artışı kuru istikrara kavuşturuyorsa ilk etki
dezenflasyonist olabilir. Şu nedenle “yüksek faiz enflasyon yaratır” sloganı
FTPL değildir: hangi borç yapısı, hangi mali tepki ve hangi beklenti rejimi
olduğunu söylemez.

Türkiye'de 2001 sonrasında güçlü birincil fazla, bankacılık reformu ve merkez
bankası bağımsızlığının birlikte kurulması rastlantı değildi. Sadece faiz
kararı değil, faiz kararını mali olarak taşıyacak rejim güven verdi. Buna
karşılık kamu bankaları, kur korumalı yükümlülükler veya bütçe dışı riskler
arttığında görünen borç oranı mali baskıyı eksik ölçebilir.

Borç kompozisyonu da toplam borç kadar önemlidir. Borç döviz cinsindeyse fiyat
düzeyindeki artış yükümlülüğün reel değerini aynı ölçüde eritmez; kur artışı
yükü büyütebilir. Borç enflasyona endeksliyse enflasyonla yeniden değerleme
kanalı zayıflar. Sabit faizli uzun vadeli yerli para borcu ise beklenmedik
enflasyonla reel olarak aşınır. Dolayısıyla FTPL'nin basit B/P anlatısını
Türkiye'ye uygulamadan önce para birimi, vade ve endeksleme haritası çıkarılmalıdır.

Aynı titizlik senyoraj için geçerlidir. Para tabanını büyütmek kısa vadede
gelir yaratabilir; fakat beklenen enflasyon para talebini düşürdükçe vergi
tabanı daralır. 4.5'teki Laffer tipi sınır, mali baskınlığın sonsuz finansman
kaynağı olmadığını gösterir. Enflasyon hızlandığında daha fazla parasallaştırma
aynı reel geliri bile üretmeyebilir.

## Bu dersten sonra

2.5'teki bağımsızlık tartışması artık daha keskin: araç bağımsızlığı, mali
otorite bilanço sonucunu üstlenmiyorsa yeterli değildir. 4.5'teki senyoraj da
sadece basılan para geliri değil, mali uyumsuzluğun çözüm yollarından biridir.
8.3'te Türkiye'nin 2001-2026 patikasını bu ortak rejim merceğiyle okuyacağız;
ama her enflasyon hareketini FTPL diye etiketlemeyeceğiz.
