"use client";

import { useState } from "react";
import { BentoCard } from "@/components/common/BentoCard";
import { hesaplaTufeSepeti } from "@/components/academy/interactions/calculators";
import type { EtkilesimYapilandirmasi } from "@/lib/content/interactions";

interface TufeSepetiLabProps {
  config: Extract<EtkilesimYapilandirmasi, { tur: "tufe-sepeti" }>;
}

/**
 * Sepet ağırlığı laboratuvarı: aynı fiyat değişimleri, iki farklı ağırlık
 * setiyle iki farklı enflasyon üretir. Ölçüm tasarımını görünür kılar;
 * resmî endeksin doğru ya da yanlış olduğunu kanıtlamaz.
 */
export function TufeSepetiLab({ config }: TufeSepetiLabProps) {
  const [kisisel, setKisisel] = useState<number[]>(config.kalemler.map((k) => k.kisiselAgirlik));

  const guncelKalemler = config.kalemler.map((k, i) => ({
    ...k,
    kisiselAgirlik: kisisel[i] ?? k.kisiselAgirlik,
  }));

  // Tüm ağırlıklar sıfırken normalize etmek tanımsız; hesaplayıcı da hata
  // fırlatıyor. Kullanıcıya çökme yerine ne yapması gerektiğini söylüyoruz.
  const kisiselToplam = guncelKalemler.reduce((toplam, k) => toplam + k.kisiselAgirlik, 0);
  const sonuc = kisiselToplam > 0 ? hesaplaTufeSepeti(guncelKalemler) : null;

  return (
    <BentoCard title={config.baslik} className="my-8">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-elevated p-5 rounded-[var(--radius-inner)] text-center">
            <div className="text-sm text-ink-muted mb-2">Resmî sepet</div>
            <div className="text-3xl font-mono font-semibold text-ink">
              {sonuc ? `%${sonuc.resmiDegisimYuzde.toFixed(2)}` : "—"}
            </div>
          </div>
          <div className="bg-accent-soft text-accent p-5 rounded-[var(--radius-inner)] text-center">
            <div className="text-sm mb-2">Kişisel sepet</div>
            <div className="text-3xl font-mono font-semibold">
              {sonuc ? `%${sonuc.kisiselDegisimYuzde.toFixed(2)}` : "—"}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-ink-faint">
          Endeks = Σ (normalize ağırlık × kalem fiyat değişimi). İki sepet ayrı normalize edilir.
        </p>

        {sonuc ? null : (
          <p className="text-center text-[13px] text-down">
            En az bir kaleme ağırlık ver; sıfır toplamda sepet tanımsız.
          </p>
        )}

        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-ink-muted px-2">
            <div className="col-span-4">Harcama Kalemi</div>
            <div className="col-span-3 text-right">Fiyat Değişimi</div>
            <div className="col-span-5 text-right">Kişisel Ağırlık</div>
          </div>
          {guncelKalemler.map((kalem, i) => (
            <div
              key={kalem.ad}
              className="grid grid-cols-12 gap-2 items-center bg-base p-3 border border-hairline rounded-[var(--radius-inner)]"
            >
              <div className="col-span-4 text-sm font-medium text-ink">{kalem.ad}</div>
              <div className="col-span-3 text-sm text-right font-mono text-ink">
                {kalem.fiyatDegisimiYuzde > 0 ? "+" : ""}
                {kalem.fiyatDegisimiYuzde}%
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={kalem.kisiselAgirlik}
                  onChange={(e) => {
                    const yeni = [...kisisel];
                    yeni[i] = Number(e.target.value);
                    setKisisel(yeni);
                  }}
                  className="w-full accent-accent cursor-pointer"
                  aria-label={`${kalem.ad} kişisel ağırlık`}
                />
                <span className="text-xs font-mono w-10 text-right text-ink-muted">
                  {sonuc
                    ? `${((sonuc.normalizeKisiselAgirliklar[i] ?? 0) * 100).toFixed(0)}%`
                    : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-faint text-center">
          Bu hesap ölçüm tasarımının etkisini gösterir; kişisel sepet resmî endeksin yanlış olduğunu
          kanıtlamaz.
        </p>
      </div>
    </BentoCard>
  );
}
