/**
 * Taşınabilir Postgres 16 denetleyicisi.
 *
 * Docker yerine `.postgres/` altındaki kurulumsuz Postgres kullanılıyor:
 * yönetici hakkı, WSL2 ve Windows servisi gerektirmez, klasör silinince iz
 * kalmaz. Bu script yalnız o cluster'ı başlatır/durdurur.
 *
 * Çalıştırma:  npm run db:up · npm run db:down · npm run db:status
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const PG_CTL = join(ROOT, ".postgres", "pgsql", "bin", "pg_ctl.exe");
const DATA_DIR = join(ROOT, ".postgres", "data");
const LOG_FILE = join(ROOT, ".postgres", "postgres.log");

/** `pg_ctl status` çıkış kodu: 0 çalışıyor, 3 durmuş, 4 veri dizini yok. */
const RUNNING = 0;

function pgCtl(args: string[]): number {
  const result = spawnSync(PG_CTL, args, { stdio: "inherit" });
  return result.status ?? 1;
}

function isRunning(): boolean {
  const result = spawnSync(PG_CTL, ["-D", DATA_DIR, "status"], { stdio: "ignore" });
  return result.status === RUNNING;
}

function requireInstall(): void {
  if (existsSync(PG_CTL) && existsSync(DATA_DIR)) return;

  console.error(
    [
      "Taşınabilir Postgres bulunamadı.",
      "",
      `  ikili dosyalar : ${existsSync(PG_CTL) ? "var" : "YOK"}  (.postgres/pgsql/bin)`,
      `  veri dizini    : ${existsSync(DATA_DIR) ? "var" : "YOK"}  (.postgres/data)`,
      "",
      "Kurulum (bir kez):",
      "  1. postgresql-16.10-1-windows-x64-binaries.zip indir",
      "     https://get.enterprisedb.com/postgresql/",
      "  2. İçinden yalnız pgsql/bin, pgsql/lib, pgsql/share klasörlerini",
      "     .postgres/ altına çıkar",
      "  3. .postgres/pgsql/bin/initdb -D .postgres/data -U finans \\",
      "       --auth-local=trust --auth-host=scram-sha-256 --encoding=UTF8 --locale=C",
      "  4. npm run db:up  &&  .postgres/pgsql/bin/createdb -h 127.0.0.1 -U finans finans",
    ].join("\n"),
  );
  process.exit(1);
}

const command = process.argv[2];

switch (command) {
  case "up": {
    requireInstall();
    if (isRunning()) {
      console.log("Postgres zaten çalışıyor (127.0.0.1:5432).");
      break;
    }
    process.exit(pgCtl(["-D", DATA_DIR, "-l", LOG_FILE, "-o", "-p 5432", "start"]));
    break;
  }

  case "down": {
    requireInstall();
    if (!isRunning()) {
      console.log("Postgres zaten durmuş.");
      break;
    }
    // `fast`: açık bağlantıları bekleme, ama checkpoint'i temiz kapat.
    process.exit(pgCtl(["-D", DATA_DIR, "-m", "fast", "stop"]));
    break;
  }

  case "status": {
    requireInstall();
    process.exit(pgCtl(["-D", DATA_DIR, "status"]));
    break;
  }

  default:
    console.error("Kullanım: tsx scripts/pg.ts <up|down|status>");
    process.exit(1);
}
