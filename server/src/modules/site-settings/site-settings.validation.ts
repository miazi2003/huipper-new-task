import { z } from "zod";

const cleanString = (maximum: number) => z.string().trim().max(maximum);
const ctaUrl = cleanString(2048).refine(
  (value) => value === "" || value.startsWith("#") || value.startsWith("/") || /^https?:\/\/[^\s]+$/i.test(value),
  "Must be an http(s) URL, root-relative path, or page anchor",
);
const heroStatSchema = z.object({ value: cleanString(40).min(1), label: cleanString(120).min(1) }).strict();
export const updateSiteSettingsSchema = z.object({ hero: z.object({
  title: cleanString(180).min(1), subtitle: cleanString(1_000), ctaText: cleanString(80), ctaUrl,
  contactEmail: z.email().trim().toLowerCase().max(320),
  stats: z.array(heroStatSchema).length(3, "Hero must contain exactly 3 statistics"),
}).strict() }).strict();
export type SiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>;
