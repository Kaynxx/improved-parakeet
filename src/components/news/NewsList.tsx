import { Newspaper } from "lucide-react";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { NewsCard } from "@/components/news/NewsCard";
import type { Article } from "@/types";

interface NewsListProps {
  articles: Article[];
  showSummary?: boolean;
  /**
   * Liste boşken ne gösterileceği. Sayfa karar verir — hangi bağlamın boş
   * olduğunu ve o boşluğun ne kadar yer kapladığını yalnız sayfa bilir.
   */
  empty?: ReactNode;
}

export function NewsList({ articles, showSummary = false, empty }: NewsListProps) {
  if (articles.length === 0) {
    return (
      empty ?? (
        <EmptyState
          icon={Newspaper}
          title="Henüz haber yok"
          description="Kaynaklar tarandığında başlıklar burada görünecek."
        />
      )
    );
  }

  return (
    // Ayraç kartın kendisinde değil listede: kart nerede durduğunu bilmek
    // zorunda kalmasın, son öğede `last:border-0` gibi bir istisna gerekmesin.
    <div className="flex flex-col divide-y divide-rule">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} showSummary={showSummary} />
      ))}
    </div>
  );
}
