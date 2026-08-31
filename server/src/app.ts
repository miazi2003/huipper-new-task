import cookieParser from "cookie-parser";
import express from "express";
import * as helmetModule from "helmet";
import { isTrustedOrigin } from "./config/environment.js";
import { adminAuthRouter } from "./routes/admin-auth.js";
import { adminProjectRouter, publicProjectRouter } from "./modules/projects/project.routes.js";
import { adminTestimonialRouter, publicTestimonialRouter } from "./modules/testimonials/testimonial.routes.js";
import { adminSiteSettingsRouter, publicSiteSettingsRouter } from "./modules/site-settings/site-settings.routes.js";
import { adminLeadRouter, contactRouter } from "./modules/leads/lead.routes.js";

export function createApp() {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.disable("x-powered-by");
  app.use(helmetModule.default());
  app.use((request, response, next) => {
    const origin = request.get("origin");
    if (origin && isTrustedOrigin(origin)) {
      response.setHeader("Access-Control-Allow-Origin", origin);
      response.setHeader("Access-Control-Allow-Credentials", "true");
      response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
      response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,Cookie");
    }

    if (request.method === "OPTIONS") {
      response.status(204).end();
      return;
    }

    next();
  });
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());
  app.use((_request, response, next) => {
    response.setHeader("Cache-Control", "no-store");
    next();
  });

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });
  app.use("/api/admin/auth", adminAuthRouter);
  app.use("/api/admin/projects", adminProjectRouter);
  app.use("/api/projects", publicProjectRouter);
  app.use("/api/admin/testimonials", adminTestimonialRouter);
  app.use("/api/testimonials", publicTestimonialRouter);
  app.use("/api/admin/site-settings", adminSiteSettingsRouter);
  app.use("/api/site-settings", publicSiteSettingsRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api/admin/leads", adminLeadRouter);

  app.use((_request, response) => {
    response.status(404).json({ success: false, error: "Not found" });
  });

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
      response.status(400).json({ success: false, error: "A valid JSON body is required" });
      return;
    }

    console.error("[server] Unhandled request error:", error instanceof Error ? error.message : "Unknown error");
    response.status(500).json({ success: false, error: "Internal server error" });
  });

  return app;
}
