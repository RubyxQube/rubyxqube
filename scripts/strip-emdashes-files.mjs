#!/usr/bin/env node
/**
 * scripts/strip-emdashes-files.mjs
 *
 * Rewrites em-dashes out of the copy in src/. Dry run by default.
 *
 *   node scripts/strip-emdashes-files.mjs           # show what would change
 *   node scripts/strip-emdashes-files.mjs --apply   # do it
 *   node scripts/strip-emdashes-files.mjs --apply --only src/pages/Home.jsx
 *
 * Workspace rule: no em-dashes in any copy, because they read as
 * machine-written. That applies to marketing pages and blog posts alike.
 *
 * CODE COMMENTS ARE LEFT ALONE. Nobody outside the repo reads them, and
 * rewriting them would bury the real copy changes in noise. A line is treated
 * as a comment if it opens one, or sits inside a block or JSX comment, or has
 * the dash after a trailing `//`. That classifier is the same one used to scope
 * the Phoenix Stoneworks sweep, where it correctly separated 547 comment
 * em-dashes from 163 real ones.
 *
 * The rewrite rules live in emdash-transform.mjs and are tested in
 * emdash-transform.test.mjs. Run the tests before trusting a change to them.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";
import { stripEmDashes } from "./emdash-transform.mjs";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

const EXT = [".jsx", ".js", ".html", ".css"];
const SKIP_DIRS = ["node_modules", "dist", ".git"];

const files = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    if (SKIP_DIRS.includes(e)) continue;
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.includes(extname(e))) files.push(p);
  }
})("src");
files.push("index.html");

const targets = ONLY ? files.filter((f) => f.replace(/\\/g, "/").includes(ONLY.replace(/\\/g, "/"))) : files;

let changedFiles = 0;
let changedLines = 0;
let skippedComments = 0;

for (const f of targets) {
  const raw = readFileSync(f, "utf8");
  const crlf = raw.includes("\r\n");
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  let inBlock = false;
  let inJsx = false;
  let touched = false;
  const shown = [];

  const out = lines.map((ln) => {
    const t = ln.trim();
    const wasInComment = inBlock || inJsx;

    // Track comment state BEFORE deciding, so the closing line of a block is
    // still treated as comment.
    if (!inBlock && !inJsx) {
      if (t.startsWith("{/*")) inJsx = !ln.includes("*/}");
      else if (t.startsWith("/*")) inBlock = !ln.includes("*/");
    } else {
      if (inJsx && ln.includes("*/}")) inJsx = false;
      else if (inBlock && ln.includes("*/")) inBlock = false;
    }

    if (!ln.includes("—")) return ln;

    const opensComment = t.startsWith("{/*") || t.startsWith("/*") || t.startsWith("//") || t.startsWith("*");
    const ci = ln.indexOf("//");
    const trailingComment = ci >= 0 && ln.indexOf("—") > ci && !/https?:\/\//.test(ln);

    if (wasInComment || opensComment || trailingComment) {
      skippedComments += (ln.match(/—/g) || []).length;
      return ln;
    }

    // Split the leading indentation off before transforming.
    //
    // The transform's last rule collapses runs of whitespace, which is correct
    // inside a sentence and catastrophic at the start of a source line: the
    // first version of this sweeper reindented 359 lines to a single space
    // across 39 files. The build still passed, because JSX does not care about
    // indentation, which is exactly why it would have shipped unnoticed.
    const indent = ln.match(/^[ \t]*/)[0];
    const next = indent + stripEmDashes(ln.slice(indent.length));

    if (next !== ln) {
      touched = true;
      changedLines++;
      if (shown.length < 3) shown.push({ was: ln.trim().slice(0, 96), now: next.trim().slice(0, 96) });
    }
    return next;
  });

  if (!touched) continue;
  changedFiles++;
  console.log(`\n${f}`);
  shown.forEach((s) => {
    console.log(`  - ${s.was}`);
    console.log(`  + ${s.now}`);
  });

  if (APPLY) {
    const joined = out.join("\n");
    writeFileSync(f, crlf ? joined.replace(/\n/g, "\r\n") : joined);
  }
}

console.log(`\n${changedLines} lines across ${changedFiles} files.`);
console.log(`${skippedComments} em-dashes left in code comments, deliberately.`);
if (!APPLY && changedFiles) console.log("\nDry run. Re-run with --apply once this looks right.");
