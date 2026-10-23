# Mayfair Foods — premium hospitality website

A mobile-first static website for a five-part hospitality concept: Restaurant, Open Lounge Bar, VVIP Bar, Snooker Lounge and Hotel Rooms. Built with semantic HTML, modern CSS and dependency-free browser JavaScript; bundled with Vite for Netlify.

## Quick start

```bash
npm install
npm run dev
```

The dev server binds `0.0.0.0` on port **8080** so hosted preview sandboxes
(Lovable, Cloudflare-style tunnels, containers) can reach it. Set `PORT` to use a
different port, for example `PORT=5173 npm run dev`.

Production build:

```bash
npm run build
npm run preview
```

The deployable site is generated in `dist/`.

## Change the business details — one file

Edit **`site.config.js`** at the project root. It contains:

- Business name and short name (easy to replace after LLC registration)
- Phone, WhatsApp and email
- Address and sample map link
- Social links
- Final website URL for canonical, Open Graph, sitemap and schema tags
- Hotel check-in/out times
- Opening hours for every venue, in `Africa/Lagos` time

Run `npm run build` after editing. The build injects these values into the visible pages, SEO metadata, Restaurant and Hotel JSON-LD, sitemap, robots file and web manifest.

The floating WhatsApp button and all three “Continue in WhatsApp” actions use the configured WhatsApp number. Form-specific WhatsApp messages include the values the guest has entered.

## Replace sample photography

1. Put replacement JPG, PNG or WebP files in `image-source/`.
2. Keep the existing base filenames, or update the matching paths and alt text in `index.html`.
3. Run `npm run assets` to generate responsive 480, 800, 1200 and 1600px WebP files in `public/assets/images/`.
4. Run `npm run build`.

`sample-hero.jpg` also generates the 1200×630 social-sharing image. Every image shown on the website is visibly marked **Sample photo** or **Sample imagery**. See **`CONTENT-GUIDE.md`** for the complete replacement checklist and image-source notes.

## Replace sample copy and prices

Edit `index.html`. Sample content is deliberately labelled in the interface and includes:

- Menu dishes, tags and NGN prices
- Weekly events
- Snooker table count and hourly rate
- Room sizes, amenities and nightly rates
- Fictional testimonials
- Address, contact details and social links in `site.config.js`

The map panel is a styled placeholder. To use a real map, paste a Google Maps **embed URL** into `contact.mapEmbedUrl` in `site.config.js`; `src/site.js` will replace the placeholder with a lazy-loaded iframe.

## Netlify Forms

The three plain HTML forms already include `data-netlify="true"`, unique form names, hidden `form-name` fields and honeypots:

- `table-reservation`
- `room-enquiry`
- `experience-enquiry`

JavaScript submits them to Netlify with `fetch` and shows an inline success message. Without JavaScript, Netlify uses `thanks.html` as the success page. In the local/live coding preview, submissions are intentionally simulated and clearly labelled; no enquiry data leaves the browser.

After deploying to Netlify:

1. Open **Forms** in the Netlify dashboard and make a test submission for each form.
2. Configure form notification emails under **Forms → Notifications**.
3. Confirm the configured phone and WhatsApp number, and replace the sample email before sharing the site.

There is deliberately **no live availability, payment processing or automatic booking confirmation**.

## Deploy to Netlify

`netlify.toml` is included:

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 20
- Sensible security and caching headers

Connect the repository to Netlify and deploy. You can also deploy the generated `dist/` directory manually. Update `siteUrl` in `site.config.js` to the final domain before launch so canonical URLs, Open Graph and `sitemap.xml` are correct.

## Accessibility and performance

- Semantic landmarks, labelled forms and visible focus states
- Keyboard-accessible tabs, lightbox, carousel and mobile navigation
- Native dialog for the gallery lightbox
- Lagos-time opening status that does not depend on the visitor’s device timezone
- Reduced-motion support
- Local variable/body and serif fonts; no render-blocking font CDN
- Responsive WebP images, lazy loading below the fold, hero preload and explicit dimensions
- No client-side framework or third-party runtime dependencies

## Main files

```text
site.config.js              Central business details and hours
index.html                  Main content, SEO, schema and Netlify forms
404.html                    Branded not-found page
thanks.html                 No-JavaScript Netlify success page
src/styles.css              Responsive luxury theme, dark + light palettes
src/main.js                 Browser entry point
src/theme.js                Dark/light switch, remembered per browser
src/site.js                 Contact links, map and live opening status
src/hours.js                Opening-hours calculations and schema helpers
src/ui.js                   Navigation, tabs, galleries, lightbox and carousel
src/forms.js                Validation, Netlify submission and WhatsApp messages
scripts/prepare-assets.mjs  Responsive images, social image, fonts and favicons
image-source/               Replaceable original sample photography
public/                     Static assets copied into the build
CONTENT-GUIDE.md            Launch replacement checklist
```
