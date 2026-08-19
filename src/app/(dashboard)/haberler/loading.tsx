import { SectionHeader } from "@/components/common/SectionHeader";
import { SkeletonCard } from "@/components/common/SkeletonCard";

export default function HaberlerLoading() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Haberler"
        description="İzlenen kaynaklardan gelen başlıklar, en yeniden eskiye."
      />
      <SkeletonCard className="min-h-96" />
    </div>
  );
}
