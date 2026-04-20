# Kubin Automotive Service — Credentials and Blockers

Status: Code complete. Deployment blocked pending items below.
Updated: 2026-04-18 (Justin provisioning FB Page + GBP invites to admin@aeopic.com today; Theron login-pending, see ops/aeopic-standard-identity.md)

Every item below must be resolved before the site can go live. Work through them in order; some depend on others.

---

- [ ] **Resend API Key**
  - **What it is:** API key that lets the contact form actually send email to Kolton's inbox.
  - **Where it is used:** `api/contact.js` reads `process.env.RESEND_API_KEY`. Also required for Vercel environment variables.
  - **How to get it:**
    1. Go to https://resend.com and log in to the Aeopic account.
    2. Click "API Keys" in the left sidebar.
    3. Click "Create API Key".
    4. Name it `kubin-automotive-prod`.
    5. Set permission to "Sending Access" (not full access).
    6. Copy the key immediately. It is only shown once.
  - **Where it goes:** Vercel Dashboard > kubin-automotive-site > Settings > Environment Variables > add `RESEND_API_KEY` with that value. Set for Production, Preview, and Development.
  - **Who owns the action:** Theron

---

- [ ] **GA4 Measurement ID**
  - **What it is:** Google Analytics 4 property ID that routes site traffic data to the Aeopic-managed GA4 property for this client.
  - **Where it is used:** All 15 HTML pages contain `G-XXXXXXXXXX` in two places each — the script tag `src` URL and the `gtag('config', ...)` call. 43 occurrences across 15 files.
  - **How to get it:**
    1. Go to https://analytics.google.com and log in with the Aeopic Google account.
    2. Click the gear icon (Admin) at the bottom left.
    3. Under "Property," click "Create Property" if a Kubin Automotive property does not exist yet.
    4. Name it "Kubin Automotive Service," set timezone to Central and currency to USD.
    5. After creation, go to Admin > Property > Data Streams > Web.
    6. Add a stream for `kubinautomotive.com`.
    7. Copy the "Measurement ID" (format: `G-XXXXXXXXXX`).
  - **Where it goes:** Find-and-replace `G-XXXXXXXXXX` with the real ID in all 15 HTML pages. Use VS Code Find in Files (Ctrl+Shift+H) across the entire `site/` folder to catch all 43 occurrences.
  - **Who owns the action:** Theron

---

- [ ] **Meta Pixel ID**
  - **What it is:** Facebook/Meta Pixel ID that tracks site visitors for retargeting campaigns on Facebook and Instagram.
  - **Where it is used:** All 15 HTML pages contain `0000000000000000` in two places each — the `fbq('init', ...)` call and the noscript fallback image URL. 43 occurrences across 15 files.
  - **How to get it:**
    1. Go to https://business.facebook.com and log in.
    2. Navigate to Events Manager (the radar icon in the left sidebar).
    3. Click "Connect Data Sources" > "Web."
    4. Choose "Meta Pixel," name it "Kubin Automotive."
    5. After creation, the Pixel ID is the number shown in the Events Manager header.
    6. Copy it (15-16 digit number).
  - **Where it goes:** Find-and-replace `0000000000000000` with the real Pixel ID in all 15 HTML pages. Use VS Code Find in Files (Ctrl+Shift+H) across the entire `site/` folder to catch all 43 occurrences.
  - **Who owns the action:** Theron

---

- [ ] **kubinautomotive.com Domain — Ownership Confirmation**
  - **What it is:** The target domain for the live site. Must be either owned by Aeopic or accessible by Aeopic to set DNS records.
  - **Where it is used:** Canonical URLs in all 4 HTML files, OG meta tags, and the Resend `from` address (`noreply@kubinautomotive.com`).
  - **How to get it:**
    1. Check if `kubinautomotive.com` is already registered: go to https://lookup.icann.org and search the domain.
    2. If it is registered and Kolton Kubin owns it: ask Kolton for registrar login credentials or for him to transfer DNS management to Aeopic (preferred: add Aeopic as a DNS manager in his registrar, do not require a full transfer).
    3. If it is not registered: register it at Cloudflare Registrar (https://cloudflare.com), Namecheap, or similar. Cost is approximately $10-12/year. Bill to client.
    4. Once Aeopic has DNS control, add the Vercel A record (`76.76.21.21`) and CNAME (`www` to `cname.vercel-dns.com`).
  - **Where it goes:** DNS records at the registrar (see DEPLOY.md Step 8 for exact records).
  - **Who owns the action:** Justin (collect from client) then Theron (configure DNS)

---

- [ ] **Resend Domain Verification for kubinautomotive.com**
  - **What it is:** DNS records that prove to Resend that Aeopic controls `kubinautomotive.com` and is allowed to send email from `noreply@kubinautomotive.com`. Without this, all contact form emails are blocked.
  - **Where it is used:** `api/contact.js` line 38: `from: 'Kubin Automotive Website <noreply@kubinautomotive.com>'`. This address will fail until the domain is verified.
  - **How to get it:**
    1. Log in to https://resend.com.
    2. Go to "Domains" in the left sidebar.
    3. Click "Add Domain" and enter `kubinautomotive.com`.
    4. Resend will display 3-4 DNS records to add (DKIM TXT, SPF TXT, DMARC TXT, and sometimes an MX record).
    5. Add all of them at the domain registrar.
    6. Come back to Resend and click "Verify Domain."
  - **Where it goes:** DNS records at the registrar for `kubinautomotive.com`. Takes up to 72 hours but usually under 1 hour.
  - **Who owns the action:** Theron (requires domain DNS access from Step above)

---

- [ ] **Vercel Team Account**
  - **What it is:** Vercel account where the project will be hosted. Aeopic likely already has one.
  - **Where it is used:** The project imports and deploys to this account. The `RESEND_API_KEY` is set here.
  - **How to get it:**
    1. If an Aeopic Vercel account already exists, just confirm you can log in at https://vercel.com.
    2. If not: sign up at https://vercel.com with the Aeopic email. Free Hobby tier is fine for one project. Pro ($20/mo) gives team features if needed.
  - **Where it goes:** Log in and use for Step 6 of DEPLOY.md.
  - **Who owns the action:** Theron

---

- [ ] **GitHub Repository**
  - **What it is:** The remote git repository that Vercel connects to for continuous deployment.
  - **Where it is used:** Vercel pulls code from GitHub on each push.
  - **How to get it:**
    1. Install `gh` CLI if not already: https://cli.github.com
    2. Run `gh auth login` and authenticate.
    3. Then run the create command in DEPLOY.md Step 5.
  - **Where it goes:** Connected to Vercel in Step 6 of DEPLOY.md.
  - **Who owns the action:** Theron

---

- [ ] **Facebook Page Admin Access for Aeopic**
  - **What it is:** Admin-level access to Kolton's Facebook Business Page so Aeopic can post the 5 weekly Facebook posts included in the SLA marketing scope.
  - **Where it is used:** Not a site credential. Required for Month 1 social media delivery (marketing starts the month after site launch).
  - **Aeopic-side account to add:** `admin@aeopic.com`
  - **How to get it:**
    1. Ask Kolton to open https://business.facebook.com (Meta Business Suite).
    2. Go to Settings (gear icon, lower left) > People > Add.
    3. Enter email: `admin@aeopic.com`.
    4. Set role: Admin.
    5. On the next screen, grant access to the Kubin Automotive Service Page.
    6. Click Invite. Aeopic accepts within 24 hours at admin@aeopic.com.
  - **Where it goes:** Used by Theron or assigned content person to post.
  - **Who owns the action:** Justin (request from client), Kolton (completes the action via admin@aeopic.com invite)

---

- [ ] **Google Business Profile Manager Invite**
  - **What it is:** Manager access to Kubin Automotive's Google Business Profile so Aeopic can post the 5 weekly GBP posts included in the SLA.
  - **Where it is used:** Not a site credential. Required for Month 1 marketing delivery.
  - **Aeopic-side account to add:** `admin@aeopic.com`
  - **How to get it:**
    1. Ask Kolton to go to https://business.google.com and find his Kubin Automotive listing.
    2. Business Profile Settings > Managers > Add New Manager.
    3. Enter: `admin@aeopic.com`.
    4. Set role to Manager (not Owner).
    5. Click Invite. Aeopic accepts within 24 hours at admin@aeopic.com.
  - **Where it goes:** Used by Theron or assigned content person to post weekly GBP updates.
  - **Who owns the action:** Justin (request from client), Kolton (completes the action via admin@aeopic.com invite)

---

- [ ] **Client Written Approval of Brand Colors and Tone**
  - **What it is:** Confirmation from Kolton Kubin that the Deep Navy / Chrome Silver / Gold palette and the "honest, no-upsell" tone match his expectations. Prevents revision requests after launch.
  - **Where it is used:** Site-wide. If rejected, CSS variables and copy need revision.
  - **How to get it:**
    1. Send Kolton the Vercel preview URL (auto-generated before custom domain is live).
    2. Ask for explicit written confirmation via email or text: "Does this look right? Any changes to colors or wording before we go live?"
    3. Save the reply. This is the revision-round trigger if he wants changes.
  - **Where it goes:** Saved in the project notes / client comms. Closes out the 1-revision-round SLA clause.
  - **Who owns the action:** Justin (send the link), Kolton (approve)

---

- [ ] **Startup Fee Receipt ($1,000)**
  - **What it is:** The one-time startup fee that formally starts the 8-week delivery clock. The delivery clock does not start until this is collected.
  - **Where it is used:** Triggers formal project start per SLA. Sam (CEO) must confirm Aeopic bank account is open before payment can be collected.
  - **How to get it:**
    1. Sam confirms Aeopic business bank account is open and provides payment link/details.
    2. Justin sends invoice to Kolton.
    3. Kolton pays.
    4. Theron notes payment date — the 8-week delivery deadline is this date + 8 weeks.
  - **Where it goes:** Internal finance tracking. Sam / Justin coordinate.
  - **Who owns the action:** Sam (bank account), Justin (invoice), Kolton (payment)

---

End of Kubin Automotive Credentials and Blockers | Updated 2026-04-10
