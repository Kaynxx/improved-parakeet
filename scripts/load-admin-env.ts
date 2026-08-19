/**
 * Yönetim kapsamı için ortam yükleyici. **Yan etkili import.**
 *
 * `DATABASE_ADMIN_URL` ayrı bir dosyada (`.env.admin.local`) duruyor: şema
 * değiştirme yetkisi olan bağlantı, her `npm run dev` sürecine ve web
 * çalışma zamanına yüklenmemeli. Yalnız migration, seed ve hesap açma
 * script'leri bu dosyayı okur.
 */

import { config } from "dotenv";

config({ path: [".env.admin.local", ".env.local", ".env"], quiet: true });
