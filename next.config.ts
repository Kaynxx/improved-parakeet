import type { NextConfig } from "next";

/**
 * Yanıt güvenlik politikası (denetim bulgusu HTTP-01).
 *
 * Üretim derlemesinde `/giris` ve `/api/auth/session` yanıtlarında CSP,
 * `X-Frame-Options`, `Referrer-Policy`, `X-Content-Type-Options` ve
 * `Permissions-Policy` yoktu; clickjacking, geniş referrer ve MIME yorumlama
 * savunmaları tamamen uygulama koduna kalmıştı.
 *
 * **`'unsafe-inline'` script için bilinçli:** App Router, RSC yükünü ve
 * bootstrap script'ini satır içi yazıyor. Nonce'a geçmek her yanıtı dinamik
 * yapar ve Next 15.5'te nonce'lu CSP'nin kendisi ayrı bir XSS duyurusunun
 * konusu (GHSA-ffhc-5mcf-pf4q). Bu tek kullanıcılı panelde satır içi script
 * riskini `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` ve
 * `frame-ancestors 'none'` ile sınırlıyoruz.
 *
 * `img-src` http(s) genel: haber görselleri yayıncının alan adından geliyor ve
 * küme önceden bilinemiyor. `frame-src` yalnız YouTube nocookie: ders videosu
 * oradan gömülüyor, başka iframe kaynağı yok.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https: http:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  /**
   * HSTS burada YOK: uygulama yerelde HTTP üzerinden çalışıyor ve tarayıcıya
   * "bu host'a bir daha HTTP ile bağlanma" demek geliştirmeyi kırardı. HTTPS
   * ters vekil arkasına konulduğunda başlık orada verilmelidir.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
