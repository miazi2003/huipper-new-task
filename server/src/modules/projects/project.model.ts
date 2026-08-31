import mongoose, { type InferSchemaType, type Model } from "mongoose";

export const PROJECT_STATUSES = ["draft", "published"] as const;

const metricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 80 },
    value: { type: String, required: true, trim: true, maxlength: 120 },
  },
  { _id: false },
);

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 70, default: "" },
    description: { type: String, trim: true, maxlength: 180, default: "" },
    imageUrl: { type: String, trim: true, maxlength: 2048, default: "" },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 180 },
    shortDescription: { type: String, trim: true, maxlength: 320, default: "" },
    description: { type: String, trim: true, maxlength: 20_000, default: "" },
    clientName: { type: String, trim: true, maxlength: 160, default: "" },
    industry: { type: String, trim: true, maxlength: 120, default: "" },
    category: { type: String, trim: true, maxlength: 120, default: "" },
    services: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    thumbnailUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    coverImageUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    galleryUrls: { type: [String], default: [] },
    projectUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    caseStudyUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    status: { type: String, enum: PROJECT_STATUSES, default: "draft", required: true },
    featured: { type: Boolean, default: false, required: true },
    order: { type: Number, default: 0, required: true },
    metrics: { type: [metricSchema], default: [] },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true, versionKey: false },
);

projectSchema.index({ status: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ order: 1 });

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

export const ProjectModel: Model<ProjectDocument> =
  (mongoose.models.Project as Model<ProjectDocument> | undefined) ?? mongoose.model<ProjectDocument>("Project", projectSchema);
