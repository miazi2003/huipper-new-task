"use client";

import { useEffect, useState, type FormEvent } from "react";
import { DEFAULT_SITE_SETTINGS, getAdminSiteSettings, SiteSettingsApiError, updateAdminSiteSettings, type SiteSettings } from "@/lib/api/site-settings";
import styles from "@/components/admin/projects/projects.module.css";
import local from "./site-settings.module.css";

function clone(settings: SiteSettings): SiteSettings { return structuredClone(settings); }

export default function SiteSettingsForm() {
  const [settings, setSettings] = useState(() => clone(DEFAULT_SITE_SETTINGS));
  const [saved, setSaved] = useState(() => clone(DEFAULT_SITE_SETTINGS));
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
  const [error, setError] = useState(""); const [success, setSuccess] = useState("");

  useEffect(() => { void getAdminSiteSettings().then((result) => { setSettings(clone(result)); setSaved(clone(result)); }).catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Settings could not be loaded")).finally(() => setLoading(false)); }, []);
  function heroField<K extends keyof SiteSettings["hero"]>(field: K, value: SiteSettings["hero"][K]) { setSettings((current) => ({ hero: { ...current.hero, [field]: value } })); setSuccess(""); }
  function statField(index: number, field: "value" | "label", value: string) {
    const stats = settings.hero.stats.map((stat, statIndex) => statIndex === index ? { ...stat, [field]: value } : stat) as SiteSettings["hero"]["stats"];
    heroField("stats", stats);
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError(""); setSuccess("");
    try { const result = await updateAdminSiteSettings(settings); setSettings(clone(result)); setSaved(clone(result)); setSuccess("Hero settings saved successfully."); }
    catch (saveError) {
      if (saveError instanceof SiteSettingsApiError && saveError.details?.length) setError(saveError.details.map((detail) => `${detail.field}: ${detail.message}`).join(" · "));
      else setError(saveError instanceof Error ? saveError.message : "Settings could not be saved");
    } finally { setSaving(false); }
  }

  if (loading) return <div className={styles.state}>Loading site settings…</div>;
  return <form onSubmit={(event) => void submit(event)}>
    <header className={styles.pageHeader}><div><p className={styles.eyebrow}>Website</p><h1>Site settings</h1><p>Edit only the live hero content, contact information, and statistics.</p></div><button className={styles.primaryButton} disabled={saving} type="submit">{saving ? "Saving…" : "Save changes"}</button></header>
    {error && <div className={styles.error} role="alert">{error}</div>}{success && <div className={local.success} role="status">{success}</div>}
    <div className={local.layout}><div className={local.main}>
      <Section title="Hero content"><Field label="Hero title" required><input maxLength={180} onChange={(e) => heroField("title", e.target.value)} required value={settings.hero.title} /></Field><Field hint="Line breaks are preserved in the live hero." label="Hero subtitle"><textarea maxLength={1000} onChange={(e) => heroField("subtitle", e.target.value)} rows={4} value={settings.hero.subtitle} /></Field></Section>
      <Section title="Call to action"><div className={styles.twoColumns}><Field label="CTA text"><input maxLength={80} onChange={(e) => heroField("ctaText", e.target.value)} value={settings.hero.ctaText} /></Field><Field hint="Accepts #anchor, /path, or http(s) URL." label="CTA link"><input maxLength={2048} onChange={(e) => heroField("ctaUrl", e.target.value)} value={settings.hero.ctaUrl} /></Field></div></Section>
      <Section title="Contact"><Field label="Contact email" required><input maxLength={320} onChange={(e) => heroField("contactEmail", e.target.value)} required type="email" value={settings.hero.contactEmail} /></Field></Section>
      <Section title="Statistics"><div className={local.stats}>{settings.hero.stats.map((stat, index) => <div className={local.stat} key={index}><h3>Stat {index + 1}</h3><Field label="Value" required><input maxLength={40} onChange={(e) => statField(index, "value", e.target.value)} required value={stat.value} /></Field><Field hint="Line breaks are preserved." label="Label" required><textarea maxLength={120} onChange={(e) => statField(index, "label", e.target.value)} required rows={2} value={stat.label} /></Field></div>)}</div></Section>
    </div><aside className={local.sidebar}><section className={styles.formSection}><h2>Changes</h2><div><p className={local.help}>Saved content is immediately available through the public settings API. The homepage retains its built-in defaults if that API is unavailable.</p><button className={styles.secondaryButton} disabled={saving} onClick={() => { setSettings(clone(saved)); setError(""); setSuccess(""); }} type="button">Reset unsaved changes</button><button className={styles.primaryButton} disabled={saving} type="submit">{saving ? "Saving…" : "Save changes"}</button></div></section></aside></div>
  </form>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className={styles.formSection}><h2>{title}</h2><div>{children}</div></section>; }
function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) { return <label className={styles.field}><span>{label}{required && " *"}</span>{children}{hint && <small>{hint}</small>}</label>; }
