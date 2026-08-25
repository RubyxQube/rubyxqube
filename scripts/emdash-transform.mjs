/**
 * scripts/emdash-transform.mjs
 *
 * The em-dash rewrite rules, shared so they can be tested once and applied
 * anywhere. Identical to the transform in
 * clients/phoenix-stoneworks/scripts/strip-emdashes.mjs, which rewrites copy
 * held in Supabase; this repo's copy lives in files, so the sweeper next to
 * this one walks src/ instead. The rules and their tests are the same on
 * purpose: two different transforms would eventually disagree about the same
 * sentence.
 *
 * Rules are ordered and deliberately conservative. An em-dash aside is
 * grammatically comma-equivalent, so a comma is nearly always safe and never
 * changes the meaning; a full stop is used only where the next word is already
 * capitalised and a sentence break is clearly what was meant.
 *
 * Idempotent: running it twice changes nothing the second time.
 *
 * Tested in scripts/emdash-transform.test.mjs against real strings from live
 * sites. Run those before changing anything here.
 */
export function stripEmDashes(input) {
  if (!input || !input.includes("—")) return input;
  let s = input;

  // 1. An attribution dash at the start of a line ("— Jane Smith"). The dash is
  //    the whole convention there, so it goes rather than becoming punctuation.
  s = s.replace(/(^|\n)\s*—\s+/g, "$1");

  // 2. " — but/and/or/so/... " is a coordinated clause. A comma is exactly
  //    right and reads like someone wrote it.
  s = s.replace(/\s*—\s*(but|and|or|so|yet|while|though|although|because|which|who)\b/gi, ", $1");

  // 3. A dash introducing a LIST takes a colon. Detected by looking at the rest
  //    of the sentence: two or more commas after the dash means an enumeration.
  //    Without this, "The full Treasure Valley — Boise, Meridian, Nampa" became
  //    a sentence fragment under rule 5.
  s = s.replace(/\s*—\s*/g, (m, offset, full) => {
    const rest = full.slice(offset + m.length);
    const sentence = rest.split(/(?<=[.!?])\s/)[0] || rest;
    return (sentence.match(/,/g) || []).length >= 2 ? ": " : m;
  });

  // 4. " — " before a lowercase word or a digit: an aside or an appositive.
  s = s.replace(/\s*—\s*(?=[a-z0-9])/g, ", ");

  // 5. " — " before a capital: the writer meant a new sentence. Guarded against
  //    an existing terminator so this never produces ". ." or ", .".
  s = s.replace(/\s*([.!?,;:])?\s*—\s*(?=[A-Z])/g, (_m, punct) => (punct ? `${punct} ` : ". "));

  // 6. Anything left (a dash against a quote, a bracket, end of string) becomes
  //    a comma, the safe default.
  s = s.replace(/\s*—\s*/g, ", ");

  // 7. Tidy up what the rules above can leave behind.
  s = s
    .replace(/,\s*,/g, ",")
    .replace(/\s+,/g, ",")
    .replace(/,\s*\./g, ".")
    .replace(/\.\s*\./g, ".")
    .replace(/[ \t]{2,}/g, " ");

  return s;
}
