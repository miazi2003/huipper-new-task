import { Router } from "express";
import { contactRateLimit } from "../../middleware/contact-rate-limit.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireTrustedOrigin } from "../../middleware/trusted-origin.js";
import { adminDeleteLead, adminGetLead, adminListLeads, adminUpdateLead, submitContact } from "./lead.controller.js";

export const contactRouter = Router(); export const adminLeadRouter = Router();
contactRouter.post("/", contactRateLimit, submitContact);
adminLeadRouter.use(requireAdmin);
adminLeadRouter.get("/", adminListLeads);
adminLeadRouter.get("/:id", adminGetLead);
adminLeadRouter.patch("/:id", requireTrustedOrigin, adminUpdateLead);
adminLeadRouter.delete("/:id", requireTrustedOrigin, adminDeleteLead);
