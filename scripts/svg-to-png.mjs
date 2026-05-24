/**
 * svg-to-png.mjs
 * Convert SVG files to PNG using sharp.
 *
 * Usage:
 *   node scripts/svg-to-png.mjs                         # converts all SVGs in src/assets/
 *   node scripts/svg-to-png.mjs path/to/file.svg        # converts one file
 *   node scripts/svg-to-png.mjs path/to/file.svg 512    # converts at 512px wide
 *
 * Output: same directory as the source file, .svg → .png
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { resolve, extname, basename, dirname } from "path";

const [,, inputArg, widthArg] = process.argv;
const width = widthArg ? parseInt(widthArg, 10) : 400;

async function convertFile(svgPath, outWidth) {
  const dir = dirname(svgPath);
  const name = basename(svgPath, ".svg");
  const outPath = resolve(dir, `${name}.png`);

  await sharp(svgPath)
    .resize({ width: outWidth })
    .png()
    .toFile(outPath);

  console.log(`✓ ${svgPath} → ${outPath} (${outWidth}px wide)`);
}

async function convertDir(dirPath, outWidth) {
  const entries = await readdir(dirPath);
  const svgs = entries.filter((f) => extname(f).toLowerCase() === ".svg");

  if (svgs.length === 0) {
    console.log("No SVG files found in", dirPath);
    return;
  }

  for (const file of svgs) {
    await convertFile(resolve(dirPath, file), outWidth);
  }
}

async function main() {
  if (inputArg) {
    const s = await stat(inputArg).catch(() => null);
    if (!s) { console.error("File not found:", inputArg); process.exit(1); }
    if (s.isDirectory()) {
      await convertDir(inputArg, width);
    } else {
      await convertFile(resolve(inputArg), width);
    }
  } else {
    // Default: convert everything in src/assets/
    await convertDir(resolve("src/assets"), width);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
