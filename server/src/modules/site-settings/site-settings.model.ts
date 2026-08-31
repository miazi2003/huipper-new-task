import mongoose, { type InferSchemaType, type Model } from "mongoose";

export const SITE_SETTINGS_KEY = "primary";
export const DEFAULT_HERO_SETTINGS = {
  title: "ACROPOLIS INTEGRO",
  subtitle: "COMPREHENSIVE SERVICES DESIGNED TO IMPROVE\nTHE SECURITY, RELIABILITY, AND PERFORMANCE\nOF YOUR IT INFRASTRUCTURE",
  ctaText: "Learn more",
  ctaUrl: "#contact",
  contactEmail: "huipper.business@gmail.com",
  stats: [
    { value: "5+", label: "YEARS OF SUCCESSFUL\nDELIVERY" },
    { value: "40+", label: "COMPLETED\nPROJECTS" },
    { value: "10+", label: "YEARS OF EXPERT\nEXPERIENCE" },
  ],
};

const statSchema = new mongoose.Schema({ value: { type: String, required: true, trim: true, maxlength: 40 }, label: { type: String, required: true, trim: true, maxlength: 120 } }, { _id: false });
const heroSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  subtitle: { type: String, trim: true, maxlength: 1_000, default: "" },
  ctaText: { type: String, trim: true, maxlength: 80, default: "" },
  ctaUrl: { type: String, trim: true, maxlength: 2048, default: "" },
  contactEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
  stats: {
    type: [statSchema], required: true,
    validate: { validator: (stats: unknown[]) => stats.length === 3, message: "Hero must contain exactly 3 statistics" },
  },
}, { _id: false });

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, immutable: true, select: false, default: SITE_SETTINGS_KEY },
  hero: { type: heroSchema, required: true, default: () => DEFAULT_HERO_SETTINGS },
}, { timestamps: true, versionKey: false });

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>;
export const SiteSettingsModel: Model<SiteSettingsDocument> =
  (mongoose.models.SiteSettings as Model<SiteSettingsDocument> | undefined) ??
  mongoose.model<SiteSettingsDocument>("SiteSettings", siteSettingsSchema);
