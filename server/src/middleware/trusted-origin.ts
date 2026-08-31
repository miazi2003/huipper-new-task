import type { NextFunction, Request, Response } from "express";
import { isTrustedOrigin } from "../config/environment.js";

export function requireTrustedOrigin(request: Request, response: Response, next: NextFunction) {
  const origin = request.get("origin");

  if (origin && !isTrustedOrigin(origin)) {
    response.status(403).json({ success: false, error: "Forbidden" });
    return;
  }

  next();
}

