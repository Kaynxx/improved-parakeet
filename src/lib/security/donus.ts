/**
 * Giriş sonrası dönüş hedefi politikası.
 *
 * **Neden ayrı modül:** aynı kural iki yerde gerekiyor — giriş sayfası gizli
 * alanı yazarken ve sunucu eylemi `signIn`'e `redirectTo` verirken. Kural tek
 * kopya olmadığı sürece biri güncellenip diğeri geride kalıyordu; denetimde
 * `/\evil.example` değeri sayfadan geçip 307 `Location` başlığına inmişti.
 *
 * `startsWith("/")` tek başına yetmez: WHATWG URL çözümlemesi `/\host` ve
 * `\\host` biçimlerini protokol-göreli mutlak adres sayar, yani tarayıcı bunu
 * başka bir origin'e götürür.
 */

/** Çözümlemede kullanılan yer tutucu origin — dışarıya hiç çıkmaz. */
const OLCUM_ORIGINI = "http://yerel.gecersiz";

export function guvenliIcYol(raw: string | undefined): string {
  if (!raw) return "/";
  if (!raw.startsWith("/")) return "/";
  // Ters bölü, Windows yolu değil: URL ayrıştırıcısı onu `/` gibi okuyor.
  if (raw.includes("\\")) return "/";
  if (raw.startsWith("//")) return "/";

  let url: URL;
  try {
    url = new URL(raw, OLCUM_ORIGINI);
  } catch {
    return "/";
  }

  // Son savunma: çözümlenen adres yer tutucu origin'den ayrılıyorsa hedef
  // site içi değildir.
  if (url.origin !== OLCUM_ORIGINI) return "/";

  return `${url.pathname}${url.search}`;
}
