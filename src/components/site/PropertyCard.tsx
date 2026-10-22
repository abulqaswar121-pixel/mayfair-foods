import { Link } from "@tanstack/react-router";

import type { Property } from "@/data/properties";
import { CONFIG, formatPriceNum, useSite } from "@/components/site/site-context";

export function PropertyCard({ p, view = "grid" }: { p: Property; view?: "grid" | "list" }) {
  const { currency, isSaved, toggleSave, t } = useSite();
  const saved = isSaved(p.id);
  const imageWrapStyle =
    view === "list" ? { height: 260, width: "40%", minWidth: 260, flexShrink: 0 } : undefined;
  const contentStyle = view === "list" ? { padding: "1.5rem", width: "60%" } : undefined;

  return (
    <article className="property-card" role="listitem" tabIndex={0}>
      <div className="card__image-wrap" style={imageWrapStyle}>
        <img
          src={p.images[0] || "/images/sample-exterior-1.jpg"}
          alt={p.imageAlt?.[0] || "Property photo"}
          loading="lazy"
          className="card__image"
        />
        <span className="card__badge">
          {p.status === "For Sale" ? (
            <span className="badge badge--sale">{t("statusForSale")}</span>
          ) : (
            <span className="badge badge--rent">{t("statusForRent")}</span>
          )}
          {p.sample ? <span className="badge badge--sample">{t("sampleTag")}</span> : null}
        </span>
        <button
          className={"card__save" + (saved ? " saved" : "")}
          aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
          onClick={() => toggleSave(p.id)}
        >
          {saved ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="card__content" style={contentStyle}>
        <div className="card__price">{formatPriceNum(p.price, p.pricePeriod, currency)}</div>
        <div className="card__period">{p.pricePeriod || ""}</div>
        <h3 className="card__title">{p.title}</h3>
        <div className="card__meta">
          <span>🛏️ {p.bedrooms}</span>
          <span>🛁 {p.bathrooms}</span>
          <span>📍 {p.location}</span>
        </div>
        <div className="card__cta">
          <Link to="/property" search={{ id: p.id }} className="btn btn--ghost btn-icon-right">
            View Property
          </Link>
          <a
            href={`${CONFIG.whatsapp}?text=Enquiry%20about%20${encodeURIComponent(p.title)}`}
            className="btn btn--gold btn-icon-right"
            target="_blank"
            rel="noopener"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

