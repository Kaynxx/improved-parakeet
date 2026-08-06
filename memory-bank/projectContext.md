# Project Context

## Overview
Finans Program — "all-in-one" finansal dashboard. Üç modül: gerçek zamanlı piyasa
haberleri (RSS), topluluk duyarlılığı (Reddit), finansal okuryazarlık akademisi.
Estetik referans: Bloomberg Terminal'in modernize edilmiş, retail-friendly hali.
Version: 0.1.0
License: Not specified

## Technical Stack
Runtime: Node.js v24.18.0 (npm 11.16.0 — pnpm/bun yok)
Framework: Next.js 15 (App Router) + React 19
Dil: TypeScript (strict)
Stil: Tailwind CSS v4 (CSS-first @theme) + shadcn/ui (Radix)
Veritabanı: PostgreSQL 16 + Drizzle ORM
Auth: Auth.js v5 + Drizzle adapter + Google OAuth
Veri toplama: ayrı `worker/` süreci + node-cron

## Dependencies
Core (Faz 1'de fiilen kurulan):
next, react, react-dom, tailwindcss v4, lucide-react, motion, clsx, tailwind-merge

Development:
typescript, @types/*, @biomejs/biome

Faz 2'de eklenecek:
drizzle-orm, postgres, next-auth, zod, rss-parser, @mozilla/readability, jsdom,
sanitize-html, node-cron, @tanstack/react-query

## Configuration
- Türkçe UI (hardcoded, i18n katmanı yok — YAGNI), İngilizce içerik
- Şimdilik yalnız localhost; deployment kararı ertelendi
- Taşınabilir Postgres 16.10, `.postgres/` altında (`npm run db:up`) — Docker yok

## Architecture
- Type: Next.js App Router, katmanlı
- Kritik sınır: UI bileşenleri asla `server/integrations/`'a dokunmaz.
  `src/types/` tek veri sözleşmesidir — Faz 1'de `src/mocks/`, Faz 2'de
  `src/server/services/` onu doldurur. Entegrasyon eklenince hiçbir bileşen değişmez.
- Language: TypeScript
- Environment: Node.js
