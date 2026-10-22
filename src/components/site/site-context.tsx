import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const CONFIG = {
  phone: "+234 907 063 4599",
  phoneRaw: "+2349070634599",
  email: "info@prestigevilla.ng",
  address: "Plot 14, Adeoyo Street, Agodi GRA, Ibadan, Oyo State, Nigeria",
  whatsapp: "https://wa.me/2349070634599",
  instagram: "https://instagram.com/prestigevilla.ng",
  facebook: "https://facebook.com/prestigevilla.ng",
  twitter: "https://twitter.com/prestigevilla.ng",
};

export type Lang = "en" | "ng-pidgin";
export type Currency = "NGN" | "USD" | "GBP";
export type Theme = "light" | "dark";

export const I18N: Record<Lang, Record<string, string>> = {
  en: {
    siteTitle: "Prestige Villa — Luxury Real Estate",
    navHome: "Home", navProperties: "Properties", navAbout: "About", navContact: "Contact", navPrivacy: "Privacy",
    heroKicker: "Prestige Villa",
    heroTitle: "Properties worth coming home to.",
    heroSub: "An elegant, calm place to browse available homes and arrange a private viewing. Discover luxury real estate in Ibadan and Oyo State.",
    ctaExplore: "Explore Properties", ctaContact: "Contact Us",
    searchLocation: "Location", searchType: "Property type", searchMin: "Min price (₦)", searchMax: "Max price (₦)", searchBeds: "Bedrooms", searchSubmit: "Search properties",
    featured: "Featured", featuredTitle: "Selected properties", featuredSub: "Browse a sample of available listings. Marked Sample listing — placeholders only.",
    why: "Why Prestige Villa", whyTitle: "Why Prestige Villa?", whySub: "Replace with your own verifiable details.",
    step1: "Browse", step1d: "Search by location, type, price and bedrooms.", step2: "Enquire", step2d: "Message or WhatsApp about any property.", step3: "Viewing", step3d: "Book a private viewing.",
    waPrefer: "Prefer to chat?", waText: "Message us on WhatsApp. Save: +234 907 063 4599.", waBtn: "WhatsApp Us",
    faq: "Questions", faqTitle: "Frequently asked questions", faqSub: "Edit with your own information.",
    faq1q: "How do I schedule a viewing?", faq1a: "Contact us via WhatsApp or the contact form and we'll arrange a convenient time.",
    faq2q: "Are prices negotiable?", faq2a: "Pricing is set by the property owner. Enquire directly to discuss terms.",
    faq3q: "Do you manage rentals?", faq3a: "Update this answer with your actual rental services.",
    footerCompany: "Company", footerAbout: "About Prestige Villa", footerContact: "Contact / Book a Viewing", footerPrivacy: "Privacy Policy",
    footerBrowse: "Browse", footerAll: "All Properties", footerSale: "For Sale", footerRent: "For Rent", footerTouch: "Get in touch",
    footerYear: "Prestige Villa. All rights reserved.",
    listingsTitle: "Available properties", listingsSub: "Browse properties for sale and rent.",
    listingsFilters: "Filters", listingsSort: "Sort",
    noMatch: "No matching properties", noMatchSub: "Try adjusting your filters.", clearFilters: "Clear filters",
    propertyNotFound: "Property not found", propertyNotFoundSub: "The listing you requested does not exist.", browseProperties: "Browse properties",
    statusForSale: "For Sale", statusForRent: "For Rent", sampleTag: "Sample listing",
    propDetails: "Property details", propEnquire: "Enquire on WhatsApp", propCall: "Call", propViewing: "Book a viewing", propSimilar: "Similar properties",
    propSampleNotice: "Sample listing. Details are placeholder text. Replace with real property information before launch.",
    enquireTitle: "Book a viewing or send an enquiry", enquireSub: "Your message will include this property automatically.",
    formName: "Full name", formPhone: "Phone number", formEmail: "Email address", formMessage: "Message",
    formConsent: "I agree to Prestige Villa contacting me. Read our Privacy Policy.",
    formSubmit: "Send enquiry",
    formSuccess: "Thank you. This is a prototype demo — no backend is connected, so your enquiry was not actually sent.",
    formError: "Please complete all required fields and accept consent.",
    aboutTitle: "About Prestige Villa", aboutSub: "Replace this paragraph with your own factual company description.",
    aboutApproach: "Our approach", aboutApproachText: "We help buyers, renters and investors discover listings and contact the right people.",
    aboutShow: "What we can show", aboutShowText: "Property listings with pricing, location, bedrooms, bathrooms and features — plus WhatsApp, phone and viewing actions.",
    aboutComplete: "To complete this page", aboutCompleteText: "Add your real company history, team, service areas, awards and reviews. Use verified facts only.",
    contactTitle: "Contact / Book a Viewing", contactSub: "Get in touch about a property or arrange a viewing.",
    contactPhone: "Phone", contactEmail: "Email", contactAddress: "Address", contactWhatsApp: "WhatsApp", contactSend: "Send a message",
    contactNotice: "This form is a prototype. No backend is connected — submissions are not actually sent.",
    privacyTitle: "Privacy Policy", privacySub: "Replace with your real privacy policy.",
    saved: "Saved to shortlist", removed: "Removed from shortlist", backTop: "Back to top",
    darkMode: "Dark mode", lang: "Language", currency: "Currency",
  },
  "ng-pidgin": {
    siteTitle: "Prestige Villa — Sweet House Estate",
    navHome: "Home", navProperties: "Houses", navAbout: "About Us", navContact: "Contact", navPrivacy: "Privacy",
    heroKicker: "Prestige Villa",
    heroTitle: "Fine houses wey you go like to stay.",
    heroSub: "Elegant place to look for houses and book viewing. See luxury house for Ibadan and Oyo State.",
    ctaExplore: "Look for Houses", ctaContact: "Call Us",
    searchLocation: "Location", searchType: "House type", searchMin: "Lowest price (₦)", searchMax: "Highest price (₦)", searchBeds: "Rooms", searchSubmit: "Search houses",
    featured: "Featured", featuredTitle: "Selected houses", featuredSub: "Look at sample houses below. Marked Sample house — placeholders only.",
    why: "Why Prestige Villa", whyTitle: "Why choose Prestige Villa?", whySub: "Put your own true details here.",
    step1: "Look", step1d: "Search house by place, type, money and rooms.", step2: "Message", step2d: "Send message or WhatsApp for house you like.", step3: "Viewing", step3d: "Book time to look at house.",
    waPrefer: "You want chat?", waText: "Message us for WhatsApp. Save number: +234 907 063 4599.", waBtn: "WhatsApp Us",
    faq: "Questions", faqTitle: "Common questions", faqSub: "Change these answers with your own information.",
    faq1q: "How I go book viewing?", faq1a: "Send us WhatsApp or contact form, we go fix time.",
    faq2q: "Price fit change?", faq2a: "House owner set price. Talk to them directly.",
    faq3q: "Una get rent house?", faq3a: "Update this answer if you get rent house.",
    footerCompany: "Company", footerAbout: "About Prestige Villa", footerContact: "Contact / Book Viewing", footerPrivacy: "Privacy Policy",
    footerBrowse: "Look", footerAll: "All Houses", footerSale: "For Sale", footerRent: "For Rent", footerTouch: "Reach us",
    footerYear: "Prestige Villa. All rights reserved.",
    listingsTitle: "Houses available", listingsSub: "See houses for sale and rent.",
    listingsFilters: "Filters", listingsSort: "Sort",
    noMatch: "No house match", noMatchSub: "Change your filter or search.", clearFilters: "Clear filter",
    propertyNotFound: "House no dey", propertyNotFoundSub: "The house you request no dey.", browseProperties: "Look houses",
    statusForSale: "For Sale", statusForRent: "For Rent", sampleTag: "Sample house",
    propDetails: "House details", propEnquire: "WhatsApp Us", propCall: "Call", propViewing: "Book viewing", propSimilar: "Similar houses",
    propSampleNotice: "Sample house. Details no be real.",
    enquireTitle: "Book viewing or send message", enquireSub: "Your message go include this house automatically.",
    formName: "Your name", formPhone: "Your phone number", formEmail: "Your email", formMessage: "Your message",
    formConsent: "I agree Prestige Villa fit contact me. Read Privacy Policy.",
    formSubmit: "Send message",
    formSuccess: "Thank you. This na demo only — no backend connected.",
    formError: "Fill all fields and tick consent box.",
    aboutTitle: "About Prestige Villa", aboutSub: "Put your own true company story here — who you be, what you do, and where you dey.",
    aboutApproach: "How we take do am", aboutApproachText: "We help buyers and renters see houses and talk to right people.",
    aboutShow: "What we get", aboutShowText: "House lists with price, place, rooms, toilets and features — plus WhatsApp and call button.",
    aboutComplete: "Finish this page", aboutCompleteText: "Add your true company history, team, place you work, awards and reviews. No lie — use true details only.",
    contactTitle: "Contact / Book Viewing", contactSub: "Reach us for house or booking.",
    contactPhone: "Call", contactEmail: "Email", contactAddress: "Location", contactWhatsApp: "WhatsApp", contactSend: "Send message",
    contactNotice: "This na demo form — no backend connected.",
    privacyTitle: "Privacy Policy", privacySub: "Put your real privacy policy here.",
    saved: "Save am for list", removed: "Remove am from list", backTop: "Go top",
    darkMode: "Night mode", lang: "Language", currency: "Money",
  },
};

const CURRENCY_RATES: Record<Currency, number> = { NGN: 1, USD: 0.00062, GBP: 0.00049 };
const CURRENCY_SYMBOLS: Record<Currency, string> = { NGN: "₦", USD: "$", GBP: "£" };

export function formatPriceNum(price: string, period: string | undefined, currency: Currency): string {
  const num = parseInt(String(price).replace(/[^0-9]/g, ""), 10) || 0;
  const converted = Math.round(num * (CURRENCY_RATES[currency] || 1));
  const formatted = converted.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const suffix = period && period !== "total" ? " /" + period.replace("per ", "") : "";
  return (CURRENCY_SYMBOLS[currency] || "₦") + formatted + suffix;
}

interface SiteContextValue {
  lang: Lang;
  theme: Theme;
  currency: Currency;
  saved: string[];
  toast: string;
  t: (key: string) => string;
  toggleTheme: () => void;
  toggleLang: () => void;
  toggleCurrency: () => void;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore saved preferences after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    const storedTheme = localStorage.getItem("pv_theme");
    if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    const storedLang = localStorage.getItem("pv_lang");
    if (storedLang === "en" || storedLang === "ng-pidgin") setLang(storedLang);
    const storedCurrency = localStorage.getItem("pv_currency");
    if (storedCurrency === "NGN" || storedCurrency === "USD" || storedCurrency === "GBP") setCurrency(storedCurrency);
    try {
      const storedSaved = JSON.parse(localStorage.getItem("pv_saved") || "[]");
      if (Array.isArray(storedSaved)) setSaved(storedSaved.filter((x) => typeof x === "string"));
    } catch {
      // ignore malformed saved list
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("pv_theme", next);
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "ng-pidgin" : "en";
      localStorage.setItem("pv_lang", next);
      return next;
    });
  }, []);

  const t = useCallback((key: string) => (I18N[lang] || I18N.en)[key] || key, [lang]);

  const toggleCurrency = useCallback(() => {
    setCurrency((prev) => {
      const order: Currency[] = ["NGN", "USD", "GBP"];
      const next = order[(order.indexOf(prev) + 1) % order.length] ?? "NGN";
      localStorage.setItem("pv_currency", next);
      return next;
    });
  }, []);

  const toggleSave = useCallback(
    (id: string) => {
      const exists = saved.includes(id);
      const next = exists ? saved.filter((x) => x !== id) : [...saved, id];
      setSaved(next);
      localStorage.setItem("pv_saved", JSON.stringify(next));
      showToast(exists ? t("removed") : t("saved"));
    },
    [saved, showToast, t],
  );

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);


  return (
    <SiteContext.Provider
      value={{ lang, theme, currency, saved, toast, t, toggleTheme, toggleLang, toggleCurrency, toggleSave, isSaved }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
