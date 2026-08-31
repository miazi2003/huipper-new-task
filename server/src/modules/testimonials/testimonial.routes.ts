import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireTrustedOrigin } from "../../middleware/trusted-origin.js";
import { adminCreateTestimonial, adminDeleteTestimonial, adminGetTestimonial, adminListTestimonials, adminUpdateTestimonial, publicGetTestimonial, publicListTestimonials } from "./testimonial.controller.js";

export const adminTestimonialRouter = Router();
export const publicTestimonialRouter = Router();

adminTestimonialRouter.use(requireAdmin);
adminTestimonialRouter.get("/", adminListTestimonials);
adminTestimonialRouter.post("/", requireTrustedOrigin, adminCreateTestimonial);
adminTestimonialRouter.get("/:id", adminGetTestimonial);
adminTestimonialRouter.patch("/:id", requireTrustedOrigin, adminUpdateTestimonial);
adminTestimonialRouter.delete("/:id", requireTrustedOrigin, adminDeleteTestimonial);

publicTestimonialRouter.get("/", publicListTestimonials);
publicTestimonialRouter.get("/:id", publicGetTestimonial);
