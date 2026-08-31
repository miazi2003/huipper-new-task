import { z } from "zod";
import { PROJECT_STATUSES } from "./project.model.js";

const cleanString = (maximum: number) => z.string().trim().max(maximum);
const optionalUrl = z.string().trim().max(2048).refine(
  (value) => value === "" || value.startsWith("/") || /^https?:\/\/[^\s]+$/i.test(value),
  "Must be an http(s) URL or a root-relative path",
);
const slug = z.string().trim().toLowerCase().min(1).max(180).regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Use lowercase letters, numbers, and single hyphens",
);
const stringList = z.array(cleanString(120).min(1)).max(50);
const metric = z.object({ label: cleanString(80).min(1), value: cleanString(120).min(1) }).strict();
const seo = z.object({
  title: cleanString(70).default(""),
  description: cleanString(180).default(""),
  imageUrl: optionalUrl.default(""),
}).strict();

const projectFields = {
  title: cleanString(160).min(1),
  slug,
  shortDescription: cleanString(320),
  description: cleanString(20_000),
  clientName: cleanString(160),
  industry: cleanString(120),
  category: cleanString(120),
  services: stringList,
  technologies: stringList,
  thumbnailUrl: optionalUrl,
  coverImageUrl: optionalUrl,
  galleryUrls: z.array(optionalUrl.refine((value) => value !== "", "Gallery URLs cannot be empty")).max(50),
  projectUrl: optionalUrl,
  caseStudyUrl: optionalUrl,
  status: z.enum(PROJECT_STATUSES),
  featured: z.boolean(),
  order: z.number().int().min(-100_000).max(100_000),
  metrics: z.array(metric).max(20),
  seo,
};

export const createProjectSchema = z.object({
  title: projectFields.title,
  slug: projectFields.slug,
  shortDescription: projectFields.shortDescription.default(""),
  description: projectFields.description.default(""),
  clientName: projectFields.clientName.default(""),
  industry: projectFields.industry.default(""),
  category: projectFields.category.default(""),
  services: projectFields.services.default([]),
  technologies: projectFields.technologies.default([]),
  thumbnailUrl: projectFields.thumbnailUrl.default(""),
  coverImageUrl: projectFields.coverImageUrl.default(""),
  galleryUrls: projectFields.galleryUrls.default([]),
  projectUrl: projectFields.projectUrl.default(""),
  caseStudyUrl: projectFields.caseStudyUrl.default(""),
  status: projectFields.status.default("draft"),
  featured: projectFields.featured.default(false),
  order: projectFields.order.default(0),
  metrics: projectFields.metrics.default([]),
  seo: projectFields.seo.default({ title: "", description: "", imageUrl: "" }),
}).strict();

export const updateProjectSchema = z.object({
  title: projectFields.title.optional(),
  slug: projectFields.slug.optional(),
  shortDescription: projectFields.shortDescription.optional(),
  description: projectFields.description.optional(),
  clientName: projectFields.clientName.optional(),
  industry: projectFields.industry.optional(),
  category: projectFields.category.optional(),
  services: projectFields.services.optional(),
  technologies: projectFields.technologies.optional(),
  thumbnailUrl: projectFields.thumbnailUrl.optional(),
  coverImageUrl: projectFields.coverImageUrl.optional(),
  galleryUrls: projectFields.galleryUrls.optional(),
  projectUrl: projectFields.projectUrl.optional(),
  caseStudyUrl: projectFields.caseStudyUrl.optional(),
  status: projectFields.status.optional(),
  featured: projectFields.featured.optional(),
  order: projectFields.order.optional(),
  metrics: projectFields.metrics.optional(),
  seo: projectFields.seo.optional(),
}).strict().refine((value) => Object.keys(value).length > 0, "At least one field is required");

const queryBoolean = z.enum(["true", "false"]).transform((value) => value === "true");

export const projectListQuerySchema = z.object({
  status: z.enum(PROJECT_STATUSES).optional(),
  featured: queryBoolean.optional(),
  search: cleanString(120).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
}).strict();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectListQuery = z.infer<typeof projectListQuerySchema>;
