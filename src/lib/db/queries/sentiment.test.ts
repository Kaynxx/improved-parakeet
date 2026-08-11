import assert from "node:assert/strict";
import test from "node:test";
import { getTableConfig } from "drizzle-orm/pg-core";
import { communities, communityPosts, postTickers, sentimentLabel } from "@/lib/db/schema";
import {
  type ActiveSentimentPost,
  buildSentimentSummary,
  buildTickerSentiments,
  postedAtFromOffset,
} from "./sentiment.logic";
import { findRecentPosts, findTrendingTickers } from "./sentiment";

const btc = { symbol: "BTC", name: "Bitcoin", assetType: "crypto" as const };
const nvda = { symbol: "NVDA", name: "NVIDIA Corp.", assetType: "equity" as const };
const eth = { symbol: "ETH", name: "Ethereum", assetType: "crypto" as const };

test("Faz 2C şeması enum, kolon ve index sözleşmesini taşır", () => {
  assert.deepEqual(sentimentLabel.enumValues, ["bullish", "bearish", "neutral"]);

  const communityConfig = getTableConfig(communities);
  assert.equal(
    communityConfig.columns.find((column) => column.name === "platform")?.default,
    "reddit",
  );
  assert.equal(communityConfig.columns.find((column) => column.name === "name")?.isUnique, true);

  const postConfig = getTableConfig(communityPosts);
  assert.ok(
    postConfig.indexes.some((item) => item.config.name === "community_posts_community_id_idx"),
  );
  assert.ok(
    postConfig.indexes.some((item) => item.config.name === "community_posts_sentiment_label_idx"),
  );

  const bridgeConfig = getTableConfig(postTickers);
  assert.equal(bridgeConfig.primaryKeys.length, 1);
  assert.ok(bridgeConfig.indexes.some((item) => item.config.name === "post_tickers_ticker_id_idx"));
});

test("postedAt tek referans zamandan ofset kadar geriye gider", () => {
  assert.equal(postedAtFromOffset(1_800_000, 10), new Date(1_200_000).toISOString());
});

test("boş kayıt kümesi nötr ve sıfır özet döndürür", () => {
  assert.deepEqual(buildSentimentSummary([]), {
    score: 0,
    label: "neutral",
    postCount: 0,
    bullishCount: 0,
    bearishCount: 0,
    neutralCount: 0,
    windowHours: 24,
  });
});

test("özet sayımları, ortalamayı ve ±0.05 etiket eşiğini hesaplar", () => {
  const rows: ActiveSentimentPost[] = [
    {
      id: "1",
      minutesAgoOffset: 1,
      sentimentLabel: "bullish",
      sentimentScore: 0.4,
      tickers: [],
    },
    {
      id: "2",
      minutesAgoOffset: 2,
      sentimentLabel: "bearish",
      sentimentScore: -0.2,
      tickers: [],
    },
    {
      id: "3",
      minutesAgoOffset: 3,
      sentimentLabel: "neutral",
      sentimentScore: -0.05,
      tickers: [],
    },
  ];

  assert.deepEqual(buildSentimentSummary(rows), {
    score: 0.05,
    label: "neutral",
    postCount: 3,
    bullishCount: 1,
    bearishCount: 1,
    neutralCount: 1,
    windowHours: 24,
  });
});

test("ticker trendi mentionları iki dönemde sayar ve eşitliği sembolle çözer", () => {
  const rows: ActiveSentimentPost[] = [
    {
      id: "1",
      minutesAgoOffset: 10,
      sentimentLabel: "bullish",
      sentimentScore: 0.6,
      tickers: [btc],
    },
    {
      id: "2",
      minutesAgoOffset: 20,
      sentimentLabel: "bearish",
      sentimentScore: -0.4,
      tickers: [nvda],
    },
    {
      id: "3",
      minutesAgoOffset: 30,
      sentimentLabel: "bearish",
      sentimentScore: -0.6,
      tickers: [btc],
    },
    {
      id: "4",
      minutesAgoOffset: 40,
      sentimentLabel: "neutral",
      sentimentScore: 0,
      tickers: [eth],
    },
  ];

  const result = buildTickerSentiments(rows, 3);

  assert.deepEqual(
    result.map((item) => item.ticker.symbol),
    ["BTC", "ETH", "NVDA"],
  );
  assert.deepEqual(
    result.map((item) => item.mentionChangePercent),
    [0, -100, 100],
  );
  assert.deepEqual(result[0], {
    ticker: btc,
    mentionCount: 2,
    bullishCount: 1,
    bearishCount: 1,
    avgScore: 0,
    mentionChangePercent: 0,
  });
});

test("sıfır limit gönderi sorgusunda veritabanına bağlanmadan boş döner", async () => {
  assert.deepEqual(await findRecentPosts(0), []);
});

test("sıfır limit trend sorgusunda veritabanına bağlanmadan boş döner", async () => {
  assert.deepEqual(await findTrendingTickers(0), []);
});
