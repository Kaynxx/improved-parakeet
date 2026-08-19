import type { Metadata } from "next";
import { auth } from "@/auth";
import { ProgressRing } from "@/components/academy/ProgressRing";
import { RoadmapNode } from "@/components/academy/RoadmapNode";
import { VideoCard } from "@/components/academy/VideoCard";
import { BentoCard } from "@/components/common/BentoCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTracks } from "@/server/services/academy";
import { getDailyVideo } from "@/server/services/video";

export const metadata: Metadata = { title: "Akademi" };
export const dynamic = "force-dynamic";

const LEVEL_TR = {
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
} as const;

export default async function AkademiPage() {
  const session = await auth();
  const userId = session?.user.id ?? "";

  const [tracks, video] = await Promise.all([getTracks(userId), getDailyVideo()]);

  const totalSteps = tracks.reduce((sum, track) => sum + track.totalSteps, 0);
  const completedSteps = tracks.reduce((sum, track) => sum + track.completedSteps, 0);

  return (
    <div className="stagger flex flex-col gap-6">
      <SectionHeader
        title="Akademi"
        description="Sıfırdan ileri seviyeye, birbirinin üzerine kurulan adımlar."
        action={
          <span className="meta text-ink-faint">
            {completedSteps}/{totalSteps} adım
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          {tracks.length === 0 ? (
            <BentoCard>
              <EmptyState
                title="Yol haritası hazır değil"
                description="Akademi içeriği henüz veritabanına yazılmamış. `npm run seed` çalıştırın."
              />
            </BentoCard>
          ) : (
            tracks.map((track) => (
              <BentoCard
                key={track.id}
                title={track.title}
                action={<span className="label">{LEVEL_TR[track.level]}</span>}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <ProgressRing completed={track.completedSteps} total={track.totalSteps} />
                    <p className="text-copy leading-relaxed text-ink-muted">{track.description}</p>
                  </div>
                  <ol className="flex flex-col border-t border-hairline pt-5">
                    {track.steps.map((step, index) => (
                      <RoadmapNode
                        key={step.id}
                        step={step}
                        isLast={index === track.steps.length - 1}
                      />
                    ))}
                  </ol>
                </div>
              </BentoCard>
            ))
          )}
        </div>

        <div className="lg:col-span-4">
          <BentoCard title="Günün videosu">
            {video ? <VideoCard video={video} /> : <EmptyState title="Bugün için öneri yok" />}
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
