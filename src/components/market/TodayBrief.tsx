import { lineGeometry } from "@/lib/utils/chart";
import { cn } from "@/lib/utils/cn";
import {
  type Direction,
  directionOf,
  formatPercent,
  formatPrice,
  formatSigned,
  priceDigits,
} from "@/lib/utils/format";
import type { MarketQuote } from "@/types";

const VIEW_W = 720;
const VIEW_H = 150;
const PAD_Y = 14;

const STROKE: Record<Direction, string> = {
  up: "var(--color-up)",
  down: "var(--color-down)",
  flat: "var(--color-flat)",
};

const TONE: Record<Direction, string> = {
  up: "text-up",
  down: "text-down",
  flat: "text-flat",
};

/**
 * Panelin imzası: **günün çizgisi.**
 *
 * Bir dashboard'un açılışı genelde beş eşit ağırlıkta rakam kutusudur ve o
 * kutular hiçbir şey söylemez — okur beş sayıya bakıp kendi sonucunu çıkarmak
 * zorunda kalır. Burada sıra tersine çevrildi: önce günün bir cümlelik okuması,
 * sonra o cümlenin dayandığı çizgi, en sonda sayılar.
 *
 * Çizgi kartın tabanına oturuyor ve kenarlara kadar taşıyor — süs değil, kartın
 * zemini. Kesikli yatay çizgi açılış değeri; çizginin onun üstünde mi altında
 * mı kapandığı yüzdeye bakmadan görülüyor.
 */
export function TodayBrief({ quotes }: { quotes: MarketQuote[] }) {
  const lead = quotes.find((quote) => quote.assetType === "index") ?? quotes[0];
  if (!lead) return null;

  const direction = directionOf(lead.changePercent);
  const geometry = lineGeometry(lead.history, VIEW_W, VIEW_H, PAD_Y);
  const digits = priceDigits(lead.assetType);

  const advancing = quotes.filter((quote) => quote.changePercent > 0).length;
  const declining = quotes.filter((quote) => quote.changePercent < 0).length;
  const widest = quotes.reduce((best, quote) =>
    Math.abs(quote.changePercent) > Math.abs(best.changePercent) ? quote : best,
  );

  const today = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(new Date());

  return (
    <section className="card relative isolate overflow-hidden">
      <div className="relative z-10 flex flex-col gap-6 px-6 pt-5 sm:px-8 sm:pt-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="label">Bugün</p>
          <p className="meta text-ink-faint">{today}</p>
        </div>

        {/* Günün okuması. Bu cümle veriden türüyor — sabit bir slogan değil,
            her yüklemede o anki genişliği anlatıyor. */}
        <p className="max-w-[34ch] text-[26px] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:max-w-[42ch] sm:text-[34px]">
          {readOfTheDay(advancing, declining, quotes.length)}
        </p>

        <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
          <div>
            <p className="meta text-ink-faint">{lead.name}</p>
            <p className="figure mt-1 text-[30px] leading-none font-semibold text-ink">
              {formatPrice(lead.price, digits)}
            </p>
            <p className={cn("figure mt-1.5 text-[13px] font-medium", TONE[direction])}>
              {formatSigned(lead.change, digits)} · {formatPercent(lead.changePercent)}
            </p>
          </div>

          <dl className="flex gap-8">
            <Stat label="Artıda" value={`${advancing}`} suffix={`/${quotes.length}`} />
            <Stat label="Ekside" value={`${declining}`} suffix={`/${quotes.length}`} />
            <Stat
              label="En geniş hareket"
              value={widest.symbol}
              suffix={formatPercent(widest.changePercent)}
            />
          </dl>
        </div>
      </div>

      {/* Çizgi. `aria-hidden` değil: tek başına anlam taşıdığı için etiketli. */}
      {geometry ? (
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`${lead.name} son 24 saat: ${formatPercent(lead.changePercent)}`}
          className="mt-6 block h-[120px] w-full sm:h-[150px]"
        >
          <defs>
            <linearGradient id="today-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={STROKE[direction]} stopOpacity="0.16" />
              <stop offset="100%" stopColor={STROKE[direction]} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Açılış referansı: çizginin nereden başladığı. */}
          <line
            x1="0"
            y1={geometry.baselineY}
            x2={VIEW_W}
            y2={geometry.baselineY}
            stroke="var(--color-rule-strong)"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />

          <path d={geometry.area} fill="url(#today-fill)" />
          <path
            d={geometry.line}
            pathLength="1"
            className="draw"
            fill="none"
            stroke={STROKE[direction]}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
    </section>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="figure mt-1.5 text-[15px] font-semibold text-ink">
        {value}
        <span className="ml-1 text-[12px] font-normal text-ink-faint">{suffix}</span>
      </dd>
    </div>
  );
}

/**
 * Günün bir cümlelik okuması. Eşikler kasıtlı olarak keskin: "biraz alıcılı"
 * gibi bir ara ton okura karar verdirmez, yalnız cümleyi uzatır.
 */
function readOfTheDay(advancing: number, declining: number, total: number): string {
  if (total === 0) return "Piyasa verisi henüz akmıyor.";
  if (advancing >= total * 0.7) return "Gün geniş tabanlı alıcılı geçiyor.";
  if (declining >= total * 0.7) return "Satış baskısı izlenen varlıkların geneline yayılmış.";
  return "Piyasa iki yönlü; varlıklar birbirinden ayrışıyor.";
}
