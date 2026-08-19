---
baslik: Phillips eğrisi, beklentiler ve düzleşme tartışması
ozet: >-
  Phillips eğrisi değişmez bir doğa yasası değil, ücret ve fiyat belirleme
  davranışının rejime bağlı bir özetidir. Bu ders özgün ücret ilişkisinden
  beklentilerle genişletilmiş biçime geçer ve son yıllardaki düzleşmenin gerçek
  bir yapısal değişim mi, yoksa ölçüm ve dönem seçimi sonucu mu olduğunu tartışır.
sure: 50
onkosul:
  - hafta-03/parasal-aktarim-kanallari
  - hafta-03/fisher-denklemi-ve-reel-faiz
kaynaklar:
  - tip: video
    baslik: Enflasyon ile İşsizlik Arasındaki İlişki Nasıldır? Phillips Eğrisi Nedir?
    url: https://www.youtube.com/watch?v=wlqZcK3DlFk
    kaynak: SASKIN BILGIN
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Düşük işsizlik ile yüksek enflasyon arasındaki temel kısa dönem mantığını
      Türkçe ve kavramsal biçimde kurar. Beklentiler ve dönem ayrımına geçmeden
      önce eğrinin ne iddia ettiğini berraklaştırır.
  - tip: article
    baslik: 'Breaks in the Phillips Curve: Evidence from Panel Data'
    url: https://www.nber.org/system/files/working_papers/w31153/w31153.pdf
    kaynak: Simon Smith, Allan Timmermann, Jonathan H. Wright
    seviye: uzman
    ozet: >-
      ABD ve AB panel verilerinde Bayesian kırılma noktaları arayarak fiyat
      Phillips eğrisinin düzleşmesini ücret eğrisinden ayırır. “Eğri öldü”
      iddiasını tek katsayı yerine zamanla değişen rejimler üzerinden sınar.
  - tip: discussion
    baslik: Türkiye İçin Phillips Eğrisi Analizi
    url: https://www.mahfiegilmez.com/2016/08/turkiye-icin-phillips-egrisi.html
    kaynak: Mahfi Eğilmez (blog)
    seviye: ileri
    ozet: >-
      Türkiye verilerinde farklı dönemlerin işsizlik–enflasyon ilişkisini
      karşılaştırır. Kısa bir örneklemin yapısal sonuç gibi okunmasının riskini
      ve dezenflasyonun üretim maliyetine ilişkin politika gerilimini gösterir.
sorular:
  - id: beklentili-phillips
    tip: sayisal
    puan: 25
    soru: >-
      Beklentilerle genişletilmiş denklem π = πᵉ − α(u−u*) + s olsun.
      Beklenen enflasyon %20, işsizlik %12, doğal işsizlik %10, α=0,8 ve arz
      şoku +3 yüzde puanıysa gerçekleşen enflasyon yüzde kaçtır?
    beklenen: 21.4
    tolerans: 0.1
  - id: egri-duzlesti-mi
    tip: acik
    puan: 40
    soru: >-
      Enflasyonun işsizlik açığına duyarlılığını gösteren tahmini katsayının
      küçülmesi Phillips eğrisinin “öldüğünü” kanıtlar mı? En az dört rakip
      açıklamayı ve bunları ayıracak kanıtı tartış.
    olcut:
      - Beklentilerin daha iyi çıpalanmasının gerçekleşen enflasyon oynaklığını ve tahmini eğimi azaltabileceğini açıklar.
      - Küresel girdi fiyatları, ithalat ve tedarik zincirlerinin yerel işsizlik ölçüsünü eksik bırakabileceğini belirtir.
      - İşsizlik yerine işgücü açığı, eksik istihdam veya ücret enflasyonu kullanılmasının sonucu değiştirebileceğini söyler.
      - İlişkinin doğrusal olmayabileceğini ve yalnız düşük enflasyonlu bir döneme katsayı uydurmanın düzleşme izlenimi verebileceğini açıklar.
      - Yapısal kırılma, ülke paneli veya dönem dışı tahmin başarısı gibi ayırt edici bir sınama önerir.
  - id: turkiye-fedakarlik-orani
    tip: acik
    puan: 35
    soru: >-
      Türkiye'de dezenflasyon programının işsizlik maliyetini yalnız tarihsel
      Phillips eğrisiyle tahmin etmek neden güvenilmez olabilir? Yine de eğrinin
      politika için hangi koşullu bilgiyi sağlayabileceğini açıkla.
    olcut:
      - Enflasyon beklentilerinin ve para politikası güvenilirliğinin rejim değiştikçe tarihsel katsayıyı değiştireceğini belirtir.
      - Kur geçişkenliği, yönetilen fiyatlar ve ücret ayarlamalarının Türkiye'de bağımsız arz ve maliyet şokları yarattığını açıklar.
      - Kayıt dışılık, işgücüne katılım ve eksik istihdam nedeniyle manşet işsizliğin faaliyet açığını eksik ölçebileceğini söyler.
      - Tarihsel ilişkinin kesin takas değil, belirli beklenti ve şok varsayımları altında senaryo aralığı verebileceğini savunur.
---

## Phillips'in bulduğu neydi?

A. W. Phillips'in özgün çalışması fiyat enflasyonunu değil, Birleşik Krallık'ta
nominal ücret artışı ile işsizlik arasındaki ters ilişkiyi inceliyordu. İşsizlik
düşükken firmalar kıt emek için daha hızlı ücret artırıyor, çalışanların pazarlık
gücü yükseliyordu. Daha sonra ücret artışından verimlilik artışı çıkarılarak fiyat
enflasyonuna geçildi ve ilişki politika menüsüne dönüştürüldü: daha az işsizlik
karşılığında biraz daha çok enflasyon seçilebilir miydi?

Bu yorumun sorunu, istatistiksel bir düzenliliği değişmez takas sanmasıydı.
Politika yapıcı eğri üzerindeki bir noktayı sistematik biçimde seçmeye çalışırsa
haneler ve firmalar bunu öğrenir. Ücret sözleşmeleri geçmiş enflasyona değil,
beklenen enflasyona göre kurulur. Böylece eğrinin kendisi politika davranışıyla
yer değiştirir.

## Beklentilerle genişletilmiş eğri

Basit bir beklentili fiyat Phillips eğrisi şöyle yazılabilir:

> π_t = πᵉ_t − α(u_t − u*_t) + s_t

Burada `πᵉ` beklenen enflasyon, `u−u*` işsizlik açığı, `α` faaliyet baskısının
enflasyona geçişi ve `s` petrol, kur, vergi ya da tedarik gibi arz şoklarıdır.
İşsizlik doğal düzeyinin altındaysa açık negatiftir ve enflasyon üzerinde yukarı
baskı oluşur. Fakat aynı işsizlik oranı, beklenti yüzde 5 iken başka, yüzde 50
iken başka enflasyon üretir.

Uyarlayıcı beklentiler altında geçmiş enflasyon yeni sözleşmelere taşınır.
Rasyonel beklentiler yorumunda ise sistematik politika sürprizi kalıcı üretim
kazancı sağlayamaz. Uzun dönemde gerçekleşen ile beklenen enflasyon eşitlendiğinde
işsizlik `u*` çevresine döner; uzun dönem eğri dikeydir. Bu sonuç, doğal işsizlik
oranının sabit ve gözlenebilir olduğu anlamına gelmez. Beceri uyumsuzluğu,
histerezi, demografi ve kurumlar `u*` tahminini değiştirir.

## Lucas eleştirisi: katsayı politika rejimine bağlıdır

Geçmiş veriden “enflasyonu bir puan düşürmek işsizliği şu kadar artırır” katsayısı
hesaplamak caziptir. Fakat para politikası kuralı değiştiğinde beklenti kurma
biçimi de değişir. Eski rejimde tahmin edilen katsayı yeni rejimde sabit kalmaz.
Bu, Lucas eleştirisinin doğrudan uygulamasıdır: davranış parametresi sandığımız
şey, geçmiş politikanın ürünü olabilir.

İnandırıcı bir dezenflasyon, beklentileri hızla indirirse aynı enflasyon düşüşü
daha küçük üretim kaybıyla gerçekleşebilir. İnandırıcılık yoksa çalışanlar ve
firmalar yüksek geçmiş enflasyonu sözleşmelere taşır; merkez bankası talebi çok
daha sert kısmak zorunda kalır. Burada “acı çekmeden dezenflasyon” garantisi de
“fedakârlık oranı tarihten okunur” kesinliği de yoktur.

## Eğri neden düzleşmiş görünebilir?

2000'ler ve 2010'larda birçok ülkede işsizlik büyük hareketler gösterirken
enflasyon daha az tepki verdi. Bir açıklama, merkez bankalarının beklentileri
başarıyla çıpalamasıdır. Talep güçlendiğinde insanlar gelecekteki enflasyonun
hedefe döneceğine inanıyorsa ücret ve fiyat ayarı sınırlı kalır. Bu başarı,
enflasyonun faaliyete tepkisini veride görünmez kılar.

İkinci açıklama küreselleşmedir. Yerel işsizlik, ithal ara malı maliyetini ve
küresel kapasiteyi yakalamaz. Üçüncüsü ölçümdür: manşet işsizlik, işgücüne
katılımdaki düşüşü ve eksik istihdamı saklayabilir; TÜFE ise kalite ve ikame
kararları taşır. Dördüncüsü doğrusal olmamadır. Eğri normal zamanlarda yatık,
kapasite sınırına yaklaşıldığında dik olabilir. Sadece sakin döneme çizgi
uydurmak yapısal düzleşmeyi abartır.

Fiyat ve ücret eğrileri de aynı davranmak zorunda değildir. Ücretler sıkı emek
piyasasına tepki verirken firmalar marjlarını daraltabilir; fiyat geçişi zayıf
kalır. NBER çalışmasının fiyat eğrisinde daha belirgin, ücret eğrisinde daha
sınırlı düzleşme bulması bu ayrımın önemini gösterir.

### Düz eğri iyi haber olmayabilir

Küçük `α`, merkez bankasının talebi az maliyetle yönetebildiği anlamına gelmez.
Tersine enflasyonu bir puan düşürmek için daha büyük bir işsizlik açığı gerekebilir.
Çıpalanmış beklentiler olumluysa eğri yatık görünür; fakat çıpa kırıldığında
beklenti terimi sıçrar ve geçmiş katsayı bir anda geçersizleşir. 2021–2022 küresel
enflasyon dalgası bu ayrımı görünür kıldı: uzun süre sessiz kalan fiyatlar,
tedarik ve talep şokları birlikte geldiğinde hızla ayarlandı.

Tahmin sorunu eşanlılıktır. Merkez bankası enflasyon baskısını gördüğünde talebi
daraltırsa veride yüksek enflasyon ile düşük işsizlik aynı anda görülmeyebilir;
başarılı politika, ölçmeye çalıştığımız ilişkiyi bastırır. Bu yüzden yalnız basit
saçılım grafiği değil, dışsal talep şokları veya yapısal model gerekir. Eğrinin
eğimi gözlenen iki serinin korelasyonundan ibaret değildir.

## Türkiye'de neden tek eğri yetmez?

Türkiye'de kur şokları, yönetilen fiyatlar, vergi ayarlamaları ve geriye dönük
ücret endekslemesi `s_t` terimini büyütür. 2018 gibi dönemlerde enflasyon ile
faaliyet aynı yönde kötüleşebilir: kur maliyeti fiyatları yükseltirken finansal
koşullar üretimi daraltır. Nokta bulutu bu durumda pozitif ilişki bile gösterebilir;
bu, talep kanalının yokluğunu değil baskın arz şokunu anlatır.

2021 sonrasında yüksek ve oynak beklentiler, geçmiş düşük enflasyon döneminden
tahmin edilen eğimi taşımayı daha da sorunlu kıldı. Türkiye için anlamlı çalışma;
kur şokunu, beklentiyi ve yönetilen fiyatları ayrı değişkenlerle kontrol eder,
işsizlik yerine alternatif işgücü açığı ölçülerini sınar ve kırılmalara izin
verir. Sonuç yine bir politika menüsü değil, koşullu bir mekanizma tahminidir.

## Bu dersten sonra

3.2'deki faiz, kredi ve kur kanalları talep açığının nasıl oluştuğunu; 4.2 ise
bu açığın ücret ve fiyata nasıl geçtiğini gösterir. 4.3'te daha toplulaştırılmış
bir iddiaya, para miktarı ile nominal gelir ilişkisine geçeceğiz. 8.2'de mali
baskınlığı incelerken Phillips eğrisinin ihmal ettiği rejim değişkeninin neden
enflasyonun merkezine yerleşebildiğini göreceğiz.
