# AI Tek Kapı (istemci.ts) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Anthropic-specific evaluator client with a single OpenAI-compatible gateway (`src/server/ai/istemci.ts`) so every AI call in this app — today only the academy evaluator — goes through one door, pointed at the local Antigravity proxy (`gemini-3-flash`).

**Architecture:** `istemci.ts` owns transport (base URL + key, from env) and hands back a plain `OpenAI` client; callers pick their own model per call. `degerlendir.ts` keeps its exact public contract (`degerlendir`, `DegerlendiriciYok`, `MODEL`) so `lesson-practice.ts` needs no change. Pure JSON-parsing/validation logic is split into `degerlendir.logic.ts` so it can be unit-tested without a network call — matching this repo's existing `X.ts` (I/O, untested) + `X.logic.ts` (pure, `node:test`-covered) split used by `lesson-practice.ts`/`lesson-practice.logic.ts`.

**Tech Stack:** `openai` npm package (official Node SDK, v7.5.0) replaces `@anthropic-ai/sdk`. `zod` (already a dependency) validates the model's JSON response since `response_format: { type: "json_object" }` is not provider-enforced.

**Design source:** `docs/superpowers/specs/2026-08-20-ai-tek-kapi-design.md`

## Global Constraints

- Code, comments, identifiers, and UI text stay Turkish (`CLAUDE.md:7-8`).
- After every task's code changes: run `npm run format`, then `npm run typecheck` and `npm run lint` before considering the task done (`CLAUDE.md:219-220`). Full commands only — never partial/skipped steps counted as passing (`CLAUDE.md:174-178`).
- `src/server/ai/` stays the AI boundary layer; pages/components never import it directly (`CLAUDE.md:38-49`).
- `.env.local` is git-ignored and already carries working `AI_BASE_URL` / `AI_API_KEY` values (set outside this plan, by explicit user decision this session) — no task writes secret values into any committed file.
- `DegerlendiriciYok` must remain a thrown error type distinguishable via `instanceof` — `lesson-practice.ts:100` depends on this exact check and is out of scope for this plan.

---

### Task 1: Generic AI gateway (`istemci.ts`)

**Files:**
- Modify: `package.json` (add `openai`, keep `@anthropic-ai/sdk` for now — removed in Task 4 once nothing imports it)
- Create: `src/server/ai/istemci.ts`
- Test: `src/server/ai/istemci.test.ts`

**Interfaces:**
- Produces: `aiIstemcisi(): OpenAI` — returns a cached `OpenAI` client built from `process.env.AI_BASE_URL` / `process.env.AI_API_KEY`; throws `AiIstemcisiYok` if either is unset.
- Produces: `export class AiIstemcisiYok extends Error`.

- [ ] **Step 1: Install the `openai` dependency**

Run: `npm install openai`
Expected: `package.json` dependencies gains `"openai": "^7.5.0"` (or newer patch), `package-lock.json` updates, exit 0.

- [ ] **Step 2: Write the failing test**

Create `src/server/ai/istemci.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";

async function istemciModuluYukle() {
  try {
    return await import("./istemci");
  } catch (hata) {
    const neden = hata instanceof Error ? hata.message : String(hata);
    assert.fail(`./istemci: uygulama henüz yok (${neden})`);
  }
}

function ortamiYedekle() {
  return { baseURL: process.env.AI_BASE_URL, apiKey: process.env.AI_API_KEY };
}

function ortamiGeriYukle(onceki: { baseURL: string | undefined; apiKey: string | undefined }) {
  if (onceki.baseURL === undefined) delete process.env.AI_BASE_URL;
  else process.env.AI_BASE_URL = onceki.baseURL;
  if (onceki.apiKey === undefined) delete process.env.AI_API_KEY;
  else process.env.AI_API_KEY = onceki.apiKey;
}

test("AI_BASE_URL veya AI_API_KEY eksikken AiIstemcisiYok fırlatır", async () => {
  const onceki = ortamiYedekle();
  delete process.env.AI_BASE_URL;
  delete process.env.AI_API_KEY;
  try {
    const modul = (await istemciModuluYukle()) as typeof import("./istemci");
    assert.throws(() => modul.aiIstemcisi(), modul.AiIstemcisiYok);
  } finally {
    ortamiGeriYukle(onceki);
  }
});

test("her iki değişken tanımlıyken çalışan bir OpenAI istemcisi döner", async () => {
  const onceki = ortamiYedekle();
  process.env.AI_BASE_URL = "http://127.0.0.1:8045/v1";
  process.env.AI_API_KEY = "test-anahtar";
  try {
    const modul = (await istemciModuluYukle()) as typeof import("./istemci");
    const client = modul.aiIstemcisi();
    assert.equal(typeof client.chat.completions.create, "function");
  } finally {
    ortamiGeriYukle(onceki);
  }
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --import tsx --test src/server/ai/istemci.test.ts`
Expected: FAIL — `./istemci: uygulama henüz yok` (module not found).

- [ ] **Step 4: Implement `istemci.ts`**

Create `src/server/ai/istemci.ts`:

```ts
import "server-only";

import OpenAI from "openai";

/**
 * Uygulamadaki her AI çağrısının tek geçtiği kapı. Sağlayıcı OpenAI-uyumlu
 * bir base_url + api_key ile tanımlanır (bugün: yerel Antigravity proxy'si,
 * model gemini-3-flash); sağlayıcı değişirse yalnız AI_BASE_URL/AI_API_KEY
 * değişir, çağıran kod değişmez. Model seçimi çağırana aittir — kapı bir
 * model dayatmaz.
 */
export class AiIstemcisiYok extends Error {
  constructor() {
    super("AI_BASE_URL / AI_API_KEY tanımlı değil.");
    this.name = "AiIstemcisiYok";
  }
}

let istemci: OpenAI | undefined;

export function aiIstemcisi(): OpenAI {
  if (istemci) return istemci;

  const baseURL = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  if (!baseURL || !apiKey) throw new AiIstemcisiYok();

  istemci = new OpenAI({ baseURL, apiKey });
  return istemci;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --import tsx --test src/server/ai/istemci.test.ts`
Expected: 2 tests PASS, exit 0.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/server/ai/istemci.ts src/server/ai/istemci.test.ts
git commit -m "feat: tek AI kapisi (istemci.ts) ekle"
```

---

### Task 2: Pure evaluation-response parsing (`degerlendir.logic.ts`)

**Files:**
- Create: `src/server/ai/degerlendir.logic.ts`
- Test: `src/server/ai/degerlendir.logic.test.ts`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `DegerlendirmeSemasi` (zod schema), `Degerlendirme` (inferred type), `ayristirDegerlendirme(hamJson: string): Degerlendirme` — parses/validates a raw JSON string and clamps `puan` to `[0, 100]`. Task 3 imports all three.

- [ ] **Step 1: Write the failing test**

Create `src/server/ai/degerlendir.logic.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";

async function mantikModuluYukle() {
  try {
    return await import("./degerlendir.logic");
  } catch (hata) {
    const neden = hata instanceof Error ? hata.message : String(hata);
    assert.fail(`./degerlendir.logic: uygulama henüz yok (${neden})`);
  }
}

const TABAN_ALANLAR = {
  guclu_yanlar: [] as string[],
  eksikler: [] as string[],
  geri_bildirim_md: "x",
  takip_sorusu: "y",
};

test("geçerli JSON'u ayrıştırır ve alanları korur", async () => {
  const modul = (await mantikModuluYukle()) as typeof import("./degerlendir.logic");
  const ham = JSON.stringify({
    puan: 72.4,
    guclu_yanlar: ["Fisher denklemini doğru kurmuş"],
    eksikler: ["Reel faizi ayırmamış"],
    geri_bildirim_md: "İyi başlangıç ama eksik var.",
    takip_sorusu: "Reel faiz nominalden nasıl ayrılır?",
  });
  const sonuc = modul.ayristirDegerlendirme(ham);
  assert.equal(sonuc.puan, 72);
  assert.deepEqual(sonuc.guclu_yanlar, ["Fisher denklemini doğru kurmuş"]);
  assert.deepEqual(sonuc.eksikler, ["Reel faizi ayırmamış"]);
  assert.equal(sonuc.geri_bildirim_md, "İyi başlangıç ama eksik var.");
  assert.equal(sonuc.takip_sorusu, "Reel faiz nominalden nasıl ayrılır?");
});

test("aralık dışı puanı 0-100'e sınırlar", async () => {
  const modul = (await mantikModuluYukle()) as typeof import("./degerlendir.logic");
  const ustSinir = modul.ayristirDegerlendirme(JSON.stringify({ ...TABAN_ALANLAR, puan: 140 }));
  const altSinir = modul.ayristirDegerlendirme(JSON.stringify({ ...TABAN_ALANLAR, puan: -30 }));
  assert.equal(ustSinir.puan, 100);
  assert.equal(altSinir.puan, 0);
});

test("geçersiz JSON'da açık hata fırlatır", async () => {
  const modul = (await mantikModuluYukle()) as typeof import("./degerlendir.logic");
  assert.throws(() => modul.ayristirDegerlendirme("bu json değil"), /geçerli JSON döndürmedi/);
});

test("şemaya uymayan yanıtta açık hata fırlatır", async () => {
  const modul = (await mantikModuluYukle()) as typeof import("./degerlendir.logic");
  assert.throws(() => modul.ayristirDegerlendirme(JSON.stringify({ puan: 50 })), /şemaya uymayan/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test src/server/ai/degerlendir.logic.test.ts`
Expected: FAIL — `./degerlendir.logic: uygulama henüz yok` (module not found).

- [ ] **Step 3: Implement `degerlendir.logic.ts`**

Create `src/server/ai/degerlendir.logic.ts`:

```ts
import { z } from "zod";

export const DegerlendirmeSemasi = z.object({
  puan: z.number().describe("0-100 arası, ölçütteki maddelerin karşılanma oranı"),
  guclu_yanlar: z.array(z.string()).describe("Cevabın ölçüte göre doğru yaptıkları"),
  eksikler: z.array(z.string()).describe("Ölçütte istenip cevapta bulunmayanlar"),
  geri_bildirim_md: z.string().describe("Öğrenciye hitap eden kısa geri bildirim, markdown"),
  takip_sorusu: z.string().describe("Düşünmeyi sürdürecek tek bir soru"),
});

export type Degerlendirme = z.infer<typeof DegerlendirmeSemasi>;

/**
 * Modelin döndürdüğü ham JSON metnini doğrular ve puanı 0-100 aralığına
 * sınırlar. `json_object` modu şemayı sağlayıcı tarafında zorlamadığı için bu
 * doğrulama şart — model şemaya uymayan bir yanıt döndürürse burada açık bir
 * hata fırlatılır, sessizce yutulmaz.
 */
export function ayristirDegerlendirme(hamJson: string): Degerlendirme {
  let ayrisan: unknown;
  try {
    ayrisan = JSON.parse(hamJson);
  } catch (hata) {
    const neden = hata instanceof Error ? hata.message : String(hata);
    throw new Error(`Değerlendirme çözümlenemedi; model geçerli JSON döndürmedi (${neden}).`);
  }

  const sonuc = DegerlendirmeSemasi.safeParse(ayrisan);
  if (!sonuc.success) {
    throw new Error(
      `Değerlendirme çözümlenemedi; model şemaya uymayan bir yanıt döndürdü: ${sonuc.error.message}`,
    );
  }

  return { ...sonuc.data, puan: Math.max(0, Math.min(100, Math.round(sonuc.data.puan))) };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --import tsx --test src/server/ai/degerlendir.logic.test.ts`
Expected: 4 tests PASS, exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/server/ai/degerlendir.logic.ts src/server/ai/degerlendir.logic.test.ts
git commit -m "feat: degerlendirme yanitini dogrulayan saf mantigi ayir"
```

---

### Task 3: Rewrite `degerlendir.ts` on the new gateway

**Files:**
- Modify: `src/server/ai/degerlendir.ts` (full rewrite of the client-construction/call section; public exports unchanged)

**Interfaces:**
- Consumes: `aiIstemcisi`, `AiIstemcisiYok` from `./istemci` (Task 1); `DegerlendirmeSemasi`, `Degerlendirme`, `ayristirDegerlendirme` from `./degerlendir.logic` (Task 2).
- Produces (unchanged, consumed by `src/server/services/lesson-practice.ts:10`): `MODEL: string`, `class DegerlendiriciYok extends Error`, `async function degerlendir({ soru, olcut, cevap }): Promise<Degerlendirme>`.

This task has no new unit test — `degerlendir()` is I/O orchestration (network call), matching this repo's convention that `X.ts` I/O wrappers are verified via smoke test, not `node:test` mocks (see `lesson-practice.ts`, `finnhub.ts` — neither has a unit test; only their pure `.logic` siblings do). Task 6 smoke-tests this function against the live Antigravity proxy.

- [ ] **Step 1: Replace the file contents**

Replace `src/server/ai/degerlendir.ts` in full with:

```ts
import "server-only";

import OpenAI, { APIConnectionError } from "openai";
import type { ChatCompletion } from "openai/resources/chat/completions";

import { AiIstemcisiYok, aiIstemcisi } from "@/server/ai/istemci";
import { type Degerlendirme, ayristirDegerlendirme } from "@/server/ai/degerlendir.logic";

/** Değerlendiren model. Puan geçmişi hangi modelin verdiğiyle birlikte saklanır. */
export const MODEL = "gemini-3-flash";

export class DegerlendiriciYok extends Error {
  constructor() {
    super("Değerlendirici bağlı değil.");
    this.name = "DegerlendiriciYok";
  }
}

const SISTEM = `Sen ileri seviye bir parasal iktisat dersinin değerlendiricisisin.

Öğrencinin cevabını YALNIZCA verilen ölçüte göre puanla. Ölçütte olmayan bir
şeyi eksik sayma; ölçütteki bir maddeyi karşılıyorsa, ifade biçimi farklı olsa
bile karşılanmış say.

Puanlama: her ölçüt maddesi eşit ağırlıkta. Hepsi karşılanmışsa 100'e yakın,
hiçbiri karşılanmamışsa 0'a yakın puan ver. Kısmi karşılamayı kısmi puanla.

Geri bildirim doğrudan öğrenciye hitap etsin, Türkçe olsun ve kısa olsun.
Övgüyle başlama; neyin doğru neyin eksik olduğunu söyle. Cevabı senin yerine
yazma — eksik olanı nasıl düşüneceğini göster.

Takip sorusu, öğrencinin cevabındaki en zayıf noktayı derinleştirsin.

Yanıtını YALNIZCA şu alanları içeren geçerli bir JSON nesnesi olarak ver,
başka hiçbir metin ekleme:
- "puan": 0-100 arası sayı
- "guclu_yanlar": string dizisi
- "eksikler": string dizisi
- "geri_bildirim_md": markdown, kısa metin
- "takip_sorusu": tek bir soru, string`;

interface DegerlendirmeIstegi {
  soru: string;
  olcut: string;
  cevap: string;
}

/**
 * Bir cevabı ölçüte göre değerlendirir.
 *
 * AI kapısı yapılandırılmamışsa veya sağlayıcıya bağlanılamıyorsa
 * `DegerlendiriciYok` fırlatır — çağıran taraf bunu kullanıcıya
 * "değerlendirici bağlı değil" olarak gösterir. Uygulamanın geri kalanı
 * bu durumda da çalışmaya devam eder.
 */
export async function degerlendir({
  soru,
  olcut,
  cevap,
}: DegerlendirmeIstegi): Promise<Degerlendirme> {
  let client: OpenAI;
  try {
    client = aiIstemcisi();
  } catch (hata) {
    if (hata instanceof AiIstemcisiYok) throw new DegerlendiriciYok();
    throw hata;
  }

  let tamamlama: ChatCompletion;
  try {
    tamamlama = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SISTEM },
        {
          role: "user",
          content: [
            "<soru>",
            soru,
            "</soru>",
            "",
            "<olcut>",
            olcut,
            "</olcut>",
            "",
            "<ogrenci_cevabi>",
            cevap,
            "</ogrenci_cevabi>",
          ].join("\n"),
        },
      ],
    });
  } catch (hata) {
    if (hata instanceof APIConnectionError) throw new DegerlendiriciYok();
    throw hata;
  }

  const ham = tamamlama.choices[0]?.message?.content;
  if (!ham) {
    throw new Error("Değerlendirme çözümlenemedi; model boş yanıt döndürdü.");
  }

  return ayristirDegerlendirme(ham);
}
```

Note: no `stream` field is passed, so `client.chat.completions.create(...)` resolves to the non-streaming `ChatCompletion` overload (has `.choices`) — no type guard needed.

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: 0 errors.

- [ ] **Step 3: Format and lint**

Run: `npm run format && npm run lint`
Expected: both exit 0. `noUnusedImports` will fail if `Degerlendirme` type import or any other import above is unused — keep only what's referenced.

- [ ] **Step 4: Commit**

```bash
git add src/server/ai/degerlendir.ts
git commit -m "feat: degerlendir.ts tek AI kapisini kullansin"
```

---

### Task 4: Remove `@anthropic-ai/sdk`

**Files:**
- Modify: `package.json`

**Interfaces:** none — dependency-only change.

- [ ] **Step 1: Confirm no remaining importer**

Run: `grep -rn "@anthropic-ai/sdk" src scripts`
Expected: no matches (Task 3 removed the only import).

- [ ] **Step 2: Uninstall**

Run: `npm uninstall @anthropic-ai/sdk`
Expected: `package.json`/`package-lock.json` lose the entry, exit 0.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: anthropic-ai/sdk bagimliligini kaldir"
```

---

### Task 5: Document the env contract

**Files:**
- Modify: `.env.example`

**Interfaces:** none.

`.env.local` already carries working `AI_BASE_URL` / `AI_API_KEY` values (set this session, outside this plan, by explicit user decision — git-ignored, never touched by this task).

- [ ] **Step 1: Add the AI gateway section**

Append to `.env.example` (after the Finnhub section, before the trailing Faz 1 note):

```
# --- AI kapısı (src/server/ai/istemci.ts) ---
# OpenAI uyumlu herhangi bir sağlayıcı: yerel Antigravity proxy'si,
# NVIDIA NIM vb. Anahtar yoksa akademi değerlendiricisi sessizce devre dışı
# kalır; uygulamanın geri kalanı etkilenmez.
AI_BASE_URL=""
AI_API_KEY=""
```

- [ ] **Step 2: Verify `.env.local` has real values**

Run: `grep -c "^AI_BASE_URL=\|^AI_API_KEY=" .env.local`
Expected: `2` (both lines present; this task does not set or print their values).

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "docs: AI kapisi ortam degiskenlerini belgele"
```

---

### Task 6: Memory updates and smoke test

**Files:**
- Modify: `memory-bank/architecture.md:24`
- Modify: `memory-bank/decisionLog.md` (append before `## Pending Decisions`)

**Interfaces:** none — documentation and a manual verification script (not committed).

- [ ] **Step 1: Update the stale architecture line**

`memory-bank/architecture.md:24` currently reads:

```
- `src/server/ai/` contains Anthropic-backed answer evaluation.
```

Replace with:

```
- `src/server/ai/` is the single AI gateway (`istemci.ts`, OpenAI-compatible
  client) plus the academy answer evaluator (`degerlendir.ts`) built on it.
```

- [ ] **Step 2: Append the decision record**

Append to `memory-bank/decisionLog.md`, immediately before the `## Pending Decisions` line, following the exact field set `CLAUDE.md:123-135` requires:

```markdown
### AI kapısı — OpenAI-uyumlu tek istemci, yerel Antigravity proxy (2026-08-20)

**Soru:** Akademi değerlendiricisi Anthropic SDK'sını mı kullanmaya devam
etsin, yoksa tüm AI çağrıları için tek, OpenAI-uyumlu bir kapıya mı geçilsin?

**Seçenekler:**
1. Anthropic SDK'sını olduğu gibi bırakmak (`claude-opus-5`, ücretli anahtar).
2. `.env.local`'de kayıtsız duran NVIDIA NIM (`DEGERLENDIRICI_*`) değişkenlerine
   geçmek.
3. Tek OpenAI-uyumlu kapı (`istemci.ts`) kurup yerel Antigravity proxy'sine
   (`127.0.0.1:8045`, model `gemini-3-flash`) bağlamak; gelecekteki her AI
   özelliği aynı kapıyı kullanır.

**Karar:** Kullanıcı 3. seçeneği seçti: `src/server/ai/istemci.ts` tek AI
kapısı olur, `degerlendir.ts` bunun üzerine kurulur, `@anthropic-ai/sdk`
kaldırılır.

**Sahibi:** Kullanıcı

**Gerekçe:** Kullanıcı üç farklı SDK örneği yerine tek bir entegrasyon
istedi; OpenAI SDK hem bu proxy'yi hem NVIDIA NIM gibi diğer OpenAI-uyumlu
sağlayıcıları tek arayüzle kapsıyor. Model seçimi çağırana bırakılarak
gelecekteki AI özellikleri aynı kapıdan istediği modele istek atabilir.

**Varsayımlar:**
- Antigravity proxy'si bu makinede (`127.0.0.1:8045`) geliştirme boyunca
  erişilebilir kalacak.
- Proxy, `response_format: { type: "json_object" }` (OpenAI JSON-mode) ile
  geçerli JSON döndürüyor; strict `json_schema` desteği garanti değil, bu
  yüzden şema doğrulaması istemci tarafında (`degerlendir.logic.ts`) yapılıyor.

**Kabul edilen riskler:**
- Proxy yalnız bu makinede, Antigravity açıkken çalışır. Uygulama bir sunucuya
  deploy edilirse değerlendirme özelliği "bağlı değil" durumuna düşer — aynı
  davranış bugün anahtarsız durumda zaten var (`DegerlendiriciYok`), dashboard
  çökmez ama üretim için ayrı bir sağlayıcı/anahtar gerekecek.
- `DEGERLENDIRICI_BASE_URL`/`DEGERLENDIRICI_API_KEY` (NVIDIA NIM) `.env.local`
  içinde artık yok; NVIDIA NIM'e geri dönülmek istenirse yeniden eklenmesi
  gerekir.

**Kanıt:**
- `docs/superpowers/specs/2026-08-20-ai-tek-kapi-design.md`
- `src/server/ai/istemci.ts`, `src/server/ai/degerlendir.ts` (bu planla eklenen/değişen kod)
- Bu oturumdaki kullanıcı onayı (üç SDK örneği + "tek şey verip AI ajanları
  direkt istediğine istek atsın" talebi)

**Güven:** 0.8

**Durum:** accepted

**Gözden geçirme tetiği:** Uygulama bir sunucuya deploy edilmeye başlandığında,
Antigravity proxy'si kalıcı olarak kapatıldığında, veya `json_object` modunun
bu proxy'de güvenilmez sonuç verdiği gözlemlendiğinde bu karar yeniden açılır.

**Tarih:** 2026-08-20
```

- [ ] **Step 3: Commit the memory updates**

```bash
git add memory-bank/architecture.md memory-bank/decisionLog.md
git commit -m "docs: AI kapisi kararini ve mimari notunu guncelle"
```

- [ ] **Step 4: Smoke test against the live Antigravity proxy**

This is a manual, uncommitted verification script — it proves the full
`degerlendir()` path against the real local proxy, which no `node:test` in
this repo mocks (matches the existing convention that network-calling `.ts`
files are smoke-tested, not unit-tested).

Create a scratch file `scripts/tmp-smoke-degerlendir.ts` (not committed):

```ts
import "@/scripts/load-env";
import { degerlendir } from "@/server/ai/degerlendir";

const sonuc = await degerlendir({
  soru: "Fisher denklemi nedir?",
  olcut: "Nominal faiz, reel faiz ve enflasyon arasındaki ilişkiyi doğru kurmalı.",
  cevap: "Nominal faiz yaklaşık olarak reel faiz artı enflasyondur.",
});

console.log(JSON.stringify(sonuc, null, 2));
```

Run: `node --import tsx scripts/tmp-smoke-degerlendir.ts`
Expected: prints a JSON object with `puan` (0-100 number), `guclu_yanlar`,
`eksikler` (string arrays), `geri_bildirim_md`, `takip_sorusu` (strings) — no
thrown error. If it throws `DegerlendiriciYok`, confirm Antigravity is running
and listening on `127.0.0.1:8045` before treating this as a code defect. If it
throws a schema-validation error from `ayristirDegerlendirme`, inspect the raw
model output — the `SISTEM` prompt's JSON-format instructions in Task 3 may
need adjustment for this specific model's response style; fix in
`degerlendir.ts` before proceeding, do not weaken the schema.

Delete the scratch file after a successful run: `rm scripts/tmp-smoke-degerlendir.ts`

---

### Task 7: Full verification sweep

**Files:** none — verification only.

- [ ] **Step 1: Run the full new/changed unit test set**

Run: `node --import tsx --test src/server/ai/istemci.test.ts src/server/ai/degerlendir.logic.test.ts`
Expected: 6 tests PASS, exit 0.

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: 0 errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: 0 errors.

- [ ] **Step 4: Confirm no leftover Anthropic references**

Run: `grep -rn "anthropic\|Anthropic\|claude-opus" src scripts package.json`
Expected: no matches.

- [ ] **Step 5: Confirm smoke-test scratch file is gone**

Run: `git status --short scripts/`
Expected: no `tmp-smoke-degerlendir.ts` entry.
