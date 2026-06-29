// Downloads Pexels/Unsplash source images and converts them to WebP for blog cover use.
// Run once: node scripts/fetch-blog-images.mjs
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.resolve("public/blog");
fs.mkdirSync(OUT, { recursive: true });

// [slug-key, pexels-id-OR-unsplash-url, output-filename]
const PHOTOS = [
  ["boise-plumbing-mobile",        "pexels:8488060",    "boise-plumbing-mobile.webp"],
  ["google-business-profile",      "unsplash:photo-1694928850410-b209896782a2", "google-business-profile.webp"],
  ["local-seo-boise",              "pexels:267415",     "local-seo-boise.webp"],
  ["landscaping-nampa",            "pexels:11400230",   "landscaping-nampa.webp"],
  ["boise-roofing",                "pexels:33404248",   "boise-roofing.webp"],
  ["after-hours-leads",            "pexels:8036936",    "after-hours-leads.webp"],
  ["google-reviews",               "pexels:9821386",    "google-reviews.webp"],
  ["service-area-pages",           "pexels:28490242",   "service-area-pages.webp"],
  ["pressure-washing-boise",       "pexels:5652626",    "pressure-washing-boise.webp"],
  ["pest-control",                 "pexels:32055757",   "pest-control.webp"],
  ["google-analytics",             "pexels:3912976",    "google-analytics.webp"],
  ["tree-service",                 "pexels:35606516",   "tree-service.webp"],
  ["mobile-first-nampa",           "pexels:20123611",   "mobile-first-nampa.webp"],
  ["eagle-idaho",                  "pexels:459225",     "eagle-idaho.webp"],
  ["electricians-boise",           "pexels:34054464",   "electricians-boise.webp"],
  ["garage-door-boise",            "pexels:8583638",    "garage-door-boise.webp"],
  ["website-hosting",              "pexels:4508751",    "website-hosting.webp"],
  ["respond-reviews",              "pexels:5918386",    "respond-reviews.webp"],
  ["stone-masonry-boise",          "pexels:34257452",   "stone-masonry-boise.webp"],
  ["carpet-cleaning-meridian",     "pexels:4107278",    "carpet-cleaning-meridian.webp"],
  ["caldwell-idaho",               "pexels:1626859",    "caldwell-idaho.webp"],
  ["google-ads-vs-seo",            "pexels:7688439",    "google-ads-vs-seo.webp"],
  ["window-cleaning-boise",        "pexels:4045757",    "window-cleaning-boise.webp"],
  ["homepage-conversion",          "pexels:5921492",    "homepage-conversion.webp"],
  ["website-leads",                "pexels:6802049",    "website-leads.webp"],
  ["handyman-treasure-valley",     "pexels:17410734",   "handyman-treasure-valley.webp"],
  ["service-pages-seo",            "pexels:7109316",    "service-pages-seo.webp"],
  ["painting-contractors-boise",   "pexels:7218579",    "painting-contractors-boise.webp"],
  ["ai-receptionist",              "pexels:17483867",   "ai-receptionist.webp"],
  ["website-gets-calls",           "pexels:6326049",    "website-gets-calls.webp"],
];

function buildUrl(src) {
  if (src.startsWith("pexels:")) {
    const id = src.slice(7);
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
  }
  if (src.startsWith("unsplash:")) {
    const id = src.slice(9);
    return `https://images.unsplash.com/${id}?w=1260&q=80&fit=crop&auto=format`;
  }
  throw new Error(`Unknown source: ${src}`);
}

function download(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

let ok = 0, fail = 0;
for (const [key, src, filename] of PHOTOS) {
  const dest = path.join(OUT, filename);
  if (fs.existsSync(dest)) {
    console.log(`  skip  ${filename} (exists)`);
    ok++;
    continue;
  }
  try {
    const url = buildUrl(src);
    process.stdout.write(`  fetch ${filename} ...`);
    const buf = await download(url);
    await sharp(buf)
      .resize(1260, 750, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(` done (${kb} KB)`);
    ok++;
  } catch (err) {
    console.log(` FAILED: ${err.message}`);
    fail++;
  }
}

console.log(`\n${ok} ok, ${fail} failed`);
