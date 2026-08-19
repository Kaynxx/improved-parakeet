---
baslik: Dolarizasyon histerezisi ve tersine dolarizasyonun koşulları
ozet: >-
  Dolarizasyon güncel faiz farkına verilen anlık tepki değil, geçmiş krizlerin
  bugünkü sözleşmelere bıraktığı izdir. Ders varlık ve yükümlülük
  dolarizasyonunu ayırır, ölçümdeki değerleme etkisini gösterir ve tersine
  dolarizasyonun kur baskısından mı güven onarımından mı doğduğunu tartışır.
sure: 50
onkosul:
  - hafta-05/kur-geciskenligi-ve-dolarizasyon
  - hafta-08/turkiye-2001-2026
kaynaklar:
  - tip: video
    baslik: "Dolarizasyon nedir? Doç. Dr. Soner Gökten tek tek anlattı: Dolar 1 lira arttığı zaman..."
    url: "https://www.youtube.com/watch?v=HmOvQSDco-E"
    kaynak: "Tele1"
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Kur, enflasyon ve tasarruf tercihi arasındaki geri beslemeyi Türkiye
      üzerinden kurar. Dolarizasyonu yalnız soyut bir güven oylaması saymadan,
      portföy ve fiyatlama davranışına bağlamak için giriş sağlar.
  - tip: article
    baslik: "Dolarizasyon Endeksleri: Türkiye'deki Dolarizasyon Sürecine İlişkin Göstergeler"
    url: "https://www.tcmb.gov.tr/wps/wcm/connect/303ba50f-76d6-4c56-8dc5-66ca150a16d9/WP0517.pdf?MOD=AJPERES&CACHEID=ROOTWORKSPACE-303ba50f-76d6-4c56-8dc5-66ca150a16d9-m3fw5MS"
    kaynak: "TCMB Araştırma ve Para Politikası Genel Müdürlüğü, Çalışma Tebliği No: 05/17 (2005)"
    seviye: ileri
    ozet: >-
      Varlık ve yükümlülük taraflarını birden çok bileşenle izleyen dolarizasyon
      endeksini verir. Tek bir döviz mevduatı oranının kur değerlemesi ve
      bilanço uyumsuzluğu yüzünden yanıltıcı olabileceğini göstermek için
      metodolojik dayanak oluşturur.
  - tip: discussion
    baslik: "ters dolarizasyon"
    url: "https://eksisozluk.com/ters-dolarizasyon--1364912"
    kaynak: "Ekşi Sözlük"
    seviye: orta
    ozet: >-
      Tersine dolarizasyonun gerçek bir tercih değişimi mi, baskılanmış kurun
      geçici görüntüsü mü olduğu ayrımını gündelik tartışma içinde gösterir.
      Akademik ölçünün kullanıcı deneyimiyle nerede çatıştığını görmek için okunur.
sorular:
  - id: degerleme-dolarizasyonu
    tip: sayisal
    puan: 25
    soru: >-
      TL mevduat 2,4 trilyon TL, döviz mevduatı 80 milyar dolar ve kur 30
      TL/dolar iken mevduat dolarizasyon oranı %50'dir. Mevduat miktarları hiç
      değişmeden kur 36'ya çıkarsa, döviz mevduatının TL karşılığı üzerinden
      hesaplanan yeni dolarizasyon oranı yüzde kaç olur? İki ondalıkla ver.
    beklenen: 54.55
    tolerans: 0.01
  - id: histerezis-mekanizmasi
    tip: acik
    puan: 40
    soru: >-
      Enflasyon düştüğü halde dolarizasyonun neden eski düzeyine hemen
      dönmeyebileceğini açıklayan bir histerezis modeli kur. Sabit maliyet,
      öğrenme, ağ etkisi, sözleşme para birimi ve kuyruk riskini birlikte kullan.
    olcut:
      - Döviz hesabı açma, fiyat sistemini değiştirme veya risk yönetimi öğrenmenin bir defalık sabit maliyetini belirtir.
      - Dolarla fiyatlama yaygınlaştıkça aynı para birimini kullanmanın işlem ve koordinasyon maliyetini düşüren ağ etkisini açıklar.
      - Geçmiş krizlerin düşük olasılıklı büyük değer kaybına verilen öznel ağırlığı artırdığını söyler.
      - Kira, borç veya tedarik sözleşmelerinin vadesi nedeniyle para birimi tercihinin yapışkan olduğunu belirtir.
      - Dolarizasyona giriş eşiği ile çıkış eşiğinin farklı olmasını histerezisin test edilebilir sonucu olarak kurar.
  - id: gercek-ters-dolarizasyon
    tip: acik
    puan: 35
    soru: >-
      Döviz mevduatı payının altı ay düşmesi “tersine dolarizasyon başladı”
      demek için yeterli midir? Kur değerlemesi, zorlayıcı düzenlemeler, kur
      korumalı ürünler ve gönüllü vade uzaması arasında ayrım yapan bir kanıt
      seti öner.
    olcut:
      - Döviz mevduatı payını sabit kurla veya miktar bazında yeniden hesaplayarak değerleme etkisini ayırır.
      - Dövizden TL'ye dönüşün düzenleme, vergi veya zorunlu karşılık teşvikleri kalkınca sürüp sürmediğini sınar.
      - Kur korumalı mevduatı ekonomik döviz riski taşıdığı ölçüde düzeltilmiş dolarizasyon hesabına dahil eder.
      - TL mevduatın vadesinin uzaması ve enflasyon beklentisinin dağılması gibi güven göstergeleri arar.
      - Şirketlerin döviz açık pozisyonu, döviz kredisi veya fiyatlama para birimini varlık dolarizasyonuyla birlikte inceler.
---

## Akım değil, durum değişkeni

Bir hane TL mevduattan dolara geçtiğinde yalnız o ayın faiz farkına tepki
vermez. Geçmiş devalüasyonlardan öğrendiği bir korunma tekniğini satın alır.
Döviz hesabı açar, kur ekranı izler, dayanıklı mal fiyatlarını dolar cinsinden
düşünür. Bu altyapı kurulduktan sonra enflasyonun birkaç ay düşmesi davranışı
eski haline döndürmez. **Histerezis**, şok geçtikten sonra durum değişkeninin
kalmasıdır.

Bu yaklaşım dolarizasyonu “vatandaş güvenmiyor” cümlesinden daha açıklayıcı
kılar. Güven gözlemlenemez; oysa giriş ve çıkış eşiklerinin farklı olması,
sözleşme vadeleri ve para birimi tercihi ölçülebilir.

## Hangi dolarizasyon?

Varlık dolarizasyonu, tasarrufun döviz cinsinden tutulmasıdır. Yükümlülük
dolarizasyonu, şirketin, bankanın ya da kamunun dövizle borçlanmasıdır.
Fiyatlama dolarizasyonunda mal, kira veya ücret dövize bağlanır. Para ikamesi
ise dövizin günlük ödeme aracı olarak kullanılmasıdır. Bunlar birlikte hareket
edebilir, ama aynı risk değildir.

Hanehalkının döviz mevduatı kur artışına karşı tampon sağlayabilir. Döviz geliri
olmayan şirketin döviz borcu ise 6.1'deki finansal hızlandıranı büyütür: kur
yükselince net değer düşer, teminat zayıflar, kredi daralır. Bankanın döviz
varlığı ve yükümlülüğü bilanço üzerinde eşleşse bile borçlusunun kur riski
kredi riskine dönüşür. “Bankaların açık pozisyonu yok” demek ekonominin kur
riskinin yok olduğu anlamına gelmez.

## Ölçü neden kendi kendine hareket eder?

En çok kullanılan oran, döviz mevduatının TL karşılığını toplam mevduata
böler. Fakat pay ve paydanın biri kurla yeniden değerlenir. 80 milyar dolar
döviz mevduatı kur 30 iken 2,4 trilyon TL eder. Yanında 2,4 trilyon TL mevduat
varsa oran %50'dir. Kimse tek dolar almadığı halde kur 36'ya çıktığında döviz
kalemi 2,88 trilyon TL'ye, oran %54,55'e yükselir.

Tersi de mümkündür. Kur baskılanırken döviz miktarı değişmese bile TL mevduat
yüksek nominal faizle hızla büyür ve oran düşer. Manşet tersine dolarizasyon
gösterirken hanehalkının döviz talebi yerinde durabilir. Stok oranını işlem
akımlarıyla birlikte okumak bu nedenle zorunludur: gerçek dönüşte net döviz
satışı, yalnız payda büyümesi veya çapraz kur değerlemesi değil, gözlenebilir
bir portföy işlemi üretmelidir.

Bu nedenle TCMB'nin bileşik endeks yaklaşımı değerlidir. Miktarları sabit kurla
izlemek, varlık ve yükümlülük tarafını ayırmak, döviz endeksli kamu borcunu ve
şirket dış borcunu katmak gerekir. Tek manşet oranı davranış değişimi ile
değerleme etkisini karıştırır.

Kur korumalı mevduat ölçümü daha da zorlaştırır. Hukuken TL yükümlülük,
ekonomik olarak kur getirisine bağlı bir alacaktır. Dar tanımda tersine
dolarizasyon görünür; riskin nihai taşıyıcısı banka, merkez bankası veya Hazine
olduğunda ülke bilançosunun döviz duyarlılığı sürer. Etiketi değiştirmek riski
silmez.

## Histerezisin mikroiktisadı

Dolarizasyona geçişin sabit maliyeti vardır: yeni hesap, bilgi, fiyatlama
rutini ve muhasebe sistemi. Kriz bu maliyeti ödemeye değer hale getirir.
Sonrasında döviz kullanmayı sürdürmenin marjinal maliyeti düşüktür. Çıkış için
yalnız enflasyonun gerilemesi değil, TL'nin beklenen getirisinin bu yerleşik
altyapıyı sökmeye yetecek kadar uzun süre üstün olması gerekir.

Ağ etkisi de çalışır. Ev sahibi kirayı, tedarikçi girdiyi ve tasarruf sahibi
serveti aynı para biriminde düşününce koordinasyon kolaylaşır. Uzun vadeli
sözleşmeler para birimi tercihini kilitler. Son kriz nadir olsa bile
hanehalkının kuyruk riskine verdiği ağırlık artar: ortalama enflasyon düşerken
bir gecelik büyük değer kaybına karşı sigorta talebi sürebilir.

Basit eşik modeli bu fikri keskinleştirir. Enflasyon veya beklenen değer kaybı
girişte yüksek bir eşiği aşınca dolarizasyon sıçrar. Çıkış için aynı değişkenin
bu eşiğin biraz altına gelmesi yetmez; daha düşük bir çıkış eşiğine uzun süre
inmesi gerekir. Tarih, bugünkü portföyün açıklayıcı değişkenidir.

Bu model test edilebilir bir asimetri önerir. Eş büyüklükte kur artışı ile kur
düşüşü döviz mevduatında eş büyüklükte karşılık üretmiyorsa, geçmiş yüksek
enflasyon deneyimine sahip gruplar daha kalıcı döviz tutuyorsa ve krizden
sonra sözleşme para birimi yavaş değişiyorsa histerezis yorumu güçlenir. Sadece
ülke toplamına bakmak yetmez; mevduat sahibi, firma sektörü ve vade bazındaki
kohortlar davranışın gerçekten hafıza taşıyıp taşımadığını gösterir.

## Tersine dolarizasyon ne zaman gerçektir?

Yüksek TL faizi ve bastırılmış kur, kısa sürede TL payını artırabilir. Bu bir
fiyat etkisidir; politika değiştiğinde tersine dönebilir. Zorunlu karşılık,
komisyon veya hedefler bankaları ve mudileri TL'ye itebilir. Bu da düzenleme
etkisidir. İkisini güven onarımıyla karıştırmamak gerekir.

Kalıcı tersine dolarizasyonda beklenti dağılımı daralır, TL mevduatın vadesi
uzar, teşvikler kalksa da tercih sürer ve şirketler fiyatlama ile borçlanma
para birimini değiştirir. Rezerv birikimi borçlanmayla değil cari ve sermaye
akımlarının daha dayanıklı bileşimiyle oluşur. En önemlisi, yeni bir kur şoku
eski ölçekte dövize kaçış üretmez. Histerezisin tersine döndüğünü sakin dönemde
değil, stres testinde anlarız.

Türkiye'de 2002-2013 dönemi dezenflasyon, mali disiplin ve küresel sermaye
girişinin birlikte tersine dolarizasyon yaratabildiğini gösterdi. 2018 ve 2021
sonrası yeniden yükseliş ise kazanımın geri döndürülemez olmadığını kanıtladı.
Tartışma, tersine dönüşün mümkün olup olmadığı değil; yüksek reel faizin tek
başına kalıcı kurum güveninin yerini tutup tutamayacağıdır.

## Bu dersten sonra

5.4'te kur geçişkenliği ile dolarizasyonun birbirini beslemesini kurmuştuk;
8.3 bu döngünün Türkiye'deki rejim tarihini verdi. 8.5'te banka mevduatının
dışına çıkacağız. Stablecoin, dolarizasyonu akıllı telefona ve ödeme sistemine
taşıdığında mevcut mevduat oranları para ikamesinin tamamını artık göremeyebilir.
