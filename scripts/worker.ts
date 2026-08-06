/**
 * Zamanlanmış çekim süreci.
 *
 * Çalıştırma:  npm run worker    (Ctrl+C ile durur)
 *
 * Next sunucusundan **ayrı bir süreç** olması bilinçli: okuma yolu (sayfalar)
 * çekim hatalarından, yavaş feed'lerden ve yeniden derlemelerden etkilenmesin.
 * `systemPatterns.md`'deki okuma/yazma ayrımının uygulaması budur.
 */

import "./load-env";
import cron from "node-cron";
import { ingestAllSources } from "../src/server/integrations/rss/ingest";

/** Her 15 dakikada bir. Haber feed'leri bundan sık güncellenmiyor. */
const SCHEDULE = process.env.INGEST_CRON ?? "*/15 * * * *";

let running = false;

async function tick(trigger: string) {
  // Önceki tur bitmediyse atla — yavaş bir feed turları üst üste bindirmesin.
  if (running) {
    console.log(`[${new Date().toISOString()}] önceki tur sürüyor, ${trigger} atlandı`);
    return;
  }

  running = true;
  try {
    const results = await ingestAllSources();
    const inserted = results.reduce((sum, r) => sum + r.itemsInserted, 0);
    const failed = results.filter((r) => r.status === "error");

    console.log(
      `[${new Date().toISOString()}] ${trigger}: ${inserted} yeni makale, ` +
        `${results.length - failed.length}/${results.length} kaynak başarılı`,
    );
    for (const f of failed) console.log(`    ✗ ${f.source}: ${f.error}`);
  } catch (error) {
    // Worker ölmez: bir turun çökmesi zamanlayıcıyı durdurmamalı.
    console.error(`[${new Date().toISOString()}] tur çöktü:`, error);
  } finally {
    running = false;
  }
}

if (!cron.validate(SCHEDULE)) {
  console.error(`Geçersiz cron ifadesi: "${SCHEDULE}"`);
  process.exit(1);
}

console.log(`Worker çalışıyor. Zamanlama: ${SCHEDULE}`);
console.log("Durdurmak için Ctrl+C.\n");

// Başlangıçta bir tur: worker açıldığında panel hemen tazelensin.
void tick("açılış turu");
cron.schedule(SCHEDULE, () => void tick("zamanlanmış tur"));

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    console.log("\nWorker durduruluyor.");
    process.exit(0);
  });
}
