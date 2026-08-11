# Faz 2F — Gerçek piyasa verisi

> Tarih: 2026-08-11 · Dal: `faz2bc-akademi-mufredat`

## Kapsam düzeltmesi

Fazın amaç cümlesi "üst ticker ve piyasa kartlarındaki mock fiyatlar" diyor.
**Üst ticker'da fiyat yok.** `TickerItem` `{ id, label, headline, isBreaking }`
taşıyor ve `getTickerItems` son makalelerden türetiliyor — yani zaten Postgres'ten
gelen gerçek veri. Bu fazın tek tüketicisi dashboard kökündeki `MarketOverview`
ve tek veri kapısı `getMarketOverview()`.

## Kararlar

| Konu | Karar |
|---|---|
| Sağlayıcı | **Finnhub**, ücretsiz katman |
| Endeks/emtia | **ETF vekili** — gerçek endeks değeri lisanslı |
| Sparkline | **30 gün, günlük kapanış** |
| Çekim modeli | **Worker + Postgres**, sayfa DB'den okur |

### Sembol kümesi

| Bugünkü mock | Yeni | Sınıf |
|---|---|---|
| SPX | `SPY` | US ETF |
| NDX | `QQQ` | US ETF |
| XAU | `GLD` | US ETF |
| BTC | BTC/USD | kripto |
| EURUSD | EUR/USD | forex |

Beş sembolün dört varlık sınıfına yayılması tek ücretsiz sağlayıcıyla kapsamayı
zorlaştırıyordu; asıl tıkanma altındı. Twelve Data XAU/USD'yi emtia sayıp
Basic'ten dışlıyor. ETF vekili ilkesi altına da uygulanınca (`GLD`) küme
"US ETF + forex + kripto"ya iniyor — ücretsiz katmanların rahat kapsadığı üçlü.

### Neden Finnhub

Alpha Vantage'ın 25 istek/gün kotası 15 dakikalık worker'ın günde 96 turuna
matematiksel olarak yetmiyor (5 sembol × 96 = 480 çağrı).

Twelve Data'nın kotası yeterli (800/gün) ama iki sorunu var: `time_series` ve
`quote`'u birlikte çekmek 960 çağrı yapıp sınırı aşıyor, yani tasarımı baştan
kısıtlıyor; ve lisans dili "internal non-display usage" — veriyi ekranda
göstermeyi kapsamayabilir, oysa bu uygulama tam olarak gösteriyor.

Finnhub'ın ücretsiz katmanı "kişisel, ticari olmayan kullanım" diyor; tek
kullanıcılı, localhost'ta çalışan kişisel bir panel bu tanıma birebir oturuyor.

### Neden 30 günlük seri, 24 saatlik değil

Günlük kapanış serisi ücretsiz katmanlarda en garanti veri. Intraday mum
erişimi kısıtlı ve ETF'ler yalnız seans saatlerinde dolduğu için 24 saatlik
seri hafta sonu ve gece boyunca düz çizgi gösterirdi.

**Bedeli kabul edildi:** kart üzerindeki `change`/`changePercent` günlük
değişimi, sparkline ise 30 günü anlatıyor — iki farklı zaman ölçeği. Arayüzde
sparkline'ın penceresi yazılmalı, yoksa kullanıcı çizgiyi günlük sanır.

## Ölçüm sonuçları (2026-08-11)

Varsayım yerine yoklama betiğiyle **ölçüldü**. Sonuçlar tasarımı iki yerde
değiştirdi:

| Uç | Sonuç |
|---|---|
| `/quote` — SPY, QQQ, GLD | ✓ 200, gerçek fiyat/değişim/yüzde |
| `/quote` — `BINANCE:BTCUSDT` | ✓ 200 — **belgelenmemiş**, kripto için de çalışıyor |
| `/quote` — `FXE` | ✓ 200 |
| `/quote` — `OANDA:EUR_USD` | ✗ 403 |
| `/stock/candle`, `/crypto/candle`, `/forex/candle` | ✗ 403 |
| `/forex/rates` | ✗ 403 |

**Değişiklik 1 — sparkline'ın kaynağı.** Ücretsiz katmanda hiçbir geçmiş serisi
yok. "30 günlük kapanış serisini sağlayıcıdan çekeriz" planı geçersiz; geçmişi
**worker biriktiriyor**. `market_daily` gün başına tek satır tutuyor, gün içinde
kapanış son görülen fiyat demek. Seri baştan boş başlıyor ve 30 günde doluyor;
kart iki noktaya ulaşana kadar "Geçmiş birikiyor" yazıyor.

**Değişiklik 2 — EUR/USD de vekile düştü.** Forex tamamen kapalı, `/quote` bile.
EUR/USD `FXE` (Invesco CurrencyShares Euro Trust) ile izleniyor.

## Kurulan yapı

```
src/server/integrations/finnhub.ts   Dış dünya: IZLENEN_VARLIKLAR + fiyatlariCek()
src/lib/db/schema.ts                 market_quotes + market_daily
drizzle/0006_market_quotes.sql       elle yazıldı (aşağıdaki nota bakın)
src/lib/db/queries/market.ts         upsertMarketQuotes(), findMarketQuotes()
src/server/services/market.ts        mock importu kalktı, DB'den okuyor
scripts/worker.ts                    piyasa turu ayrı try içinde eklendi
```

Dizi kolonu yerine ayrı `market_daily` tablosu seçildi: gün başına tek satır
hem upsert'i doğal kılıyor hem de 5 sembol × 30 gün = 150 satırla kalıyor.

### Migration neden elle yazıldı

`drizzle-kit generate` çalışmıyor: `drizzle/meta/` zinciri 0004'te kopmuş.
`0004_snapshot.json` hiç üretilmemiş, `0005_snapshot.json` ise yeniden
adlandırma öncesi `tracks`/`steps` durumunu anlatıyor. Generator bu yüzden
"tracks silindi mi, weeks'e mi dönüştü?" diye interaktif soru soruyor ve
TTY olmayan kabukta çöküyor. 0004 ve 0005 de aynı nedenle elle yazılmıştı.

**Bu bir teknik borç ve 2F'ye ait değil** — Faz 2C'nin migration üretimini de
aynı şekilde engelliyor. Ayrı bir işte snapshot zincirinin onarılması gerekiyor.

## Bilinen sınırlar

- Vekil fiyat ölçekleri farklı: kart "S&P 500" değil "S&P 500 ETF · S&P 500
  yerine" yazıyor. Gizlenirse kart yalan söyler.
- `FXE` şemada `equity`: fiyatı ETF fiyatı, kur değil. `fx` işaretlenince
  `priceDigits` dört ondalık basıp "106,5100" gibi kur görüntüsü üretiyordu.
  `assetType` ayrıca `TodayBrief`'in manşet varlığı seçiminde kullanılıyor, o
  yüzden SPY/QQQ `index` kaldı.
- Sparkline penceresi sabit değil: kart "son N gün" diyor, N biriken seri.

## Tamamlanma ölçütü

`market.ts` mock import etmiyor; kartlar seçilmiş kapsamda gerçek ve zaman
damgalı veri gösteriyor; kota aşımı veya sağlayıcı hatası paneli bozmuyor, son
bilinen veri gösteriliyor; vekil semboller arayüzde vekil olduğu belli olacak
şekilde adlandırılıyor.
