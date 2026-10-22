import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";

import { useSite } from "@/components/site/site-context";

export function EnquiryForm({ formId, subject }: { formId: string; subject?: string }) {
  const { t } = useSite();
  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "", consent: false });
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bad: string[] = [];
    (["name", "phone", "email", "message"] as const).forEach((key) => {
      if (!values[key].trim()) bad.push(key);
    });
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) bad.push("email");
    if (!values.consent) bad.push("consent");
    setErrors(bad);
    if (bad.length) {
      setStatus({ kind: "error", text: t("formError") });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setValues({ name: "", phone: "", email: "", message: "", consent: false });
      setStatus({ kind: "success", text: t("formSuccess") });
    }, 900);
  };

  const inputClass = (key: string) => (errors.includes(key) ? "input-error" : "");

  return (
    <form className="contact-form" id={formId} onSubmit={onSubmit} noValidate>
      {subject ? <input type="hidden" name="subject" value={subject} /> : null}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>{t("formName")}</label>
          <input
            type="text"
            id={`${formId}-name`}
            name="name"
            required
            placeholder="e.g. Adeola Okafor"
            className={inputClass("name")}
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-phone`}>{t("formPhone")}</label>
          <input
            type="tel"
            id={`${formId}-phone`}
            name="phone"
            required
            placeholder="e.g. 0801 234 5678"
            className={inputClass("phone")}
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-email`}>{t("formEmail")}</label>
          <input
            type="email"
            id={`${formId}-email`}
            name="email"
            required
            placeholder="you@example.com"
            className={inputClass("email")}
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </div>
        <div className="form-group" style={{ gridColumn: "1/-1" }}>
          <label htmlFor={`${formId}-message`}>{t("formMessage")}</label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            placeholder="What can we help you with?"
            className={inputClass("message")}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          />
        </div>
        <div className="form-group checkbox-group" style={{ gridColumn: "1/-1" }}>
          <input
            type="checkbox"
            id={`${formId}-consent`}
            name="consent"
            required
            className={inputClass("consent")}
            checked={values.consent}
            onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
          />
          <label htmlFor={`${formId}-consent`}>{t("formConsent")}</label>
        </div>
      </div>
      {status ? (
        <div
          className={"form-status " + (status.kind === "success" ? "form-status--success" : "form-status--error")}
          style={{ display: "block" }}
        >
          {status.text}
        </div>
      ) : (
        <div className="form-status" />
      )}
      <button type="submit" className="btn btn--gold btn-icon-right" disabled={sending}>
        {sending ? "Sending…" : t("formSubmit")}
      </button>
    </form>
  );
}
