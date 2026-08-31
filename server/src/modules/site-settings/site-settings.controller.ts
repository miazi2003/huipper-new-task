import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ConfigurationError } from "../../config/environment.js";
import { getSiteSettings, updateSiteSettings } from "./site-settings.service.js";
import { updateSiteSettingsSchema } from "./site-settings.validation.js";

function handle(error: unknown, response: Response, next: NextFunction) {
  if (error instanceof ZodError) {
    response.status(400).json({ success: false, error: "Validation failed", details: error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })) }); return;
  }
  if (error instanceof ConfigurationError || (error instanceof Error && error.name.includes("MongooseServerSelection"))) {
    console.error("[site-settings] Database unavailable:", error.message);
    response.status(503).json({ success: false, error: "Site settings service is temporarily unavailable" }); return;
  }
  if (error instanceof Error && error.name === "ValidationError") { response.status(400).json({ success: false, error: "Validation failed" }); return; }
  next(error);
}
export async function readSiteSettings(_request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await getSiteSettings() }); } catch (error) { handle(error, response, next); }
}
export async function patchSiteSettings(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await updateSiteSettings(updateSiteSettingsSchema.parse(request.body)) }); } catch (error) { handle(error, response, next); }
}
