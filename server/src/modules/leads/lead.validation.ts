import { z } from "zod";
import { LEAD_STATUSES } from "./lead.model.js";

const clean = (maximum: number) => z.string().trim().max(maximum);
export const createLeadSchema = z.object({
  name: clean(160).min(1), email: z.email().trim().toLowerCase().max(320), phone: clean(50).default(""),
  company: clean(160).default(""), subject: clean(240).default(""), message: clean(10_000).min(1),
  source: clean(120).default("website-contact"),
}).strip();
export const updateLeadSchema = z.object({ status: z.enum(LEAD_STATUSES) }).strict();
export const leadListQuerySchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(), search: clean(120).optional(),
  page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(20),
}).strict();
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadListQuery = z.infer<typeof leadListQuerySchema>;
