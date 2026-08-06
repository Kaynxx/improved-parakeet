import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RoadmapPreview } from "@/components/academy/RoadmapPreview";
import { VideoCard } from "@/components/academy/VideoCard";
import { BentoCard } from "@/components/common/BentoCard";
import { EmptyState } from "@/components/common/EmptyState";
import { MarketOverview } from "@/components/market/MarketOverview";
import { TodayBrief } from "@/components/market/TodayBrief";
import { NewsList } from "@/components/news/NewsList";
import { WatchedSources } from "@/components/news/WatchedSources";
import { SentimentMeter } from "@/components/sentiment/SentimentMeter";
import { TrendingTickers } from "@/components/sentiment/TrendingTickers";
import { getActiveTrack } from "@/server/services/academy";
import { getMarketOverview } from "@/server/services/market";
import { getDiverseArticles, getWatchedSources } from "@/server/services/news";
import { getSentimentSummary, getTrendingTickers } from "@/server/services/sentiment";
import { getDailyVideo } from "@/server/services/video";

// Haber ve akademi verisi veritabanından geliyor; derleme sırasında Postgres
// çalışmayabilir, o yüzden bu sayfa önceden üretilmez.
export const dynamic = "force-dynamic";

function MoreLink({
  href,
  children,
}: {
  href: "/haberler" | "/topluluk" | "/akademi";
  children: string;
}) {
  return (
    <Link
      href={href}
      className="press inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-muted hover:text-accent"
    >
      {children}
      <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

export default async function DashboardPage() {
  const [quotes, articles, track, summary, trending, video] = await Promise.all([
    getMarketOverview(),
    getDiverseArticles(6),
    getActiveTrack(),
    getSentimentSummary(),
    getTrendingTickers(6),
    getDailyVideo(),
  ]);

  // Haber kartı sağdaki iki kartın toplam yüksekliğini kaplıyor. Akış boşken o
  // alan bir hata gibi görünmesin diye o an doğru olanı yazıyoruz: neyin
  // izlendiği. Haberler akmaya başlayınca bu sorgu hiç çalışmaz.
  const watchedSources = articles.length === 0 ? await getWatchedSources() : [];

  return (
    <div className="stagger grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
      {/* Günün okuması ve çizgisi — sayfanın tezi. */}
      <div className="md:col-span-6 lg:col-span-12">
        <TodayBrief quotes={quotes} />
      </div>

      <div className="md:col-span-6 lg:col-span-12">
        <MarketOverview quotes={quotes} />
      </div>

      {/* Haber akışı — sağdaki iki kartın toplam yüksekliğini kaplar. Sabit bir
          zemin yüksekliği YOK: akış boşken keyfi bir boşluk üretmesin diye
          yükseklik gerçek içerikten türüyor. */}
      <BentoCard
        title="Haber akışı"
        action={<MoreLink href="/haberler">Tümü</MoreLink>}
        scrollable
        className="md:col-span-6 lg:col-span-8 lg:row-span-2"
      >
        <NewsList articles={articles} empty={<WatchedSources sources={watchedSources} />} />
      </BentoCard>

      <BentoCard
        title="Topluluk duyarlılığı"
        action={<MoreLink href="/topluluk">Tümü</MoreLink>}
        className="md:col-span-3 lg:col-span-4"
      >
        <SentimentMeter summary={summary} />
      </BentoCard>

      <BentoCard
        title="Öne çıkan semboller"
        scrollable
        className="md:col-span-3 lg:col-span-4 lg:min-h-0"
      >
        <TrendingTickers items={trending} />
      </BentoCard>

      <BentoCard
        title="Akademi yol haritası"
        action={<MoreLink href="/akademi">Tümü</MoreLink>}
        className="md:col-span-6 lg:col-span-7"
      >
        {track ? (
          <RoadmapPreview track={track} />
        ) : (
          <EmptyState
            title="Yol haritası hazır değil"
            description="Akademi içeriği henüz veritabanına yazılmamış."
          />
        )}
      </BentoCard>

      <BentoCard title="Günün videosu" className="md:col-span-6 lg:col-span-5">
        {video ? <VideoCard video={video} /> : <EmptyState title="Bugün için öneri yok" />}
      </BentoCard>
    </div>
  );
}
