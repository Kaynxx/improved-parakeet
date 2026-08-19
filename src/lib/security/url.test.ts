import assert from "node:assert/strict";
import test from "node:test";
import { guvenliBeslemeUrl, guvenliHariciUrl } from "./url";

test("besleme adresi yalnız HTTPS kabul eder", () => {
  assert.equal(guvenliBeslemeUrl("https://ornek.test/rss.xml"), "https://ornek.test/rss.xml");
  assert.equal(guvenliBeslemeUrl("http://ornek.test/rss.xml"), null);
});

test("besleme adresinde kimlik bilgisi ve şema hilesi reddedilir", () => {
  for (const raw of [
    "https://kullanici:sifre@ornek.test/rss.xml",
    "javascript:alert(1)",
    "data:text/xml,<rss/>",
    "file:///c:/gizli.xml",
    "ornek.test/rss.xml",
  ]) {
    assert.equal(guvenliBeslemeUrl(raw), null);
  }
});

/**
 * Ters bölü ile host gizleme: WHATWG çözümlemesi `\` sonrasını yol sayar, yani
 * gerçek hedef baştaki host'tur. Politika bu adresi reddetmiyor; kaydettiği
 * hedefin görünen host olduğunu garanti ediyor.
 */
test("ters bölülü adres görünen değil gerçek host'a çözülür", () => {
  const normalize = guvenliBeslemeUrl("https://ornek.test\\@evil.test/rss.xml");
  assert.equal(new URL(String(normalize)).hostname, "ornek.test");
});

test("harici bağlantı yalnız HTTP ve HTTPS kabul eder", () => {
  assert.equal(guvenliHariciUrl("https://ornek.test/haber"), "https://ornek.test/haber");
  assert.equal(guvenliHariciUrl("http://ornek.test/haber"), "http://ornek.test/haber");
});

test("harici bağlantıda çalıştırılabilir ve kimlikli şemalar reddedilir", () => {
  for (const raw of [
    undefined,
    "",
    "   ",
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "https://kullanici:sifre@ornek.test/haber",
  ]) {
    assert.equal(guvenliHariciUrl(raw), null);
  }
});
