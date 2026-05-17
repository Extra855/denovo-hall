# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"De novo" — luxury wedding venue marketing site (denovohall.com). Next.js 16 App Router, React 19, Tailwind v4, Bun runtime. Bilingual (EN/AR) with full RTL support. No database — static content with email-only backend (Resend).

## Commands

```bash
bun run dev          # Dev server on :3000
bun run build        # Production build (copies static + public to standalone output)
bun run start        # Serve standalone build via Bun
bun run lint         # ESLint (very permissive config)
```

No test framework installed.

## Architecture

**Routing:** App Router with `[locale]` dynamic segment (`en` default, `ar`). `src/proxy.ts` is next-intl middleware for locale routing.

**Key paths:**
- `src/app/[locale]/page.tsx` — home page, composes all sections
- `src/app/[locale]/gallery/page.tsx` — gallery sub-page
- `src/app/api/inquiry/route.ts` — inquiry form (Zod + rate limit + Resend)
- `src/app/api/newsletter/route.ts` — newsletter signup (Zod + rate limit + Resend)
- `src/components/sections/` — all page sections (mostly `"use client"`)
- `src/components/gallery/` — gallery page components with masonry grid + lightbox
- `src/components/ui/` — shadcn/ui primitives (accordion, button, dialog, input, label, toast)
- `messages/en.json`, `messages/ar.json` — all translatable content (~700 lines each)

**i18n pattern:**
- Server components: `getTranslations({ locale, namespace })` from `next-intl/server`
- Client components: `useTranslations("Namespace")` from `next-intl`
- Navigation helpers: `src/i18n/navigation.ts` exports `Link`, `useRouter`, `usePathname`, `redirect`

**Server/Client split:** Pages/layouts are Server Components. Most UI sections are Client Components. Forms use dynamic import with `ssr: false` via `client-forms.tsx` wrapper.

## Design System

**Colors (CSS vars):** alabaster `#FAF9F6`, charcoal `#2C2C2C`, champagne `#E8DCC4`, sage `#A9B3A2`. Light/dark mode via `.dark` class.

**Fonts:** Playfair Display (serif/headings), Inter (sans/body), Noto Sans Arabic (RTL override).

**RTL:** `[dir="rtl"]` body resets fonts to Noto Sans Arabic, disables `letter-spacing` and `text-transform: uppercase`. Use logical CSS properties (`start`/`end` not `left`/`right`).

**Animations:** `ScrollReveal` component wraps sections, uses `IntersectionObserver` to trigger CSS animations. Custom `ease-luxury` timing. `useAnimatedCounter` hook for number counters.

## Environment Variables

```
RESEND_API_KEY=         # Resend email API
RESEND_FROM_EMAIL=      # Sender address (default: onboarding@resend.dev)
RESEND_TO_EMAIL=        # Recipient for inquiries/newsletter
```

## Deployment

Standalone output (`output: "standalone"` in next.config.ts) for containerized deployment. Caddyfile proxies :81 → localhost:3000. Static files + public dir copied into standalone output during build.

## Conventions

- Path alias: `@/*` → `./src/*`
- ESLint is permissive — most strict rules disabled
- Rate limiting: in-memory Map, 3 req/IP/60s, periodic cleanup
- Gallery uses typed `GalleryImage` model with `span` property for masonry layout
- SEO: dynamic sitemap, OpenGraph metadata, alternate language tags
