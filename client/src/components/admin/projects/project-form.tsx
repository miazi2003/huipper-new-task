"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { createAdminProject, getAdminProject, updateAdminProject, type ProjectInput, type ProjectStatus } from "@/lib/api/projects";
import { useRouter } from "next/navigation";
import styles from "./projects.module.css";

const emptyProject: ProjectInput = {
  title: "", slug: "", shortDescription: "", description: "", clientName: "", industry: "", category: "",
  services: [], technologies: [], thumbnailUrl: "", coverImageUrl: "", galleryUrls: [], projectUrl: "", caseStudyUrl: "",
  status: "draft", featured: false, order: 0, metrics: [], seo: { title: "", description: "", imageUrl: "" },
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

type Props = { projectId?: string };

export default function ProjectForm({ projectId }: Props) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectInput>(emptyProject);
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(Boolean(projectId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) return;
    void getAdminProject(projectId).then((result) => {
      setProject({
        title: result.title, slug: result.slug, shortDescription: result.shortDescription, description: result.description,
        clientName: result.clientName, industry: result.industry, category: result.category, services: result.services,
        technologies: result.technologies, thumbnailUrl: result.thumbnailUrl, coverImageUrl: result.coverImageUrl,
        galleryUrls: result.galleryUrls, projectUrl: result.projectUrl, caseStudyUrl: result.caseStudyUrl,
        status: result.status, featured: result.featured, order: result.order, metrics: result.metrics, seo: result.seo,
      });
      setSlugEdited(true);
    }).catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Project could not be loaded")).finally(() => setLoading(false));
  }, [projectId]);

  function setField<K extends keyof ProjectInput>(field: K, value: ProjectInput[K]) {
    setProject((current) => ({ ...current, [field]: value }));
  }

  function changeTitle(value: string) {
    setProject((current) => ({ ...current, title: value, slug: slugEdited ? current.slug : slugify(value) }));
  }

  async function submit(event: FormEvent, status: ProjectStatus) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...project, status };
      if (projectId) await updateAdminProject(projectId, payload);
      else await createAdminProject(payload);
      router.push("/admin/projects");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Project could not be saved");
      setSaving(false);
    }
  }

  if (loading) return <div className={styles.state}>Loading project…</div>;

  return (
    <form onSubmit={(event) => void submit(event, project.status)}>
      <header className={styles.pageHeader}>
        <div><Link className={styles.backLink} href="/admin/projects"><ArrowLeft size={14} /> Projects</Link><h1>{projectId ? "Edit project" : "New project"}</h1><p>Build the portfolio record, then save it privately or publish it.</p></div>
      </header>
      {error && <div className={styles.error} role="alert">{error}</div>}

      <div className={styles.formLayout}>
        <div className={styles.formMain}>
          <FormSection title="Project details">
            <div className={styles.twoColumns}><Field label="Title" required><input maxLength={160} onChange={(e) => changeTitle(e.target.value)} required value={project.title} /></Field><Field hint="Lowercase letters, numbers and hyphens." label="Slug" required><input maxLength={180} onChange={(e) => { setSlugEdited(true); setField("slug", slugify(e.target.value)); }} required value={project.slug} /></Field></div>
            <Field label="Short description"><textarea maxLength={320} onChange={(e) => setField("shortDescription", e.target.value)} rows={3} value={project.shortDescription} /></Field>
            <Field label="Full description"><textarea maxLength={20000} onChange={(e) => setField("description", e.target.value)} rows={8} value={project.description} /></Field>
            <div className={styles.threeColumns}><Field label="Client"><input onChange={(e) => setField("clientName", e.target.value)} value={project.clientName} /></Field><Field label="Industry"><input onChange={(e) => setField("industry", e.target.value)} value={project.industry} /></Field><Field label="Category"><input onChange={(e) => setField("category", e.target.value)} value={project.category} /></Field></div>
            <div className={styles.twoColumns}><Field hint="Separate values with commas." label="Services"><input onChange={(e) => setField("services", splitList(e.target.value))} value={project.services.join(", ")} /></Field><Field hint="Separate values with commas." label="Technologies"><input onChange={(e) => setField("technologies", splitList(e.target.value))} value={project.technologies.join(", ")} /></Field></div>
          </FormSection>

          <FormSection title="Media and links">
            <div className={styles.twoColumns}><Field label="Thumbnail URL"><input onChange={(e) => setField("thumbnailUrl", e.target.value)} placeholder="https://… or /images/…" value={project.thumbnailUrl} /></Field><Field label="Cover image URL"><input onChange={(e) => setField("coverImageUrl", e.target.value)} placeholder="https://… or /images/…" value={project.coverImageUrl} /></Field></div>
            <ArrayEditor label="Gallery images" onChange={(galleryUrls) => setField("galleryUrls", galleryUrls)} placeholder="Image URL" values={project.galleryUrls} />
            <div className={styles.twoColumns}><Field label="Live project URL"><input onChange={(e) => setField("projectUrl", e.target.value)} value={project.projectUrl} /></Field><Field label="Case study URL"><input onChange={(e) => setField("caseStudyUrl", e.target.value)} value={project.caseStudyUrl} /></Field></div>
          </FormSection>

          <FormSection title="Project metrics">
            <div className={styles.repeaters}>{project.metrics.map((metric, index) => <div className={styles.metricRow} key={index}><input aria-label={`Metric ${index + 1} label`} onChange={(e) => setField("metrics", project.metrics.map((item, itemIndex) => itemIndex === index ? { ...item, label: e.target.value } : item))} placeholder="Label (e.g. Conversion)" value={metric.label} /><input aria-label={`Metric ${index + 1} value`} onChange={(e) => setField("metrics", project.metrics.map((item, itemIndex) => itemIndex === index ? { ...item, value: e.target.value } : item))} placeholder="Value (e.g. +64%)" value={metric.value} /><button aria-label={`Remove metric ${index + 1}`} onClick={() => setField("metrics", project.metrics.filter((_, itemIndex) => itemIndex !== index))} type="button"><Trash2 size={15} /></button></div>)}</div>
            <button className={styles.addButton} onClick={() => setField("metrics", [...project.metrics, { label: "", value: "" }])} type="button"><Plus size={14} /> Add metric</button>
          </FormSection>

          <FormSection title="SEO">
            <Field label="SEO title"><input maxLength={70} onChange={(e) => setField("seo", { ...project.seo, title: e.target.value })} value={project.seo.title} /></Field>
            <Field label="SEO description"><textarea maxLength={180} onChange={(e) => setField("seo", { ...project.seo, description: e.target.value })} rows={3} value={project.seo.description} /></Field>
            <Field label="Social image URL"><input onChange={(e) => setField("seo", { ...project.seo, imageUrl: e.target.value })} value={project.seo.imageUrl} /></Field>
          </FormSection>
        </div>

        <aside className={styles.formSidebar}>
          <FormSection title="Publishing">
            <Field label="Order"><input min={-100000} max={100000} onChange={(e) => setField("order", Number(e.target.value))} type="number" value={project.order} /></Field>
            <label className={styles.checkbox}><input checked={project.featured} onChange={(e) => setField("featured", e.target.checked)} type="checkbox" /><span><strong>Featured project</strong><small>Prioritize this project in curated views.</small></span></label>
            <div className={styles.saveActions}><button className={styles.secondaryButton} disabled={saving} onClick={(event) => void submit(event, "draft")} type="button">Save draft</button><button className={styles.primaryButton} disabled={saving} onClick={(event) => void submit(event, "published")} type="button">{saving ? "Saving…" : "Publish"}</button></div>
          </FormSection>
        </aside>
      </div>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className={styles.formSection}><h2>{title}</h2><div>{children}</div></section>;
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return <label className={styles.field}><span>{label}{required && " *"}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function ArrayEditor({ label, values, onChange, placeholder }: { label: string; values: string[]; onChange: (values: string[]) => void; placeholder: string }) {
  return <div className={styles.field}><span>{label}</span><div className={styles.repeaters}>{values.map((value, index) => <div className={styles.arrayRow} key={index}><input aria-label={`${label} ${index + 1}`} onChange={(e) => onChange(values.map((item, itemIndex) => itemIndex === index ? e.target.value : item))} placeholder={placeholder} value={value} /><button aria-label={`Remove ${label} ${index + 1}`} onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))} type="button"><Trash2 size={15} /></button></div>)}</div><button className={styles.addButton} onClick={() => onChange([...values, ""])} type="button"><Plus size={14} /> Add image</button></div>;
}
