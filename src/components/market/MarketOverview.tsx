import { BentoCard } from "@/components/common/BentoCard";
import { MarketTile } from "@/components/market/MarketTile";
import { timeAgo } from "@/lib/utils/format";
import type { MarketQuote } from "@/types";

export function MarketOverview({ quotes }: { quotes: MarketQuote[] }) {
  const latest = quotes.reduce<string | null>(
    (acc, q) => (acc === null || q.updatedAt > acc ? q.updatedAt : acc),
    null,
  );

  return (
    <BentoCard
      title="İzlenen varlıklar"
      action={latest ? <span className="meta text-ink-faint">{timeAgo(latest)}</span> : null}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quotes.map((quote) => (
          <MarketTile key={quote.symbol} quote={quote} />
        ))}
      </div>
    </BentoCard>
  );
}
