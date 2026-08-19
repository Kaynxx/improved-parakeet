import type { SentimentLabel, SentimentSummary, Ticker, TickerSentiment } from "@/types";

const WINDOW_HOURS = 24;

export interface ActiveSentimentPost {
  id: string;
  minutesAgoOffset: number;
  sentimentLabel: SentimentLabel;
  sentimentScore: number;
  tickers: Ticker[];
}

interface TickerAccumulator {
  ticker: Ticker;
  mentionCount: number;
  bullishCount: number;
  bearishCount: number;
  scoreTotal: number;
  recentMentionCount: number;
  previousMentionCount: number;
}

function round(value: number, decimalPlaces: number): number {
  const factor = 10 ** decimalPlaces;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function labelFromScore(score: number): SentimentLabel {
  if (score > 0.05) return "bullish";
  if (score < -0.05) return "bearish";
  return "neutral";
}

export function postedAtFromOffset(now: number, minutesAgoOffset: number): string {
  return new Date(now - minutesAgoOffset * 60_000).toISOString();
}

export function buildSentimentSummary(rows: ActiveSentimentPost[]): SentimentSummary {
  let bullishCount = 0;
  let bearishCount = 0;
  let neutralCount = 0;
  let scoreTotal = 0;

  for (const row of rows) {
    scoreTotal += row.sentimentScore;
    if (row.sentimentLabel === "bullish") bullishCount += 1;
    else if (row.sentimentLabel === "bearish") bearishCount += 1;
    else neutralCount += 1;
  }

  const score = rows.length > 0 ? round(scoreTotal / rows.length, 4) : 0;

  return {
    score,
    label: labelFromScore(score),
    postCount: rows.length,
    bullishCount,
    bearishCount,
    neutralCount,
    windowHours: WINDOW_HOURS,
  };
}

export function buildTickerSentiments(
  rows: ActiveSentimentPost[],
  limit: number,
): TickerSentiment[] {
  if (limit <= 0) return [];

  const orderedRows = [...rows].sort(
    (left, right) =>
      left.minutesAgoOffset - right.minutesAgoOffset || left.id.localeCompare(right.id, "en"),
  );
  const recentBoundary = Math.ceil(orderedRows.length / 2);
  const accumulators = new Map<string, TickerAccumulator>();

  for (const [rowIndex, row] of orderedRows.entries()) {
    for (const ticker of row.tickers) {
      const accumulator = accumulators.get(ticker.symbol) ?? {
        ticker,
        mentionCount: 0,
        bullishCount: 0,
        bearishCount: 0,
        scoreTotal: 0,
        recentMentionCount: 0,
        previousMentionCount: 0,
      };

      accumulator.mentionCount += 1;
      accumulator.scoreTotal += row.sentimentScore;
      if (row.sentimentLabel === "bullish") accumulator.bullishCount += 1;
      if (row.sentimentLabel === "bearish") accumulator.bearishCount += 1;
      if (rowIndex < recentBoundary) accumulator.recentMentionCount += 1;
      else accumulator.previousMentionCount += 1;

      accumulators.set(ticker.symbol, accumulator);
    }
  }

  return [...accumulators.values()]
    .map((item): TickerSentiment => {
      const mentionChangePercent =
        item.previousMentionCount === 0
          ? item.recentMentionCount > 0
            ? 100
            : 0
          : round(
              ((item.recentMentionCount - item.previousMentionCount) / item.previousMentionCount) *
                100,
              1,
            );

      return {
        ticker: item.ticker,
        mentionCount: item.mentionCount,
        bullishCount: item.bullishCount,
        bearishCount: item.bearishCount,
        avgScore: round(item.scoreTotal / item.mentionCount, 4),
        mentionChangePercent,
      };
    })
    .sort(
      (left, right) =>
        right.mentionCount - left.mentionCount ||
        left.ticker.symbol.localeCompare(right.ticker.symbol, "en"),
    )
    .slice(0, limit);
}
