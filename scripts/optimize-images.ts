import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const JPG_QUALITY = 80;

function walkJpgs(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkJpgs(full));
    else if (entry.isFile() && /\.jpe?g$/i.test(entry.name)) results.push(full);
  }
  return results;
}

async function main() {
  const files = walkJpgs("public");
  console.log(`Found ${files.length} JPGs\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const isOG = path.parse(file).name.startsWith("og-");
    const before = fs.statSync(file).size;
    totalBefore += before;

    const pipeline = sharp(file);
    const tmp = file + ".tmp";

    if (isOG) {
      await pipeline
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 80, mozjpeg: true })
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
    console.log(`${Number(saved) > 0 ? "-" : "+"}${Math.abs(before - after) / 1024 | 0}KB (${saved}%)  ${path.basename(file)}  ${before / 1024 | 0}KB → ${after / 1024 | 0}KB`);
  }

  console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% reduction)`);
}

main().catch(console.error);
