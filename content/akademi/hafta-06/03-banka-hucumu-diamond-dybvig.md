---
baslik: Banka hücumu, güvence ve ahlaki tehlike
ozet: >-
  Diamond–Dybvig modeli, ödeme gücü olan bir bankanın bile herkes çekilecek
  diye düşündüğünde hücuma uğrayabileceğini gösterir. Ders mevduat sigortası ve
  son kredi merciinin kötü dengeyi nasıl söndürdüğünü, fakat aynı güvenceyle
  risk alma teşvikini nasıl büyütebildiğini tartışır.
sure: 50
onkosul:
  - hafta-01/krediyi-banka-yaratir
  - hafta-01/odeme-sistemleri-ve-rezerv-dolasimi
kaynaklar:
  - tip: video
    baslik: '35 years later: Diamond-Dybvig model of bank runs'
    url: https://www.youtube.com/watch?v=5GUrBs7Zoek
    kaynak: WashU Olin Business School
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Modelin ortak yazarı Philip Dybvig'in yer aldığı anlatım, vade dönüşümü
      ile çoklu denge arasındaki bağı doğrudan kurar. Temel olarak sağlam bir
      bankada bile başkalarının çekim beklentisinin neden rasyonel bir hücum
      yaratabildiğini görmek için izlenir.
  - tip: article
    baslik: 'Bank Runs, Deposit Insurance, and Liquidity'
    url: https://www.bu.edu/econ/files/2012/01/DD83jpe.pdf
    kaynak: 'Diamond & Dybvig, Journal of Political Economy 91(3), 1983'
    seviye: uzman
    ozet: >-
      Bankaların likit mevduat ile illikit yatırım arasında yaptığı vade
      dönüşümünü ve hücumun çoklu denge yapısını kuran temel makaledir.
      Mevduat sigortasının kötü dengeyi kaldırma mantığını ve bu çözümün hangi
      varsayımlara dayandığını formel olarak incelemek için okunur.
  - tip: discussion
    baslik: 'Subprime Series, part 2: Deposit insurance and the lender of last resort'
    url: https://cepr.org/voxeu/columns/subprime-series-part-2-deposit-insurance-and-lender-last-resort
    kaynak: 'CEPR/VoxEU (Stephen Cecchetti, 2007)'
    seviye: orta
    ozet: >-
      Northern Rock deneyimi üzerinden son kredi merciinin mevduat sigortasının
      yerine geçemeyeceğini savunur. Güvence araçlarının birbirini nasıl
      tamamlayacağını ve ceza faizi ile risk bazlı primlerin ahlaki tehlikeyi
      sınırlayıp sınırlayamayacağını tartışmaya açar.
sorular:
  - id: vade-donusumu-getirisi
    tip: sayisal
    puan: 25
    soru: >-
      Bir banka 100 birim mevduatı uzun vadeli varlığa yatırmıştır. Varlığın
      erken tasfiye değeri birim başına 0,8, vade sonu getirisi 1,2'dir. Otuz
      erken tüketiciye kişi başı 1 ödeme yapmak için 37,5 birim varlık tasfiye
      edilir. Kalan varlığın vade sonu getirisi 70 geç tüketiciye eşit
      dağıtılırsa kişi başına ödeme kaçtır? İki ondalıkla ver.
    beklenen: 1.07
    tolerans: 0.01
  - id: sigorta-kotu-denge
    tip: acik
    puan: 40
    soru: >-
      Diamond–Dybvig modelinde güvenilir mevduat sigortası banka hücumunu neden
      daha para ödemeden durdurabilir? Cevabında çoklu dengeyi, devlet
      taahhüdünün inanılırlığını ve modelin temel-şok açıklamasından farkını
      kur.
    olcut:
      - Bankanın vade dönüşümü nedeniyle tüm mevduatı aynı anda erken ödeme kapasitesine sahip olmadığını açıklar.
      - Herkesin çekim beklediği kötü dengede erken çekmenin bireysel olarak rasyonel hale geldiğini belirtir.
      - Güvenilir sigortanın mudinin başkalarından önce davranma teşvikini kaldırarak kötü dengeyi ortadan kaldırdığını söyler.
      - Taahhüdün mali kapasite ve kurumsal güven gerektirdiğini, güvenilir değilse beklentiyi değiştirmeyeceğini belirtir.
      - Temel-şok anlatısında hücumun kötü varlık kalitesine bilgi tepkisi olabileceğini ve sigortanın bu zararı yok etmediğini ayırır.
  - id: guvence-ahlaki-tehlike
    tip: acik
    puan: 35
    soru: >-
      Mevduat sigortası ile son kredi mercii birlikte kullanıldığında panik
      azalır, fakat banka ve mudi disiplini de zayıflayabilir. Bu ödünleşimi
      çözümleyen, ödeme gücü ile likiditeyi ayıran bir politika tasarımı öner.
    olcut:
      - Mevduat sigortasının küçük mudinin izleme ve kaçma teşvikini azalttığını belirtir.
      - Son kredi merciinin geçici likidite açığını varlıkların zararına satışını önleyerek kapattığını açıklar.
      - Ödeme gücü olmayan bankaya likidite vermenin zararı ertelediğini ve kamu kaybını büyütebileceğini söyler.
      - Risk bazlı sigorta primi, teminat, ceza faizi, sermaye şartı veya hissedar kaybından en az iki tasarım unsuru önerir.
      - Kriz anında hızlı karar ihtiyacı ile ödeme gücünü doğru ölçmenin zorluğu arasındaki gerilimi kabul eder.
---

## Banka neden aynı anda hem yararlı hem kırılgandır?

Hanehalkı parasına istediği an erişmek ister; üretken yatırımlar ise uzun vade
ister. Banka kısa vadede çekilebilir mevduat çıkarıp uzun vadeli kredi vererek
bu iki isteği uzlaştırır. Vade dönüşümü ekonomik değer yaratır: herkes parasını
kasada tutmak zorunda kalmaz, uzun projeler finanse edilir. Fakat aynı sözleşme
bankayı bütün mudilerin aynı anda çekimine açık bırakır. Kırılganlık kötü
yönetimin kazara ürettiği bir kusur değil, likidite hizmetinin ikizidir.

Bu nokta 1.2'deki para yaratımıyla birlikte okunmalıdır. Banka önce mevduat
toplayıp sonra kredi dağıtan bir aracı değildir; kredi verirken mevduat yaratır.
Yine de ödeme talebi geldiğinde başka bankalara rezerv aktarması veya nakit
sağlaması gerekir. Uzun vadeli krediyi anında ve tam değerinden satamıyorsa,
ödeme gücü ile ödeme zamanı arasında gerilim doğar.

## Diamond–Dybvig'in çoklu dengesi

Modelde mudiler başlangıçta aynı görünür, fakat bir bölümü erken tüketime ihtiyaç
duyar. Banka risk paylaşımı sağlar: erken ihtiyacı olana likit ödeme, bekleyene
uzun yatırımın yüksek getirisini sunar. Normal dengede yalnız gerçekten erken
tüketiciler çeker ve sözleşme çalışır.

Kötü denge beklentiden doğar. Bir mudi, diğer herkesin parasını çekeceğini
düşünürse beklemek ona uzun yatırımın getirisini sağlamaz; çünkü banka önce
gelenlere ödeme yapmak için varlığı düşük tasfiye değerinden satacaktır. Bu
durumda erken çekmek, likidite ihtiyacı olmayan biri için bile rasyoneldir.
Herkes aynı hesabı yaptığında inanç gerçeği üretir. Aynı varlık portföyü ve aynı
temel göstergeler altında hem sakinlik hem hücum dengesi mümkündür.

Bu sonuç “her hücum temelsizdir” demek değildir. Mudiler kötü kredi kalitesi
hakkında bilgi edinmiş olabilir; o zaman çekim, yaklaşan zarara rasyonel bir
tepkidir. Ampirik sorun, gözlenen kuyruğun kendi kendini gerçekleştiren panik mi
yoksa ödeme gücü sorununa erken uyarı mı olduğunu ayırmaktır. Modelin güçlü yanı
birinci olasılığın varlığını göstermesidir; bütün tarihsel hücumları tek tipe
indirgemek değildir.

## Mevduat sigortası neden kasadan önce çalışır?

Devlet, sigorta kapsamındaki mevduatı ödeyeceğine inanılır biçimde söz verirse
mudinin başkalarından önce davranmasına gerek kalmaz. Kimse koşmayınca banka
varlıklarını zararına tasfiye etmez; sigorta fonu fiilen ödeme yapmadan kötü
denge kaybolabilir. Politikanın gücü tam da bilanço harcamasından önce beklentiyi
değiştirmesidir.

Fakat “devlet garanti verdi” cümlesi yeterli değildir. Garantinin kapsamı açık,
ödeme süreci hızlı ve mali kapasitesi inandırıcı olmalıdır. Yabancı para
mevduatının yerel parayla garanti edilmesi de ayrı bir kur riski taşır. Mali
otoritenin ödeme kapasitesinden şüphe duyuluyorsa banka paniği egemen riskine
dönüşebilir. Güvence, kaybı yok etmez; güvenilir kamu bilançosuna taşır.

## Son kredi mercii aynı araç değildir

Merkez bankasının son kredi mercii işlevi, ödeme gücü olan fakat geçici olarak
likit olmayan bankaya teminat karşılığı fon sağlar. Böylece uzun varlığın yangın
satışını ve ödeme sistemindeki zincirleme kırılmayı önler. Mevduat sigortası
mudinin talebini sakinleştirirken, son kredi mercii bankanın gerçekleşen ödeme
talebini karşılar. Northern Rock örneğinin açtığı tartışma budur: merkez bankası
fonu hazır olsa bile mudinin erişim ve garanti konusunda tereddüdü kuyruğu
durdurmayabilir.

Klasik reçete, desteğin iyi teminat karşılığında ve ceza faizinden verilmesidir.
Ama kriz anında “iyi teminat” ile “ödeme gücü olan banka” gerçek zamanlı olarak
gözlenemez. Piyasa fiyatı yangın satışından düşmüşse teminat değeri sorunu
abartır; resmi değerleme fazla iyimserse zararı saklar. Son kredi mercii bir
formül değil, bilgi eksikliği altında verilen dağıtım kararıdır.

Dijital bankacılık modelin zaman boyutunu daha sert hale getirir. Mudi artık
şubeye gidip kuyruğa girmez; sosyal medyada yayılan bilgi veya söylenti birkaç
saat içinde elektronik transfere dönüşebilir. Bu hız, bankanın kaliteli
varlığını satması ya da merkez bankasına teminat göstermesi için kalan zamanı
kısaltır. Aynı zamanda kamu otoritesinin belirsiz bir açıklamayla yetinmesini
zorlaştırır: garanti kapsamı ve likidite penceresine erişim operasyonel olarak
hazır değilse sözlü güvence kötü dengeyi durdurmaz.

Para çekmeyi geçici durdurmak koordinasyon sorununu kesebilir, fakat mudinin
mülkiyet hakkını sınırlar ve yeniden açılış gününe daha büyük talep yığabilir.
Önceden belirlenmiş çözümleme rejimi burada önem kazanır. Kritik ödemeler
sürerken hissedar ve güvencesiz alacaklıların kayıp sırası belliyse otorite,
likidite desteğini sınırsız kurtarmaya çevirmeden sistemi açık tutabilir.
Hücum hızı arttıkça iyi tasarımın krizden önce yapılması, kriz anındaki
kahramanca müdahaleden daha değerli hale gelir.

## Güvence riski nerede büyütür?

Sigortalı mudi bankanın riskini izlemez; banka da ucuz mevduat kaynağıyla daha
fazla risk alabilir. Merkez bankasının her durumda kurtaracağı beklentisi büyük
ve bağlantılı kurumlara ek sübvansiyon yaratır. Panik ihtimalini azaltan güvence,
portföy riskini artırarak temel-temelli kriz ihtimalini yükseltebilir. Tek doğru
koruma düzeyi bu yüzden yoktur.

Risk bazlı sigorta primi, yüksek sermaye ve likidite şartı, kapsam limiti,
teminat iskontosu ve hissedar ile yöneticinin kayıp taşıması bu teşviki
sınırlayabilir. Ancak çok dar kapsam yeniden hücum teşviki yaratır; çok sert
ceza faizi likidite desteğini damgalayıp bankayı başvurmaktan caydırabilir.
Politika tasarımı, güvenceyi ilan etmek kadar kaybın kimde kalacağını önceden
belirleme işidir.

## Bu dersten sonra

6.4'te tek bankanın güvenliğinden sistemin güvenliğine geçeceğiz. Her banka
aynı anda kredi kısarsa bireysel olarak sermayesini korur, fakat toplam satış ve
temerrüt sistemi zayıflatır; makro ihtiyati politikanın gerekçesi bu bileşim
hatasıdır. 8.3'te Türkiye'nin 2001 sonrası banka yeniden yapılandırmasını
okurken mevduat güvencesi, merkez bankası likiditesi ve hissedar kaybının hangi
sırayla uygulandığı aynı çerçeveyle değerlendirilecek.
