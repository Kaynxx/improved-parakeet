---
baslik: Faiz paritesi, carry trade ve forward premium bulmacası
ozet: >-
  Kapalı faiz paritesi kur riskini sözleşmeyle kapattığı için arbitraja yakın,
  açık faiz paritesi ise beklenen kura ve risk fiyatına dayandığı için kırılgandır.
  Bu ders carry trade getirisinin anomali mi yoksa nadir çöküşlerin bedeli mi
  olduğu tartışmasını kurar.
sure: 55
onkosul:
  - hafta-03/fisher-denklemi-ve-reel-faiz
  - hafta-05/satin-alma-gucu-paritesi
kaynaklar:
  - tip: video
    baslik: Uncovered Interest Parity and the Carry Trade
    url: https://www.youtube.com/watch?v=7LJ5sQgCisY
    kaynak: Marginal Revolution University
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Kapalı ve açık faiz paritesini aynı yatırım karşılaştırması üzerinden
      ayırır. Yüksek faizli paranın UIP'nin öngördüğü kadar değer kaybetmemesinin
      carry trade getirisini nasıl doğurduğunu görmek için hızlı bir iskelet sunar.
  - tip: article
    baslik: How Puzzling Is the Forward Premium Puzzle? A Meta-Analysis
    url: https://www.esm.europa.eu/sites/default/files/wp46.pdf
    kaynak: European Stability Mechanism, Working Paper 46
    seviye: ileri
    ozet: >-
      Forward premium bulmacasına ilişkin çok sayıda tahmini birleştirerek
      sonucun dönem ve para birimi grubuna duyarlılığını gösterir. Tek bir evrensel
      katsayı yerine örneklem seçiminin ve yayın dinamiklerinin önemini sınar.
  - tip: discussion
    baslik: Carry Trade — Beyond the Forward Premium Puzzle
    url: https://www.chicagobooth.edu/research/fama-miller/finance-research/funding/2010-11/carry-trade-beyond-the-forward-premium-puzzle
    kaynak: Fama-Miller Center, Chicago Booth
    seviye: ileri
    ozet: >-
      Carry trade, forward premium ve dolar ticareti anomalilerini farklı risk
      bileşenlerine ayıran araştırmayı özetler. “Carry neden çalışır?” sorusunun
      kullanılan zaman ve çapraz-para ayrımına göre değiştiğini gösterir.
sorular:
  - id: cip-forward-kuru
    tip: sayisal
    puan: 25
    soru: >-
      Spot kur 32 TL/USD, bir yıllık TL faizi %50 ve dolar faizi %5'tir.
      İşlem maliyeti ve temerrüt riski yoksa kapalı faiz paritesinin gerektirdiği
      bir yıllık forward kuru kaç TL/USD'dir? İki ondalıkla ver.
    beklenen: 45.71
    tolerans: 0.05
  - id: forward-premium-bulmacasi
    tip: acik
    puan: 40
    soru: >-
      Fama regresyonunda kur değişimi forward iskontosu üzerine koşulduğunda
      UIP neden eğim katsayısının 1 olmasını bekler? Katsayının sıfır ya da
      negatif bulunmasının carry trade açısından anlamını açıkla.
    olcut:
      - Forward iskontosunun kapalı faiz paritesi altında faiz farkını yansıttığını belirtir.
      - UIP altında yüksek faizli paranın beklenen değer kaybının faiz avantajını götürmesi gerektiğini açıklar.
      - Eğim katsayısı 1 ise gerçekleşen kur değişiminin forward iskontosuna bire bir karşılık verdiğini söyler.
      - Sıfır ya da negatif katsayının yüksek faizli paranın yeterince değer kaybetmediği veya değer kazandığı anlamına geldiğini belirtir.
      - Risk primi, peso problemi ya da nadir çöküş riski açıklamalarından en az ikisini anomalinin olası karşılığı olarak tartışır.
  - id: carry-bedava-degil
    tip: acik
    puan: 35
    soru: >-
      Yıllarca pozitif getiri üreten bir TL carry trade stratejisi neden “bedava
      arbitraj” değildir? 2018 benzeri bir kur şokunu, fonlama koşullarını ve
      ex-ante bilgi sorununu birlikte değerlendir.
    olcut:
      - Kur riski forward ile kapatılmadığı için stratejinin arbitraj değil riskli pozisyon olduğunu söyler.
      - Küçük ve sık kazançların seyrek fakat büyük kur kayıplarıyla silinebileceğini açıklar.
      - Kaldıraç, teminat çağrısı veya fonlama likiditesinden en az birinin çöküşte zararı büyüttüğünü belirtir.
      - Yüksek TL faizinin beklenen enflasyon, devalüasyon ve ülke riskine karşı tazminat içerebileceğini Fisher bağlantısıyla kurar.
      - Başarının yalnız gerçekleşen kura bakılarak ölçülmesinin karar anındaki olasılık dağılımını gözden kaçırdığını belirtir.
---

## İki parite, iki ayrı iddia

Faiz paritesi tek bir yasa değildir. Kapalı faiz paritesi (covered interest
parity, CIP) ile açık faiz paritesi (uncovered interest parity, UIP) aynı cebirden
çıkar, fakat farklı ekonomik iddialardır. Birinde gelecek kur sözleşmeyle
sabitlenir; diğerinde bilinmeyen kur bir beklentiyle ikame edilir. “Arbitraj
faiz farkını yok eder” cümlesinin nerede doğru olduğu bu ayrımda belirlenir.

Bir yerli yatırımcı bir birim parasını yerli tahvile koyarsa dönem sonunda
`1+i` elde eder. Yabancı paraya spot kurdan geçip `i*` faizi kazanır ve dönüş
kurunu bugün forward sözleşmesiyle kilitlerse getiriler arbitraj altında eşitlenir:

> F / S = (1 + i) / (1 + i*)

Bu CIP'dir. Aynı kredi riski, vade ve işlem maliyetleri altında sapma varsa
yatırımcı ucuz para biriminde borçlanır, pahalı getiriyi alır ve kur riskini
kapatarak kesin kazanç yaratır. Bilanço kapasitesi sınırsız değilse veya piyasada
dolar fonlaması sıkışmışsa küçük bir çapraz-kur bazı (cross-currency basis)
kalabilir. Yine de CIP, UIP'ye göre çok daha sert bir ölçüttür; çünkü denklemde
beklenti yoktur.

## Forward kur tahmin değildir

En yaygın hata, CIP ile hesaplanan `F`yi piyasanın gelecek spot kur tahmini
saymaktır. Forward kur, bugün iki para piyasasındaki bileşik getirileri eşitleyen
sözleşme fiyatıdır. Beklenen gelecek spot ancak risk nötrlüğü gibi ek varsayımlar
altında forward kura eşit olur.

Kur riski kapatılmazsa yatırımcının yabancı pozisyondan beklenen getirisi
gelecek spot kura bağlıdır. UIP şu koşulu ileri sürer:

> E(Sₜ₊₁) / Sₜ = (1 + i) / (1 + i*)

Yerli faiz yabancı faizden yüksekse yerli para o farkı götürecek kadar değer
kaybetmelidir. Aksi halde düşük faizli parada borçlanıp yüksek faizli parayı
tutmak beklenen fazla getiri sağlar. Bu işleme carry trade denir.

Ama “beklenen fazla getiri” ile “risksiz arbitraj” aynı şey değildir. UIP bir
denge modeli, CIP bir sözleşmeli getiri karşılaştırmasıdır. UIP başarısız
olduğunda masada para kalabilir; o paranın hangi riski taşıdığı tartışması başlar.

## Forward premium bulmacası

Ampirik sınama çoğu zaman gerçekleşen kur değişimini başlangıçtaki forward
iskontosu üzerine koşar. UIP ve rasyonel beklentiler altında eğim katsayısının
1 olması beklenir. Literatürde katsayı sıkça 1'in altında, sıfıra yakın, hatta
negatif bulunmuştur. Yüksek faizli para beklenen ölçüde değer kaybetmez; bazı
dönemlerde değer kazanır. Carry trade bu yüzden ortalamada kârlı görünür.

Neden? Birinci açıklama zamanla değişen risk primidir. Yüksek faizli para,
küresel risk iştahı bozulduğunda sert düşen bir varlıksa ortalama getirisi bu
kötü durum sigortasızlığının bedelidir. İkinci açıklama nadir çöküş riskidir:
yıllarca küçük kazanç, tek ayda büyük kayıp. Kısa örneklem o ayı içermediğinde
strateji yapay biçimde güvenli görünür. Üçüncü açıklama peso problemidir;
piyasanın fiyatladığı düşük olasılıklı rejim değişimi örneklemde gerçekleşmemiş
olabilir. Davranışsal beklenti hataları da yarışır.

Meta-analizin önemli dersi, “UIP reddedildi” cümlesinin son söz olmadığıdır.
Katsayı para grubuna, döneme ve ölçüm yöntemine göre değişir. Chicago Booth'ta
özetlenen ayrım da aynı noktayı keskinleştirir: tüm para birimlerini aynı anda
etkileyen dolar bileşeni ile yüksek ve düşük faizli paralar arasındaki çapraz
bileşen aynı anomali değildir. Tek katsayıya tek hikâye yüklemek fazla kolaydır.

Risk düzeltmesi de sonucu tersine çevirebilir. Carry portföyünün Sharpe oranı
yüksek görünürken kayıpları küresel stres günlerinde yoğunlaşıyorsa ortalama ve
standart sapma yeterli performans ölçüsü değildir. Yatırımcı zaten o günlerde
servet, iş geliri ve diğer riskli varlıklarında kaybediyorsa carry zararı özellikle
pahalıdır. Buna karşılık çöküşler iyi çeşitlendirilmiş ve sigortalanabilir ise
salt risk primi açıklaması zayıflar. Ampirik tartışma bu yüzden yalnız getirinin
pozitif olup olmadığına değil, getirinin hangi dünya durumunda ödendiğine bakar.
Opsiyon fiyatları ve kuyruk korunmasının maliyeti, gözlenen carry getirisinin ne
kadarının gerçekten fazla getiri olduğunu sınamak için doğal karşılaştırmadır.

## Türkiye'de yüksek faiz neyin karşılığıdır?

TL carry trade'i Fisher denkleminden bağımsız okunamaz. Yüzde 50 nominal faiz,
yüzde 5 faizden otomatik olarak daha yüksek reel beklenen getiri demek değildir.
Beklenen enflasyon, beklenen kur kaybı ve ülke risk primi aynı nominal farkın
içindedir. 2018'de olduğu gibi kurun kısa sürede sıçraması, aylarca biriken faiz
gelirini silebilir. Kaldıraçlı yatırımcı teminat çağrısıyla en kötü anda
pozisyon kapatmak zorunda kalabilir.

Buradaki uzlaşmazlık “carry kârlı mı?” değildir; veri üzerinde ortalama kâr
ölçülebilir. Tartışma, bu kârın yanlış fiyatlama mı yoksa kötü küresel durumlarda
zarar eden bir risk faktörünün adil karşılığı mı olduğudur. Sadece gerçekleşen
getiriye bakmak yeterli değildir. Aynı ortalamayı üreten dağılımlardan biri
ılımlı oynak, diğeri nadir yıkıcı kuyruk taşıyabilir.

Politika tarafında da forward kurun tahmin sanılması tehlikelidir. Forward
primi yükseldiğinde bu, piyasanın aynı büyüklükte devalüasyon beklediğini değil,
faiz farkının sözleşme fiyatına taşındığını kesin olarak söyler. Beklentiyi
çıkarmak için risk primini ayrıca modellemek gerekir; 3.1'de breakeven enflasyon
için karşılaştığımız ölçülemezlik burada yeniden ortaya çıkar.

## Bu dersten sonra

5.1'de mal arbitrajının yavaş, bu derste kapalı finansal arbitrajın hızlı
olduğunu gördük. 5.3'te sermaye hareketleri serbestken bu fiyat bağlarının ulusal
para politikasını nasıl daralttığını inceleyeceğiz. 6.5'te ödemeler dengesi
krizleri, carry pozisyonlarının neden bir anda tersine dönebildiğini bilanço ve
rezerv kısıtıyla tamamlayacak.
