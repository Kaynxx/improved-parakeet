import "./scripts/load-admin-env";
import { defineConfig } from "drizzle-kit";

/**
 * Migration **yönetim rolüyle** çalışır: web ve işleyici rollerinin DDL
 * yetkisi yok. Varsayılan bağlantı dizesine düşmek de kaldırıldı — denetimde
 * bilinen bir kimlik bilgisinin üç dosyada tekrarlanması DB-01 bulgusunun
 * parçasıydı ve sessiz varsayılan yanlış veritabanına migration uygulama
 * riskini taşıyordu.
 */
const url = process.env.DATABASE_ADMIN_URL;

if (!url) {
  throw new Error(
    [
      "DATABASE_ADMIN_URL tanımlı değil; migration uygulanamaz.",
      "",
      "  npm run db:up && npm run db:harden",
    ].join("\n"),
  );
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
