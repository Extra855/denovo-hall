# Blog Implementation Plan — Review

## Architecture Assessment

**CMS:** Sanity headless CMS — good fit for static-first Next.js site with no database.

**i18n model:** Field-level translation (`title_en`, `title_ar`) — pragmatic for bilingual-only site.

**Rendering:** ISR with 5-min revalidation + webhook-based tag revalidation.

**Deployment:** Embedded Studio at `/admin`, standalone output.

---

## Critical Gaps (Must Fix Before Build)

### 1. No Draft/Preview Mode

Plan skips preview entirely. Content editors publish → wait up to 5 min → check live. Unpublished drafts are invisible on frontend.

**Missing:**
- Draft Mode API setup (`draftMode().enable()` / `draftMode().disable()`)
- `/api/draft` route to toggle Next.js draft mode from Sanity
- Sanity preview URL configuration: `https://denovohall.com/api/draft?secret=...&slug=<slug>`
- GROQ queries bifurcated: draft mode uses `perspective: "previewDrafts"` to fetch unpublished documents
- Visual Editing via `@sanity/visual-editing` — overlays Sanity Studio context on live preview
- `sanity.config.ts` needs `studioHost` + preview URL setup

**Impact:** Editors cannot verify content before publishing. High risk of typos/broken layouts on production.

**Fix:**
- Add `/api/draft` route handler with `DRAFT_MODE_SECRET` env var
- Modify `sanityFetch` to accept `perspective` option, use `"previewDrafts"` when draft mode active
- Add `@sanity/visual-editing` to blog post page (client component, conditionally loaded)
- Document preview URL setup in Sanity dashboard: Tools → Project → API Settings → Preview URL

---

### 2. No Error Handling or Fallbacks

Plan has zero error handling. No retry logic, no timeouts, no fallback UI when Sanity is unreachable.

**Missing:**
- `sanityFetch` timeout — default fetch has no timeout. Sanity API outage = hung requests
- Retry logic with exponential backoff for transient failures
- Fallback UI components: "Blog temporarily unavailable" state
- `not-found.tsx` for `/blog/[slug]` — missing slug should return 404, not error
- Error boundary around `<PortableText>` rendering — malformed block data crashes page
- `try/catch` in page server components with graceful degradation
- Health check or circuit breaker pattern for Sanity API

**Impact:** Single Sanity API timeout = blog pages hang or crash. No user feedback. No recovery.

**Fix:**
- Wrap `sanityFetch` with AbortController timeout (5s default)
- Add retry: 2 retries, 1s backoff, only on 5xx/network errors
- Blog listing page: catch fetch error → render empty state with "temporarily unavailable" message
- Blog post page: catch fetch error → `notFound()` if post missing, error UI if API unreachable
- Add `error.tsx` boundary files for `/blog` and `/blog/[slug]` routes
- Add `not-found.tsx` for `/blog/[slug]`
- Log errors server-side for monitoring

---

### 3. Webhook Security Gaps

Plan mentions `parseBody` from `next-sanity/webhook` for signature verification. Insufficient.

**Missing:**
- `SANITY_REVALIDATE_SECRET` — listed as env var but no setup instructions, no rotation strategy
- Rate limiting on `/api/revalidate/tag` endpoint — no protection against replay attacks or brute-force revalidation floods
- IP allowlisting (optional) — Sanity webhook IPs are documented
- Request body validation — malformed tag strings could trigger `revalidateTag()` on arbitrary tags
- Logging — no audit trail of revalidation events
- Secret rotation documentation

**Impact:** Compromised webhook endpoint can trigger unlimited cache purges, degrading performance. No visibility into revalidation failures.

**Fix:**
- Add rate limiting (reuse existing in-memory Map pattern from inquiry route: 10 req/min)
- Validate tag format: only accept tags matching pattern `^(post|author|category|tag):[a-z0-9-]+$` or exact type strings
- Add `SANITY_REVALIDATE_SECRET` setup to Step 1 instructions with generation command: `openssl rand -base64 32`
- Log revalidation events: `{ timestamp, tag, success, source }`
- Add secret rotation docs: update env var → update Sanity webhook → verify

---

### 4. No Image Alt Text Fallback

Blog card and post header render `featuredImage` but plan doesn't handle missing alt text.

**Missing:**
- `alt_en` / `alt_ar` on `featuredImage` are optional — no fallback when empty
- Inline images within Portable Text `body_en` / `body_ar` — no alt text field defined at all
- Author `photo` — no alt text
- Decorative image handling — some images may need `alt=""` with `role="presentation"` for accessibility

**Impact:** Accessibility violation (WCAG 2.1 Level A, criterion 1.1.1). Screen readers read filename or skip image entirely.

**Fix:**
- Schema: make `alt_en` / `alt_ar` required on `featuredImage`, or add validation: `validation: Rule => Rule.required().warning("Alt text strongly recommended")`
- Component fallback: `alt={post[`alt_${locale}`] || post[`title_${locale}`] || "Blog post image"}`
- Inline image block in Portable Text: add `alt` field to image block schema with same fallback pattern
- Author photo: `alt={author.name}` as fallback
- Add accessibility review to verification checklist

---

## Design Weaknesses

### 5. Embedded Studio at `/admin` — Stability Risk

`force-static` export on Studio route conflicts with `next-sanity`'s `NextStudio` component, which is a client-side SPA. With `output: "standalone"`, the studio route may fail at build time.

Also: `/admin` is a common bot/admin enumeration target. No auth layer specified.

**Fix:**
- Remove `force-static` — Studio must be `force-dynamic` or unconfigured
- Add Sanity authentication (Sanity Studio has built-in auth via Sanity project)
- Add rate limiting or IP restriction on `/admin` route
- Consider separate Studio deployment (subdomain) to decouple content management from site deployment

---

### 6. ISR + Webhook Redundancy

Plan has both `revalidate: 300` (5-min ISR) and webhook tag revalidation. These compete. If webhook works, ISR timer is wasteful. If webhook fails, 5-min delay is the fallback.

**Fix:** Document this as intentional strategy: "webhook = primary revalidation. ISR 5-min = fallback for missed webhooks." Reduce ISR to 60 min to reduce unnecessary revalidation while keeping safety net.

---

### 7. Field-Level i18n Doesn't Scale Beyond 2 Languages

`title_en`, `title_ar` works for bilingual. Adding a 3rd language (e.g., French for North Africa market) requires modifying every schema, every GROQ query, every component.

**Fix:** For Phase 1, keep field-level i18n — it's simpler and the site is bilingual-only. Document this as a known limitation. If >2 languages become needed, migrate to Sanity's `sanity-plugin-internationalized-array` (documented migration path exists).

---

### 8. `generateStaticParams` + `dynamicParams` Not Specified

`generateStaticParams` runs at build time. New posts created after build won't have pre-rendered pages until ISR or webhook fires. On standalone deploys, visitors hitting new slugs may get 404 if `dynamicParams` isn't explicitly set.

**Fix:** Add `export const dynamicParams = true` to `/blog/[slug]/page.tsx` to allow on-demand rendering for non-pre-rendered slugs.

---

### 9. BlurImage Incompatibility with Sanity LQIP

Existing `BlurImage` component expects base64 `blurDataURL`. Sanity image API returns LQIP differently (low-quality placeholder as part of image metadata). Plan doesn't bridge this gap.

**Fix:**
- Extend `sanityFetch` image handling to extract Sanity's `metadata.lqip` (base64) for use as `blurDataURL`
- Or create `SanityImage` component wrapping Next.js `<Image>` with Sanity-specific blur handling
- Map Sanity crop/hotspot data to `object-fit` + `object-position` styles

---

### 10. No Seed/Dev Data Strategy

Step 13: "Create test content in Studio" — manual. No seed script, no fixture data.

Every developer needs their own Sanity project or shared credentials. No reproducible content for local dev.

**Fix:**
- Create `scripts/seed-sanity.ts` with `@sanity/client` write calls for sample categories, tags, author, and 3 test posts
- Add `bun run seed:blog` script to `package.json`
- Document setup: create Sanity project → run seed → verify `/blog` renders

---

### 11. Portable Text Complexity Underestimated

`blog-post-body.tsx` is described in 3 lines. Actual implementation is ~200+ lines with custom serializers.

**Missing from plan:**
- Inline image block rendering within Portable Text
- Embedded content blocks (YouTube/Instagram — relevant for wedding venue blog)
- Table blocks
- Code blocks (if ever needed)
- Custom block validators

**Fix:** Scope Portable Text serializers as a dedicated sub-task with explicit component list for each block type. Add estimate for testing with real content.

---

### 12. No Error Boundaries for Blog Routes

No `error.tsx` or `not-found.tsx` defined for blog section.

**Fix:**
- `src/app/[locale]/blog/error.tsx` — error boundary with retry button
- `src/app/[locale]/blog/[slug]/error.tsx` — error boundary with "back to blog" link
- `src/app/[locale]/blog/[slug]/not-found.tsx` — 404 for missing posts

---

## Future-Proof Rating

| Aspect | Rating | Notes |
|--------|--------|-------|
| CMS extensibility | Strong | Sanity schemas composable. Adding content types (events, testimonials) is clean |
| Content modeling | Medium | Field-level i18n brittle for >2 languages. Author/category/tag taxonomy is good |
| Editorial workflow | Weak → Fixable | Draft/preview mode (Gap 1) fixes this. Without it — broken |
| Performance | Strong | ISR + webhook + standalone output = fast, scalable |
| Search/discoverability | Medium | Phase 3 client-side search won't scale past ~100 posts. Server-side search or Algolia needed eventually |
| Image pipeline | Medium | Sanity CDN works but lacks Next.js-level optimization. Dual CDN adds complexity |
| Developer experience | Weak | No seed data (Gap 10). Each dev needs Sanity project |
| Deployment | Medium | Studio embedded = full site redeploy for Studio updates. Consider decoupling |
| Accessibility | Weak → Fixable | Missing alt fallbacks (Gap 4). Fixable in component layer |
| Security | Medium → Fixable | Webhook security (Gap 3) needs hardening. Studio auth via Sanity built-in |

---

## Recommended Priority Order

1. **Draft/preview mode** (Gap 1) — editorial UX blocker
2. **Error handling + fallbacks** (Gap 2) — production stability
3. **Image alt fallback** (Gap 4) — accessibility compliance
4. **Webhook security** (Gap 3) — production security
5. **Studio auth + force-dynamic** (Gap 5) — deployment blocker
6. **BlurImage + Sanity LQIP bridge** (Gap 9) — existing component breaks
7. **Seed data script** (Gap 10) — developer experience
8. **dynamicParams** (Gap 8) — new post 404 prevention
9. **ISR/webhook strategy docs** (Gap 6) — clarity, not code
10. **Error boundaries** (Gap 12) — user experience
11. **Portable Text scope** (Gap 11) — implementation accuracy
12. **i18n scalability docs** (Gap 7) — future reference only
