# Green Matrix — static site

A rebuild of **greenmatrixsolar.com** as a static [Astro](https://astro.build) site that
deploys to GitHub Pages. It replaces the WordPress install (WP 6.7.10 + Elementor + Bosa +
WooCommerce) that was found compromised — no PHP, no database, no plugins, nothing
server-side to exploit.

All page copy, product specifications, datasheets and images are carried over from the
WordPress database export unchanged.

## Requirements

Node **22.22+** (see `.nvmrc`). Astro 7 will not run on older versions.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves the built `dist/` locally |

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes automatically.

### Repository variables

Set these under **Settings → Secrets and variables → Actions → Variables** (both optional):

| Variable | When you need it |
| --- | --- |
| `PUBLIC_FORM_ENDPOINT` | The Google Apps Script URL the contact form posts to — see below. |
| `PUBLIC_FORM_TOKEN` | Optional shared secret for that script. |
| `BASE_PATH` | Only for a *project* page (`user.github.io/repo-name`); set it to `/repo-name`. Leave unset for a custom domain or a user/org page. |

### Custom domain

Add a `CNAME` file to `public/` containing `greenmatrixsolar.com`, set the domain under
**Settings → Pages**, and point the DNS at GitHub. Leave `BASE_PATH` unset.

## The contact form

A static site has no PHP, so the Contact Form 7 endpoint is gone. Instead the form posts to
a **Google Apps Script web app** that appends each enquiry to a Google Sheet and emails a
notification. It runs inside your own Google account — no server, no third-party service
holding the data.

The script and its full setup walkthrough are in
[`google-apps-script/`](./google-apps-script/README.md). Short version: create a Sheet,
paste in `Code.gs`, set `NOTIFY_EMAIL`, deploy as a web app, and put the resulting `/exec`
URL in `PUBLIC_FORM_ENDPOINT`.

If that variable is **not** set, the form falls back to opening the visitor's mail client
with a message addressed to `contact@greenmatrixsolar.com`, so an enquiry is never silently
lost.

The form keeps the original four fields (Full Name, Email, Subject, Message), adds inline
validation, a `_gotcha` honeypot, a two-minute duplicate guard, and reports success and
failure through an ARIA live region.

## WhatsApp

`src/components/WhatsAppButton.astro` renders the floating button on every page. It also
appears as a card on the contact page and an icon in the footer. All three read
`site.whatsapp` and `site.whatsappMessage` from `src/data/site.js` — change the number or
the pre-filled greeting there and it updates everywhere.

## Project structure

```
public/
  img/            logo, hero photography, product shots (resized + re-encoded)
  docs/           S-5! datasheet PDFs, unchanged
  robots.txt
src/
  components/     Header, Footer, PageHero, ContactForm, Icon
  data/
    site.js       contact details and navigation — edit these in one place
    products.js   product copy, feature lists, datasheet links
  layouts/Base.astro
  pages/          index, about, products, contact, 404, sitemap.xml.js
  styles/global.css   design tokens + shared components
```

### Editing content

- **Contact details / navigation** → `src/data/site.js`
- **Products, features, datasheets** → `src/data/products.js`
- **Everything else** → the matching file in `src/pages/`

## Design

The palette is sampled from the company logo (`public/img/logo.png`):

| Token | Value | Where it comes from |
| --- | --- | --- |
| `--brand-600` | `#22349E` | the solar-panel diamond — primary |
| `--gold-500` | `#F5C400` | the sun at the centre — accents, CTAs, rules |
| `--red-500` | `#E8102F` | the swoosh — used sparingly, as in the mark |

Headings and body are Inter. Type and spacing scale fluidly with `clamp()`, so there are
no fixed breakpoints to fight. The reveal-on-scroll animation is progressive — with JS
disabled or `prefers-reduced-motion` set, everything is simply visible.

## What was left out

The four WordPress blog posts ("Easy Way to Manage your Business" and friends) were Bosa
theme demo content — lorem ipsum, not company writing — and the original navigation never
linked to them. They are not reproduced here. The empty **Blog** page, the WooCommerce
store (no products were ever published) and the draft Privacy Policy / Refund Policy pages
were likewise left out. All of it is still in the database export if you want any of it back.
