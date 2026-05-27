/**
 * scripts/create-prospects-db.js
 *
 * One-time setup: creates the Prospects database in Notion.
 *
 * Usage:
 *   node --env-file=.env.local scripts/create-prospects-db.js <parent-page-id>
 *
 * Get the parent page ID from the Notion URL of a page you created:
 *   notion.so/Sales-Pipeline-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ this part
 */

const parentPageId = process.argv[2];

if (!parentPageId) {
  console.error("Usage: node scripts/create-prospects-db.js <parent-page-id>");
  console.error("Create a page in Notion called 'Sales Pipeline', then paste its ID here.");
  process.exit(1);
}

const NOTION_TOKEN = process.env.NOTION_TOKEN;
if (!NOTION_TOKEN) {
  console.error("Missing NOTION_TOKEN in env");
  process.exit(1);
}

const body = {
  parent: { type: "page_id", page_id: parentPageId },
  icon: { type: "emoji", emoji: "🎯" },
  title: [{ type: "text", text: { content: "Prospects" } }],
  properties: {
    "Business Name": { title: {} },
    "Website":       { url: {} },
    "Status": {
      select: {
        options: [
          { name: "Researched",    color: "gray"   },
          { name: "Demo Built",    color: "blue"   },
          { name: "Outreach Sent", color: "yellow" },
          { name: "Responded",     color: "orange" },
          { name: "Converted",     color: "green"  },
          { name: "Passed",        color: "red"    },
        ],
      },
    },
    "Industry": {
      select: {
        options: [
          { name: "Plumbing",          color: "blue"    },
          { name: "HVAC",              color: "orange"  },
          { name: "Stone/Countertops", color: "gray"    },
          { name: "Landscaping",       color: "green"   },
          { name: "Roofing",           color: "brown"   },
          { name: "Electrical",        color: "yellow"  },
          { name: "Cleaning",          color: "purple"  },
          { name: "Other",             color: "default" },
        ],
      },
    },
    "Demo URL":      { url: {} },
    "Outreach Date": { date: {} },
    "Location":      { rich_text: {} },
    "Notes":         { rich_text: {} },
  },
};

const res = await fetch("https://api.notion.com/v1/databases", {
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

console.log("✅ Prospects database created!");
console.log("");
console.log("Add this to your .env.local:");
console.log(`NOTION_PROSPECTS_DATABASE_ID=${data.id.replace(/-/g, "")}`);
console.log("");
console.log("Notion URL:", data.url);
