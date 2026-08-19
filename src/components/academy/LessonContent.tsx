import { parseLessonContent } from "@/lib/content/interactions";
import { renderMarkdown } from "@/lib/content/render";
import { LessonInteraction } from "@/components/academy/interactions/LessonInteraction";

interface LessonContentProps {
  contentMd: string;
  location?: string;
}

/**
 * Ders içeriğini render eden ana bileşen.
 * Markdown metnini ve etkileşim bloklarını ayrıştırarak sırasıyla ekrana basar.
 */
export function LessonContent({ contentMd, location }: LessonContentProps) {
  const parts = parseLessonContent(contentMd, location);

  return (
    <div className="flex flex-col gap-6">
      {parts.map((part, index) => {
        if (part.kind === "markdown") {
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: İçerik sırası statiktir ve değişmez.
              key={index}
              className="ders-govde reading"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: İçerik güvenilir kaynaktan geliyor ve renderMarkdown içinde sanitize ediliyor.
              dangerouslySetInnerHTML={{ __html: renderMarkdown(part.content) }}
            />
          );
        }

        return (
          <LessonInteraction
            // biome-ignore lint/suspicious/noArrayIndexKey: İçerik sırası statiktir ve değişmez.
            key={index}
            config={part.config}
          />
        );
      })}
    </div>
  );
}
