"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { deleteAdminTestimonial, listAdminTestimonials, type Testimonial } from "@/lib/api/testimonials";
import styles from "@/components/admin/projects/projects.module.css";
import local from "./testimonials.module.css";

function initials(name: string) { return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }

export default function TestimonialList() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState(""); const [status, setStatus] = useState(""); const [type, setType] = useState("");
  const [page, setPage] = useState(1); const [pages, setPages] = useState(1); const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  const [deleting, setDeleting] = useState<Testimonial | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const result = await listAdminTestimonials({ search, status, type, page });
      setItems(result.testimonials); setPages(Math.max(result.pagination.pages, 1)); setTotal(result.pagination.total);
    } catch (loadError) { setError(loadError instanceof Error ? loadError.message : "Testimonials could not be loaded"); }
    finally { setLoading(false); }
  }, [page, search, status, type]);

  useEffect(() => { const timer = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(timer); }, [load]);
  async function confirmDelete() {
    if (!deleting) return;
    try { await deleteAdminTestimonial(deleting.id); setSuccess(`“${deleting.name}” was deleted.`); setDeleting(null); await load(); }
    catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : "Testimonial could not be deleted"); setDeleting(null); }
  }

  return <div>
    <header className={styles.pageHeader}><div><p className={styles.eyebrow}>Content</p><h1>Testimonials</h1><p>Manage written testimonials and video success stories.</p></div><Link className={styles.primaryButton} href="/admin/testimonials/new"><Plus size={16} /> Add testimonial</Link></header>
    {success && <div className={local.success} role="status">{success}<button onClick={() => setSuccess("")} type="button">Dismiss</button></div>}
    <section className={styles.panel}>
      <div className={styles.filters}><label className={styles.search}><Search size={15} /><input aria-label="Search testimonials" onChange={(e) => { setPage(1); setSearch(e.target.value); }} placeholder="Search name, company, role…" value={search} /></label><select aria-label="Filter by status" onChange={(e) => { setPage(1); setStatus(e.target.value); }} value={status}><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select><select aria-label="Filter by type" onChange={(e) => { setPage(1); setType(e.target.value); }} value={type}><option value="">All types</option><option value="text">Text</option><option value="video">Video</option></select><span className={styles.total}>{total} total</span></div>
      {error && <div className={styles.error} role="alert">{error}<button onClick={() => void load()} type="button">Try again</button></div>}
      {loading ? <div className={styles.state}>Loading testimonials…</div> : items.length === 0 ? <div className={styles.state}><strong>No testimonials found</strong><span>Add a testimonial or adjust the filters.</span></div> : <div className={styles.tableWrap}><table className={`${styles.table} ${local.table}`}><thead><tr><th>Person</th><th>Type</th><th>Status</th><th>Featured</th><th>Order</th><th>Updated</th><th><span className={styles.srOnly}>Actions</span></th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><div className={local.person}>{item.avatar ? <Image alt="" height={36} src={item.avatar} unoptimized width={36} /> : <span>{initials(item.name)}</span>}<div><strong>{item.name}</strong><small>{[item.role, item.company].filter(Boolean).join(" · ") || "No role or company"}</small></div></div></td><td><span className={styles.badge}>{item.type}</span></td><td><span className={`${styles.badge} ${item.status === "published" ? styles.published : ""}`}>{item.status}</span></td><td>{item.featured ? "Yes" : "—"}</td><td>{item.order}</td><td>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(item.updatedAt))}</td><td><div className={styles.rowActions}><Link aria-label={`Edit ${item.name}`} href={`/admin/testimonials/${item.id}/edit`}><Edit3 size={15} /></Link><button aria-label={`Delete ${item.name}`} onClick={() => setDeleting(item)} type="button"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>}
      <div className={styles.pagination}><button disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)} type="button">Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages || loading} onClick={() => setPage((value) => value + 1)} type="button">Next</button></div>
    </section>
    {deleting && <div className={styles.modalBackdrop} role="presentation"><div aria-labelledby="delete-testimonial-title" aria-modal="true" className={styles.modal} role="dialog"><h2 id="delete-testimonial-title">Delete testimonial?</h2><p>“{deleting.name}” will be permanently removed. This cannot be undone.</p><div><button className={styles.secondaryButton} onClick={() => setDeleting(null)} type="button">Cancel</button><button className={styles.dangerButton} onClick={() => void confirmDelete()} type="button">Delete testimonial</button></div></div></div>}
  </div>;
}
