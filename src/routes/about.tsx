import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SiteProvider, useSite } from "@/components/site/site-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Prestige Villa" },
      {
        name: "description",
        content: "Learn about Prestige Villa — real estate for buyers, renters and investors in Ibadan, Oyo State.",
      },
      { property: "og:title", content: "About Prestige Villa" },
      { property: "og:description", content: "Learn about Prestige Villa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://prestigevilla.lovable.app/about" },
      { property: "og:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
      { name: "twitter:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://prestigevilla.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteProvider>
      <SiteLayout>
        <AboutBody />
      </SiteLayout>
    </SiteProvider>
  );
}

function AboutBody() {
  const { t } = useSite();
  return (
    <>
        <section className="page-hero" aria-label="About hero">
          <div className="container">
            <h1>{t("aboutTitle")}</h1>
            <p>{t("aboutSub")}</p>
          </div>
        </section>
        <section className="section" aria-label="About content">
          <div className="container">
            <div className="about-content">
              <h2>{t("aboutApproach")}</h2>
              <p>{t("aboutApproachText")}</p>
              <h2>{t("aboutShow")}</h2>
              <p>{t("aboutShowText")}</p>
            </div>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-item__icon">🏠</div>
                <div className="value-item__text">
                  <h4>Listings</h4>
                  <p>Replace with your factual statement about available properties.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-item__icon">🔍</div>
                <div className="value-item__text">
                  <h4>Search</h4>
                  <p>Replace with your factual statement about how buyers can find properties.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-item__icon">📞</div>
                <div className="value-item__text">
                  <h4>Contact</h4>
                  <p>Replace with your factual statement about enquiries and viewings.</p>
                </div>
              </div>
            </div>
            <div className="placeholder-panel">
              <h3>{t("aboutComplete")}</h3>
              <p>{t("aboutCompleteText")}</p>
            </div>
          </div>
        </section>
    </>
  );
}

