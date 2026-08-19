/**
 * Yansıma puanının geçerliliğini denetler.
 * Neden: Form verileri string veya tanımsız gelebilir, veritabanına
 * yazmadan önce kesin olarak 1-7 arası tam sayı olduğundan emin olmalıyız.
 */
export function gecerliYansimaPuaniMi(deger: unknown): deger is number {
  return typeof deger === "number" && Number.isInteger(deger) && deger >= 1 && deger <= 7;
}
