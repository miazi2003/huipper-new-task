import type { NextFunction, Request, Response } from "express";
import { getCurrentAdmin } from "../auth/current-admin.js";

export async function requireAdmin(request: Request, response: Response, next: NextFunction) {
  try {
    const admin = await getCurrentAdmin(request);

    if (!admin) {
      response.status(401).json({ success: false, error: "Unauthenticated" });
      return;
    }

    response.locals.admin = admin;
    next();
  } catch (error) {
    console.error("[admin-auth] Authorization service unavailable:", error instanceof Error ? error.message : "Unknown error");
    response.status(503).json({ success: false, error: "Authentication service is temporarily unavailable" });
  }
}
