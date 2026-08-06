import type { Metadata } from "next";
import { BentoCard } from "@/components/common/BentoCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { NewsList } from "@/components/news/NewsList";
import { WatchedSources } from "@/components/news/WatchedSources";
import { getLatestArticles, getWatchedSources } from "@/server/services/news";

export const metadata: Metadata = { title: "Haberler" };
export const dynamic = "force-dynamic";

export default async function HaberlerPage() {
  const articles = await getLatestArticles(50);
  // Yalnız akış boşken sorulur — haberler akmaya başlayınca bu sorgu hiç çalışmaz.
  const sources = articles.length === 0 ? await getWatchedSources() : [];

  return (
    <div className="stagger flex flex-col gap-6">
      <SectionHeader
        title="Haberler"
        description="İzlenen kaynaklardan gelen başlıklar, en yeniden eskiye."
        action={<span className="meta text-ink-faint">{articles.length} başlık</span>}
      />
      <BentoCard>
        <NewsList articles={articles} showSummary empty={<WatchedSources sources={sources} />} />
      </BentoCard>
    </div>
  );
}
