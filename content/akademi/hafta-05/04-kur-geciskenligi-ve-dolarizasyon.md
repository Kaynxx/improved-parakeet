---
baslik: Kur geçişkenliği, dolarizasyon ve bilanço etkisi
ozet: >-
  Kur geçişkenliği sabit bir katsayı değil; rejime, konjonktüre, beklentilere
  ve firmanın fiyatlama gücüne bağlı bir süreçtir. Bu ders dolarizasyonun kur
  şokunu fiyatlar kadar bilançolar ve güven üzerinden de büyüttüğü koşulları,
  nedenselliğin hangi yönde işlediği tartışmasıyla birlikte inceler.
sure: 50
onkosul:
  - hafta-04/tufe-nin-insasi
  - hafta-05/imkansiz-ucleme-ve-kuresel-finansal-dongu
kaynaklar:
  - tip: video
    baslik: >-
      Sesli Ekonomi Bölüm 18: Enflasyon-kur geçişkenliği
    url: https://www.youtube.com/watch?v=sz6XhRbDcQc
    kaynak: CNBC-e (Sesli Ekonomi, Mahfi Eğilmez & Servet Yıldırım)
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Türkiye'de kur değişiminin enflasyona ne kadar ve ne hızda yansıdığını
      konjonktür ve beklentiler üzerinden tartışır. Tek bir mekanik geçişkenlik
      katsayısı kullanmanın neden yanıltıcı olduğunu somut örneklerle gösterir.
  - tip: article
    baslik: Kurdan enflasyona geçiş
    url: https://tcmbblog.org/wps/wcm/connect/blog/tr/main+menu/analizler/kurdan_enflasyona_gecis
    kaynak: TCMB (Merkezin Güncesi blogu, 2017)
    seviye: ileri
    ozet: >-
      Bir yıllık kümülatif geçişkenliğin tarihsel ortalamasını ve ekonomik
      toparlanma ile yavaşlama dönemlerinde nasıl değiştiğini TCMB analiziyle
      ölçer. Maliyet, beklenti ve bilanço kanallarını aynı çerçevede izlemek için
      birincil kurumsal kaynaktır.
  - tip: discussion
    baslik: Döviz Kurunun Ekonomik Kararlar Üzerindeki Etkisi
    url: https://www.mahfiegilmez.com/2018/11/dolar-kurunun-kararlar-uzerindeki-etkisi.html
    kaynak: Mahfi Eğilmez (kişisel blog, 2018)
    seviye: orta
    ozet: >-
      2018 şoku çevresinde dolarizasyon, kur ve güven göstergeleri arasındaki
      bağı Türkiye verisiyle anlatır. Resmî geçişkenlik hesabının dışında kalan
      karar ve güven kanalını görmek, nedenselliğin iki yönünü tartışmak için okunur.
sorular:
  - id: geciskenlik-hesabi
    tip: sayisal
    puan: 20
    soru: >-
      TL kalıcı olarak %20 değer kaybediyor. Bir yıllık kümülatif kur
      geçişkenliği %25 ise, diğer her şey sabitken tüketici fiyat düzeyine ek
      etki kaç yüzde puandır? Geçişkenliği kur değişiminin fiyatlara yansıyan
      oranı olarak kullan.
    beklenen: 5
    tolerans: 0.1
  - id: sabit-katsayi-yanilgisi
    tip: acik
    puan: 40
    soru: >-
      TCMB analizinde bir yıllık geçişkenlik tarihsel olarak yaklaşık %15 iken
      toparlanmada %25'e çıkıp yavaşlamada %10'un altına inebiliyor. Aynı kur
      şokunun neden farklı enflasyon ürettiğini mikro fiyatlama davranışıyla açıkla.
    olcut:
      - Talep güçlü olduğunda firmaların maliyet artışını satış fiyatına daha kolay yansıttığını belirtir.
      - Marj sıkıştırma ile fiyat artırma arasındaki tercihin rekabet ve finansman koşullarına bağlı olduğunu açıklar.
      - Kur şokunun kalıcı olduğu beklentisinin erken ve daha büyük fiyat ayarlamasını teşvik ettiğini söyler.
      - İthal girdi payı ve sözleşme para biriminin sektörler arasında geçişkenliği farklılaştırdığını belirtir.
      - Geçişkenliğin seçilen TÜFE sepeti, ufuk ve kur şoku tanımına bağlı ölçülen bir katsayı olduğunu kabul eder.
  - id: dolarizasyon-bilanco-sarmali
    tip: acik
    puan: 40
    soru: >-
      Varlıkları TL, borçları dolar olan bir firma kesimi ile hanelerin döviz
      mevduatına yöneldiği bir ekonomide kur şoku nasıl kendi kendini
      güçlendiren enflasyon ve daralma sarmalı yaratabilir?
    olcut:
      - TL değer kaybının döviz borcunun TL karşılığını artırarak net serveti düşürdüğünü belirtir.
      - Zayıflayan net servetin teminatı, krediyi ve yatırımı daraltan bilanço etkisini açıklar.
      - Hanelerin kur beklentisiyle döviz talebini artırmasının spot kur baskısını büyütebileceğini söyler.
      - İthal girdi maliyeti ve beklenti kanallarının kur şokunu tüketici fiyatlarına taşıdığını belirtir.
      - Merkez bankasının faiz artışıyla kuru sınırlama ve borçlunun nakit akışını sıkıştırma arasında kaldığını açıklar.
      - Dolar varlığı olan herkesin kaybetmediğini, dağılımın net döviz pozisyonuna bağlı olduğunu kabul eder.
---

## Bir katsayı değil, bir rejim özelliği

Kur geçişkenliği, döviz kurundaki değişimin yerli fiyatlara ne ölçüde ve hangi
hızda yansıdığını anlatır. Basit bir gösterimle fiyat düzeyindeki değişimin kur
değişimine oranıdır:

> PT(h) = ΔP(h) / ΔS

`h` ufku belirtir. Üç aylık geçişkenlik ile bir yıllık geçişkenlik aynı sayı
değildir. Tüketici fiyatı, üretici fiyatı ve ithalat fiyatı için de aynı sayı
beklenmez. “Türkiye'de geçişkenlik yüzde 20” cümlesi; ufuk, fiyat endeksi, şokun
tanımı ve örneklem dönemi söylenmiyorsa tamamlanmamış bir cümledir.

İlk kanal ithal maliyetidir. Nihai ithal malın TL fiyatı kurla yükselir; yerli
görünen üretim de enerji, makine ve ara malı kullandığı için etkilenir. Fakat
maliyet artışı ile raf fiyatı arasında firmanın marjı vardır. Talep zayıfsa firma
maliyetin bir bölümünü marjından karşılayabilir. Talep güçlü, finansman pahalı
ve stok yenileme maliyeti belirsizse fiyatı daha erken ve daha fazla artırır.

Bu yüzden geçişkenlik yapısal bir sabit değildir. TCMB analizindeki yaklaşık
%15'lik bir yıllık tarihsel ortalamanın toparlanma dönemlerinde %25'e çıkıp
yavaşlamada %10'un altına inebilmesi hata değil, mekanizmanın kendisidir.
Ortalama, farklı rejimlerin ağırlıklı özetidir; bir sonraki şoka otomatik
uygulanacak parametre değildir.

Geçişkenlik doğrusal ve simetrik olmak zorunda da değildir. Küçük kur hareketi
marj içinde emilirken büyük bir sıçrama fiyat listesini topluca yeniletebilir.
Değer kaybı hızla fiyatlanırken değer kazancı, firmalar önce eriyen marjlarını
onarmayı seçtiği için daha yavaş yansıyabilir. Geçici ve kalıcı şok ayrımı ancak
beklentilerle birlikte yapılır. İlk turda ithal mal fiyatı, ikinci turda ücret,
kira ve hizmet fiyatı tepki verir; ikinci tur güçlendikçe başlangıçtaki kur
şokunun izi uzar. Bu nedenle para politikası açısından kritik soru yalnız ilk
yıl katsayısı değil, şokun fiyatlama sıklığını ve enflasyon beklentisini kalıcı
olarak değiştirip değiştirmediğidir. Rejim değişince geçmiş ortalama politika
simülasyonunda güvenilir kalmaz.

## Beklenti kanalı: maliyet gelmeden fiyat

Firmalar yalnız bugünkü faturaya bakmaz. Kur artışının geçici olduğuna
inanıyorlarsa menü maliyeti ve müşteri kaybı nedeniyle bekleyebilirler. Yeni bir
değer kaybı dalgası bekliyorlarsa henüz yerine koymadıkları stokun maliyetini
bugünden fiyatlarlar. Fiyatlama sıklığı artar, vadeler kısalır ve kur zihinsel
hesap birimine dönüşür.

Burada nedensellik iki yönlüdür. Kur şoku enflasyonu artırır; fakat yüksek ve
çıpalanmamış enflasyon beklentisi de yerli paradan kaçışı hızlandırarak kuru
yükseltir. Aynı gün açıklanan kur ve fiyat hareketinden tek yönlü bir katsayı
çıkarmak bu eşanlılığı ihmal eder. Para politikası şoku, küresel risk iştahı ya
da enerji fiyatı gibi dışsal bir hareket tanımlanmadan “kur enflasyona neden
oldu” tahmini korelasyon olarak kalabilir.

4.1'in ölçüm sorunu da geri döner. TÜFE sepetinde ithal yoğun kalemlerin ağırlığı,
kontrollü fiyatların güncellenme zamanı ve ikame davranışı ölçülen geçişi
değiştirir. Aynı şok üretici fiyatlarında hızla, tüketici fiyatlarında gecikmeli
görünebilir.

## Dolarizasyon iki taraflı bir bilanço meselesidir

Dolarizasyon yalnız döviz mevduatının toplam mevduata oranı değildir. Fiyatların,
sözleşmelerin ve borçların hangi parayla kurulduğu önemlidir. Para ikamesinde
hane tasarruf aracını döviz seçer. Yükümlülük dolarizasyonunda firma geliri TL
iken dolar borçlanır. İkincisi kur şokunu doğrudan net servet şokuna çevirir.

Basitleştirilmiş firma bilançosunda TL varlıkların değeri değişmezken dolar
borcun TL karşılığı kurla birlikte büyür. Net servet düşer, teminat oranı bozulur,
banka kredi limitini kısar. Firma yatırım ve istihdamı azaltır. Buna bilanço
etkisi denir; kur değer kaybının ihracatı canlandıran rekabet kanalını tersine
çevirebilir. Döviz geliri olan ihracatçı ise aynı şoktan korunabilir. Sonuç,
ekonominin brüt dolarizasyonundan çok sektörlerin net açık pozisyonuna bağlıdır.

Hane tarafında döviz mevduatı kur kaybına karşı sigorta sağlar, fakat topluca
dövize geçiş spot talebi artırır. Kur yükseldikçe korunma talebi, korunma talebi
arttıkça kur yükselebilir. Bu bir koordinasyon problemidir. Güvenilir dezenflasyon
tek tek hanelerin döviz satmasını makul kılar; güven kaybı ise herkes için aksi
yönde rasyonel davranış yaratır.

## 2018 Türkiye deneyimi neyi ayırmıyor?

2018'de liranın sert değer kaybı, ithal maliyet, beklenti, güven ve bilanço
kanallarını aynı anda çalıştırdı. Yabancı para mevduat oranının yüksek kalması
yalnız geçmiş enflasyonun izi değildi; yeni değer kaybı beklentisinin de
göstergesiydi. Üretici güvenindeki bozulma hem kurun sonucu hem yatırımı ve dış
finansman talebini değiştiren yeni bir nedendi.

Bu eşanlılık politika tartışmasını zorlaştırır. Sert faiz artışı kuru ve
beklentiyi sınırlayarak geçişkenliği düşürebilir; aynı anda kredi maliyetini
artırıp bilançoları sıkıştırır. Faizi artırmamak kısa dönem nakit akışını korur
ama daha büyük kur şoku üzerinden ithal maliyeti ve döviz borcunu ağırlaştırabilir.
Tek araçla iki bilanço tarafını aynı anda korumak mümkün değildir.

## Bu dersten sonra

5.1'de fiyat düzeyinin reel kuru nasıl kurduğunu görmüştük; burada kurun fiyat
düzeyini geri beslediğini gördük. 5.5'te rezerv satışı ve KKM gibi araçların bu
kur-beklenti sarmalını faiz dışında durdurma iddiasını inceleyeceğiz. 8.4'te
dolarizasyonun enflasyon düştükten sonra neden kalıcı olabildiğini, yani
histerezisini ayrı bir rejim problemi olarak ele alacağız.
