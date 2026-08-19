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

## Olay Yeri: Enflasyon Bir Gözlem Değil, İnşadır

Bir kilo domatesin fiyatı doğrudan bir gözlemdir. Ancak "Tüketici fiyatları bu ay yüzde kaç arttı?" sorusunun yanıtı doğada bulunmaz; binlerce fiyat noktasını tek bir sayıya indirgeyen algoritmik ve metodolojik bir ölçüm tasarısının sonucudur. Hangi hanenin tüketim profilinin referans alınacağı, ürünlerin piyasadan çekilmesi durumunda hangi ikamenin yapılacağı veya kalite değişiminin fiyat hareketinden nasıl izole edileceği belirlenmeden TÜFE hesaplanamaz.

Bu durum, endeksin keyfî olduğu anlamına gelmez. İstatistiksel standartlar, saha denetimi ve yayımlanmış metodolojiler bu karar uzayını sınırlar. TÜİK–ENAG ayrışmasına yönelik adli veri incelemesi "Hangisi gerçek?" sorusuyla değil, **"İki farklı zaman serisi hangi tüketim evrenini, hangi fiyat derleme yöntemiyle ve hangi toplulaştırma kuralıyla ölçüyor?"** sorusuyla başlar. İstatistiksel güvenilirlik, ancak bu metodolojik otopsi tamamlandıktan sonra tartışılabilir.

## Kanıt A: Sepet, Ağırlıklar ve Temsiliyet Yanılsaması

Sabit ağırlıklı bir Laspeyres endeksi, baz dönemin tüketim miktarlarını referans alır:

> P_L(t) = Σ p_t q_0 / Σ p_0 q_0

Bu formülün pratik karşılığı, her ürün grubundaki fiyat değişiminin, baz dönemdeki harcama payıyla çarpılarak ağırlıklandırılmasıdır. Ancak makroekonomik "ortalama hane", mikro düzeyde hiçbir gerçek hanenin harcama kalıbıyla tam olarak örtüşmez. 

Aşağıdaki etkileşimli model, varsayımsal sayılar üzerinden resmî sepet ağırlıkları ile düşük gelirli bir kiracının kişisel sepet ağırlıklarının nasıl asimetrik enflasyon oranları üretebileceğini göstermektedir. Bu tablo, resmî verinin matematiksel olarak hatalı olduğunu **kanıtlamaz**; yalnızca tek bir makro endeksin, farklı gelir gruplarındaki yaşam maliyeti şoklarını ölçmekte neden yetersiz kalabileceğini ve temsiliyetin sınırlarını ortaya koyar.

```etkilesim
{
  "tur": "tufe-sepeti",
  "baslik": "Ağırlıklandırma Sapması: Ortalama Hane vs. Düşük Gelirli Kiracı",
  "kalemler": [
    {
      "ad": "Gıda",
      "fiyatDegisimiYuzde": 50,
      "resmiAgirlik": 25,
      "kisiselAgirlik": 40
    },
    {
      "ad": "Kira",
      "fiyatDegisimiYuzde": 80,
      "resmiAgirlik": 5,
      "kisiselAgirlik": 35
    },
    {
      "ad": "Diğer Mal ve Hizmetler",
      "fiyatDegisimiYuzde": 20,
      "resmiAgirlik": 70,
      "kisiselAgirlik": 25
    }
  ]
}
```

Ağırlıkların güncellenme frekansı da nötr bir karar değildir. Sık güncelleme, güncel tüketim kalıplarını yakalar ancak kriz dönemlerinde zorunlu olarak kısılan harcamaları (refah kaybını) "yeni normal" olarak endekse entegre edebilir. Seyrek güncelleme ise zaman serisinde karşılaştırılabilirliği korur, fakat eski bir tüketim sepetini geleceğe taşır.

## Kanıt B: İkame Yanlılığı ve Kalite Düzeltmesi

Tüketici davranışı statik değildir. Portakalın nispi fiyatı arttığında mandalinaya yönelen tüketici, baz dönem sepetini terk eder. Sabit sepet endeksi, portakal miktarını sabit varsayarak aynı fayda düzeyini sürdürmenin maliyetini yukarı yönlü saptırabilir (ikame yanlılığı). Zincirleme endeksler bu sorunu hafifletse de, daha ucuz mala geçişin her zaman serbest bir tercih değil, bazen net bir refah kaybı olduğu gerçeğini ortadan kaldırmaz.

Daha karmaşık bir veri sorunu ise kalite değişimidir. Bir teknolojik ürün piyasadan kalkıp yerine daha üst donanımlı bir model geldiğinde, iki etiket fiyatı doğrudan karşılaştırılamaz. Fiyat farkının ne kadarının saf enflasyon, ne kadarının "daha iyi ürün" primi olduğu ayrıştırılmalıdır:

1. **Hedonik Yöntemler:** Gözlemlenebilir özelliklerden kalite değerini ekonometrik olarak tahmin eder.
2. **Eşdeğer Ürün Yöntemi:** Piyasadan kalkan ürünün yerine, benzer özelliklere sahip bir ikame arar.

Hiç düzeltme yapmamak kalite artışını enflasyon olarak kaydederken, agresif bir kalite düzeltmesi tüketicinin cebinden çıkan fiilî artışı istatistiksel olarak görünmez kılabilir. Hizmet sektöründeki gizli kalite düşüşleri (küçülen porsiyonlar, uzayan bekleme süreleri) ise barkod verisine yansımadığı için tespiti en zor anomalilerdir.

## Kanıt C: Barınma Maliyeti ve İmputasyon (Atama) Algoritmaları

Barınma, enflasyon ölçümünün en kırılgan bileşenidir. Piyasaya yeni sürülen bir kiralık konutun ilan fiyatı, mevcut kiracının yenilenen sözleşme fiyatı ve kendi evinde oturan ev sahibinin tükettiği "konut hizmeti" birbirinden farklı veri setleri üretir. Bazı endeks tasarımları ev sahipleri için "eşdeğer kira" imputasyonu (ataması) yaparken, diğerleri yalnızca nakit harcamaları kapsar.

İmputasyon sadece konut piyasasına özgü değildir. Bir ürünün fiyatı geçici olarak derlenemediğinde, veri setindeki boşluk rastgele bırakılamaz. Önceki fiyatı taşımak, benzer ürünlerin ortalama değişimini yansıtmak veya ürünü örneklemden çıkarmak gibi algoritmik kararlar alınır. İmputasyon sahte veri üretmek değil, endeksin matematiksel sürekliliğini korumaktır. Adli incelemede sorulması gereken, bu varsayımların şok dönemlerinde ne kadar savunulabilir olduğudur.

## Çapraz Sorgu: TÜİK ve ENAG Veri Setlerinin Karşılaştırmalı Anatomisi

TÜİK; saha anketörleri, idari kayıtlar ve hanehalkı bütçe anketlerinden elde edilen ağırlıklarla resmî bir tüketim evrenini hedefler. ENAG gibi alternatif ölçümler ise yüksek frekanslı çevrim içi fiyat verilerini (web scraping) kullanır. 

Web kazıma teknolojisi devasa bir gözlem havuzu sunar; ancak internet üzerinden satılmayan hizmetleri, pazarlık payı içeren fiilî işlem fiyatlarını ve bölgesel asimetrileri ölçmekte kör noktalara sahiptir. Saha derlemesi ise daha geniş bir tüketim evrenine ulaşır, fakat örneklem seçimi, imputasyon kuralları ve yayımlama şeffaflığı açısından dışsal denetime daha fazla ihtiyaç duyar.

İki endeksi karşılaştırmak için şu parametrelerin eşitlenmesi veya farklarının izole edilmesi gerekir:
* Ürün ve madde sepeti eşleştirmeleri
* Harcama ağırlıkları ve baz dönem tercihleri
* Coğrafi kapsam ve fiyat türü (etiket vs. işlem)
* Kalite düzeltmesi ve kayıp veri (imputasyon) kuralları

Gözlem sayısının büyüklüğü, temsili bir örneklemin yerini tutamaz. Benzer şekilde, kurumsal statü de metodolojik şeffaflığın ikamesi olamaz.

## Adli İnceleme Sonucu: Dağılımsal Etki ve İleriye Dönük İzler

Enflasyon ölçümündeki metodolojik sapmalar yalnızca akademik bir tartışma konusu değildir; ücret sözleşmelerini, emekli aylıklarını, vergi dilimlerini ve enflasyona endeksli tahvillerin getirilerini doğrudan belirleyerek ekonomide devasa bir gelir ve servet transferine yol açar. 

Bu veri adli incelemesi, makroekonomik göstergelerin ardındaki inşa sürecini deşifre etmiştir. Reel faiz hesaplamalarında, Phillips eğrisindeki ücret-enflasyon dinamiklerinde veya finansal piyasalardaki "enflasyondan korunma" stratejilerinde kullanılacak verinin kalitesi, bu derste incelenen metodolojik tercihlerin sağlamlığına bağlıdır. Analiz edilen her makroekonomik modelde, paydadaki enflasyon verisinin hangi varsayımlarla üretildiği sorusu, iktisadi teşhisin ilk adımı olmaya devam edecektir.
