# Font Change Guide — De Novo

The site uses 3 Google Fonts loaded via `next/font/google`, each mapped to a CSS custom property. Components reference these through Tailwind utility classes (`font-sans`, `font-serif`, `font-serif-display`). RTL (Arabic) overrides both properties to point at the Arabic font automatically.

## Current Fonts (as of June 2026)

| Role | Font | CSS Variable | Tailwind Class |
|------|------|-------------|----------------|
| Body (sans) | Plus Jakarta Sans | `--font-sans` | `font-sans` |
| Headings (serif) | Cormorant Garamond | `--font-serif` | `font-serif`, `font-serif-display` |
| Arabic (RTL) | Tajawal | `--font-arabic` | `font-arabic` |

## Files to Edit

| File | What to change |
|------|----------------|
| `src/app/[locale]/layout.tsx` | Font imports, config objects, `fontVars` string |
| `src/app/globals.css` | `.font-serif-display` fallback, scattered `font-family` fallbacks |

---

## Step 1 — Change English Fonts

Edit `src/app/[locale]/layout.tsx` (top of file).

Replace the import:

```tsx
// Change this line:
import { Cormorant_Garamond, Plus_Jakarta_Sans, Tajawal } from "next/font/google";
```

Replace config objects:

```tsx
// Heading font — CSS variable must stay "--font-serif"
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Body font — CSS variable must stay "--font-sans"
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
```

Update the `fontVars` string (~line 118) with your new JS variable names:

```tsx
const fontVars = `${cormorantGaramond.variable} ${plusJakartaSans.variable} ${tajawal.variable}`;
```

**Critical**: Keep `variable: "--font-serif"` and `variable: "--font-sans"`. These CSS variable names are referenced in `globals.css` and every component. Only change the Google Font import and the JS variable name.

---

## Step 2 — Change Arabic Font

Same file, `src/app/[locale]/layout.tsx`:

```tsx
// CSS variable must stay "--font-arabic"
const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
```

Keep `variable: "--font-arabic"`. Update `fontVars` to use the new JS variable name.

---

## Step 3 — Update CSS Fallbacks

Edit `src/app/globals.css`.

### Theme block (`@theme inline`)
Lines ~7–10. No changes needed — variable names stay the same.

### RTL override
Lines ~99–103. No changes needed. The `[dir="rtl"]` block remaps `--font-sans` and `--font-serif` to `--font-arabic` automatically.

### `.font-serif-display` utility
Line ~113. Update the fallback name to match your new serif font:

```css
.font-serif-display {
  font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif;
}
```

### Scattered `font-family` declarations
Lines ~774, 1031, 1428, 2444, 2580, 2611. These all use the same pattern. Update the fallback name:

```css
font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif;
```

You can leave `Georgia, serif` as generic fallbacks — they only activate if Google Fonts fail to load.

---

## Step 4 — Verify

Components use Tailwind classes (`font-sans`, `font-serif`, `font-serif-display`). These resolve through CSS variables, so they update automatically. No component edits needed.

Find any hardcoded references to old font names:

```bash
grep -rn "Playfair\|Inter\|Noto_Sans" src/ --include="*.tsx" --include="*.ts"
```

---

## Available Google Fonts

### English — Serif (headings)

| Font | Import Name | Personality |
|------|-------------|-------------|
| Cormorant Garamond | `Cormorant_Garamond` | Editorial, refined, high-contrast strokes |
| Playfair Display | `Playfair_Display` | Classic luxury, very common on wedding sites |
| EB Garamond | `EB_Garamond` | Historical, warm, humanist |
| Libre Caslon Display | `Libre_Caslon_Display` | Magazine editorial, sharp |
| Fraunces | `Fraunces` | Quirky, warm, optical size axis |
| Cinzel | `Cinzel` | Classical Roman inscriptions, regal |
| DM Serif Display | `DM_Serif_Display` | Bold, modern editorial |
| Bitter | `Bitter` | Slab-serif, contemporary, readable |

### English — Sans (body)

| Font | Import Name | Personality |
|------|-------------|-------------|
| Plus Jakarta Sans | `Plus_Jakarta_Sans` | Warm geometric, friendly terminals |
| Inter | `Inter` | Clinical, excellent readability, generic |
| DM Sans | `DM_Sans` | Clean, geometric, low-contrast |
| Outfit | `Outfit` | Geometric, modern, slightly rounded |
| Sora | `Sora` | Technical, geometric, precise |
| Manrope | `Manrope` | Geometric, wide, contemporary |
| Space Grotesk | `Space_Grotesk` | Monospaced-influenced, techy |

### Arabic

| Font | Import Name | Personality |
|------|-------------|-------------|
| Tajawal | `Tajawal` | Elegant thin weights, warm, modern |
| Noto Sans Arabic | `Noto_Sans_Arabic` | Clinical neutrality, excellent coverage |
| Noto Kufi Arabic | `Noto_Kufi_Arabic` | Geometric, structured, modern |
| Cairo | `Cairo` | Rounded, friendly, readable |
| Readex Pro | `Readex_Pro` | Variable weight, contemporary |
| IBM Plex Sans Arabic | `IBM_Plex_Sans_Arabic` | Professional, corporate |
| Almarai | `Almarai` | Designed for Arabic, modern |
| Amiri | `Amiri` | Naskh serif, traditional, good for headings |

---

## Architecture Notes

### How RTL font switching works

```
English (LTR):
  --font-sans → Plus Jakarta Sans
  --font-serif → Cormorant Garamond

Arabic (RTL): [dir="rtl"] body override in globals.css
  --font-sans → Tajawal (via --font-arabic)
  --font-serif → Tajawal (via --font-arabic)
```

The `[dir="rtl"]` block (globals.css ~line 99) reassigns both `--font-sans` and `--font-serif` to `--font-arabic`. This means every `font-sans` and `font-serif` / `font-serif-display` class automatically uses the Arabic font in RTL mode. No component-level logic needed.

### Why CSS variables instead of direct font-family

`next/font/google` injects font files and creates a unique CSS class + variable per font. Using `variable: "--font-serif"` lets us swap the underlying font in one place (layout.tsx) without touching 50+ component files.

---

## Checklist

- [ ] Replace font import in `layout.tsx`
- [ ] Update font config objects (keep `variable` names: `--font-serif`, `--font-sans`, `--font-arabic`)
- [ ] Update `fontVars` string with new JS variable names
- [ ] Update fallback name in `.font-serif-display` (globals.css)
- [ ] Update fallback names in scattered `font-family` declarations (globals.css)
- [ ] `bun run build` — verify no font loading errors
- [ ] Test `/en` — new serif headings + new sans body
- [ ] Test `/ar` — Arabic font overrides both via `[dir="rtl"]`
- [ ] Verify RTL layout: no letter-spacing, no text-transform
