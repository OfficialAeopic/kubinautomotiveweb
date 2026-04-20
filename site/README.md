# Kubin Automotive Service — Production Site

**Version:** 1.0.0
**Delivery deadline:** 2026-06-03
**Built by:** Aeopic (Theron, COO)

---

## Site Structure

```
site/
  index.html              Homepage
  services/index.html     Services page
  about/index.html        About page
  contact/index.html      Contact + appointment form page
  css/main.css            All styles (mobile-first)
  js/main.js              Nav behavior + form submission
  api/contact.js          Vercel serverless function (Resend email)
  images/                 Site images (copied from prospect folder)
  package.json            Node dependencies (resend ^4.0.0)
  vercel.json             Vercel deployment config
  .env.example            Environment variable template
  robots.txt              Search crawler instructions
  sitemap.xml             Page index for search engines
  CHANGELOG.md            Version history
  README.md               This file
```

---

## How to Deploy to Vercel

### Prerequisites

- A [Vercel account](https://vercel.com)
- A [Resend account](https://resend.com) with a verified domain

### Step 1: Push to GitHub

```bash
cd site/
git init
git add .
git commit -m "Initial production build v1.0.0"
git remote add origin https://github.com/aeopic/kubin-automotive-site.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Vercel auto-detects the project type. No framework preset needed (static + serverless).
4. Click Deploy.

### Step 3: Set Environment Variables

In the Vercel dashboard for this project:

**Project > Settings > Environment Variables**

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key (starts with `re_`) |

Theron will provide the actual API key. Do not commit it to git.

### Step 4: Set up custom domain

1. In Vercel: Project > Settings > Domains
2. Add `kubinautomotive.com` and `www.kubinautomotive.com`
3. Update DNS records at the domain registrar per Vercel's instructions

---

## Before Launch: Swap Placeholder Values

These placeholders are in all 4 HTML files. Use find-and-replace before going live.

| Placeholder | Replace with | Where to find it |
|-------------|--------------|------------------|
| `G-XXXXXXXXXX` | Real GA4 Measurement ID | Google Analytics > Admin > Data Streams |
| `0000000000000000` | Real Meta Pixel ID | Facebook Business Manager > Events Manager |

---

## Resend Domain Verification (REQUIRED before emails work)

The contact form sends email using:

```
from: 'Kubin Automotive Website <noreply@kubinautomotive.com>'
```

For this to work, the domain `kubinautomotive.com` must be verified in Resend:

1. Log in to [resend.com](https://resend.com)
2. Go to Domains > Add Domain
3. Enter `kubinautomotive.com`
4. Add the DNS records Resend provides (SPF, DKIM)
5. Wait for verification (usually a few minutes to a few hours)

Until this is done, the form will error when submitted in production. The development/placeholder API key will show a "domain not verified" error.

**Fallback:** If domain verification is blocked or delayed, an alternative is to use Resend's default sending domain (`onboarding@resend.dev`) by changing the `from:` field in `api/contact.js`. This works without domain verification but looks less professional.

---

## Form Behavior

- Submits via `fetch` to `/api/contact` (no page reload)
- Client-side validation runs before submit
- Honeypot field catches bots silently
- Success message: "Thanks, we will reach out within 1 business day."
- Error message includes fallback phone number (979) 779-7484
- Email is delivered to `Kubin.Automotive@yahoo.com` with `reply_to` set to the customer's email

---

## Local Development

Vercel serverless functions require the Vercel CLI for local testing.

```bash
npm install -g vercel
cd site/
npm install
cp .env.example .env.local
# Edit .env.local and add your real RESEND_API_KEY
vercel dev
```

The site will be available at `http://localhost:3000`.

---

## Client Contact

- **Owner:** Kolton Kubin
- **Email:** Kubin.Automotive@yahoo.com
- **Phone:** (979) 779-7484
- **Address:** 3515 S College Ave, Bryan, TX 77801
- **Hours:** Mon-Fri 7:30am-5:30pm

## Aeopic Contact

COO: Theron
