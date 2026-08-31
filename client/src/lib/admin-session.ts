import "server-only";

import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "huipper_admin_session";

export type SafeAdmin = {
  id: string;
  name: string;
  email: string;
  role: "admin";
};

export async function getCurrentAdmin(): Promise<SafeAdmin | null> {
  const sessionCookie = (await cookies()).get(ADMIN_SESSION_COOKIE);

  if (!sessionCookie) {
    return null;
  }

  const serverApiUrl = process.env.SERVER_API_URL ?? "http://127.0.0.1:4000";

  try {
    const response = await fetch(`${serverApiUrl}/api/admin/auth/session`, {
      headers: { cookie: `${sessionCookie.name}=${sessionCookie.value}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as { admin?: SafeAdmin };
    return result.admin ?? null;
  } catch (error) {
    console.error("[admin-auth] Unable to reach the authentication server.", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}
