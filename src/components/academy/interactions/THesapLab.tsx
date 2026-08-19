"use client";

import { useState } from "react";
import { hesaplaTHesap } from "@/components/academy/interactions/calculators";
import { BentoCard } from "@/components/common/BentoCard";
import type { EtkilesimYapilandirmasi } from "@/lib/content/interactions";

interface THesapLabProps {
  config: Extract<EtkilesimYapilandirmasi, { tur: "t-hesap" }>;
}

/** Sunucu ve tarayıcı aynı biçimi üretsin: yerel ayar farkı hydration uyuşmazlığı yapıyordu. */
const BICIM = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

/**
 * Çift taraflı T-hesap defteri: her adımda bilanço eşitliği ekranda sınanır.
 * Gösterdiği tek şey muhasebe kimliğidir; bir bankanın gerçek kredi kararını
 * veya risk iştahını modellemez.
 */
export function THesapLab({ config }: THesapLabProps) {
  const [adim, setAdim] = useState(0);
  const durumlar = hesaplaTHesap(config);
  // Şema en az bir adım garanti ediyor; yine de dizinin ilk öğesine düşerek
  // tip daraltmasını çalışma zamanı varsayımına bırakmıyoruz.
  const mevcut = durumlar[Math.min(adim, durumlar.length - 1)] ?? durumlar[0];
  if (!mevcut) return null;
  const dengeli = mevcut.varliklar === mevcut.yukumlulukler + mevcut.ozkaynak;

  return (
    <BentoCard title={config.baslik} className="my-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink-muted">
            Adım {adim + 1} / {durumlar.length}: {mevcut.etiket}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAdim(Math.max(0, adim - 1))}
              disabled={adim === 0}
              className="px-3 py-1.5 text-sm font-medium bg-elevated text-ink rounded-[var(--radius-inner)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-elevated/80 transition-colors"
            >
              Önceki
            </button>
            <button
              type="button"
              onClick={() => setAdim(Math.min(durumlar.length - 1, adim + 1))}
              disabled={adim === durumlar.length - 1}
              className="px-3 py-1.5 text-sm font-medium bg-elevated text-ink rounded-[var(--radius-inner)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-elevated/80 transition-colors"
            >
              Sonraki
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-hairline border border-hairline rounded-[var(--radius-inner)] overflow-hidden">
          <div className="bg-base p-5">
            <h3 className="text-center font-semibold text-ink border-b border-hairline pb-3 mb-5">
              Varlıklar
            </h3>
            <div className="text-2xl text-center font-mono text-ink">
              {BICIM.format(mevcut.varliklar)} ₺
            </div>
          </div>
          <div className="bg-base p-5 flex flex-col gap-6">
            <div>
              <h3 className="text-center font-semibold text-ink border-b border-hairline pb-3 mb-5">
                Yükümlülükler
              </h3>
              <div className="text-2xl text-center font-mono text-ink">
                {BICIM.format(mevcut.yukumlulukler)} ₺
              </div>
            </div>
            <div>
              <h3 className="text-center font-semibold text-ink border-b border-hairline pb-3 mb-5">
                Özkaynak
              </h3>
              <div className="text-2xl text-center font-mono text-ink">
                {BICIM.format(mevcut.ozkaynak)} ₺
              </div>
            </div>
          </div>
        </div>

        <p className="text-center font-mono text-[13px] text-ink">
          Varlıklar = Yükümlülükler + Özkaynak → {BICIM.format(mevcut.varliklar)} ={" "}
          {BICIM.format(mevcut.yukumlulukler)} + {BICIM.format(mevcut.ozkaynak)}{" "}
          <span className={dengeli ? "text-up" : "text-down"}>
            {dengeli ? "eşitlik korunuyor" : "eşitlik bozuldu"}
          </span>
        </p>

        <p className="text-center text-xs text-ink-faint">
          Bu defter yalnız muhasebe kimliğini gösterir; kredinin geri ödeneceğini ya da bilançonun
          sürdürülebilir olduğunu kanıtlamaz.
        </p>
      </div>
    </BentoCard>
  );
}
