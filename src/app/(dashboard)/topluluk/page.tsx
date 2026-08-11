import type { Metadata } from "next";
import { BentoCard } from "@/components/common/BentoCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SentimentFeed } from "@/components/sentiment/SentimentFeed";
import { SentimentMeter } from "@/components/sentiment/SentimentMeter";
import { TrendingTickers } from "@/components/sentiment/TrendingTickers";
import {
  getRecentPosts,
  getSentimentSummary,
  getTrendingTickers,
} from "@/server/services/sentiment";

export const metadata: Metadata = { title: "Topluluk" };
export const dynamic = "force-dynamic";

export default async function ToplulukPage() {
  const [posts, summary, trending] = await Promise.all([
    getRecentPosts(20),
    getSentimentSummary(),
    getTrendingTickers(6),
  ]);

  return (
    <div className="stagger flex flex-col gap-6">
      <SectionHeader
        title="Topluluk"
        description="İzlenen topluluklardaki gönderiler ve bunlardan türetilen duyarlılık."
        action={<span className="meta text-ink-faint">{posts.length} gönderi</span>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <BentoCard title="Gönderiler" className="lg:col-span-8">
          <SentimentFeed posts={posts} showBody />
        </BentoCard>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <BentoCard title="Genel duyarlılık">
            <SentimentMeter summary={summary} />
          </BentoCard>
          <BentoCard title="Öne çıkan semboller">
            <TrendingTickers items={trending} />
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
