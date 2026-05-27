/**
 * scripts/save-prospect.js
 *
 * Saves a prospect profile to the Notion Prospects database.
 * Run after the prospect-researcher agent produces its profile.
 *
 * Usage:
 *   node scripts/save-prospect.js \
 *     --name "Mountain West Plumbing" \
 *     --website "mountainwestplumbing.com" \
 *     --industry "Plumbing" \
 *     --location "Boise, ID" \
 *     --profile "prospects/mountain-west-plumbing/PROFILE.md"
 *
 * Env vars required:
 *   NOTION_TOKEN
 *   NOTION_PROSPECTS_DATABASE_ID
 */

import { readFileSync } from "fs";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name:     { type: "string" },
    website:  { type: "string" },
    industry: { type: "string" },
    location: { type: "string" },
    profile:  { type: "string" }, // path to PROFILE.md
    "demo-url": { type: "string" },
  },
});

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_PROSPECTS_DATABASE_ID;

if (!NOTION_TOKEN || !DB_ID) {
  console.error("Missing NOTION_TOKEN or NOTION_PROSPECTS_DATABASE_ID in env");
  process.exit(1);
}

// Read profile markdown if provided
let profileContent = "";
if (values.profile) {
  try {
    profileContent = readFileSync(values.profile, "utf-8");
  } catch {
    console.warn("Could not read profile file:", values.profile);
  }
}

// Chunk text into Notion paragraph blocks (2000 char max each)
function toBlocks(text) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + 2000));
    i += 2000;
  }
  return chunks.map(chunk => ({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [{ type: "text", text: { content: chunk } }],
    },
  }));
}

const body = {
  parent: { database_id: DB_ID },
  icon: { type: "emoji", emoji: "🎯" },
  properties: {
    "Business Name": {
      title: [{ text: { content: values.name || "Unknown" } }],
    },
    ...(values.website && {
      Website: { url: values.website.startsWith("http") ? values.website : `https://${values.website}` },
    }),
    Status: { select: { name: "Researched" } },
    ...(values.industry && { Industry: { select: { name: values.industry } } }),
    ...(values["demo-url"] && { "Demo URL": { url: values["demo-url"] } }),
    ...(values.location && {
      Location: { rich_text: [{ text: { content: values.location } }] },
    }),
  },
  children: profileContent
    ? [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ type: "text", text: { content: "Researcher Profile" } }],
          },
        },
        ...toBlocks(profileContent),
      ]
    : [],
};

const res = await fetch("https://api.notion.com/v1/pages", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
  },
  body: JSON.stringify(body),
});

const data = await res.json();

if (data.object === "error") {
  console.error("Notion error:", data.message);
  process.exit(1);
}

console.log("✅ Prospect saved to Notion");
console.log("   Page URL:", data.url);
console.log("   Page ID: ", data.id);
