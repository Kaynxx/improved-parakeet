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
import { upsertMarketQuotes } from "../src/lib/db/queries/market";
import { fiyatlariCek } from "../src/server/integrations/finnhub";
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
    console.error(`[${new Date().toISOString()}] haber turu çöktü:`, error);
  }

  /**
   * Piyasa çekimi **ayrı try içinde**: haberle piyasa birbirinden bağımsız iki
   * kaynak ve birinin çökmesi diğerinin turunu düşürmemeli. Aynı gerekçe
   * `ingestAllSources`'un kaynak başına hata yalıtımında da geçerli.
   */
  try {
    const { basarili, hatalar } = await fiyatlariCek();

    if (basarili.length > 0) {
      await upsertMarketQuotes(
        basarili.map(({ varlik, price, change, changePercent }) => ({
          symbol: varlik.symbol,
          name: varlik.name,
          assetType: varlik.assetType,
          providerSymbol: varlik.providerSymbol,
          proxyFor: varlik.proxyFor,
          price,
          change,
          changePercent,
        })),
      );
    }

    console.log(
      `[${new Date().toISOString()}] ${trigger}: ` +
        `${basarili.length}/${basarili.length + hatalar.length} piyasa sembolü güncellendi`,
    );
    for (const h of hatalar) console.log(`    ✗ ${h.symbol}: ${h.hata}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] piyasa turu çöktü:`, error);
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
