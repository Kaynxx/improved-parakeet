import "./scripts/load-env";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL;

if (!url) {
  // `generate` bağlantı kurmaz, o yüzden burada durmuyoruz. Ama `migrate`
  // sessizce varsayılana düşerse yanlış veritabanına migration uygulanır —
  // en azından hangi URL'in kullanıldığı görünsün.
  console.warn(
    "[drizzle.config] DATABASE_URL yok, yerel varsayılana düşülüyor. `.env.local` dosyasını kontrol edin.",
  );
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // `generate` bağlantı kurmaz; yalnız `migrate`/`push` için gerekir.
  dbCredentials: { url: url ?? "postgresql://finans:finans@127.0.0.1:5432/finans" },
  strict: true,
  verbose: true,
});
