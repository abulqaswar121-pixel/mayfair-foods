import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PhoneIcon, WhatsAppIcon } from "@/components/site/icons";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONFIG, SiteProvider, formatPriceNum, useSite } from "@/components/site/site-context";
import { getPropertyById, PRESTIGE_VILLA_PROPERTIES, type Property } from "@/data/properties";

export const Route = createFileRoute("/property")({
  validateSearch: (search: Record<string, unknown>): { id?: string | undefined } => ({
    id: typeof search["id"] === "string" ? search["id"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Property — Prestige Villa" },
      { name: "description", content: "View property details and enquire with Prestige Villa." },
      { property: "og:title", content: "Property — Prestige Villa" },
      { property: "og:description", content: "View property details and enquire with Prestige Villa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://prestigevilla.lovable.app/property" },
      { property: "og:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
      { name: "twitter:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://prestigevilla.lovable.app/property" }],
  }),
  component: PropertyPage,
});

function PropertyPage() {
  const { id } = Route.useSearch();
  const property = getPropertyById(id);
  return (
    <SiteProvider>
      <SiteLayout>
        {property ? (
          <PropertyDetail key={property.id} property={property} />
        ) : (
          <section className="section section--tight u-text-center">
            <NotFoundContent />
          </section>
        )}
      </SiteLayout>
    </SiteProvider>
  );
}

function NotFoundContent() {
  const { t } = useSite();
  return (
    <>
      <h1>{t("propertyNotFound")}</h1>
      <p>{t("propertyNotFoundSub")}</p>
      <Link to="/listings" search={{}} className="btn btn--navy">
        {t("browseProperties")}
      </Link>
    </>
  );
}

function PropertyDetail({ property }: { property: Property }) {
  const { currency, t } = useSite();
  const [active, setActive] = useState(0);
  const images = property.images.length ? property.images : ["/images/sample-exterior-1.jpg"];
  const similar = PRESTIGE_VILLA_PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const waText = `Hello Prestige Villa, I am interested in "${property.title}" (${property.location}). Price: ${formatPriceNum(property.price, property.pricePeriod, currency)}. Please share more details.`;

  return (
    <section className="section section--tight">
      <div className="container">
        {property.sample ? (
          <div className="sample-notice" style={{ display: "flex" }}>
            <strong>Sample listing.</strong>&nbsp;{t("propSampleNotice")}
          </div>
        ) : null}

        <div className="property-hero" aria-label="Property gallery">
          <img
            src={images[active]}
            alt={property.imageAlt?.[active] || "Property photo"}
            className="property-hero__image"
          />
          {images.length > 1 ? (
            <div className="property-hero__thumbs">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={"thumb" + (i === active ? " is-active" : "")}
                  aria-label={`Image ${i + 1}`}
                  onClick={() => setActive(i)}
                >
                  <img src={src} alt={property.imageAlt?.[i] || "Property thumbnail"} loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="property-meta">
          <div>
            <span className="kicker">{property.status}</span>
            <h1>{property.title}</h1>
            <p className="lead">{property.subtitle || ""}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="price">{formatPriceNum(property.price, property.pricePeriod, currency)}</span>
            <span className="price-period">{property.pricePeriod || ""}</span>
          </div>
        </div>

        <div className="property-actions">
          <a
            href={`${CONFIG.whatsapp}?text=${encodeURIComponent(waText)}`}
            className="btn btn--gold btn-icon-right wa-enquire"
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon />
            <span>{t("propEnquire")}</span>
          </a>
          <a href={"tel:" + CONFIG.phoneRaw} className="btn btn--outline btn-icon-right">
            <PhoneIcon />
            <span>{t("propCall")}</span>
          </a>
          <a href="#book-viewing" className="btn btn--ghost btn-icon-right">
            {t("propViewing")}
          </a>
        </div>

        <div className="property-details" aria-label="Property details">
          <h3>{t("propDetails")}</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-item__label">Bedrooms</span>
              <span className="detail-item__value">{property.bedrooms}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Bathrooms</span>
              <span className="detail-item__value">{property.bathrooms}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Toilets</span>
              <span className="detail-item__value">{property.toilets}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Parking</span>
              <span className="detail-item__value">{property.parking}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Area</span>
              <span className="detail-item__value">{property.areaSqm || "—"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Location</span>
              <span className="detail-item__value">{property.location}</span>
            </div>
          </div>
        </div>

        <div className="property-description" aria-label="Property description">
          {property.description.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {property.features?.length ? (
          <div className="features-list" aria-label="Property features">
            {property.features.map((f) => (
              <span className="feature-tag" key={f}>
                {f}
              </span>
            ))}
          </div>
        ) : null}

        {similar.length ? (
          <div className="similar-properties">
            <h3>{t("propSimilar")}</h3>
            <div className="property-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
              {similar.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        ) : null}

        <section id="book-viewing" className="section section--tight" aria-label="Book a viewing">
          <div className="container">
            <div className="section-header" style={{ textAlign: "left", maxWidth: "none" }}>
              <span className="kicker">Enquire</span>
              <h2>{t("enquireTitle")}</h2>
              <p>{t("enquireSub")}</p>
            </div>
            <EnquiryForm formId="enquiry-form" subject={`Enquiry: ${property.title}`} />
          </div>
        </section>
      </div>
    </section>
  );
}
