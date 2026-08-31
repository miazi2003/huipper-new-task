import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireTrustedOrigin } from "../../middleware/trusted-origin.js";
import {
  adminCreateProject,
  adminDeleteProject,
  adminGetProject,
  adminListProjects,
  adminUpdateProject,
  publicGetProject,
  publicListProjects,
} from "./project.controller.js";

export const adminProjectRouter = Router();
export const publicProjectRouter = Router();

adminProjectRouter.use(requireAdmin);
adminProjectRouter.get("/", adminListProjects);
adminProjectRouter.post("/", requireTrustedOrigin, adminCreateProject);
adminProjectRouter.get("/:id", adminGetProject);
adminProjectRouter.patch("/:id", requireTrustedOrigin, adminUpdateProject);
adminProjectRouter.delete("/:id", requireTrustedOrigin, adminDeleteProject);

publicProjectRouter.get("/", publicListProjects);
publicProjectRouter.get("/:slug", publicGetProject);
