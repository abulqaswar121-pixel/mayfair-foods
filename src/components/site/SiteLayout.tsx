import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { FacebookIcon, InstagramIcon, PhoneIcon, WhatsAppIcon, XIcon } from "@/components/site/icons";
import { CONFIG, useSite } from "@/components/site/site-context";

const NAV_ITEMS = [
  { to: "/", key: "navHome" },
  { to: "/listings", key: "navProperties" },
  { to: "/about", key: "navAbout" },
  { to: "/contact", key: "navContact" },
  { to: "/privacy", key: "navPrivacy" },
] as const;

const SOCIALS = [
  { href: "https://instagram.com/prestigevilla.ng", label: "Instagram", icon: <InstagramIcon /> },
  { href: "https://facebook.com/prestigevilla.ng", label: "Facebook", icon: <FacebookIcon /> },
  { href: "https://x.com/prestigevilla.ng", label: "X", icon: <XIcon /> },
];

function Brand() {
  return (
    <Link to="/" className="brand">
      <div className="brand-mark">
        <img src="/images/logo.svg" alt="Prestige Villa logo" />
      </div>
      <div className="brand-name">
        Prestige <span>Villa</span>
      </div>
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t, theme, lang, currency, toggleTheme, toggleLang, toggleCurrency, toast } = useSite();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className={"site-header" + (scrolled ? " is-scrolled" : "")} id="site-header">
        <div className="container header-wrap">
          <Brand />
          <nav className="nav-list" id="nav-list">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} aria-current={pathname === item.to ? "page" : undefined}>
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <button
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <div className="header-tools">
            <button className="theme-btn" title={t("darkMode")} onClick={toggleTheme}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="lang-btn" title={t("lang")} onClick={toggleLang}>
              {lang === "en" ? "EN" : "NG"}
            </button>
            <button className="curr-btn" title={t("currency")} onClick={toggleCurrency}>
              {currency}
            </button>
            <a href={CONFIG.whatsapp} className="btn-wa wa-link" target="_blank" rel="noopener">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <div className={"mobile-menu" + (menuOpen ? " is-open" : "")} id="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-header">
          <Brand />
          <button className="mobile-close" aria-label="Close menu" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <nav>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={closeMenu}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="actions">
          <a href={CONFIG.whatsapp} className="btn btn--navy btn--full wa-link" target="_blank" rel="noopener">
            {t("waBtn")}
          </a>
        </div>
      </div>

      <main id="main-content">{children}</main>

      <footer className="site-footer" aria-label="Footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>{CONFIG.address}</p>
            <div className="footer-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>{t("footerCompany")}</h4>
            <ul>
              <li><Link to="/about">{t("footerAbout")}</Link></li>
              <li><Link to="/contact">{t("footerContact")}</Link></li>
              <li><Link to="/privacy">{t("footerPrivacy")}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("footerBrowse")}</h4>
            <ul>
              <li><Link to="/listings" search={{}}>{t("footerAll")}</Link></li>
              <li><Link to="/listings" search={{}}>{t("footerSale")}</Link></li>
              <li><Link to="/listings" search={{}}>{t("footerRent")}</Link></li>

            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("footerTouch")}</h4>
            <ul>
              <li><a href={"tel:" + CONFIG.phoneRaw}>{t("contactPhone")}</a></li>
              <li><a href={"mailto:" + CONFIG.email}>{t("contactEmail")}</a></li>
              <li>
                <a href={CONFIG.whatsapp} className="wa-link" target="_blank" rel="noopener">
                  {t("contactWhatsApp")}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <form className="newsletter-form" aria-label="Newsletter signup" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn--navy">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            &nbsp;<span id="year">2026</span> <span>{t("footerYear")}</span> Sample listings are placeholders only.
          </p>
        </div>
      </footer>

      <div id="toast" className={"toast" + (toast ? " is-visible" : "")}>
        {toast}
      </div>


      <button
        className={"back-to-top" + (showBackTop ? " visible" : "")}
        id="back-to-top"
        aria-label={t("backTop")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      <div className="float-bar">
        <a
          href={
            CONFIG.whatsapp +
            "?text=Hello%20Prestige%20Villa%2C%20I%20am%20interested%20in%20a%20property."
          }
          className="btn btn--wa wa-link"
          target="_blank"
          rel="noopener"
        >
          <WhatsAppIcon /> WhatsApp
        </a>
        <a href={"tel:" + CONFIG.phoneRaw} className="btn btn--tel">
          <PhoneIcon /> Call
        </a>
      </div>
    </>
  );
}

