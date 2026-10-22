import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { CONFIG, SiteProvider, useSite } from "@/components/site/site-context";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Prestige Villa" },
      { name: "description", content: "How Prestige Villa handles your personal information." },
      { property: "og:title", content: "Privacy Policy — Prestige Villa" },
      { property: "og:description", content: "How Prestige Villa handles your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://prestigevilla.lovable.app/privacy" },
      { property: "og:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
      { name: "twitter:image", content: "https://prestigevilla.lovable.app/images/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://prestigevilla.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteProvider>
      <SiteLayout>
        <PrivacyBody />
      </SiteLayout>
    </SiteProvider>
  );
}

function PrivacyBody() {
  const { t } = useSite();
  return (
    <>
        <section className="page-hero" aria-label="Privacy hero">
          <div className="container">
            <h1>{t("privacyTitle")}</h1>
            <p>{t("privacySub")}</p>
          </div>
        </section>
        <section className="section" aria-label="Privacy content">
          <div className="container">
            <div className="privacy-content">
              <h2>Introduction</h2>
              <p>This is a placeholder privacy policy for Prestige Villa. Replace it with a policy that reflects how you actually collect, use and protect personal information.</p>
              <h2>Information we collect</h2>
              <p>When you submit a contact or viewing-booking form, we may collect your name, phone number, email address and message.</p>
              <h2>How we use information</h2>
              <p>We use contact details only to respond to your enquiry and arrange viewings. We do not promise to share or sell your data — update this section with your real practices.</p>
              <h2>Cookies and analytics</h2>
              <p>This site does not currently set analytics or tracking cookies. If you add them, disclose them here.</p>
              <h2>Your rights</h2>
              <p>You may request access to, correction of, or deletion of your personal data. Contact us using the details on the Contact page.</p>
              <h2>Changes to this policy</h2>
              <p>We may update this policy from time to time. Check this page for the current version.</p>
              <h2>Contact</h2>
              <p>
                Questions about this policy: <a href={"mailto:" + CONFIG.email}>{CONFIG.email}</a>.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}

