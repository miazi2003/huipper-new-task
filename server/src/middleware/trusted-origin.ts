import type { NextFunction, Request, Response } from "express";
import { getClientOrigin } from "../config/environment.js";

export function requireTrustedOrigin(request: Request, response: Response, next: NextFunction) {
  const origin = request.get("origin");

  if (origin && origin !== getClientOrigin()) {
    response.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}
