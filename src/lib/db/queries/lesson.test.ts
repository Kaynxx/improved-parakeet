import assert from "node:assert/strict";
import test from "node:test";
import { type GeriBildirimSatiri, enYeniGeriBildirimiSec } from "./lesson";

function satir(
  answerId: string,
  createdAt: string,
  score: number,
): GeriBildirimSatiri {
  return {
    answerId,
    model: "claude-opus-5",
    score,
    strengths: [],
    gaps: [],
    feedbackMd: "geri bildirim",
    followUp: null,
    createdAt: new Date(createdAt),
  };
}

test("cevap başına en yeni değerlendirmeyi seçer", () => {
  const harita = enYeniGeriBildirimiSec(
    [
      satir("cevap-1", "2026-08-02T00:00:00Z", 90),
      satir("cevap-1", "2026-08-01T00:00:00Z", 40),
    ],
    ["cevap-1"],
  );

  assert.equal(harita.get("cevap-1")?.score, 90);
});

test("istenmeyen cevabın değerlendirmesi haritaya girmez", () => {
  const harita = enYeniGeriBildirimiSec(
    [satir("baska-kullanici-cevabi", "2026-08-02T00:00:00Z", 70)],
    ["cevap-1"],
  );

  assert.equal(harita.size, 0);
});

test("boş cevap listesi boş harita döndürür", () => {
  assert.equal(enYeniGeriBildirimiSec([satir("cevap-1", "2026-08-02T00:00:00Z", 70)], []).size, 0);
});
