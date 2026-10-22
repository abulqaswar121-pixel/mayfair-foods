import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { PropertyCard } from "@/components/site/PropertyCard";
import { WhatsAppIcon } from "@/components/site/icons";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONFIG, SiteProvider, useSite } from "@/components/site/site-context";
import { PRESTIGE_VILLA_PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prestige Villa — Luxury Real Estate in Ibadan" },
      {
        name: "description",
        content:
          "Discover luxury properties for sale and rent in Ibadan, Oyo State. Prestige Villa — elegant real estate for buyers, renters and investors.",
      },
      { property: "og:title", content: "Prestige Villa — Luxury Real Estate" },
      { property: "og:description", content: "Discover luxury properties for sale and rent in Ibadan, Oyo State." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://prestigevilla.lovable.app" },
      { property: "og:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
      { name: "twitter:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://prestigevilla.lovable.app" }],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <SiteProvider>
      <SiteLayout>
        <Hero />
        <HomeSearch />
        <Featured />
        <Stats />
        <Why />
        <Process />
        <WhatsAppCta />
        <Faq />
      </SiteLayout>
    </SiteProvider>
  );
}

function Hero() {
  const { t } = useSite();
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__bg" />
      <div className="hero__inner">
        <span className="kicker hero__kicker">{t("heroKicker")}</span>
        <h1>{t("heroTitle")}</h1>
        <p className="hero__sub">{t("heroSub")}</p>
        <div className="hero__cta">
          <Link to="/listings" search={{}} className="btn btn--navy btn-icon-right">
            {t("ctaExplore")}
          </Link>
          <Link to="/contact" className="btn btn--outline btn-icon-right">
            {t("ctaContact")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeSearch() {
  const { t } = useSite();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/listings",
      search: {
        location: location || undefined,
        type: type || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        bedrooms: bedrooms || undefined,
      },
    });
  };

  return (
    <section className="section section--tight">
      <div className="container">
        <form onSubmit={onSubmit} className="property-search">
          <div className="search-form">
            <div className="search-group">
              <label htmlFor="hs-location">{t("searchLocation")}</label>
              <input type="text" id="hs-location" name="location" placeholder="e.g. Agodi GRA" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="search-group">
              <label htmlFor="hs-type">{t("searchType")}</label>
              <select id="hs-type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Any type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Duplex">Duplex</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className="search-group">
              <label htmlFor="hs-min">{t("searchMin")}</label>
              <input type="number" id="hs-min" name="minPrice" placeholder="0" min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div className="search-group">
              <label htmlFor="hs-max">{t("searchMax")}</label>
              <input type="number" id="hs-max" name="maxPrice" placeholder="No limit" min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div className="search-group" style={{ display: "flex", alignItems: "end" }}>
              <label htmlFor="hs-beds" style={{ marginBottom: 0 }}>
                {t("searchBeds")}
              </label>
              <select id="hs-beds" name="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <button type="submit" className="btn btn-search btn--navy">
              {t("searchSubmit")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Featured() {
  const { t } = useSite();
  const featured = PRESTIGE_VILLA_PROPERTIES.slice(0, 4);
  return (
    <section className="section" aria-label="Featured properties">
      <div className="container">
        <div className="section-header">
          <span className="kicker">{t("featured")}</span>
          <h2>{t("featuredTitle")}</h2>
          <p>{t("featuredSub")}</p>
        </div>
        <div className="property-grid" id="home-grid">
          {featured.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
        <div className="u-text-center u-mb-lg">
          <Link to="/listings" search={{}} className="btn btn--outline btn-icon-right">
            View all properties
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {value}
    </span>
  );
}

function Stats() {
  const stats = [
    { target: 500, label: "Properties Listed" },
    { target: 120, label: "Happy Clients" },
    { target: 15, label: "Years Experience" },
    { target: 50, label: "Verified Agents" },
  ];
  return (
    <section className="stats" aria-label="Company statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <StatNumber target={s.target} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const { t } = useSite();
  return (
    <section className="section section--tight" aria-label="Why Prestige Villa">
      <div className="container">
        <div className="section-header">
          <span className="kicker">{t("why")}</span>
          <h2>{t("whyTitle")}</h2>
          <p>{t("whySub")}</p>
        </div>
        <div className="why-grid">
          <div className="why-item">
            <div className="why-item__icon">🔎</div>
            <div>
              <h3>Browse listings</h3>
              <p>View available properties with clear pricing and key details.</p>
            </div>
          </div>
          <div className="why-item">
            <div className="why-item__icon">💬</div>
            <div>
              <h3>Enquire directly</h3>
              <p>Message us or WhatsApp about any property that interests you.</p>
            </div>
          </div>
          <div className="why-item">
            <div className="why-item__icon">📅</div>
            <div>
              <h3>Arrange a viewing</h3>
              <p>Book a private viewing at your convenience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useSite();
  return (
    <section className="section section--tight" aria-label="Process">
      <div className="container">
        <div className="process">
          <div className="process__steps">
            <div className="step">
              <span className="step__number">01</span>
              <h3>{t("step1")}</h3>
              <p>{t("step1d")}</p>
            </div>
            <div className="step">
              <span className="step__number">02</span>
              <h3>{t("step2")}</h3>
              <p>{t("step2d")}</p>
            </div>
            <div className="step">
              <span className="step__number">03</span>
              <h3>{t("step3")}</h3>
              <p>{t("step3d")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppCta() {
  const { t } = useSite();
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="wa-cta">
          <h3>{t("waPrefer")}</h3>
          <p>{t("waText")}</p>
          <a href={CONFIG.whatsapp} className="btn btn--gold btn-icon-right" target="_blank" rel="noopener">
            <WhatsAppIcon /> {t("waBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "faq1q", a: "faq1a" },
  { q: "faq2q", a: "faq2a" },
  { q: "faq3q", a: "faq3a" },
] as const;

function Faq() {
  const { t } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" aria-label="FAQ">
      <div className="container">
        <div className="section-header">
          <span className="kicker">{t("faq")}</span>
          <h2>{t("faqTitle")}</h2>
          <p>{t("faqSub")}</p>
        </div>
        <div className="faq-grid">
          {FAQ_ITEMS.map((item, i) => (
            <div className={"faq-item" + (open === i ? " is-open" : "")} key={i}>
              <button
                className="faq__button"
                aria-expanded={open === i}
                aria-controls={`faq-${i + 1}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{t(item.q)}</span>
                <svg className="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 9L12 15L18 9" />
                  <path d="M12 15V3" />
                </svg>
              </button>
              <div className="faq__panel" id={`faq-${i + 1}`}>
                <p>{t(item.a)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
