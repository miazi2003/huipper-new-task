"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { deleteAdminProject, listAdminProjects, type Project } from "@/lib/api/projects";
import styles from "./projects.module.css";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<Project | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listAdminProjects({ search, status, featured, page });
      setProjects(result.projects);
      setPages(Math.max(result.pagination.pages, 1));
      setTotal(result.pagination.total);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Projects could not be loaded");
    } finally {
      setLoading(false);
    }
  }, [featured, page, search, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function confirmDelete() {
    if (!deleting) return;
    try {
      await deleteAdminProject(deleting.id);
      setDeleting(null);
      await load();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Project could not be deleted");
      setDeleting(null);
    }
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <div><p className={styles.eyebrow}>Content</p><h1>Projects</h1><p>Manage portfolio projects and public case studies.</p></div>
        <Link className={styles.primaryButton} href="/admin/projects/new"><Plus size={16} /> New project</Link>
      </header>

      <section className={styles.panel}>
        <div className={styles.filters}>
          <label className={styles.search}><Search size={15} /><input aria-label="Search projects" onChange={(event) => { setPage(1); setSearch(event.target.value); }} placeholder="Search title, client, industry…" value={search} /></label>
          <select aria-label="Filter by status" onChange={(event) => { setPage(1); setStatus(event.target.value); }} value={status}><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select>
          <select aria-label="Filter featured projects" onChange={(event) => { setPage(1); setFeatured(event.target.value); }} value={featured}><option value="">All projects</option><option value="true">Featured</option><option value="false">Not featured</option></select>
          <span className={styles.total}>{total} total</span>
        </div>

        {error && <div className={styles.error} role="alert">{error}<button onClick={() => void load()} type="button">Try again</button></div>}
        {loading ? <div className={styles.state}>Loading projects…</div> : projects.length === 0 ? (
          <div className={styles.state}><strong>No projects found</strong><span>Create a project or adjust the current filters.</span></div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}><thead><tr><th>Project</th><th>Status</th><th>Featured</th><th>Order</th><th>Updated</th><th><span className={styles.srOnly}>Actions</span></th></tr></thead>
              <tbody>{projects.map((project) => <tr key={project.id}><td><strong>{project.title}</strong><small>{project.slug}</small></td><td><span className={`${styles.badge} ${project.status === "published" ? styles.published : ""}`}>{project.status}</span></td><td>{project.featured ? "Yes" : "—"}</td><td>{project.order}</td><td>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(project.updatedAt))}</td><td><div className={styles.rowActions}><Link aria-label={`Edit ${project.title}`} href={`/admin/projects/${project.id}/edit`}><Edit3 size={15} /></Link><button aria-label={`Delete ${project.title}`} onClick={() => setDeleting(project)} type="button"><Trash2 size={15} /></button></div></td></tr>)}</tbody>
            </table>
          </div>
        )}
        <div className={styles.pagination}><button disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)} type="button">Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages || loading} onClick={() => setPage((value) => value + 1)} type="button">Next</button></div>
      </section>

      {deleting && <div className={styles.modalBackdrop} role="presentation"><div aria-labelledby="delete-title" aria-modal="true" className={styles.modal} role="dialog"><h2 id="delete-title">Delete project?</h2><p>“{deleting.title}” will be permanently removed. This cannot be undone.</p><div><button className={styles.secondaryButton} onClick={() => setDeleting(null)} type="button">Cancel</button><button className={styles.dangerButton} onClick={() => void confirmDelete()} type="button">Delete project</button></div></div></div>}
    </div>
  );
}
