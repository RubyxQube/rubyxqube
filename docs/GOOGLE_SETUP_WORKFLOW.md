# Google Setup Workflow

Step-by-step for setting up GA4, Search Console, and GBP on every client project.

**Who owns what:**
- The client always owns all Google accounts (GA4, Search Console, GBP)
- Boyd is added as a manager/editor — never the sole owner
- If the relationship ends, client keeps full access to everything

---

## Google Analytics 4 (Every Build)

**Goal:** Client sees real traffic data from day one. Monthly reports pull from this.

### Steps

1. **Create the GA4 property**
   - Go to analytics.google.com under Boyd's account (or client's if available)
   - Create account: "[Business Name]" > Property: "[businessname.com]"
   - Platform: Web, enter domain URL
   - Get the Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add tracking to the site**
   - Open `index.html` in the client project
   - Add immediately before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
   - Replace `G-XXXXXXXXXX` with the real Measurement ID

3. **Verify it's working**
   - Deploy the site
   - Open the live URL and navigate around
   - In GA4 → Reports → Realtime — you should see yourself as an active user within 30 seconds

4. **Give client access**
   - GA4 Admin → Account Access Management → Add users
   - Add client's Google account as "Editor"
   - They can view all data and create reports; they cannot delete the property

5. **Note the Measurement ID in the project docs / 1Password vault**

---

## Google Search Console (Every Build)

**Goal:** Google knows the site exists, indexes it correctly, and flags any crawl issues.

### Steps

1. **Add property in Search Console**
   - Go to search.google.com/search-console
   - Add property → "URL prefix" → enter `https://clientdomain.com`

2. **Verify ownership via HTML file**
   - GSC will give you a file like `googleXXXXXXXXXXXXXXXX.html`
   - Download it and place it in the project's `/public/` folder
   - Deploy to Vercel
   - Click "Verify" in GSC — done

3. **Submit the sitemap**
   - Every project ships with `sitemap.xml` at the domain root
   - In GSC → Sitemaps → enter `sitemap.xml` → Submit
   - Check back in 24-48 hours to confirm it's indexed

4. **Give client access**
   - GSC → Settings → Users and permissions → Add user
   - Add client's Google account as "Full" — they can see all data

5. **First check-in**
   - After 1 week, check Coverage report for errors
   - Flag anything not indexed or showing errors

---

## Google Business Profile (Momentum Only)

**Goal:** Business shows up in local map pack. Reviews managed. Listing accurate.

### Steps

1. **Client claims their GBP listing**
   - Client must be the owner — Boyd cannot do this for them
   - Go to business.google.com, search for the business, claim it
   - Verification is usually by phone, postcard, or video (can take a few days)

2. **Client adds Boyd as manager**
   - GBP dashboard → Settings → Managers → Add manager
   - Add boyd@rubyxqube.com with Manager role (not Owner)
   - Boyd accepts the invite

3. **Initial optimization (do this once at onboarding)**
   - Verify all info is accurate: name, address, phone, website, hours
   - Add all relevant service categories
   - Upload 5-10 photos (exterior, work examples, team)
   - Write/update the business description (150-750 chars, include city + trade)
   - Add services list with descriptions

4. **Ongoing management (monthly, Momentum clients)**
   - Respond to all new reviews within 48 hours
   - Post 1-2 GBP updates per month (seasonal offer, project spotlight, tip)
   - Update hours for holidays in advance
   - Flag and report fake/spam reviews
   - Add new photos from recent jobs when available

---

## Checklist Per Client Launch

| Task | Launch | Autopilot | Momentum |
|------|--------|-----------|----------|
| GA4 property created | Yes | Yes | Yes |
| GA4 tracking code in index.html | Yes | Yes | Yes |
| GA4 verified (realtime check) | Yes | Yes | Yes |
| Client added as GA4 Editor | Yes | Yes | Yes |
| GSC property added + verified | Yes | Yes | Yes |
| Sitemap submitted in GSC | Yes | Yes | Yes |
| Client added as GSC Full user | Yes | Yes | Yes |
| GBP claimed + Boyd added as manager | No | No | Yes |
| GBP initial optimization | No | No | Yes |
| GBP ongoing monthly management | No | No | Yes |

---

## Framing for Clients

Do not promise rankings or leads from these tools. Frame it as visibility and proof:

- "You'll see exactly how your site is performing from day one — not estimates, real data."
- "Google Analytics shows you traffic, where it comes from, and which pages work."
- "Search Console tells you if Google is actually finding and indexing your site."
- "Most web designers hand you a site and disappear. You get the tools to see what's happening."

This builds trust and justifies the retainer — they can see the ROI themselves.
