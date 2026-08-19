/**
 * Dış adres politikası: neyin çekilebileceği ve neyin kullanıcıya bağlantı
 * olarak verilebileceği.
 *
 * **Neden veri girişinde, render'da değil:** adresler `sources`, `articles` ve
 * `lesson_sources` tablolarına bir kez yazılıyor, her istekte okunuyor. Kötü
 * şemayı render anında yakalamak aynı kontrolü altı bileşende tekrarlamak
 * demekti; burada bir kez tutuluyor.
 *
 * Besleme adresi ile kullanıcıya görünen adres ayrı: besleme sunucunun kendi
 * çektiği hedef (SSRF yüzeyi, yalnız HTTPS), makale/görsel adresi ise
 * yayıncının verdiği ve tarayıcının açtığı hedef (HTTP hâlâ yaygın).
 */

/** Kullanıcı adı/şifre taşıyan adres, hedef host'u gizlemenin klasik yolu. */
function kimliksizMutlakUrl(raw: string | undefined, izinliSemalar: string[]): URL | null {
  if (!raw) return null;
  const kirpilmis = raw.trim();
  if (kirpilmis.length === 0) return null;

  let url: URL;
  try {
    url = new URL(kirpilmis);
  } catch {
    return null;
  }

  if (!izinliSemalar.includes(url.protocol)) return null;
  if (url.username.length > 0 || url.password.length > 0) return null;
  if (url.hostname.length === 0) return null;

  return url;
}

/** Sunucunun kendisi çekecek: yalnız HTTPS. */
export function guvenliBeslemeUrl(raw: string | undefined): string | null {
  return kimliksizMutlakUrl(raw, ["https:"])?.toString() ?? null;
}

/** Tarayıcı açacak ya da `img`/`a` olarak basılacak: HTTP ve HTTPS. */
export function guvenliHariciUrl(raw: string | undefined): string | null {
  return kimliksizMutlakUrl(raw, ["https:", "http:"])?.toString() ?? null;
}
