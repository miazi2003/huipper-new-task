import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminNavigation from "@/components/admin/layout/admin-navigation";
import styles from "@/components/admin/layout/admin-shell.module.css";
import { getCurrentAdmin } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Admin | Huipper",
  description: "Huipper administration workspace",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.shell}>
      <AdminNavigation admin={admin} />
      <main className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </main>
    </div>
  );
}
