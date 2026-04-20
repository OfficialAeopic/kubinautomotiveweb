# Kubin Automotive Website

Production website for Kubin Automotive.

## Structure

- `site/` contains the production-ready static site (HTML, CSS, JS, assets). No build step required.
- `CHANGELOG.md` tracks version history.

## Local preview

Open `site/index.html` directly in a browser, or serve the folder:

```
cd site
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Works out of the box with any static host (Vercel, Netlify, GitHub Pages, Surge, Cloudflare Pages). Point the build to `site/` as the publish directory, no build command needed.

## Owner

Built and maintained by Aeopic.
