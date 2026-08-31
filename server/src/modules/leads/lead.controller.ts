import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { ConfigurationError } from "../../config/environment.js";
import { createLead, deleteLead, getLeadById, LeadNotFoundError, listLeads, updateLead } from "./lead.service.js";
import { createLeadSchema, leadListQuerySchema, updateLeadSchema } from "./lead.validation.js";

function parse<T>(schema: ZodType<T>, value: unknown): T { return schema.parse(value); }
function parameter(value: string | string[] | undefined) { return typeof value === "string" ? value : ""; }
function handle(error: unknown, response: Response, next: NextFunction) {
  if (error instanceof ZodError) { response.status(400).json({ success: false, error: "Validation failed", details: error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })) }); return; }
  if (error instanceof LeadNotFoundError) { response.status(404).json({ success: false, error: error.message }); return; }
  if (error instanceof ConfigurationError || (error instanceof Error && error.name.includes("MongooseServerSelection"))) { console.error("[leads] Database unavailable:", error.message); response.status(503).json({ success: false, error: "Contact service is temporarily unavailable" }); return; }
  if (error instanceof Error && error.name === "ValidationError") { response.status(400).json({ success: false, error: "Validation failed" }); return; }
  next(error);
}
export async function submitContact(request: Request, response: Response, next: NextFunction) {
  try { await createLead(parse(createLeadSchema, request.body)); response.status(201).json({ success: true, message: "Message received successfully" }); } catch (error) { handle(error, response, next); }
}
export async function adminListLeads(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await listLeads(parse(leadListQuerySchema, request.query)) }); } catch (error) { handle(error, response, next); }
}
export async function adminGetLead(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await getLeadById(parameter(request.params.id)) }); } catch (error) { handle(error, response, next); }
}
export async function adminUpdateLead(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await updateLead(parameter(request.params.id), parse(updateLeadSchema, request.body)) }); } catch (error) { handle(error, response, next); }
}
export async function adminDeleteLead(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await deleteLead(parameter(request.params.id)) }); } catch (error) { handle(error, response, next); }
}
