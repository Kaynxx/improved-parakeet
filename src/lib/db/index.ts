import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

/**
 * Bağlantı **tembel** kurulur. Modül yüklenirken kurulsaydı Next, sayfa
 * yapılandırmasını toplamak için modülü derleme anında değerlendirdiği için
 * `force-dynamic` sayfalarda bile `npm run build` veritabanı olmadan
 * başarısız olurdu.
 */
let cached: Database | null = null;

function connect(): Database {
  const url = process.env.DATABASE_URL;

  if (!url) {
    // Belirsiz bir bağlantı hatası yerine ne eksik olduğunu ve nasıl
    // düzeltileceğini söyle.
    throw new Error(
      [
        "DATABASE_URL tanımlı değil.",
        "",
        "Faz 2A çalışan bir Postgres 16 gerektiriyor:",
        "  1. Proje kökünde:  npm run db:up",
        "  2. .env.local dosyasına:",
        '     DATABASE_URL="postgresql://finans:finans@127.0.0.1:5432/finans"',
      ].join("\n"),
    );
  }

  /**
   * Tek bağlantı havuzu. `globalThis` guard'ı olmadan Next'in dev HMR'ı her
   * kaydetmede yeni bir havuz açar ve bağlantılar tükenir.
   */
  const globalForDb = globalThis as unknown as { finansSql?: ReturnType<typeof postgres> };

  const client =
    globalForDb.finansSql ??
    postgres(url, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.finansSql = client;
  }

  return drizzle(client, { schema });
}

export function getDb(): Database {
  cached ??= connect();
  return cached;
}
