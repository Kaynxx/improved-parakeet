# Cam Arayüz Restorasyonu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Güncel veri ve işlevleri koruyarak Finans Programı arayüzünü tek koyu tema, keskin geometri ve ölçülü liquid-glass yüzeylerle yeniden kurmak.

**Architecture:** Görsel sözleşme `src/app/globals.css` ve Geist font kurulumu üzerinden merkezi olarak sağlanır. Ortak kart ve chrome bileşenleri bu sınıfları tüketir; alan bileşenleri yalnız opaklık varsayımı, geometri veya semantik renk gerektiren yerlerde hedefli değişir. `scripts/check-glass-theme.ts` kaynak dosyaları üzerinde çalıştırılabilir bir sözleşme testi sağlar; veri katmanı ve bileşen prop imzaları değişmez.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, Biome 2, Geist 1.7, Node assert, PowerShell.

## Global Constraints

- Kaynak tasarım: `docs/superpowers/specs/2026-08-11-cam-arayuz-restorasyonu-design.md`.
- Tek tema koyu temadır; açık tema veya tema seçici eklenmez.
- Taban `#0a0a0c`, kart yarıçapı `4px`, iç yüzey yarıçapı `3px` olmalıdır.
- `--color-up: #2dd4a0` ve `--color-down: #ef4444`; yeşil/kırmızı yalnızca finansal yön ve duyarlılık için kullanılır.
- Geist Sans anlatı, Geist Mono sayı/sembol/zaman/etiket için kullanılır; serif yüz kaldırılır.
- Blur yalnız `.glass` ve `.glass-chrome` seviyesindedir; `.inset-panel` blur almaz.
- Faz 2C/2F dahil veritabanı, sorgu, servis, seed ve bileşen veri prop sözleşmeleri değişmez.
- Güncel merkezden ayrışan `SentimentMeter` korunur; eski ibre geri getirilmez.
- Çalışma ağacındaki ilgisiz ve commitlenmemiş değişiklikler korunur; hiçbir görev `git add -A` kullanmaz.
- Son doğrulama sırası: `npm run format`, `npm run typecheck`, `npm run lint`, güvenli `.next` temizliği, `npm run build`.
- `superpowers:finishing-a-development-branch` çağrılmaz.

---

## File Map

- `src/app/globals.css`: renk, tipografi, yarıçap, cam, hareket ve erişilebilirlik sözleşmesinin tek kaynağı.
- `src/app/layout.tsx`: Geist Sans/Mono kurulumu ve koyu tarayıcı tema rengi.
- `scripts/check-glass-theme.ts`: bağımlılıksız kaynak sözleşmesi doğrulayıcısı.
- `src/components/common/*`: kart, iskelet, bölüm başlığı ve durum yüzeyleri.
- `src/components/layout/*`: uygulama kabuğu, masaüstü/mobil gezinme, üst bar ve ticker.
- `src/components/market/*`: iç paneller, semantik yön renkleri ve grafik ayırıcıları.
- `src/components/sentiment/*`: keskin rozetler ve merkezden ayrışan duyarlılık göstergesi.
- `src/components/news/*`: liste, okuma yüzeyi, ticker etiketleri ve boş akış.
- `src/components/academy/*`: yol haritası, kaynak ve video yüzeyleri.
- `src/components/auth/*`, `src/app/(auth)/giris/page.tsx`: giriş ve kullanıcı menüsü yüzeyleri.

---

### Task 1: Tema Sözleşmesi ve Koyu Temel

**Files:**
- Create: `scripts/check-glass-theme.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Mevcut Tailwind renk sınıfları (`text-ink`, `bg-sunken`, `border-rule`) ve `geist` paketi.
- Produces: `.glass`, `.glass-chrome`, `.inset-panel`, koyu uyumluluk aliasları ve `expectContains`/`expectAbsent` tabanlı tema kontrolü.

- [ ] **Step 1: Tema temelinin başarısız sözleşme kontrolünü yaz**

`scripts/check-glass-theme.ts` dosyasını şu çekirdekle oluştur:

```ts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function read(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

function expectContains(path: string, source: string, snippets: string[]): void {
  for (const snippet of snippets) {
    assert.ok(source.includes(snippet), `${path} şu sözleşmeyi içermeli: ${snippet}`);
  }
}

function expectAbsent(path: string, source: string, snippets: string[]): void {
  for (const snippet of snippets) {
    assert.ok(!source.includes(snippet), `${path} eski sözleşmeyi taşımamalı: ${snippet}`);
  }
}

const globalsPath = "src/app/globals.css";
const globals = read(globalsPath);
const layoutPath = "src/app/layout.tsx";
const layout = read(layoutPath);

expectContains(globalsPath, globals, [
  "--color-base: #0a0a0c",
  "--color-surface: rgb(255 255 255 / 0.045)",
  "--color-elevated: rgb(255 255 255 / 0.055)",
  "--color-accent: #e8eaee",
  "--color-up: #2dd4a0",
  "--color-down: #ef4444",
  "--radius-card: 4px",
  "--radius-inner: 3px",
  ".glass {",
  ".glass-chrome {",
  ".inset-panel {",
  "@media (prefers-reduced-transparency: reduce)",
]);
expectAbsent(globalsPath, globals, ["#fdfbf7", "superbrain-glow", "color-scheme: light"]);
expectContains(layoutPath, layout, [
  'import { GeistMono } from "geist/font/mono"',
  'import { GeistSans } from "geist/font/sans"',
  'themeColor: "#0a0a0c"',
]);
expectAbsent(layoutPath, layout, ["Schibsted_Grotesk", "Source_Serif_4", "IBM_Plex_Mono"]);

console.log("Cam arayüz kaynak sözleşmesi geçerli.");
```

- [ ] **Step 2: Kontrolün mevcut açık temada başarısız olduğunu doğrula**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: FAIL; ilk eksik sözleşme `--color-base: #0a0a0c` olmalı.

- [ ] **Step 3: Geist fontlarını ve koyu viewport rengini kur**

`src/app/layout.tsx` içindeki Google font kurulumunu kaldır ve şu yapıyı kullan:

```tsx
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Metadata metinleri ve `./globals.css` importu aynen korunur.

- [ ] **Step 4: Koyu tokenları ve cam yardımcılarını uygula**

`src/app/globals.css` içindeki açık tema tokenlarını aşağıdaki sözleşmeyle değiştir; mevcut ders gövdesi, ticker, focus ve hareket kurallarını yeni tokenlara bağlayarak koru:

```css
@theme {
  --color-base: #0a0a0c;
  --color-surface: rgb(255 255 255 / 0.045);
  --color-elevated: rgb(255 255 255 / 0.055);
  --color-hairline: rgb(255 255 255 / 0.1);
  --color-hairline-strong: rgb(255 255 255 / 0.2);
  --color-ink: #f4f5f7;
  --color-ink-muted: #a3a8b2;
  --color-ink-faint: #8d929b;
  --color-accent: #e8eaee;
  --color-accent-soft: rgb(232 234 238 / 0.1);
  --color-accent-line: rgb(232 234 238 / 0.28);
  --color-up: #2dd4a0;
  --color-down: #ef4444;
  --color-flat: #8d929b;
  --color-up-soft: rgb(45 212 160 / 0.12);
  --color-down-soft: rgb(239 68 68 / 0.12);

  /* Güncel bileşenler için koyu semantik aliaslar. */
  --color-paper: var(--color-base);
  --color-paper-deep: #0d0d10;
  --color-card: var(--color-surface);
  --color-sunken: var(--color-elevated);
  --color-rule: var(--color-hairline);
  --color-rule-strong: var(--color-hairline-strong);

  --font-display: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-text: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --font-sans: var(--font-display);
  --radius-card: 4px;
  --radius-inner: 3px;
  --radius-chip: var(--radius-inner);
}

@layer base {
  html { color-scheme: dark; }
  body {
    background-color: var(--color-base);
    background-image:
      radial-gradient(circle at 12% 8%, rgb(255 255 255 / 0.035), transparent 34%),
      radial-gradient(circle at 88% 92%, rgb(255 255 255 / 0.022), transparent 38%);
    background-attachment: fixed;
    color: var(--color-ink);
    font-family: var(--font-display);
  }
}

@layer components {
  .glass,
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-card);
    backdrop-filter: blur(14px) saturate(140%);
    box-shadow: var(--glass-edge);
  }
  .glass-chrome,
  .chrome {
    background: rgb(10 10 12 / 0.74);
    border-color: var(--color-hairline);
    backdrop-filter: blur(24px) saturate(160%);
    box-shadow: var(--glass-edge);
  }
  .inset-panel {
    background: var(--color-elevated);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-inner);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08);
  }
}
```

`--glass-edge` değerini tasarım spec’indeki üç katmanlı inset imzayla tanımla. `superbrain-glow`, `--animate-superbrain` ve `.superbrain-stream` kurallarını kaldır. Azaltılmış saydamlıkta `.glass`, `.glass-chrome`, `.card` ve `.chrome` için blur’u kapatıp `background: #101216` uygula.

- [ ] **Step 5: Tema kontrolünü ve statik doğrulamayı çalıştır**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: `Cam arayüz kaynak sözleşmesi geçerli.`

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 6: Yalnız tema temelini commit et**

```powershell
git add -- scripts/check-glass-theme.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: koyu cam tema temelini kur"
```

---

### Task 2: Ortak Kartlar ve Uygulama Kabuğu

**Files:**
- Modify: `scripts/check-glass-theme.ts`
- Modify: `src/components/common/BentoCard.tsx`
- Modify: `src/components/common/SkeletonCard.tsx`
- Modify: `src/components/layout/AppShell.tsx`
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/components/layout/TopBar.tsx`
- Modify: `src/components/layout/MobileNav.tsx`
- Modify: `src/components/layout/NewsTicker.tsx`
- Modify: `src/components/auth/UserMenu.tsx`

**Interfaces:**
- Consumes: Task 1’in `.glass`, `.glass-chrome`, `.inset-panel` sınıfları ve koyu alias tokenları.
- Produces: Prop imzaları değişmeden ortak kart ve chrome yüzeyleri; sonraki görevlerin içine yerleşeceği koyu kabuk.

- [ ] **Step 1: Kabuk sözleşmesini teste ekle**

`scripts/check-glass-theme.ts` sonuna şu kesin kontrolleri ekle:

```ts
const bentoPath = "src/components/common/BentoCard.tsx";
const bento = read(bentoPath);
expectContains(bentoPath, bento, ["glass", '<h2 className="label truncate">']);
expectAbsent(bentoPath, bento, ["Double-Bezel", "rounded-full", "group-hover:shadow"]);

const appShellPath = "src/components/layout/AppShell.tsx";
const appShell = read(appShellPath);
expectContains(appShellPath, appShell, ["bg-base"]);
expectAbsent(appShellPath, appShell, ["superbrain-stream", "max-w-[1536px]"]);

for (const path of [
  "src/components/layout/Sidebar.tsx",
  "src/components/layout/TopBar.tsx",
  "src/components/layout/MobileNav.tsx",
  "src/components/layout/NewsTicker.tsx",
]) {
  expectContains(path, read(path), ["glass-chrome"]);
}

const topBarPath = "src/components/layout/TopBar.tsx";
expectContains(topBarPath, read(topBarPath), ["inset-panel"]);
const tickerPath = "src/components/layout/NewsTicker.tsx";
expectContains(tickerPath, read(tickerPath), ["from-base"]);
expectAbsent(tickerPath, read(tickerPath), ["from-paper-deep", "rounded-[var(--radius-chip)]"]);
```

- [ ] **Step 2: Yeni kontrollerin başarısız olduğunu doğrula**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: FAIL; `BentoCard.tsx` için `glass` eksikliği raporlanmalı.

- [ ] **Step 3: BentoCard ve SkeletonCard yüzeylerini sadeleştir**

`BentoCard` dış yüzeyini tek cam katmanı yap; çift bezel ve hover yükselmesini kaldır:

```tsx
<section
  className={cn(
    "glass relative flex min-h-0 flex-col overflow-hidden",
    className,
  )}
>
  {title ? (
    <header className="flex shrink-0 items-center justify-between gap-3 px-5 pt-5 pb-2">
      <h2 className="label truncate">{title}</h2>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  ) : null}
  <div className={cn("min-h-0 flex-1 px-5 py-5", scrollable && "scroll-thin overflow-y-auto", contentClassName)}>
    {children}
  </div>
</section>
```

`SkeletonCard` kökünde `card` yerine açıkça `glass`; iskelet çizgilerinde `rounded-[var(--radius-inner)] bg-elevated` kullan.

- [ ] **Step 4: Uygulama kabuğunu ve chrome yüzeylerini dönüştür**

- `AppShell`: `bg-[var(--color-paper)]` ve `superbrain-stream` katmanını kaldır; kökte `bg-base`, içerik kabuğunda tam genişlik kullan.
- `Sidebar`: aside’a `glass-chrome border-r border-hairline`; aktif satıra `bg-elevated`, 3 px sol çizgi ve nötr `text-accent` uygula.
- `TopBar`: header’a `glass-chrome`; arama inputuna `inset-panel`, bildirim düğmesine `inset-panel` uygula.
- `MobileNav`: `glass-chrome border-hairline`; aktif üst çubuk `rounded-[var(--radius-inner)]` olur.
- `NewsTicker`: kökte `glass-chrome bg-transparent`; iki maske `from-base`; “Son dakika” rozeti `rounded-[var(--radius-inner)]` olur.
- `UserMenu`: açılır menü `glass`; menü satırı `rounded-[var(--radius-inner)] hover:bg-elevated`; düğme prop ve davranışları değişmez.

- [ ] **Step 5: Kabuk sözleşmesini ve tip kontrolünü çalıştır**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: PASS.

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 6: Ortak yüzeyleri commit et**

```powershell
git add -- scripts/check-glass-theme.ts src/components/common/BentoCard.tsx src/components/common/SkeletonCard.tsx src/components/layout/AppShell.tsx src/components/layout/Sidebar.tsx src/components/layout/TopBar.tsx src/components/layout/MobileNav.tsx src/components/layout/NewsTicker.tsx src/components/auth/UserMenu.tsx
git commit -m "feat: uygulama kabugunu cam yuzeylere tasi"
```

---

### Task 3: Piyasa ve Topluluk Veri Yüzeyleri

**Files:**
- Modify: `scripts/check-glass-theme.ts`
- Modify: `src/components/market/MarketTile.tsx`
- Modify: `src/components/market/Sparkline.tsx`
- Modify: `src/components/market/TodayBrief.tsx`
- Modify: `src/components/sentiment/PostCard.tsx`
- Modify: `src/components/sentiment/SentimentMeter.tsx`
- Modify: `src/components/sentiment/TrendingTickers.tsx`

**Interfaces:**
- Consumes: Mevcut `MarketQuote`, `SentimentPost`, `SentimentSummary`, `TickerSentiment` propları; Task 1 yüzey sınıfları.
- Produces: Aynı prop imzalarıyla koyu iç paneller, semantik yön renkleri ve opaklık varsayımı taşımayan grafik ayırıcıları.

- [ ] **Step 1: Veri yüzeyi kontrollerini ekle**

```ts
const marketTilePath = "src/components/market/MarketTile.tsx";
expectContains(marketTilePath, read(marketTilePath), ["inset-panel"]);
expectAbsent(marketTilePath, read(marketTilePath), ["rounded-[var(--radius-chip)]"]);

const sparklinePath = "src/components/market/Sparkline.tsx";
expectContains(sparklinePath, read(sparklinePath), ['stroke="var(--color-base)"']);
expectAbsent(sparklinePath, read(sparklinePath), ['stroke="var(--color-sunken)"']);

const todayPath = "src/components/market/TodayBrief.tsx";
expectContains(todayPath, read(todayPath), ['className="glass relative isolate overflow-hidden"']);

const meterPath = "src/components/sentiment/SentimentMeter.tsx";
expectContains(meterPath, read(meterPath), ["bg-elevated", "bg-hairline-strong"]);

for (const path of [
  "src/components/sentiment/PostCard.tsx",
  "src/components/sentiment/TrendingTickers.tsx",
]) {
  expectAbsent(path, read(path), ["rounded-[var(--radius-chip)]"]);
}
```

- [ ] **Step 2: Kontrolün ilk eksik `inset-panel` ile başarısız olduğunu doğrula**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: FAIL; `MarketTile.tsx` için `inset-panel` eksikliği.

- [ ] **Step 3: Piyasa yüzeylerini ve grafik ayırıcısını uygula**

- `MarketTile` kökü: `inset-panel flex flex-col gap-3 p-4`.
- Değişim rozetleri: `rounded-[var(--radius-inner)]`; yön ikonu, işaretli sayı ve renk aynen korunur.
- `Sparkline` son çapa: `stroke="var(--color-base)"`; alan opaklığı `0.10`.
- `TodayBrief` kökü: `glass relative isolate overflow-hidden`; büyük grafik alan opaklığı `0.10`.
- `MarketOverview` değiştirilmez; zaten `BentoCard` üzerinden yeni yüzeyi tüketir.

- [ ] **Step 4: Topluluk yüzeylerini keskinleştir**

- `PostCard`: flair, duyarlılık ve ticker etiketlerini `rounded-[var(--radius-inner)] bg-elevated` yap.
- `TrendingTickers`: metin rozetlerini `rounded-[var(--radius-inner)]`; gerçek ilerleme çubuğunu `rounded-full` bırak.
- `SentimentMeter`: merkezden ayrışan model ve hesaplama aynen kalır; ölçek `bg-elevated`, merkez çentiği `bg-hairline-strong`; gerçek ölçer dolguları `rounded-full` kalır.
- Hiçbir servis importu, sorgu veya veri alanı değişmez.

- [ ] **Step 5: Sözleşme, mevcut Faz 2C testi ve typecheck çalıştır**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: PASS.

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: 7 test PASS, exit 0.

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 6: Piyasa ve topluluk sunumunu commit et**

```powershell
git add -- scripts/check-glass-theme.ts src/components/market/MarketTile.tsx src/components/market/Sparkline.tsx src/components/market/TodayBrief.tsx src/components/sentiment/PostCard.tsx src/components/sentiment/SentimentMeter.tsx src/components/sentiment/TrendingTickers.tsx
git commit -m "feat: piyasa ve topluluk yuzeylerini keskinlestir"
```

---

### Task 4: Haber Akışı ve Okuma Yüzeyleri

**Files:**
- Modify: `scripts/check-glass-theme.ts`
- Modify: `src/components/news/ArticleReader.tsx`
- Modify: `src/components/news/NewsCard.tsx`
- Modify: `src/components/news/SourceBadge.tsx`
- Modify: `src/components/news/WatchedSources.tsx`

**Interfaces:**
- Consumes: Mevcut `Article`, `Source` ve `NewsList` akışı; Task 1’in sans okuma ve cam tokenları.
- Produces: Veri ve link davranışlarını değiştirmeyen koyu haber listesi, okuma kartı ve boş akış.

- [ ] **Step 1: Haber sözleşmesini ekle**

```ts
const readerPath = "src/components/news/ArticleReader.tsx";
expectContains(readerPath, read(readerPath), ["glass mt-4", "bg-ink", "text-base"]);
expectAbsent(readerPath, read(readerPath), ["text-paper", "rounded-[var(--radius-chip)]"]);

const newsCardPath = "src/components/news/NewsCard.tsx";
expectContains(newsCardPath, read(newsCardPath), ["hover:bg-elevated/70"]);
expectAbsent(newsCardPath, read(newsCardPath), ["hover:bg-sunken/70", "rounded-[var(--radius-chip)]"]);

const sourceBadgePath = "src/components/news/SourceBadge.tsx";
expectContains(sourceBadgePath, read(sourceBadgePath), ["bg-ink", "text-base"]);
```

- [ ] **Step 2: Kontrolün eski haber sınıflarında başarısız olduğunu doğrula**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: FAIL; `ArticleReader.tsx` için `glass mt-4` eksikliği.

- [ ] **Step 3: Haber kartlarını yeni sisteme bağla**

- `ArticleReader` ana article’ı `glass mt-4 ...` yap; serif yorumunu kaldır ve `.reading`in artık Geist Sans kullandığını belgeleyen kısa yorum yaz.
- Harici kaynak CTA’sında `bg-ink text-base hover:bg-accent hover:text-base` kullan.
- “Son dakika” ve ilgili sembol rozetlerinde `rounded-[var(--radius-inner)] bg-elevated` kullan.
- `NewsCard` hover yüzeyini `hover:bg-elevated/70`; bütün rozetleri 3 px iç yarıçapa taşı.
- `SourceBadge` monogramında `bg-ink text-base` kullan.
- `WatchedSources` ikon dairesini gerçek ikon yuvası olduğu için `rounded-full` bırak; yüzeyi `bg-elevated` yap.
- URL, `target`, `rel`, zaman ve kaynak erişilebilirlik metinlerine dokunma.

- [ ] **Step 4: Haber sözleşmesini ve typecheck’i çalıştır**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: PASS.

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 5: Haber yüzeylerini commit et**

```powershell
git add -- scripts/check-glass-theme.ts src/components/news/ArticleReader.tsx src/components/news/NewsCard.tsx src/components/news/SourceBadge.tsx src/components/news/WatchedSources.tsx
git commit -m "feat: haber yuzeylerini koyu cam dile tasi"
```

---

### Task 5: Akademi, Kimlik ve Durum Yüzeyleri

**Files:**
- Modify: `scripts/check-glass-theme.ts`
- Modify: `src/components/academy/RoadmapNode.tsx`
- Modify: `src/components/academy/RoadmapPreview.tsx`
- Modify: `src/components/academy/SourceList.tsx`
- Modify: `src/components/academy/VideoCard.tsx`
- Modify: `src/components/academy/VideoPlayer.tsx`
- Modify: `src/components/auth/LoginForm.tsx`
- Modify: `src/app/(auth)/giris/page.tsx`
- Modify: `src/components/common/EmptyState.tsx`
- Modify: `src/components/common/SectionHeader.tsx`

**Interfaces:**
- Consumes: Mevcut akademi, video ve auth prop/action sözleşmeleri; Task 1–2 yüzey sistemi.
- Produces: Aynı ders/video/giriş davranışlarıyla son ikincil yüzeylerin koyu tema uyumu.

- [ ] **Step 1: Kalan yüzeylerin sözleşme kontrollerini ekle**

```ts
const loginPath = "src/app/(auth)/giris/page.tsx";
expectContains(loginPath, read(loginPath), ['className="glass px-7 py-8 sm:px-9 sm:py-10"']);

const loginFormPath = "src/components/auth/LoginForm.tsx";
expectContains(loginFormPath, read(loginFormPath), ["inset-panel"]);
expectAbsent(loginFormPath, read(loginFormPath), ["bg-sunken"]);

for (const path of [
  "src/components/academy/SourceList.tsx",
  "src/components/academy/VideoCard.tsx",
  "src/components/academy/VideoPlayer.tsx",
]) {
  expectAbsent(path, read(path), ["rounded-[var(--radius-chip)]", "text-paper"]);
}

const emptyPath = "src/components/common/EmptyState.tsx";
expectContains(emptyPath, read(emptyPath), ["bg-elevated"]);
```

- [ ] **Step 2: Kontrolün giriş kartında başarısız olduğunu doğrula**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: FAIL; giriş sayfasında `glass` eksikliği raporlanmalı.

- [ ] **Step 3: Akademi yüzeylerini koyu sisteme bağla**

- `RoadmapNode`: bağlantı çizgilerini hairline tokenlarına bağla; düğümler anlamsal daire olduğu için `rounded-full` kalır; aktif düğüm `bg-elevated text-accent ring-accent` olur.
- `RoadmapPreview`: üst ayırıcı `border-hairline`; veri ve rota davranışı değişmez.
- `SourceList`: kaynak ikon kutuları ve seviye rozetleri `rounded-[var(--radius-inner)] bg-elevated`; hover `bg-elevated/70`.
- `VideoCard` ve `VideoPlayer`: kapak çerçevesi 3 px; süre/seviye rozetleri 3 px; oynat düğmesi gerçek daire olduğu için `rounded-full` kalır; açık `bg-paper`/`text-paper` yerine `bg-ink`/`text-base` çifti kullanılır.

- [ ] **Step 4: Giriş ve ortak durum yüzeylerini bağla**

- Giriş kartı `glass` olur.
- Login inputları `inset-panel`; hata paneli `rounded-[var(--radius-inner)] bg-down-soft`; submit düğmesi `bg-ink text-base` olur.
- `EmptyState` ikon yuvası gerçek daire olarak kalır, yüzeyi `bg-elevated` olur.
- `SectionHeader` Geist Sans hiyerarşisini tüketir; prop imzası değişmez.

- [ ] **Step 5: Kalan sözleşme ve statik doğrulamaları çalıştır**

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: PASS.

Run: `npm run typecheck`

Expected: exit 0.

Run: `npm run lint`

Expected: exit 0; mevcut `!important` uyarıları yeni kural üretmemeli. Uyarı varsa `prefers-reduced-motion` kurallarını Biome uyumlu seçicilerle düzelt, işlevi kaldırma.

- [ ] **Step 6: Akademi, kimlik ve durum yüzeylerini commit et**

```powershell
git add -- scripts/check-glass-theme.ts src/components/academy/RoadmapNode.tsx src/components/academy/RoadmapPreview.tsx src/components/academy/SourceList.tsx src/components/academy/VideoCard.tsx src/components/academy/VideoPlayer.tsx src/components/auth/LoginForm.tsx 'src/app/(auth)/giris/page.tsx' src/components/common/EmptyState.tsx src/components/common/SectionHeader.tsx
git commit -m "feat: akademi ve kimlik yuzeylerini uyumla"
```

---

### Task 6: Son Doğrulama ve Üretim Derlemesi

**Files:**
- Modify if required by verification only: files already listed in Tasks 1–5
- Do not modify: database, service, query, seed, user-owned unrelated files

**Interfaces:**
- Consumes: Tasks 1–5’in tamamlanmış arayüzü ve mevcut yerel Postgres/oturum yapılandırması.
- Produces: Temiz otomatik doğrulama, responsive görsel kanıt ve üretim derlemesi.

- [ ] **Step 1: Teslimat kapsamını kirli çalışma ağacından ayır**

Run: `git status --short`

Expected: Kullanıcının önceden var olan değişiklikleri görünebilir; Tasks 1–5 için commitlenmemiş dosya kalmamalı. İlgisiz dosyaları stage etme, biçimlendirme sonrası da geri alma.

- [ ] **Step 2: Zorunlu komutları sırayla çalıştır**

Run: `npm run format`

Expected: exit 0. Ardından `git status --short` ile formatın ilgisiz dosyalara etkisini kaydet; bu dosyaları restorasyon commit’ine alma.

Run: `npm run typecheck`

Expected: exit 0.

Run: `npm run lint`

Expected: exit 0.

Run: `npm exec -- tsx scripts/check-glass-theme.ts`

Expected: `Cam arayüz kaynak sözleşmesi geçerli.`

Run: `node --import tsx --test src/lib/db/queries/sentiment.test.ts`

Expected: 7 test PASS, exit 0.

- [ ] **Step 3: `.next` hedefini doğrula ve temizle**

PowerShell’de hedefi workspace içinde doğrulamadan silme:

```powershell
$workspace = (Get-Location).Path
$nextPath = [System.IO.Path]::GetFullPath((Join-Path $workspace ".next"))
if ($nextPath -ne (Join-Path $workspace ".next")) { throw "Beklenmeyen .next hedefi: $nextPath" }
if (Test-Path -LiteralPath $nextPath) { Remove-Item -LiteralPath $nextPath -Recurse -Force }
```

Expected: Yalnız `C:\Users\Kaynxx\Desktop\Finans Program\.next` kaldırılır; kaynak dosya silinmez.

- [ ] **Step 4: Üretim derlemesini çalıştır**

Run: `npm run build`

Expected: exit 0; Next.js üretim derlemesi ve rota üretimi tamamlanır.

- [ ] **Step 5: Responsive ve erişilebilirlik kontrolü yap**

Run: `npm run dev`

Tarayıcıda `/giris`, `/`, `/haberler`, `/topluluk`, `/akademi` ve erişilebilen bir haber/ders detayını 1440, 768 ve 375 px genişliklerde kontrol et. Her genişlikte şu maddelerin tamamını doğrula:

- yatay taşma veya kırpılmış kontrol yok,
- Sidebar/TopBar/MobileNav ve kart katmanları ayırt ediliyor,
- yalnız finansal yön öğeleri yeşil/kırmızı,
- bütün klavye odakları 2 px nötr halka gösteriyor,
- `prefers-reduced-motion` hareketi, `prefers-reduced-transparency` blur’u kapatıyor,
- tarayıcı konsolunda yeni hata yok,
- piyasa, topluluk, haber ve akademi ekranları aynı mevcut veriyi göstermeye devam ediyor.

Bir madde başarısızsa ekranı ve bileşeni belirle, yalnız ilgili Task 1–5 dosyasını düzelt; sonra Step 2–5’i yeniden çalıştır.

- [ ] **Step 6: Doğrulama kaynaklı düzeltmeleri ayrı commit et**

Yalnız gerçekten değişen restorasyon dosyalarını açıkça stage et:

```powershell
git add -- scripts/check-glass-theme.ts src/app/globals.css src/app/layout.tsx 'src/app/(auth)/giris/page.tsx' src/components/common src/components/layout src/components/market src/components/sentiment src/components/news src/components/academy src/components/auth
git diff --cached --name-only
git commit -m "fix: cam arayuz son kontrollerini tamamla"
```

`git diff --cached --name-only` çıktısında yalnız yukarıdaki restorasyon kapsamı
bulunmalıdır. Doğrulama hiçbir kaynak değişikliği gerektirmediyse bu üç komutu
çalıştırma ve boş commit oluşturma.

- [ ] **Step 7: Son durumu raporla**

`git status --short` ve `git log -6 --oneline` çıktılarıyla restorasyon commitlerini, korunmuş kullanıcı değişikliklerini ve beş doğrulama komutunun exit kodlarını raporla. `superpowers:finishing-a-development-branch` çağırma.
