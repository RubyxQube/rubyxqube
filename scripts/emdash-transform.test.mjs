// node --test scripts/strip-emdashes.test.mjs
//
// The cases below are real strings taken off the live pswboise.com blog on
// 2026-08-25, plus the shapes that worried me most when writing the rules.
// This script rewrites the client's published copy, so the transform gets
// tested before it is ever pointed at the database.

import { test } from "node:test";
import assert from "node:assert/strict";
import { stripEmDashes } from "./emdash-transform.mjs";

const eq = (input, expected) => assert.equal(stripEmDashes(input), expected);

test("real excerpts from the live blog", () => {
  eq(
    "one of the last decisions most homeowners make — but it has a big impact",
    "one of the last decisions most homeowners make, but it has a big impact",
  );
  eq(
    "They sound almost identical — but quartzite and quartz are completely different",
    "They sound almost identical, but quartzite and quartz are completely different",
  );
  eq(
    "Local fabricators build relationships — and on a job site, that difference shows up",
    "Local fabricators build relationships, and on a job site, that difference shows up",
  );
  eq(
    "quartz and granite make stunning countertops — but they suit different lifestyles.",
    "quartz and granite make stunning countertops, but they suit different lifestyles.",
  );
});

test("an aside before a lowercase word becomes a comma", () => {
  eq("Quartz is lower-maintenance — no sealing ever.", "Quartz is lower-maintenance, no sealing ever.");
});

test("a dash introducing a list becomes a colon", () => {
  // Two or more commas in the rest of the sentence means an enumeration.
  eq(
    "We handle every step — tear-out, fabrication, install.",
    "We handle every step: tear-out, fabrication, install.",
  );
  // The real FAQ answer that motivated the rule. Under the capital-letter rule
  // this became "The full Treasure Valley. Boise, Meridian, ...", a fragment.
  eq(
    "The full Treasure Valley — Boise, Meridian, Nampa, Caldwell, and surrounding areas.",
    "The full Treasure Valley: Boise, Meridian, Nampa, Caldwell, and surrounding areas.",
  );
});

test("a two-clause sentence is not mistaken for a list", () => {
  // One comma in the remainder, so this stays a comma rather than a colon.
  eq(
    "Both are excellent — we are happy to help, whenever you are ready.",
    "Both are excellent, we are happy to help, whenever you are ready.",
  );
});

test("a paired aside keeps both halves", () => {
  eq(
    "Quartz — unlike granite — needs no sealing.",
    "Quartz, unlike granite, needs no sealing.",
  );
});

test("a dash before a capital becomes a sentence break", () => {
  eq("Call us today — We answer every call.", "Call us today. We answer every call.");
});

test("an attribution dash at the start of a line is dropped, not punctuated", () => {
  eq("Great work.\n— Phoenix Stoneworks Customer", "Great work.\nPhoenix Stoneworks Customer");
  eq("— Jane Smith", "Jane Smith");
});

test("existing punctuation before a dash is not doubled", () => {
  eq("It arrived. — Then we installed it.", "It arrived. Then we installed it.");
  eq("First, — second.", "First, second.");
});

test("an unspaced em-dash is handled too", () => {
  eq("quartz—granite comparison", "quartz, granite comparison");
});

test("it never leaves a doubled comma or a stray space before punctuation", () => {
  const out = stripEmDashes("A — but B — and C. — Done.");
  assert.ok(!/,\s*,/.test(out), `doubled comma in: ${out}`);
  assert.ok(!/\s,/.test(out), `space before comma in: ${out}`);
  assert.ok(!/,\s*\./.test(out), `comma before full stop in: ${out}`);
  assert.ok(!out.includes("—"), `em-dash survived in: ${out}`);
});

test("it is idempotent", () => {
  const once = stripEmDashes("A long sentence — with an aside — and a tail.");
  assert.equal(stripEmDashes(once), once);
});

test("text with no em-dash is returned untouched", () => {
  const s = "Nothing to do here. An en-dash range like 8-16 inches stays put.";
  assert.equal(stripEmDashes(s), s);
  assert.equal(stripEmDashes(""), "");
  assert.equal(stripEmDashes(null), null);
  assert.equal(stripEmDashes(undefined), undefined);
});

test("en-dashes in numeric ranges are left alone", () => {
  // Correct typography, and not the thing that reads as machine-written.
  const s = "Most jobs run 3–5 days.";
  assert.equal(stripEmDashes(s), s);
});
