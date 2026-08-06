# Project Brief

> Temel doküman. Diğer tüm memory bank dosyaları bunun üzerine kurulur.
> Kapsam konusunda **tek doğruluk kaynağı** budur — bir iş bu dosyada yoksa
> kapsam dışıdır.

## Ne inşa ediyoruz

**Finans Programı** — piyasayı takip eden bireysel yatırımcı için "all-in-one"
finansal dashboard. Şu an dağınık üç akışı tek panelde birleştirir:

1. **Haber motoru** — seçili kaynaklardan RSS ile gerçek zamanlı piyasa haberleri,
   tam makale çıkarımı ve okuma görünümü.
2. **Topluluk duyarlılığı** — Reddit toplulukları üzerinden gönderi toplama,
   duyarlılık skorlama ve sembol bazlı günlük rollup.
3. **Akademi** — finansal okuryazarlığı sıfırdan kuran, DAG yapılı bir yol
   haritası ve adım başına günlük video önerisi.

Üç modülü birbirine bağlayan omurga **semboller** (`tickers`): bir haber ile bir
Reddit tartışması aynı sembol üzerinden kesişir. Ürünün asıl değeri burada —
ayrı ayrı üç araç değil, kesişimi gösteren tek araç.

## Estetik hedef

"Bloomberg Terminal'in modernize edilmiş, retail-friendly hali." Yoğun bilgi,
ama kalabalık değil. Karanlık tema, kılcal kenarlıklar, yüzey basamağıyla
derinlik, sabit genişlikli rakamlar. Aksan rengi cimrice kullanılır.

## Temel gereksinimler

- Türkçe arayüz, İngilizce içerik (içerik kaynağından geldiği gibi kalır).
- Kimlik doğrulama MVP'de var — ilerleme ve kaydedilen haberler kullanıcıya bağlı.
- Veri toplama request path'inden ayrı bir süreçte; harici bir kaynak çökse bile
  panel render'ı etkilenmez.
- UI yalnız kendi veritabanımızdan okur, harici API'yi doğrudan çağırmaz.

## Kapsam sınırları

| Aşama | Kapsam | Durum |
|---|---|---|
| **Faz 1** | Memory bank, stack, mimari, **mock veriyle** dashboard UI | ✅ Tamamlandı (2026-08-05) |
| **Faz 2A** | Postgres, Drizzle şeması + migration, seed, servis katmanı; haber ve akademi verisi DB'den | ✅ Tamamlandı (2026-08-05) |
| **Faz 2B** | RSS çekimi, sembol eşleştirme, worker/cron | ✅ Tamamlandı (2026-08-05) |
| **Faz 2C** | Reddit ingestion + duyarlılık skorlama | ⏸ Sırada — **Reddit API anahtarı gerekiyor** |
| **Faz 2D** | YouTube Data API, adım–video eşleştirme | ⏸ Sırada — **YouTube API anahtarı gerekiyor** |
| **Faz 2E** | Auth.js v5 + Google OAuth, gerçek kullanıcı ilerlemesi | ⏸ Sırada — **Google OAuth client id/secret gerekiyor** |
| **Faz 2F** | Piyasa verisi (sparkline'lar ve ticker şeridi) | ⏸ Sırada — sağlayıcı seçilmedi, çoğu anahtar ister |

> **Kalan dört dilim kullanıcıdan kimlik bilgisi bekliyor.** 2B anahtarsız
> bitirilebildi çünkü RSS herkese açık; 2C/2D/2E kayıt açıp anahtar üretmeyi
> gerektiriyor ve bunu ancak hesabın sahibi yapabilir.

**Kapsam dışı (şimdilik):** deployment hedefi, i18n katmanı, mobil uygulama,
portföy/işlem takibi, gerçek para hareketi, yatırım tavsiyesi üreten hiçbir şey.

## Faz sıralamasının gerekçesi

Tasarım dili ve veri sözleşmesi, API'lere bağlanmadan önce sabitlendi. Aksi
halde bileşenler harici veri şekline esir olurdu. `src/types/` tek sözleşmedir;
Faz 1'de `src/mocks/`, Faz 2'de `src/server/services/` onu doldurur — entegrasyon
eklendiğinde tek bir bileşen bile değişmez.

## Kullanıcının açık talimatı

Her fazın sonunda **durulur ve onay istenir**. Kapsamı kendiliğinden genişletmek
doğrudan talimata aykırıdır.

İlgili: `productContext.md` (neden), `systemPatterns.md` (nasıl),
`techContext.md` (neyle), `decisionLog.md` (hangi gerekçeyle).
