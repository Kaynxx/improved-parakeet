/**
 * Hesap açar. Kayıt sayfası **bilerek yok** — bu kişisel bir panel, tek
 * kullanıcısı var ve açık kayıt sayfası kazanç sağlamadan saldırı yüzeyi
 * ekliyordu.
 *
 * Şifre terminalde sorulur, **ekranda görünmez** ve komut geçmişine yazılmaz;
 * argümandan alınsaydı `.bash_history` içinde düz metin kalırdı.
 *
 * Çalıştırma:  npm run user:create
 * Aynı e-posta ikinci kez verilirse şifre günceller (idempotent).
 */

import "./load-admin-env";

import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { users } from "../src/lib/db/schema";

const MIN_UZUNLUK = 8;

/** Ham modda okurken kontrol karakterleri elle ayirt edilir. */
const CTRL_C = String.fromCharCode(3);
const BACKSPACE = String.fromCharCode(127);
const BACKSPACE_ALT = String.fromCharCode(8);

/** Girdiyi ekrana basmadan okur — `readline` maskeleme sunmuyor, elle yapılıyor. */
async function gizliSor(soru: string): Promise<string> {
  stdout.write(soru);

  const wasRaw = stdin.isRaw ?? false;
  if (stdin.isTTY) stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");

  return new Promise((resolve) => {
    let buffer = "";

    const onData = (chunk: string) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          stdin.off("data", onData);
          if (stdin.isTTY) stdin.setRawMode(wasRaw);
          stdin.pause();
          stdout.write("\n");
          resolve(buffer);
          return;
        }
        if (ch === CTRL_C) {
          // Ham moddayken SIGINT uretilmiyor, elle ele alinmali
          stdout.write("\n");
          process.exit(130);
        }
        if (ch === BACKSPACE || ch === BACKSPACE_ALT) {
          buffer = buffer.slice(0, -1);
          continue;
        }
        buffer += ch;
      }
    };

    stdin.on("data", onData);
  });
}

async function main(): Promise<void> {
  const rl = createInterface({ input: stdin, output: stdout });

  const emailRaw = await rl.question("E-posta: ");
  const nameRaw = await rl.question("Ad (boş bırakılabilir): ");
  rl.close();

  const email = emailRaw.trim().toLocaleLowerCase("tr-TR");
  const name = nameRaw.trim() || null;

  if (!email.includes("@")) {
    console.error("\nGeçerli bir e-posta gerekli.");
    process.exit(1);
  }

  const password = await gizliSor("Şifre (görünmez): ");
  const tekrar = await gizliSor("Şifre tekrar     : ");

  if (password.length < MIN_UZUNLUK) {
    console.error(`\nŞifre en az ${MIN_UZUNLUK} karakter olmalı.`);
    process.exit(1);
  }
  if (password !== tekrar) {
    console.error("\nŞifreler eşleşmiyor.");
    process.exit(1);
  }

  // argon2id varsayılan parametreleriyle; tuz kütüphane tarafından üretilir
  // ve özetin içinde saklanır, ayrı bir sütun gerekmiyor.
  const passwordHash = await hash(password);

  const mevcut = await getDb("yonetim")
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (mevcut[0]) {
    await getDb("yonetim").update(users).set({ passwordHash, name }).where(eq(users.email, email));
    console.log(`\nŞifre güncellendi: ${email}`);
  } else {
    await getDb("yonetim").insert(users).values({ email, name, passwordHash });
    console.log(`\nHesap oluşturuldu: ${email}`);
  }

  console.log("Giriş: http://localhost:3000/giris");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
