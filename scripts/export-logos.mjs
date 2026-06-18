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

// ── Dark variants (dark text on transparent — for light/white backgrounds) ───

function wordmarkDark(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(10,8,9,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube</span>`;
}

function wordmarkDarkTM(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(10,8,9,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube<sup style="font-size:0.42em;font-weight:700;letter-spacing:0;color:rgba(10,8,9,0.45);vertical-align:super;line-height:0;">™</sup></span>`;
}

function wordmarkDarkR(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(10,8,9,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube<sup style="font-size:0.42em;font-weight:700;letter-spacing:0;color:rgba(10,8,9,0.45);vertical-align:super;line-height:0;">®</sup></span>`;
}

function taglineSpanDark(fs) {
  return `<span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${fs}px;letter-spacing:0.18em;color:rgba(0,0,0,0.45);text-transform:uppercase;white-space:nowrap;line-height:1;">Website&nbsp;•&nbsp;AI</span>`;
}

function horizontalDark(id, h) {
  const mw = h * 0.78, fs = h * 0.40, ts = h * 0.165, gap = h * 0.22, tg = h * 0.07;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:${tg}px;">
    ${wordmarkDark(fs)}
    ${taglineSpanDark(ts)}
  </div>
</div>`;
}

function stackedDark(id, h) {
  const mw = h * 0.78, fs = h * 0.21, ts = h * 0.10, gap = h * 0.05, tg = h * 0.02;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDark(fs)}
  <span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${ts}px;letter-spacing:0.18em;color:rgba(0,0,0,0.45);text-transform:uppercase;white-space:nowrap;line-height:1;margin-top:${tg}px;">Website&nbsp;•&nbsp;AI</span>
</div>`;
}

function horizontalCleanDark(id, h) {
  const mw = h * 0.78, fs = h * 0.40, gap = h * 0.22;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDark(fs)}
</div>`;
}

function stackedCleanDark(id, h) {
  const mw = h * 0.78, fs = h * 0.21, gap = h * 0.05;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDark(fs)}
</div>`;
}

function horizontalDarkTM(id, h) {
  const mw = h * 0.78, fs = h * 0.40, ts = h * 0.165, gap = h * 0.22, tg = h * 0.07;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:${tg}px;">
    ${wordmarkDarkTM(fs)}
    ${taglineSpanDark(ts)}
  </div>
</div>`;
}

function stackedDarkTM(id, h) {
  const mw = h * 0.78, fs = h * 0.21, ts = h * 0.10, gap = h * 0.05, tg = h * 0.02;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDarkTM(fs)}
  <span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${ts}px;letter-spacing:0.18em;color:rgba(0,0,0,0.45);text-transform:uppercase;white-space:nowrap;line-height:1;margin-top:${tg}px;">Website&nbsp;•&nbsp;AI</span>
</div>`;
}

function horizontalCleanDarkTM(id, h) {
  const mw = h * 0.78, fs = h * 0.40, gap = h * 0.22;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDarkTM(fs)}
</div>`;
}

function stackedCleanDarkTM(id, h) {
  const mw = h * 0.78, fs = h * 0.21, gap = h * 0.05;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDarkTM(fs)}
</div>`;
}

function horizontalDarkR(id, h) {
  const mw = h * 0.78, fs = h * 0.40, ts = h * 0.165, gap = h * 0.22, tg = h * 0.07;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:${tg}px;">
    ${wordmarkDarkR(fs)}
    ${taglineSpanDark(ts)}
  </div>
</div>`;
}

function stackedDarkR(id, h) {
  const mw = h * 0.78, fs = h * 0.21, ts = h * 0.10, gap = h * 0.05, tg = h * 0.02;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDarkR(fs)}
  <span style="font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:400;font-size:${ts}px;letter-spacing:0.18em;color:rgba(0,0,0,0.45);text-transform:uppercase;white-space:nowrap;line-height:1;margin-top:${tg}px;">Website&nbsp;•&nbsp;AI</span>
</div>`;
}

function horizontalCleanDarkR(id, h) {
  const mw = h * 0.78, fs = h * 0.40, gap = h * 0.22;
  return `<div id="${id}" style="display:inline-flex;align-items:center;gap:${gap}px;padding:12px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDarkR(fs)}
</div>`;
}

function stackedCleanDarkR(id, h) {
  const mw = h * 0.78, fs = h * 0.21, gap = h * 0.05;
  return `<div id="${id}" style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px;padding:14px;background:transparent;">
  ${cubeSVG(id + "mk", mw, h)}
  ${wordmarkDarkR(fs)}
</div>`;
}

// ── Cover photo variants ──────────────────────────────────────────────────────
// 540×180 CSS px → 1620×540 output at deviceScaleFactor: 3
// Sharp then crops to platform-specific sizes

function cover(id) {
  // 568×210 CSS px → 1704×630 at dSF:3 ≈ 2× retina of Facebook's 851×315 spec
  const cubeH = 90, cubeW = cubeH * 0.78;
  return `<div id="${id}" style="width:568px;height:210px;background:#080808;background-image:radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px);background-size:18px 18px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;">
  <div style="position:absolute;left:145px;top:50%;transform:translateY(-50%);width:210px;height:210px;background:radial-gradient(ellipse at center,rgba(225,29,72,0.18) 0%,transparent 65%);pointer-events:none;"></div>
  <div style="display:flex;align-items:center;gap:28px;position:relative;z-index:1;">
    ${cubeSVG(id + "mk", cubeW, cubeH)}
    <div style="width:1px;height:66px;background:rgba(255,255,255,0.10);flex-shrink:0;"></div>
    <div style="display:flex;flex-direction:column;gap:9px;">
      <span style="font-weight:800;font-size:32px;letter-spacing:-0.03em;color:rgba(255,255,255,0.93);white-space:nowrap;line-height:1;">Ruby<span style="color:#e11d48;">x</span>Qube</span>
      <span style="font-weight:400;font-size:9.5px;letter-spacing:0.2em;color:rgba(255,255,255,0.38);text-transform:uppercase;white-space:nowrap;">Fast Sites. Smart Chatbots. Built to Convert.</span>
    </div>
  </div>
</div>`;
}

// ── Social media variants ─────────────────────────────────────────────────────
// 360×360 CSS px → 1080×1080 output at deviceScaleFactor: 3

function socialProfile(id) {
  // Profile photo: cube mark only, white background, 1:1 square
  const cubeH = 200, cubeW = cubeH * 0.78;
  return `<div id="${id}" style="width:360px;height:360px;display:flex;align-items:center;justify-content:center;background:#ffffff;">
  ${cubeSVG(id + "mk", cubeW, cubeH)}
</div>`;
}

function socialPost(id) {
  // Post graphic: stacked wordmark, white background, x precisely centered under cube
  // Centering trick: flex row with flex:1 on Ruby/Qube spans forces x to sit at exactly 50% of container
  const cubeH = 130, cubeW = cubeH * 0.78;
  const fs = 42, gap = 14, ww = 310;
  return `<div id="${id}" style="width:360px;height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${gap}px;background:#ffffff;">
  ${cubeSVG(id + "mk", cubeW, cubeH)}
  <div style="width:${ww}px;display:flex;align-items:baseline;">
    <span style="flex:1;text-align:right;font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(10,8,9,0.93);white-space:nowrap;">Ruby</span>
    <span style="flex:0 0 auto;font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:#e11d48;">x</span>
    <span style="flex:1;text-align:left;font-family:'Plus Jakarta Sans',ui-sans-serif,sans-serif;font-weight:800;font-size:${fs}px;letter-spacing:-0.03em;color:rgba(10,8,9,0.93);white-space:nowrap;">Qube</span>
  </div>
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
${markDiv(       "logo-mark",           300)}
${socialProfile( "logo-social-profile")}
${socialPost(    "logo-social-post")}
${cover(         "logo-cover")}
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

  const [mBuf, socialProfileBuf, socialPostBuf, coverBuf] = await Promise.all([
    capture("logo-mark"),
    capture("logo-social-profile"),
    capture("logo-social-post"),
    capture("logo-cover"),
  ]);

  await browser.close();
  console.log("🔒 Browser closed.\n");

  // ── Social media variants (1080×1080 white bg) ──
  await writeFile(resolve(BRAND, "logo-social-profile.png"), socialProfileBuf);
  console.log("✓ public/brand/logo-social-profile.png  (1080×1080 — profile photo)");

  await writeFile(resolve(BRAND, "logo-social-post.png"), socialPostBuf);
  console.log("✓ public/brand/logo-social-post.png     (1080×1080 — post graphic)");

  // Cover: 1704×630 native → platform crops
  // Facebook spec: 851×315 (fastest load), 2× retina = 1702×630 — we output 1704×630 (within 2px)
  await sharp(coverBuf)
    .resize(1702, 630, { fit: "cover", position: "center" })
    .png()
    .toFile(resolve(BRAND, "logo-cover-facebook.png"));
  console.log("✓ public/brand/logo-cover-facebook.png  (1702×630 — Facebook 2× retina of 851×315)");

  await sharp(coverBuf)
    .resize(1584, 396, { fit: "cover", position: "center" })
    .png()
    .toFile(resolve(BRAND, "logo-cover-linkedin.png"));
  console.log("✓ public/brand/logo-cover-linkedin.png  (1584×396 — LinkedIn)");

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
  console.log("   public/brand/  — logo-social-profile.png, logo-social-post.png, logo-cover-facebook.png, logo-cover-linkedin.png, logo-mark-512/192/64.png");
  console.log("   public/        — favicon.ico, apple-touch-icon.png");
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });
