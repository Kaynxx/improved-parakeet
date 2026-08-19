import { SkeletonCard, SkeletonLine } from "@/components/common/SkeletonCard";

export default function ArticleLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[70ch] flex-col gap-4" aria-hidden="true">
      <SkeletonLine className="w-28" />
      <SkeletonCard className="min-h-[28rem]" />
    </div>
  );
}
