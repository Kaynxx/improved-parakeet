---
baslik: Para politikası aktarım kanalları ve Türkiye'de kurun ağırlığı
ozet: >-
  Politika faizi harcamayı tek bir borudan etkilemez; faiz, kredi, kur, varlık
  fiyatı ve beklenti kanalları aynı anda çalışır. Bu ders Türkiye'de kur
  kanalının neden çoğu zaman baskın göründüğünü ve bu teşhisin neden rejime,
  bilançolara ve incelenen döneme bağlı olduğunu tartışır.
sure: 50
onkosul:
  - hafta-02/faiz-koridoru-ve-operasyonel-cerceve
  - hafta-03/fisher-denklemi-ve-reel-faiz
kaynaklar:
  - tip: video
    baslik: Why Turkey's Lira Keeps Collapsing Again and Again
    url: https://www.youtube.com/watch?v=Azi6XReOKDM
    kaynak: FINANCIAL MYSTERY STORIES
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Türkiye'deki düşük ya da negatif reel faiz, kur baskısı ve ithal
      enflasyonu döngüsünü sezgisel bir dille kurar. Teknik modellerden önce,
      kur kanalının gündelik fiyatlara neden faiz kanalından daha görünür
      biçimde taşındığını görmek için izlenir.
  - tip: article
    baslik: Parasal Aktarım Mekanizması
    url: https://www.tcmb.gov.tr/wps/wcm/connect/4e99834e-179b-4a08-820c-f2b259032afd/ParasalAktarim.pdf?MOD=AJPERES
    kaynak: TCMB
    seviye: ileri
    ozet: >-
      Faiz, kredi, varlık fiyatı, döviz kuru ve beklenti kanallarını merkez
      bankasının kendi çerçevesinden birlikte okumayı sağlar. Kanalların farklı
      gecikmelerle ve birbirini güçlendirerek çalıştığını kurmak için dersin
      kurumsal başlangıç noktasıdır.
  - tip: discussion
    baslik: The Falling Lira
    url: https://phenomenalworld.org/analysis/the-falling-lira/
    kaynak: Özgür Orhangazi, Phenomenal World
    seviye: ileri
    ozet: >-
      Türkiye'nin 2021 sonrası kur-faiz gerilimini sermaye akımlarına bağımlı
      büyüme modeli ve kur korumalı mevduat üzerinden tartışır. Aktarım
      mekanizmasını yalnız teknik katsayılara değil, politika rejimine ve siyasi
      iktisat tercihlerine bağlamak için okunur.
sorular:
  - id: kur-geciskenligi-hesabi
    tip: sayisal
    puan: 25
    soru: >-
      Lira bir çeyrekte yüzde 20 değer kaybediyor. Aynı ufukta döviz kurundan
      tüketici fiyat düzeyine geçişkenlik katsayısının 0,35 olduğu ve diğer tüm
      etkilerin sıfır olduğu varsayımıyla TÜFE düzeyindeki artış yüzde kaçtır?
    beklenen: 7
    tolerans: 0.1
  - id: baskin-kanal-teshisi
    tip: acik
    puan: 40
    soru: >-
      500 baz puanlık politika faizi artışından sonra ticari kredi faizleri
      sınırlı yükselirken lira hızla değer kazanıyor ve enflasyon beklentileri
      düşüyor. Bu gözlem kur kanalının baskın olduğunu kanıtlar mı? Nedensellik,
      eşzamanlı kanallar ve politika rejimi açısından değerlendir.
    olcut:
      - Politika faizi kararının kur, kredi ve beklenti kanallarını aynı anda etkileyebileceğini açıkça belirtir.
      - Kur hareketinin faiz kararından mı, eşzamanlı sermaye akımından mı ya da başka bir politika haberinden mi geldiğini ayırmadan nedensellik kurulamayacağını söyler.
      - Ticari kredi faizlerindeki sınırlı tepkiyi kredi tavanı, seçici kredi düzenlemesi, banka fonlama maliyeti veya bilanço kısıtı gibi en az bir somut mekanizmayla açıklar.
      - Baskın kanal hükmünün dönem, bilanço dolarizasyonu, kur geçişkenliği ve politika güvenilirliğine bağlı olduğunu belirtir.
      - Teşhis için yüksek frekanslı sürpriz, banka düzeyi veri veya yapısal model gibi en az bir tanımlama stratejisi önerir.
  - id: turkiye-aktarim-rejimi
    tip: acik
    puan: 35
    soru: >-
      Türkiye'de 2021'de politika faizi indirimlerinin kredi kanalından büyümeyi
      desteklemek yerine kur ve fiyatlar üzerinden sıkılaştırıcı sonuç
      üretebildiği iddiasını bilanço ve gelir dağılımı etkileriyle tartış.
    olcut:
      - Faiz indiriminin kredi maliyetini düşürerek iç talebi artıran standart mekanizmayı kurar.
      - Kur değer kaybının ithal girdi ve enerji maliyetlerini artırarak enflasyonu beslediğini açıklar.
      - Döviz borçlu firmaların net değerinin düşmesi veya bankaların risk iştahının azalması yoluyla kredi arzının daralabileceğini belirtir.
      - Enflasyonun reel ücretleri ve likit tasarrufları aşındırarak tüketimi her hane için aynı yönde etkilemediğini söyler.
      - Sonucun yalnız politika faizinin işaretinden değil, dolarizasyon, güvenilirlik ve tamamlayıcı düzenlemelerden türediği sonucuna varır.
---

## Bir düğme, beş aktarım yolu

Merkez bankası politika faizini değiştirir; hane ise konut kredisi, firma işletme
sermayesi, ihracatçı döviz kuru, yatırımcı tahvil fiyatı görür. Politika kararını
nihai harcamaya bağlayan tek bir dişli yoktur. En az beş kanal birlikte çalışır:
faiz, kredi, döviz kuru, varlık fiyatları ve beklentiler. “Faiz arttı, talep
düşer” cümlesi bu ağın yalnız bir kolunu anlatır.

Tartışma tam burada başlar: Türkiye'de hangi kanal baskındır? Yaygın cevap kur
kanalıdır. Bu cevap çoğu dönem için ikna edici olsa da değişmez bir yapısal yasa
değildir. Baskınlık, hangi değişkenin en hızlı tepki verdiği değil, politika
şokunun çıktı ve fiyatlar üzerindeki toplam etkisinin hangi yoldan taşındığıdır.
Hız, büyüklük ve nedensellik aynı şey değildir.

## Kanalları ayrı düşün, birlikte ölç

**Faiz kanalı**, beklenen reel faiz yükseldiğinde bugünkü harcamanın pahalılaşması
üzerinden çalışır. Tüketim ertelenir, yatırım projelerinin bugünkü değeri düşer.
Fakat 3.1'in sonucu burada hemen geri gelir: ilgili faiz nominal politika faizi
değil, farklı vadelerdeki ex-ante reel faizdir. Beklenen enflasyon politika
faiziyle beraber yükselirse görünürdeki sıkılaştırma reel olarak gevşeme olabilir.

**Kredi kanalı** iki parçalıdır. Banka kredi kanalı, fonlama ve bilanço
kısıtlarının kredi arzını değiştirmesidir. Bilanço kanalı ise yüksek faiz ya da
kur şokunun borçlunun net değerini aşındırıp dış finansman primini büyütmesidir.
Kredi hacminin artması tek başına gevşeme kanıtı değildir; enflasyon yüksekken
nominal kredi artışı reel daralmayı saklayabilir.

**Varlık fiyatı kanalı**, iskonto oranı yükseldiğinde tahvil ve hisse değerlerinin
düşmesi; servet ve teminat değerinin gerilemesi üzerinden işler. **Beklenti
kanalı** ise gelecekteki politika patikasını değiştirir. Bugünkü 250 baz puanlık
adım, kalıcı bir rejim değişimi olarak görülürse küçük; geçici ve geri alınacak
bir hareket sayılırsa büyük olduğu hâlde etkisiz olabilir.

**Kur kanalı** açık ekonomide iki yönlüdür. Yüksek faiz lira varlıklarını çekici
kılıp lirayı güçlendirebilir; daha ucuz ithalat fiyat baskısını azaltır. Buna
karşılık güçlü lira net ihracatı zayıflatır. Kurun bilanço etkisi de vardır:
döviz borçlu firmanın yükü lira değer kaybettiğinde büyür. Böylece başlangıçta
“gevşeme” diye tasarlanan faiz indirimi, kur şoku üzerinden firmayı yatırım
kesmeye zorlayabilir.

## Türkiye'de kur neden öne çıkar?

Türkiye'nin üretimi ithal enerji ve ara malına, tasarruf tercihleri dövize,
şirket bilançoları da dönem dönem yabancı para borca duyarlıdır. Bu üç özellik
kur hareketini hem maliyetlere hem beklentilere hızlı taşır. 2018'deki kur şoku,
politika faizinden manşet TÜFE'ye giden yolun yalnız iç talep olmadığını açıkça
gösterdi. 2021 sonrasında faiz indirimleri kredi maliyetini düşürürken lira
üzerindeki baskı, ithal fiyatlar ve enflasyon beklentileri üzerinden ters yönde
çalıştı.

2001 sonrası dezenflasyon deneyimi karşılaştırma sunar. Güçlenen mali çerçeve,
bankacılık reformu ve enflasyon hedeflemesi yalnız gecelik faizi değiştirmedi;
beklentilerin politika haberine verdiği tepkiyi de değiştirdi. Aynı nominal faiz
adımı güvenilir bir rejimde uzun vadeli beklentiyi çıpalarken, kararların geri
alınacağı düşünülen bir rejimde döviz talebini artırabilir. Bu nedenle ülke
karşılaştırmasından alınan tek bir aktarım katsayısını Türkiye'ye taşımak kadar,
Türkiye'nin 2004 katsayısını 2021'e taşımak da sorunludur. Mekanizma aynı adları
taşır; davranış parametreleri rejimle beraber değişir.

Yüksek geçişkenliği basitçe şöyle yazabiliriz:

> ΔP = α · ΔE

Burada `ΔE` kurdaki yüzde değişim, `α` aynı ufuktaki geçişkenliktir. Ama `α`
doğa sabiti değildir. Enflasyon düşük ve çıpalanmışken firmalar kur şokunu kâr
marjında emebilir; yüksek ve oynak enflasyonda fiyatı daha hızlı günceller.
Dolayısıyla “kur yüzde 10 arttıysa TÜFE yüzde x artar” hesabı rejim değişince
bozulur. Katsayıyı geçmiş ortalamadan almak, tam da açıklamak istediğin davranış
değişimini yok sayabilir.

## Baskın kanal nasıl tanımlanır?

Bir politika toplantısının ardından liranın güçlenmesi kur kanalının görünür
olduğunu gösterir, baskın olduğunu değil. Aynı açıklama gelecekteki faiz
patikasını değiştirmiş, bankaların fonlama maliyetini yükseltmiş ve BIST'teki
iskonto oranını artırmış olabilir. Üstelik karar genellikle enflasyon haberi,
iletişim değişikliği veya düzenleme paketiyle aynı anda gelir.

Bu yüzden ampirik çalışma “faiz değişimi”ni değil, piyasanın beklemediği politika
**sürprizini** ayırmaya çalışır. Yüksek frekanslı tanımlama toplantı çevresindeki
dar pencerede fiyat tepkisini ölçer; banka düzeyi veriler kredi arzını talep
değişiminden ayırmaya yardım eder; yapısal modeller kanalların karşı-olgusal
katkısını hesaplar. Hiçbiri kusursuz değildir. Dar pencere uzun vadeli aktarımı,
yapısal model ise varsayım bağımlılığını saklayabilir.

Asıl sonuç şu: “Türkiye'de kur kanalı baskındır” yararlı bir başlangıç hipotezi,
zamandan bağımsız bir sonuç değildir. Sermaye akımlarının yönü, makroihtiyati
düzenlemeler, rezerv politikası ve merkez bankasının güvenilirliği kanalların
işaretini bile değiştirebilir.

## Bu dersten sonra

Politika faizi bütün vadeleri aynı ölçüde oynatmaz. 3.3'te kısa faiz
beklentilerinin getiri eğrisine nasıl yayıldığını ve bu okumayı vade priminin
nasıl kirlettiğini göreceğiz. 5.3'te küresel finansal döngü, bağımsız para
politikasının sınırlarını; 7.2'de ise politika şokunu veriden ayırmanın neden başlı
başına bir tanımlama problemi olduğunu yeniden kuracak.
