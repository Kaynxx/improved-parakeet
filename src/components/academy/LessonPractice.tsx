import { LessonPromptCard } from "@/components/academy/LessonPromptCard";
import { BentoCard } from "@/components/common/BentoCard";
import type { PromptWithAnswer } from "@/types";

interface LessonPracticeProps {
  haftaSlug: string;
  dersSlug: string;
  prompts: PromptWithAnswer[];
  degerlendiriciBagli: boolean;
}

/**
 * Çalışma masası. İçeriğin **sonrasında** duruyor: soruları metnin arasına
 * serpiştirmek okuma akışını bölüyor, bağımsız cevap denemesini de
 * zayıflatıyordu.
 */
export function LessonPractice({
  haftaSlug,
  dersSlug,
  prompts,
  degerlendiriciBagli,
}: LessonPracticeProps) {
  if (prompts.length === 0) return null;

  return (
    <BentoCard title="Çalışma masası">
      <div className="flex flex-col gap-4">
        <p className="text-[13.5px] leading-relaxed text-ink-muted">
          Önce kendi cevabını yaz. Sayısal sorular anında, açık uçlu sorular dersin ölçütüne göre
          değerlendirilir; cevabını düzeltip yeniden gönderebilirsin.
        </p>

        {degerlendiriciBagli ? null : (
          <p className="text-[13px] text-ink-faint">
            Değerlendirici şu an bağlı değil. Açık uçlu cevapların kaydedilir, puanlanmaz.
          </p>
        )}

        <ol className="flex flex-col gap-5">
          {prompts.map((item, index) => (
            <LessonPromptCard
              key={item.prompt.id}
              sira={index + 1}
              haftaSlug={haftaSlug}
              dersSlug={dersSlug}
              item={item}
            />
          ))}
        </ol>
      </div>
    </BentoCard>
  );
}
