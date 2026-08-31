import { Router } from "express";
import { getCurrentAdmin } from "../auth/current-admin.js";
import { verifyPassword } from "../auth/password.js";
import { clearAdminSession, setAdminSession } from "../auth/session.js";
import { isValidEmail, isValidLoginPassword, normalizeEmail } from "../auth/validation.js";
import { ConfigurationError } from "../config/environment.js";
import { getDb } from "../db/client.js";
import { clearLoginRateLimit, loginRateLimit } from "../middleware/login-rate-limit.js";
import { requireTrustedOrigin } from "../middleware/trusted-origin.js";

const INVALID_CREDENTIALS = "Invalid email or password";
const DUMMY_PASSWORD_HASH = "$2b$12$OoDI.xvmyq7zFwDR7wuGjOD4QzCFOehSDzv803elxPTVkrGUn1Wna";

export const adminAuthRouter = Router();

adminAuthRouter.post("/login", requireTrustedOrigin, loginRateLimit, async (request, response) => {
  const body = request.body as { email?: unknown; password?: unknown } | undefined;
  const emailValue = body?.email;
  const password = body?.password;

  if (typeof emailValue !== "string" || typeof password !== "string") {
    response.status(400).json({ error: "Email and password are required" });
    return;
  }

  const email = normalizeEmail(emailValue);
  if (!isValidEmail(email) || !isValidLoginPassword(password)) {
    response.status(401).json({ error: INVALID_CREDENTIALS });
    return;
  }

  try {
    const admin = await getDb().admin.findUnique({ where: { email } });
    const passwordMatches = await verifyPassword(password, admin?.passwordHash ?? DUMMY_PASSWORD_HASH);

    if (!admin || !passwordMatches) {
      response.status(401).json({ error: INVALID_CREDENTIALS });
      return;
    }

    await setAdminSession(response, admin.id);
    clearLoginRateLimit(request);
    response.json({ admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    if (error instanceof ConfigurationError) {
      console.error("[admin-auth] Configuration incomplete:", error.message);
      response.status(503).json({ error: "Authentication service is not configured" });
      return;
    }

    console.error("[admin-auth] Login service unavailable:", error instanceof Error ? error.message : "Unknown error");
    response.status(503).json({ error: "Authentication service is temporarily unavailable" });
  }
});

adminAuthRouter.post("/logout", requireTrustedOrigin, (request, response) => {
  clearAdminSession(response);
  response.json({ success: true });
});

adminAuthRouter.get("/session", async (request, response) => {
  try {
    const admin = await getCurrentAdmin(request);
    if (!admin) {
      response.status(401).json({ error: "Unauthenticated" });
      return;
    }
    response.json({ admin });
  } catch (error) {
    console.error("[admin-auth] Session service unavailable:", error instanceof Error ? error.message : "Unknown error");
    response.status(503).json({ error: "Authentication service is temporarily unavailable" });
  }
});
