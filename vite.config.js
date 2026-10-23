import { defineConfig } from "vite";
import { resolve } from "node:path";
import site from "./site.config.js";
import { formatHoursSummary, openingHoursSchema } from "./src/hours.js";

const cleanUrl = site.siteUrl.replace(/\/$/, "");
const address = {
  "@type": "PostalAddress",
  streetAddress: site.contact.address,
  addressLocality: site.contact.city,
  addressRegion: site.contact.state,
  addressCountry: "NG",
  ...(site.contact.postalCode ? { postalCode: site.contact.postalCode } : {}),
};
const social = Object.values(site.social).filter(Boolean);
const heroImage = `${cleanUrl}/assets/images/og-image.jpg`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${cleanUrl}/#website`,
      url: `${cleanUrl}/`,
      name: site.name,
      description: site.description,
      inLanguage: "en-NG",
    },
    {
      "@type": "Restaurant",
      "@id": `${cleanUrl}/#restaurant`,
      name: `${site.name} Restaurant`,
      url: `${cleanUrl}/#restaurant`,
      image: heroImage,
      description: "Sample restaurant description — replace with the final venue description.",
      telephone: site.contact.phone,
      email: site.contact.email,
      address,
      servesCuisine: ["Nigerian", "International"],
      priceRange: "₦₦₦",
      acceptsReservations: true,
      openingHoursSpecification: openingHoursSchema(site.hours.restaurant),
      sameAs: social,
    },
    {
      "@type": "Hotel",
      "@id": `${cleanUrl}/#hotel`,
      name: `${site.name} Hotel`,
      url: `${cleanUrl}/#rooms`,
      image: heroImage,
      description: "Sample boutique hotel description — replace with final room and property details.",
      telephone: site.contact.phone,
      email: site.contact.email,
      address,
      checkinTime: site.hotel.checkInTime,
      checkoutTime: site.hotel.checkOutTime,
      openingHoursSpecification: openingHoursSchema(site.hours.hotel),
      amenityFeature: [
        "Free Wi-Fi",
        "Air conditioning",
        "Room service",
        "Daily housekeeping",
      ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      sameAs: social,
    },
  ],
};

// Crawler and manifest files are generated from site.config.js so the business
// details live in exactly one place. Declared up front so both the build and the
// dev server can serve them.
const generatedFiles = {
  "/robots.txt": {
    type: "text/plain; charset=utf-8",
    source: `User-agent: *\nAllow: /\n\nSitemap: ${cleanUrl}/sitemap.xml\n`,
  },
  "/sitemap.xml": {
    type: "application/xml; charset=utf-8",
    source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${cleanUrl}/</loc></url>\n</urlset>\n`,
  },
  "/site.webmanifest": {
    type: "application/manifest+json; charset=utf-8",
    source: JSON.stringify({
      name: site.name,
      short_name: site.shortName,
      description: site.description,
      start_url: "/",
      display: "standalone",
      background_color: "#f8f4ec",
      theme_color: "#1a1712",
      icons: [
        { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      ],
    }),
  },
};

const replacements = {
  SITE_NAME: site.name,
  SITE_SHORT_NAME: site.shortName,
  SITE_TAGLINE: site.tagline,
  SITE_DESCRIPTION: site.description,
  SITE_URL: cleanUrl,
  SITE_LOCALE: site.locale,
  PHONE_DISPLAY: site.contact.phoneDisplay,
  PHONE: site.contact.phone,
  WHATSAPP: site.contact.whatsapp,
  EMAIL: site.contact.email,
  ADDRESS: `${site.contact.address}, ${site.contact.city}, ${site.contact.state}`,
  CITY: site.contact.city,
  MAP_LINK: site.contact.mapLink,
  INSTAGRAM_URL: site.social.instagram,
  FACEBOOK_URL: site.social.facebook,
  X_URL: site.social.x,
  HOTEL_CHECKIN: site.hotel.checkInTime,
  HOTEL_CHECKOUT: site.hotel.checkOutTime,
  HOURS_RESTAURANT: formatHoursSummary(site.hours.restaurant),
  HOURS_OPEN_LOUNGE: formatHoursSummary(site.hours.openLounge),
  HOURS_VVIP: formatHoursSummary(site.hours.vvip),
  HOURS_SNOOKER: formatHoursSummary(site.hours.snooker),
  HOURS_HOTEL: formatHoursSummary(site.hours.hotel),
  SCHEMA_JSON: JSON.stringify(schema).replace(/</g, "\\u003c"),
};

function injectSiteConfig() {
  return {
    name: "inject-site-config",
    transformIndexHtml(html) {
      return html.replace(/%%([A-Z0-9_]+)%%/g, (match, key) => {
        if (!(key in replacements)) return match;
        if (key === "SCHEMA_JSON") return replacements[key];
        return String(replacements[key])
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      });
    },
    // Serve the generated crawler/manifest files in dev too, so the
    // <link rel="manifest"> and robots.txt references never 404 while previewing.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = generatedFiles[req.url?.split("?")[0] ?? ""];
        if (!file) return next();
        res.setHeader("Content-Type", file.type);
        res.end(file.source);
      });
    },
    generateBundle() {
      for (const [fileName, file] of Object.entries(generatedFiles)) {
        this.emitFile({ type: "asset", fileName: fileName.replace(/^\//, ""), source: file.source });
      }
    },
  };
}

export default defineConfig({
  plugins: [injectSiteConfig()],
  server: {
    host: "0.0.0.0",
    // 8080 matches the Lovable / hosted preview sandbox; override with PORT.
    port: Number(process.env.PORT) || 8080,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    target: "es2020",
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
        thanks: resolve(import.meta.dirname, "thanks.html"),
      },
    },
  },
});
