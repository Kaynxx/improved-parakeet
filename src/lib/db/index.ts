import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

/**
 * Hangi veritabanı rolüyle bağlanılacak.
 *
 * **Neden üç kapsam:** denetimde tek `DATABASE_URL` vardı ve arkasındaki rol
 * `SUPERUSER`, `CREATEROLE`, `CREATEDB`, `REPLICATION` yetkilerine sahipti.
 * Yani bir sayfa render'ında sızan bağlantı bilgisi bütün cluster'ı veriyordu.
 *
 *   web      → sayfalar, Auth.js, servisler. Okur; yalnız kullanıcıya ait
 *              ilerleme/cevap tablolarına yazar. Şema değiştiremez.
 *   isleyici → worker ve ingest. Haber/piyasa tablolarına yazar; kimlik
 *              tablosunu HİÇ göremez.
 *   yonetim  → migration, seed, hesap açma. Şema sahibi.
 *
 * Kapsam parametre olarak geçiyor, ortam değişkeninden türetilmiyor: aynı
 * süreçte iki kapsam gerekebiliyor (worker hem okur hem yazar) ve "hangi rolle
 * bağlandım" sorusunun cevabı çağrı yerinde görünmeli.
 */
export type DbKapsami = "web" | "isleyici" | "yonetim";

const KAPSAM_DEGISKENI: Record<DbKapsami, string> = {
  web: "DATABASE_URL",
  isleyici: "DATABASE_WORKER_URL",
  yonetim: "DATABASE_ADMIN_URL",
};

/**
 * Bağlantı **tembel** kurulur. Modül yüklenirken kurulsaydı Next, sayfa
 * yapılandırmasını toplamak için modülü derleme anında değerlendirdiği için
 * `force-dynamic` sayfalarda bile `npm run build` veritabanı olmadan
 * başarısız olurdu.
 *
 * Kapsam başına ayrı havuz: tek havuzu paylaşmak, rol ayrımını anlamsız kılardı.
 */
const havuzlar = new Map<DbKapsami, Database>();

function connect(kapsam: DbKapsami): Database {
  const degisken = KAPSAM_DEGISKENI[kapsam];
  const url = process.env[degisken];

  if (!url) {
    /**
     * Hata metni **varsayılan bağlantı dizesi içermez.** Denetimde bu dosyanın
     * hata metni, `.env.example` ve `scripts/db-check.ts` aynı yerel kimlik
     * bilgisini tekrar ediyordu; kimlik bilgisi belgelenmiş bir sır değildir.
     */
    throw new Error(
      [
        `${degisken} tanımlı değil; "${kapsam}" kapsamı bağlanamaz.`,
        "",
        "Yerel kurulum:",
        "  1. npm run db:up",
        "  2. npm run db:harden   (rolleri ve .env dosyalarını üretir)",
      ].join("\n"),
    );
  }

  /**
   * Tek bağlantı havuzu. `globalThis` guard'ı olmadan Next'in dev HMR'ı her
   * kaydetmede yeni bir havuz açar ve bağlantılar tükenir.
   */
  const globalForDb = globalThis as unknown as {
    finansSql?: Partial<Record<DbKapsami, ReturnType<typeof postgres>>>;
  };

  const onbellek = globalForDb.finansSql ?? {};
  const client =
    onbellek[kapsam] ??
    postgres(url, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });

  if (process.env.NODE_ENV !== "production") {
    onbellek[kapsam] = client;
    globalForDb.finansSql = onbellek;
  }

  return drizzle(client, { schema });
}

export function getDb(kapsam: DbKapsami = "web"): Database {
  const mevcut = havuzlar.get(kapsam);
  if (mevcut) return mevcut;

  const yeni = connect(kapsam);
  havuzlar.set(kapsam, yeni);
  return yeni;
}
