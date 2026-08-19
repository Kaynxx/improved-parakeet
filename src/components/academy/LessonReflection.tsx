"use client";

import { useActionState } from "react";
import {
  BOS_YANSIMA_DURUMU,
  yansimaGonder,
} from "@/app/(dashboard)/akademi/[hafta]/[ders]/reflection-actions";
import { BentoCard } from "@/components/common/BentoCard";
import type { YansimaKaydi } from "@/lib/db/queries/lesson-reflection";

interface LessonReflectionProps {
  haftaSlug: string;
  dersSlug: string;
  mevcut: YansimaKaydi | null;
}

const OLCEK = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * Pilot ölçümü: sıkılma, çaba ve devam isteği **ayrı** sorulur.
 *
 * Ölçekler yönlendirilmiyor - uç etiketleri dışında yorum yok - ve puana
 * katılmıyor: "iyi" cevabı ödüllendiren bir ölçüm kendi verisini bozar.
 */
export function LessonReflection({ haftaSlug, dersSlug, mevcut }: LessonReflectionProps) {
  const [durum, eylem, bekliyor] = useActionState(yansimaGonder, BOS_YANSIMA_DURUMU);

  return (
    <BentoCard title="Bu ders sana nasıl geldi?">
      <form action={eylem} className="flex flex-col gap-6">
        <input type="hidden" name="hafta" value={haftaSlug} />
        <input type="hidden" name="ders" value={dersSlug} />

        <Olcek
          ad="sikilma"
          soru="Ne kadar sıkıldın?"
          varsayilan={mevcut?.boredom}
          bekliyor={bekliyor}
        />
        <Olcek
          ad="caba"
          soru="Ne kadar zihinsel çaba harcadın?"
          varsayilan={mevcut?.effort}
          bekliyor={bekliyor}
        />
        <Olcek
          ad="devam"
          soru="Devam etme isteğin ne düzeyde?"
          varsayilan={mevcut?.continueIntent}
          bekliyor={bekliyor}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={bekliyor}
            className="press min-h-11 rounded-[var(--radius-inner)] border border-hairline bg-elevated px-4 text-[13.5px] font-medium text-ink transition-colors hover:border-accent-line disabled:opacity-60"
          >
            {bekliyor ? "Kaydediliyor…" : mevcut ? "Değerlendirmeyi güncelle" : "Değerlendir"}
          </button>

          <p aria-live="polite" className="text-[13px]">
            {durum.hata ? <span className="text-down">{durum.hata}</span> : null}
            {durum.basari ? <span className="text-ink-muted">{durum.basari}</span> : null}
          </p>
        </div>
      </form>
    </BentoCard>
  );
}

interface OlcekProps {
  ad: string;
  soru: string;
  varsayilan: number | undefined;
  bekliyor: boolean;
}

function Olcek({ ad, soru, varsayilan, bekliyor }: OlcekProps) {
  return (
    <fieldset disabled={bekliyor} className="flex flex-col gap-2.5">
      <legend className="text-[14px] font-medium text-ink">{soru}</legend>
      <div className="flex items-center gap-3">
        <span className="meta shrink-0 text-ink-faint">1 düşük</span>
        <div className="flex flex-1 justify-between gap-1.5">
          {OLCEK.map((deger) => (
            <label
              key={deger}
              className="press flex h-11 min-w-11 flex-1 cursor-pointer items-center justify-center rounded-[var(--radius-inner)] border border-hairline bg-base text-[13.5px] text-ink-muted transition-colors focus-within:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent"
            >
              <input
                type="radio"
                name={ad}
                value={deger}
                defaultChecked={varsayilan === deger}
                required
                className="sr-only"
              />
              {deger}
            </label>
          ))}
        </div>
        <span className="meta shrink-0 text-ink-faint">7 yüksek</span>
      </div>
    </fieldset>
  );
}
