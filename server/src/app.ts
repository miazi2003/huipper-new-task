import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { adminAuthRouter } from "./routes/admin-auth.js";

export function createApp() {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.disable("x-powered-by");
  app.use(helmet());
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

  app.use((_request, response) => {
    response.status(404).json({ error: "Not found" });
  });

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
      response.status(400).json({ error: "A valid JSON body is required" });
      return;
    }

    console.error("[server] Unhandled request error:", error instanceof Error ? error.message : "Unknown error");
    response.status(500).json({ error: "Internal server error" });
  });

  return app;
}
