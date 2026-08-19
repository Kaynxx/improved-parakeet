---
baslik: Ödeme sistemleri ve rezerv dolaşımı
ozet: >-
  Mevduatla verilen ödeme talimatı, bankalar arasında merkez bankası rezerviyle
  kesinleşir. Bu ders RTGS'nin mutabakat riskini nasıl azalttığını; aynı anda
  neden daha fazla gün içi likidite, teminat ve kuyruk yönetimi istediğini
  kurar ve güvenlik ile likidite verimliliği arasındaki kalıcı ödünleşimi tartışır.
sure: 55
onkosul: [hafta-01/merkez-bankasi-bilancosu, hafta-01/para-arzi-tanimlari-ve-icsellik]
kaynaklar:
  - tip: video
    baslik: RTGS – The standard in interbank payment traffic
    url: https://www.youtube.com/watch?v=ydTk7s1Vlik
    kaynak: SIX
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      SIC ve euroSIC üzerinden her ödemenin tek tek, gerçek zamanda ve merkez
      bankası parasıyla kapatılmasını somutlaştırır. Videoyu mesaj, ödeme ve
      nihai mutabakatın aynı olay olmadığını altyapı düzeyinde ayırmak için izle.
  - tip: article
    baslik: Real-Time Gross Settlement Systems
    url: https://www.bis.org/cpmi/publ/d22.pdf
    kaynak: Committee on Payment and Settlement Systems (G10 merkez bankaları), BIS, Mart 1997
    seviye: ileri
    ozet: >-
      BIS raporu RTGS'nin net mutabakata karşı risk mantığını, gün içi likidite
      ihtiyacını, kuyrukları ve gridlock sorununu sistematik biçimde kurar.
      Güvenli ödeme altyapısının neden yalnız yazılım değil merkez bankası
      kredisi, teminat ve sıra kuralları tasarımı olduğunu anlamak için ana metindir.
  - tip: discussion
    baslik: Liquidity, Settlement Risk, and Systemic Stability
    url: https://www.chicagofed.org/publications/speeches/2017/9-08-liquidity-settlement-risks-and-systemic-stability-marshall
    kaynak: David Marshall, Federal Reserve Bank of Chicago (Eylül 2017 konuşması)
    seviye: orta
    ozet: >-
      Marshall, RTGS'nin kredi ve mutabakat riskini azaltırken sistemi gün içi
      likiditeye daha bağımlı kıldığını savunur. Konuşma, likidite desteğinin
      sistemik sigorta ile merkez bankasına risk aktarımı arasındaki sınırını
      tartışmaya açar.
sorular:
  - id: gun-ici-likidite
    tip: sayisal
    puan: 30
    soru: >-
      Bir bankanın RTGS günündeki kesin ödeme sırası şöyledir: önce 70 milyon
      lira çıkış, sonra 50 milyon lira giriş, sonra 40 milyon lira çıkış.
      Hesabın eksiye düşmesine izin verilmiyor ve işlemler yeniden
      sıralanamıyorsa bankanın güne başlaması gereken en düşük rezerv bakiyesi
      kaç milyon liradır?
    beklenen: 70
    tolerans: 0
  - id: rtgs-net-takas
    tip: acik
    puan: 35
    soru: >-
      Aynı gün içinde karşılıklı çok sayıda ödeme yapan bankalar için RTGS ile
      ertelenmiş net mutabakatı karşılaştır. “RTGS her bakımdan daha güvenlidir”
      hükmünün neden eksik olduğunu açıkla.
    olcut:
      - RTGS'de her ödemenin tek tek ve gerçek zamanda merkez bankası parasıyla nihai hâle geldiğini belirtir.
      - Ertelenmiş net mutabakatta gün içi talimatların mahsup edilip yalnız net bakiyenin daha sonra ödendiğini açıklar.
      - Netleştirmenin gereken rezerv miktarını düşürdüğünü, fakat mutabakat anına kadar katılımcılar arası kredi veya ikame maliyeti riski biriktirdiğini belirtir.
      - RTGS'nin bu birikmiş mutabakat riskini azalttığını, buna karşılık gün içi likidite ihtiyacını ve ödeme geciktirme teşvikini artırabildiğini açıklar.
      - Sistem güvenliğinin kesinlik yanında kuyruk, gridlock, operasyonel dayanıklılık ve merkez bankası likidite tasarımına bağlı olduğu sonucuna varır.
  - id: merkez-bankasi-kredisi
    tip: acik
    puan: 35
    soru: >-
      Merkez bankası gün içi krediyi sıfır faizle ve yeterli teminat karşılığı
      sağlıyor. Bu imkân sistemik istikrarı nasıl güçlendirir, hangi riskleri
      ortadan kaldırmaz ve tasarımda hangi sınırlar gerekir?
    olcut:
      - Gün içi kredinin ödeme zamanlaması uyuşmazlığını karşılayıp likidite nedeniyle bekleyen talimatları azaltacağını açıklar.
      - Teminatın merkez bankasının kredi riskini sınırladığını, fakat teminat değerinin oynaklığı ve yanlış fiyatlama riskini ortadan kaldırmadığını belirtir.
      - Sıfır fiyatın bankaların kendi likidite tamponunu düşük tutmasına veya likidite yönetimini merkez bankasına devretmesine yol açabileceğini açıklar.
      - Operasyonel kesinti, siber olay, katılımcı temerrüdü sonrası süreç veya gridlock risklerinden en az ikisinin krediyle tek başına çözülmediğini belirtir.
      - Teminat kırpıntısı, erişim sınırı, gün sonu geri ödeme, cezai gecelik faiz veya kuyruklama kuralından en az üçünü tasarım aracı olarak önerir.
---

## Ekrandaki ödeme ne zaman bitmiştir?

Bir müşteri mobil uygulamada “gönder” tuşuna bastığında üç ayrı olay başlar.
Banka talimatı kabul eder, alıcının bankasına bir ödeme mesajı gider ve iki
banka arasındaki alacak nihai olarak mutabakata bağlanır. Kullanıcı arayüzü
bunları tek an gibi gösterir. Finansal sistem açısından kritik olan üçüncüsüdür:
Gönderen banka, alıcının bankasına karşı yükümlülüğünü hangi varlıkla ve ne
zaman geri alınamaz biçimde kapatmıştır?

1.3'te yanıtı bilançoda gördük. Ticari banka mevduatı müşteriler arası ödeme
aracıdır; bankalar arası nihai araç merkez bankası rezervidir. A Bankası
müşterisi B Bankası müşterisine 1 milyon lira gönderdiğinde A'nın müşteri
mevduatı azalır, B'nin müşteri mevduatı artar; merkez bankası hesaplarında da
A'nın rezervi 1 milyon azalır, B'ninki artar. Sistem toplam rezerv yaratmaz,
rezervin sahibi değişir.

## Brüt, gerçek zamanlı ve nihai

**Gerçek zamanlı brüt mutabakat** (RTGS) üç ayrı tasarım kararı taşır:

- Gerçek zamanlıdır: talimatlar gün sonunu beklemeden işlenir.
- Brütdür: karşılıklı ödemeler önce netleştirilmez, her biri tam tutarıyla
  kapatılır.
- Mutabakat nihaidir: rezerv transferi tamamlandığında ödeme geri alınamaz ve
  alıcı banka gönderen bankanın daha sonraki iflas riskini taşımaz.

Alternatif ertelenmiş net mutabakatta gün boyunca A'nın B'ye 100, B'nin A'ya
90 gönderdiği talimatlar birikir; gün sonunda A yalnız 10 öder. Likidite
bakımından çok verimlidir. Fakat gün içindeki 190 birimlik brüt akış henüz
merkez bankası parasıyla kapanmamıştır. Bir katılımcı mutabakattan önce
başarısız olursa diğer ödemelerin çözülmesi, yeniden hesaplanması veya zarar
paylaşımı gerekir. Netleştirme likidite ihtiyacını azaltırken ertelenmiş kredi
ve mutabakat riski yaratır.

RTGS bu riski işlem işlem keser; bedelini likiditeyle ödetir.

## Gün içi likidite bir stok değil, zaman problemidir

Bir bankanın gün sonu net konumu küçük olsa bile sabah büyük çıkışları olabilir.
Sıra 70 milyon çıkış, 50 milyon giriş, 40 milyon çıkışsa gün sonu net çıkış 60
milyondur. Fakat işlemler yeniden sıralanamıyor ve bakiye eksiye düşemiyorsa
başlangıç rezervi en az 70 milyon olmalıdır. Net konum 60 iken tepe likidite
ihtiyacı 70'tir. Ödeme sistemi bilanço toplamından çok **gün içi yol** ile
ilgilenir.

Likiditesi yetersiz banka talimatı kuyruğa koyar. Tek bir kuyruk sorun değildir;
gelecek giriş daha sonra ödemeyi serbest bırakabilir. Fakat bankalar “önce bana
ödeme gelsin” diye kendi çıkışlarını bekletirse dairesel bağımlılık oluşur.
A, B'den; B, C'den; C, A'dan giriş bekler. Herkes gün sonunda ödeme gücüne
sahip olabilir, fakat hiç kimse ilk adımı atamaz. Bu **gridlock**, temerrüt
olmadan ödeme sistemini dondurabilir.

Kuyruk optimizasyonu ve likidite tasarrufu mekanizmaları RTGS ile netleştirme
arasında melez çözümler kurar. Sistem, nihailik koşulunu bozmadan birbiriyle
uyumlu bekleyen ödemeleri eşzamanlı serbest bırakabilir. Böylece “brüt” sistem
her talimatın mutlaka kör bir ilk-gelen-ilk-çıkar sırasıyla yürütülmesi demek
olmaz.

## Merkez bankası ne kadar yardım etmeli?

Merkez bankası gün içi kredi vererek rezervin zamanlama açığını kapatabilir.
Yeterli teminat karşılığı sıfır faizli kredi, geçici likidite eksikliğinin
ödeme krizine dönüşmesini önler. Tahsilatlar geldikçe kredi aynı gün geri
ödenir. Bu, merkez bankasının yalnız para politikası kurumu değil ödeme
sisteminin işletim çekirdeği olduğunu gösterir.

Fakat cömert likidite bedelsiz güvenlik değildir. Banka kendi tamponunu
azaltabilir, düşük kaliteli teminatı sisteme taşıyabilir veya gün içi krediyi
gecelik fonlamaya çevirmeye çalışabilir. Teminat fiyatı düşerse merkez bankası
kredi riski taşır. Gün sonu geri ödeme zorunluluğu, teminat kırpıntısı, erişim
limiti ve geceliğe sarkan açığa cezai faiz bu teşvikleri sınırlar. Operasyonel
kesinti veya siber saldırı ise rezerv bolluğuyla çözülmez; yedek bağlantı,
iş sürekliliği ve açık temerrüt prosedürü gerekir.

Marshall'ın “iki ucu keskin kılıç” vurgusu buraya oturur. RTGS bir bankanın
gün boyu diğerlerine teminatsız borç biriktirmesini engeller; ama bütün sistemi
kesintisiz gün içi likiditeye ve ortak altyapıya bağımlı kılar. Risk yok olmaz,
**kredi riskinden likidite ve operasyon riskine doğru yer değiştirir.**

## Türkiye'ye iniş

TCMB'nin EFT-EMKT altyapısını anlamanın doğru yolu, onu yalnız hızlı havale
kanalı olarak görmemektir. EFT lira ödemelerin, EMKT menkul kıymet işlemlerinin
mutabakatını merkez bankası parasıyla ilişkilendirir. Büyük tutarlı bir ödeme
akışı bankanın gün sonu bilançosu sağlam olsa bile gün içinde rezerv talebini
artırabilir. Bu nedenle TCMB'nin gün içi likidite, teminat ve geç likidite
kuralları para politikasının kenarında duran teknik ayrıntılar değildir;
politika faizinin ve finansal istikrarın işleyebilmesi için altyapıdır.

## Bu dersten sonra

Hafta 1'in zinciri tamamlandı: kredi banka mevduatı yarattı, merkez bankası
rezervi bankalar arası ödemeyi kapattı, parasal toplamlar bu yükümlülükleri
farklı genişliklerde ölçtü ve RTGS onları zaman içinde dolaştırdı. 2.1'de faiz
koridoruna geçtiğimizde gecelik faizin neden rezerv piyasasında oluştuğunu;
2.2'de kıt ve bol rezerv rejimlerinin ödeme likiditesiyle politika uygulamasını
nasıl değiştirdiğini bu altyapı üzerinden okuyacağız. 6.3'te banka hücumuna
döndüğümüzde ise ödeme gücü ile likidite arasındaki ayrım çok daha sert biçimde
geri gelecek.
