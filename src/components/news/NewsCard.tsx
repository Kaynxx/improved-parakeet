import Link from "next/link";
import { SourceBadge } from "@/components/news/SourceBadge";
import { timeAgo } from "@/lib/utils/format";
import type { Article } from "@/types";

interface NewsCardProps {
  article: Article;
  /** Liste sayfasında özet de gösterilir; panelde yer yok. */
  showSummary?: boolean;
}

/** Üstbilgi ayraçları için — nokta karakterini her yerde tekrar yazmamak adına. */
function Dot() {
  return (
    <span className="text-rule-strong" aria-hidden="true">
      ·
    </span>
  );
}

export function NewsCard({ article, showSummary = false }: NewsCardProps) {
  return (
    <article className="group/card relative -mx-2 rounded-[var(--radius-inner)] px-2 py-3.5 transition-colors duration-200 first:pt-1 hover:bg-sunken/70">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-faint">
        {article.isBreaking ? (
          <span className="label rounded-[var(--radius-chip)] bg-accent-soft px-1.5 py-1 text-accent">
            Son dakika
          </span>
        ) : null}
        <SourceBadge source={article.source} />
        <Dot />
        <time className="meta" dateTime={article.publishedAt}>
          {timeAgo(article.publishedAt)}
        </time>
        {/* Okuma süresi yalnız gerçek gövde varken. Kaynakların çoğu RSS'te
            teaser veriyor; olmayan gövdeden süre uydurulmaz. */}
        {article.contentText ? (
          <>
            <Dot />
            <span className="meta">{article.readingTimeMin} dk okuma</span>
          </>
        ) : null}
      </div>

      <h3 className="mt-2 text-[16px] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
        {/* Kartın tamamı tıklanabilir; odak halkası başlıkta belirir. */}
        <Link
          href={{ pathname: `/haberler/${article.slug}` }}
          className="after:absolute after:inset-0 after:content-[''] group-hover/card:text-accent"
        >
          {article.title}
        </Link>
      </h3>

      {showSummary ? (
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-ink-muted">
          {article.summary}
        </p>
      ) : null}

      {article.tickers.length > 0 ? (
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {article.tickers.map((ticker) => (
            <li
              key={ticker.symbol}
              className="meta rounded-[var(--radius-chip)] bg-sunken px-1.5 py-0.5 font-medium text-ink-muted"
            >
              {ticker.symbol}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
