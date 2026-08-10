# Süreç Günlüğü Tasarımı

## Amaç

Projenin geçmişini, güncel durumunu ve sıradaki işleri tek bakışta anlaşılır
kılan; her çalışma oturumundan sonra kronolojik olarak güncellenen tek bir
yaşayan belge oluşturmak.

## Dosya

Günlük proje kökündeki `SUREC-GUNLUGU.md` dosyasında tutulacak. Türkçe dosya
adı, proje içindeki Türkçe dokümantasyon ve arayüz kuralıyla uyumludur.

## İçerik yapısı

Dosya aşağıdaki kalıcı bölümleri içerecek:

1. **Projenin amacı:** Ürünün kısa ve kalıcı tanımı.
2. **Mevcut durum:** Aktif dal, tamamlanan ana aşamalar ve güncel çalışma odağı.
3. **Tamamlanan aşamalar:** Önemli kilometre taşlarının kısa özeti.
4. **Bundan sonra yapılacaklar:** Önce fazlara, her fazın içinde konu veya iş
   paketlerine ayrılmış; öncelik sırasına konmuş, işaretlenebilir görevler.
5. **Açık kararlar ve sorunlar:** Henüz sonuçlanmamış seçimler, engeller ve bilinen
   teknik borçlar.
6. **Çalışma kuralları:** Projede değişiklik yaparken uyulacak temel sınırlar ve
   zorunlu doğrulamalar.
7. **Kronolojik süreç günlüğü:** En yeni kayıt üstte olacak şekilde çalışma
   oturumlarının kaydı.

## Günlük kaydı biçimi

Her çalışma kaydı şunları içerecek:

- tarih ve kısa başlık;
- çalışmanın amacı;
- yapılan işlemler ve alınan kararlar;
- değiştirilen önemli dosyalar;
- çalıştırılan doğrulamalar ve sonuçları;
- tamamlanmayan işler ile sıradaki somut adım.

Doğrulama çalıştırılmadıysa bu durum açıkça yazılacak; varsayılan veya tahminî bir
sonuç başarı olarak kaydedilmeyecek.

## Gelecek çalışma planının biçimi

Yol haritası, projenin tamamını tek bir görev listesine sıkıştırmayacak. Plan şu
hiyerarşiyle yazılacak:

1. **Faz:** Ürünün ana teslim aşaması.
2. **Konu veya iş paketi:** Aynı amaca hizmet eden bağımsız çalışma alanı.
3. **Somut görev:** Tamamlandığı doğrulanabilen işaretlenebilir adım.

Her faz için amaç, mevcut durum, bağımlılıklar ve tamamlanma ölçütü belirtilecek.
Henüz karara bağlanmamış işlerin kesinleştiği izlenimi verilmeyecek; bunlar açık
karar olarak işaretlenecek.

## Bilgi kaynakları ve güncelleme kuralı

İlk içerik Git geçmişi, `CLAUDE.md`, `memory-bank/` belgeleri ve çalışma ağacının
mevcut durumundan derlenecek. Gelecek fazlar özellikle `CLAUDE.md`,
`memory-bank/projectbrief.md`, `memory-bank/progress.md`,
`memory-bank/activeContext.md` ve `memory-bank/decisionLog.md` birlikte okunarak
çıkarılacak. Çelişki halinde güncel Git geçmişi ve çalışma ağacındaki
doğrulanabilir durum esas alınacak; eski bilgiler güncel gerçekmiş gibi
aktarılmayacak.

Her anlamlı çalışma sonunda:

1. mevcut durum ve yapılacaklar güncellenecek;
2. tamamlanan maddeler ilgili bölüme taşınacak;
3. yeni karar veya sorunlar kaydedilecek;
4. kronolojik günlüğe yeni bir oturum kaydı eklenecek.

`SUREC-GUNLUGU.md` operasyonel özet ve günlük olacaktır. Ayrıntılı mimari kararlar
`memory-bank/decisionLog.md`, kalıcı proje kuralları ise `CLAUDE.md` içinde kalır;
günlük bu belgeleri gereksiz yere kopyalamaz.

## Başarı ölçütleri

- Yeni bir çalışma oturumuna başlayan kişi iki dakika içinde projenin nerede
  kaldığını ve sıradaki işi anlayabilir.
- Tamamlanmış, aktif ve planlanmış işler birbirine karışmaz.
- Gelecek işler faz, konu/iş paketi ve somut görev düzeylerinde izlenebilir.
- Her günlük kaydı yapılan iş ile doğrulama durumunu dürüstçe gösterir.
- Belge tek başına okunabilir, fakat ayrıntılı kaynak belgelere doğru bağlantılar
  verir.
