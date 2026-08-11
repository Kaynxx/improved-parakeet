import assert from "node:assert/strict";
import test from "node:test";
import { getTableConfig } from "drizzle-orm/pg-core";
import {
  communities,
  communityPosts,
  postTickers,
  sentimentLabel,
} from "@/lib/db/schema";

test("Faz 2C şeması enum, kolon ve index sözleşmesini taşır", () => {
  assert.deepEqual(sentimentLabel.enumValues, ["bullish", "bearish", "neutral"]);

  const communityConfig = getTableConfig(communities);
  assert.equal(
    communityConfig.columns.find((column) => column.name === "platform")?.default,
    "reddit",
  );
  assert.equal(
    communityConfig.columns.find((column) => column.name === "name")?.isUnique,
    true,
  );

  const postConfig = getTableConfig(communityPosts);
  assert.ok(
    postConfig.indexes.some((item) => item.config.name === "community_posts_community_id_idx"),
  );
  assert.ok(
    postConfig.indexes.some(
      (item) => item.config.name === "community_posts_sentiment_label_idx",
    ),
  );

  const bridgeConfig = getTableConfig(postTickers);
  assert.equal(bridgeConfig.primaryKeys.length, 1);
  assert.ok(
    bridgeConfig.indexes.some((item) => item.config.name === "post_tickers_ticker_id_idx"),
  );
});
