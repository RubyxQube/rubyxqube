/**
 * Generates monochrome logo variants — mark stays original, text becomes white or black.
 * Outputs:
 *   public/brand/logo-h-mono-white.png  — mark original + all text white
 *   public/brand/logo-h-mono-black.png  — mark original + all text black
 *
 * Boundary: x < 230 = mark (keep), x >= 230 = text (transform)
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "../public/brand/logo-h-white.png");

const TEXT_START_X = 230; // gap between mark and text

async function generate(targetR, targetG, targetB, outName) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  for (let y = 0; y < height; y++) {
    for (let x = TEXT_START_X; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > 10) {
        data[i]     = targetR;
        data[i + 1] = targetG;
        data[i + 2] = targetB;
      }
    }
  }

  const outPath = join(__dirname, "../public/brand", outName);
  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(outPath);
  console.log(`Done → ${outPath}`);
}

await generate(255, 255, 255, "logo-h-mono-white.png");
await generate(20,  12,  15,  "logo-h-mono-black.png");
