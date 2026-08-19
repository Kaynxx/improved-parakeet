# Müfredat — 8 hafta, 40 ders (İskelet)

Tarih: 2026-08-08 · Durum: **taslak — kaynak araştırması bu listeye göre yürüyor**

Alt proje **C**'nin omurgası. Hafta 3 ve 4 zaten
`docs/superpowers/research/akademi-kaynaklar-hafta-03-04.md` içinde kaynaklarıyla
araştırılmıştı; bu dosya o ikisini yerine oturtur ve kalan altı haftayı tanımlar.

## Tasarım kararları

**Sıra tesadüfi değil.** Program parayı önce bir *kurum* olarak kuruyor (1-2),
sonra fiyatını (3) ve değer kaybını (4) ölçüyor, ardından dışa açılıyor (5),
kredi tarafındaki kırılganlığı ekliyor (6), varlık fiyatlarına bağlıyor (7) ve
Türkiye'ye iniyor (8). Hafta 5'ten önce Fisher denklemi ve kur geçişkenliği
bilinmezse imkânsız üçleme boşlukta kalır.

**Seviye:** lisansüstü parasal iktisat. Her ders bir tartışmayı — tek bir doğru
cevabı olmayan bir yeri — merkezine alır; tanım ezberi değil.

**Türkiye her haftada var**, ayrı bir "Türkiye haftası" olarak değil. Hafta 8
istisna: orada vaka çalışmasının kendisi konu.

**Ders başına üç kaynak:** bir video (giriş, `orta`), bir makale (asıl metin,
`ileri`/`uzman`), bir tartışma (forum/blog/köşe yazısı — uzlaşmanın nerede
bittiğini gösterir).

---

## Hafta 1 · Para nedir: yaratım, ölçüm, kurum

1.1 Takas efsanesi ve paranın kökeni — Menger'in piyasa anlatısına karşı kredi/borç teorisi (Graeber, Innes)
1.2 Krediyi banka yaratır: mevduat çarpanı modelinin çöküşü ve BoE 2014 tashihi
1.3 Merkez bankası bilançosunu okumak — emisyon, rezerv, yükümlülük tarafı gerçekte ne der
1.4 M0/M1/M2/M3 ve para arzının içselliği (endogeneity) — hangi tanım neyi ölçer
1.5 Ödeme sistemleri ve rezerv dolaşımı: RTGS, gün içi likidite, mutabakat riski

## Hafta 2 · Para politikası nasıl *uygulanır*

2.1 Faiz koridoru ve operasyonel çerçeve — "politika faizi" piyasada nasıl gerçekleşir
2.2 Kıt rezerv (corridor) ve bol rezerv (floor) rejimleri: 2008'in operasyonel mirası
2.3 Açık piyasa işlemleri, repo ve zorunlu karşılıklar — TCMB'nin araç seti
2.4 Bilanço politikası: QE/QT, portföy dengesi kanalı ve sinyal kanalı ayrımı
2.5 Zaman tutarsızlığı (Kydland–Prescott), bağımsızlık ve enflasyon hedeflemesinin doğuşu

## Hafta 3 · Faiz ve vadeli yapı *(araştırması yapıldı)*

3.1 Fisher denklemi, reel faizin ölçülemezliği, breakeven enflasyon çıkarımı
3.2 Para politikası aktarım kanalları — Türkiye'de hangisi baskın
3.3 Getiri eğrisi: beklentiler hipotezi, vade primi, tersine dönme
3.4 İskonto matematiği: sürekli bileşik, durasyon, konveksite
3.5 Negatif reel faiz ve finansal baskı (financial repression)

## Hafta 4 · Enflasyon: ölçüm, mekanizma, rejim *(araştırması yapıldı)*

4.1 TÜFE'nin inşası: sepet, ikame yanlılığı, kira imputasyonu, TÜİK metodolojisi
4.2 Phillips eğrisi: orijinali, genişletilmiş hali, düzleşme tartışması
4.3 Miktar teorisi, dolaşım hızı, 2008-2020'de enflasyonun gelmeyişi
4.4 Hiperenflasyon anatomisi: Cagan modeli, mali baskınlık
4.5 Enflasyon vergisi, senyoraj ve senyorajın Laffer eğrisi

## Hafta 5 · Açık ekonomi: kur ve sermaye akımları

5.1 Satın alma gücü paritesi ve reel efektif kur — neden hiçbir ufukta tutmaz
5.2 Faiz paritesi (kapalı/açık), carry trade ve forward premium bulmacası
5.3 İmkânsız üçleme ve Rey'in "ikilem" itirazı: küresel finansal döngü
5.4 Kur geçişkenliği (pass-through), dolarizasyon ve bilanço etkisi
5.5 Rezerv yeterliliği, döviz müdahalesi ve kur korumalı mevduat gibi melez araçlar

## Hafta 6 · Kredi, kırılganlık, kriz

6.1 Finansal hızlandıran ve bilanço kanalı (Bernanke–Gertler)
6.2 Minsky kırılganlık hipotezi ve kredi döngüsünün ampiriği (Schularick–Taylor)
6.3 Banka hücumu: Diamond–Dybvig, mevduat sigortası, son kredi mercii ve ahlaki tehlike
6.4 Makro ihtiyati politika: kredi/GSYİH açığı, sermaye tamponları, LTV/DTI sınırları
6.5 Ödemeler dengesi krizleri: birinci/ikinci/üçüncü nesil modeller ve ani duruş

## Hafta 7 · Para politikası ve varlık fiyatları

7.1 Doğal faiz (r\*): tahmin belirsizliği ve politika kuralına devredilemezliği
7.2 Politika şokunu tanımlamak: yüksek frekanslı olay çalışması ve içsellik sorunu
7.3 Finansal koşullar endeksleri — politika duruşunu faizden başka ne ölçer
7.4 Enflasyon koruması iddiası: TIPS, altın, emtia, hisse senedi — kanıt ne diyor
7.5 Para politikası ve konut/hisse fiyatları: "lean vs. clean" tartışması

## Hafta 8 · Rejimler ve Türkiye

8.1 Para rejimleri tarihi: altın standardı, Bretton Woods, serbest kura geçiş
8.2 Mali baskınlık ve fiyat düzeyinin mali teorisi (FTPL)
8.3 Türkiye 2001–2026: enflasyon hedeflemesinden heterodoksiye ve geri dönüş
8.4 Dolarizasyon histerezisi ve tersine dolarizasyonun koşulları
8.5 Dijital para: CBDC, stablecoin ve banka aracılığının geleceği

---

## Açık uçlar

- Hafta 3-4 dışındaki kaynak araştırması **bu listeye göre** yürütülüyor; bir
  başlık değişirse yalnız o haftanın araştırması yeniden koşturulur.
- Ders gövdelerinin (`content/akademi/hafta-NN/NN-slug.md`) yazımı ayrı bir tur;
  dosya adındaki slug'lar araştırma bittikten sonra kesinleşir.
