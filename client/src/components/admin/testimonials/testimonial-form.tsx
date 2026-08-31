"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { listAdminProjects, type Project } from "@/lib/api/projects";
import { createAdminTestimonial, getAdminTestimonial, TestimonialApiError, updateAdminTestimonial, type TestimonialInput, type TestimonialStatus, type TestimonialType } from "@/lib/api/testimonials";
import styles from "@/components/admin/projects/projects.module.css";
import local from "./testimonials.module.css";

const emptyTestimonial: TestimonialInput = { name: "", role: "", company: "", quote: "", avatar: "", companyLogo: "", rating: null, type: "text", videoUrl: "", videoPoster: "", featured: false, status: "draft", order: 0, projectId: null };

export default function TestimonialForm({ testimonialId }: { testimonialId?: string }) {
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<TestimonialInput>(emptyTestimonial);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(Boolean(testimonialId)); const [saving, setSaving] = useState(false);
  const [error, setError] = useState(""); const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    void listAdminProjects({ limit: 100 }).then((result) => setProjects(result.projects)).catch(() => undefined);
    if (!testimonialId) return;
    void getAdminTestimonial(testimonialId).then((result) => setTestimonial({ name: result.name, role: result.role, company: result.company, quote: result.quote, avatar: result.avatar, companyLogo: result.companyLogo, rating: result.rating, type: result.type, videoUrl: result.videoUrl, videoPoster: result.videoPoster, featured: result.featured, status: result.status, order: result.order, projectId: result.projectId })).catch((loadError) => {
      if (loadError instanceof TestimonialApiError && loadError.status === 404) setNotFound(true);
      setError(loadError instanceof Error ? loadError.message : "Testimonial could not be loaded");
    }).finally(() => setLoading(false));
  }, [testimonialId]);

  function setField<K extends keyof TestimonialInput>(field: K, value: TestimonialInput[K]) { setTestimonial((current) => ({ ...current, [field]: value })); }
  function setType(type: TestimonialType) { setTestimonial((current) => ({ ...current, type, ...(type === "text" ? { videoUrl: "", videoPoster: "" } : {}) })); }
  async function submit(event: FormEvent, status: TestimonialStatus) {
    event.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...testimonial, status };
      if (testimonialId) await updateAdminTestimonial(testimonialId, payload); else await createAdminTestimonial(payload);
      router.push("/admin/testimonials"); router.refresh();
    } catch (saveError) {
      if (saveError instanceof TestimonialApiError && saveError.details?.length) setError(saveError.details.map((detail) => `${detail.field}: ${detail.message}`).join(" · "));
      else setError(saveError instanceof Error ? saveError.message : "Testimonial could not be saved");
      setSaving(false);
    }
  }

  if (loading) return <div className={styles.state}>Loading testimonial…</div>;
  if (notFound) return <div className={styles.state}><div><strong>Testimonial not found</strong><span>The record may have been deleted.</span><Link className={styles.primaryButton} href="/admin/testimonials">Back to testimonials</Link></div></div>;

  return <form onSubmit={(event) => void submit(event, testimonial.status)}>
    <header className={styles.pageHeader}><div><Link className={styles.backLink} href="/admin/testimonials"><ArrowLeft size={14} /> Testimonials</Link><h1>{testimonialId ? "Edit testimonial" : "New testimonial"}</h1><p>Create a written recommendation or video success story.</p></div></header>
    {error && <div className={styles.error} role="alert">{error}</div>}
    <div className={styles.formLayout}><div className={styles.formMain}>
      <Section title="Basic details"><div className={styles.twoColumns}><Field label="Name" required><input maxLength={160} onChange={(e) => setField("name", e.target.value)} required value={testimonial.name} /></Field><Field label="Company"><input maxLength={160} onChange={(e) => setField("company", e.target.value)} value={testimonial.company} /></Field></div><Field label="Role / title"><input maxLength={160} onChange={(e) => setField("role", e.target.value)} value={testimonial.role} /></Field><Field label={testimonial.type === "text" ? "Quote *" : "Quote (optional)"}><textarea maxLength={5000} onChange={(e) => setField("quote", e.target.value)} required={testimonial.type === "text"} rows={7} value={testimonial.quote} /></Field></Section>
      <Section title="Media"><div className={styles.twoColumns}><Field label="Avatar URL"><input onChange={(e) => setField("avatar", e.target.value)} placeholder="https://… or /images/…" value={testimonial.avatar} /></Field><Field label="Company logo URL"><input onChange={(e) => setField("companyLogo", e.target.value)} value={testimonial.companyLogo} /></Field></div>{testimonial.type === "video" && <div className={styles.twoColumns}><Field label="Video URL" required><input onChange={(e) => setField("videoUrl", e.target.value)} required value={testimonial.videoUrl} /></Field><Field label="Video poster URL"><input onChange={(e) => setField("videoPoster", e.target.value)} value={testimonial.videoPoster} /></Field></div>}</Section>
      <Section title="Relationship"><Field hint="Optional. Testimonials remain independent if no project is selected." label="Related project"><select className={local.rating} onChange={(e) => setField("projectId", e.target.value || null)} value={testimonial.projectId ?? ""}><option value="">No related project</option>{testimonial.projectId && !projects.some((project) => project.id === testimonial.projectId) && <option value={testimonial.projectId}>Current project</option>}{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select></Field></Section>
    </div><aside className={styles.formSidebar}><Section title="Format and publishing"><Field label="Testimonial type"><div className={local.typeOptions}><label className={local.typeOption}><input checked={testimonial.type === "text"} name="type" onChange={() => setType("text")} type="radio" /> Text</label><label className={local.typeOption}><input checked={testimonial.type === "video"} name="type" onChange={() => setType("video")} type="radio" /> Video</label></div></Field><Field label="Rating"><select className={local.rating} onChange={(e) => setField("rating", e.target.value ? Number(e.target.value) : null)} value={testimonial.rating ?? ""}><option value="">No rating</option>{[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating} star{rating === 1 ? "" : "s"}</option>)}</select></Field><Field label="Order"><input max={100000} min={-100000} onChange={(e) => setField("order", Number(e.target.value))} type="number" value={testimonial.order} /></Field><label className={styles.checkbox}><input checked={testimonial.featured} onChange={(e) => setField("featured", e.target.checked)} type="checkbox" /><span><strong>Featured testimonial</strong><small>Prioritize this testimonial in curated API results.</small></span></label><div className={styles.saveActions}><button className={styles.secondaryButton} disabled={saving} onClick={(event) => void submit(event, "draft")} type="button">Save draft</button><button className={styles.primaryButton} disabled={saving} onClick={(event) => void submit(event, "published")} type="button">{saving ? "Saving…" : "Publish"}</button></div><Link className={local.cancel} href="/admin/testimonials">Cancel</Link></Section></aside></div>
  </form>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className={styles.formSection}><h2>{title}</h2><div>{children}</div></section>; }
function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) { return <label className={styles.field}><span>{label}{required && " *"}</span>{children}{hint && <small>{hint}</small>}</label>; }
