import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { LessonContent } from "@/components/academy/LessonContent";
import { LessonPractice } from "@/components/academy/LessonPractice";
import { LessonReflection } from "@/components/academy/LessonReflection";
import { SourceList } from "@/components/academy/SourceList";
import { BentoCard } from "@/components/common/BentoCard";
import { advanceProgress } from "@/lib/db/queries/progress";
import { getStep } from "@/server/services/academy";

/** Yansıma yalnız pilot derslerde soruluyor; 40 derse yaymak ölçümü sulandırırdı. */
const PILOT_DERSLER = new Set([
  "hafta-01/01-takas-efsanesi-ve-paranin-kokeni",
  "hafta-01/02-krediyi-banka-yaratir",
  "hafta-04/01-tufe-nin-insasi",
  "hafta-08/03-turkiye-2001-2026",
  "hafta-08/05-dijital-para-cbdc-ve-stablecoin",
]);

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
  const userId = session?.user?.id ?? "";
  const found = await getStep(userId, haftaSlug, dersSlug);
  if (!found) notFound();

  const { track, step, contentMd, sources, prompts, yansima } = found;
  const prerequisites = track.steps.filter((item) => step.prerequisiteIds.includes(item.id));
  const pilot = PILOT_DERSLER.has(`${haftaSlug}/${dersSlug}`);

  // Dersi açmak gözlenebilir bir olay; `reading` burada yazılır.
  // `generateMetadata` içinde yazmıyoruz: metadata isteği ilerleme üretmemeli.
  if (userId) {
    await advanceProgress(userId, step.id, "reading");
  }

  return (
    <div className="stagger mx-auto flex w-full max-w-[70ch] flex-col gap-5">
      <Link
        href="/akademi"
        className="press inline-flex items-center gap-1.5 text-copy font-medium text-ink-muted hover:text-accent"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
        Yol haritasına dön
      </Link>

      <header>
        <p className="label">{track.title}</p>
        <h1 className="mt-2.5 text-display leading-[1.12] font-semibold tracking-[-0.032em] text-balance text-ink">
          {step.title}
        </h1>
        <p className="mt-3 text-md leading-relaxed text-ink-muted">{step.summary}</p>
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
                  className="text-md font-medium text-ink-muted transition-colors hover:text-accent"
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
          // Gövde markdown parçaları ve doğrulanmış `etkilesim` blokları olarak
          // ayrıştırılır; düz `renderMarkdown` laboratuvarları JSON olarak
          // ekrana döküyordu.
          <LessonContent contentMd={contentMd} location={`${haftaSlug}/${dersSlug}`} />
        ) : (
          <p className="text-copy leading-relaxed text-ink-faint">
            Bu dersin gövdesi henüz yazılmadı.
          </p>
        )}
      </BentoCard>

      <LessonPractice
        haftaSlug={haftaSlug}
        dersSlug={dersSlug}
        prompts={prompts}
        degerlendiriciBagli={Boolean(process.env.ANTHROPIC_API_KEY)}
      />

      {sources.length > 0 ? (
        <BentoCard title="Kaynaklar">
          <SourceList sources={sources} />
        </BentoCard>
      ) : null}

      {pilot ? (
        <LessonReflection haftaSlug={haftaSlug} dersSlug={dersSlug} mevcut={yansima} />
      ) : null}
    </div>
  );
}
