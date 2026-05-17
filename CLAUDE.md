# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repo.

## Project

"De novo" — luxury wedding venue site (denovohall.com). Next.js 16 App Router, React 19, Tailwind v4, Bun. Bilingual EN/AR, full RTL. No DB — static content, email-only backend (Resend).

## Commands

```bash
bun run dev          # Dev server :3000
bun run build        # Prod build (copies static + public to standalone output)
bun run start        # Serve standalone via Bun
bun run lint         # ESLint (permissive config)
```

No test framework.

## Architecture

**Routing:** App Router, `[locale]` segment (`en` default, `ar`). `src/proxy.ts` = next-intl middleware.

**Key paths:**
- `src/app/[locale]/page.tsx` — home, composes all sections
- `src/app/[locale]/gallery/page.tsx` — gallery sub-page
- `src/app/api/inquiry/route.ts` — inquiry form (Zod + rate limit + Resend)
- `src/app/api/newsletter/route.ts` — newsletter signup (Zod + rate limit + Resend)
- `src/components/sections/` — page sections (mostly `"use client"`)
- `src/components/gallery/` — masonry grid + lightbox
- `src/components/ui/` — shadcn/ui primitives
- `messages/en.json`, `messages/ar.json` — translatable content (~700 lines each)

**i18n:**
- Server: `getTranslations({ locale, namespace })` from `next-intl/server`
- Client: `useTranslations("Namespace")` from `next-intl`
- Nav helpers: `src/i18n/navigation.ts` → `Link`, `useRouter`, `usePathname`, `redirect`

**Server/Client split:** Pages/layouts = Server Components. UI sections = Client Components. Forms use dynamic import `ssr: false` via `client-forms.tsx`.

## Design System

**Colors (CSS vars):** alabaster `#FAF9F6`, charcoal `#2C2C2C`, champagne `#E8DCC4`, sage `#A9B3A2`. Light/dark via `.dark` class.

**Fonts:** Playfair Display (serif/headings), Inter (sans/body), Noto Sans Arabic (RTL).

**RTL:** `[dir="rtl"]` resets fonts to Noto Sans Arabic, disables `letter-spacing` + `text-transform: uppercase`. Use logical CSS props (`start`/`end` not `left`/`right`).

**Animations:** `ScrollReveal` wraps sections, `IntersectionObserver` triggers CSS animations. `ease-luxury` timing. `useAnimatedCounter` hook for number counters.

## Environment Variables

```
RESEND_API_KEY=         # Resend email API
RESEND_FROM_EMAIL=      # Sender (default: onboarding@resend.dev)
RESEND_TO_EMAIL=        # Recipient for inquiries/newsletter
```

## Deployment

Standalone output (`output: "standalone"` in next.config.ts) for containers. Caddyfile proxies :81 → localhost:3000. Build copies static + public into standalone output.

## Conventions

- Path alias: `@/*` → `./src/*`
- ESLint permissive — strict rules disabled
- Rate limiting: in-memory Map, 3 req/IP/60s, periodic cleanup
- Gallery: typed `GalleryImage` with `span` prop for masonry
- SEO: dynamic sitemap, OpenGraph metadata, alternate language tags
