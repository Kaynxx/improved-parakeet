/**
 * İşleyici kapsamı için ortam yükleyici. **Yan etkili import.**
 *
 * `DATABASE_WORKER_URL` ayrı dosyada (`.env.worker.local`): haber ve piyasa
 * tablolarına yazan rol, web çalışma zamanına yüklenmesi gerekmeyen bir yetki.
 * Worker süreci de kimlik tablosunu göremediği için bu ayrım gerçek bir sınır.
 */

import { config } from "dotenv";

config({ path: [".env.worker.local", ".env.local", ".env"], quiet: true });
