"use client";

import { useState } from "react";
import { BentoCard } from "@/components/common/BentoCard";
import { hesaplaDurasyonKonveksite } from "@/components/academy/interactions/calculators";
import type { EtkilesimYapilandirmasi } from "@/lib/content/interactions";

interface DurationConvexityLabProps {
  config: Extract<EtkilesimYapilandirmasi, { tur: "durasyon-konveksite" }>;
}

/**
 * Durasyon ve Konveksite etkileşim laboratuvarı.
 * Kullanıcının faiz şokunu değiştirerek tahvil fiyatındaki değişimi ve yaklaşımların hassasiyetini görmesini sağlar.
 */
export function DurationConvexityLab({ config }: DurationConvexityLabProps) {
  const [sok, setSok] = useState(config.faizSokuBazPuan);
  const sonuc = hesaplaDurasyonKonveksite({ ...config, faizSokuBazPuan: sok });

  return (
    <BentoCard title={config.baslik} className="my-8">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="bg-elevated p-3 rounded-[var(--radius-inner)]">
            <div className="text-ink-muted mb-1">Nominal</div>
            <div className="font-mono text-ink">{config.nominalFiyat}</div>
          </div>
          <div className="bg-elevated p-3 rounded-[var(--radius-inner)]">
            <div className="text-ink-muted mb-1">Kupon</div>
            <div className="font-mono text-ink">%{(config.yillikKuponOrani * 100).toFixed(1)}</div>
          </div>
          <div className="bg-elevated p-3 rounded-[var(--radius-inner)]">
            <div className="text-ink-muted mb-1">Vade</div>
            <div className="font-mono text-ink">{config.vadeYil} Yıl</div>
          </div>
          <div className="bg-elevated p-3 rounded-[var(--radius-inner)]">
            <div className="text-ink-muted mb-1">Getiri</div>
            <div className="font-mono text-ink">%{(config.yillikGetiri * 100).toFixed(1)}</div>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm mb-3">
            <span className="font-medium text-ink">Faiz Şoku (Baz Puan)</span>
            <span className="font-mono text-ink">{sok > 0 ? `+${sok}` : sok} bps</span>
          </label>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={sok}
            onChange={(e) => setSok(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
            aria-label="Faiz Şoku"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-base border border-hairline rounded-[var(--radius-inner)]">
            <span className="text-sm text-ink">Mevcut Tam Fiyat</span>
            <span className="font-mono font-medium text-ink">
              {sonuc.bugunkuTamFiyat.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-base border border-hairline rounded-[var(--radius-inner)]">
            <span className="text-sm text-ink">Şoklu Gerçek Fiyat</span>
            <span className="font-mono font-medium text-accent">
              {sonuc.sokluTamFiyat.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-base border border-hairline rounded-[var(--radius-inner)]">
            <span className="text-sm text-ink">Durasyon Yaklaşımı</span>
            <span className="font-mono font-medium text-ink">
              {sonuc.durasyonYaklasimi.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-base border border-hairline rounded-[var(--radius-inner)]">
            <span className="text-sm text-ink">Durasyon + Konveksite</span>
            <span className="font-mono font-medium text-ink">
              {sonuc.durasyonKonveksiteYaklasimi.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="text-xs text-ink-faint flex justify-between px-1">
          <span>Modifiye Durasyon: {sonuc.modifiyeDurasyon.toFixed(4)}</span>
          <span>Konveksite: {sonuc.konveksite.toFixed(4)}</span>
        </div>
        <p className="text-xs leading-relaxed text-ink-faint">
          Yaklaşımlar: ΔP ≈ −D<sub>mod</sub>·Δy·P ve ΔP ≈ (−D<sub>mod</sub>·Δy + ½·C·Δy²)·P. Tam
          fiyat her iki yaklaşımın ölçütüdür; şok büyüdükçe yalnız durasyonun sapması artar. Model
          teorik iskonto fiyatıdır: kredi riski, likidite primi ve vergi etkisi içermez.
        </p>
      </div>
    </BentoCard>
  );
}
