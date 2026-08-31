import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  FolderKanban,
  MessageSquareQuote,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import DashboardStatCard from "@/components/admin/ui/dashboard-stat-card";
import styles from "@/components/admin/ui/dashboard.module.css";

const stats = [
  { label: "Total Projects", value: 0, icon: FolderKanban },
  { label: "Published Projects", value: 0, icon: FolderKanban },
  { label: "Testimonials", value: 0, icon: MessageSquareQuote },
  { label: "New Leads", value: 0, icon: Users },
];

const quickActions = [
  { label: "Add Project", href: "/admin/projects/new", icon: Plus },
  { label: "Add Testimonial", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "View Leads", href: "/admin/leads", icon: Users },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminDashboardPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Dashboard overview</p>
          <h1>Welcome to Huipper Admin</h1>
          <p>The workspace foundation is ready. Dashboard values remain mocked until the data layer is connected.</p>
        </div>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          Foundation ready
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <DashboardStatCard {...stat} key={stat.label} />
        ))}
      </div>

      <div className={styles.lowerGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Recent Activity</h2>
            <span>Temporary</span>
          </div>
          <div className={styles.emptyState}>
            <div>
              <Clock3 size={24} />
              <p>No activity yet</p>
              <small>CMS activity will appear here after database integration.</small>
            </div>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Quick Actions</h2>
            <span>Planned tools</span>
          </div>
          <div className={styles.actions}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link className={styles.action} href={action.href} key={action.href}>
                  <Icon size={17} />
                  <span>{action.label}</span>
                  <ArrowRight size={14} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
