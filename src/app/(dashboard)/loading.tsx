import { SkeletonCard } from "@/components/common/SkeletonCard";

/**
 * `page.tsx`'in ızgarasıyla birebir aynı `col-span` dağılımı — iskelet gerçek
 * içerik gelince yer değiştirmesin diye. `loading.tsx` Next'in otomatik
 * Suspense sınırı: kabuk (Sidebar/TopBar/ticker) hemen görünür, yalnız bu
 * bölge veritabanı yanıtını bekler.
 */
export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12" aria-hidden="true">
      <SkeletonCard className="md:col-span-6 lg:col-span-12" />
      <SkeletonCard className="md:col-span-6 lg:col-span-12" />
      <SkeletonCard className="md:col-span-6 lg:col-span-8 lg:row-span-2 min-h-64" />
      <SkeletonCard className="md:col-span-3 lg:col-span-4" />
      <SkeletonCard className="md:col-span-3 lg:col-span-4" />
      <SkeletonCard className="md:col-span-6 lg:col-span-7" />
      <SkeletonCard className="md:col-span-6 lg:col-span-5" />
    </div>
  );
}
