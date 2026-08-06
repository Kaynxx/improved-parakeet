/**
 * Tek seferlik haber çekimi.
 *
 * Çalıştırma:  npm run ingest
 *
 * Zamanlanmış hâli için `scripts/worker.ts`. İkisi de aynı `ingestAllSources()`
 * fonksiyonunu çağırır — çekirdek tek yerde, sarmalayıcılar ince.
 */

import "./load-env";
import { ingestAllSources } from "../src/server/integrations/rss/ingest";

async function main() {
  console.log("Çekim başlıyor…\n");
  const started = Date.now();
  const results = await ingestAllSources();

  let totalInserted = 0;
  let failed = 0;

  for (const result of results) {
    if (result.status === "error") {
      failed++;
      console.log(`  ✗ ${result.source.padEnd(18)} ${result.error}`);
      continue;
    }
    totalInserted += result.itemsInserted;
    console.log(
      `  ✓ ${result.source.padEnd(18)} ${String(result.itemsInserted).padStart(3)} yeni / ` +
        `${String(result.itemsSeen).padStart(3)} kayıt · ${result.tickerLinks} sembol bağı`,
    );
  }

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `\n${totalInserted} yeni makale · ${results.length - failed}/${results.length} kaynak başarılı · ${seconds} sn`,
  );

  if (failed === results.length && results.length > 0) {
    console.error("\nHiçbir kaynak çekilemedi.");
    process.exit(1);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error("\nÇekim başarısız:\n", error);
  process.exit(1);
});
