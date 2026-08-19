"use client";

import { useActionState } from "react";
import { BOS_CEVAP_DURUMU, cevapGonder } from "@/app/(dashboard)/akademi/[hafta]/[ders]/actions";
import { renderMarkdown } from "@/lib/content/render";
import type { PromptWithAnswer } from "@/types";

interface LessonPromptCardProps {
  sira: number;
  haftaSlug: string;
  dersSlug: string;
  item: PromptWithAnswer;
}

const TUR_ETIKETI = {
  acik: "Açık uçlu",
  sayisal: "Sayısal",
  tahmin: "Tahmin",
} as const;

/**
 * Tek soru: bağımsız cevap → geri bildirim → revizyon.
 *
 * Her kart kendi `useActionState`'ini tutuyor; tek form olsaydı bir sorunun
 * bekleme durumu diğerlerini de kilitlerdi. Geri bildirim **açık** gösterilir:
 * akordeon arkasına saklanan geri bildirim okunmuyordu.
 */
export function LessonPromptCard({ sira, haftaSlug, dersSlug, item }: LessonPromptCardProps) {
  const [durum, eylem, bekliyor] = useActionState(cevapGonder, BOS_CEVAP_DURUMU);
  const { prompt, answer, feedback } = item;
  const cevaplandi = answer !== null;

  return (
    <li className="flex flex-col gap-3 border-t border-rule pt-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="label">Soru {sira}</span>
        <span className="meta text-ink-faint">{TUR_ETIKETI[prompt.kind]}</span>
        <span className="meta text-ink-faint">{prompt.points} puan</span>
      </div>

      <div
        className="reading text-[15px]"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: renderMarkdown sanitize-html'den geçiriyor.
        dangerouslySetInnerHTML={{ __html: renderMarkdown(prompt.promptMd) }}
      />

      <form action={eylem} className="flex flex-col gap-2.5">
        <input type="hidden" name="promptId" value={prompt.id} />
        <input type="hidden" name="hafta" value={haftaSlug} />
        <input type="hidden" name="ders" value={dersSlug} />

        <label htmlFor={`cevap-${prompt.id}`} className="meta text-ink-faint">
          {prompt.kind === "sayisal"
            ? "Yalnız sonucu yaz; ondalık ayırıcı virgül veya nokta olabilir."
            : "Önce kendi cevabını yaz; geri bildirim ondan sonra gelir."}
        </label>

        {prompt.kind === "sayisal" ? (
          <input
            id={`cevap-${prompt.id}`}
            name="cevap"
            defaultValue={answer?.body ?? ""}
            inputMode="decimal"
            autoComplete="off"
            required
            className="min-h-11 rounded-[var(--radius-inner)] border border-hairline bg-base px-3 font-mono text-[14px] text-ink outline-none focus:border-accent"
          />
        ) : (
          <textarea
            id={`cevap-${prompt.id}`}
            name="cevap"
            defaultValue={answer?.body ?? ""}
            rows={6}
            maxLength={10000}
            required
            className="scroll-thin min-h-32 rounded-[var(--radius-inner)] border border-hairline bg-base p-3 text-[14.5px] leading-relaxed text-ink outline-none focus:border-accent"
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={bekliyor}
            className="press min-h-11 rounded-[var(--radius-inner)] border border-hairline bg-elevated px-4 text-[13.5px] font-medium text-ink transition-colors hover:border-accent-line disabled:opacity-60"
          >
            {bekliyor
              ? "Gönderiliyor…"
              : cevaplandi
                ? "Cevabı güncelle ve yeniden değerlendir"
                : "Cevabı kaydet"}
          </button>

          <p aria-live="polite" className="text-[13px]">
            {durum.hata ? <span className="text-down">{durum.hata}</span> : null}
            {durum.basari ? <span className="text-ink-muted">{durum.basari}</span> : null}
          </p>
        </div>

        {durum.uyari ? <p className="text-[13px] text-ink-faint">{durum.uyari}</p> : null}
      </form>

      {feedback ? <GeriBildirim feedback={feedback} /> : null}
    </li>
  );
}

function GeriBildirim({ feedback }: { feedback: NonNullable<PromptWithAnswer["feedback"]> }) {
  return (
    <section className="flex flex-col gap-2.5 rounded-[var(--radius-inner)] border border-hairline bg-elevated p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="label">Değerlendirme</span>
        <span className="meta text-ink-faint">
          {feedback.score} / 100 · {feedback.model}
        </span>
      </div>

      <div
        className="reading text-[14px]"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: renderMarkdown sanitize-html'den geçiriyor.
        dangerouslySetInnerHTML={{ __html: renderMarkdown(feedback.feedbackMd) }}
      />

      {feedback.strengths.length > 0 ? (
        <Liste baslik="Karşılananlar" maddeler={feedback.strengths} />
      ) : null}
      {feedback.gaps.length > 0 ? <Liste baslik="Eksikler" maddeler={feedback.gaps} /> : null}

      {feedback.followUp ? (
        <p className="text-[14px] leading-relaxed text-ink">
          <span className="label mr-2">Takip</span>
          {feedback.followUp}
        </p>
      ) : null}
    </section>
  );
}

function Liste({ baslik, maddeler }: { baslik: string; maddeler: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="meta text-ink-faint">{baslik}</span>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-[13.5px] leading-relaxed text-ink-muted">
        {maddeler.map((madde) => (
          <li key={madde}>{madde}</li>
        ))}
      </ul>
    </div>
  );
}
