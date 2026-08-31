import { notFound } from "next/navigation";
import { Construction } from "lucide-react";
import styles from "@/components/admin/ui/dashboard.module.css";

const plannedSections: Record<string, { title: string; description: string }> = {
  projects: { title: "Projects", description: "Project and case study management will be implemented in the next CMS phase." },
  services: { title: "Services", description: "Service management is planned but is not connected in this foundation phase." },
  testimonials: { title: "Testimonials", description: "Testimonial management will be added in a later implementation step." },
  process: { title: "Process", description: "Workflow step management is reserved for the future CMS." },
  impact: { title: "Impact", description: "Impact statistics will be managed here once the data layer is connected." },
  leads: { title: "Leads", description: "Contact lead management will be implemented after authentication and database setup." },
  media: { title: "Media", description: "Media uploads and the asset library are not part of this foundation phase." },
  seo: { title: "SEO", description: "Page metadata editing will be added in a dedicated future phase." },
  settings: { title: "Settings", description: "Site-wide settings will be connected after the core CMS models are defined." },
};

export function generateStaticParams() {
  return Object.keys(plannedSections).map((section) => ({ section }));
}

export default async function PlannedAdminSection({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const content = plannedSections[section];

  if (!content) {
    notFound();
  }

  return (
    <div className={styles.placeholder}>
      <div>
        <Construction size={32} />
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </div>
    </div>
  );
}
