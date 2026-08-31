import type { Metadata } from "next";
import AdminNavigation from "@/client/admin/layout/admin-navigation";
import styles from "@/client/admin/layout/admin-shell.module.css";

export const metadata: Metadata = {
  title: "Admin | Huipper",
  description: "Huipper administration workspace",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.shell}>
      <AdminNavigation />
      <main className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </main>
    </div>
  );
}
