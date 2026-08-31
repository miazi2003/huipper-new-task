import type { LucideIcon } from "lucide-react";
import styles from "./dashboard.module.css";

type DashboardStatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
};

export default function DashboardStatCard({ label, value, icon: Icon }: DashboardStatCardProps) {
  return (
    <article className={styles.statCard}>
      <div className={styles.statIcon}>
        <Icon size={19} strokeWidth={1.8} />
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>Temporary value</span>
    </article>
  );
}
