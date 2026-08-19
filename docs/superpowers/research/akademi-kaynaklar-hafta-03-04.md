# Akademi kaynakları — Hafta 3-4

> Doğrulama notu: Tüm URL'ler WebSearch/WebFetch ile kontrol edilmiştir. Çoğu makale (NBER, BIS, TCMB, CFA Institute, blog yazıları) doğrudan içerik çekilerek doğrulanmıştır. Bazı otoriter kaynaklar (FRED, St. Louis Fed, CEPR/VoxEU) bot trafiğini 403 ile engellediği için içerikleri doğrudan okunamadı, ancak URL'lerin gerçekliği birden fazla bağımsız arama sonucuyla teyit edilmiştir. Reddit bu ortamda araç düzeyinde erişime kapalıdır (domain engeli); dört Reddit kaynağı yalnızca arama motoru sonuçlarında (başlık + tam URL) doğrulanabilmiştir, sayfa içeriği doğrudan okunamamıştır — bu açıkça belirtilmiştir. YouTube videolarının başlık/kanal bilgisi oEmbed API ile doğrulanmış, ancak süre bilgisi hiçbir ücretsiz araçla alınamadığı için videolarda süre "doğrulanamadı" olarak işaretlenmiştir (uydurulmamıştır).

## Hafta 3 · Faiz ve vadeli yapı

### 3.1 Fisher denklemi, reel faizin ölçülemezliği, breakeven enflasyon çıkarımı

**Video** · [Deriving the Precise Fisher Equation](https://www.youtube.com/watch?v=JIW6hCykf6s) · Economics in Many Lessons · süre doğrulanamadı · orta
Fisher denkleminin "nominal ≈ reel + enflasyon" yaklaşık biçiminden (1+i)=(1+r)(1+π) tam/kesin türevine geçişi adım adım gösteren bir ders videosu. Faiz-enflasyon ilişkisini basit toplamaya indirgeyen yaygın basitleştirmenin nerede yanılttığını açıklar. Okur, "yaklaşık Fisher" ile "kesin Fisher" arasındaki farkı ve hangisinin ne zaman kullanılacağını netleştirir; ileri düzey faiz hesaplarına geçmeden önce sağlam bir matematiksel temel sağlar.

**Makale** · [10-Year Breakeven Inflation Rate (T10YIE)](https://fred.stlouisfed.org/series/T10YIE) · FRED / St. Louis Fed · ileri
ABD 10 yıllık nominal Hazine tahvili getirisiyle aynı vadeli TIPS (enflasyona endeksli tahvil) getirisi arasındaki farkı günlük yayınlayan resmi seri. Piyasanın enflasyon beklentisini fiyatlardan çıkarsama (breakeven) yönteminin canlı uygulamasıdır. Okur, reel faizin doğrudan gözlemlenemediğini ama TIPS-nominal makasından dolaylı çıkarsandığını, bu çıkarımın likidite ve risk primi gibi unsurlarla nasıl kirlendiğini görür. Not: fred.stlouisfed.org otomatik erişimi 403 ile engelliyor; seri varlığı çok sayıda bağımsız aramada teyit edildi, içerik doğrudan okunamadı.

**Tartışma** · [What real interest rate formula should I use?](https://www.reddit.com/r/AskEconomics/comments/10kyqba/what_real_interest_rate_formula_should_i_use/) · Reddit r/AskEconomics · orta
Bir kullanıcının hangi reel faiz formülünü (basit fark mı, tam Fisher mı, ex-ante mı ex-post mu) kullanması gerektiğini sorduğu bir AskEconomics tartışması. Reel faizin "tek doğru sayı" olmadığını, hangi enflasyon beklentisi ve vade kullanıldığına göre değiştiğini somutlaştırır. Not: bu ortamda reddit.com araç düzeyinde erişime kapalı; başlık ve URL bağımsız arama sonucunda doğrulandı, sayfa içeriği doğrudan okunamadı.

### 3.2 Para politikası aktarım kanalları — Türkiye'de hangisi baskın

**Video** · [Why Turkey's Lira Keeps Collapsing Again and Again](https://www.youtube.com/watch?v=Azi6XReOKDM) · FINANCIAL MYSTERY STORIES · süre doğrulanamadı · orta
Türk lirasının tekrarlayan değer kayıplarını döviz kuru kanalı ekseninde özetleyen İngilizce bir açıklayıcı video. Düşük/negatif reel faiz — kur baskısı — ithal enflasyonu döngüsünü basitleştirir. Akademik derinliği sınırlı olsa da, Türkiye'de aktarım mekanizmasının neden faiz kanalından çok kur kanalı üzerinden işlediğini sezgisel olarak gösterdiği için, teknik makaleye geçmeden önce iyi bir giriş sağlar.

**Makale** · [Parasal Aktarım Mekanizması](https://www.tcmb.gov.tr/wps/wcm/connect/4e99834e-179b-4a08-820c-f2b259032afd/ParasalAktarim.pdf?MOD=AJPERES) · TCMB · ileri
TCMB'nin kendi yayınladığı, faiz/kredi/varlık fiyatı/döviz kuru/beklentiler kanallarını resmi çerçevede anlatan açıklayıcı kitapçık. Merkez bankası politika faizi kararlarının ekonomiye hangi yollarla ve ne gecikmeyle yayıldığını birincil ağızdan okumak isteyen okur için temel referans. Türkiye'ye özgü unsurların (dolarizasyon, yüksek kur geçişkenliği) kanalların göreli ağırlığını nasıl değiştirdiğini anlamanın başlangıç noktasıdır. Not: dosya 9,5 MB olarak indirilebildi (URL doğrulandı), ancak sıkıştırma nedeniyle metin katmanı bu araçla okunamadı.

**Tartışma** · [The Falling Lira](https://phenomenalworld.org/analysis/the-falling-lira/) · Özgür Orhangazi, Phenomenal World · ileri
İktisatçı Özgür Orhangazi'nin Türkiye'nin 2021 sonrası kur/faiz krizini yapısal çerçevede ele aldığı derin analiz yazısı. 2000'ler sonrası sermaye akımına bağımlı büyüme modelinin Fed sıkılaşmasıyla nasıl çöktüğünü, düşük faiz deneyinin enflasyonist etkilerini ve kur korumalı mevduatın neden kalıcı çözüm olmadığını tartışır. "Sermaye kontrolü olmadan bağımsız para politikası mümkün değildir" teziyle aktarım mekanizması tartışmasına siyasi ekonomi boyutu katar.

### 3.3 Getiri eğrisi: beklentiler hipotezi, vade primi, tersine dönme

**Video** · [The 3 Theories of the Yield Curve: Expectations, Segmented Markets, Liquidity Premium](https://www.youtube.com/watch?v=0pslBcyrlms) · Financism by Dr. Phil · süre doğrulanamadı · orta
Getiri eğrisini açıklayan üç klasik teoriyi — beklentiler hipotezi, segmentli piyasalar, likidite/vade primi — karşılaştırmalı sunan bir ders videosu. Her teorinin eğrinin şeklini (normal, düz, ters) nasıl farklı yorumladığını gösterir. Okur, "getiri eğrisi neden yukarı eğimli" sorusuna tek bir cevap olmadığını, vade priminin saf beklentiler hipotezinden sapmanın kaynağı olduğunu kavrar.

**Makale** · [Treasury Yield Premiums](https://www.frbsf.org/research-and-insights/data-and-indicators/treasury-yield-premiums/) (Christensen–Rudebusch modeli) · San Francisco Fed · uzman
SF Fed'in üç faktörlü afin Gaussian terim yapısı modeliyle gözlenen tahvil getirisini kısa vadeli faiz beklentisi ve vade risk primine ayrıştırdığı, Kalman filtresiyle 1987'den beri günlük güncellenen veri sayfası. Okur, "getiri eğrisi tersine döndü" ifadesinin aslında beklenti mi yoksa prim mi değiştiğine göre çok farklı anlamlara gelebileceğini, dolayısıyla ters eğrinin resesyon sinyali olarak neden kusurlu olabileceğini teknik düzeyde görür.

**Tartışma** · [Getiri Eğrisi İllüzyonu: Tersine Dönüş (Inversion) Yerine Neden Dikleşmeye Bakmalı](https://ugurtukenmez.com/getiri-egrisi-inversion-steepening-resesyon/) · Uğur Tükenmez (blog) · ileri
Türkçe bir piyasa/makro blogunda, yatırımcıların ters getiri eğrisine saplanıp dikleşme (steepening) sinyalini kaçırdığını savunan görüş yazısı. Bull/bear steepening ayrımını ve 2022 sonrası ABD'de tahvil piyasası uyarı verirken hisse senedi piyasasının neden yükselişini sürdürdüğünü tartışır. Getiri eğrisinin tek başına yeterli bir resesyon göstergesi olmadığını, diğer verilerle birlikte okunması gerektiğini güncel örneklerle savunur.

### 3.4 İskonto matematiği: sürekli bileşik, durasyon, konveksite

**Video** · [Bond Convexity and Duration | Convexity explained with example](https://www.youtube.com/watch?v=OQ3JDGy4hw0) · FIN-Ed · süre doğrulanamadı · orta
Durasyon ve konveksitenin tahvil fiyat-getiri ilişkisindeki rolünü sayısal örnekle gösteren teknik bir eğitim videosu. Durasyonun doğrusal (birinci derece), konveksitenin eğrisel (ikinci derece) fiyat duyarlılığını yakaladığını; büyük faiz hareketlerinde yalnızca durasyona güvenmenin neden fiyat tahminini saptırdığını açıklar. Sürekli bileşik faiz altında türev alma mantığına da değinerek 3.4'ün matematiksel çekirdeğini kurar.

**Makale** · [Yield-Based Bond Convexity and Portfolio Properties](https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/yield-based-bond-convexity-and-portfolio-properties) · CFA Institute · uzman
CFA Level I müfredatının resmi tekrar okuması; durasyon ve konveksitenin matematiksel türetilişini, portföy düzeyinde ağırlıklı ortalama ile hesaplanmasını ve paralel getiri eğrisi kayması varsayımının neden nadiren gerçekleştiğini ele alır. Profesyonel sertifika müfredatından geldiği için titiz ve formeldir; durasyon-konveksite matematiğini gerçek portföy yönetimi bağlamına oturtmak isteyen ileri/uzman okur için sağlam bir referanstır.

**Tartışma** · [Bond Convexity: Relationship between discrete and continuous interest rate](https://quant.stackexchange.com/questions/22806/bond-convexity-relationship-between-discrete-and-continuous-interest-rate) · Quantitative Finance Stack Exchange · uzman
Kantitatif finans uzmanlarının takıldığı teknik bir forumda, sürekli bileşik faiz ile kesikli (discrete) bileşik faiz altında konveksite formülünün nasıl farklılaştığı sorulur ve pratisyenler türetmeleriyle yanıt verir. Ders kitaplarının çoğu zaman atladığı bu inceliği tartıştığı için, sürekli bileşik matematiğin durasyon/konveksite hesaplarına nasıl sızdığını görmek isteyen ileri okura özgün bir bakış açısı sunar. Not: quant.stackexchange.com bu ortamda araç düzeyinde erişime kapalı; başlık ve URL bağımsız aramada doğrulandı, içerik doğrudan okunamadı.

### 3.5 Negatif reel faiz ve finansal baskı (financial repression)

**Video** · [Financial Repression Explained — What It Means for Savers](https://www.youtube.com/watch?v=ex8Q4-qAS10) · APEX MACRO · süre doğrulanamadı · orta
Negatif reel faizin tasarruf sahiplerinden borçlulara (özellikle devlete) nasıl örtük bir servet transferi yarattığını anlatan makro odaklı bir video. "Finansal baskı" kavramını gündelik dille açıklayarak, enflasyon + düşük nominal faiz kombinasyonunun neden görünmez bir vergi işlevi gördüğünü gösterir. BIS makalesindeki teknik/tarihsel analize geçmeden önce kavramsal giriş sağlar.

**Makale** · [The Liquidation of Government Debt](https://www.bis.org/publ/work363.htm) (BIS Working Papers No. 363) · Carmen M. Reinhart, M. Belen Sbrancia · uzman
Finansal baskı literatürünün temel taşı sayılan çalışma. 1945-1980 döneminde gelişmiş ekonomilerde reel faizlerin zamanın yaklaşık yarısında negatif seyrettiğini, bunun ABD ve İngiltere'de yıllık GSYİH'nın yüzde 2-3'ü kadar borç "eritme" etkisi yarattığını gösterir. Yönlendirilmiş kredilendirme, faiz tavanları ve sermaye kontrollerinin nasıl birlikte çalıştığını ampirik verilerle ortaya koyar; finansal baskının tarihsel ölçeğini sayısallaştırması bakımından vazgeçilmezdir.

**Tartışma** · [Financial repression: Then and now](https://cepr.org/voxeu/columns/financial-repression-then-and-now) · CEPR VoxEU · ileri
CEPR'in VoxEU platformunda iktisatçıların finansal baskının 20. yüzyıl ortası ile günümüzün yüksek borç ortamı arasındaki benzerlik ve farkları tartıştığı politika odaklı köşe yazısı. Reinhart-Sbrancia'nın akademik çalışmasını güncel borç sürdürülebilirliği tartışmasına bağlar. Not: cepr.org otomatik erişimi 403 ile engelliyor; URL varlığı bağımsız aramada teyit edildi, içerik doğrudan okunamadı.

## Hafta 4 · Enflasyon: ölçüm, mekanizma, rejim

### 4.1 TÜFE'nin inşası: sepet, ikame yanlılığı, kira imputasyonu, TÜİK metodolojisi

**Video** · [TÜİK Enflasyonu Nasıl Hesaplıyor?](https://www.youtube.com/watch?v=1GRV8eEN58Y) · Haber Global · süre doğrulanamadı · orta
TÜİK'in TÜFE hesaplama sürecini — sepet oluşturma, fiyat derleme, ağırlıklandırma — ana hatlarıyla anlatan bir haber kanalı programı. Enflasyon rakamının tek bir sayı değil, binlerce fiyat gözleminin ağırlıklı ortalaması olduğunu genel izleyiciye açıklar. Teknik metodoloji belgesine geçmeden önce sürece hızlı bir giriş sağlar.

**Makale** · [Tüketici Fiyat Endeksi Metodoloji Dokümanı 2026](https://veriportali.tuik.gov.tr/api/tr/data/downloads?t=r&p=BfoX9pFTLHGZrAqXytEEdQqL9Mj9Su2QECqEXOyEKM5v7Vow4oxbmEHVdYjwbavd0nVSD0SRu2FSpEIDfn42CDthfWyqnsXYhJZayD1Y0zxUwY32gvv9WuP5HeEkEg1R) · TÜİK · uzman
TÜİK'in TÜFE hesaplamasının teknik altyapısını — sepet güncelleme sıklığı, endeks formülü, kira imputasyonu, veri toplama yöntemleri, Eurostat uyum güncellemeleri — resmi olarak belgelediği metodoloji dokümanı. Endeksin "nasıl üretildiğini" birincil kaynaktan okumak isteyen, ikame yanlılığı ve imputasyon gibi teknik tartışmaları takip edecek uzman düzey okur için zorunlu referans. Not: dosya 3,6 MB olarak indirilebildi (URL doğrulandı); sıkıştırma nedeniyle metin katmanı bu araçla tam okunamadı, başlık arama sonucunda teyit edildi.

**Tartışma** · [Enflasyon Verilerine Güveniyor muyuz? TÜİK, ENAG ve Resmi Veri Tartışmasının Ekonometrik Anatomisi](https://www.analizus.com/blog/enflasyon-verilerine-guveniyor-muyuz-tuik-enag-resmi-veri-tartismasi/) · Analizus Blog · ileri
TÜİK ve ENAG'ın enflasyon rakamları arasındaki farkı sepet ağırlıklandırma, veri toplama yöntemi (web kazıma vs anketör), hedonik kalite düzeltmesi ve mevsimsel düzeltme gibi metodolojik eksenlerde inceleyen teknik blog yazısı. Tartışmayı "hangi rakam doğru" sorusundan "rakamlar nasıl üretiliyor" sorusuna taşıyarak, ölçüm güvenilirliği tartışmasına eleştirel veri okuryazarlığı çerçevesi kazandırır.

### 4.2 Phillips eğrisi: orijinali, genişletilmiş hali, düzleşme tartışması

**Video** · [Enflasyon ile İşsizlik Arasındaki İlişki Nasıldır? Phillips Eğrisi Nedir?](https://www.youtube.com/watch?v=wlqZcK3DlFk) · SASKIN BILGIN · süre doğrulanamadı · orta
Phillips eğrisinin temel mantığını — düşük işsizlik dönemlerinde enflasyonun neden yükseldiğini — Türkçe anlatan bir eğitim videosu. Kısa dönem/uzun dönem ayrımına ve eğrinin zamanla neden "kaybolduğu" tartışmasına giriş niteliğinde değinir. NBER makalesindeki teknik tartışmayı takip etmeden önce kavramsal zemin sağlar.

**Makale** · [Breaks in the Phillips Curve: Evidence from Panel Data](https://www.nber.org/system/files/working_papers/w31153/w31153.pdf) (NBER Working Paper No. 31153) · Simon Smith, Allan Timmermann, Jonathan H. Wright · uzman
Bayesian panel kırılma-noktası yöntemleriyle ABD ve AB verilerinde Phillips eğrisinin kaç kez ve ne zaman "kırıldığını" tespit eden güncel bir NBER çalışma kâğıdı. Fiyat Phillips eğrisinin belirgin şekilde düzleştiğini, ancak ücret Phillips eğrisinin bu düzleşmeye karşı daha dirençli kaldığını gösterir. Düzleşme tartışmasına taze ekonometrik kanıt sunması bakımından "Phillips eğrisi öldü mü" sorusuna güncel akademik cevaplardan biridir.

**Tartışma** · [Türkiye İçin Phillips Eğrisi Analizi](https://www.mahfiegilmez.com/2016/08/turkiye-icin-phillips-egrisi.html) · Mahfi Eğilmez (blog) · ileri
Türkiye'nin eski Hazine Müsteşarı, tanınmış iktisatçı Mahfi Eğilmez'in Türkiye verileriyle Phillips eğrisini test ettiği blog yazısı. 1980-2015 ve 2009-2016 dönemlerini karşılaştırarak, düşük enflasyon ortamında enflasyonu daha da düşürmenin neden orantısız işsizlik artışına yol açtığını gösterir. Çözümün enflasyonla mücadeleyi bırakmak değil yapısal reform olduğunu savunarak teoriyi Türkiye'nin güncel politika tartışmasına bağlar.

### 4.3 Miktar teorisi, dolaşım hızı, 2008-2020'de enflasyonun gelmeyişi

**Video** · [MV = PY Explained: A Guide to the Quantity Theory of Money](https://www.youtube.com/watch?v=FPxwWwj4ABw) · Econbusters · süre doğrulanamadı · orta
Miktar teorisinin temel özdeşliği MV=PY'yi (para arzı × dolaşım hızı = fiyat düzeyi × reel gelir) unsurlarına ayırıp açıklayan bir video. Fisher'in değişim denkleminin nasıl bir muhasebe özdeşliği olduğunu, teoriye dönüşmesi için hangi ek varsayımların (V ve Y sabit) gerektiğini gösterir. 2008 sonrası dolaşım hızındaki çöküşü anlamak için gereken temel çerçeveyi kurar.

**Makale** · [The link between money and inflation since 2008](https://publications.banque-france.fr/en/link-between-money-and-inflation-2008) · Banque de France · ileri
Fransa Merkez Bankası'nın, 2008-2020 arasında para arzındaki büyük genişlemeye rağmen enflasyonun neden gelmediğini M ve V arasındaki ayrışma üzerinden incelediği araştırma notu. Dolaşım hızındaki keskin düşüşün parasal genişlemeyi büyük ölçüde "yuttuğunu", bunun likidite tuzağı ve banka rezervlerinin reel ekonomiye aktarılmaması ile ilişkili olduğunu tartışır. Not: banque-france.fr otomatik erişimi 403 ile engelliyor; URL varlığı iki bağımsız aramada teyit edildi, içerik doğrudan okunamadı.

**Tartışma** · [Quantitative Easing yazıları](https://www.johnhcochrane.com/news-op-eds-all/quantitative-easing) (ör. "Sense and Nonsense in the Quantitative Easing Debate", orijinali VoxEU 2010) · John H. Cochrane (blog) · uzman
Stanford/Hoover iktisatçısı John Cochrane'in QE hakkındaki yazılarını topladığı sayfa. Başyazı, sıfır faizde paranın kısa vadeli devlet borcuyla neredeyse eşdeğer olduğunu, bu yüzden QE'nin "büyük kurtarıcı" ya da "enflasyon başlangıcı" iddialarının ikisinin de abartılı olduğunu savunur. Parasal taban büyümesinin neden otomatik olarak enflasyona dönüşmediğini teorik temellendirir; miktar teorisinin naif okumasına karşı en bilinen itirazlardan biridir.

### 4.4 Hiperenflasyon anatomisi: Cagan modeli, mali baskınlık

**Video** · [How Hyperinflation Destroys Nations || Zimbabwe, Weimar, Venezuela](https://www.youtube.com/watch?v=S4Spfrrx0s4) · Financial Codex · süre doğrulanamadı · orta
Üç klasik hiperenflasyon vakasını (Weimar Almanyası, Zimbabve, Venezuela) kronolojik anlatan belgesel tarzı bir video. Her vakada mali açığın parasal genişlemeyle finanse edilme sürecini ve toplumsal çöküş dinamiklerini aktarır. Cagan modelinin teorik çerçevesine geçmeden önce üç vakanın ortak deseni hakkında sezgi kazandırır.

**Makale** · [The Ends of Four Big Inflations](https://www.nber.org/chapters/c11452) · Thomas J. Sargent, NBER (*Inflation: Causes and Effects* içinde, ed. Robert E. Hall, 1982) · uzman
Hiperenflasyon literatürünün klasik metni. Sargent, 1920'lerin Avusturya, Almanya, Macaristan ve Polonya hiperenflasyonlarının neden aniden ve genellikle bir gecede durduğunu; çözümün kademeli parasal sıkılaştırma değil, mali rejimin (bütçe açığının parasallaştırılmayacağına dair inandırıcı bir kurumsal taahhüt) değişmesi olduğunu gösterir. Mali baskınlık kavramının ve rasyonel beklentilerin hiperenflasyonu bitirmedeki rolünün temel referansı; Cagan modelinin en ünlü ampirik uygulamasıdır.

**Tartışma** · [What Caused Hyperinflation In Weimar, Zimbabwe And Venezuela?](https://www.reddit.com/r/mmt_economics/comments/m2e4gq/what_caused_hyperinflation_in_weimar_zimbabwe_and/) · Reddit r/mmt_economics · ileri
Modern Parasal Teori (MMT) topluluğunun, ana akım "aşırı para basımı" anlatısına karşı üç vakayı da arz şoku, üretim kapasitesi çöküşü ve döviz borcu gibi ek faktörlerle yeniden okuduğu bir tartışma. MMT perspektifinin hiperenflasyonu salt parasal değil yapısal bir olgu olarak çerçevelemesi, Cagan modelinin "sadece para arzı" vurgusuna alternatif bir bakış sunar. Not: reddit.com bu ortamda araç düzeyinde erişime kapalı; başlık ve URL bağımsız aramada doğrulandı, içerik doğrudan okunamadı.

### 4.5 Enflasyon vergisi, senyoraj ve senyorajın Laffer eğrisi

**Video** · [KPSS - Para Banka: Senyoraj Geliri, Enflasyon Vergisi, Para İkamesi, Para Aldanması](https://www.youtube.com/watch?v=-vt7wIVo3w0) · İndeks Akademi (Emel Aksaç) · süre doğrulanamadı · orta
Senyoraj, enflasyon vergisi ve para ikamesi kavramlarını sınav hazırlığı formatında ama kavramsal doğrulukla anlatan Türkçe bir ders videosu. Devletin para basarak elde ettiği reel kaynağın nasıl hesaplandığını ve yüksek enflasyonda vatandaşların dövize geçerek (para ikamesi) bu vergiden nasıl kaçtığını gösterir; senyorajın Laffer eğrisi mantığına (belli noktadan sonra daha fazla para basmanın geliri azaltması) zemin hazırlar.

**Makale** · [Dynamic Seigniorage Theory: An Exploration](https://www.nber.org/papers/w2869) (NBER Working Paper No. 2869) · Maurice Obstfeld · uzman
Obstfeld'in, hükümetin bütçe açığını borç veya para basarak finanse ettiği, özel sektörün rasyonel beklentilere sahip olduğu çok dönemli bir modelle optimal enflasyon vergisini incelediği teorik makale. "Vergi düzeltme" ve "takdir yetkili politika" yaklaşımlarını birleştirerek, senyoraj gelirinin zaman içinde neden sosyal olarak optimal seviyeye yakınsama eğiliminde olduğunu gösterir. Senyorajın Laffer eğrisi mantığının matematiksel temelini kuran ileri düzey bir referanstır.

**Tartışma** · [How is inflation a tax?](https://www.reddit.com/r/AskEconomics/comments/13gh571/how_is_inflation_a_tax/) · Reddit r/AskEconomics · orta
Bir kullanıcının "enflasyon nasıl bir vergi sayılır" sorusuna karşılık, topluluğun enflasyon vergisini nakit tutanlardan hükümete gerçek kaynak transferi olarak açıkladığı bir AskEconomics tartışması. Enflasyon vergisinin kimin üzerine düştüğünü (nakit ağırlıklı tasarruf edenler, düşük gelirliler) ve resmi bir vergi kanunu olmadan nasıl işlediğini gündelik dille netleştirir; senyoraj teorisine sezgisel bir giriştir. Not: reddit.com bu ortamda araç düzeyinde erişime kapalı; başlık ve URL bağımsız aramada doğrulandı, içerik doğrudan okunamadı.
