import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireTrustedOrigin } from "../../middleware/trusted-origin.js";
import { patchSiteSettings, readSiteSettings } from "./site-settings.controller.js";

export const adminSiteSettingsRouter = Router();
export const publicSiteSettingsRouter = Router();
adminSiteSettingsRouter.use(requireAdmin);
adminSiteSettingsRouter.get("/", readSiteSettings);
adminSiteSettingsRouter.patch("/", requireTrustedOrigin, patchSiteSettings);
publicSiteSettingsRouter.get("/", readSiteSettings);
