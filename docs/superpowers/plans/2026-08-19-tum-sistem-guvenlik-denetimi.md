# Tüm Sistem Güvenlik Denetimi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Yerel Finans Program uygulamasının frontend, backend ve PostgreSQL veri yolunu işlevsel olarak doğrulamak; güncel API/veri sızıntısı tehditlerine karşı tahribatsız kanıt toplamak; ardından bulgu-temelli sertleştirme planı üretmek.

**Architecture:** Uygulama mevcut `page -> server/services -> db/queries` sınırları üzerinden denetlenir; Auth.js Route Handler, SSR, Server Action, dış entegrasyon ve client prop zinciri birlikte ele alınır. Denetim kaynak kodu ve yerel çalışma zamanını kapsar; üretim/staging veya harici hedeflere istek göndermez. Kod düzeltmeleri bu planın çıktısındaki bulgulardan sonra ayrı bir sertleştirme planına yazılır.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Auth.js v5, Drizzle ORM, PostgreSQL 16, Argon2id, Biome, Chromium browser automation.

## Global Constraints

- Hedef yalnız yerel uygulama, yerel PostgreSQL ve bu çalışma alanındaki dosyalardır.
- Çalışma ağacındaki önceden var olan değişikliklere dokunma; yalnız bu planın oluşturduğu dosyaları stage et.
- Gerçek sır, parola, token, e-posta veya bağlantı dizesini terminale, rapora veya commit’e yazma.
- Parola tahmini, yük testi, dış ağ taraması, veri silme ve kalıcı test verisi oluşturma yasaktır.
- Kod, yorumlar, değişken adları ve arayüz metni Türkçe kalır.
- Denetim bulgusu olmadan yeni BFF, ayrı backend servisi veya geniş kapsamlı refactor oluşturma.
- Her yürütme adımının kanıtı nihai rapora önem, etki, gözlem ve komut/URL düzeyinde kaydedilir.
- Son sertleştirme uygulanmadan önce değişen dosyalar ve testler ikinci uygulama planında kesinleştirilir.

---

## Denetim yüzey haritası

| Katman | Dosyalar | Denetim sorumluluğu |
| --- | --- | --- |
| Erişim sınırı | `src/middleware.ts`, `src/auth.config.ts`, `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts` | Oturum, matcher, redirect, cookie/JWT ve Auth.js handler |
| Giriş | `src/app/(auth)/giris/page.tsx`, `src/app/(auth)/giris/actions.ts`, `src/components/auth/LoginForm.tsx` | Form doğrulama, hata eşitliği, dönüş URL’si ve Server Action |
| Korumalı sayfalar | `src/app/(dashboard)/layout.tsx`, `src/app/(dashboard)/page.tsx`, `src/app/(dashboard)/haberler/page.tsx`, `src/app/(dashboard)/haberler/[slug]/page.tsx`, `src/app/(dashboard)/topluluk/page.tsx`, `src/app/(dashboard)/akademi/page.tsx`, `src/app/(dashboard)/akademi/[hafta]/[ders]/page.tsx` | Anonim/oturumlu rota davranışı, görüntülenen veri ve hata yüzeyi |
| Sunum | `src/components/auth/`, `src/components/layout/`, `src/components/market/`, `src/components/news/`, `src/components/sentiment/`, `src/components/academy/`, `src/components/common/` | DTO sınırı, güvenilmeyen HTML/Markdown ve UI durumları |
| Servis | `src/server/services/{market,news,sentiment,video,academy}.ts`, `src/server/ai/degerlendir.ts` | Yetkili veri erişimi, hata sözleşmesi ve AI girdi/çıktısı |
| Dış erişim | `src/server/integrations/finnhub.ts`, `src/server/integrations/rss/{feed,ingest,article,tickers}.ts` | Hedef doğrulama, timeout/boyut/şema, SSRF ve hata sızıntısı |
| Veri | `src/lib/db/{index,schema}.ts`, `src/lib/db/queries/{market,news,sentiment,sentiment.logic,academy,lesson,progress}.ts`, `drizzle/0000_baseline.sql` | En az yetki, sahiplik, sorgu parametreleme, kısıtlar ve veri sızıntısı |
| İçerik | `src/lib/content/{load,lesson,render}.ts`, `src/lib/utils/youtube.ts` | Dosya yolu, Markdown/HTML, URL ve gömme güvenliği |

### Task 1: Establish local audit baseline

**Files:**
- Read: `package.json`, `CLAUDE.md`, `.env.example`, `next.config.ts`, `drizzle.config.ts`, `biome.json`, `tsconfig.json`
- Create: `docs/superpowers/reports/2026-08-19-tum-sistem-guvenlik-denetimi.md`
- Modify: None
- Test: local command outputs recorded in the report

**Interfaces:**
- Consumes: the existing `db:status`, `db:up`, `seed`, `typecheck`, `lint`, `build`, `dev`, and `start` scripts.
- Produces: a redacted baseline: dependency versions, database availability, active route inventory, and pre-change diagnostics.

- [ ] **Step 1: Confirm local database state without printing credentials**

Run:
```bash
npm run db:status
```

If it reports stopped, run:
```bash
npm run db:up
```

Then rerun `npm run db:status`. Record only running/stopped state and port availability; do not copy `DATABASE_URL`.

- [ ] **Step 2: Run the existing static contract gates**

Run in this order:
```bash
npm run typecheck
npm run lint
npm run build
```

Record each exit status and exact failure messages. Do not change source during baseline collection.

- [ ] **Step 3: Record the runnable surface inventory**

List route files under `src/app/`, database query modules under `src/lib/db/queries/`, services under `src/server/services/`, and integrations under `src/server/integrations/`. Mark each as browser, HTTP handler, Server Action, server-only module, or database boundary.

- [ ] **Step 4: Start a local development server with explicit readiness evidence**

Run:
```bash
npm run dev
```

Wait for Next.js to announce a local URL. Use that exact URL for all browser checks and stop the process when browser testing ends.

- [ ] **Step 5: Initialize the evidence report**

Create the report with sections `Kapsam`, `Ortam`, `İşlevsel Kanıt`, `Tehdit Araştırması`, `Güvenlik Bulguları`, `Düzeltme Kararı`, and `Doğrulama`. Put only redacted observations in it.

### Task 2: Exercise every frontend route in browser

**Files:**
- Read: `src/app/(auth)/giris/page.tsx`, `src/app/(dashboard)/layout.tsx`, `src/app/(dashboard)/page.tsx`, `src/app/(dashboard)/haberler/page.tsx`, `src/app/(dashboard)/haberler/[slug]/page.tsx`, `src/app/(dashboard)/topluluk/page.tsx`, `src/app/(dashboard)/akademi/page.tsx`, `src/app/(dashboard)/akademi/[hafta]/[ders]/page.tsx`
- Read: `src/components/auth/{LoginForm,UserMenu}.tsx`, `src/components/layout/{AppShell,Sidebar,TopBar,MobileNav,NewsTicker}.tsx`, `src/components/market/{TodayBrief,MarketTile,Sparkline,MarketOverview}.tsx`, `src/components/news/{ArticleReader,SourceBadge,WatchedSources,NewsCard,NewsList}.tsx`, `src/components/sentiment/{TrendingTickers,SentimentMeter,PostCard,SentimentFeed}.tsx`, `src/components/academy/{RoadmapNode,VideoCard,VideoPlayer,SourceList,RoadmapPreview,ProgressRing}.tsx`, `src/components/common/{EmptyState,BentoCard,SkeletonCard,SectionHeader}.tsx`
- Modify: None
- Test: Chromium at the local URL from Task 1

**Interfaces:**
- Consumes: an unauthenticated browser session and the local Next.js server.
- Produces: per-route observation of HTTP result, redirect destination, visual state, client-side errors, and data exposure.

- [ ] **Step 1: Check the public login surface**

Open `/giris` in a fresh browser context. Capture the accessibility tree and visual state. Submit malformed and deliberately invalid credentials once each; verify errors do not distinguish unknown email from wrong password and do not show stack traces, secrets, or internal query errors.

- [ ] **Step 2: Check every protected static route anonymously**

Open `/`, `/haberler`, `/topluluk`, and `/akademi` in fresh anonymous contexts. For each, record whether middleware redirects to `/giris`, whether the `donus` value is path-and-query only, and whether dashboard data appears before redirect.

- [ ] **Step 3: Check dynamic routes with safe nonexistent identifiers**

Open `/haberler/gecersiz-denetim-slug` and `/akademi/gecersiz-hafta/gecersiz-ders`. Record redirect, 404, or controlled error behavior. Verify URL fragments, external origins, and raw exception text are not reflected in the page.

- [ ] **Step 4: Inspect the client payload boundary**

For every route loaded in Steps 1–3, inspect HTML and loaded script text for `NEXT_PUBLIC_` secrets, `DATABASE_URL`, `AUTH_SECRET`, provider key prefixes, JWT-shaped values, raw DB fields, stack traces, and unexpected API response bodies. Record only the searched marker classes and match/no-match result.

- [ ] **Step 5: Exercise authenticated rendering if an existing local credential is available without creating or changing an account**

Use a credential already supplied by the project owner only. Visit every route in Steps 2–3 and record rendered loading, empty, populated, error, navigation, and logout states. If no credential is available, mark the authenticated UI branch as unverified rather than creating an account or guessing a password.

### Task 3: Exercise authentication and backend boundaries

**Files:**
- Read: `src/middleware.ts`, `src/auth.config.ts`, `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/app/(auth)/giris/actions.ts`
- Read: `src/server/services/market.ts`, `src/server/services/news.ts`, `src/server/services/sentiment.ts`, `src/server/services/video.ts`, `src/server/services/academy.ts`, `src/server/ai/degerlendir.ts`
- Modify: None
- Test: local HTTP requests and server-side module behavior with redacted output

**Interfaces:**
- Consumes: local Next.js server, anonymous request context, and existing database state.
- Produces: verified auth routing, error uniformity, server-boundary map, and a list of data paths requiring ownership review.

- [ ] **Step 1: Verify middleware matcher and redirect contract**

Issue anonymous requests to `/`, `/giris`, `/api/auth/session`, static assets, and a protected dynamic path. Confirm only the documented public/Auth.js/internal paths bypass the redirect. Confirm redirects remain same-origin paths and preserve only allowed path/query data.

- [ ] **Step 2: Verify Auth.js public handler behavior**

Request the Auth.js session and CSRF endpoints without credentials. Record status, `Cache-Control`, `Set-Cookie` attributes, response content type, CORS-related headers, and whether a session payload reveals more than the documented user identity. Do not submit credential-provider requests except the invalid browser form checks in Task 2.

- [ ] **Step 3: Trace server data paths**

For each service, identify its exported function, callers, input source, output type, query functions, external dependencies, and error behavior. For `degerlendir.ts`, identify exactly which user text and lesson metadata reach the AI SDK and what response reaches a component or database write.

- [ ] **Step 4: Review server action trust boundaries**

For each Server Action, record Zod or equivalent input validation, Origin/CSRF framework protection, redirect construction, exception mapping, rate-limit posture, and whether an action can be invoked outside its intended UI.

- [ ] **Step 5: Record backend findings without exploiting state-changing paths**

Classify observations as `doğrulandı`, `tasarım tercihi`, or `kanıt yetersiz`. No request may alter a lesson answer, progress entry, user record, feed, or database schema.

### Task 4: Verify database and content boundaries

**Files:**
- Read: `src/lib/db/index.ts`, `src/lib/db/schema.ts`, `drizzle/0000_baseline.sql`, `drizzle.config.ts`
- Read: `src/lib/db/queries/market.ts`, `src/lib/db/queries/news.ts`, `src/lib/db/queries/sentiment.ts`, `src/lib/db/queries/sentiment.logic.ts`, `src/lib/db/queries/academy.ts`, `src/lib/db/queries/lesson.ts`, `src/lib/db/queries/progress.ts`
- Read: `src/lib/content/load.ts`, `src/lib/content/lesson.ts`, `src/lib/content/render.ts`, `src/lib/utils/youtube.ts`
- Modify: None
- Test: read-only PostgreSQL metadata and pure parsing/validation paths

**Interfaces:**
- Consumes: schema, migration, query modules, content loaders, and a locally running database.
- Produces: least-privilege, ownership, injection, content-validation, and data-minimization evidence.

- [ ] **Step 1: Inspect application database role privileges read-only**

Use PostgreSQL catalog queries that list role, database, schema, table, sequence, and function privileges without revealing the connection string. Record whether the runtime role can create roles, create databases, alter unrelated schemas, or access objects outside the application schema.

- [ ] **Step 2: Trace user-bound tables and queries**

From schema and query modules, enumerate every table containing a user foreign key or response/progress data. For each query/write function, identify the source of `userId`, the ownership predicate, and whether a caller can select another record by externally supplied identifier.

- [ ] **Step 3: Inspect query construction and transaction boundaries**

Verify Drizzle query values use parameterized expressions rather than concatenated SQL. Identify raw SQL calls, dynamic identifiers, pagination limits, and update/delete predicates. Record any query that returns `select *` or fields beyond the component DTO requirement.

- [ ] **Step 4: Exercise content parsing with safe malformed in-memory data**

Run parser/renderer validation against synthetic malformed frontmatter, unsafe HTML fragments, invalid YouTube URLs, and path-traversal-like lesson identifiers without reading or writing application content. Verify controlled rejection and absence of executable output.

- [ ] **Step 5: Record database and content risk decisions**

For each issue, state the exact table/query/content function, affected data class, attacker prerequisite, evidence, and whether a schema, backend, or frontend change is required.

### Task 5: Research current API and secret-exposure attacks

**Files:**
- Read: `package.json`, `package-lock.json`, `next.config.ts`, `.env.example`, `src/auth.config.ts`, `src/server/integrations/finnhub.ts`, `src/server/integrations/rss/feed.ts`, `src/server/ai/degerlendir.ts`
- Modify: `docs/superpowers/reports/2026-08-19-tum-sistem-guvenlik-denetimi.md`
- Test: source-linked applicability matrix

**Interfaces:**
- Consumes: official advisories and the exact dependency/source versions in the baseline.
- Produces: a dated, source-linked threat matrix with `uygulanabilir`, `uygulanmıyor`, or `sürüm doğrulaması gerekli` status.

- [ ] **Step 1: Gather primary-source vulnerability advisories**

Read current advisories from the official Next.js security page/repository, Auth.js security advisories, GitHub Security Advisories for direct dependencies, and the OWASP API Security project. Capture source URL, publication/update date, affected version range, prerequisite, impact, and mitigation; do not rely on unsourced summaries.

- [ ] **Step 2: Research API exposure patterns relevant to this architecture**

Evaluate BOLA/IDOR, broken authentication, unrestricted resource consumption, SSRF, security misconfiguration, inventory drift, unsafe consumption of third-party APIs, server-action request forgery, cache/data leaks, source-map/error leaks, prompt injection, and client-bundle secret exposure against actual local data paths.

- [ ] **Step 3: Compare advisories against installed versions**

Run:
```bash
npm audit --omit=dev --json
```

Use `package-lock.json` and the audit result to distinguish a direct installed vulnerability from an advisory that is not present. Record package/version/severity/remediation constraint, never an unverified exploit claim.

- [ ] **Step 4: Write the applicability matrix**

For every researched class, record the exact local entry point, evidence needed, safe test method, and whether the issue proceeds to Task 6. Cite official sources in the report.

### Task 6: Perform source, bundle, configuration, and runtime security scan

**Files:**
- Read: the exact source file list in Appendix A; `next.config.ts`, `.gitignore`, and `.env.example`
- Modify: `docs/superpowers/reports/2026-08-19-tum-sistem-guvenlik-denetimi.md`
- Test: source scan, local response-header scan, client-payload scan, and package audit

**Interfaces:**
- Consumes: Task 1 baseline, Task 2 browser captures, Task 3 data-path map, Task 4 query/content evidence, and Task 5 threat matrix.
- Produces: reproducible findings ranked by severity and cross-layer remediation target.

- [ ] **Step 1: Scan secret and server-only boundaries**

Search tracked source and configuration for `process.env`, `NEXT_PUBLIC_`, credential-like key names, `server-only`, `use client`, `use server`, logging of request/error objects, and direct imports of DB or server modules from client components. Confirm `.env.local` is ignored without reading its values.

- [ ] **Step 2: Scan untrusted-data sinks**

Search for `dangerouslySetInnerHTML`, `marked`, `sanitizeHtml`, `fetch`, `new URL`, `redirect`, `Response.redirect`, `cookies`, `headers`, `eval`, dynamic imports, raw SQL, and AI SDK calls. For every match, trace input origin, validation/sanitization, output context, and error exposure.

- [ ] **Step 3: Inspect local HTTP response policy**

On public and protected responses, collect status, redirect, cache, CSP, frame, MIME-sniffing, referrer, permissions, CORS, HSTS (production-conditional), and cookie attributes. Compare missing/weak controls with the threat matrix; do not treat an absent header as a finding without context.

- [ ] **Step 4: Inspect generated client output safely**

After a local production build, inspect server-rendered HTML and shipped client chunks for only redaction-safe secret markers and internal-file/stack markers. Confirm production source-map configuration and error-page behavior. Do not print entire bundles or any matching secret values.

- [ ] **Step 5: Triage findings at the responsible layer**

For each confirmed issue, identify `DB`, `backend`, `frontend`, or `cross-layer` owner; exact entry point; attack precondition; impact; evidence; and the smallest safe remediation. Mark unproven concerns as hypotheses, not vulnerabilities.

### Task 7: Reproduce confirmed findings safely and prepare remediation plan

**Files:**
- Modify: `docs/superpowers/reports/2026-08-19-tum-sistem-guvenlik-denetimi.md`
- Create: `docs/superpowers/plans/2026-08-19-tum-sistem-guvenlik-sertlestirme.md`
- Modify: None until the remediation plan names an exact source/test file
- Test: one non-destructive reproduction per confirmed finding

**Interfaces:**
- Consumes: confirmed Task 6 findings with exact entry point and threat-matrix mapping.
- Produces: a remediation plan whose tasks name exact DB, backend, frontend, configuration, and test files; or a report stating no confirmed remediation work.

- [ ] **Step 1: Reproduce only evidence-backed findings**

For each confirmed issue, run the minimal request, page load, parser input, or read-only DB query that demonstrates it. Stop if a reproduction would write data, call a third party, expose a secret, or require guessing credentials.

- [ ] **Step 2: Define acceptance tests before code changes**

For every reproduction, specify a test that fails before the fix and passes after it. The test must assert the observable security contract: forbidden data absent, unauthorized path rejected, unsafe input rejected, or response policy present.

- [ ] **Step 3: Write the precise hardening plan**

For each finding, name the exact `Create`, `Modify`, and `Test` files; affected exported functions/types; migration requirements; browser/HTTP verification; and rollback effect. Group DB, backend, frontend, and cross-layer changes by dependency, not by agent ownership.

- [ ] **Step 4: Update final evidence and commit audit artifacts**

Add the applicable source links, redacted evidence, severity, impact, remediation decision, remaining risk, and verification scope to the report. Commit only the report and plan files created by this audit after confirming no unrelated paths are staged.

## Appendix A: Exact source scan set

`src/app/layout.tsx`, `src/app/globals.css`, `src/app/(auth)/layout.tsx`, `src/app/(auth)/giris/page.tsx`, `src/app/(auth)/giris/actions.ts`, `src/app/(dashboard)/layout.tsx`, `src/app/(dashboard)/page.tsx`, `src/app/(dashboard)/haberler/page.tsx`, `src/app/(dashboard)/haberler/[slug]/page.tsx`, `src/app/(dashboard)/topluluk/page.tsx`, `src/app/(dashboard)/akademi/page.tsx`, `src/app/(dashboard)/akademi/[hafta]/[ders]/page.tsx`, `src/app/api/auth/[...nextauth]/route.ts`, `src/middleware.ts`, `src/auth.config.ts`, and `src/auth.ts`.

`src/components/auth/LoginForm.tsx`, `src/components/auth/UserMenu.tsx`, `src/components/layout/AppShell.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/TopBar.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/NewsTicker.tsx`, `src/components/layout/nav.ts`, `src/components/market/TodayBrief.tsx`, `src/components/market/MarketTile.tsx`, `src/components/market/Sparkline.tsx`, `src/components/market/MarketOverview.tsx`, `src/components/news/ArticleReader.tsx`, `src/components/news/SourceBadge.tsx`, `src/components/news/WatchedSources.tsx`, `src/components/news/NewsCard.tsx`, `src/components/news/NewsList.tsx`, `src/components/sentiment/TrendingTickers.tsx`, `src/components/sentiment/SentimentMeter.tsx`, `src/components/sentiment/PostCard.tsx`, `src/components/sentiment/SentimentFeed.tsx`, `src/components/academy/RoadmapNode.tsx`, `src/components/academy/VideoCard.tsx`, `src/components/academy/VideoPlayer.tsx`, `src/components/academy/SourceList.tsx`, `src/components/academy/RoadmapPreview.tsx`, `src/components/academy/ProgressRing.tsx`, `src/components/common/EmptyState.tsx`, `src/components/common/BentoCard.tsx`, `src/components/common/SkeletonCard.tsx`, and `src/components/common/SectionHeader.tsx`.

`src/server/services/market.ts`, `src/server/services/news.ts`, `src/server/services/sentiment.ts`, `src/server/services/video.ts`, `src/server/services/academy.ts`, `src/server/ai/degerlendir.ts`, `src/server/integrations/finnhub.ts`, `src/server/integrations/rss/feed.ts`, `src/server/integrations/rss/ingest.ts`, `src/server/integrations/rss/article.ts`, and `src/server/integrations/rss/tickers.ts`.

`src/lib/db/index.ts`, `src/lib/db/schema.ts`, `src/lib/db/queries/market.ts`, `src/lib/db/queries/news.ts`, `src/lib/db/queries/sentiment.ts`, `src/lib/db/queries/sentiment.logic.ts`, `src/lib/db/queries/academy.ts`, `src/lib/db/queries/lesson.ts`, `src/lib/db/queries/progress.ts`, `src/lib/content/load.ts`, `src/lib/content/lesson.ts`, `src/lib/content/render.ts`, `src/lib/utils/youtube.ts`, `src/lib/utils/chart.ts`, `src/lib/utils/format.ts`, `src/lib/utils/cn.ts`, `src/types/index.ts`, and `src/types/next-auth.d.ts`.

`scripts/load-env.ts`, `scripts/worker.ts`, `scripts/ingest.ts`, `scripts/seed.ts`, `scripts/pg.ts`, `scripts/db-check.ts`, `scripts/reset-schema.ts`, `scripts/temp-add-user.ts`, and `scripts/create-user.ts`.
