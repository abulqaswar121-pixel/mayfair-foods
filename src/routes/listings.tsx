import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { PropertyCard } from "@/components/site/PropertyCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SiteProvider, useSite } from "@/components/site/site-context";
import { PRESTIGE_VILLA_PROPERTIES, PROPERTY_LOCATIONS } from "@/data/properties";

type ListingsSearch = {
  location?: string | undefined;
  type?: string | undefined;
  saleRent?: string | undefined;
  bedrooms?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  sort?: string | undefined;
};


export const Route = createFileRoute("/listings")({
  validateSearch: (search: Record<string, unknown>): ListingsSearch => ({
    location: typeof search["location"] === "string" ? search["location"] : undefined,
    type: typeof search["type"] === "string" ? search["type"] : undefined,
    saleRent: typeof search["saleRent"] === "string" ? search["saleRent"] : undefined,
    bedrooms: typeof search["bedrooms"] === "string" ? search["bedrooms"] : undefined,
    minPrice: typeof search["minPrice"] === "string" ? search["minPrice"] : undefined,
    maxPrice: typeof search["maxPrice"] === "string" ? search["maxPrice"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Available properties — Prestige Villa" },
      {
        name: "description",
        content: "Browse properties for sale and rent in Ibadan, Oyo State. Filter by location, type, price and bedrooms.",
      },
      { property: "og:title", content: "Available properties — Prestige Villa" },
      { property: "og:description", content: "Browse properties for sale and rent in Ibadan, Oyo State." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://prestigevilla.lovable.app/listings" },
      { property: "og:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
      { name: "twitter:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://prestigevilla.lovable.app/listings" }],
  }),
  component: ListingsPage,
});

type Filters = {
  query: string;
  type: string;
  saleRent: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
};

const EMPTY_FILTERS: Filters = {
  query: "",
  type: "",
  saleRent: "",
  bedrooms: "",
  minPrice: "",
  maxPrice: "",
  sort: "featured",
};

function priceNum(price: string): number {
  return parseInt(String(price).replace(/[^0-9]/g, ""), 10) || 0;
}

function ListingsPage() {
  return (
    <SiteProvider>
      <ListingsBody />
    </SiteProvider>
  );
}

function ListingsBody() {
  const { t } = useSite();
  const initial = Route.useSearch();
  const [filters, setFilters] = useState<Filters>({
    query: initial.location ?? "",
    type: initial.type ?? "",
    saleRent: initial.saleRent ?? "",
    bedrooms: initial.bedrooms ?? "",
    minPrice: initial.minPrice ?? "",
    maxPrice: initial.maxPrice ?? "",
    sort: initial.sort ?? "featured",
  });
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const stored = localStorage.getItem("pv_view");
    if (stored === "grid" || stored === "list") setView(stored);
  }, []);

  const set = (key: keyof Filters, value: string) => setFilters((prev) => ({ ...prev, [key]: value }));

  const filtered = useMemo(() => {
    let list = PRESTIGE_VILLA_PROPERTIES.filter((p) => {
      const q = filters.query.toLowerCase();
      const mq =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.address ?? "").toLowerCase().includes(q);
      const mt = !filters.type || p.type === filters.type;
      const msr = !filters.saleRent || p.status === filters.saleRent;
      const mb = !filters.bedrooms || String(p.bedrooms) === filters.bedrooms;
      const price = priceNum(p.price);
      const mn = filters.minPrice ? parseInt(filters.minPrice, 10) : 0;
      const mx = filters.maxPrice ? parseInt(filters.maxPrice, 10) : Infinity;
      return mq && mt && msr && mb && price >= mn && price <= mx;
    });
    if (filters.sort === "price-asc") list = [...list].sort((a, b) => priceNum(a.price) - priceNum(b.price));
    else if (filters.sort === "price-desc") list = [...list].sort((a, b) => priceNum(b.price) - priceNum(a.price));
    else if (filters.sort === "bedrooms-desc") list = [...list].sort((a, b) => b.bedrooms - a.bedrooms);
    return list;
  }, [filters]);

  const chips = [
    { key: "saleRent" as const, label: "For Sale", value: "For Sale" },
    { key: "saleRent" as const, label: "For Rent", value: "For Rent" },
    { key: "type" as const, label: "House", value: "House" },
    { key: "type" as const, label: "Apartment", value: "Apartment" },
    { key: "type" as const, label: "Duplex", value: "Duplex" },
    { key: "type" as const, label: "Land", value: "Land" },
  ];

  const pickView = (next: "grid" | "list") => {
    setView(next);
    localStorage.setItem("pv_view", next);
  };

  return (
    <SiteLayout>
      <section className="listings-hero" aria-label="Listings hero">
          <div className="container">
            <h1>{t("listingsTitle")}</h1>
            <p id="results-count">
              {filtered.length} {filtered.length === 1 ? "property" : "properties"} available
            </p>
          </div>
        </section>
        <section className="section section--tight">
          <div className="container">
            <div className="listings-toolbar" aria-label="Property filters and sorting">
              <div className="toolbar-left">
                <span className="kicker">{t("listingsFilters")}</span>
                <select
                  className="filter-select"
                  aria-label="Search location"
                  value={filters.query}
                  onChange={(e) => set("query", e.target.value)}
                >
                  <option value="">Any location</option>
                  {PROPERTY_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <select
                  className="filter-select"
                  aria-label="Property type"
                  value={filters.type}
                  onChange={(e) => set("type", e.target.value)}
                >
                  <option value="">Any type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <select
                  className="filter-select"
                  aria-label="Sale or rent"
                  value={filters.saleRent}
                  onChange={(e) => set("saleRent", e.target.value)}
                >
                  <option value="">Sale or rent</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
                <select
                  className="filter-select"
                  aria-label="Bedrooms"
                  value={filters.bedrooms}
                  onChange={(e) => set("bedrooms", e.target.value)}
                >
                  <option value="">Any bedrooms</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                </select>
              </div>
              <div className="toolbar-right">
                <span className="kicker">{t("listingsSort")}</span>
                <select
                  className="filter-select"
                  aria-label="Sort results"
                  value={filters.sort}
                  onChange={(e) => set("sort", e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="bedrooms-desc">Bedrooms: high to low</option>
                </select>
                <input
                  type="number"
                  className="filter-select"
                  placeholder="Min ₦"
                  min={0}
                  aria-label="Minimum price"
                  value={filters.minPrice}
                  onChange={(e) => set("minPrice", e.target.value)}
                />
                <input
                  type="number"
                  className="filter-select"
                  placeholder="Max ₦"
                  min={0}
                  aria-label="Maximum price"
                  value={filters.maxPrice}
                  onChange={(e) => set("maxPrice", e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <div className="view-toggle">
                <button
                  type="button"
                  className={"view-btn" + (view === "grid" ? " active" : "")}
                  data-view="grid"
                  aria-label="Grid view"
                  onClick={() => pickView("grid")}
                >
                  ▦
                </button>
                <button
                  type="button"
                  className={"view-btn" + (view === "list" ? " active" : "")}
                  data-view="list"
                  aria-label="List view"
                  onClick={() => pickView("list")}
                >
                  ≡
                </button>
              </div>
              <div id="chips-container">
                {chips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    className={"filter-chip" + (filters[chip.key] === chip.value ? " is-active" : "")}
                    onClick={() => set(chip.key, filters[chip.key] === chip.value ? "" : chip.value)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <h2>{t("noMatch")}</h2>
                <p>{t("noMatchSub")}</p>
                <button className="btn btn--navy" onClick={() => setFilters(EMPTY_FILTERS)}>
                  {t("clearFilters")}
                </button>
              </div>
            ) : (
              <div className={"listings-results" + (view === "list" ? " list-view" : "")} role="list" aria-label="Property listings">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} p={p} view={view} />
                ))}
              </div>
            )}
          </div>
        </section>
      </SiteLayout>
  );
}

