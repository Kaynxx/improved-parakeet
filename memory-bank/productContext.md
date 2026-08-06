# Product Context

> Bu proje neden var, hangi problemi çözüyor, nasıl çalışmalı.
> Teknik "nasıl" için `systemPatterns.md`, kapsam için `projectbrief.md`.

## Problem

Piyasayı takip eden bireysel yatırımcının günü üç ayrı sekmede geçiyor:

- **Haber tarafı** — onlarca kaynak, çoğu aynı haberi tekrar ediyor; hangisinin
  hangi sembolü ilgilendirdiği elle çıkarılıyor.
- **Topluluk tarafı** — Reddit'te sinyal var ama gürültünün içinde. "Bugün ne
  konuşuluyor ve havanın rengi ne?" sorusunun cevabı yüzlerce başlığı taramadan
  alınamıyor.
- **Öğrenme tarafı** — bilgi bol ama sırasız. YouTube önerileri rastgele; neyin
  neyin ön koşulu olduğu belli değil, bu yüzden ilerleme hissi oluşmuyor.

Bu üçü ayrı ayrı çözülmüş problemler. Çözülmemiş olan **kesişimleri**: bir
haberin topluluğa nasıl yansıdığı, bir tartışmanın hangi kavramı bilmeyi
gerektirdiği.

## Ürünün duruşu

Panel **yatırım tavsiyesi vermez**. Ne sinyal üretir, ne hedef fiyat söyler, ne
"al/sat" der. Yaptığı tek şey: dağınık olanı bir araya getirip bağlamı görünür
kılmak. Duyarlılık metresi bir tahmin değil, topluluğun o anki halinin ölçümü —
arayüz bunu her yerde "gönderi sayısı + pencere" ile birlikte gösterir ki
kullanıcı ölçümün neye dayandığını bilsin.

Sürü davranışının kendisi de akademide bir ders adımı (`surunun-etkisi`):
"topluluk duyarlılığını sinyal sanmanın tuzağı". Ürün, kendi gösterdiği veriye
karşı okuryazarlığı da öğretiyor. Bu bilinçli.

## Nasıl çalışmalı

**Panel açıldığında ilk 5 saniyede** kullanıcı şunları görmüş olmalı: piyasanın
yönü, son dakika haberi var mı, topluluğun havası, ve akademide sıradaki adım.
Bento grid'in düzeni bu okuma sırasına göre kuruldu — yukarıdan aşağı önem
azalır.

**Yön bilgisi asla yalnız renkten okunmaz.** Her yükseliş/düşüş göstergesi ok
ikonu + işaretli sayı taşır, her duyarlılık rozeti metin etiketi taşır. Kırmızı-
yeşil ayrımı renk körlüğünde zayıf ayrıştığı için bu bir tercih değil,
gereklilik (bkz. `decisionLog.md` → "Yön rengi #22C55E yerine #2DD4A0").

**Sayılar zıplamaz.** Tüm sayısal veri sabit genişlikli rakamlarla; fiyat
kolonları güncellenirken satır kaymaz. Panellerin yüksekliği sabit, içerik
kendi içinde kayar — grid hiçbir zaman yeniden düzenlenmez.

**Harici bir kaynak çökerse panel çalışmaya devam eder.** Veri toplama ayrı bir
süreçte; UI yalnız kendi veritabanımızdan okur. Reddit'in erişilemez olması
haber akışını veya akademiyi etkilemez.

## Kullanıcı deneyimi hedefleri

| Hedef | Bunun karşılığı |
|---|---|
| Yoğun ama sakin | Kılcal kenarlıklar, üç kademeli metin hiyerarşisi, cimri aksan kullanımı |
| Tarama hızlı | Sabit genişlikli rakamlar, sabit panel yükseklikleri, tutarlı kart primitifi |
| Güven veren | Ölçümün dayanağı hep görünür (kaç gönderi, hangi pencere, hangi kaynak) |
| Erişilebilir | Renk hiçbir yerde tek taşıyıcı değil; her grafiğin metin karşılığı var; klavyeyle gezilebilir |
| İlerleme hissi | Akademi DAG'ı, ön koşullar ve halka göstergesiyle "nerede kaldım" her an belli |

## Dil kararı

Arayüz Türkçe, içerik İngilizce. Haber ve Reddit içeriğini çevirmek ayrı bir
ürün problemi; makine çevirisi finansal metinde anlam kaydırıyor. Kullanıcı
İngilizce içerik okuyabiliyor, arayüzün Türkçe olması yeterli.

## Başarı neye benzer

Kullanıcı sabah paneli açıp üç sekme açmadan günün resmini alabiliyorsa ürün
işini yapmıştır. Akademi tarafında başarı: kullanıcının panelde gördüğü bir
kavramı ("upvote ratio", "breadth", "reel getiri") anlamadığında, o kavramın
akademide bir adımı olduğunu bulabilmesi.

İlgili: `projectbrief.md`, `activeContext.md`, `decisionLog.md`
