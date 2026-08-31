"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import styles from "@/app/admin/login/login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Unable to sign in. Please try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to reach the authentication server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="admin@huipper.com" required disabled={isSubmitting} />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required disabled={isSubmitting} />
      </div>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
