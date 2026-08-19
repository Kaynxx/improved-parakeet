# Akademi ders deneyimi araştırması

Tarih: 2026-08-19  
Durum: **araştırma tamamlandı; uygulama yapılmadı**

## Amaç

`content/akademi/` altındaki 40 dersin neden sıkıcı hissedildiğini repo kanıtıyla
tespit etmek; öğrenme bilimi, ekonomi eğitimi ve etkileşim tasarımı bulgularıyla
hangi yönlerin savunulabilir olduğunu belirlemek. Bu belge tasarım kararı veya
uygulama planı değildir; sonraki tasarım görüşmesinin kanıt tabanıdır.

## Yöntem

Araştırma altı bağımsız hatta yürütüldü:

1. 40 dersin yapısal ve editoryal envanteri.
2. Akademi sayfası, veri akışı, soru–cevap, AI değerlendirme ve ilerleme
   katmanlarının uçtan uca kod haritası.
3. Öğrenme bilimi taraması: retrieval practice, spacing, interleaving,
   pretesting, self-explanation, worked examples, simulation ve tek-denekli
   değerlendirme.
4. Parasal iktisada özel etkileşim kataloğu.
5. Editoryal biçim ve anlatı varyasyonu araştırması.
6. Dış benchmark ve kaynak doğrulaması.

Codex ve Gemini agent lane'leri fikir ve kaynak topladı. Ana koordinatör repo
iddialarını dosyalardan, akademik kaynakları DOI/Crossref'ten, benchmarkları ise
canlı sayfa okumalarıyla yeniden doğruladı. Agent çıktıları kanıt sayılmadı.

## Yönetici sonucu

Sorun derslerin entelektüel kalitesi değil. Sorun üç ayrı tekdüzeliğin üst üste
binmesi:

1. **Ürün tekdüzeliği:** Ders sayfası okunacak metin ve kaynaklardan ibaret;
   kullanıcının cevap, karar, tahmin veya revizyon üretebildiği bir akış yok.
2. **Editoryal tekdüzelik:** 40 metin aynı uzunlukta, aynı retorik hamleyle
   açılıyor, aynı kapanışla bitiyor ve görsel yapı taşlarını çok az kullanıyor.
3. **Ölçme tekdüzeliği:** Her derste aynı sırada bir sayısal ve iki açık soru
   var; tanımlı `tahmin` türü hiç kullanılmıyor. Üstelik bu sorular UI'da hiç
   gösterilmiyor.

Bu nedenle ilk araştırma sonucu "daha fazla içerik üret" veya "daha çok video
koy" değildir. Mevcut dersleri **okuma → üretme → geri bildirim → revizyon →
gecikmeli geri çağırma** döngüsüne geçirmek gerekir. Gösterişli simülasyonlar bu
çekirdek döngünün yerine geçemez.

---

## 1. Mevcut 40 dersin ölçülen envanteri

### 1.1 Yapı

| Ölçüt | Sonuç |
|---|---:|
| Ders | 40 |
| Toplam gövde kelimesi | 29.812 |
| Ders başına ortalama | 745 |
| Minimum / maksimum | 628 / 846 |
| 700–800 kelime bandındaki ders | 38/40 |
| Toplam H2 | 240 |
| H3 kullanan ders | 4/40 |
| `## Bu dersten sonra` kapanışı | 39/40 |
| Markdown tablosu | 0/40 |
| Fenced code block | 0/40 |
| Liste kullanan ders | 5/40 |
| Tamamen düz nesir kalan ders | 6/40 |

İlk açılışların yalnız 5/40'ında rakam, yalnız 1/40'ında gerçek yıl/olay var.
Baskın retorik kalıp "yaygın sezgiyi kur → hemen olumsuzla → koşullu doğruyu
ver". Tek derste etkili olan bu hamle 40 derslik dizide önceden tahmin edilebilir
hale geliyor.

### 1.2 Türkiye katmanı

- Ayrı Türkiye H2'si: 24/40.
- Bunların 22'si sondan ikinci bölümde.
- Ortalama uzunluk 113 kelime; ortalama gövde payı %15.
- 9/24 Türkiye bölümünde rakam yok.
- Gerçekten çalışan vaka derinliği en net olarak `hafta-03/02` parasal aktarım,
  `hafta-05/01` SGP ve `hafta-05/02` carry trade derslerinde görülüyor.

Türkiye çoğu derste argümanın başlangıç verisi değil, kapanış öncesi ek paragraf.
Bu, müfredatın "Türkiye her haftada var" ilkesini biçimsel olarak karşılıyor;
fakat deneyim olarak ayrı bir eklenti hissi veriyor.

### 1.3 Sorular

| Tip | Sayı |
|---|---:|
| `sayisal` | 40 |
| `acik` | 80 |
| `tahmin` | 0 |
| Toplam | 120 |

- 40/40 derste sıra `sayisal → acik → acik`.
- Sayısal soruların tamamı tek skaler sonuca gidiyor; baskın işlem verilen
  formüle verilen sayıyı yerleştirmek.
- Kesin Fisher denklemi beş kez sayı değiştirilerek soruluyor.
- Açık sorularda 393 rubrik maddesi var; 247'si (%63)
  `belirtir/açıklar/söyler` fiilleriyle bitiyor.
- Rubrikler içerik bakımından çeşitli; ölçtüğü eylem bakımından büyük ölçüde
  aynı: doğru cümleyi kurma.

### 1.4 Kaynaklar

| Tip | Sayı |
|---|---:|
| Video | 40 |
| Article | 40 |
| Discussion | 40 |

- 40/40 derste sıra `video → article → discussion`.
- 120 URL'nin tamamı benzersiz; 49 alan adı var.
- Videoların tamamı YouTube.
- 40/40 videoda süre `süre doğrulanamadı`.
- Mahfi Eğilmez yedi tartışma kaynağında kullanılıyor; üç tartışma kaynağı
  Reddit.

Kaynak çeşitliliği URL düzeyinde yüksek, deneyim düzeyinde düşük: kullanıcı her
derste aynı üç kartı görüyor ve kaynağı açınca hangi görevi yapacağı
belirtilmiyor.

---

## 2. Akademi ürün akışı: kırık halka

### 2.1 Ders sayfasında bugün olanlar

`src/app/(dashboard)/akademi/[hafta]/[ders]/page.tsx` şunları gösteriyor:

1. Yol haritasına dönüş linki.
2. Hafta etiketi, ders başlığı, özet ve tahmini süre.
3. Varsa ön koşul linkleri.
4. Markdown gövde.
5. Video, makale ve tartışma kaynakları.

Sayfada form, textarea, soru, cevap, geri bildirim, tamamlandı düğmesi,
önceki/sonraki ders navigasyonu veya not alanı yok. Tek gerçek ders içi eylem
videoyu oynatmak.

### 2.2 Soru verisi sayfaya kadar geliyor ve düşürülüyor

- `src/server/services/academy.ts` içindeki `LessonView`, `prompts` alanını
  tanımlıyor.
- `getStep()` gerçekten `findLessonPrompts(step.id, userId)` çağırıyor.
- Ders sayfası `found` içinden yalnız `track`, `step`, `contentMd`, `sources`
  alanlarını alıyor; `prompts` kullanılmıyor.
- Sonuç: her ders açılışında soru ve cevap sorguları çalışıyor, çıktı çöpe
  gidiyor.

Hazır katmanlar:

- 40 dersin frontmatter soruları.
- Parser ve seed doğrulaması.
- `lesson_prompts`, `lesson_answers`, `answer_feedback` tabloları.
- Soru + mevcut cevap + son feedback okuma sorgusu.
- Servis ve TypeScript tipleri.

Eksik katmanlar:

- Cevap yazma sorgusu.
- Server action/API sınırı.
- Soru ve cevap UI'ı.
- AI sonucunu `answer_feedback` tablosuna yazma.

### 2.3 AI değerlendirici ölü kod

`src/server/ai/degerlendir.ts` hiçbir yerden import edilmiyor. Rubriğe bağlı
puan, güçlü yanlar, eksikler, Markdown geri bildirim ve takip sorusu üretiyor;
fakat çağıranı ve DB yazma yolu yok. Sayısal sorular için `expectedNumeric` ve
`tolerance` DB'ye kadar taşınıyor; deterministik karşılaştırma kodu yok.

### 2.4 İlerleme görünür fakat çalışmıyor

- `advanceProgress()` ileri-yalnız geçişleri destekliyor, çağıranı yok.
- Ders açılışı `reading` durumuna geçirmiyor.
- Cevap gönderimi olmadığı için `answered` oluşmuyor.
- AI bağlı olmadığı için `reviewed` oluşmuyor.
- `mastered` eşiği yalnız yorumlarda; çalışan hesap yok.
- İlerleme halkaları yalnız `mastered` sayıyor. Sonuç pratikte sürekli %0.

### 2.5 Ön koşullar ve video

- Ön koşul kenarları DB'de ve seed'de gerçek bir DAG; UI'da yalnız link listesi.
  Kilitleme veya tamamlanma durumu yok.
- Yol haritasındaki çizgi gerçek DAG'ı değil, ardışık listeyi çiziyor.
- Video click-to-load ve `youtube-nocookie` kullanımı doğru; izleme/tamamlama
  sinyali yok.

---

## 3. Öğrenme bilimi: güvenilir bulgular

### 3.1 Güçlü kanıt

| Bulgu | Bu program için anlamı | Kaynak |
|---|---|---|
| Retrieval practice, yeniden okumaya göre gecikmeli hatırlamayı güçlendirir. | Mevcut 120 soruyu görünür kılmak dekor değil, temel öğrenme mekanizmasıdır. | [Rowland 2014](https://doi.org/10.1037/a0037559), [Roediger & Karpicke 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x) |
| Dağıtılmış çalışma toplu çalışmadan üstündür; doğru aralık hedef saklama süresine bağlıdır. | Sabit "2-7-21" doğa yasası değildir; başlangıç kuralı olarak denenebilir. | [Cepeda et al. 2006](https://doi.org/10.1037/0033-2909.132.3.354) |
| Interleaving özellikle benzer kategorileri ayırt ederken değerlidir; benzemeyen konuları rastgele karıştırmak aynı faydayı vermez. | Ders paragrafları değil, benzer mekanizma vakaları karıştırılmalıdır. | [Brunmair & Richter 2019](https://doi.org/10.1037/bul0000209) |
| Başarısız ön-test denemeleri sonraki öğrenmeyi yönlendirebilir. | Ders öncesi tek, puansız soru dikkat boşluğu açabilir; yanlış hemen işlenmelidir. | [Kornell, Hays & Bjork 2009](https://doi.org/10.1037/a0015729) |
| Self-explanation istemleri ortalama olumlu etkiye sahip. | Her paragrafı kesmek değil, kritik mekanizmada az sayıda açıklama istemek savunulabilir. | [Bisra et al. 2018](https://doi.org/10.1007/s10648-018-9434-x) |
| Tam çözümlü örnekten bağımsız probleme kademeli geçiş bilişsel yükü yönetir. | Gövdedeki örneğin aynısını sayıları değiştirmeden sormak retrieval değildir; faded guidance gerekir. | [Renkl & Atkinson 2003](https://doi.org/10.1207/S15326985EP3801_3), [Slamecka & Graf 1978](https://doi.org/10.1037/0278-7393.4.6.592) |
| Uzmanlık arttıkça fazla rehberlik tersine dönebilir. | Lisansüstü kullanıcıyı her adımda durduran mikro görevler okuma akışını bozabilir. | [Kalyuga et al. 2003](https://doi.org/10.1207/S15326985EP3801_4) |
| Yükseköğretimde simülasyonlar karmaşık becerilerde güçlü ortalama etki gösterebilir; scaffold ve reflection sonucu değiştirir. | Simülasyon tek başına oyun değildir: tahmin, açıklama ve debrief gerekir. | [Chernikova et al. 2020](https://doi.org/10.3102/0034654320933544) |
| Çalışma tekniklerinin kanıt düzeyi eşit değildir. | "Aktif" etiketi tek başına yeterli değildir; ölçülen davranış ve transfer önemlidir. | [Dunlosky et al. 2013](https://doi.org/10.1177/1529100612453266) |

### 3.2 Sınırlar

- Retrieval sorusu gövdedeki aynı örneğin kopyasıysa generation etkisi zayıflar.
- Pretest puan veya yargı aracı olmamalı; yanlış cevap sonunda yeniden ele
  alınmalı.
- Interleaving ilk öğretimin yerine geçmemeli; önce model kurulmalı.
- Self-explanation istemleri sık kullanılırsa akışı parçalar.
- Simülasyonun modeli ve varsayımları görünür değilse yanlış kesinlik üretir.
- Canlı piyasa sonucu bir kavramın nedensel olarak doğrulandığını göstermez.
- Tek kullanıcıda kalibrasyon eğrisi için 8–15 tahmin yetersizdir; ham Brier
  skoru gösterilebilir, güvenilir uzun dönem kalibrasyon iddiası gösterilemez.

---

## 4. Doğrulanmış ekonomi eğitimi benchmarkları

Agent benchmark listesindeki 21 kaydın büyük kısmı kök sayfa, 404 veya iddia
edilen özelliği göstermeyen URL çıktı. Araştırmada yalnız aşağıdaki desenler
kanıt olarak tutuldu.

### 4.1 Banka hücumu deneyi

[Economics Network — Bank runs (computerised)](https://www.economicsnetwork.ac.uk/handbook/experiments/case5)
Diamond–Dybvig tabanlı gerçek sınıf deneyini açıklıyor: öğrenci sabırsız/sabırlı
tip olarak atanıyor, bugün çekmek veya beklemek arasında karar veriyor; kriz ve
ödemeyi durdurma koşulları karşılaştırılıyor. Güçlü desen **karar → toplu sonuç →
debrief**. Doğrudan tek kullanıcıya taşınamaz; bot veya deterministik senaryo
ayrı tasarım kararı gerektirir.

[MobLab Bank Run](https://www.moblab.com/edu/games/bank-run) ürünün varlığını ve
konusunu doğruluyor; halka açık sayfa ayrıntılı mekanik, tek-kullanıcı modu veya
lisansüstü uygunluk kanıtı vermiyor.

### 4.2 Modern para politikası çerçevesi

[Federal Reserve Education — New Monetary Policy Tools](https://www.federalreserveeducation.org/teaching-resources/economics/monetary-policy-the-federal-reserve/the-feds-new-monetary-policy-tools)
31–45 dakikalık etkileşimli modül ve cevap anahtarı sunuyor. 2008 sonrası bol
rezerv/IOR çerçevesini öğretmesi bu müfredatın 2.1–2.2 dersleriyle doğrudan
örtüşüyor. Lisansüstü değil; içerik benchmarkı, derinlik benchmarkı değil.

[Federal Reserve Board — Closing the Monetary Policy Curriculum Gap](https://www.federalreserve.gov/econres/notes/feds-notes/closing-the-monetary-policy-curriculum-gap-20201023.html)
eski para çarpanı/OMO anlatısının modern bol rezerv çerçevesiyle
uyumsuzluğunu doğrulayan resmi müfredat kaynağıdır; öğrenci simülasyonu değildir.

### 4.3 Karar kurulu rol oyunu

[FOMC Simulation — Take a Seat at the Table](https://www.federalreserveeducation.org/teaching-resources/economics/monetary-policy-the-federal-reserve/take-a-seat-at-the-table-fomc-simulation)
öğrenciye Beige Book okuma, faiz tavsiyesi ve basın bülteni yazma görevi veriyor.
Doğrulanmış desen **eksik veri → politika kararı → gerekçe → iletişim metni**.
Kaynak lise düzeyi ve grup rol oyunudur; otomatik tek-kullanıcı geri bildirimi
kanıtlamaz.

### 4.4 Veri laboratuvarı

[CORE Doing Economics](https://www.core-econ.org/doing-economics/) gerçek politika
sorularına bağlı veri projelerini; [FRED](https://fredhelp.stlouisfed.org/fred/about/about-fred/what-is-fred/)
seri arama, dönüşüm, frekans toplulaştırma, ALFRED revizyonları ve veri
hikâyeleştirmeyi doğruluyor. FRED otomatik sınav veya notlandırma sistemi değil.
Güçlü desen **sabit veri kesiti → dönüşüm → görselleştirme → sınırlı yorum**.

### 4.5 Benchmarklardan çıkarılan güvenilir desenler

1. Parametre değiştirmek tek başına yeterli değil; önce tahmin, sonra sonuç,
   sonra açıklama gerekir.
2. Ekonomik kararın maliyeti görünür olmalı; fakat simülasyon bunu gerçek dünya
   nedenselliği gibi sunmamalı.
3. Tarihsel veri kullanılıyorsa karar anındaki bilgi seti dondurulmalı.
4. Grup deneyi tek kullanıcıya çevrilirken sahte "diğer oyuncular" üretmek yeni
   bir model varsayımıdır.
5. Veri laboratuvarı otomatik doğru/yanlış yerine dönüşüm ve yorum zincirini
   görünür kılmalı.

---

## 5. Agent kaynak denetimi

Agent çıktılarında doğrulanmadan kullanılamayacak kadar çok kesin ama yanlış
atıf bulundu. Aşağıdakiler araştırma sonucundan çıkarıldı:

| Agent iddiası | Canlı doğrulama |
|---|---|
| Rowland meta-analizi `10.1037/a0037552` | Yanlış; bu DOI başka bir kitap incelemesi. Doğrusu `10.1037/a0037559`. |
| Interleaving meta-analizi `10.1037/bul0000204` | Yanlış; kısa süreli bellek makalesi. Doğrusu `10.1037/bul0000209`. |
| Self-explanation `10.3102/0013189X18799850` | 404. Doğrusu `10.1007/s10648-018-9434-x`. |
| Kalibrasyon kanıtı `10.1111/j.1467-9280.2008.02127.x` | Yanlış bağlam; çalışma kavram/kategori öğrenmesi üzerine. |
| Tek-denek standardı `10.1037/spq0000019` | Yanlış; implementation science makalesi. İlgili standart `10.1177/0741932512452794`. |
| St. Louis ample-reserves simulator URL'si | 404; doğrulanmadı. |
| Bank of England "letter simulator" | Sayfa yalnız para politikası bilgisi; iddia edilen araç yok. |
| University of Michigan yield-curve lab | Verilen URL genel kütüphane ana sayfası; araç doğrulanmadı. |
| World Bank pass-through/risk map | Verilen URL ve özellik doğrulanmadı. |

Sonuç: model çokluğu doğruluk garantisi değil. Dış araştırmada URL/DOI başlık
paritesi zorunlu kontrol olmalı. Yerel web MCP uçları da denendi; üçü de
`z.ai is not configured` döndürdüğü için kanıt akışına alınmadı.

---

## 6. Savunulabilir ders deneyimi yönleri

### 6.1 En yüksek etki/maliyet: mevcut öğrenme döngüsünü çalıştırmak

Mevcut 120 soruyu UI'a bağlamak, sayısal soruları deterministik değerlendirmek,
açık soruları rubrik bazlı geri bildirimle ele almak ve kullanıcıya revizyon
yaptırmak en yüksek getirili yön. Veri modeli ve okuma hattı zaten var.

Buradaki kritik ayrım: "soruları sayfaya basmak" yeterli değil. Döngü şu olmalı:

> bağımsız cevap → geri bildirim → eksik gerekçeyi görme → revizyon veya takip
> sorusu → gecikmeli yeni vaka

### 6.2 Editoryal varyans: 10 katı şablon değil, 5 baskın biçim

Araştırmadaki 10 arketip yararlı fikir havuzu; 40 ders için 10 ayrı ürün modu
bakım yükü yaratır. Beş baskın biçim yeterli:

1. **Kavram duruşması:** Rakip teori ve kanıt standartları.
2. **Model/işlem laboratuvarı:** Denklem, bilanço ve duyarlılık.
3. **Veri adli incelemesi:** Ölçüm, dönüşüm ve yanlış analiz denetimi.
4. **Vaka dosyası:** Tarihsel sıra, bilgi seti ve rakip teşhisler.
5. **Politika kararı:** Seçenek, risk, gerekçe, azınlık görüşü ve review trigger.

Bunlar ayrı veri modelleri olmak zorunda değil; ilk aşamada Markdown'ın mevcut
tablo, liste, blockquote ve başlık desteğiyle uygulanabilir.

### 6.3 Etkileşim: küçük, görünür model; büyük kara kutu değil

İlk etkileşim adayları, formülü veya muhasebe invariantını açıkça gösterebilen
nesneler olmalı:

| Ders | Nesne | Maliyet | Neden güvenli |
|---|---|---:|---|
| 1.2 Krediyi banka yaratır | Çift taraflı T-hesap işlem defteri | M | Her adımda bilanço eşitliği sınanabilir. |
| 3.3 Getiri eğrisi | Beklenti + vade primi ayrıştırıcısı | M | Aynı eğrinin birden fazla açıklamasını gösterir. |
| 3.4 Durasyon/konveksite | Tam fiyat ile iki yaklaşımı karşılaştırma | M | Sonuç deterministik; hata görünür. |
| 4.1 TÜFE | Sepet ağırlığı ve kişisel/resmi enflasyon | M | Ölçüm tasarımını somutlaştırır. |
| 4.5 Senyoraj | Cagan para talebi ve Laffer eğrisi | S | Tek formül, açık varsayım, düşük bakım. |

Carry trade, kur geçişkenliği, PPK dönemi, Minsky döngüsü ve Diamond–Dybvig
gibi çok dönemli motorlar daha yüksek model riski taşır. Çekirdek akış ve küçük
pilotlar kanıtlanmadan ilk pakete girmemeli.

### 6.4 Canlı veri: ilk sürümde çözüm değil

Aynı uygulamada piyasa/haber verisi olması cazip; fakat canlı sonuçlar nedensel
öğrenme kanıtı değildir. İlk veri görevleri tarih ve kaynak etiketi taşıyan sabit
snapshot kullanmalı. Canlı veri daha sonra yalnız:

- tahmin kilidi,
- önceden yazılmış çözülme kuralı,
- alternatif açıklamalar,
- "bu sonuç teoriyi doğrulamaz" uyarısı

ile birlikte araştırılabilir. Kısa vadeli fiyat yönü akademinin başarı ölçütü
olmamalı.

### 6.5 Teknik gömme yönü

Etkileşim gerektiğinde üç seçenek incelendi:

- Frontmatter widget listesi + gövde placeholder'ı.
- MDX.
- Doğrulanan özel `simulasyon` kod bloğu.

Araştırma sonucu MDX bu repo için fazla geniş ve geri dönüşü zor. En dar arayüz,
JSON içeren özel kod bloğunu seed sırasında doğrulayıp sayfada kapalı bir widget
registry ile render etmek. Bu yalnız tasarım yönüdür; mevcut içerik sözleşmesi
onay olmadan değiştirilmeyecek.

---

## 7. 40 ders için baskın biçim haritası

Bu tablo yeniden yazım emri değil; konu ile uygun bilişsel eylem eşleşmesidir.

| Ders | Baskın biçim |
|---|---|
| 1.1 Takas efsanesi ve paranın kökeni | Kavram duruşması |
| 1.2 Krediyi banka yaratır | Model/işlem laboratuvarı |
| 1.3 Merkez bankası bilançosu | Veri adli incelemesi |
| 1.4 Para arzı tanımları ve içsellik | Veri adli incelemesi |
| 1.5 Ödeme sistemleri ve rezerv dolaşımı | Model/işlem laboratuvarı |
| 2.1 Faiz koridoru ve operasyonel çerçeve | Model/işlem laboratuvarı |
| 2.2 Kıt ve bol rezerv rejimleri | Vaka dosyası |
| 2.3 APİ ve zorunlu karşılıklar | Model/işlem laboratuvarı |
| 2.4 QE/QT | Veri adli incelemesi |
| 2.5 Zaman tutarsızlığı ve bağımsızlık | Kavram duruşması |
| 3.1 Fisher ve reel faiz | Model/işlem laboratuvarı |
| 3.2 Parasal aktarım kanalları | Vaka dosyası |
| 3.3 Getiri eğrisi ve vade primi | Kavram duruşması |
| 3.4 Durasyon ve konveksite | Model/işlem laboratuvarı |
| 3.5 Negatif reel faiz ve finansal baskı | Kavram duruşması |
| 4.1 TÜFE'nin inşası | Veri adli incelemesi |
| 4.2 Phillips eğrisi | Kavram duruşması |
| 4.3 Miktar teorisi ve dolaşım hızı | Veri adli incelemesi |
| 4.4 Hiperenflasyon anatomisi | Vaka dosyası |
| 4.5 Enflasyon vergisi ve senyoraj | Model/işlem laboratuvarı |
| 5.1 Satın alma gücü paritesi | Veri adli incelemesi |
| 5.2 Faiz paritesi ve carry trade | Kavram duruşması |
| 5.3 İmkânsız üçleme ve küresel döngü | Kavram duruşması |
| 5.4 Kur geçişkenliği ve dolarizasyon | Vaka dosyası |
| 5.5 Rezerv yeterliliği ve müdahale | Politika kararı |
| 6.1 Finansal hızlandıran | Model/işlem laboratuvarı |
| 6.2 Minsky ve kredi döngüsü | Vaka dosyası |
| 6.3 Diamond–Dybvig banka hücumu | Model/işlem laboratuvarı |
| 6.4 Makroihtiyati politika | Politika kararı |
| 6.5 Ödemeler dengesi krizleri | Vaka dosyası |
| 7.1 Doğal faiz r* | Politika kararı |
| 7.2 Politika şokunu tanımlamak | Vaka dosyası |
| 7.3 Finansal koşullar endeksleri | Veri adli incelemesi |
| 7.4 Enflasyon koruması | Veri adli incelemesi |
| 7.5 Para politikası ve varlık fiyatları | Politika kararı |
| 8.1 Para rejimleri tarihi | Vaka dosyası |
| 8.2 Mali baskınlık ve FTPL | Kavram duruşması |
| 8.3 Türkiye 2001–2026 | Vaka dosyası |
| 8.4 Dolarizasyon histerezisi | Model/işlem laboratuvarı |
| 8.5 CBDC ve stablecoin | Politika kararı |

---

## 8. Üç yaklaşım

### A. Yalnız aktivasyon

Mevcut soruları, cevapları, AI feedback'i ve ilerlemeyi çalıştır; ders metinlerini
şimdilik koru.

- Artı: düşük kapsam, hazır altyapıyı kullanır.
- Eksi: editoryal tekdüzelik ve görsel durağanlık büyük ölçüde kalır.

### B. Dengeli dönüşüm — araştırmanın önerdiği yön

Önce soru–feedback–revizyon döngüsünü çalıştır; ardından dört temsilci derste
beş baskın biçimi ve 2–3 küçük deterministik etkileşimi pilotla; sonuçtan sonra
40 derse yayılım kararı ver.

- Artı: öğrenme kanıtını, editoryal ritmi ve teknik riski dengeler.
- Eksi: yalnız UI işi değildir; cevap sürümü, ilerleme ve içerik editörlüğü aynı
  tasarımda ele alınmalıdır.

### C. Simülasyon-first

12+ widget, canlı veri ve sekiz haftalık PPK/kalibrasyon motoruyla başla.

- Artı: ilk bakışta en gösterişli seçenek.
- Eksi: en yüksek sahte nedensellik, bakım ve yarım kalma riski. Çekirdek soru
  akışı hâlâ kapalıyken yanlış öncelik.

**Araştırma kararı:** B yaklaşımı tasarım aşamasına taşınmalı; C ertelenmeli.
Bu karar kullanıcı onayı olmadan uygulama kararı değildir.

---

## 9. Ölçüm

"Ders artık sıkıcı değil" yalnız oturum süresiyle ölçülemez. Üç sinyal ailesi
birlikte gerekir.

### 9.1 Doğrudan deneyim

Her ders sonunda üç ayrı 1–7 ölçek:

- Ne kadar sıkıldım?
- Ne kadar zihinsel çaba harcadım?
- Bir sonraki derse/tekrara devam etmek istiyor muyum?

Sıkılma ve çaba ayrı tutulmalı; desirable difficulty çabayı artırabilir.

### 9.2 Davranış

- İlk sorudan önce terk.
- Cevap gönderme.
- Feedback'i açma.
- Feedback sonrası revizyon.
- 24 saat içinde gönüllü devam.
- Vadesi gelen tekrarın tamamlanması veya ertelenmesi.

### 9.3 Öğrenme

- 7 ve 21 gün sonra aynı soru değil, yeni sayı/yeni vaka transferi.
- İlk ve revize açık cevapta karşılanan rubrik maddeleri.
- Sayısal hata türü: birim, işaret, formül seçimi, hesap.
- Güven–performans farkı; düşük örnekte kalibrasyon eğrisi iddiası yok.

Tek kullanıcı için klasik A/B uygun değil. Dersler konu bakımından eşdeğer
olmadığı için basit önce/sonra ortalaması da zayıf. Uygun çerçeve, birkaç derslik
başlangıç ölçümü ve basamaklı müdahale ile kişi-içi zaman serisi; metodolojik
sınırlar [Single-Case Intervention Research Design Standards](https://doi.org/10.1177/0741932512452794)
ile uyumlu raporlanmalı. Öğrenilmiş bilgiyi geri alamayacağımız için soruları
sonradan gizleyen A–B–A–B tasarımı kullanılmamalı.

## 10. Tasarım aşamasına taşınmaması gerekenler

- Liderlik tablosu: tek kullanıcıda anlamsız.
- Rozet, XP, seviye: tamamlama ile ustalığı karıştırır.
- Günlük streak: düşünme kalitesini değil giriş sıklığını ödüllendirir.
- Konfeti: lisansüstü geri bildirimin tonunu bozar.
- Zaman sınırlı sınav: hedef işlem hızı değil.
- Sınırsız AI hoca: kullanıcı cevap üretmeden açıklama verirse pasifliği büyütür.
- Her paragrafta mikro soru: uzmanlık tersine dönüşü ve prompt yorgunluğu.
- Canlı piyasa hareketini teori doğrulaması saymak.
- Büyük PPK simülasyonunu açıklanmayan if/then motoruyla kurmak.
- İlk turda 40 dersi birden yeniden yazmak.

## 11. Sonraki kapı

Araştırma, **Dengeli dönüşüm** yönünü öneriyor. Sonraki adım uygulama değil:
önce bu yön için ayrı bir tasarım belgesi hazırlanmalı; çekirdek öğrenme döngüsü,
beş ders biçimi, ilk pilot dersler, AI sınırı, veri modeli ve ölçüm sözleşmesi
kullanıcı tarafından onaylanmalı. Onaydan sonra implementation plan yazılabilir.
