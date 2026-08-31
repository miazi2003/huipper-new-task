import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { ConfigurationError } from "../../config/environment.js";
import { createTestimonial, deleteTestimonial, getTestimonialById, listTestimonials, TestimonialNotFoundError, updateTestimonial } from "./testimonial.service.js";
import { createTestimonialSchema, testimonialListQuerySchema, updateTestimonialSchema } from "./testimonial.validation.js";

function parse<T>(schema: ZodType<T>, value: unknown): T { return schema.parse(value); }
function parameter(value: string | string[] | undefined) { return typeof value === "string" ? value : ""; }
function handle(error: unknown, response: Response, next: NextFunction) {
  if (error instanceof ZodError) {
    response.status(400).json({ success: false, error: "Validation failed", details: error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })) });
    return;
  }
  if (error instanceof TestimonialNotFoundError) {
    response.status(404).json({ success: false, error: error.message });
    return;
  }
  if (error instanceof ConfigurationError || (error instanceof Error && error.name.includes("MongooseServerSelection"))) {
    console.error("[testimonials] Database unavailable:", error.message);
    response.status(503).json({ success: false, error: "Testimonial service is temporarily unavailable" });
    return;
  }
  if (error instanceof Error && error.name === "ValidationError") {
    response.status(400).json({ success: false, error: "Validation failed" });
    return;
  }
  next(error);
}

export async function adminListTestimonials(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await listTestimonials(parse(testimonialListQuerySchema, request.query)) }); } catch (error) { handle(error, response, next); }
}
export async function publicListTestimonials(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await listTestimonials(parse(testimonialListQuerySchema.omit({ status: true, search: true }), request.query), true) }); } catch (error) { handle(error, response, next); }
}
export async function adminGetTestimonial(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await getTestimonialById(parameter(request.params.id)) }); } catch (error) { handle(error, response, next); }
}
export async function publicGetTestimonial(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await getTestimonialById(parameter(request.params.id), true) }); } catch (error) { handle(error, response, next); }
}
export async function adminCreateTestimonial(request: Request, response: Response, next: NextFunction) {
  try { response.status(201).json({ success: true, data: await createTestimonial(parse(createTestimonialSchema, request.body)) }); } catch (error) { handle(error, response, next); }
}
export async function adminUpdateTestimonial(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await updateTestimonial(parameter(request.params.id), parse(updateTestimonialSchema, request.body)) }); } catch (error) { handle(error, response, next); }
}
export async function adminDeleteTestimonial(request: Request, response: Response, next: NextFunction) {
  try { response.json({ success: true, data: await deleteTestimonial(parameter(request.params.id)) }); } catch (error) { handle(error, response, next); }
}
