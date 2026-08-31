import type { Metadata } from "next";
import Image from "next/image";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Admin Sign In | Huipper",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
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

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="admin@huipper.com" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
          </div>
          <button className={styles.submit} type="submit" disabled aria-describedby="auth-notice">
            Sign In
          </button>
        </form>

        <p className={styles.notice} id="auth-notice">
          Authentication is intentionally disabled until the secure server-side auth flow is connected.
        </p>
      </div>
    </main>
  );
}
