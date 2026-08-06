/**
 * Makale metnini sembollerle eşleştirir.
 *
 * Kural: **çıplak sembol aranmaz.** GOLD, META, ON, ALL, IT gibi semboller
 * normal İngilizce kelimelerle çakışıyor; "gold prices" cümlesi XAU'ya
 * bağlanabilir ama "ON Semiconductor" niyeti olmayan her "on" kelimesi de
 * eşleşirdi. Onun yerine iki güvenilir sinyal kullanılıyor:
 *
 *   1. `$NVDA` biçimindeki cash-tag — piyasa yazısında niyeti açık.
 *   2. Şirket/varlık adı — "Nvidia", "Bitcoin", "S&P 500".
 */

import type { Ticker } from "@/types";

/** Regex'te anlamı olan karakterler ("S&P 500", "EUR/USD", "Apple Inc."). */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** "NVIDIA Corp." → "nvidia" · "Apple Inc." → "apple" */
function stripCorporateSuffix(name: string): string {
  return name
    .replace(/\b(corp|corporation|inc|incorporated|ltd|limited|plc|co|sa|nv|ag)\b\.?/gi, "")
    .replace(/\s+/g, " ")
    .replace(/[,.]$/, "")
    .trim();
}

/**
 * Saklanan adın basında kullanılan adı vermediği durumlar. Elle bakılan tek
 * yer burası — yeni sembol eklenince gözden geçirilmeli.
 */
const EXTRA_ALIASES: Record<string, string[]> = {
  XAU: ["gold", "altın"],
  EURUSD: ["eurusd", "eur/usd", "euro-dollar"],
  SPX: ["s&p 500", "s&p500", "sp 500"],
  NDX: ["nasdaq 100", "nasdaq-100"],
  BTC: ["bitcoin"],
  ETH: ["ethereum", "ether"],
};

/**
 * Takma adın kelime olarak geçtiği ama varlığı kastetmediği deyimler.
 * Eşleştirmeden ÖNCE metinden çıkarılır.
 *
 * Gerçek örnek: "Bitcoin's Real Gold Standard Test is Just Starting" başlığı
 * XAU'ya bağlanmıştı — "gold standard" bir deyim, metal değil.
 */
const IDIOMS = /\b(gold(en)?\s+(standard|rush|medal|age|goose|parachute)|golden)\b/gi;

interface Matcher {
  symbol: string;
  pattern: RegExp;
}

/**
 * Eşleştiricileri bir kez kurar. Her makale için regex derlemek, 8 kaynak ×
 * 30 kayıt × 10 sembolde gereksiz iş demek.
 */
export function buildMatchers(tickers: Ticker[]): Matcher[] {
  return tickers.map((ticker) => {
    const aliases = new Set<string>();

    const plain = stripCorporateSuffix(ticker.name).toLowerCase();
    // Tek harflik veya boş adlar eşleştirilmez — gürültüden başka bir şey vermez.
    if (plain.length >= 3) aliases.add(plain);

    for (const alias of EXTRA_ALIASES[ticker.symbol] ?? []) aliases.add(alias.toLowerCase());

    const aliasPattern = [...aliases].map(escapeRegex).join("|");
    const cashTag = `\\$${escapeRegex(ticker.symbol)}`;

    // Kelime sınırı yerine "harf/rakam olmayan veya metin sonu" — "S&P 500" ve
    // "EUR/USD" gibi adlar \b ile doğru sınırlanmıyor.
    const body = aliasPattern ? `${cashTag}|${aliasPattern}` : cashTag;

    return {
      symbol: ticker.symbol,
      pattern: new RegExp(`(?<![a-z0-9])(?:${body})(?![a-z0-9])`, "i"),
    };
  });
}

/** Makalede geçen sembollerin listesi. Sıra girdi sırasını korur. */
export function matchTickers(matchers: Matcher[], ...texts: (string | null)[]): string[] {
  const haystack = texts.filter(Boolean).join(" \n ").replace(IDIOMS, " ");
  if (haystack.trim().length === 0) return [];

  return matchers.filter((matcher) => matcher.pattern.test(haystack)).map((m) => m.symbol);
}
