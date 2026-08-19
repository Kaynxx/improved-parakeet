import { SkeletonCard, SkeletonLine } from "@/components/common/SkeletonCard";

export default function DersLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[70ch] flex-col gap-5" aria-hidden="true">
      <div className="flex flex-col gap-2.5">
        <SkeletonLine className="w-24" />
        <SkeletonLine className="h-8 w-3/4" />
        <SkeletonLine className="w-1/2" />
      </div>
      <SkeletonCard className="min-h-96" />
    </div>
  );
}
