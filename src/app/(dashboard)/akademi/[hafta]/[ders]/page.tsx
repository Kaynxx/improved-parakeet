import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { SourceList } from "@/components/academy/SourceList";
import { BentoCard } from "@/components/common/BentoCard";
import { renderMarkdown } from "@/lib/content/render";
import { getStep } from "@/server/services/academy";

/**
 * Ders sayfası.
 *
 * **Parametre adları dizin adlarıyla aynı olmak zorunda.** Rota Faz 2B'de
 * `[track]/[step]` → `[hafta]/[ders]` olarak yeniden adlandırıldığında burası
 * güncellenmemişti; `params.track` `undefined` geliyor, servis `null` dönüyor
 * ve her ders 404'e düşüyordu. `params` tipi elle yazıldığı için `tsc` bunu
 * göremedi — tip, gerçeği değil iddiayı anlatıyordu.
 */
interface PageProps {
  params: Promise<{ hafta: string; ders: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { hafta, ders } = await params;
  const session = await auth();
  const found = await getStep(session?.user.id ?? "", hafta, ders);
  if (!found) return { title: "Ders bulunamadı" };
  return { title: found.step.title, description: found.step.summary };
}

export default async function DersPage({ params }: PageProps) {
  const { hafta: haftaSlug, ders: dersSlug } = await params;
  const session = await auth();
  const found = await getStep(session?.user.id ?? "", haftaSlug, dersSlug);
  if (!found) notFound();

  const { track, step, contentMd, sources } = found;
  const prerequisites = track.steps.filter((item) => step.prerequisiteIds.includes(item.id));

  return (
    <div className="stagger mx-auto flex w-full max-w-[70ch] flex-col gap-5">
      <Link
        href="/akademi"
        className="press inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-accent"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
        Yol haritasına dön
      </Link>

      <header>
        <p className="label">{track.title}</p>
        <h1 className="mt-2.5 text-[30px] leading-[1.12] font-semibold tracking-[-0.032em] text-balance text-ink sm:text-[36px]">
          {step.title}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{step.summary}</p>
        <p className="meta mt-3 inline-flex items-center gap-1.5 text-ink-faint">
          <Clock className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          {step.estimatedMin} dk
        </p>
      </header>

      {prerequisites.length > 0 ? (
        <BentoCard title="Ön koşullar">
          <ul className="flex flex-col divide-y divide-rule">
            {prerequisites.map((item) => (
              <li key={item.id} className="py-2 first:pt-0 last:pb-0">
                <Link
                  href={{ pathname: `/akademi/${track.slug}/${item.slug}` }}
                  className="text-[14px] font-medium text-ink-muted transition-colors hover:text-accent"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </BentoCard>
      ) : null}

      <BentoCard title="İçerik">
        {contentMd ? (
          // Markdown olarak basılır: ders gövdeleri başlık, liste ve tablo
          // içeriyor. Paragrafa bölüp düz metin basmak `##` ve `-` işaretlerini
          // ekrana çıplak döküyordu. `renderMarkdown` çıktıyı sanitize eder.
          <div
            className="ders-govde reading"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: renderMarkdown sanitize-html'den geçiriyor.
            dangerouslySetInnerHTML={{ __html: renderMarkdown(contentMd) }}
          />
        ) : (
          <p className="text-[13.5px] leading-relaxed text-ink-faint">
            Bu dersin gövdesi henüz yazılmadı.
          </p>
        )}
      </BentoCard>

      {sources.length > 0 ? (
        <BentoCard title="Kaynaklar">
          <SourceList sources={sources} />
        </BentoCard>
      ) : null}
    </div>
  );
}
