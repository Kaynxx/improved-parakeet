import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function SkeletonLine({ className }: SkeletonProps) {
  return <div className={cn("h-3 animate-pulse rounded-full bg-sunken", className)} />;
}

/** Suspense sınırlarında kartın yerini korur — ızgara yükleme sırasında zıplamaz. */
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("card flex flex-col gap-4 p-5", className)} aria-hidden="true">
      <SkeletonLine className="w-1/3" />
      <div className="flex flex-col gap-3">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-11/12" />
        <SkeletonLine className="w-4/5" />
        <SkeletonLine className="w-2/3" />
      </div>
    </div>
  );
}
