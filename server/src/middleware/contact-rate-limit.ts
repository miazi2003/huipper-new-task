import type { NextFunction, Request, Response } from "express";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS = 8;
const submissions = new Map<string, { count: number; resetAt: number }>();

export function contactRateLimit(request: Request, response: Response, next: NextFunction) {
  const now = Date.now();
  if (submissions.size > 1_000) for (const [key, value] of submissions) if (value.resetAt <= now) submissions.delete(key);
  const key = request.ip || "unknown"; const current = submissions.get(key);
  if (!current || current.resetAt <= now) { submissions.set(key, { count: 1, resetAt: now + WINDOW_MS }); next(); return; }
  if (current.count >= MAX_SUBMISSIONS) {
    response.setHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000));
    response.status(429).json({ success: false, error: "Too many messages. Please try again later." }); return;
  }
  current.count += 1; next();
}
