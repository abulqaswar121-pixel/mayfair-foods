/*
 * MAYFAIR FOODS — CENTRAL SITE CONFIG
 * ------------------------------------
 * SAMPLE DETAILS: replace everything marked “SAMPLE” before launch.
 * This is the only file you need to edit for the business name, contact
 * details, address, social links, canonical URL and opening hours.
 * Run `npm run build` after editing.
 */

export default {
  // SAMPLE — the registered LLC name can replace this without editing HTML.
  name: "Mayfair Foods",
  shortName: "Mayfair",
  tagline: "Evenings worth staying for.",
  description:
    "A refined Ibadan destination for dining, open-air lounges, VVIP evenings, snooker and restful boutique stays.",
  siteUrl: "https://mayfairfoods.netlify.app", // SAMPLE — use the final domain.
  locale: "en_NG",
  timeZone: "Africa/Lagos",

  contact: {
    phoneDisplay: "+234 810 195 4962",
    phone: "+2348101954962", // Include country code.
    whatsapp: "2348101954962", // Digits only, no + or spaces.
    email: "reservations@mayfairfoods.example", // SAMPLE
    address: "12 Mayfair Avenue, off Ring Road", // SAMPLE
    city: "Ibadan",
    state: "Oyo State",
    country: "Nigeria",
    postalCode: "",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Ring+Road+Ibadan+Nigeria", // SAMPLE
    // Leave blank to keep the elegant map placeholder. Paste a Google Maps
    // embed URL here to load a real map automatically after deployment.
    mapEmbedUrl: "",
  },

  social: {
    instagram: "https://www.instagram.com/", // SAMPLE
    facebook: "https://www.facebook.com/", // SAMPLE
    x: "https://x.com/", // SAMPLE
  },

  hotel: {
    checkInTime: "15:00",
    checkOutTime: "11:00",
  },

  /*
   * Opening hours use the venue's local time in Africa/Lagos.
   * Day indexes: 0 Sunday, 1 Monday … 6 Saturday.
   * Each day is [opening, closing] in 24-hour time, or null when closed.
   * A closing time earlier than opening continues into the next morning.
   * Use "00:00" for midnight. Set alwaysOpen for 24-hour reception.
   */
  hours: {
    restaurant: {
      label: "Restaurant",
      days: [
        ["12:00", "23:00"], ["12:00", "23:00"], ["12:00", "23:00"],
        ["12:00", "23:00"], ["12:00", "23:00"], ["12:00", "23:00"],
        ["12:00", "23:00"],
      ],
    },
    openLounge: {
      label: "Open Lounge Bar",
      days: [
        ["16:00", "00:00"], ["16:00", "00:00"], ["16:00", "00:00"],
        ["16:00", "00:00"], ["16:00", "00:00"], ["16:00", "02:00"],
        ["16:00", "02:00"],
      ],
    },
    vvip: {
      label: "VVIP Bar",
      days: [
        ["18:00", "00:00"], null, null, ["18:00", "01:00"],
        ["18:00", "01:00"], ["18:00", "03:00"], ["18:00", "03:00"],
      ],
    },
    snooker: {
      label: "Snooker Lounge",
      days: [
        ["12:00", "01:00"], ["12:00", "01:00"], ["12:00", "01:00"],
        ["12:00", "01:00"], ["12:00", "01:00"], ["12:00", "01:00"],
        ["12:00", "01:00"],
      ],
    },
    hotel: {
      label: "Hotel Reception",
      alwaysOpen: true,
      days: Array(7).fill(["00:00", "24:00"]),
    },
  },

  // The hero indicator rotates through public venues; hotel reception is
  // intentionally excluded because it is always open.
  statusVenues: ["restaurant", "openLounge", "vvip", "snooker"],
};
