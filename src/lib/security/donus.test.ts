import assert from "node:assert/strict";
import test from "node:test";
import { guvenliIcYol } from "./donus";

test("yalnız kök ve site içi yol dönüş hedefi olur", () => {
  assert.equal(guvenliIcYol(undefined), "/");
  assert.equal(guvenliIcYol("/haberler?etiket=makro"), "/haberler?etiket=makro");
});

test("açık yönlendirme biçimleri köke düşer", () => {
  for (const raw of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "\\\\evil.example",
  ]) {
    assert.equal(guvenliIcYol(raw), "/");
  }
});
