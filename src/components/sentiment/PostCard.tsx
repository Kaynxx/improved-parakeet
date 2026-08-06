import { ArrowBigUp, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCompact, timeAgo } from "@/lib/utils/format";
import type { SentimentLabel, SentimentPost } from "@/types";

const SENTIMENT_TR: Record<SentimentLabel, string> = {
  bullish: "Boğa",
  bearish: "Ayı",
  neutral: "Nötr",
};

const SENTIMENT_STYLE: Record<SentimentLabel, string> = {
  bullish: "bg-up-soft text-up",
  bearish: "bg-down-soft text-down",
  neutral: "bg-sunken text-ink-muted",
};

export function PostCard({ post, showBody = false }: { post: SentimentPost; showBody?: boolean }) {
  return (
    <article className="py-3.5 first:pt-1">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="meta font-medium text-ink-muted">{post.community.name}</span>
        <span className="text-rule-strong" aria-hidden="true">
          ·
        </span>
        <time className="meta text-ink-faint" dateTime={post.postedAt}>
          {timeAgo(post.postedAt)}
        </time>
        {post.flair ? (
          <span className="rounded-[var(--radius-chip)] bg-sunken px-1.5 py-0.5 text-[11px] text-ink-faint">
            {post.flair}
          </span>
        ) : null}
        {/* Duyarlılık her zaman metinle yazılır — renk tek başına taşımaz. */}
        <span
          className={cn(
            "ml-auto rounded-[var(--radius-chip)] px-2 py-0.5 text-[11px] font-semibold",
            SENTIMENT_STYLE[post.sentiment.label],
          )}
        >
          {SENTIMENT_TR[post.sentiment.label]}
        </span>
      </div>

      <h3 className="mt-2 text-[15.5px] leading-[1.35] font-semibold tracking-[-0.01em] text-ink">
        {post.title}
      </h3>

      {showBody ? (
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{post.bodyText}</p>
      ) : null}

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
        <span className="meta flex items-center gap-1 text-ink-faint">
          <ArrowBigUp className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          {formatCompact(post.score)}
          <span className="sr-only">oy</span>
        </span>
        <span className="meta flex items-center gap-1 text-ink-faint">
          <MessageSquare className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          {formatCompact(post.commentCount)}
          <span className="sr-only">yorum</span>
        </span>
        {post.tickers.map((ticker) => (
          <span
            key={ticker.symbol}
            className="meta rounded-[var(--radius-chip)] bg-sunken px-1.5 py-0.5 font-medium text-ink-muted"
          >
            {ticker.symbol}
          </span>
        ))}
      </div>
    </article>
  );
}
