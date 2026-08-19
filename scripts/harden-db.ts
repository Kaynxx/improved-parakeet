/**
 * Veritabanı rollerini en az yetkiye indirir. **Yerel, idempotent, tekrar
 * çalıştırılabilir.**
 *
 * Çalıştırma:  npm run db:harden
 *
 * Denetim bulgusu (DB-01): uygulama `finans/finans` ile bağlanıyordu; bu kimlik
 * `.env.example`, `src/lib/db/index.ts` hata metni ve `scripts/db-check.ts`
 * içinde yazılıydı ve rol `SUPERUSER`, `CREATEROLE`, `CREATEDB`, `REPLICATION`
 * yetkilerine sahipti. Aynı makinedeki her süreç bilinen bir parolayla tüm
 * cluster'ı alıyordu.
 *
 * Bu script üç rol kurar:
 *   finans_admin  → şema sahibi. Migration, seed, hesap açma.
 *   finans_web    → okuma + kullanıcıya ait ilerleme/cevap yazımı. DDL yok.
 *   finans_worker → haber/piyasa yazımı. Kimlik tablosuna erişimi YOK.
 *
 * Parolalar burada üretilir, dosyaya yazılır ve **ekrana basılmaz.** Bootstrap
 * rolünün parolası da döndürülür; rol silinmez, çünkü cluster'ın kurtarma
 * hesabı ve Postgres ondan superuser yetkisini almayı reddediyor.
 */

import { randomBytes } from "node:crypto";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import postgres from "postgres";
import "./load-admin-env";

const ROOT = join(import.meta.dirname, "..");
/**
 * Kurulum bağlantısı **superuser olmak zorunda**: rol yaratmak ve sahiplik
 * devretmek başka yetkiyle yapılamıyor. İlk çalıştırmada initdb varsayılanı,
 * sonraki çalıştırmalarda `.env.admin.local` içindeki döndürülmüş parola.
 *
 * `DATABASE_ADMIN_URL`e düşmek bilinçli olarak yok: `finans_admin` superuser
 * değil, o URL ile bu script sessizce yarıda kalırdı.
 */
const BOOTSTRAP_URL =
  process.env.DATABASE_BOOTSTRAP_URL ?? "postgresql://finans:finans@127.0.0.1:5432/finans";

const YONETIM_ROLU = "finans_admin";
const WEB_ROLU = "finans_web";
const ISLEYICI_ROLU = "finans_worker";
const ESKI_ROL = "finans";

/** Kimlik tabloları: işleyici bunları hiç görmemeli. */
const ISLEYICI_OKUR = [
  "sources",
  "tickers",
  "articles",
  "article_tickers",
  "ingestion_runs",
  "market_quotes",
  "market_daily",
] as const;

const ISLEYICI_YAZAR = [
  "sources",
  "articles",
  "article_tickers",
  "ingestion_runs",
  "market_quotes",
  "market_daily",
] as const;

/** Web'in yazabildiği tek küme: kullanıcının kendi ilerlemesi ve cevapları. */
const WEB_YAZAR = ["user_progress", "lesson_answers", "answer_feedback"] as const;

function parolaUret(): string {
  // 32 bayt base64url: sözlük saldırısına kapalı ve bağlantı dizesinde
  // kaçış gerektirmeyen alfabe.
  return randomBytes(32).toString("base64url");
}

function baglantiDizesi(rol: string, parola: string): string {
  return `postgresql://${rol}:${encodeURIComponent(parola)}@127.0.0.1:5432/finans`;
}

/**
 * Var olan `.env` dosyasındaki diğer anahtarları koruyarak tek değişkeni yazar.
 * Dosya bir kez geçici ada yazılıp `rename` ile taşınıyor: yarım yazılmış bir
 * `.env.local`, uygulamayı sırsız bırakırdı.
 */
function envYaz(dosyaAdi: string, degisken: string, deger: string): string {
  const yol = join(ROOT, dosyaAdi);

  let satirlar: string[] = [];
  try {
    satirlar = readFileSync(yol, "utf8").split(/\r?\n/);
  } catch {
    satirlar = [];
  }

  const yeniSatir = `${degisken}="${deger}"`;
  const index = satirlar.findIndex((satir) => satir.trimStart().startsWith(`${degisken}=`));

  if (index >= 0) {
    satirlar[index] = yeniSatir;
  } else {
    if (satirlar.length > 0 && satirlar[satirlar.length - 1] !== "") satirlar.push("");
    satirlar.push(yeniSatir, "");
  }

  const geciciYol = `${yol}.tmp`;
  writeFileSync(geciciYol, satirlar.join("\n"), { encoding: "utf8", mode: 0o600 });
  renameSync(geciciYol, yol);

  return yol;
}

const sql = postgres(BOOTSTRAP_URL, { max: 1 });

async function rolKurVeParolaAta(rol: string): Promise<string> {
  const parola = parolaUret();

  const [mevcut] = await sql<{ rolname: string }[]>`
    SELECT rolname FROM pg_roles WHERE rolname = ${rol}
  `;

  // Rol adı sabit listeden geliyor; Postgres kimlik yerine parametre kabul
  // etmediği için `unsafe` şart, fakat girdi kullanıcıdan gelmiyor.
  if (mevcut) {
    await sql.unsafe(
      `ALTER ROLE ${rol} WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD '${parola.replace(/'/g, "''")}'`,
    );
  } else {
    await sql.unsafe(
      `CREATE ROLE ${rol} WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD '${parola.replace(/'/g, "''")}'`,
    );
  }

  return parola;
}

/** `public` şemasındaki tablo, dizi ve enum tiplerini yönetim rolüne devreder. */
async function schemaSahipligiDevret(): Promise<void> {
  const tablolar = await sql<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `;
  for (const { tablename } of tablolar) {
    await sql.unsafe(`ALTER TABLE public."${tablename}" OWNER TO ${YONETIM_ROLU}`);
  }

  const diziler = await sql<{ sequencename: string }[]>`
    SELECT sequencename FROM pg_sequences WHERE schemaname = 'public'
  `;
  for (const { sequencename } of diziler) {
    await sql.unsafe(`ALTER SEQUENCE public."${sequencename}" OWNER TO ${YONETIM_ROLU}`);
  }

  const tipler = await sql<{ typname: string }[]>`
    SELECT t.typname
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public' AND t.typtype = 'e'
  `;
  for (const { typname } of tipler) {
    await sql.unsafe(`ALTER TYPE public."${typname}" OWNER TO ${YONETIM_ROLU}`);
  }
}

async function main(): Promise<void> {
  const yonetimParolasi = await rolKurVeParolaAta(YONETIM_ROLU);
  const webParolasi = await rolKurVeParolaAta(WEB_ROLU);
  const isleyiciParolasi = await rolKurVeParolaAta(ISLEYICI_ROLU);

  // --- Herkese açık varsayılan yetkiler kapatılıyor -----------------------
  await sql.unsafe(`REVOKE ALL ON DATABASE finans FROM PUBLIC`);
  await sql.unsafe(`REVOKE ALL ON SCHEMA public FROM PUBLIC`);
  await sql.unsafe(`REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC`);
  await sql.unsafe(`REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC`);

  // --- Yönetim rolü: şema sahibi -----------------------------------------
  await sql.unsafe(`GRANT CONNECT ON DATABASE finans TO ${YONETIM_ROLU}`);
  await sql.unsafe(`ALTER SCHEMA public OWNER TO ${YONETIM_ROLU}`);
  await sql.unsafe(`GRANT ALL ON SCHEMA public TO ${YONETIM_ROLU}`);
  await sql.unsafe(`GRANT ALL ON ALL TABLES IN SCHEMA public TO ${YONETIM_ROLU}`);
  await sql.unsafe(`GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${YONETIM_ROLU}`);
  /**
   * Mevcut tablolar `finans` tarafından oluşturulmuştu; sahiplik yönetime
   * geçmeli ki migration `ALTER TABLE` yapabilsin.
   *
   * `REASSIGN OWNED BY finans` denendi ve **başarısız**: bootstrap rolü
   * veritabanının kendisi gibi sistem nesnelerinin de sahibi ve Postgres
   * bunları devretmeyi reddediyor (`2BP01`). Bu yüzden yalnız `public`
   * şemasındaki tablo, dizi ve enum tipleri tek tek devrediliyor.
   */
  await schemaSahipligiDevret();

  // --- Web rolü: oku, yalnız kullanıcı verisine yaz ----------------------
  await sql.unsafe(`GRANT CONNECT ON DATABASE finans TO ${WEB_ROLU}`);
  await sql.unsafe(`GRANT USAGE ON SCHEMA public TO ${WEB_ROLU}`);
  await sql.unsafe(`GRANT SELECT ON ALL TABLES IN SCHEMA public TO ${WEB_ROLU}`);
  for (const tablo of WEB_YAZAR) {
    await sql.unsafe(`GRANT INSERT, UPDATE ON TABLE ${tablo} TO ${WEB_ROLU}`);
  }

  // --- İşleyici rolü: yalnız haber ve piyasa -----------------------------
  await sql.unsafe(`GRANT CONNECT ON DATABASE finans TO ${ISLEYICI_ROLU}`);
  await sql.unsafe(`GRANT USAGE ON SCHEMA public TO ${ISLEYICI_ROLU}`);
  for (const tablo of ISLEYICI_OKUR) {
    await sql.unsafe(`GRANT SELECT ON TABLE ${tablo} TO ${ISLEYICI_ROLU}`);
  }
  for (const tablo of ISLEYICI_YAZAR) {
    await sql.unsafe(`GRANT INSERT, UPDATE ON TABLE ${tablo} TO ${ISLEYICI_ROLU}`);
  }

  // --- Gelecekte üretilecek tablolar -------------------------------------
  await sql.unsafe(
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${YONETIM_ROLU} IN SCHEMA public GRANT SELECT ON TABLES TO ${WEB_ROLU}`,
  );
  await sql.unsafe(
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${YONETIM_ROLU} IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO ${WEB_ROLU}`,
  );

  // --- Ortam dosyaları ---------------------------------------------------
  /**
   * Bootstrap rolünün parolası da rastgeleye çevriliyor. **Neden kapatılmıyor:**
   * `ALTER ROLE finans WITH NOLOGIN NOSUPERUSER` denendi ve Postgres reddetti
   * (`0A000`, "The bootstrap user must have the SUPERUSER attribute") — initdb
   * ile yaratılan rol cluster'ın kurtarma hesabı. Bulgunun özü zaten bilinen
   * parolaydı; rastgele parola onu ortadan kaldırıyor.
   *
   * Bedeli açık: `.env.admin.local` okuyan bir süreç superuser bağlantısını da
   * görür. Dosya `0600` ve git'te izlenmiyor.
   */
  const bootstrapParolasi = parolaUret();

  const yazilan = [
    envYaz(".env.local", "DATABASE_URL", baglantiDizesi(WEB_ROLU, webParolasi)),
    envYaz(
      ".env.worker.local",
      "DATABASE_WORKER_URL",
      baglantiDizesi(ISLEYICI_ROLU, isleyiciParolasi),
    ),
    envYaz(".env.admin.local", "DATABASE_ADMIN_URL", baglantiDizesi(YONETIM_ROLU, yonetimParolasi)),
    envYaz(
      ".env.admin.local",
      "DATABASE_BOOTSTRAP_URL",
      baglantiDizesi(ESKI_ROL, bootstrapParolasi),
    ),
  ];

  // Parola ancak dosyalar yazıldıktan sonra döndürülür: sıra ters olsaydı
  // yazma hatası cluster'ı erişilemez bırakırdı.
  await sql.unsafe(
    `ALTER ROLE ${ESKI_ROL} WITH PASSWORD '${bootstrapParolasi.replace(/'/g, "''")}'`,
  );

  console.log("Roller hazır:", [YONETIM_ROLU, WEB_ROLU, ISLEYICI_ROLU].join(", "));
  console.log(`"${ESKI_ROL}" bootstrap rolünün parolası döndürüldü (bilinen parola kaldı yok).`);
  console.log("Yazılan dosyalar (içerik ekrana basılmadı):");
  for (const yol of new Set(yazilan)) console.log(`  ${yol}`);

  await sql.end();
}

main().catch(async (error) => {
  console.error("\nRol sertleştirme başarısız:\n", error);
  await sql.end({ timeout: 1 });
  process.exit(1);
});
