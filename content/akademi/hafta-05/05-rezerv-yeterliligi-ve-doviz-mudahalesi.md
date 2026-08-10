---
baslik: Rezerv yeterliliği, döviz müdahalesi ve melez araçlar
ozet: >-
  Rezerv yeterliliği brüt stoktan değil, hangi şoka karşı hangi kaynakların
  gerçekten kullanılabildiğinden anlaşılır. Bu ders döviz müdahalesinin hangi
  kanallarda etkili olabileceğini ve KKM gibi melez araçların maliyetinin neden
  karşı-olgusal senaryo olmadan tek sayıya indirgenemeyeceğini tartışır.
sure: 55
onkosul:
  - hafta-01/merkez-bankasi-bilancosu
  - hafta-05/kur-geciskenligi-ve-dolarizasyon
kaynaklar:
  - tip: video
    baslik: >-
      The ECB Explains: foreign reserves
    url: https://www.youtube.com/watch?v=KDojY6NVbrU
    kaynak: European Central Bank
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Merkez bankalarının rezervi ödemeler dengesi tamponu, güven ve müdahale
      kapasitesi için neden tuttuğunu resmi kurum anlatımıyla kurar. Rezerv
      stokunun kur rejimi ve güvenilirlikle bağını görmek için başlangıçtır.
  - tip: article
    baslik: Assessing Reserve Adequacy — Specific Proposals
    url: https://www.imf.org/external/np/pp/eng/2014/121914.pdf
    kaynak: IMF Policy Paper (2014)
    seviye: uzman
    ozet: >-
      IMF'nin kısa vadeli dış borç, geniş para, ihracat ve diğer yükümlülükleri
      birlikte tartan ARA yaklaşımını somutlaştırır. Tek bir ithalat ayı ya da
      rezerv/borç oranının bütün kriz kanallarını neden kapsamadığını gösterir.
  - tip: discussion
    baslik: >-
      Mahfi Eğilmez KKM'nin yükünü açıkladı: Hakan Kara 'Hesaplamaların hepsi eksik' dedi
    url: https://www.dunya.com/ekonomi/mahfi-egilmez-kkm-maliyetini-hesaplamisti-prof-dr-hakan-kara-hesaplamalarin-hepsi-eksik-dedi-haberi-791186
    kaynak: Dünya Gazetesi
    seviye: orta
    ozet: >-
      KKM'nin gerçekleşen maliyetini hesaplayan yaklaşım ile “KKM olmasaydı ne
      olurdu?” karşı-olgusunu isteyen itirazı yan yana getirir. Melez bir aracın
      maliyet-fayda hesabında uzlaşmanın nerede bittiğini Türkiye örneğiyle gösterir.
sorular:
  - id: ara-yeterlilik-orani
    tip: sayisal
    puan: 25
    soru: >-
      Basitleştirilmiş bir ARA metriği kısa vadeli dış borcun %30'unu, diğer
      portföy yükümlülüklerinin %15'ini, geniş paranın %5'ini ve yıllık ihracatın
      %5'ini risk ağırlıklı ihtiyaç saysın. Değerler sırasıyla 100, 40, 200 ve
      80 milyar dolar; kullanılabilir rezerv 60 milyar dolardır. Rezerv/ARA
      ihtiyacı oranı yüzde kaçtır?
    beklenen: 120
    tolerans: 0.5
  - id: brut-net-kullanilabilir
    tip: acik
    puan: 35
    soru: >-
      Bir merkez bankasının brüt rezervi yükselirken net ve kullanılabilir
      rezervi neden düşebilir? Swap, zorunlu karşılık ve kısa vadeli dış borç
      vadesini birlikte kullanarak yeterlilik değerlendirmesi yap.
    olcut:
      - Brüt rezervin merkez bankası bilançosundaki toplam yabancı para varlığını gösterdiğini belirtir.
      - Swapla alınan dövizin karşılığında geri ödeme yükümlülüğü bulunduğunu ve net rezervi artırmayabileceğini açıklar.
      - Bankalara ait döviz zorunlu karşılıklarının merkez bankasında görünse de serbestçe harcanmasının finansal istikrar maliyeti taşıdığını söyler.
      - Kısa vadeli dış borç vadesinin rezerv talebinin zamanlamasını belirlediğini Guidotti-Greenspan mantığıyla ilişkilendirir.
      - İthalat, M2 ve portföy çıkışı gibi farklı şokların farklı yeterlilik ölçütleri gerektirdiğini belirtir.
      - Tek bir brüt rezerv sayısının likidite, mülkiyet ve koşullu yükümlülükleri gizlediği sonucuna varır.
  - id: kkm-karsi-olgusu
    tip: acik
    puan: 40
    soru: >-
      KKM için gerçekleşen kur farkı ödemelerini toplayıp “toplam maliyet budur”
      demek neden eksik, buna karşılık her kur istikrarını KKM'ye yazmak neden
      aynı ölçüde sorunludur? Savunulabilir bir karşı-olgusal değerlendirme kur.
    olcut:
      - Doğrudan maliyete Hazine veya merkez bankası tarafından ödenen kur farkı ve faiz bileşenlerini dahil eder.
      - KKM olmasaydı mevduatın ne kadarının dövize, TL mevduata veya başka varlıklara gideceğine ilişkin açık varsayım kurar.
      - Alternatif senaryoda kur, enflasyon, politika faizi ve Hazine borçlanma maliyetinin birlikte değişebileceğini belirtir.
      - KKM'nin spot döviz talebini ertelemesinin fayda, vade sonunda yenilenmeme riskinin koşullu yükümlülük olduğunu açıklar.
      - Programın dağılımsal etkisini, kur riskinin mevduat sahibinden kamu bilançosuna aktarılması olarak tartışır.
      - Tek bir gözlenen patikanın nedensel etkiyi tanımlamadığını ve birden fazla karşı-olgusal senaryoyla duyarlılık analizi gerektiğini söyler.
---

## Rezerv hangi şoka karşı yeterli?

“Merkez bankasının rezervi kaç milyar dolar?” kolay, “yeterli mi?” zor sorudur.
Yeterlilik stokun kendisinden değil, karşılanacak döviz talebinin kaynağı ve
zamanından doğar. İthalat faturasını ödemek, bir yıl içinde vadesi gelen dış
borcu çevirmek, yerleşiklerin döviz talebini karşılamak ve portföy çıkışını
yumuşatmak aynı risk değildir.

Geleneksel ölçüler bu risklerden birini seçer. İthalat ayı ölçüsü cari işlemler
şokuna bakar. Guidotti-Greenspan kuralı, rezervin bir yıl içinde vadesi gelen dış
borcu karşılamasını ister; piyasa bir yıl kapalı kalsa ülke borcunu yeni kaynak
bulmadan ödeyebilsin. Rezerv/M2 oranı, yerleşiklerin yerli paradan dövize kaçış
potansiyeline yaklaşır. IMF'nin ARA çerçevesi kısa vadeli borç, diğer portföy
yükümlülükleri, geniş para ve ihracat gelirini risk ağırlıklarıyla birleştirir;
%100-150 bandını bir değerlendirme bölgesi olarak kullanır.

Hiçbiri evrensel doğru değildir. Sermaye hesabı kapalı bir emtia ihracatçısı ile
kısa vadeli portföy akımlarına açık bir ekonomi aynı ağırlıkları taşımamalıdır.
ARA tek sayı üretir ama o sayı açık varsayımların sıkıştırılmış halidir.

## Brüt, net ve gerçekten kullanılabilir

Brüt rezerv merkez bankasının yabancı para varlıklarını gösterir. Bu varlıkların
tamamı merkez bankasının koşulsuz özkaynağı değildir. Bankaların döviz zorunlu
karşılıkları rezervde görünür; fakat kriz anında hepsini satmak bankaların likit
döviz tamponunu tüketir. Başka merkez bankaları veya ticari bankalarla yapılan
swaplar brüt rezervi yükseltirken gelecekte döviz geri ödeme yükümlülüğü yaratır.
Net rezerv bu yükümlülükleri düşmeye çalışır.

“Swap hariç net rezerv” bu nedenle yararlı bir stres göstergesidir, fakat o da
tek başına hüküm vermez. Swapın vadesi, yenilenebilirliği ve karşı tarafı
önemlidir. Altın rezervi likittir ama değer oynaklığı ve dönüşüm süresi taşır.
Kamuya ait döviz mevduatı bilanço üzerinde bulunabilir, fakat harcanması başka
bir kurumun nakdini azaltır. Kullanılabilir rezerv hukuki mülkiyet, vade ve
finansal istikrar maliyetiyle birlikte düşünülmelidir.

## Müdahale kuru kalıcı olarak değiştirebilir mi?

Döviz müdahalesinin üç ana kanalı vardır. Sterilize edilmemiş satışta merkez
bankası döviz verir, karşılığında yerli likidite çeker; para piyasası sıkılaşır
ve faiz kanalı kuru destekler. Sterilize müdahalede bu likidite etkisi başka
işlemle geri alınır. Etki portföy dengesi kanalına dayanır: piyasanın elindeki
yerli ve yabancı varlık miktarı değiştiğinde risk primi değişebilir. Üçüncü kanal
sinyaldir; müdahale gelecekteki faiz veya kur rejimi hakkında bilgi taşıyabilir.

Derin piyasalarda küçük sterilize işlemin kalıcı fiyat etkisi sınırlı olabilir.
Piyasa sığ, aracılar bilanço kısıtlı ve hareket düzensizse aynı işlem oynaklığı
azaltabilir. Başarı ölçütü de tartışmalıdır. Kurun hiç yükselmemesi mi, daha yavaş
yükselmesi mi, alış-satış makasının daralması mı? Müdahale günü görülen kur
hareketi, müdahale olmasaydı oluşacak hareket bilinmeden etkiyi söylemez.

Rezerv satışı temel politika tutarsızlığını sonsuza dek örtemez. Negatif ex-ante
reel faiz, kalıcı enflasyon farkı ve güven kaybı sürerken belirli bir kur düzeyini
savunmak rezervi ucuz karşı tarafa dönüştürür. Buna karşılık geçici likidite
paniğinde müdahale, çoklu dengeyi kötü taraftan iyi tarafa taşıyabilir. Aynı araç
bir rejimde israf, başka rejimde sigorta olabilir.

## KKM: mevduat, opsiyon ve müdahale bir arada

Kur korumalı mevduat (KKM), TL mevduat sahibine vade sonunda faiz ile kur artışı
arasında koruma sunar. Tasarrufçu döviz almadan kur riskine karşı korunur; spot
döviz talebi ertelenebilir. Bu yönüyle klasik faiz artışı veya doğrudan rezerv
satışı değildir. Kamu bilançosunun yazdığı kur bağlantılı bir opsiyonla mevduat
aracını birleştirir.

Aracın görünür maliyeti, ödenen kur farkı ve faiz bileşenidir. Fakat yalnız bu
ödemeleri toplamak nedensel maliyet vermez. KKM olmasaydı mevduat sahibi dolar mı
alacaktı, daha yüksek faizli TL mevduatta mı kalacaktı, yoksa tüketim ve başka
varlıklara mı gidecekti? Alternatif patikada kur, enflasyon, politika faizi,
büyüme ve Hazine borçlanma maliyeti birlikte değişirdi.

Hakan Kara'nın karşı-olgusal itirazı bu nedenle güçlüdür. Mahfi Eğilmez'in
hesabı ise gerçekleşmiş bütçe ve merkez bankası yükünü görünür kıldığı için
gereksiz değildir. Uzlaşmazlık veri üzerinde değil, referans senaryo üzerindedir.
Karşı-olguyu tamamen reddetmek brüt ödemeyi toplumsal maliyet sanır; aracın bütün
kur istikrarını kendisine yazmak ise aynı anda uygulanan faiz, rezerv, kredi ve
düzenleme politikalarını yok sayar.

Dağılım da hesaba katılmalıdır. KKM kur riskini mevduat sahibinden kamuya taşır;
zarar gerçekleşirse vergi mükellefi veya merkez bankası bilançosu üstlenir.
Kur sakin kalırsa görünür ödeme azalır, fakat garanti koşullu yükümlülük olarak
vardır. Çıkışta yenilenmeyen büyük vade kümeleri yeniden döviz talebi yaratabilir.
Melez araç hareket alanı satın alır; maliyeti ortadan kaldırmaz, zaman ve bilanço
arasında yeniden dağıtır.

## Bu dersten sonra

Bu ders 1.3'teki merkez bankası bilançosunu açık ekonomi stres testine çevirdi.
6.5'te rezerv kaybının ne zaman ödemeler dengesi krizine dönüştüğünü, 8.3'te
Türkiye'nin 2001-2026 rejim değişimleri içinde müdahale ve KKM'nin yerini
inceleyeceğiz. Kalıcı ders şudur: tamponun büyüklüğü kadar sahipliği, vadesi ve
hangi politika hatasını telafi etmeye çalıştığı önemlidir.
