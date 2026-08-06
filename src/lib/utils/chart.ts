/**
 * Tek serilik çizgi geometrisi. Hem tile'daki mikro grafik hem panelin
 * imzasındaki büyük çizgi buradan çıkıyor — iki ayrı yerde yazılsaydı biri
 * düzeltildiğinde diğeri sessizce sapardı.
 */

export interface LineGeometry {
  /** `d` özniteliği: yalnız çizgi. */
  line: string;
  /** `d` özniteliği: çizginin altını kapatan alan. */
  area: string;
  /** Son noktanın konumu — çapa buraya konur. */
  last: readonly [number, number];
  /** İlk değerin y'si: "açılış" referans çizgisi. */
  baselineY: number;
}

/**
 * @param data kronolojik seri (en eski → en yeni), en az iki nokta
 * @param width viewBox genişliği
 * @param height viewBox yüksekliği
 * @param padY dikey pay — çizgi kutunun kenarına yapışmasın
 */
export function lineGeometry(
  data: number[],
  width: number,
  height: number,
  padY: number,
): LineGeometry | null {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  // Düz seride span 0 olur ve sıfıra bölme çıkar; 1'e sabitlemek çizgiyi
  // ortaya yatay olarak yerleştirir — doğru olan da bu.
  const span = max - min || 1;
  const usableH = height - padY * 2;
  const yOf = (value: number) => padY + (1 - (value - min) / span) * usableH;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    return [x, yOf(value)] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");

  return {
    line,
    area: `${line} L${width} ${height} L0 ${height} Z`,
    last: points[points.length - 1] as readonly [number, number],
    baselineY: yOf(data[0] as number),
  };
}
