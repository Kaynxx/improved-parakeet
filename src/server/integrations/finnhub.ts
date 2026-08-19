/**
 * Finnhub çekimi — piyasa verisinin tek dış kapısı (2F).
 *
 * **Ücretsiz katmanın sınırları ölçülerek bulundu, varsayılmadı:**
 *   - `/quote` çalışıyor; hisse/ETF **ve** kripto sembolleri için.
 *   - `/stock/candle`, `/crypto/candle`, `/forex/candle` ve `/forex/rates`
 *     **403** dönüyor. Yani hazır geçmiş seri yok; sparkline'ı worker'ın
 *     biriktirdiği günlük kapanışlar besliyor (`market_daily`).
 *   - Forex tamamen kapalı: `OANDA:EUR_USD` de 403. EUR/USD bu yüzden ETF
 *     vekiliyle (`FXE`) izleniyor.
 *
 * Endeks değerleri (SPX, NDX) lisanslı veri olduğu için onlar da ETF vekili
 * (SPY, QQQ); altın da öyle (GLD). Vekil olmak `proxyFor` ile taşınıyor ve
 * arayüzde gizlenmiyor — kart "S&P 500" deyip 773 gösterirse yalan söyler.
 */

import type { AssetType } from "@/types";

const TABAN = "https://finnhub.io/api/v1";

export interface IzlenenVarlik {
  /** Panelde ve veritabanında kullanılan sembol. */
  symbol: string;
  name: string;
  assetType: AssetType;
  /** Finnhub'a gönderilen ham sembol. */
  providerSymbol: string;
  /** Vekil ise neyin yerine durduğu. */
  proxyFor: string | null;
}

/**
 * İzlenen küme. **Kod içinde sabit** — beş varlık elle seçildi, kullanıcı
 * arayüzünden değiştirilmiyor ve bir tabloya taşımak yönetilecek yeni bir
 * yüzey açardı.
 */
export const IZLENEN_VARLIKLAR: IzlenenVarlik[] = [
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    assetType: "index",
    providerSymbol: "SPY",
    proxyFor: "S&P 500",
  },
  {
    symbol: "QQQ",
    name: "Nasdaq 100 ETF",
    assetType: "index",
    providerSymbol: "QQQ",
    proxyFor: "Nasdaq 100",
  },
  {
    symbol: "GLD",
    name: "Altın ETF",
    assetType: "commodity",
    providerSymbol: "GLD",
    proxyFor: "Altın (ons)",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    assetType: "crypto",
    providerSymbol: "BINANCE:BTCUSDT",
    proxyFor: null,
  },
  {
    /**
     * `fx` değil `equity`: bu satır FXE'yi anlatıyor ve FXE bir hisse senedi
     * ETF'i — fiyatı ~106 dolar, EUR/USD kuru değil. `fx` işaretlenince
     * `priceDigits` dört ondalık basıp "106,5100" gibi kur görüntüsü üretiyordu.
     * Neyin izlendiği `proxyFor` ile taşınıyor.
     */
    symbol: "FXE",
    name: "Euro ETF",
    assetType: "equity",
    providerSymbol: "FXE",
    proxyFor: "EUR/USD",
  },
];

export interface CekilenFiyat {
  varlik: IzlenenVarlik;
  price: number;
  change: number;
  changePercent: number;
}

/** Finnhub `/quote` cevabı — yalnız kullandığımız alanlar. */
interface QuoteCevabi {
  /** current */
  c: number;
  /** change */
  d: number | null;
  /** percent change */
  dp: number | null;
}

function anahtar(): string {
  const deger = process.env.FINNHUB_API_KEY;
  if (!deger) {
    throw new Error(
      [
        "FINNHUB_API_KEY tanımlı değil; piyasa verisi çekilemez.",
        "",
        "  1. https://finnhub.io/register adresinden ücretsiz anahtar al",
        "  2. .env.local dosyasına ekle:  FINNHUB_API_KEY=...",
      ].join("\n"),
    );
  }
  return deger;
}

/**
 * Tek varlığın anlık fiyatı.
 *
 * Hata **yutulmuyor**: hangi sembolün neden alınamadığı çağırana bildiriliyor.
 * Sessizce `null` dönmek, panelde eksik kartın nedenini görünmez yapardı.
 */
async function fiyatCek(varlik: IzlenenVarlik, token: string): Promise<CekilenFiyat> {
  const url = `${TABAN}/quote?symbol=${encodeURIComponent(varlik.providerSymbol)}&token=${token}`;

  const cevap = await fetch(url);

  if (!cevap.ok) {
    // 429 kota, 403 katman dışı — ikisi de farklı eylem gerektiriyor, ayırt edilebilir kalsın.
    throw new Error(
      `${varlik.symbol} (${varlik.providerSymbol}): Finnhub HTTP ${cevap.status} — ${await cevap.text()}`,
    );
  }

  const veri = (await cevap.json()) as QuoteCevabi;

  /**
   * Finnhub bilinmeyen sembole 200 + sıfırlarla cevap veriyor. Sıfır fiyat
   * gerçek bir fiyat değil; sessizce kaydedilirse panelde "0,00" diye
   * görünür ve kimse bunun bir hata olduğunu anlamaz.
   */
  if (typeof veri.c !== "number" || veri.c === 0) {
    throw new Error(
      `${varlik.symbol} (${varlik.providerSymbol}): fiyat 0 veya eksik döndü — sembol tanınmıyor olabilir.`,
    );
  }

  return {
    varlik,
    price: veri.c,
    // `d`/`dp` piyasa kapalıyken null gelebiliyor; yön göstergesi 0 kabul eder.
    change: veri.d ?? 0,
    changePercent: veri.dp ?? 0,
  };
}

export interface CekimSonucu {
  basarili: CekilenFiyat[];
  hatalar: { symbol: string; hata: string }[];
}

/**
 * Bütün izlenen varlıkların fiyatı.
 *
 * **Sıralı çekiliyor, paralel değil:** ücretsiz katmanda dakika başına istek
 * sınırı var ve beş sembol için paralellik kazandırmıyor.
 *
 * Bir sembolün hatası diğerlerini düşürmüyor — kısmi sonuç, hiç sonuç yoktan
 * iyi. Hangilerinin düştüğü `hatalar` içinde çağırana taşınıyor.
 */
export async function fiyatlariCek(): Promise<CekimSonucu> {
  const token = anahtar();
  const basarili: CekilenFiyat[] = [];
  const hatalar: { symbol: string; hata: string }[] = [];

  for (const varlik of IZLENEN_VARLIKLAR) {
    try {
      basarili.push(await fiyatCek(varlik, token));
    } catch (hata) {
      hatalar.push({ symbol: varlik.symbol, hata: (hata as Error).message });
    }
  }

  return { basarili, hatalar };
}
