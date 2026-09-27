# Talha Jubayer Asif — Portfolio

Personal portfolio site for Talha Jubayer Asif, CSE student at American International University-Bangladesh (AIUB).

**Live site:** [talhajubayerasif.github.io](https://talhajubayerasif.github.io/)

## About

A single-page, dark-themed portfolio built with plain HTML, CSS, and JavaScript — no frameworks or build step. Design is a moody editorial look: oversized condensed display headlines (Anton) paired with serif body text (Lora), a fixed scroll-spy side nav, and a top-right social strip.

### Sections

- **Home** — full-bleed hero with name and tagline
- **About** — bio and photo
- **Skills**
- **Experience** — timeline
- **Education**
- **Projects** — including this site and [ZeroFocus](https://talhajubayerasif.github.io/ZeroFocus/), a vanilla JS/CSS/SVG productivity timer
- **Writing** — blog-style entries
- **Photography** — horizontally scrolling gallery with a lightbox
- **Travel** — horizontally scrolling gallery (Cox's Bazar, Jaflong, Sundarbans, Kuakata Beach) with captions and a lightbox
- **Contact** — mailto link and social links

## Features

- Responsive layout, desktop side-nav / mobile top-nav
- Scroll-spy active-link highlighting
- Back-to-top button
- Reusable lightbox component (used for both Photography and Travel)
- Photography & Travel rendered as single-row, scroll-snapping "slideshow" strips with prev/next controls
- SEO basics: `sitemap.xml`, `robots.txt`, canonical/Open Graph/Twitter meta tags, generated social preview image
- Full favicon set (favicon.ico, PNGs, Apple touch icon, Android icons) + web app manifest
- Privacy-friendly analytics via [Plausible](https://plausible.io)
- Branded 404 page
- Performance basics: fonts loaded via non-blocking `<link>`/preconnect (not a CSS `@import`), hero image preloaded, images lazy-loaded below the fold

## Tech stack

- HTML5, CSS3 (custom properties, no preprocessor), vanilla JavaScript
- Fonts: [Anton](https://fonts.google.com/specimen/Anton) & [Lora](https://fonts.google.com/specimen/Lora) via Google Fonts
- No build tools, no dependencies — open `index.html` and it works

## Project structure

```
.
├── index.html
├── 404.html
├── Style.css
├── Script.js
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   └── Talha_Jubayer_Asif.pdf      # résumé, linked from the Contact section
└── images/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── favicon-48x48.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    ├── og-image.png
    ├── gallery/                    # Photography section images
    └── travel/                     # Travel section images
```

## Running locally

No build step required — just serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

Hosted on **GitHub Pages** directly from this repo's default branch. Pushing to the branch Pages is configured to serve from is enough — no CI/build step needed.

## Analytics

Page views are tracked with [Plausible](https://plausible.io), a privacy-friendly, cookie-less analytics tool — no personal data is collected from visitors.

## License

All content (text, photos, résumé) is © Talha Jubayer Asif. Feel free to reference the code structure, but please don't reuse the personal content as your own.
