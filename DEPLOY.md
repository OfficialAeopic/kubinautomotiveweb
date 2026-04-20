# Kubin Automotive Service, Vercel deploy guide (repo-root summary)

Version: 1.0.0
Updated: 2026-04-20
Target host: Vercel (https://vercel.com)
Site type: Static multi-page plus Node.js serverless contact form
Deep runbook: `site/DEPLOY.md` (full step-by-step for every credential swap)

---

## TL;DR for the importer

1. Vercel dashboard, Add New, Project, Import Git Repository.
2. Pick OfficialAeopic/kubinautomotiveweb.
3. **Framework Preset:** Other
4. **Root Directory:** `site` (required, see note below)
5. **Build Command:** leave blank (Vercel auto-detects)
6. **Install Command:** `npm install` (default)
7. **Output Directory:** leave blank (static serving)
8. **Environment Variables:**
    - `RESEND_API_KEY` = (from resend.com, create key named `kubin-automotive-prod`, Sending Access)
9. Click Deploy.

After first deploy, swap the two tracking IDs in the 15 HTML pages:
- GA4 `G-XXXXXXXXXX`, 43 occurrences
- Meta Pixel `0000000000000000`, 43 occurrences

Full find-and-replace instructions in `site/DEPLOY.md` Step 2.

---

## Why Root Directory must be `site/`

Everything Vercel needs is under `site/`:
- `site/index.html` and the 14 subpage routes
- `site/package.json` declares the `resend` dependency
- `site/api/contact.js` is the serverless function Vercel auto-wires
- `site/vercel.json` carries cache headers, cleanUrls, trailingSlash
- `site/.gitignore` already excludes `.env`, `.env.local`, `.vercel`, `node_modules/`

If Root Directory is left blank, Vercel looks at the repo root and does
not see the `package.json` or `api/` folder, so `api/contact.js` never
becomes a function and the contact form fails silently.

---

## Directory layout

```
/ (repo root)
  README.md              <- not shipped to production
  CHANGELOG.md           <- not shipped to production
  DEPLOY.md              <- this file, not shipped to production
  .gitignore
  site/                  <- Vercel Root Directory points here
    index.html           <- becomes /
    services/            <- /services/ + 8 service subpages
    about/, contact/, location/, reviews/, get-started/
    api/contact.js       <- becomes the POST /api/contact function
    css/main.css
    js/ (main.js, chatbot.js, chatbot-kb.js)
    images/              <- 19 assets
    package.json         <- installs `resend`
    vercel.json          <- cache, headers, cleanUrls
    sitemap.xml, robots.txt, favicon.png, apple-touch-icon.png
    README.md, DEPLOY.md, LOGINS-NEEDED.md, CHANGELOG.md
    .gitignore, .env.example (locally, not committed)
```

---

## Env vars reference

| Variable | Required | Where set | Source |
|----------|----------|-----------|--------|
| `RESEND_API_KEY` | yes, contact form breaks without it | Vercel, all 3 envs | resend.com API keys |

`.env.local` is for local dev only. Never commit it. The root `.gitignore`
denies anything matching `**/.env*` so it cannot slip in accidentally.

---

## Email sender domain

The contact form sends from `noreply@kubinautomotive.com`. Resend requires
that domain to be verified in the Resend dashboard before the first
delivery succeeds. Steps in `site/LOGINS-NEEDED.md`.

---

## Custom domain (when ready)

Vercel, Project, Settings, Domains, Add `kubinautomotive.com` and
`www.kubinautomotive.com`. At the Kubin registrar, set A record to
`76.76.21.21` and `www` CNAME to `cname.vercel-dns.com`.

---

## After deploy, verify

- Homepage: 200 OK, hero video plays
- Each of 14 subpages: 200 OK, no 404s on nav
- Contact form submit: check Kolton's inbox at Kubin.Automotive@yahoo.com
- Function logs: Vercel, Project, Logs, check for Resend send success
- Sitemap: `https://kubinautomotive.com/sitemap.xml` resolves
- Robots: `https://kubinautomotive.com/robots.txt` resolves
