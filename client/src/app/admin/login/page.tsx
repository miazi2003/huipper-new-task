import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/auth/login-form";
import { getCurrentAdmin } from "@/lib/admin-session";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Admin Sign In | Huipper",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <Image src="/images/brand/huipper-mark-clean.png" alt="" width={28} height={28} priority />
          </span>
          <div>
            <strong>Huipper</strong>
            <span>Admin workspace</span>
          </div>
        </div>

        <h1>Sign in</h1>
        <p className={styles.intro}>Use your admin account to access the Huipper content workspace.</p>

        <LoginForm />

        <p className={styles.notice}>Access is restricted to authorized Huipper administrators.</p>
      </div>
    </main>
  );
}
