import { connectToDatabase } from "../../lib/db.js";
import { DEFAULT_HERO_SETTINGS, SITE_SETTINGS_KEY, SiteSettingsModel } from "./site-settings.model.js";
import type { SiteSettingsInput } from "./site-settings.validation.js";

function presentationData(settings: { hero: SiteSettingsInput["hero"] }) { return { hero: settings.hero }; }

export async function getSiteSettings() {
  await connectToDatabase();
  const settings = await SiteSettingsModel.findOneAndUpdate(
    { key: SITE_SETTINGS_KEY },
    { $setOnInsert: { key: SITE_SETTINGS_KEY, hero: DEFAULT_HERO_SETTINGS } },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
  ).exec();
  return presentationData(settings.toObject());
}

export async function updateSiteSettings(input: SiteSettingsInput) {
  await connectToDatabase();
  const settings = await SiteSettingsModel.findOneAndUpdate(
    { key: SITE_SETTINGS_KEY },
    { $set: { hero: input.hero }, $setOnInsert: { key: SITE_SETTINGS_KEY } },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
  ).exec();
  return presentationData(settings.toObject());
}
