/**
 * Node script'leri için ortam değişkeni yükleyici. **Yan etkili import.**
 *
 * Next.js `.env.local`'i kendi okur; `tsx` ve `drizzle-kit` okumaz. Düz
 * `import "dotenv/config"` yalnız `.env`'e bakar — bu yüzden `.env.local`'deki
 * DATABASE_URL sessizce görünmez kalıyordu.
 *
 * Sıra Next'in önceliğiyle aynı: `.env.local` kazanır, `.env` tamamlar.
 */

import { config } from "dotenv";

config({ path: [".env.local", ".env"], quiet: true });
