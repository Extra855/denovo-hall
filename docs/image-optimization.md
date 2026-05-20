# Image Optimization Guide — De Novo Website

## 1. Quick Reference — Image Specs by Usage

| Usage | Format | Max Dimensions | Max File Size | Aspect Ratio | Notes |
|-------|--------|---------------|---------------|-------------|-------|
| Hero (full-width banner) | AVIF + WebP + JPG fallback | 1920x1080 | 150KB (AVIF) / 250KB (WebP) / 300KB (JPG) | 16:9 | `sizes="100vw"`, `priority` |
| Gallery masonry | AVIF + WebP + JPG fallback | 1440x1800 (tall), 1440x960 (wide), 1440x1440 (square) | 100-200KB per variant | varies by span | `next/image` auto-optimizes |
| Space cards | AVIF + WebP + JPG fallback | 1200x800 | 80KB (AVIF) / 120KB (WebP) | 3:2 | Thumbnail size |
| Testimonial portraits | AVIF + WebP + JPG fallback | 400x400 | 30KB (AVIF) / 50KB (WebP) | 1:1 | Small display |
| OG images | JPG only (social crawlers don't support WebP/AVIF) | 1200x630 | <100KB | 1.91:1 | Must be static JPG |
| Favicons | SVG or PNG | Multiple | Minimal | 1:1 | Pre-existing |

## 2. Best Formats for Web

- **AVIF** — Best compression (50% smaller than JPG). Supported in Chrome, Firefox, Safari 16+. Use as primary.
- **WebP** — Good compression (25-35% smaller than JPG). Near-universal support. Use as fallback.
- **JPEG** — Universal. Keep as final fallback for OG images and legacy.
- **Never use PNG for photos** — 3-5x larger than equivalent JPG/WebP/AVIF.

**This site's strategy**: Store JPG originals in `public/`. Next.js `<Image>` auto-serves AVIF/WebP to supported browsers (already configured in `next.config.ts`). For OG meta, only JPG works.

## 3. Aspect Ratios for This Site

| Context | Ratio | Why |
|---------|-------|-----|
| Hero banner | 16:9 | Full-width, cinematic |
| Gallery "tall" span | 4:5 | Portrait orientation |
| Gallery "wide" span | 3:2 | Landscape orientation |
| Gallery "large" span | 1:1 | Square feature |
| Gallery "normal" span | 4:5 or 3:2 | Flexible |
| Space cards | 3:2 | Consistent grid |
| Testimonial avatars | 1:1 | Circle crop |
| OG social cards | 1.91:1 | Facebook/Twitter spec |

## 4. Compression Workflow — Existing Images

### Step 1: Install tools

```bash
# Sharp (Node.js) — best for batch processing
bun add -d sharp

# Or CLI alternatives:
# apt install libavif-bin  # for avif encoder
# npm i -g squoosh-cli     # Google's Squoosh
```

### Step 2: Batch convert all JPGs

Create a script `scripts/optimize-images.ts`:

```typescript
import sharp from "sharp";
import { globSync } from "fs";
import path from "path";

const QUALITY = 75; // AVIF quality; WebP uses 80
const JPG_QUALITY = 80;

// Process all JPGs in public/
const files = globSync("public/**/*.jpg");

for (const file of files) {
  const parsed = path.parse(file);
  const isOG = parsed.name.startsWith("og-");

  if (isOG) {
    // OG images: resize to 1200x630, compress JPG only (crawlers need JPG)
    await sharp(file)
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(file + ".tmp");
  } else {
    // Regular images: strip metadata, optimize JPG
    await sharp(file)
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
      .toFile(file + ".tmp");
  }

  // Replace original with optimized
  fs.renameSync(file + ".tmp", file);
}
```

### Step 3: Verify results

```bash
# Check sizes after optimization
find public/ -name "*.jpg" -exec du -h {} + | sort -rh

# Target: no image over 200KB except hero (300KB max)
```

## 5. Workflow for New Images

When adding new images to the site:

1. **Prepare the source** — Export at 2x display size max. No image needs >2048px on any axis.
2. **Correct aspect ratio** — Crop to the target ratio before importing. See table in Section 3.
3. **Strip metadata** — Remove EXIF (camera info, GPS). `sharp` does this by default.
4. **Compress** — Run through the optimization script, or manually:
   ```bash
   # One-off via sharp CLI
   npx sharp-cli -i input.jpg -o output.jpg --format jpg --quality 80

   # Or via squoosh
   squoosh-cli --mozjpeg '{quality:80}' input.jpg
   ```
5. **Place in correct directory**:
   - `public/` — Top-level site images (hero, spaces, testimonials)
   - `public/gallery/` — General gallery images
   - `public/gallery/featured-weddings/{id}/` — Per-wedding gallery sets
6. **Update data files**:
   - Gallery images → `src/components/gallery/gallery-data.ts`
   - Testimonial portraits → `messages/en.json` + `messages/ar.json` (if src changes)
   - Featured wedding covers → `featuredWeddingImages` in gallery-data.ts

## 6. Quick Size Targets

| Image type | Current avg | Target | Reduction |
|---|---|---|---|
| Hero/banner | 400KB | 150-250KB | ~40% |
| Gallery item | 200-650KB | 80-150KB | ~60% |
| OG card | 332KB | <100KB | ~70% |
| Space card | 340-540KB | 80-120KB | ~75% |
| Testimonial avatar | 110-190KB | 30-50KB | ~70% |

## 7. Next.js Image Best Practices (already in place)

- `next/image` with `sizes` prop set correctly (prevents over-fetching)
- `priority` on hero/LCP images
- `formats: ["image/avif", "image/webp"]` in `next.config.ts`
- `BlurImage` component for progressive loading
- Long cache headers on static assets (already configured)

## 8. What NOT to Do

- Don't store WebP/AVIF files in `public/` — Next.js generates these automatically. JPG source is fine.
- Don't use PNG for photographs.
- Don't exceed 2048px on any axis — no real-world benefit for this site.
- Don't skip the `sizes` prop on `<Image>` — causes Next.js to generate oversized images.
- Don't use `unoptimized` on `<Image>` unless absolutely necessary.

## workflow
- crip to target ratio
- run optimize script
exception: OG images - the script does resize those to 1200x630 with fit: "cover" (centers and crops).

## 
bun run build does NOT auto-generate AVIF/WebP files for /public.   
                                                  
  Here's what's actually happening:                                       
                                                                          
  next.config.ts:10 — formats: ["image/avif", "image/webp"] configures    
  Next.js's built-in Image Optimization API (the /_next/image endpoint).  
  This is a runtime service, not a build-time step.
                                                  
  How it works:

  1. /public images stay as-is — your .jpg files in /public are copied
  unchanged into the standalone output (cp -r public .next/standalone/)
  2. Optimization happens on request — when a browser hits <Image>,
  Next.js fetches the original from /public, converts to AVIF/WebP
  on-the-fly via /_next/image?url=...&w=...&q=..., and caches the result
  in .next/cache/images/
  3. First request is slow — no pre-generation. Each image variant is
  lazy-computed on first access.

  Implications for your setup:

  - Works fine with the Caddy proxy setup — Next.js server handles image
  optimization at runtime
  - output: "standalone" is compatible — the image optimization runs as
  part of the Node server
  - No build-time AVIF/WebP files are produced in .next/static/ or
  anywhere else
  - Cached optimized images live in .next/cache/images/ (not copied to
  standalone — cache rebuilds on each deploy)

  If you want build-time pre-generation, you'd need a separate tool like
  sharp scripts or next-image-export-optimizer. But for your
  server-rendered setup, the runtime optimization is the intended approach
   and works correctly.

## 
● One video: public/videos/1.mp4 — 6.6MB, 720x1280, 19s, H.264, ~2.9Mbps.
  Used in hero and testimonials (3 slots, same file).                     
                                                                          
  Assessment:                                                            
                                                                          
  - Size: 6.6MB is heavy for a 19s clip. Target: <2MB.                    
  - Aspect ratio: 9:16 (portrait). Hero is 16:9 (landscape) — mismatch.   
  Testimonial cards look fine with portrait.                              
  - Resolution: 720x1280 is fine for mobile, but no need for 1280px       
  height.                                                                 
                                                                          
  Recommendations:

  ┌──────────────┬────────────────┬─────────────┬─────────┬─────────┐
  │    Usage     │   Resolution   │    Codec    │ Bitrate │ Target  │
  │              │                │             │         │  size   │
  ├──────────────┼────────────────┼─────────────┼─────────┼─────────┤
  │ Hero         │ 1280x720       │ H.264       │ ~1Mbps  │ ~2MB    │
  │ background   │ (16:9)         │ (baseline)  │         │         │
  ├──────────────┼────────────────┼─────────────┼─────────┼─────────┤
  │ Testimonial  │ 720x1280       │ H.264       │         │         │
  │ cards        │ (9:16) or      │ (baseline)  │ ~1Mbps  │ ~2MB    │
  │              │ 540x960        │             │         │         │
  └──────────────┴────────────────┴─────────────┴─────────┴─────────┘

  You currently use the same file for both hero and testimonials. Ideally
  two versions: landscape for hero, portrait for cards. But if keeping one
   file, re-encode at lower bitrate:

  ffmpeg -i public/videos/1.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac
   -b:a 48k public/videos/1.mp4.tmp && mv public/videos/1.mp4.tmp
  public/videos/1.mp4

  CRF 28 on a 19s clip should land around 1.5-2MB. Want me to run it?

## 

## 

## 


