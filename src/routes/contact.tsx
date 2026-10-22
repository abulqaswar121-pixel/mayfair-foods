import { createFileRoute } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONFIG, SiteProvider, useSite } from "@/components/site/site-context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact / Book a Viewing — Prestige Villa" },
      {
        name: "description",
        content: "Contact Prestige Villa or book a property viewing. Enquire by phone, email or WhatsApp.",
      },
      { property: "og:title", content: "Contact / Book a Viewing — Prestige Villa" },
      { property: "og:description", content: "Contact Prestige Villa or book a property viewing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://prestigevilla.lovable.app/contact" },
      { property: "og:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
      { name: "twitter:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://prestigevilla.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteProvider>
      <SiteLayout>
        <ContactBody />
      </SiteLayout>
    </SiteProvider>
  );
}

function ContactBody() {
  const { t } = useSite();
  return (
    <>
        <section className="page-hero" aria-label="Contact hero">
          <div className="container">
            <h1>{t("contactTitle")}</h1>
            <p>{t("contactSub")}</p>
          </div>
        </section>
        <section className="section" aria-label="Contact options">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h3>Get in touch</h3>
                <div className="info-item">
                  <div className="info-item__icon">📞</div>
                  <div className="info-item__text">
                    <h4>{t("contactPhone")}</h4>
                    <p>
                      <a href={"tel:" + CONFIG.phoneRaw}>{CONFIG.phone}</a>
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item__icon">✉️</div>
                  <div className="info-item__text">
                    <h4>{t("contactEmail")}</h4>
                    <p>
                      <a href={"mailto:" + CONFIG.email}>{CONFIG.email}</a>
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item__icon">📍</div>
                  <div className="info-item__text">
                    <h4>{t("contactAddress")}</h4>
                    <p>{CONFIG.address}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item__icon">💬</div>
                  <div className="info-item__text">
                    <h4>{t("contactWhatsApp")}</h4>
                    <p>
                      <a href={CONFIG.whatsapp} className="wa-link" target="_blank" rel="noopener">
                        Message us on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrap">
                <h3>{t("contactSend")}</h3>
                <p className="form-notice">{t("contactNotice")}</p>
                <EnquiryForm formId="contact-form" />
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

