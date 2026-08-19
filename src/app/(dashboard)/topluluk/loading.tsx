import { SectionHeader } from "@/components/common/SectionHeader";
import { SkeletonCard } from "@/components/common/SkeletonCard";

export default function ToplulukLoading() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Topluluk"
        description="İzlenen topluluklardaki gönderiler ve bunlardan türetilen duyarlılık."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <SkeletonCard className="min-h-96 lg:col-span-8" />
        <div className="flex flex-col gap-4 lg:col-span-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
