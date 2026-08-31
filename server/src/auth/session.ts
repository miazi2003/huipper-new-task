import type { Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import { requireSessionSecret } from "../config/environment.js";

export const ADMIN_SESSION_COOKIE = "huipper_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const SESSION_ALGORITHM = "HS256";
const SESSION_AUDIENCE = "huipper-admin";
const SESSION_ISSUER = "huipper";

function signingKey() {
  return new TextEncoder().encode(requireSessionSecret());
}

export async function createSessionToken(adminId: string) {
  return new SignJWT({ type: "admin" })
    .setProtectedHeader({ alg: SESSION_ALGORITHM })
    .setSubject(adminId)
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(signingKey());
}

export async function setAdminSession(response: Response, adminId: string) {
  const token = await createSessionToken(adminId);
  response.cookie(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS * 1000,
    priority: "high",
  });
}

export function clearAdminSession(response: Response) {
  response.clearCookie(ADMIN_SESSION_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getAdminIdFromSession(request: Request) {
  const token = request.cookies?.[ADMIN_SESSION_COOKIE];
  if (typeof token !== "string" || !token) return null;

  const key = signingKey();

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: [SESSION_ALGORITHM],
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });

    return payload.type === "admin" && typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
