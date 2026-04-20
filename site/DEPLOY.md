# Kubin Automotive Service — Deployment Runbook

Version: 2.0.0 | Updated: 2026-04-10
Deployer: Theron (COO)
Domain target: kubinautomotive.com (confirm ownership before Step 9)
Hosting: Vercel
Backend: Resend (contact form email delivery)

---

## PRE-FLIGHT CHECKLIST

Before you touch any terminal, confirm you have these in hand:

- [ ] `RESEND_API_KEY` (from Resend dashboard)
- [ ] `GA4_MEASUREMENT_ID` (e.g. `G-A1B2C3D4E5`) from Google Analytics
- [ ] `META_PIXEL_ID` (e.g. `123456789012345`) from Meta Events Manager
- [ ] GitHub account logged in
- [ ] Vercel account logged in (vercel.com)
- [ ] `gh` CLI installed (`gh --version` to confirm)
- [ ] `git` installed (`git --version` to confirm)

If you are missing any of these, stop and collect them first. The deploy will fail without the Resend key. The pixel IDs just mean tracking will not fire until they are swapped in.

---

## STEP 1 — Install serverless dependencies

This installs the `resend` package that `api/contact.js` imports.

```bash
cd "C:/Users/Bladerah/Aeopic/clients/kubin-automotive/site"
npm install
```

Expected output: `added 1 package` (or similar). A `node_modules/` folder will appear. This is excluded from git via `.gitignore`.

---

## STEP 2 — Swap placeholder IDs into the HTML

These must be replaced in all 15 HTML pages before the site goes live.

**Full page inventory:**

- `index.html`
- `services/index.html`
- `services/oil-change/index.html`
- `services/brakes/index.html`
- `services/engine/index.html`
- `services/ac-heating/index.html`
- `services/transmission/index.html`
- `services/suspension/index.html`
- `services/electrical/index.html`
- `services/preventive/index.html`
- `about/index.html`
- `contact/index.html`
- `reviews/index.html`
- `location/index.html`
- `get-started/index.html`

**GA4 — replace `G-XXXXXXXXXX` with the real Measurement ID:**

```
Find:    G-XXXXXXXXXX
Replace: G-YOURREALID    (e.g. G-A1B2C3D4E5)
```

Do this in all 15 HTML pages. 43 occurrences across 15 files. Use VS Code Find in Files (Ctrl+Shift+H) across the entire `site/` folder.

**Meta Pixel — replace `0000000000000000` with the real Pixel ID:**

```
Find:    0000000000000000
Replace: 123456789012345    (your real 15-16 digit Pixel ID)
```

Do this in all 15 HTML pages. 43 occurrences across 15 files.

You do NOT put these IDs in environment variables. They live directly in the HTML as the tracking snippet requires. They are not secrets.

---

## STEP 3 — Initialize git (only if `.git/` does not exist)

A local commit should already exist from the deploy-readiness pass. If not:

```bash
cd "C:/Users/Bladerah/Aeopic/clients/kubin-automotive/site"
git init
git add .
git commit -m "Initial production build, ready to deploy pending credentials"
```

If `.git/` already exists, skip `git init` and just verify the commit is there:

```bash
git log --oneline -3
```

---

## STEP 4 — Create the GitHub repository

```bash
gh repo create kubin-automotive-site --private --source . --remote origin --push
```

This creates a private repo under your GitHub account, sets it as `origin`, and pushes the current branch in one command.

If you want it under the Aeopic org instead (if the org exists):

```bash
gh repo create aeopic/kubin-automotive-site --private --source . --remote origin --push
```

After this runs, confirm at: https://github.com/YOUR_USERNAME/kubin-automotive-site

---

## STEP 5 — Import the project into Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select `kubin-automotive-site` from the list
4. Framework Preset: leave as "Other" (this is a static site with serverless functions)
5. Root Directory: leave blank (the `api/` and `index.html` are at the repo root)
6. Build Command: leave blank
7. Output Directory: leave blank
8. Install Command: `npm install`
9. Click "Deploy"

Vercel will detect `api/contact.js` automatically as a serverless function.

---

## STEP 6 — Set environment variables in Vercel

After the first deploy (even if it fails because the key is missing), go to:

> Vercel Dashboard > kubin-automotive-site > Settings > Environment Variables

Add exactly one variable:

| Name | Value | Environments |
|------|-------|-------------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` (your Resend key) | Production, Preview, Development |

Click Save. Then go to Deployments and click "Redeploy" on the latest deployment to pick up the new variable.

**Where to get the Resend API key:**

1. Go to https://resend.com
2. Log in to the Aeopic Resend account
3. Go to API Keys in the left sidebar
4. Create a new key named "kubin-automotive-prod"
5. Copy the value immediately (it is only shown once)
6. Paste it into Vercel as shown above

---

## STEP 7 — Add the custom domain in Vercel

1. Vercel Dashboard > kubin-automotive-site > Settings > Domains
2. Type `kubinautomotive.com` and click Add
3. Also add `www.kubinautomotive.com`
4. Vercel will show you the DNS records to set (see Step 8)

Note: Do not do Step 7 until you have confirmed Aeopic controls the domain registrar for `kubinautomotive.com`. If Kolton Kubin owns it, he needs to either transfer it or give Aeopic DNS access.

---

## STEP 8 — Set DNS records at the registrar

Log into the domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) for `kubinautomotive.com`.

Add these records:

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | `@` | `76.76.21.21` | Vercel IP for root domain |
| CNAME | `www` | `cname.vercel-dns.com` | Vercel www redirect |

If the registrar does not allow A records at root (some do not), use an ALIAS or ANAME record instead of the A record. Vercel's dashboard will show the exact values for your project.

DNS propagation takes 10 minutes to 24 hours. Vercel will show a green checkmark when it verifies.

---

## STEP 9 — Verify the kubinautomotive.com domain in Resend

This is required for the contact form to actually send email. Without this, Resend will reject the `from: noreply@kubinautomotive.com` address and emails will not deliver.

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter `kubinautomotive.com`
4. Resend will show you a set of DNS records to add. Add them all at the registrar:

| Type | Name | Value |
|------|------|-------|
| MX | `resend._domainkey` | (Resend provides this) |
| TXT | `resend._domainkey` | (DKIM key — Resend provides) |
| TXT | `@` | `v=spf1 include:_spf.resend.com ~all` (add to existing SPF if one exists) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@kubinautomotive.com` |

Exact values are in the Resend dashboard after you add the domain. Copy them exactly. Click "Verify" in Resend after adding the records. Verification can take up to 72 hours but usually under 1 hour.

---

## STEP 10 — Production deploy command

Once DNS is verified and the environment variable is set:

```bash
vercel --prod
```

Or just push a new commit to the main branch — Vercel will deploy automatically.

```bash
git add .
git commit -m "Swap GA4 and Meta Pixel IDs for production"
git push
```

---

## STEP 11 — Post-deploy smoke test

Do all 5 of these immediately after the production URL is live:

1. **Contact form submission** — Go to `kubinautomotive.com/contact/`, fill out all required fields with real data, submit. Check `Kubin.Automotive@yahoo.com` for the email within 2 minutes. If it does not arrive, check Resend logs at https://resend.com/emails.

2. **Mobile layout** — Open `kubinautomotive.com` on an iPhone or use Chrome DevTools > Toggle Device Toolbar at 375px width. Confirm: nav hamburger works, hero text is readable, CTA buttons are tappable, footer is not clipped.

3. **GA4 pixel firing** — Open `kubinautomotive.com` in a fresh browser tab (incognito). Go to Google Analytics > Realtime. Within 30 seconds you should see 1 active user. If not, the GA4 ID is wrong or the snippet was not saved correctly.

4. **Meta Pixel firing** — Install the Meta Pixel Helper Chrome extension. Visit `kubinautomotive.com`. The extension should show a green checkmark and "PageView" event. If it shows an error, the Pixel ID is wrong.

5. **All 15 pages load cleanly** — Visit each URL and confirm no 404s and no broken images:

   Core pages:
   - `kubinautomotive.com/`
   - `kubinautomotive.com/services/`
   - `kubinautomotive.com/about/`
   - `kubinautomotive.com/contact/`

   Service sub-pages:
   - `kubinautomotive.com/services/oil-change/`
   - `kubinautomotive.com/services/brakes/`
   - `kubinautomotive.com/services/engine/`
   - `kubinautomotive.com/services/ac-heating/`
   - `kubinautomotive.com/services/transmission/`
   - `kubinautomotive.com/services/suspension/`
   - `kubinautomotive.com/services/electrical/`
   - `kubinautomotive.com/services/preventive/`

   Supporting pages:
   - `kubinautomotive.com/reviews/`
   - `kubinautomotive.com/location/`
   - `kubinautomotive.com/get-started/`

6. **Navigation** — Confirm: services dropdown nav works on desktop hover and all sub-links resolve. Open the mobile overlay menu and confirm all service sub-links are present and tappable.

---

## COMMON ISSUES

**Form submits but no email arrives:**
- Check Resend domain verification status at https://resend.com/domains
- Check Resend email logs at https://resend.com/emails for bounce/block reason
- Confirm `RESEND_API_KEY` is set in Vercel environment variables and you redeployed after adding it

**Vercel shows "Function not found" on form submit:**
- Confirm `api/contact.js` is at the repo root (not inside a subfolder)
- Confirm `package.json` has `"type": "module"` (it does as of v1.0.1)
- Confirm `npm install` ran before commit

**Custom domain shows "Invalid Configuration" in Vercel:**
- Double check the A record points to `76.76.21.21`
- Check if the old DNS still has conflicting records (old A records or CNAME at `@`)

---

End of Kubin Automotive Deploy Runbook v2.0.0
