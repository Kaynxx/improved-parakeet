---
kind: canonical-product
last_verified: 2026-08-19
owner: coordinator
sources:
  - CLAUDE.md:1-8
  - SUREC-GUNLUGU.md:24-30
---

# Product Context

## Purpose

Finans Programı, bireysel yatırımcının dağınık kalan üç işini tek bir bağlamda
birleştirir: seçili RSS kaynaklarından piyasa haberi, topluluk duyarlılığı ve
finansal okuryazarlık akademisi. Ortak omurga sembollerdir (`tickers`): haber,
tartışma ve öğrenme kavramı aynı varlık çevresinde okunabilir.

## Product boundary

Ürün **yatırım tavsiyesi değildir**. Al/sat önerisi, hedef fiyat, getiri vaadi
veya yatırım sinyali üretmez. Duyarlılık, topluluğun görünür zaman penceresinde
ne konuştuğunu gösteren bir ölçümdür; gönderi sayısı, pencere ve kaynak gibi
ölçüm dayanağı görünür kalır.

## User guarantees

- Arayüz Türkçe, kaynak içerik İngilizcedir. Finansal içeriğin makine çevirisi
  bu ürünün işi değildir.
- Panel, ilk bakışta piyasa yönü, haber, topluluk durumu ve akademideki sonraki
  adımı okunur kılar.
- Renk hiçbir yön veya durumun tek taşıyıcısı değildir; ikon, metin veya
  sayısal işaret eşlik eder.
- Harici kaynak başarısız olsa da dashboard render edilir; arayüz yalnız kendi
  veritabanından okur.
- Akademi, panelde karşılaşılan kavramların ön koşullu öğrenme yolunu sunar.

## Current scope boundary

Şimdilik deployment hedefi, mobil uygulama, i18n katmanı, portföy/işlem
izleme, gerçek para hareketi ve yatırım tavsiyesi kapsam dışıdır.

## Evidence

- Product purpose and non-advisory boundary: `SUREC-GUNLUGU.md:24-30`.
- Single-user model: `CLAUDE.md:1-8`.
- User guarantees and scope boundary were reviewed from the retired bank on
  2026-08-19 and must be revalidated against product behavior when changed.
