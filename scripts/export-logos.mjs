/**
 * export-logos.mjs
 * Exports all official RubyxQube brand assets as PNG / ICO.
 *
 * Usage:
 *   node scripts/export-logos.mjs
 *
 * Outputs → public/brand/ (and public/ for favicon + apple-touch-icon)
 *
 * Requires: puppeteer, sharp, to-ico
 *   npm install -D puppeteer to-ico
 */

import puppeteer from "puppeteer";
import sharp    from "sharp";
import toIco    from "to-ico";
import { writeFile, mkdir } from "fs/promises";
import { resolve, dirname }  from "path";
import { fileURLToPath }     from "url";
import { existsSync }        from "fs";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = resolve(__dir, "..");
const BRAND = resolve(ROOT, "public", "brand");

// ─────────────────────────────────────────────────────────────────────────────
// SVG template helpers
// ─────────────────────────────────────────────────────────────────────────────

function cubeSVG(id, width, height) {
  return `<svg width="${+width.toFixed(2)}" height="${+height.toFixed(2)}" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}-t" x1="18" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#ff5c7a"/><stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>
    <linearGradient id="${id}-r" x1="34" y1="11" x2="18" y2="41" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#c0112f"/><stop offset="100%" stop-color="#5e0b1c"/>
    </linearGradient>
    <linearGradient id="${id}-l" x1="2" y1="11" x2="18" y2="41" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#e11d48"/><stop offset="100%" stop-color="#800e25"/>
    </linearGradient>
    <filter id="${id}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="1 0 0 0 0.88 0 0 0 0 0.11 0 0 0 0 0.28 0 0 0 0.55 0" result="glow"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="${id}-cL"><path d="M2 11 L18 21 L18 41 L2 31 Z"/></clipPath>
    <clipPath id="${id}-cR"><path d="M18 21 L34 11 L34 31 L18 41 Z"/></clipPath>
    <clipPath id="${id}-cS"><path d="M2 11 L18 21 L34 11 L34 31 L18 41 L2 31 Z"/></clipPath>
  </defs>
  <g filter="url(#${id}-glow)">
    <path d="M18 2 L34 11 L18 21 L2 11 Z"  fill="url(#${id}-t)"/>
    <path d="M34 11 L34 31 L18 41 L18 21 Z" fill="url(#${id}-r)"/>
    <path d="M2 11 L18 21 L18 41 L2 31 Z"   fill="url(#${id}-l)"/>
    <!-- Faint X across side faces -->
    <g clip-path="url(#${id}-cS)">
      <line x1="2"  y1="11" x2="34" y2="31" stroke="rgba(255,255,255,0.07)" stroke-width="0.7"/>
      <line x1="34" y1="11" x2="2"  y2="31" stroke="rgba(255,255,255,0.07)" stroke-width="0.7"/>
    </g>
    <!-- Edge highlights -->
    <path d="M18 2 L2 11"   stroke="rgba(255,255,255,0.40)" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M18 2 L34 11"  stroke="rgba(255,255,255,0.18)" stroke-width="0.7" stroke-linecap="round"/>
    <path d="M18 21 L18 41" stroke="rgba(255,255,255,0.10)" stroke-width="0.6" stroke-linecap="round"/>
    <path d="M2 31 L18 41"  stroke="rgba(255,255,255,0.07)" stroke-width="0.5" stroke-linecap="round"/>
    <!-- Apex shine -->
    <path d="M18 2 L24 5.5 L18 9 L12 5.5 Z" fill="rgba(255,255,255,0.13)"/>
    <!-- Top rim -->
    <path d="M18 2 L34 11 L18 21 L2 11 Z" stroke="rgba(255,255,255,0.10)" stroke-width="0.5" fill="none"/>
  </g>
</svg>`;
}

function wordmark(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(255,255,255,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube</span>`;
}

function wordmarkTM(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(255,255,255,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube<sup style="font-size:0.42em;font-weight:700;letter-spacing:0;color:rgba(255,255,255,0.45);vertical-align:super;line-height:0;">™</sup></span>`;
}

function wordmarkR(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(255,255,255,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube<sup style="font-size:0.42em;font-weight:700;letter-spacing:0;color:rgba(255,255,255,0.45);vertical-align:super;line-height:0;">®</sup></span>`;
}

function taglineSpan(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${fs}px;letter-spacing:0.18em;color:rgba(255,255,255,0.28);text-transform:uppercase;white-space:nowrap;line-height:1;">Website&nbsp;•&nbsp;AI</span>`;
}

function horizontal(id, h) {
  const mw = h * 0.78, fs = h * 0.40, ts = h * 0.165, gap = h * 0.22, tg = h * 0.07;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:${tg}px;">
    ${wordmark(fs)}
    ${taglineSpan(ts)}
  </div>
</div>`;
}

function stacked(id, h) {
  const mw = h * 0.78, fs = h * 0.21, ts = h * 0.10, gap = h * 0.05, tg = h * 0.02;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmark(fs)}
  <span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${ts}px;letter-spacing:0.18em;color:rgba(255,255,255,0.28);text-transform:uppercase;white-space:nowrap;line-height:1;margin-top:${tg}px;">Website&nbsp;•&nbsp;AI</span>
</div>`;
}

function markDiv(id, h) {
  const mw = h * 0.78, pad = h * 0.18;
  return `<div id="${id}" style="display:inline-block;padding:${pad}px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
</div>`;
}

function horizontalClean(id, h) {
  const mw = h * 0.78, fs = h * 0.40, gap = h * 0.22;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmark(fs)}
</div>`;
}

function stackedClean(id, h) {
  const mw = h * 0.78, fs = h * 0.21, gap = h * 0.05;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmark(fs)}
</div>`;
}

// ── TM variants ──────────────────────────────────────────────────────────────

function horizontalTM(id, h) {
  const mw = h * 0.78, fs = h * 0.40, ts = h * 0.165, gap = h * 0.22, tg = h * 0.07;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:${tg}px;">
    ${wordmarkTM(fs)}
    ${taglineSpan(ts)}
  </div>
</div>`;
}

function stackedTM(id, h) {
  const mw = h * 0.78, fs = h * 0.21, ts = h * 0.10, gap = h * 0.05, tg = h * 0.02;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkTM(fs)}
  <span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${ts}px;letter-spacing:0.18em;color:rgba(255,255,255,0.28);text-transform:uppercase;white-space:nowrap;line-height:1;margin-top:${tg}px;">Website&nbsp;•&nbsp;AI</span>
</div>`;
}

function horizontalCleanTM(id, h) {
  const mw = h * 0.78, fs = h * 0.40, gap = h * 0.22;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkTM(fs)}
</div>`;
}

function stackedCleanTM(id, h) {
  const mw = h * 0.78, fs = h * 0.21, gap = h * 0.05;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkTM(fs)}
</div>`;
}

// ── ® variants ───────────────────────────────────────────────────────────────

function horizontalR(id, h) {
  const mw = h * 0.78, fs = h * 0.40, ts = h * 0.165, gap = h * 0.22, tg = h * 0.07;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:${tg}px;">
    ${wordmarkR(fs)}
    ${taglineSpan(ts)}
  </div>
</div>`;
}

function stackedR(id, h) {
  const mw = h * 0.78, fs = h * 0.21, ts = h * 0.10, gap = h * 0.05, tg = h * 0.02;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkR(fs)}
  <span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${ts}px;letter-spacing:0.18em;color:rgba(255,255,255,0.28);text-transform:uppercase;white-space:nowrap;line-height:1;margin-top:${tg}px;">Website&nbsp;•&nbsp;AI</span>
</div>`;
}

function horizontalCleanR(id, h) {
  const mw = h * 0.78, fs = h * 0.40, gap = h * 0.22;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkR(fs)}
</div>`;
}

function stackedCleanR(id, h) {
  const mw = h * 0.78, fs = h * 0.21, gap = h * 0.05;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkR(fs)}
</div>`;
}

function buildHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: transparent; }
</style>
</head>
<body>
${horizontal(        "logo-h",          72)}
${stacked(           "logo-v",          100)}
${horizontalClean(   "logo-h-clean",    72)}
${stackedClean(      "logo-v-clean",    100)}
${horizontalTM(      "logo-h-tm",       72)}
${stackedTM(         "logo-v-tm",       100)}
${horizontalCleanTM( "logo-h-clean-tm", 72)}
${stackedCleanTM(    "logo-v-clean-tm", 100)}
${horizontalR(       "logo-h-r",        72)}
${stackedR(          "logo-v-r",        100)}
${horizontalCleanR(  "logo-h-clean-r",  72)}
${stackedCleanR(     "logo-v-clean-r",  100)}
${markDiv(           "logo-mark",       300)}
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(BRAND)) await mkdir(BRAND, { recursive: true });

  console.log("🚀 Launching browser …");
  const browser = await puppeteer.launch({ headless: "new" });
  const page    = await browser.newPage();

  await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 3 });

  console.log("📄 Loading logo HTML …");
  await page.setContent(buildHTML(), { waitUntil: "networkidle0" });

  // Extra wait so fonts render
  await new Promise(r => setTimeout(r, 2000));

  async function capture(id) {
    const el = await page.$(`#${id}`);
    if (!el) throw new Error(`Element #${id} not found in export HTML`);
    const buf = await el.screenshot({ omitBackground: true });
    console.log(`  📸 captured #${id}`);
    return buf;
  }

  const [
    hBuf, vBuf, hCleanBuf, vCleanBuf,
    hTMBuf, vTMBuf, hCleanTMBuf, vCleanTMBuf,
    hRBuf, vRBuf, hCleanRBuf, vCleanRBuf,
    mBuf,
  ] = await Promise.all([
    capture("logo-h"),
    capture("logo-v"),
    capture("logo-h-clean"),
    capture("logo-v-clean"),
    capture("logo-h-tm"),
    capture("logo-v-tm"),
    capture("logo-h-clean-tm"),
    capture("logo-v-clean-tm"),
    capture("logo-h-r"),
    capture("logo-v-r"),
    capture("logo-h-clean-r"),
    capture("logo-v-clean-r"),
    capture("logo-mark"),
  ]);

  await browser.close();
  console.log("🔒 Browser closed.\n");

  // ── No TM ────────────────────────────────────────────────────────────
  await writeFile(resolve(BRAND, "logo-horizontal.png"), hBuf);
  console.log("✓ public/brand/logo-horizontal.png");

  await writeFile(resolve(BRAND, "logo-horizontal-clean.png"), hCleanBuf);
  console.log("✓ public/brand/logo-horizontal-clean.png");

  await writeFile(resolve(BRAND, "logo-stacked.png"), vBuf);
  console.log("✓ public/brand/logo-stacked.png");

  await writeFile(resolve(BRAND, "logo-stacked-clean.png"), vCleanBuf);
  console.log("✓ public/brand/logo-stacked-clean.png");

  // ── TM variants ───────────────────────────────────────────────────────
  await writeFile(resolve(BRAND, "logo-horizontal-tm.png"), hTMBuf);
  console.log("✓ public/brand/logo-horizontal-tm.png");

  await writeFile(resolve(BRAND, "logo-horizontal-clean-tm.png"), hCleanTMBuf);
  console.log("✓ public/brand/logo-horizontal-clean-tm.png");

  await writeFile(resolve(BRAND, "logo-stacked-tm.png"), vTMBuf);
  console.log("✓ public/brand/logo-stacked-tm.png");

  await writeFile(resolve(BRAND, "logo-stacked-clean-tm.png"), vCleanTMBuf);
  console.log("✓ public/brand/logo-stacked-clean-tm.png");

  // ── ® variants (use after USPTO approval) ────────────────────────────
  await writeFile(resolve(BRAND, "logo-horizontal-r.png"), hRBuf);
  console.log("✓ public/brand/logo-horizontal-r.png");

  await writeFile(resolve(BRAND, "logo-horizontal-clean-r.png"), hCleanRBuf);
  console.log("✓ public/brand/logo-horizontal-clean-r.png");

  await writeFile(resolve(BRAND, "logo-stacked-r.png"), vRBuf);
  console.log("✓ public/brand/logo-stacked-r.png");

  await writeFile(resolve(BRAND, "logo-stacked-clean-r.png"), vCleanRBuf);
  console.log("✓ public/brand/logo-stacked-clean-r.png");

  // ── Mark 512 (transparent, square padded) ──
  await sharp(mBuf)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(BRAND, "logo-mark-512.png"));
  console.log("✓ public/brand/logo-mark-512.png");

  // ── Mark 192 ──
  await sharp(mBuf)
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(BRAND, "logo-mark-192.png"));
  console.log("✓ public/brand/logo-mark-192.png");

  // ── Mark 64 ──
  await sharp(mBuf)
    .resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(BRAND, "logo-mark-64.png"));
  console.log("✓ public/brand/logo-mark-64.png");

  // ── Apple Touch Icon: 180×180, ruby red bg ──
  const markForApple = await sharp(mBuf)
    .resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: 180, height: 180, channels: 4, background: { r: 225, g: 29, b: 72, alpha: 1 } }
  })
    .composite([{ input: markForApple, gravity: "center" }])
    .png()
    .toFile(resolve(ROOT, "public", "apple-touch-icon.png"));
  console.log("✓ public/apple-touch-icon.png");

  // ── Favicon ICO (16 + 32 + 48) ──
  const [ico16, ico32, ico48] = await Promise.all([
    sharp(mBuf).resize(16,  16,  { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
    sharp(mBuf).resize(32,  32,  { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
    sharp(mBuf).resize(48,  48,  { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
  ]);
  const ico = await toIco([ico16, ico32, ico48]);
  await writeFile(resolve(ROOT, "public", "favicon.ico"), ico);
  console.log("✓ public/favicon.ico");

  console.log("\n🎉 All brand assets exported!");
  console.log(`   public/brand/  — ${["logo-horizontal.png","logo-stacked.png","logo-mark-512.png","logo-mark-192.png","logo-mark-64.png"].join(", ")}`);
  console.log("   public/        — favicon.ico, apple-touch-icon.png");
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });
