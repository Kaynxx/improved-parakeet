import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleReader } from "@/components/news/ArticleReader";
import { getArticleBySlug } from "@/server/services/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Makaleler veritabanından geliyor ve 2B'de sürekli yenilenecek — önceden
// üretmek anlamsız. `generateStaticParams` bu yüzden kaldırıldı.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Haber bulunamadı" };
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleReader article={article} />;
}
