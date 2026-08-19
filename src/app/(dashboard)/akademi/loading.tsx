import { SectionHeader } from "@/components/common/SectionHeader";
import { SkeletonCard } from "@/components/common/SkeletonCard";

export default function AkademiLoading() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Akademi"
        description="Sıfırdan ileri seviyeye, birbirinin üzerine kurulan adımlar."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12" aria-hidden="true">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <SkeletonCard className="min-h-56" />
          <SkeletonCard className="min-h-56" />
        </div>
        <div className="lg:col-span-4">
          <SkeletonCard className="min-h-56" />
        </div>
      </div>
    </div>
  );
}
