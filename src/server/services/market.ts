/**
 * Piyasa verisi servisi — kaynak: **Postgres** (2F).
 *
 * Çekim request path'inde değil: worker `market_quotes` ve `market_daily`
 * tablolarını dolduruyor, bu katman yalnız okuyor. Sayfa açılışında
 * sağlayıcıya gidilseydi kota sayfa görüntülemeye bağlanır ve sağlayıcının
 * yavaşlığı panele yansırdı.
 *
 * Tablo boşken boş dizi döner — worker hiç çalışmadıysa doğru olan bu; panel
 * "henüz veri yok" durumunu gösterir, sahte fiyat uydurmaz.
 */

import { findHistoryDepth, findMarketQuotes } from "@/lib/db/queries/market";
import type { MarketQuote } from "@/types";

export function getMarketOverview(): Promise<MarketQuote[]> {
  return findMarketQuotes();
}

/**
 * Sparkline'da kaç günlük seri birikti.
 *
 * Arayüz pencereyi sabit "son 30 gün" diye yazamaz: seri worker çalıştıkça
 * uzuyor ve ilk günlerde iki noktalık bir çizgiye "30 gün" demek yanlış olur.
 */
export function getHistoryDepth(): Promise<number> {
  return findHistoryDepth();
}
