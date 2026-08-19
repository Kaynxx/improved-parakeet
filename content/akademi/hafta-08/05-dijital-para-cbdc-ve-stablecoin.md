---
baslik: >-
  Dijital para: CBDC, stablecoin ve banka aracılığının geleceği
ozet: >-
  Dijital para yeni bir ödeme arayüzünden önce yeni bir yükümlülük mimarisidir.
  Bu ders CBDC ile stablecoin'i ihraççı, rezerv ve itfa riski üzerinden ayırır;
  daha güvenli paranın ödeme verimliliği sağlarken bankaları fonlamadan mahrum
  bırakıp bırakmayacağını tartışır.
sure: 55
onkosul:
  - hafta-01/odeme-sistemleri-ve-rezerv-dolasimi
  - hafta-08/dolarizasyon-histerezisi
kaynaklar:
  - tip: video
    baslik: "Dijital TL nedir? Türkiye'de nakit para gerçekten bitecek mi"
    url: "https://www.youtube.com/watch?v=DXhRAF-ckXw"
    kaynak: "Nöbetçi Gazete"
    sure: süre doğrulanamadı
    seviye: orta
    ozet: >-
      Dijital Türk Lirası'nı kripto varlıktan ayırır ve nakdin yerine geçmekten
      çok mevcut ödeme araçlarını tamamlayan yönünü açıklar. Teknik tasarım
      seçeneklerine geçmeden önce Türkiye'deki temel kavram karmaşasını temizler.
  - tip: article
    baslik: "Dijital Türk Lirası İkinci Faz İlerleme Raporu"
    url: "https://tcmb.gov.tr/wps/wcm/connect/e90f13d5-2d7d-423d-91c9-038207fd6021/Dijital+T%C3%BCrk+Liras%C4%B1+%C4%B0kinci+Faz+%C4%B0lerleme+Raporu.pdf?MOD=AJPERES"
    kaynak: "TCMB (24 Kasım 2025)"
    seviye: uzman
    ozet: >-
      Programlanabilir ve çevrimdışı ödemeler ile ekosistem testlerinin hangi
      aşamada olduğunu resmi kaynaktan gösterir. CBDC'nin soyut bir kavram
      değil, banka ve ödeme kuruluşlarıyla tasarlanan bir altyapı tercihi
      olduğunu değerlendirmek için okunur.
  - tip: discussion
    baslik: "Stablecoin Savaşları"
    url: "https://fintechtime.com/2026/03/stablecoin-savaslari/"
    kaynak: "Fintechtime (Mart 2026)"
    seviye: orta
    ozet: >-
      Stablecoin rekabetini dijital doların kontrolü ve Türkiye'deki kripto
      dolarizasyonu üzerinden tartışır. Resmî CBDC tasarımının yalnız yerli
      ödeme verimliliğiyle değil, sınır ötesi özel para rekabetiyle de
      değerlendirilmesini sağlar.
sorular:
  - id: cbdc-fonlama-cikisi
    tip: sayisal
    puan: 25
    soru: >-
      30 milyon yetişkinin her biri faizsiz perakende CBDC cüzdanında ortalama
      4.000 TL tutarsa ve bu bakiyenin tamamı banka mevduatından gelirse,
      bankacılık sisteminden kaç milyar TL mevduat çıkar? Sonucu milyar TL
      cinsinden ver.
    beklenen: 120
    tolerans: 0.1
  - id: guvenli-para-ikilemi
    tip: acik
    puan: 40
    soru: >-
      Hanehalkına doğrudan merkez bankası parası sunmanın ödeme sistemini daha
      güvenli kılarken bankacılığı neden kırılganlaştırabileceğini açıkla.
      Normal zaman, banka hücumu ve merkez bankasının karşı önlemlerini aynı
      bilanço anlatısında birleştir.
    olcut:
      - CBDC'nin merkez bankası yükümlülüğü, ticari banka mevduatının ise banka yükümlülüğü olduğunu ayırır.
      - Mevduattan CBDC'ye geçişin bankaların ucuz ve istikrarlı fonlamasını azaltabileceğini belirtir.
      - Stres anında dijital dönüşümün hızlı ve sürekli erişilebilir olması nedeniyle banka hücumunu hızlandırabileceğini açıklar.
      - Tutma limiti, kademeli faiz, aracılı dağıtım veya dönüşüm sınırı araçlarından en az ikisini değerlendirir.
      - Merkez bankasının kaybolan mevduatı yeniden finansmanla ikame etmesinin kredi tahsisini merkezileştirebileceğini söyler.
  - id: uc-para-rekabeti
    tip: acik
    puan: 35
    soru: >-
      Türkiye'de banka mevduatı, Dijital Türk Lirası ve dolar stablecoin'lerinin
      birlikte bulunduğu bir gelecekte para politikası aktarımı nasıl değişir?
      “CBDC stablecoin'i otomatik olarak tasfiye eder” iddiasını itfa, mahremiyet,
      sınır ötesi kullanım ve dolarizasyon histerezisi üzerinden eleştir.
    olcut:
      - Üç aracın ihraççısını ve taşıdığı kredi, merkez bankası veya rezerv varlık riskini ayrı ayrı belirtir.
      - Stablecoin'in sabit değer vaadinin rezerv kalitesi ve itfa kapasitesine bağlı olduğunu açıklar.
      - Yüksek enflasyon ve dolarizasyon histerezisinin yerli CBDC'ye rağmen dijital dolar talebini sürdürebileceğini söyler.
      - Mahremiyet, programlanabilirlik ve çevrimdışı kullanım tasarımının kullanıcı tercihini etkilediğini belirtir.
      - Stablecoin akımlarının banka mevduatı, sermaye hareketleri ve resmî döviz istatistiklerinin görünürlüğünü değiştirebileceğini açıklar.
---

## Politika Kararı: Dijital Para, CBDC ve Stablecoin Mimarisi

**Karar Tarihi:** [Dönem Sonu Değerlendirmesi]
**Konu:** Dijital ödeme arayüzlerinin yükümlülük mimarisine etkileri, banka aracılığının geleceği ve kripto dolarizasyon riskleri.

### 1. Temel Tespitler: Dijital Olan Para Değil, Erişim Biçimidir

Banka mevduatının halihazırda dijital bir formda (maaş hesapları, kartlı ödemeler, mobil uygulamalar) işlediği sabittir. Merkez Bankası Dijital Parası'nı (CBDC) yenilikçi kılan unsur, ekrandaki sayısal temsil değil, bu temsilin işaret ettiği yükümlülük yapısıdır. Mevduat ticari bankanın borcu iken; nakit ve merkez bankası rezervi doğrudan merkez bankasının yükümlülüğüdür. Perakende CBDC, hanehalkına merkez bankası yükümlülüğünü dijital biçimde tutma imkânı tanıyan yapısal bir politika değişikliğidir.

Öte yandan stablecoin'ler, özel ihraççıların belirli bir itibari paraya karşı sunduğu sabit değer vaatleridir. Bir token'ın değerini koruması, salt yazılım kodunun matematiksel garantisiyle değil; ihraççının rezerv varlık kalitesine, saklama koşullarına, hukuki ayrıştırmaya ve talep anındaki itfa kapasitesine bağlıdır. CBDC ile stablecoin'i salt "blokzincir tabanlı" olmaları gerekçesiyle aynı kategoride değerlendirmek, egemen devlet parası ile özel para piyasası fonu payını eşdeğer tutmak anlamına gelir ve analitik bir hatadır.

### 2. Yapısal Dönüşüm: Üç Katmanlı Para Sisteminin Yeniden Tasarımı

Modern para sistemindeki mevcut iş bölümü (Madde 1.2 ve 1.5 bulguları) şu şekildedir: Merkez bankası nihai takas varlığını sağlar, ticari bankalar kredi mekanizmasıyla mevduat yaratır, ödeme kuruluşları ise kullanıcı arayüzünü sunar. Bu katmanlı yapı, kredi risk değerlendirmesini dağıtırken nihai mutabakatı kamusal paraya bağlar.

Perakende CBDC tasarımı, bu kurumsal sınırları doğrudan etkiler.

> **Politika İlkesi I:** Teknoloji tercihi, kurumsal yönetişim tercihini perdelememelidir. Kullanıcının doğrudan merkez bankasında hesap tutması; kimlik doğrulama, müşteri hizmetleri, veri mahremiyeti ve hatalı işlem iptali gibi operasyonel yüklerin kamuya geçmesi demektir.

Aracılı modelde cüzdan hizmeti bankalar veya ödeme kuruluşlarınca sunulsa dahi, altyapıdaki yükümlülük merkez bankasına aittir.

### 3. Finansal İstikrar Analizi: Güvenli Para ve Banka Kırılganlığı İkilemi

Hanehalkının mevduatlarını CBDC'ye dönüştürmesi, banka bilançolarında rezerv azalışına ve mevduat yükümlülüğünün kapanmasına yol açarken, merkez bankasının CBDC yükümlülüğünü artırır.

**Senaryo Analizi (Fonlama Çıkışı):**
*   **Hedef Kitle:** 30 milyon yetişkin
*   **Ortalama CBDC Bakiyesi:** 4.000 TL
*   **Sistemden Çıkacak Tahmini Mevduat:** 120 Milyar TL

Bu 120 milyar TL'lik fonlama kaybı, bankaları tahvil ihracı, toptan fonlama veya merkez bankası kredisi gibi daha maliyetli ve oynak kaynaklara yöneltecek, nihayetinde kredi faizlerinde artışa neden olabilecektir.

Daha kritik olan husus, stres anlarındaki likidite dinamiğidir. Banka şubelerindeki fiziki kuyrukların yerini, mobil cihazlar üzerinden saniyeler içinde risksiz merkez bankası parasına kaçışın alması, banka hücumlarını (Madde 6.3) eşi görülmemiş ölçüde hızlandıracaktır. CBDC likidite riskini yok etmez; yalnızca güvenli varlığa geçişin sürtünme maliyetini sıfırlar.

**Önerilen Karşı Önlemler ve Politika Ödünleri:**
1.  **Tutma Limiti:** Sert limitler CBDC'nin benimsenmesini sınırlar.
2.  **Kademeli Faiz:** Belirli bir eşik üzeri bakiyeye negatif faiz uygulanması, kamuoyunda anlaşılabilirliği zedeler.
3.  **Dönüşüm Sınırı:** Kriz anında hızı sınırlamak, "risksiz ve her an ödenebilir" para vaadiyle çelişir.
4.  **Yeniden Finansman:** Merkez bankasının kayıp fonu bankalara geri sağlaması, kredi tahsisinde kamu bilançosunun rolünü aşırı büyütür.

### 4. Tasarım Parametreleri: Programlanabilirlik ve Mahremiyet

Komite, **programlanabilir ödeme** (kullanıcı talimatına bağlı otomatik transfer, menkul kıymet teslimiyle eşzamanlı mutabakat) ile **programlanabilir para** (ihraççı düzeyinde paranın nerede ve ne zaman harcanabileceğine dair kısıtlamalar) arasındaki ayrımın altını çizer.

Mahremiyet ekseninde tam izlenebilir bir CBDC suçla mücadeleyi kolaylaştırsa da devletin veri gücünü orantısız büyütür. Tam anonim tasarım ise yaptırım uygulamalarını imkânsız kılar. Çevrimdışı küçük işlem limitleri, katmanlı kimlik doğrulama ve veri minimizasyonu teknik seçeneklerdir; ancak nihai mahremiyet seviyesi teknik değil, siyasal bir karardır. TCMB'nin İkinci Faz çalışmaları, salt bir altyapı deneyi değil, gelecekteki finansal iş bölümünün ve yönetişim modelinin prototipidir.

### 5. Dışsal Risk Değerlendirmesi: Stablecoin ve Kripto Dolarizasyonu

Dolar stablecoin'leri, yerel kullanıcılara banka sistemi dışında, 7/24 sınır ötesi devredilebilen bir sentetik dolar aracı sunmaktadır. Dolarizasyon histerezisi (Madde 8.4), bu araçlarla dijital bir form kazanmaktadır. Yerli CBDC teknolojik olarak kusursuz çalışsa dahi, kullanıcı kuyruk riskine ve enflasyona karşı yabancı para talep ediyorsa, ödeme sisteminin verimliliği para birimi tercihini değiştirmeyecektir.

| Stablecoin Risk Faktörleri | Makroekonomik Etkileri |
| :--- | :--- |
| **Rezerv Kalitesi** | Uzun vadeli/riskli varlık tutulması halinde toplu itfa taleplerinin fiyatları bozması. |
| **Operasyonel Riskler** | Hesap dondurma, saklama anahtarı kaybı ve yabancı otorite düzenlemeleriyle erişim kesintisi. |
| **Makro-Finansal Görünürlük** | Tasarrufların zincir üstüne kaymasıyla yerli kredi fonlamasının daralması ve resmî döviz istatistiklerinin körleşmesi. |

### 6. Stratejik Yönelim: Rekabet Yerine İş Bölümü

CBDC'nin özel stablecoin'leri tamamen tasfiye edeceği yönündeki iddialar ile devlet altyapısının özel ağlarla rekabet edemeyeceği yönündeki karşıt görüşler, tasarımı bir "sonuç" yerine "veri" olarak ele alma hatasına düşmektedir.

Sürdürülebilir politika dengesi üçlü bir yapı gerektirir:
*   **Merkez Bankası:** Nihai güvenli varlığı ve sistem standartlarını sağlar.
*   **Ticari Bankalar:** Kredi üretimi ve müşteri ilişkileri yönetimini sürdürür.
*   **Düzenlenmiş Özel Token'lar:** Belirli kullanım alanlarında (sınır ötesi, akıllı kontratlar) birlikte çalışabilirlik sunar.

Bu dengenin tesisi; itfa hakkı, rezerv şeffaflığı, veri erişimi ve batış rejiminin yasal çerçeveye bağlanmasına tabidir.

### 7. Nihai Hüküm ve Kapanış

Sekiz haftalık politika inceleme sürecimizin temel sorunsalı olan "Para nedir?" sorusu, dijitalleşme evresinde yeni bir arayüzle yeniden karşımıza çıkmaktadır. Kurulun nihai tespiti şudur: Para fiziksel bir nesne değil, toplumsal kabul gören bir yükümlülük ve kurumlar arası hiyerarşidir.

CBDC, stablecoin ve banka mevduatı arasındaki kurumsal rekabetin galibini, işlemleri en hızlı onaylayan teknolojik altyapı belirlemeyecektir. Sistemin geleceği; kriz anlarında hangi taahhüdün, hangi bilanço kapasitesi tarafından eksiksiz yerine getirilebildiğiyle şekillenecektir. İşbu değerlendirme, para politikasının dijital çağdaki aktarım mekanizmalarına temel teşkil etmek üzere kayıt altına alınmıştır.
