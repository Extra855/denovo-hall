# Font Change Guide — De Novo

The site uses 3 fonts via `next/font/google`, mapped to CSS custom properties. RTL (Arabic) overrides both properties to point at the Arabic font.

## Current Setup

| Role | Font | CSS Variable | Tailwind Class |
|------|------|-------------|----------------|
| Body (sans) | Inter | `--font-sans` | `font-sans` |
| Headings (serif) | Playfair Display | `--font-serif` | `font-serif` |
| Arabic (RTL) | Noto Sans Arabic | `--font-arabic` | `font-arabic` |

## Files to Edit

| File | Purpose |
|------|---------|
| `src/app/[locale]/layout.tsx` | Font imports + CSS variable assignment |
| `src/app/globals.css` | Theme variables, RTL override, fallback stacks |

---

## Step 1 — Change the English Fonts

**`src/app/[locale]/layout.tsx`** (lines 2–30)

Replace the import and configuration:

```tsx
// Before
import { Playfair_Display, Inter, Noto_Sans_Arabic } from "next/font/google";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
```

```tsx
// After (example: swap to Cormorant Garamond + DM Sans)
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
```

Update line 118 to use the new variable names:

```tsx
const fontVars = `${cormorantGaramond.variable} ${dmSans.variable} ${notoSansArabic.variable}`;
```

**Key rule:** Keep `variable: "--font-serif"` / `"--font-sans"` — these CSS variable names are referenced everywhere. Only change the Google Font import and the JS variable name.

---

## Step 2 — Change the Arabic Font

**`src/app/[locale]/layout.tsx`** (lines 25–30)

```tsx
// Example: swap to IBM Plex Sans Arabic
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
```

Keep `variable: "--font-arabic"`. Update `fontVars` accordingly.

---

## Step 3 — Update CSS Fallbacks

**`src/app/globals.css`**

1. **`@theme inline` block** (line 7–10) — no changes needed if variable names stay the same.

2. **RTL override** (line 99–103) — no changes needed. It remaps `--font-sans` and `--font-serif` to `--font-arabic` automatically.

3. **`.font-serif-display`** (line 113–115) — update the fallback font name:

```css
/* Before */
.font-serif-display {
  font-family: var(--font-serif), 'Playfair Display', Georgia, serif;
}

/* After */
.font-serif-display {
  font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif;
}
```

4. **Scattered `font-family` declarations** (lines 774, 1031, 1428, 2444, 2580, 2611) — these use `var(--font-serif), Georgia, serif`. Update the fallback name if desired, or leave `Georgia` as a generic serif fallback.

---

## Step 4 — Verify Component Usage

Most components use Tailwind utility classes (`font-sans`, `font-serif`, `font-serif-display`). These resolve through the CSS variables, so they update automatically. No component edits needed.

To find any hardcoded font references:

```bash
grep -rn "Playfair\|Inter\|Noto_Sans" src/ --include="*.tsx" --include="*.ts"
```

---

## Step 5 — Available Google Fonts for Arabic

| Font | Style | Notes |
|------|-------|-------|
| `Noto_Sans_Arabic` | Clean sans | Current default, excellent weight range |
| `Noto_Kufi_Arabic` | Geometric sans | More modern, structured |
| `IBM_Plex_Sans_Arabic` | Professional sans | Clean, corporate feel |
| `Readex_Pro` | Minimal sans | Variable weight, contemporary |
| `Cairo` | Rounded sans | Friendly, readable at small sizes |
| `Tajawal` | Light sans | Elegant, thin weights available |
| `Amiri` | Naskh serif | Traditional, good for headings |

Import syntax: `import { Cairo } from "next/font/google"` → use as `Cairo({ variable: "--font-arabic", subsets: ["arabic"], ... })`.

---

## Checklist

- [ ] Replace font import in `layout.tsx`
- [ ] Update font config objects (keep `variable` names unchanged)
- [ ] Update `fontVars` string with new JS variable names
- [ ] Update fallback names in `globals.css` (`.font-serif-display` + scattered `font-family` lines)
- [ ] Run `bun run build` to verify no font loading errors
- [ ] Test both `/en` and `/ar` routes for correct rendering
- [ ] Check RTL layout — Arabic font should override both serif and sans via the `[dir="rtl"]` block
