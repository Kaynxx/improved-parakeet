import assert from "node:assert/strict";
import test from "node:test";
import { olusturGirisKisitlayici } from "./giris-kisitlama";

const PENCERE_MS = 15 * 60 * 1000;

function kisitlayiciKur(baslangic = 1_000_000) {
  let an = baslangic;
  const kisitlayici = olusturGirisKisitlayici({
    maxDeneme: 8,
    pencereMs: PENCERE_MS,
    engelMs: PENCERE_MS,
    simdi: () => an,
  });
  return { kisitlayici, ilerlet: (ms: number) => (an += ms) };
}

test("pencere içindeki sekiz denemeye izin verir, dokuzuncuyu engeller", () => {
  const { kisitlayici } = kisitlayiciKur();

  for (let deneme = 0; deneme < 8; deneme += 1) {
    assert.equal(kisitlayici.izinVar("ornek@eposta.test"), true);
    kisitlayici.basarisizlikKaydet("ornek@eposta.test");
  }

  assert.equal(kisitlayici.izinVar("ornek@eposta.test"), false);
});

test("başarılı giriş sayacı sıfırlar", () => {
  const { kisitlayici } = kisitlayiciKur();

  for (let deneme = 0; deneme < 8; deneme += 1) {
    kisitlayici.basarisizlikKaydet("ornek@eposta.test");
  }
  assert.equal(kisitlayici.izinVar("ornek@eposta.test"), false);

  kisitlayici.basariKaydet("ornek@eposta.test");
  assert.equal(kisitlayici.izinVar("ornek@eposta.test"), true);
});

test("engel süresi geçince yeniden izin verir", () => {
  const { kisitlayici, ilerlet } = kisitlayiciKur();

  for (let deneme = 0; deneme < 8; deneme += 1) {
    kisitlayici.basarisizlikKaydet("ornek@eposta.test");
  }
  assert.equal(kisitlayici.izinVar("ornek@eposta.test"), false);

  ilerlet(PENCERE_MS + 1);
  assert.equal(kisitlayici.izinVar("ornek@eposta.test"), true);
});

test("farklı hesaplar sayaç paylaşmaz, aynı hesap büyük/küçük harften etkilenmez", () => {
  const { kisitlayici } = kisitlayiciKur();

  for (let deneme = 0; deneme < 8; deneme += 1) {
    kisitlayici.basarisizlikKaydet("Ornek@Eposta.Test");
  }

  assert.equal(kisitlayici.izinVar("ornek@eposta.test"), false);
  assert.equal(kisitlayici.izinVar("baska@eposta.test"), true);
});
