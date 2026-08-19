import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/common/Button";
import { SourceBadge } from "@/components/news/SourceBadge";
import { cn } from "@/lib/utils/cn";
import { timeAgo } from "@/lib/utils/format";
import type { Article } from "@/types";

/**
 * Okuma görünümü. Başlık ve gövde Geist Sans, kaynak/zaman bilgisi Geist Mono:
 * anlatı ve makine sesi aynı uzun okumada da birbirinden ayrılır.
 *
 * **Gövde çoğu zaman yok.** RSS teaser verir; gövdeyi yayıncının sayfasından
 * çıkarıp saklamak kaynakların kullanım şartlarıyla çelişiyor, o yüzden
 * yapılmıyor. Bu sayfanın işi gövdeyi taklit etmek değil: haberi bağlamıyla
 * sunmak ve okuru yayıncıya göndermek.
 */
export function ArticleReader({ article }: { article: Article }) {
  const paragraphs = article.contentText?.split("\n\n").filter((p) => p.trim().length > 0) ?? [];
  const hasBody = paragraphs.length > 0;

  return (
    <div className="mx-auto w-full max-w-[70ch]">
      <Link
        href="/haberler"
        className="press inline-flex items-center gap-1.5 text-copy font-medium text-ink-muted hover:text-accent"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
        Haberlere dön
      </Link>

      <article className="glass mt-4 px-6 py-7 sm:px-10 sm:py-9">
        <header>
          {article.isBreaking ? (
            <span className="label mb-4 inline-block rounded-[var(--radius-inner)] bg-elevated px-2 py-1 text-accent">
              Son dakika
            </span>
          ) : null}
          {/* Manşet: büyüdükçe harf aralığı sıkışır. */}
          <h1 className="text-display leading-[1.12] font-semibold tracking-[-0.032em] text-balance text-ink">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-hairline pt-4 text-sm text-ink-faint">
            <SourceBadge source={article.source} />
            {article.author ? (
              <>
                <span className="text-hairline-strong" aria-hidden="true">
                  ·
                </span>
                <span className="text-sm text-ink-muted">{article.author}</span>
              </>
            ) : null}
            <span className="text-hairline-strong" aria-hidden="true">
              ·
            </span>
            <time className="meta" dateTime={article.publishedAt}>
              {timeAgo(article.publishedAt)}
            </time>
            {/* Okuma süresi yalnız gerçek gövde varken — teaser'dan hesaplanmış
                bir süre uydurma olurdu. */}
            {hasBody ? (
              <>
                <span className="text-hairline-strong" aria-hidden="true">
                  ·
                </span>
                <span className="meta">{article.readingTimeMin} dk okuma</span>
              </>
            ) : null}
          </div>
        </header>

        {/* Yayıncının feed'de verdiği görsel. Süsleme değil: gövde saklanmadığı
            için sayfadaki tek görsel bağlam bu.

            `next/image` bilinçli olarak kullanılmıyor. Kaynak alan adları
            önceden bilinemiyor; çalışması için `remotePatterns`'a joker koymak
            gerekirdi ve o da Next'in optimizasyon uç noktasını keyfi URL'leri
            çeken bir vekile çevirirdi.

            alt="" bilinçli: görsel dekoratif, anlamı zaten başlık taşıyor. */}
        {article.imageUrl ? (
          // biome-ignore lint/performance/noImgElement: dinamik dış alan adları, yukarıdaki nota bakın
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            className="mt-7 w-full rounded-[var(--radius-inner)] bg-elevated object-cover"
          />
        ) : null}

        {/* Özet gövdeden ayrılsın diye sol tarafında aksan çizgisi var: aynı
            puntoyla devam eden bir paragraf olsaydı gövdenin ilk cümlesi
            sanılırdı. */}
        {article.summary ? (
          <p className="reading mt-7 border-l-2 border-accent-line pl-5 text-ink-muted">
            {article.summary}
          </p>
        ) : null}

        {hasBody ? (
          <div className="mt-7 flex flex-col gap-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="reading">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "primary" }),
            "mt-8 h-auto justify-between px-5 py-4 text-left",
          )}
        >
          <span className="min-w-0">
            <span className="block text-md font-semibold">
              {hasBody ? "Kaynakta oku" : "Haberin tamamını kaynakta oku"}
            </span>
            <span className="mt-0.5 block truncate text-sm opacity-70">
              {article.source.siteUrl}
            </span>
          </span>
          <ExternalLink className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
        </a>

        {article.tickers.length > 0 ? (
          <footer className="mt-8 border-t border-hairline pt-5">
            <h2 className="label">İlgili semboller</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {article.tickers.map((ticker) => (
                <li
                  key={ticker.symbol}
                  className="rounded-[var(--radius-inner)] bg-elevated px-2.5 py-1.5"
                >
                  <span className="figure text-sm font-semibold text-ink">{ticker.symbol}</span>
                  <span className="ml-1.5 text-sm text-ink-faint">{ticker.name}</span>
                </li>
              ))}
            </ul>
          </footer>
        ) : null}
      </article>
    </div>
  );
}
