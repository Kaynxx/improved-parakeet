---
baslik: TÜFE'nin inşası, ikame yanlılığı ve ölçüm siyaseti
ozet: >-
  TÜFE doğada bulunan bir fiyat değil; sepet, ağırlık, kalite düzeltmesi ve
  imputasyon kararlarıyla üretilen bir endekstir. Bu ders TÜİK–ENAG ayrışmasını
  taraf seçerek değil, farklı ölçüm tasarımlarının hangi sorulara cevap verdiğini
  ve neden farklı sonuçlar üretebildiğini göstererek inceler.
sure: 55
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
kaynaklar:
  - tip: video
    baslik: TÜİK Enflasyonu Nasıl Hesaplıyor?
    url: https://www.youtube.com/watch?v=1GRV8eEN58Y
    kaynak: Haber Global
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      TÜİK'in sepet oluşturma, fiyat derleme ve ağırlıklandırma sürecini genel
      izleyici için görünür kılar. Tek bir enflasyon sayısının binlerce gözlem
      ile bir dizi yöntem kararından nasıl üretildiğini görmek için başlangıçtır.
  - tip: article
    baslik: Tüketici Fiyat Endeksi Metodoloji Dokümanı 2026
    url: https://veriportali.tuik.gov.tr/api/tr/data/downloads?t=r&p=BfoX9pFTLHGZrAqXytEEdQqL9Mj9Su2QECqEXOyEKM5v7Vow4oxbmEHVdYjwbavd0nVSD0SRu2FSpEIDfn42CDthfWyqnsXYhJZayD1Y0zxUwY32gvv9WuP5HeEkEg1R
    kaynak: TÜİK
    seviye: uzman
    ozet: >-
      Sepet güncellemesi, endeks formülü, kira imputasyonu, veri toplama ve
      Eurostat uyumu gibi tercihleri birincil kaynaktan açıklar. Resmî seriyi
      eleştirmek ya da savunmak için önce hangi işlemin gerçekten yapıldığını
      bu belgeden ayırmak gerekir.
  - tip: discussion
    baslik: Enflasyon Verilerine Güveniyor muyuz? TÜİK, ENAG ve Resmi Veri Tartışmasının Ekonometrik Anatomisi
    url: https://www.analizus.com/blog/enflasyon-verilerine-guveniyor-muyuz-tuik-enag-resmi-veri-tartismasi/
    kaynak: Analizus Blog
    seviye: ileri
    ozet: >-
      TÜİK ile ENAG arasındaki farkı sepet ağırlıkları, veri toplama, hedonik
      düzeltme ve mevsimsellik üzerinden ayrıştırır. Okuru “hangi sayı doğru”
      kutuplaşmasından çıkarıp yöntemlerin karşılaştırılabilirliği sorununa taşır.
sorular:
  - id: laspeyres-sepeti
    tip: sayisal
    puan: 25
    soru: >-
      Baz dönem harcama ağırlıkları gıdada %40, kirada %35, diğer mal ve
      hizmetlerde %25'tir. Fiyatlar sırasıyla %50, %20 ve %10 artarsa sabit
      ağırlıklı Laspeyres yaklaşımında enflasyon yüzde kaçtır?
    beklenen: 29.5
    tolerans: 0.1
  - id: tuik-enag-karsilastirma
    tip: acik
    puan: 40
    soru: >-
      Aynı ay için TÜİK ile ENAG'ın farklı enflasyon oranları yayımlaması neden
      tek başına taraflardan birinin hatalı olduğunu kanıtlamaz? İki endeksi
      karşılaştırmak için kurulması gereken ölçüm denetimini tasarla.
    olcut:
      - İki endeksin tüketim evreni, sepet kapsamı ve harcama ağırlıklarının aynı olup olmadığının karşılaştırılması gerektiğini söyler.
      - Mağaza ve anketör gözlemi ile web kazımanın ürün, satıcı, coğrafya ve fiyat türü bakımından farklı örneklemler üretebileceğini açıklar.
      - Ürün ikamesi, kaybolan fiyat imputasyonu ve kalite değişiminin iki yöntemde nasıl ele alındığının incelenmesini ister.
      - Aylık ve yıllık toplulaştırma, baz dönem ve revizyon kuralları eşitlenmeden sayıların doğrudan kıyaslanamayacağını belirtir.
      - Yöntem şeffaflığı ile sonuç düzeyinin birbirinden ayrı değerlendirilmesi gerektiğini kabul eder.
  - id: kimin-enflasyonu
    tip: acik
    puan: 35
    soru: >-
      Resmî TÜFE %50 iken düşük gelirli bir kiracının kendi yaşam maliyetinin
      %70 arttığını söylemesi istatistiksel bir çelişki midir? Temsili hane,
      ağırlıklar, kira ve ikame davranışı üzerinden yanıtla.
    olcut:
      - TÜFE'nin tek tek hanelerin değil, kapsanan nüfusun ortalama tüketim örüntüsünün endeksi olduğunu belirtir.
      - Düşük gelirli hanenin gıda ve kira ağırlıklarının ortalama sepetten yüksek olabileceğini somutlaştırır.
      - Yeni kiracı, mevcut kiracı ve ev sahibi için barınma maliyetinin aynı hızda değişmeyebileceğini açıklar.
      - Hane pahalanan üründen kaçamıyorsa resmî sepetin varsaydığından daha az ikame yapacağını ve daha yüksek maliyet yaşayabileceğini söyler.
---

## Enflasyon bulunmaz, inşa edilir

Bir kilo domatesin fiyatı gözlemdir. “Tüketici fiyatları bu ay yüzde kaç arttı?”
ise gözlem değil, binlerce fiyatı tek sayıya indiren bir ölçüm tasarısının
sonucudur. Hangi hanenin tüketimi temsil edilecek, hangi ürün izlenecek, ürün
ortadan kaybolursa yerine ne konacak, kalite değişimi fiyat değişiminden nasıl
ayrılacak? Bu sorular cevaplanmadan TÜFE yoktur.

Bu, endeksin keyfî olduğu anlamına gelmez. İstatistik kuralları, saha denetimi
ve yayımlanmış yöntemler karar alanını sınırlar. Fakat yöntem seçimi ortadan
kalkmaz. TÜİK–ENAG tartışmasının verimli biçimi “hangisi gerçek?” değildir;
**iki seri hangi evreni, hangi fiyatlarla ve hangi toplulaştırma kuralıyla
ölçüyor?** sorusudur. Güven tartışması ancak bu karşılaştırmadan sonra başlar.

## Sepet ve ağırlık: ortalama kimin ortalaması?

Basit bir Laspeyres endeksinde baz dönemin miktarları sabit tutulur:

> P_L(t) = Σ p_t q_0 / Σ p_0 q_0

Pratik anlatımıyla her ürün grubunun fiyat değişimi, baz dönemdeki harcama
payıyla ağırlıklandırılır. Gıda hane bütçesinin yüzde 40'ını oluşturuyorsa gıda
şoku endekste, payı yüzde 5 olan bir gruptan sekiz kat daha fazla yer tutar.
Ancak “ortalama hane” kimsenin gerçek hanesi olmayabilir. Düşük gelirli bir
kiracı gıda ve kiraya, yüksek gelirli bir ev sahibinden çok daha büyük pay
ayırır. Aynı fiyat vektörü iki haneye farklı yaşam maliyeti enflasyonu üretir.

Ağırlıkların güncellenmesi de nötr değildir. Sık güncelleme güncel tüketimi
yakalar; fakat kriz sırasında zorunlu olarak kısılan tüketimi yeni normal gibi
endekse taşıyabilir. Seyrek güncelleme karşılaştırılabilirliği korur; fakat
eskimiş bir sepeti sürükler. Burada tek kusursuz sıklık yoktur.

## İkame yanlılığı: tüketici aynı sepeti almaz

Portakal çok pahalanınca mandalinaya geçen tüketici, baz dönem sepetini aynen
satın almaz. Sabit sepet endeksi yine de portakal miktarını sabit varsayarsa
aynı fayda düzeyini sürdürmenin maliyetini fazla gösterebilir. Buna ikame
yanlılığı denir. Zincirleme endeksler ve daha sık ağırlık güncellemeleri bu
sorunu azaltır, tamamen çözmez: tüketicinin daha ucuz mala geçmesi bazen serbest
tercih değil, refah kaybıdır. “Daha ucuzunu aldı, maliyeti o kadar artmadı”
cümlesi kalite veya çeşit kaybını görünmez kılabilir.

Dolayısıyla TÜFE iki kavram arasında durur. Biri aynı fiziksel sepetin fiyatı,
diğeri aynı yaşam standardına ulaşmanın maliyetidir. İlki gözlenebilir ama
eskir; ikincisi iktisaden anlamlı ama fayda düzeyi gözlenemediği için model
gerektirir.

### Kalite değişimi fiyat değişimi değildir

Aynı model telefon piyasadan kalkıp daha güçlü bir model geldiğinde iki etiket
doğrudan karşılaştırılamaz. Fiyatın bir bölümü enflasyon, bir bölümü daha iyi
üründür. Hedonik yöntemler gözlenen özelliklerden kalite değerini tahmin eder;
eşdeğer ürün yöntemi benzer özellikte bir ikame arar. Hiç düzeltme yapmamak
kalite artışını enflasyon sayar, agresif düzeltme ise tüketicinin fiilen ödediği
daha yüksek tutarı görünmez kılabilir. Hizmet kalitesi daha da zordur: küçülen
porsiyon, uzayan bekleme veya düşen dayanıklılık barkodda yeni ürün olarak
görünmez. TÜİK ile alternatif endeks karşılaştırmasında aynı ürün kodunu görmek
bu nedenle yeterli değildir; kalite değişiminin hangi kuralla işlendiği de
sorulmalıdır.

## Kira, sahiplik ve imputasyon

Barınma endeksin en zor kalemidir. Piyasaya yeni çıkan bir evin ilan kirası,
yıllardır aynı evde oturan kiracının sözleşme kirası ve ev sahibinin konut
hizmeti aynı şey değildir. Sahip olduğu evde yaşayan hane açık bir kira
ödemese de konut hizmeti tüketir. Bazı endeks tasarımları bu hizmet için
“eşdeğer kira” imputasyonu yapar; bazıları nakit harcamaya daha yakın bir
kapsam seçer. Sonuç, özellikle kira rejimi değişirken ciddi biçimde ayrışır.

İmputasyon yalnız konutta görülmez. Bir ürün geçici olarak bulunamadığında
fiyatını önceki gözlemden taşımak, benzer ürünün değişiminden tahmin etmek ya da
ürünü örneklemden çıkarmak gerekir. Her seçenek farklı bir varsayım taşır.
İmputasyon sahte veri üretmek değildir; eksik gözlem karşısında endeksin
sürekliliğini koruma yöntemidir. Sorulması gereken, varsayımın açık, tutarlı ve
şok döneminde savunulabilir olup olmadığıdır.

## TÜİK–ENAG ayrışmasını nasıl okumalı?

TÜİK saha derlemesi, idari veriler ve belirlenmiş ağırlıklarla resmî bir tüketim
evrenini hedefler. ENAG gibi alternatif girişimler daha yüksek frekanslı çevrim
içi fiyatlardan yararlanabilir. Web kazıma çok sayıda gözlem sağlar; ama internet
satıcısı olmayan hizmetleri, fiilî işlem fiyatını, bölgesel kapsamı ve stokta
olmayan ürünü temsil etme sorunu taşır. Saha derlemesi daha geniş bir evrene
erişebilir; buna karşılık örneklem, imputasyon ve yayımlama şeffaflığına ilişkin
sorular doğurabilir.

Bu farklar “resmî olan doğrudur” sonucunu da “çok gözlem yapan doğrudur”
sonucunu da vermez. Gözlem sayısı, temsili örneklemin yerine geçmez. Kurumsal
statü de yöntemin denetlenebilirliğinin yerine geçmez. Sağlam karşılaştırma;
ürün eşleştirmesini, ağırlıkları, coğrafyayı, kalite düzeltmesini, kayıp fiyat
kuralını ve revizyon politikasını aynı tabloda inceler. Ardından farkın ne
kadarının tasarımdan, ne kadarının uygulamadan geldiğini sorar.

Endeksin ücret, emekli aylığı, vergi dilimi ve enflasyona endeksli tahvil gibi
sözleşmeleri değiştirmesi güven meselesini büyütür. Ölçüm hatası yalnız akademik
değildir; gelir ve serveti yeniden dağıtır. Tam da bu nedenle eleştiri sayı
karşılaştırmasından çok yöntem karşılaştırmasına dayanmalıdır.

## Bu dersten sonra

3.1'de reel faizin seçilen enflasyon ölçüsüne bağlı olduğunu gördük; şimdi o
paydanın da inşa edildiğini biliyoruz. 4.2'de Phillips eğrisine geçtiğimizde
ölçüm sorunu yeniden çıkacak: farklı çekirdek enflasyon, ücret ve işgücü açığı
ölçüleri eğimin kendisini değiştirebilir. 7.4'te “enflasyondan korunma” iddiasını
değerlendirirken ilk soru yine aynı olacak: hangi enflasyondan?
