import mongoose, { type InferSchemaType, type Model } from "mongoose";

export const TESTIMONIAL_TYPES = ["text", "video"] as const;
export const TESTIMONIAL_STATUSES = ["draft", "published"] as const;

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    role: { type: String, trim: true, maxlength: 160, default: "" },
    company: { type: String, trim: true, maxlength: 160, default: "" },
    quote: {
      type: String,
      trim: true,
      maxlength: 5_000,
      default: "",
      validate: {
        validator(this: { type: string }, value: string) { return this.type !== "text" || value.length > 0; },
        message: "Quote is required for a text testimonial",
      },
    },
    avatar: { type: String, trim: true, maxlength: 2048, default: "" },
    companyLogo: { type: String, trim: true, maxlength: 2048, default: "" },
    rating: { type: Number, min: 1, max: 5, default: null },
    type: { type: String, enum: TESTIMONIAL_TYPES, default: "text", required: true },
    videoUrl: {
      type: String,
      trim: true,
      maxlength: 2048,
      default: "",
      validate: {
        validator(this: { type: string }, value: string) { return this.type !== "video" || value.length > 0; },
        message: "Video URL is required for a video testimonial",
      },
    },
    videoPoster: { type: String, trim: true, maxlength: 2048, default: "" },
    featured: { type: Boolean, default: false, required: true },
    status: { type: String, enum: TESTIMONIAL_STATUSES, default: "draft", required: true },
    order: { type: Number, default: 0, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  },
  { timestamps: true, versionKey: false },
);

testimonialSchema.index({ status: 1 });
testimonialSchema.index({ featured: 1 });
testimonialSchema.index({ type: 1 });
testimonialSchema.index({ order: 1 });

export type TestimonialDocument = InferSchemaType<typeof testimonialSchema>;
export const TestimonialModel: Model<TestimonialDocument> =
  (mongoose.models.Testimonial as Model<TestimonialDocument> | undefined) ??
  mongoose.model<TestimonialDocument>("Testimonial", testimonialSchema);
