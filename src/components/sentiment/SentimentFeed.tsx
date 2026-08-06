import { MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PostCard } from "@/components/sentiment/PostCard";
import type { SentimentPost } from "@/types";

export function SentimentFeed({
  posts,
  showBody = false,
}: {
  posts: SentimentPost[];
  showBody?: boolean;
}) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={MessagesSquare}
        title="Gönderi bulunamadı"
        description="İzlenen topluluklardan yeni gönderiler geldiğinde burada listelenecek."
      />
    );
  }

  return (
    <div className="flex flex-col divide-y divide-rule">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showBody={showBody} />
      ))}
    </div>
  );
}
