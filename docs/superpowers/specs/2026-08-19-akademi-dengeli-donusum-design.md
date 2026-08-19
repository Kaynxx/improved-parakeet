# Akademi dengeli dönüşüm tasarımı

Tarih: 2026-08-19 · Durum: **onaylandı**

## Problem

Akademinin 40 dersi içerikçe güçlü; deneyim pasif ve tekdüze. Ders sayfası yalnız metin ve kaynak gösteriyor. Veritabanında bulunan 120 soru, cevap, rubrik geri bildirimi ve ilerleme durumları kullanıcıya ulaşmıyor. Aynı uzunluk, kaynak sırası ve kapanış biçimi bütün derslerde tekrar ediyor.

## Karar

İlk paket üç katmanı birlikte teslim eder:

1. Bütün derslerde çalışan cevap → geri bildirim → revizyon döngüsü.
2. Beş baskın ders biçimini temsil eden editoryal pilotlar.
3. Üç küçük, deterministik ve varsayımları görünür laboratuvar.

Canlı veri, büyük politika motorları, rozet/XP ve genel amaçlı MDX bu pakete girmez. Öğrenme davranışını ölçmeden 40 dersin tamamı yeniden yazılmaz.

## Çekirdek öğrenme döngüsü

Her dersin mevcut frontmatter soruları sayfanın sonunda sırayla gösterilir.

- Kullanıcı önce bağımsız cevap verir.
- `sayisal` cevap beklenen değer ve toleransla yerel, deterministik olarak değerlendirilir.
- `acik` cevap yalnız sorunun sunucudaki rubriğine göre AI ile değerlendirilir.
- `tahmin` cevap kilitli kayıt gibi saklanır; sonuç verisi olmadan başarı puanı üretilmez.
- Geri bildirim güçlü yanlar, eksikler, kısa açıklama ve tek takip sorusu içerir.
- Kullanıcı cevabını düzenleyip yeniden değerlendirebilir. Önceki geri bildirim satırları denetim izi olarak korunur.
- AI anahtarı yoksa açık cevap yine kaydedilir; kullanıcıya değerlendiricinin bağlı olmadığı açıkça söylenir.

### İlerleme anlamı

- `reading`: ders sayfası kimliği doğrulanmış kullanıcı tarafından açıldı.
- `answered`: dersteki bütün sorular cevaplandı.
- `reviewed`: bütün puanlanabilir soruların en son cevaplarına geri bildirim geldi.
- `mastered`: puanlanabilir soruların puan ağırlıklı ortalaması en az 70.

İlerleme geriye gitmez. Eksik cevap varken `answered` yazılmaz. `tahmin` sorusu feedback bekletmez ve ustalık ortalamasına katılmaz.

## Sunucu sınırı

İstemci yalnız `promptId` ve cevap gövdesi gönderir. Soru, tür, rubrik, beklenen değer, tolerans, puan ve ders üyeliği veritabanından yeniden okunur.

- Oturum yoksa eylem reddedilir.
- Soru rota dersine ait değilse eylem reddedilir.
- Boş cevap reddedilir.
- Cevap uzunluğu 10.000 karakterle sınırlıdır.
- Sayısal cevap hem `12.5` hem `12,5` biçimini kabul eder; tek bir sonlu sayı dışında metin kabul etmez.
- AI girdisi rubrik dışına taşmaz; model çıktısı mevcut Zod şemasıyla doğrulanır.
- Cevap, AI çağrısı başarısız olsa bile kaybolmaz.

## Soru arayüzü

Ders gövdesi kesintiye uğratılmaz. `Çalışma masası` içeriğin ardından, kaynaklardan önce gelir.

Her soru kartı şunları taşır:

- soru sıra numarası, türü ve puanı;
- Markdown olarak güvenli render edilen soru;
- türe uygun tek giriş alanı;
- `Cevabı kaydet` veya `Yeniden değerlendir` eylemi;
- bekleme, kaydedildi, değerlendirici yok ve hata durumları;
- varsa puan, güçlü yanlar, eksikler, geri bildirim ve takip sorusu.

Geri bildirim varsayılan olarak görünürdür; gizli akordeon öğrenme kanıtını saklamaz. Klavye odağı, alan etiketi, hata ilişkisi ve hareket azaltma tercihi korunur. Yeni bir görsel sistem kurulmaz; mevcut `glass`, `BentoCard`, renk ve tipografi sözlüğü kullanılır.

## Pilot ders biçimleri

Beş biçim, mevcut Markdown öğeleriyle beş temsilci derste denenir:

| Biçim | Pilot ders | Editoryal eylem |
|---|---|---|
| Kavram duruşması | 1.1 Takas efsanesi ve paranın kökeni | Rakip iddialar, kanıt standardı ve hüküm tablosu |
| Model/işlem laboratuvarı | 1.2 Krediyi banka yaratır | T-hesap adımları ve bilanço invariantı |
| Veri adli incelemesi | 4.1 TÜFE | Sepet ağırlıkları, karşılaştırma ve ölçüm hatası |
| Vaka dosyası | 8.3 Türkiye 2001–2026 | Kronoloji, dönemin bilgi seti ve rakip teşhisler |
| Politika kararı | 8.5 CBDC ve stablecoin | Seçenek, risk, azınlık görüşü ve gözden geçirme tetikleyicisi |

Bu düzenlemeler mevcut akademik iddiaları veya kaynakları değiştirmez; okurun yaptığı bilişsel işi görünür kılar. Her pilotun açılışı, bölüm ritmi ve kapanışı kendi biçimine uyar. Mevcut üç soru korunur; yalnız açıkça gerekli olduğunda ifade/rubrik aynı öğrenme hedefini koruyarak düzenlenir.

## Kapalı etkileşim sözleşmesi

Etkileşimler ders gövdesindeki doğrulanan özel kod bloklarıdır:

```text
```etkilesim
{"tur":"t-hesap", ...}
```
```

Seed sırasında ve render öncesinde aynı Zod ayrıştırıcısı çalışır. Bilinmeyen tür, geçersiz JSON veya şema dışı alan sessizce atlanmaz; dosya/alan adıyla hata üretir. Render yalnız kapalı registry'deki bileşenlere gider. MDX, dinamik import ve içerikten kod çalıştırma yoktur.

İlk registry:

1. `t-hesap` — 1.2: kredi verme adımlarında varlık = yükümlülük + özkaynak eşitliğini gösterir.
2. `durasyon-konveksite` — 3.4: faiz şokunda tam tahvil fiyatını duration ve duration+convexity yaklaşımlarıyla karşılaştırır.
3. `tufe-sepeti` — 4.1: ağırlık ve fiyat değişiminden resmi sepet ile kişisel sepet sonucunu karşılaştırır.

Her laboratuvar:

- varsayımları yüzeyde gösterir;
- giriş aralığını sınırlar;
- sonucu istemci tarafında deterministik hesaplar;
- formül veya muhasebe eşitliğini gösterir;
- "bu sonuç nedensel kanıt değildir" sınırını gerektiğinde açıklar;
- ağ, API veya kalıcı veri gerektirmez.

## Pilot ölçümü

Her pilot dersin sonunda üç ayrı 1–7 ölçek tek kayıt olarak saklanır:

- sıkılma;
- zihinsel çaba;
- devam etme isteği.

Kullanıcı başına ders başına tek güncel kayıt tutulur; yeniden gönderim üzerine yazar. UI bu ölçekleri başarı puanına katmaz ve olumlu cevabı ödüllendirmez. Bu paket analitik panel kurmaz; kayıtlar pilot sonrası karar için sorgulanabilir veri üretir.

## Ertelenenler

- 24 saatlik gecikmeli yeni vaka: ayrı bir vaka havuzu ve çözülme sözleşmesi olmadan sahte tekrar üreteceği için pilot sonrasına bırakıldı.
- Canlı piyasa verisi ve tahmin çözülmesi.
- Carry trade, PPK, Minsky veya banka hücumu gibi çok dönemli motorlar.
- 40 dersin toplu editoryal yeniden yazımı.
- XP, seri, rozet, liderlik tablosu.

## Kabul ölçütleri

- Her mevcut ders üç sorusunu gösterir ve cevap kaydeder.
- Sayısal cevaplar AI olmadan doğru toleransla değerlendirilir.
- Açık cevaplar rubrikle değerlendirilir; anahtar yoksa cevap korunur ve açık durum gösterilir.
- Revizyon yeni feedback üretir, eski feedback kaydı silinmez.
- Ders açılışı ve öğrenme olayları doğru ilerleme durumlarını üretir.
- Üç etkileşim yalnız tanımlı pilotlarda render edilir ve hesapları deterministiktir.
- Beş pilot birbirinden ayırt edilebilir bilişsel biçime sahiptir.
- Üç 1–7 ölçüm güvenli biçimde kaydedilir.
- Mobil ve masaüstü gerçek tarayıcıda; boş, yükleniyor, başarı, hata ve AI-yok durumlarında doğrulanır.
