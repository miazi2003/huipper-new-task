import mongoose from "mongoose";
import { z } from "zod";
import { TESTIMONIAL_STATUSES, TESTIMONIAL_TYPES } from "./testimonial.model.js";

const cleanString = (maximum: number) => z.string().trim().max(maximum);
const optionalUrl = z.string().trim().max(2048).refine(
  (value) => value === "" || value.startsWith("/") || /^https?:\/\/[^\s]+$/i.test(value),
  "Must be an http(s) URL or a root-relative path",
);
const projectId = z.string().trim().refine((value) => mongoose.isValidObjectId(value), "Invalid project ID").nullable();

const fields = {
  name: cleanString(160).min(1), role: cleanString(160), company: cleanString(160), quote: cleanString(5_000),
  avatar: optionalUrl, companyLogo: optionalUrl, rating: z.number().min(1).max(5).nullable(),
  type: z.enum(TESTIMONIAL_TYPES), videoUrl: optionalUrl, videoPoster: optionalUrl,
  featured: z.boolean(), status: z.enum(TESTIMONIAL_STATUSES),
  order: z.number().int().min(-100_000).max(100_000), projectId,
};

function conditionalContent(value: { type?: "text" | "video"; quote?: string; videoUrl?: string }, context: z.RefinementCtx) {
  if (value.type === "text" && !value.quote) context.addIssue({ code: "custom", path: ["quote"], message: "Quote is required for a text testimonial" });
  if (value.type === "video" && !value.videoUrl) context.addIssue({ code: "custom", path: ["videoUrl"], message: "Video URL is required for a video testimonial" });
}

export const createTestimonialSchema = z.object({
  name: fields.name, role: fields.role.default(""), company: fields.company.default(""), quote: fields.quote.default(""),
  avatar: fields.avatar.default(""), companyLogo: fields.companyLogo.default(""), rating: fields.rating.default(null),
  type: fields.type.default("text"), videoUrl: fields.videoUrl.default(""), videoPoster: fields.videoPoster.default(""),
  featured: fields.featured.default(false), status: fields.status.default("draft"), order: fields.order.default(0),
  projectId: fields.projectId.default(null),
}).strict().superRefine(conditionalContent);

export const updateTestimonialSchema = z.object({
  name: fields.name.optional(), role: fields.role.optional(), company: fields.company.optional(), quote: fields.quote.optional(),
  avatar: fields.avatar.optional(), companyLogo: fields.companyLogo.optional(), rating: fields.rating.optional(),
  type: fields.type.optional(), videoUrl: fields.videoUrl.optional(), videoPoster: fields.videoPoster.optional(),
  featured: fields.featured.optional(), status: fields.status.optional(), order: fields.order.optional(), projectId: fields.projectId.optional(),
}).strict().refine((value) => Object.keys(value).length > 0, "At least one field is required");

const queryBoolean = z.enum(["true", "false"]).transform((value) => value === "true");
export const testimonialListQuerySchema = z.object({
  status: z.enum(TESTIMONIAL_STATUSES).optional(), featured: queryBoolean.optional(), type: z.enum(TESTIMONIAL_TYPES).optional(),
  search: cleanString(120).optional(), page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
}).strict();

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type TestimonialListQuery = z.infer<typeof testimonialListQuerySchema>;
