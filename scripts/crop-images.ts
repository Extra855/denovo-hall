import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

/**
 * Batch crop + compress images in public/ to correct aspect ratios.
 *
 * Rules by file pattern:
 *   hero.jpg                    → 16:9  (1920x1080)  — hero banner
 *   og-*.jpg                    → 1.91:1 (1200x630)  — social cards
 *   *-Hall|*-Ballroom|*-Terrace|*-Lounge|romantic|vintage → 3:2 (1200x800) — space cards
 *   Maram-Haitham|Khawla-Mustafa|Kholoud-Ahmed       → 1:1 (400x400)  — testimonial portraits
 *   Sarah-Michael|Emma-James|Olivia-Thomas|Grace-William → 4:5 (800x1000) — featured wedding covers
 *   gallery/featured-weddings/*  → skip (same file, different spans per wedding)
 *   gallery/*                    → 4:5 (1440x1800) — general gallery items
 *
 * Usage: bun run scripts/crop-images.ts
 * Dry run: DRY_RUN=1 bun run scripts/crop-images.ts
 */

const DRY_RUN = !!process.env.DRY_RUN;
const JPG_QUALITY = 80;

interface CropRule {
  test: (file: string) => boolean;
  width: number;
  height: number;
  label: string;
}

// Ordered: first match wins
const rules: CropRule[] = [
  {
    test: (f) => path.basename(f) === "hero.jpg",
    width: 1920,
    height: 1080,
    label: "hero 16:9",
  },
  {
    test: (f) => path.basename(f).startsWith("og-"),
    width: 1200,
    height: 630,
    label: "og 1.91:1",
  },
  {
    test: (f) =>
      /(?:Hall|Ballroom|Terrace|Lounge)\.jpg$/i.test(f) ||
      /^(romantic|vintage)\.jpg$/i.test(path.basename(f)),
    width: 1200,
    height: 800,
    label: "space-card 3:2",
  },
  {
    test: (f) =>
      /^(Maram-Haitham|Khawla-Mustafa|Kholoud-Ahmed)\.jpg$/i.test(
        path.basename(f)
      ),
    width: 400,
    height: 400,
    label: "testimonial 1:1",
  },
  {
    test: (f) =>
      /^(Sarah-Michael|Emma-James|Olivia-Thomas|Grace-William)\.jpg$/i.test(
        path.basename(f)
      ),
    width: 800,
    height: 1000,
    label: "wedding-cover 4:5",
  },
  {
    // Gallery items NOT in featured-weddings subdirs
    test: (f) => {
      const rel = path.relative("public", f);
      return (
        rel.startsWith("gallery" + path.sep) &&
        !rel.startsWith("gallery" + path.sep + "featured-weddings" + path.sep)
      );
    },
    width: 1440,
    height: 1800,
    label: "gallery 4:5",
  },
];

function matchRule(file: string): CropRule | undefined {
  return rules.find((r) => r.test(file));
}

function walkJpgs(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkJpgs(full));
    else if (entry.isFile() && /\.jpe?g$/i.test(entry.name))
      results.push(full);
  }
  return results;
}

async function main() {
  const files = walkJpgs("public");
  console.log(`Found ${files.length} JPGs\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;

  for (const file of files) {
    const rule = matchRule(file);
    const before = fs.statSync(file).size;
    totalBefore += before;
    const tmp = file + ".tmp";

    if (!rule) {
      // No matching rule — just recompress
      if (DRY_RUN) {
        console.log(
          `[SKIP] ${path.relative("public", file)} — no crop rule, would recompress only`
        );
        skipped++;
        continue;
      }
      await sharp(file)
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tmp);
      fs.renameSync(tmp, file);
      const after = fs.statSync(file).size;
      totalAfter += after;
      console.log(
        `  recompress  ${path.relative("public", file)}  ${before / 1024 | 0}KB → ${after / 1024 | 0}KB`
      );
      continue;
    }

    const meta = await sharp(file).metadata();
    const currentRatio = (meta.width || 1) / (meta.height || 1);
    const targetRatio = rule.width / rule.height;
    const ratioDiff = Math.abs(currentRatio - targetRatio);
    const needsCrop = ratioDiff > 0.05; // 5% tolerance

    if (DRY_RUN) {
      console.log(
        `[${needsCrop ? "CROP" : "OK  "}] ${path.relative("public", file).padEnd(45)} ${String(meta.width + "x" + meta.height).padEnd(12)} → ${rule.width}x${rule.height}  (${rule.label})`
      );
      skipped++;
      continue;
    }

    const pipeline = sharp(file);
    if (needsCrop) {
      await pipeline
        .resize(rule.width, rule.height, { fit: "cover", position: "center" })
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tmp);
    } else {
      await pipeline
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tmp);
    }

    fs.renameSync(tmp, file);
    const after = fs.statSync(file).size;
    totalAfter += after;
    const saved = ((1 - after / before) * 100).toFixed(0);
    console.log(
      `${needsCrop ? "✂" : " "} ${rule.label.padEnd(18)} ${path.relative("public", file).padEnd(45)} ${before / 1024 | 0}KB → ${after / 1024 | 0}KB (${saved}%)`
    );
  }

  if (DRY_RUN) {
    console.log(`\nDry run — ${skipped} files listed, no changes made.`);
  } else {
    console.log(
      `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% reduction)`
    );
  }
}

main().catch(console.error);
