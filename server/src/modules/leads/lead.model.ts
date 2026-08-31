import mongoose, { type InferSchemaType, type Model } from "mongoose";

export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
  phone: { type: String, trim: true, maxlength: 50, default: "" },
  company: { type: String, trim: true, maxlength: 160, default: "" },
  subject: { type: String, trim: true, maxlength: 240, default: "" },
  message: { type: String, required: true, trim: true, maxlength: 10_000 },
  source: { type: String, trim: true, maxlength: 120, default: "website-contact" },
  status: { type: String, enum: LEAD_STATUSES, default: "new", required: true },
}, { timestamps: true, versionKey: false });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

export type LeadDocument = InferSchemaType<typeof leadSchema>;
export const LeadModel: Model<LeadDocument> =
  (mongoose.models.Lead as Model<LeadDocument> | undefined) ?? mongoose.model<LeadDocument>("Lead", leadSchema);
