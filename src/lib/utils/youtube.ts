/**
 * YouTube URL'sinden video kimliği çıkarır.
 *
 * **Seed sırasında bir kez çalışır**, render anında değil: bozuk bir URL
 * kullanıcıya değil, içerik yazarına — seed çıktısında — görünsün.
 *
 * Regex yerine `URL` ayrıştırıcısı kullanılıyor; YouTube'un beş ayrı bağlantı
 * biçimi var ve tek bir düzenli ifadeyle hepsini doğru yakalamak, yanlış
 * pozitif üretmeden, pratikte mümkün değil.
 */
export function youtubeIdFromUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  // youtu.be/VIDEOID
  if (host === "youtu.be") {
    return normalize(url.pathname.slice(1));
  }

  if (host !== "youtube.com" && host !== "m.youtube.com" && host !== "youtube-nocookie.com") {
    return null;
  }

  // youtube.com/watch?v=VIDEOID
  const v = url.searchParams.get("v");
  if (v) return normalize(v);

  // youtube.com/embed/VIDEOID · /shorts/VIDEOID · /live/VIDEOID · /v/VIDEOID
  const segments = url.pathname.split("/").filter(Boolean);
  const [head, tail] = segments;
  if (head && tail && ["embed", "shorts", "live", "v"].includes(head)) {
    return normalize(tail);
  }

  return null;
}

/** YouTube kimlikleri 11 karakter, URL-güvenli base64 alfabesinden. */
function normalize(candidate: string): string | null {
  const id = candidate.split(/[?&#]/)[0] ?? "";
  return /^[\w-]{11}$/.test(id) ? id : null;
}

/**
 * Gömme adresi. `youtube-nocookie.com` bilinçli: kullanıcı oynat'a basana
 * kadar YouTube izleme çerezi yazılmıyor.
 *
 * `rel=0` ilgili videoları aynı kanalla sınırlar (YouTube 2018'den beri
 * tamamen kapatmaya izin vermiyor), `modestbranding` logoyu küçültür.
 */
export function youtubeEmbedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`;
}

/** İzleme adresi — "YouTube'da aç" bağlantısı için. */
export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
