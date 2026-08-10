# Ders dosya adları — 40 ders (kesinleşmiş)

Tarih: 2026-08-10 · Durum: **kesin — değiştirilmez**

Ders gövdeleri sekiz paralel şeritte yazıldı. Ön koşul (`onkosul`) alanı haftalar
arası kenar kurduğu ve `scripts/seed.ts` çözülemeyen bir ön koşulda **hata
fırlattığı** için, dosya adlarının yazım turundan **önce** sabitlenmesi gerekti:
hafta 5'i yazan şerit, hafta 3'ü yazan şeridin hangi slug'ı seçeceğini
bilemezdi.

`onkosul` biçimi `hafta-NN/slug` — sıra öneki (`01-`) **yoktur**.

Slug'lar ASCII: `load.ts`'teki `^(\d{2})-([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.md$`
Türkçe harf kabul etmez.

## hafta-01 · Para nedir: yaratım, ölçüm, kurum

| Dosya | Slug |
|---|---|
| `01-takas-efsanesi-ve-paranin-kokeni.md` | `takas-efsanesi-ve-paranin-kokeni` |
| `02-krediyi-banka-yaratir.md` | `krediyi-banka-yaratir` |
| `03-merkez-bankasi-bilancosu.md` | `merkez-bankasi-bilancosu` |
| `04-para-arzi-tanimlari-ve-icsellik.md` | `para-arzi-tanimlari-ve-icsellik` |
| `05-odeme-sistemleri-ve-rezerv-dolasimi.md` | `odeme-sistemleri-ve-rezerv-dolasimi` |

## hafta-02 · Para politikası nasıl uygulanır

| Dosya | Slug |
|---|---|
| `01-faiz-koridoru-ve-operasyonel-cerceve.md` | `faiz-koridoru-ve-operasyonel-cerceve` |
| `02-kit-rezerv-ve-bol-rezerv-rejimleri.md` | `kit-rezerv-ve-bol-rezerv-rejimleri` |
| `03-acik-piyasa-islemleri-ve-zorunlu-karsiliklar.md` | `acik-piyasa-islemleri-ve-zorunlu-karsiliklar` |
| `04-bilanco-politikasi-qe-qt.md` | `bilanco-politikasi-qe-qt` |
| `05-zaman-tutarsizligi-ve-bagimsizlik.md` | `zaman-tutarsizligi-ve-bagimsizlik` |

## hafta-03 · Faiz ve vadeli yapı

| Dosya | Slug |
|---|---|
| `01-fisher-denklemi-ve-reel-faiz.md` | `fisher-denklemi-ve-reel-faiz` |
| `02-parasal-aktarim-kanallari.md` | `parasal-aktarim-kanallari` |
| `03-getiri-egrisi-ve-vade-primi.md` | `getiri-egrisi-ve-vade-primi` |
| `04-iskonto-matematigi-durasyon-konveksite.md` | `iskonto-matematigi-durasyon-konveksite` |
| `05-negatif-reel-faiz-ve-finansal-baski.md` | `negatif-reel-faiz-ve-finansal-baski` |

## hafta-04 · Enflasyon: ölçüm, mekanizma, rejim

| Dosya | Slug |
|---|---|
| `01-tufe-nin-insasi.md` | `tufe-nin-insasi` |
| `02-phillips-egrisi.md` | `phillips-egrisi` |
| `03-miktar-teorisi-ve-dolasim-hizi.md` | `miktar-teorisi-ve-dolasim-hizi` |
| `04-hiperenflasyon-anatomisi.md` | `hiperenflasyon-anatomisi` |
| `05-enflasyon-vergisi-ve-senyoraj.md` | `enflasyon-vergisi-ve-senyoraj` |

## hafta-05 · Açık ekonomi: kur ve sermaye akımları

| Dosya | Slug |
|---|---|
| `01-satin-alma-gucu-paritesi.md` | `satin-alma-gucu-paritesi` |
| `02-faiz-paritesi-ve-carry-trade.md` | `faiz-paritesi-ve-carry-trade` |
| `03-imkansiz-ucleme-ve-kuresel-finansal-dongu.md` | `imkansiz-ucleme-ve-kuresel-finansal-dongu` |
| `04-kur-geciskenligi-ve-dolarizasyon.md` | `kur-geciskenligi-ve-dolarizasyon` |
| `05-rezerv-yeterliligi-ve-doviz-mudahalesi.md` | `rezerv-yeterliligi-ve-doviz-mudahalesi` |

## hafta-06 · Kredi, kırılganlık, kriz

| Dosya | Slug |
|---|---|
| `01-finansal-hizlandiran.md` | `finansal-hizlandiran` |
| `02-minsky-ve-kredi-dongusu.md` | `minsky-ve-kredi-dongusu` |
| `03-banka-hucumu-diamond-dybvig.md` | `banka-hucumu-diamond-dybvig` |
| `04-makro-ihtiyati-politika.md` | `makro-ihtiyati-politika` |
| `05-odemeler-dengesi-krizleri.md` | `odemeler-dengesi-krizleri` |

## hafta-07 · Para politikası ve varlık fiyatları

| Dosya | Slug |
|---|---|
| `01-dogal-faiz-r-star.md` | `dogal-faiz-r-star` |
| `02-politika-sokunu-tanimlamak.md` | `politika-sokunu-tanimlamak` |
| `03-finansal-kosullar-endeksleri.md` | `finansal-kosullar-endeksleri` |
| `04-enflasyon-korumasi-iddiasi.md` | `enflasyon-korumasi-iddiasi` |
| `05-para-politikasi-ve-varlik-fiyatlari.md` | `para-politikasi-ve-varlik-fiyatlari` |

## hafta-08 · Rejimler ve Türkiye

| Dosya | Slug |
|---|---|
| `01-para-rejimleri-tarihi.md` | `para-rejimleri-tarihi` |
| `02-mali-baskinlik-ve-ftpl.md` | `mali-baskinlik-ve-ftpl` |
| `03-turkiye-2001-2026.md` | `turkiye-2001-2026` |
| `04-dolarizasyon-histerezisi.md` | `dolarizasyon-histerezisi` |
| `05-dijital-para-cbdc-ve-stablecoin.md` | `dijital-para-cbdc-ve-stablecoin` |
