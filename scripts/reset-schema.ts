/**
 * Şemayı sıfırlar. **Yıkıcı** — bütün tabloları ve veriyi siler.
 *
 * Yönetim kapsamıyla çalışır: web ve işleyici rollerinin DDL yetkisi yok, bu
 * script onlarla çalışmaz (ve çalışmaması doğru).
 *
 * `DROP SCHEMA public CASCADE` şemayı yeniden yarattığı için web/işleyici
 * rollerine verilen tablo yetkileri kaybolur; sonrasında `npm run db:harden`
 * tekrar çalıştırılmalıdır.
 */

import "./load-admin-env";
import { sql } from "drizzle-orm";
import { getDb } from "../src/lib/db";

async function main() {
  const db = getDb("yonetim");
  console.log("Dropping and recreating public schema...");
  await db.execute(sql`DROP SCHEMA public CASCADE;`);
  await db.execute(sql`CREATE SCHEMA public;`);
  console.log("Schema reset. Şimdi: npm run db:harden && npm run db:migrate && npm run seed");
  process.exit(0);
}

main().catch(console.error);
