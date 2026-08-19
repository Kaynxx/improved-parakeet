---
baslik: Bilanço politikası, QE ve QT
ozet: >-
  QE yalnız “para basmak”, QT de bunun mekanik tersi değildir. Bu ders varlık
  alımlarını portföy dengesi ve sinyal kanallarına ayırır; hangi kanalın baskın
  olduğunu veriden teşhis etmenin neden zor, bilanço normalleşmesinin neden
  asimetrik olduğunu tartışır.
sure: 55
onkosul:
  - hafta-01/merkez-bankasi-bilancosu
  - hafta-02/acik-piyasa-islemleri-ve-zorunlu-karsiliklar
kaynaklar:
  - tip: video
    baslik: Quantitative Easing
    url: https://www.youtube.com/watch?v=sGDc_Qr2xGM
    kaynak: EnhanceTuition
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      QE'nin merkez bankası bilançosunu varlık alımı yoluyla nasıl büyüttüğünü
      sade biçimde kurar. “Para basıp harcama” anlatısından bilanço takasına
      geçmek ve teknik kanal ayrımına hazırlanmak için izlenir.
  - tip: article
    baslik: >-
      The Effects of Quantitative Easing on Interest Rates: Channels and
      Implications for Policy
    url: https://www.nber.org/system/files/working_papers/w17555/w17555.pdf
    kaynak: Arvind Krishnamurthy, Annette Vissing-Jorgensen, NBER Working Paper 17555 (2011)
    seviye: uzman
    ozet: >-
      Varlık alımlarının sinyal, güvenli varlık talebi, enflasyon ve varlığa
      özgü risk kanalları üzerinden farklı faizleri farklı ölçüde etkilediğini
      olay çalışmasıyla gösterir. QE'nin tek ve homojen bir portföy etkisine
      indirgenemeyeceği için temel ampirik referanstır.
  - tip: discussion
    baslik: Revisiting the signalling channel of quantitative easing
    url: https://cepr.org/voxeu/columns/revisiting-signalling-channel-quantitative-easing
    kaynak: CEPR / VoxEU (Ekim 2024)
    seviye: ileri
    ozet: >-
      QE'nin etkisini ağırlıkla portföy dengesiyle açıklayan uzlaşmaya karşı
      sinyal kanalını yeniden öne çıkarır. Düşük faiz taahhüdü, özel bilgi ve
      beklenti yönetimi mekanizmalarını ayırarak hangi kanalın baskın olduğu
      tartışmasını günceller.
sorular:
  - id: qe-durasyon-etkisi
    tip: sayisal
    puan: 25
    soru: >-
      Bir merkez bankası modifiye durasyonu 8 olan uzun vadeli tahvilleri satın
      alıyor ve ilgili piyasa getirisi 75 baz puan düşüyor. Konveksiteyi ihmal
      ederek durasyon yaklaşımıyla tahvil fiyatındaki yaklaşık yüzde değişim
      nedir?
    beklenen: 6
    tolerans: 0.05
  - id: qe-kanal-teshisi
    tip: acik
    puan: 35
    soru: >-
      Bir QE duyurusunun ardından hem iki yıllık hem on yıllık tahvil getirisi
      düşüyor. Bu gözlem sinyal kanalı ile portföy dengesi kanalından hangisinin
      çalıştığını tek başına neden göstermez? İki kanalı ayırabilecek ek kanıt
      tasarla.
    olcut:
      - Uzun vadeli getiriyi beklenen kısa faizlerin ortalaması ile vade primi bileşenlerine ayırır.
      - Sinyal kanalının gelecekteki kısa politika faizi patikasını, portföy dengesi kanalının risk veya vade primini değiştirdiğini açıklar.
      - Aynı duyurunun hem alım miktarı hem gelecek faiz patikası hakkında bilgi taşıyabileceğini belirtir.
      - Varlık türleri ve vadeler arasında çapraz fiyat tepkisi ya da anket/OIS beklentisi gibi en az bir ayırt edici veri önerir.
      - Olay çalışmasının eşzamanlı iletişim ve piyasa beklentisi sorununu bütünüyle çözemeyeceğini kabul eder.
  - id: qt-asimetrisi
    tip: acik
    puan: 40
    soru: >-
      QT neden QE'nin aynı büyüklükte ve ters işaretli kopyası olmak zorunda
      değildir? Rezerv talebinin doğrusal olmaması, piyasa beklentileri,
      merkez bankası zararları ve Türkiye gibi yüksek enflasyonlu bir ekonomide
      güvenilirlik boyutlarını birlikte tartış.
    olcut:
      - QE'nin rezervleri bol bölgeye taşıyabildiğini, QT'nin ise rezerv talebi dirseğine yaklaşınca doğrusal olmayan faiz etkisi yaratabileceğini açıklar.
      - Önceden duyurulmuş bilanço küçülmesinin bilgi sürprizini ve sinyal etkisini azaltabileceğini belirtir.
      - Varlıkların vadesine bırakılması ile aktif satışın piyasa etkilerini ayırır.
      - Yüksek politika faizinin rezerv faizi gideri ve elde tutulan düşük kuponlu tahviller üzerinden muhasebe zararı üretebileceğini söyler.
      - Yüksek enflasyonlu ekonomide tahvil alımının mali finansman sinyali olarak okunup kur ve beklenti kanalını güçlendirebileceğini tartışır.
---

## QE bir bilanço takasıdır; etkisiz bir takas değildir

Merkez bankası uzun vadeli tahvil aldığında özel sektörün elinden faiz ve süre
riski taşıyan bir varlık çıkar, karşılığında gecelik ve merkez bankası riski
taşıyan rezerv verir. Toplam özel sektör finansal varlığı bu kayıtla zorunlu
olarak artmaz; bileşimi değişir. “QE para basmaktır” cümlesi rezerv yaratımını
yakalar, hangi varlığın neden fiyatlandığını açıklamaz.

Tersi hata da yaygındır: Tahvil rezervle değiştirildiğine göre işlem önemsiz bir
varlık takasıdır. Bu ancak rezerv ile tahvil kusursuz ikameyse doğrudur. Vade,
likidite, düzenleyici kullanım ve risk özellikleri farklıysa bilançonun bileşimi
fiyatları etkileyebilir. Tartışma QE'nin para yaratıp yaratmadığı değil, bu
özelliklerin hangi kanaldan ve ne ölçüde fiyatlandığıdır.

## Getiriyi iki parçaya ayır

Uzun vadeli nominal tahvil getirisi kabaca iki bileşene ayrılabilir:

> uzun getiri = beklenen kısa faizlerin ortalaması + vade primi

Bu ayrım iki ana QE kanalını temizler. **Sinyal kanalı**, varlık alımını merkez
bankasının politika faizini daha uzun süre düşük tutacağına dair taahhüt veya
özel bilgi olarak okur. Beklenen kısa faiz patikası düşer. Alımın portföyde
yarattığı kıtlık ikincil olabilir; güvenilir bir gelecek politika mesajı
belirleyicidir.

**Portföy dengesi kanalı**, yatırımcıların farklı vadeleri ve riskleri kusursuz
ikame görmediğini varsayar. Merkez bankası piyasadan uzun süre riski çekince
özel sektörün taşıması gereken toplam durasyon azalır; yatırımcılar kalan uzun
tahviller için daha düşük vade primi ister. Beklenen kısa faiz değişmeden uzun
getiri düşebilir.

Krishnamurthy ve Vissing-Jorgensen'in temel katkısı “hangisi doğrudur?” demek
değil, tek QE kanalının olmadığını göstermektir. Hazine tahvili, kurum tahvili
ve ipoteğe dayalı menkul kıymet aynı şekilde tepki vermez. Güvenli varlık
kıtlığı, temerrüt riski ve erken ödeme riski varlığa özgü kanallar açar. Alınan
varlığın kimliği politika tasarımının parçasıdır.

## Olay çalışması neden tartışmayı bitirmez?

Duyuru dakikasında tahvil getirisi düşerse piyasanın QE'ye tepki verdiğini
söyleyebiliriz. Fakat aynı açıklama hem alım miktarını hem gelecek faiz patikası
hakkındaki dili içeriyorsa iki kanalı ayıramayız. İki yıllık getirinin düşmesi
sinyale, merkez bankasının aldığı vadelerde göreli fiyat hareketi portföy
dengesine işaret edebilir; bunlar kesin teşhis değildir.

Daha güçlü tasarım, beklenen kısa faizleri OIS fiyatları veya anketlerle izler;
alınan ve alınmayan ama benzer riskteki varlıkların tepkisini karşılaştırır;
duyurunun sürpriz miktarını iletişim sürprizinden ayırmaya çalışır. Yine de
beklentiler duyurudan önce sızabilir ve piyasa likiditesi aynı anda değişebilir.
Ampirik uzlaşmanın bittiği yer burasıdır: QE'nin getirileri etkilediği birçok
olayda görünür, baskın kanal model ve tanımlama varsayımına bağlı kalır.

## Banka kredisi neden mekanik olarak artmaz?

QE sonrasında bankacılık sisteminin toplam rezervi artar; tek bir banka rezervi
başka bankaya aktarabilir ama sistem rezervi merkez bankasına geri vermeden yok
edemez. Buradan “fazla rezerv krediye dönüşür” sonucu çıkmaz. Banka kredi verirken
borçlunun mevduatını yaratır; karar sermaye, risk, talep ve kredi fiyatına bağlıdır.
Rezerv bolluğu ödeme ve fonlama kısıtını gevşetebilir, fakat kredi talebini veya
borçlu kalitesini yaratmaz.

Bu ayrım özellikle bol rezerv rejiminde önemlidir. Rezerv faizi ödendiğinde
bankanın rezerv tutmasının getirisi sıfır değildir. QE'nin aktarımı mekanik para
çarpanından değil; getiriler, teminat değerleri, varlık fiyatları, kur ve
beklentiler üzerinden aranmalıdır.

## Bilanço politikası maliye politikasına nerede yaklaşır?

Merkez bankası kısa vadeli faizli rezerv çıkarıp uzun vadeli devlet tahvili
aldığında konsolide kamu borcunun vade yapısını kısaltır. Tahvil kuponu kamu
kesimi içinde el değiştirirken, rezerv faizi piyasa faizine hızla uyarlanır.
Faizler yükseldiğinde merkez bankasının nakit gideri artabilir ve düşük kuponlu
portföyünde değer kaybı oluşabilir. Muhasebe zararı para yaratabilen bir kurumu
ticari banka gibi iflasa sürüklemez; fakat Hazine'ye kâr aktarımını kesebilir ve
siyasi baskı yaratabilir.

Bu mali sonuç QE'nin zorunlu olarak bütçe finansmanı olduğu anlamına gelmez.
Belirleyici ayrımlar, alımların ikincil piyasada mı yapıldığı, fiyat istikrarı
amacına nasıl bağlandığı ve çıkış kararının mali otoriteden bağımsız alınıp
alınamadığıdır. Yine de “yalnız teknik para politikası” etiketi dağılım ve kamu
finansmanı etkilerini ortadan kaldırmaz. Bilanço aracının meşruiyeti, aktarım
etkinliği kadar açık yetki ve hesap verebilirlik gerektirir.

## QT neden aynadaki QE değildir?

QT, vadesi dolan varlıkların yenilenmemesiyle pasif veya doğrudan satışla aktif
yürütülebilir. Önceden ilan edilmiş pasif küçülme az bilgi taşıyabilir; sürpriz
QE duyurusu kadar güçlü sinyal üretmez. Aktif satış ise piyasa yapıcılık
kapasitesine çarpıp daha büyük likidite primi doğurabilir.

Rezerv talebi de doğrusal değildir. Bilanço küçülürken rezervler uzun süre bol
kalır ve gecelik faiz etkilenmez; talep eğrisinin dirseğine gelindiğinde küçük
bir ek küçülme büyük faiz hareketi yaratabilir. Aynı milyarlık QE ve QT'nin
etkisini simetrik varsaymak bu rejim değişimini yok sayar.

Türkiye gibi yüksek enflasyon ve kur duyarlılığı olan bir ekonomide kanal
ağırlıkları ayrıca değişir. Devlet tahvili alımı, portföyden süre riski çekmenin
yanında mali finansman niyeti hakkında sinyal olarak okunabilir. Enflasyon
beklentisi ve kur tepkisi uzun getiriyi aşağı değil yukarı itebilir. Aynı
bilanço işleminin sonucu kurumsal güvenilirlikten bağımsız değildir; bu bizi
2.5'e götürür.

## Bu dersten sonra

3.3'te uzun getiriyi beklenen kısa faiz ve vade primine daha dikkatli
ayıracağız; 3.4'te durasyon ve konveksiteyle fiyat etkisini hesaplayacağız.
7.2'de bir politika “şokunu” duyurunun beklenen bölümünden ayırmanın ampirik
zorluğuna döneceğiz. Önce 2.5'te, merkez bankasının verdiği sinyalin neden bazı
kurumsal yapılarda daha inandırıcı olduğunu açıklamamız gerekiyor.
