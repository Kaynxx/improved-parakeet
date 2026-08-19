# Tüm Sistem Güvenlik Sertleştirme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Denetimde doğrulanan DB-01, AUTH-01, HTTP-01, AUTH-02, DEP-01 ve DB-02 bulgularını veritabanı, backend ve frontend boyunca kapatmak; dış URL ve AI sınırlarını gelecekteki veri akışlarına karşı zorlamak.

**Architecture:** `src/lib/db/index.ts` üç çalışma kapsamı sunan derin bir module olur: web, worker ve yönetim. Çağıran yalnız kapsamı seçer; URL seçimi, havuz önbelleği ve sır içermeyen hata sözleşmesi implementation içinde kalır. Giriş yönlendirmesi, hız sınırlaması ve URL normalizasyonu küçük fakat derin security module’larda toplanır; sayfalar/Server Action’lar bu policy’yi tekrar uygulamaz.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Auth.js Credentials/JWT, Drizzle/PostgreSQL, Node `node:test`, `tsx`, Biome.

## Global Constraints

- Yalnız yerel hedefi değiştir; gerçek sır, token, e-posta veya bağlantı dizesini test çıktısına, rapora veya commit’e yazma.
- `.env.local`, `.env.worker.local` ve `.env.admin.local` git tarafından izlenmez; bootstrap bu dosyalara üretir fakat sırları stdout’a yazmaz.
- Uygulama çalışma rolü `SUPERUSER`, `CREATEROLE`, `CREATEDB`, `REPLICATION`, şema CREATE veya migration izni almaz.
- Uygulama runtime’ı yalnız `DATABASE_URL`; worker yalnız `DATABASE_WORKER_URL`; migration/seed/kullanıcı yönetimi yalnız `DATABASE_ADMIN_URL` kullanır.
- Eski `finans` bootstrap hesabı sertleştirme sonunda `NOLOGIN` olur. Bootstrap yeni yönetim/web/worker parola üretir, atomik env dosyası yazımı başarısızsa eski hesabı devre dışı bırakmaz.
- Backslash, protokol-göreli URL, mutlak URL ve boş olmayan origin hiçbir zaman iç dönüş hedefi sayılmaz.
- Yüksek riskli dış URL yalnız HTTPS kabul eder; kullanıcıya açılan harici bağlantı HTTP(S) ile sınırlıdır.
- Kaynak ve yorumlarda Türkçe korunur. Mevcut kullanıcı değişiklikleri olan `scripts/db-check.ts`, `scripts/temp-add-user.ts` ve diğer ilişkisiz untracked dosyalar değiştirilmez.
- `npm audit fix --force` kullanılmaz; Next 16 yükseltmesi kanıtlanmış uyumluluk olmadan yapılmaz.

---

### Task 1: Add security contract tests

**Files:**
- Create: `src/lib/security/donus.test.ts`
- Create: `src/lib/security/url.test.ts`
- Create: `src/lib/security/giris-kisitlama.test.ts`
- Modify: `package.json`
- Test: `npm run test:security`

**Interfaces:**
- Consumes: Node built-in test runner through `tsx` and new pure security modules.
- Produces: deterministic tests that fail before the redirect, URL, and login-limiter implementations exist.

- [ ] **Step 1: Add the focused test command**

Add this script without changing the existing verification commands:

```json
"test:security": "node --import tsx --test src/lib/security/**/*.test.ts"
```

- [ ] **Step 2: Write failing internal-return tests**

Create `src/lib/security/donus.test.ts` with these contract cases:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { guvenliIcYol } from "./donus";

test("yalnız kök ve site içi yollar dönüş hedefidir", () => {
  assert.equal(guvenliIcYol(undefined), "/");
  assert.equal(guvenliIcYol("/haberler?etiket=makro"), "/haberler?etiket=makro");
});

test("açık yönlendirme biçimleri köke düşer", () => {
  for (const raw of ["https://evil.example", "//evil.example", "/\\evil.example", "\\\\evil.example"]) {
    assert.equal(guvenliIcYol(raw), "/");
  }
});
```

- [ ] **Step 3: Write failing external-URL tests**

Create `src/lib/security/url.test.ts` to assert `https://` feed URL kabulü, `http://` feed reddi, `https://`/`http://` user-visible URL kabulü, `javascript:`, `data:`, userinfo ve hostname’siz URL reddi. Test functions are `guvenliBeslemeUrl(raw)` and `guvenliHariciUrl(raw)`.

- [ ] **Step 4: Write failing login-throttle tests**

Create `src/lib/security/giris-kisitlama.test.ts` using an injected clock. Assert eight failures in 15 minutes are allowed, ninth is blocked for 15 minutes, success clears the key, elapsed window clears the count, and unrelated normalized email keys do not share a counter.

- [ ] **Step 5: Run the focused suite and confirm missing-module failures**

Run:

```bash
npm run test:security
```

Expected before implementation: imports for `./donus`, `./url`, and `./giris-kisitlama` cannot resolve.

### Task 2: Create deep security modules and close redirect/rate risks

**Files:**
- Create: `src/lib/security/donus.ts`
- Create: `src/lib/security/url.ts`
- Create: `src/lib/security/giris-kisitlama.ts`
- Modify: `src/app/(auth)/giris/page.tsx`
- Modify: `src/app/(auth)/giris/actions.ts`
- Modify: `src/auth.ts`
- Modify: `src/lib/content/lesson.ts`
- Modify: `src/server/integrations/rss/feed.ts`
- Test: `src/lib/security/*.test.ts`, browser/HTTP redirect check

**Interfaces:**
- `guvenliIcYol(raw: string | undefined): string` returns `/` or an unchanged same-site path/query only.
- `guvenliBeslemeUrl(raw: string): string | null` returns canonical HTTPS URL only; userinfo, non-HTTPS and hostless values return `null`.
- `guvenliHariciUrl(raw: string | undefined): string | null` returns canonical HTTP(S) URL only.
- `olusturGirisKisitlayici({ maxDeneme, pencereMs, engelMs, simdi })` returns `{ izinVar, basarisizlikKaydet, basariKaydet }`; the default module singleton uses 8 attempts/15 minutes.

- [ ] **Step 1: Implement the pure return-path module**

`guvenliIcYol` must return `/` unless `raw` starts with exactly one `/`, contains no `\\`, and `new URL(raw, "http://yerel.test").origin` remains `http://yerel.test`. Do not trust a TypeScript `Route` cast as validation.

- [ ] **Step 2: Apply return-path validation at both seams**

In `giris/page.tsx`, replace the local helper with `guvenliIcYol`. In `giris/actions.ts`, normalize `formData.get("donus")` with the same function immediately before `signIn`. The page protects the hidden input; the action protects direct Server Action calls.

- [ ] **Step 3: Implement and wire the login limiter**

Keep the map, timestamp pruning, normalized-email key, and result-neutral behavior inside `giris-kisitlama.ts`. In `Credentials.authorize`, reject an already blocked key before the DB lookup, record every failed credential attempt, and clear only after a successful Argon2 verification. Return `null` for blocked, unknown, and wrong-password cases so UI enumeration resistance remains unchanged.

- [ ] **Step 4: Implement external URL policy at ingestion boundaries**

`parseSource` must reject any lesson source whose URL is not a valid HTTP(S) URL before storing it. `fetchFeed` must discard feed items with invalid article URLs and normalize `imageUrl` through `guvenliHariciUrl`; it must not fetch a user-supplied target. Do not add a new route or UI for source management.

- [ ] **Step 5: Run pure contracts and non-destructive HTTP checks**

Run:

```bash
npm run test:security
```

Then generate an authenticated local audit JWT without printing it and request `/giris?donus=/%5Cevil.example`; expected result is a same-origin `Location: /`. Submit nine invalid login attempts against a synthetic account key; expected result stays generic and the ninth does not invoke Argon2 or database lookup.

### Task 3: Separate database roles and connections

**Files:**
- Create: `scripts/harden-db.ts`
- Create: `scripts/load-admin-env.ts`
- Create: `scripts/load-worker-env.ts`
- Modify: `src/lib/db/index.ts`
- Modify: `src/lib/db/queries/market.ts`
- Modify: `src/server/integrations/rss/ingest.ts`
- Modify: `scripts/worker.ts`
- Modify: `scripts/ingest.ts`
- Modify: `scripts/seed.ts`
- Modify: `scripts/create-user.ts`
- Modify: `scripts/reset-schema.ts`
- Modify: `drizzle.config.ts`
- Modify: `.env.example`
- Modify: `package.json`
- Test: bootstrap idempotence, role catalog queries, application/worker reads and writes

**Interfaces:**
- `getDb(kapsam?: "web" | "isleyici" | "yonetim")` chooses the corresponding required environment URL and caches a separate Drizzle pool per scope.
- `scripts/harden-db.ts` is an idempotent local-only adapter: it reads the existing bootstrap connection, creates/rotates `finans_admin`, `finans_web`, and `finans_worker`, writes redacted env files, grants fixed least privileges, then makes legacy `finans` `NOLOGIN`.
- `scripts/load-admin-env.ts` loads `.env.local`, `.env`, and `.env.admin.local`; `scripts/load-worker-env.ts` loads `.env.local`, `.env`, and `.env.worker.local`.

- [ ] **Step 1: Write the failed role-isolation check**

Before bootstrap, run read-only catalog checks against the current runtime role and record that it is superuser. This is the known failing security baseline. Do not print its password or URL.

- [ ] **Step 2: Implement scoped database connection selection**

Replace the single `cached` connection with a `Map<DbKapsami, Database>`. Map `web` to `DATABASE_URL`, `isleyici` to `DATABASE_WORKER_URL`, and `yonetim` to `DATABASE_ADMIN_URL`. Error text must name only the missing variable and setup command, never a default URL or credential.

- [ ] **Step 3: Give write paths their least-privilege scope**

`upsertMarketQuotes` and RSS ingestion use `getDb("isleyici")`. `worker.ts` and `ingest.ts` load worker env before invoking them. `seed.ts`, `create-user.ts`, `reset-schema.ts`, and Drizzle migration config load admin env and use `getDb("yonetim")`. Read-only pages, Auth.js and services keep `getDb()` defaulting to `web`.

- [ ] **Step 4: Implement idempotent database hardening**

The script must:

```sql
REVOKE ALL ON DATABASE finans FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC;
```

Create non-superuser login roles for web and worker with generated random passwords. Grant web `CONNECT`, schema `USAGE`, reads needed by pages/Auth.js, and only future user-progress/answer DML; grant worker the explicit source/article/ticker/ingestion/market reads and writes it needs. Set default privileges for future tables/sequences owned by the admin role. Write web URL only to `.env.local`, worker URL only to `.env.worker.local`, and admin URL only to `.env.admin.local`; set the old `finans` role to `NOLOGIN` only after successful atomic file writes. Print only role names and file paths.

- [ ] **Step 5: Run bootstrap, migrate, seed, and role checks**

Run:

```bash
npm run db:harden
npm run db:generate
npm run db:migrate
npm run seed
```

Run catalog checks as web and worker. Expected: neither role has superuser/role/database/replication/schema-create rights; web can read application pages but cannot alter schema; worker can perform ingestion/market writes but cannot read `user.password_hash`; legacy `finans` cannot create a new login connection.

### Task 4: Reduce DB data exposure and add production response policy

**Files:**
- Modify: `src/lib/db/queries/lesson.ts`
- Modify: `next.config.ts`
- Create: `src/lib/db/queries/lesson.test.ts`
- Test: focused query contract, production browser/header smoke test

**Interfaces:**
- `findLatestFeedback(answerIds)` queries only listed answer IDs and returns latest feedback keyed by answer ID; empty IDs perform no query.
- The global response policy returns security headers without changing Auth.js cache controls.

- [ ] **Step 1: Write the failing feedback-selection test**

Add a deterministic test around an extracted pure `enYeniGeriBildirimiSec(rows, answerIds)` helper or a mocked query adapter. Include two answer IDs requested and one foreign answer ID. Assert the foreign feedback cannot enter the returned map and empty input bypasses the adapter.

- [ ] **Step 2: Parameterize feedback retrieval**

Use Drizzle `inArray(answerFeedback.answerId, answerIds)` in `findLatestFeedback`, then map newest rows only. Do not select every feedback record and filter it in memory.

- [ ] **Step 3: Add a production-safe header set**

Implement `nextConfig.headers()` for all paths. Set `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()`, `X-Frame-Options: DENY`, and a CSP that includes `default-src 'self'`, `base-uri 'self'`, `object-src 'none'`, `form-action 'self'`, `frame-ancestors 'none'`, explicit YouTube nocookie `frame-src`, HTTP(S) image origins required by feed images, and only the Next inline allowances demonstrated necessary by the production smoke test. Set HSTS only for production HTTPS deployment, not a local HTTP origin.

- [ ] **Step 4: Run focused and browser checks**

Run the security suite, build, then `next start`. Inspect `/giris` and `/api/auth/session`: expected CSP, frame, referrer, nosniff and permissions headers; Auth.js `Cache-Control` remains private/no-store. Browser login must render with no CSP violation or console error.

### Task 5: Patch production dependency tree and close verification

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/superpowers/reports/2026-08-19-tum-sistem-guvenlik-denetimi.md`
- Test: `npm audit --omit=dev --json`, `npm run test:security`, `npm run typecheck`, `npm run lint`, `npm run build`, local browser/HTTP smoke tests

**Interfaces:**
- Production lockfile resolves patched `nanoid`, `postcss`, and `sharp` versions without a Next major upgrade.
- The report contains exact pre/post audit evidence, applied changes, tests, source links, and remaining authenticated-UI limitation.

- [ ] **Step 1: Add minimal compatible dependency overrides**

Add npm overrides for `nanoid@3.3.18`, `postcss@8.5.26`, and `sharp@0.35.3`. Regenerate the lockfile with normal `npm install`; do not use `--force` or upgrade Next to 16.

- [ ] **Step 2: Verify Next/Sharp compatibility empirically**

Run `npm run build`, then production server smoke checks for `/giris`, `/api/auth/session`, anonymous protected redirects, and the Next image endpoint’s configured rejection behavior. If 0.35.3 is incompatible with Next 15.5.22, stop and replace only this step with an evidence-based compatible remediation; do not silently retain a known-vulnerable version.

- [ ] **Step 3: Run all final gates**

Run:

```bash
npm audit --omit=dev --json
npm run test:security
npm run typecheck
npm run lint
npm run build
```

Expected: zero production audit vulnerabilities and passing tests/type/lint/build.

- [ ] **Step 4: Update report and commit only owned artifacts**

Replace provisional findings with final status, include actual command results and remaining risk that authenticated visual testing was unavailable without a supplied test credential. Commit only files changed by this hardening work after checking no unrelated paths are staged.
