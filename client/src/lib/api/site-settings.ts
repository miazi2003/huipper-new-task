export type HeroStat = { value: string; label: string };
export type SiteSettings = { hero: { title: string; subtitle: string; ctaText: string; ctaUrl: string; contactEmail: string; stats: [HeroStat, HeroStat, HeroStat] } };

export const DEFAULT_SITE_SETTINGS: SiteSettings = { hero: {
  title: "ACROPOLIS INTEGRO",
  subtitle: "COMPREHENSIVE SERVICES DESIGNED TO IMPROVE\nTHE SECURITY, RELIABILITY, AND PERFORMANCE\nOF YOUR IT INFRASTRUCTURE",
  ctaText: "Learn more", ctaUrl: "#contact", contactEmail: "huipper.business@gmail.com",
  stats: [
    { value: "5+", label: "YEARS OF SUCCESSFUL\nDELIVERY" },
    { value: "40+", label: "COMPLETED\nPROJECTS" },
    { value: "10+", label: "YEARS OF EXPERT\nEXPERIENCE" },
  ],
} };

type Failure = { success: false; error: string; details?: Array<{ field: string; message: string }> };
type Success = { success: true; data: SiteSettings };
export class SiteSettingsApiError extends Error {
  constructor(message: string, public status: number, public details?: Failure["details"]) { super(message); }
}
function isSettings(value: unknown): value is SiteSettings {
  if (!value || typeof value !== "object" || !("hero" in value)) return false;
  const hero = value.hero as Record<string, unknown>;
  return typeof hero.title === "string" && typeof hero.subtitle === "string" && typeof hero.ctaText === "string" &&
    typeof hero.ctaUrl === "string" && typeof hero.contactEmail === "string" && Array.isArray(hero.stats) && hero.stats.length === 3 &&
    hero.stats.every((stat) => stat && typeof stat.value === "string" && typeof stat.label === "string");
}
async function request(path: string, init?: RequestInit) {
  const response = await fetch(path, { ...init, cache: "no-store", credentials: "same-origin", headers: { "Content-Type": "application/json", ...init?.headers } });
  const body = await response.json().catch(() => ({ success: false, error: "Invalid server response" })) as Success | Failure;
  if (!response.ok || !body.success) { const failure = body as Failure; throw new SiteSettingsApiError(failure.error || "Request failed", response.status, failure.details); }
  if (!isSettings(body.data)) throw new SiteSettingsApiError("Invalid site settings response", response.status);
  return body.data;
}
export const getPublicSiteSettings = () => request("/api/site-settings");
export const getAdminSiteSettings = () => request("/api/admin/site-settings");
export const updateAdminSiteSettings = (input: SiteSettings) => request("/api/admin/site-settings", { method: "PATCH", body: JSON.stringify(input) });
