import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { ConfigurationError } from "../../config/environment.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getPublishedProjectBySlug,
  listProjects,
  ProjectNotFoundError,
  updateProject,
} from "./project.service.js";
import { createProjectSchema, projectListQuerySchema, updateProjectSchema } from "./project.validation.js";

function validationError(response: Response, error: ZodError) {
  response.status(400).json({
    success: false,
    error: "Validation failed",
    details: error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })),
  });
}

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

function handleProjectError(error: unknown, response: Response, next: NextFunction) {
  if (error instanceof ZodError) {
    validationError(response, error);
    return;
  }
  if (error instanceof ProjectNotFoundError) {
    response.status(404).json({ success: false, error: error.message });
    return;
  }
  if (isDuplicateKeyError(error)) {
    response.status(409).json({ success: false, error: "A project with this slug already exists" });
    return;
  }
  if (error instanceof ConfigurationError || (error instanceof Error && error.name.includes("MongooseServerSelection"))) {
    console.error("[projects] Database unavailable:", error.message);
    response.status(503).json({ success: false, error: "Project service is temporarily unavailable" });
    return;
  }
  next(error);
}

function parse<T>(schema: ZodType<T>, value: unknown): T {
  return schema.parse(value);
}

function routeParameter(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export async function adminListProjects(request: Request, response: Response, next: NextFunction) {
  try {
    response.json({ success: true, data: await listProjects(parse(projectListQuerySchema, request.query)) });
  } catch (error) { handleProjectError(error, response, next); }
}

export async function publicListProjects(request: Request, response: Response, next: NextFunction) {
  try {
    response.json({ success: true, data: await listProjects(parse(projectListQuerySchema.omit({ status: true }), request.query), true) });
  } catch (error) { handleProjectError(error, response, next); }
}

export async function adminGetProject(request: Request, response: Response, next: NextFunction) {
  try {
    response.json({ success: true, data: await getProjectById(routeParameter(request.params.id)) });
  } catch (error) { handleProjectError(error, response, next); }
}

export async function publicGetProject(request: Request, response: Response, next: NextFunction) {
  try {
    response.json({ success: true, data: await getPublishedProjectBySlug(routeParameter(request.params.slug)) });
  } catch (error) { handleProjectError(error, response, next); }
}

export async function adminCreateProject(request: Request, response: Response, next: NextFunction) {
  try {
    response.status(201).json({ success: true, data: await createProject(parse(createProjectSchema, request.body)) });
  } catch (error) { handleProjectError(error, response, next); }
}

export async function adminUpdateProject(request: Request, response: Response, next: NextFunction) {
  try {
    response.json({
      success: true,
      data: await updateProject(routeParameter(request.params.id), parse(updateProjectSchema, request.body)),
    });
  } catch (error) { handleProjectError(error, response, next); }
}

export async function adminDeleteProject(request: Request, response: Response, next: NextFunction) {
  try {
    response.json({ success: true, data: await deleteProject(routeParameter(request.params.id)) });
  } catch (error) { handleProjectError(error, response, next); }
}
