/**
 * Piyasa verisi servisi — kaynak: **mock** (Faz 2F'de gerçek veriye geçer).
 *
 * Piyasa verisi orijinal Faz 2 kapsamında hiç yoktu; 2F olarak ayrı bir dilim
 * açıldı. Gerçek zamanlı fiyat, diğer modüllerden farklı bir problem: ücretsiz
 * API'ler gecikmeli veya kotalı ve saniyelik yenileme worker/cron modeline
 * oturmuyor. Sağlayıcı seçimi 2F'de tartışılacak.
 */

import { marketQuotes } from "@/mocks";
import type { MarketQuote } from "@/types";

export async function getMarketOverview(): Promise<MarketQuote[]> {
  return marketQuotes;
}
