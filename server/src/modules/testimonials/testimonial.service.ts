import mongoose, { type HydratedDocument } from "mongoose";
import { connectToDatabase } from "../../lib/db.js";
import { TestimonialModel, type TestimonialDocument } from "./testimonial.model.js";
import type { CreateTestimonialInput, TestimonialListQuery, UpdateTestimonialInput } from "./testimonial.validation.js";

export class TestimonialNotFoundError extends Error {}

function escapeRegularExpression(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function ensureValidId(id: string) { if (!mongoose.isValidObjectId(id)) throw new TestimonialNotFoundError("Testimonial not found"); }
function serialize(testimonial: HydratedDocument<TestimonialDocument>) {
  const value = testimonial.toObject();
  return { ...value, id: testimonial._id.toString(), _id: undefined, projectId: testimonial.projectId?.toString() ?? null };
}

export async function listTestimonials(query: TestimonialListQuery, publicOnly = false) {
  await connectToDatabase();
  const filter: { status?: "draft" | "published"; featured?: boolean; type?: "text" | "video"; $or?: Array<Record<string, RegExp>> } = {};
  if (publicOnly) filter.status = "published"; else if (query.status) filter.status = query.status;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.type) filter.type = query.type;
  if (query.search) {
    const search = new RegExp(escapeRegularExpression(query.search), "i");
    filter.$or = [{ name: search }, { company: search }, { role: search }];
  }
  const skip = (query.page - 1) * query.limit;
  const [testimonials, total] = await Promise.all([
    TestimonialModel.find(filter).sort({ order: 1, updatedAt: -1 }).skip(skip).limit(query.limit).exec(),
    TestimonialModel.countDocuments(filter).exec(),
  ]);
  return { testimonials: testimonials.map(serialize), pagination: { page: query.page, limit: query.limit, total, pages: Math.ceil(total / query.limit) } };
}

export async function getTestimonialById(id: string, publicOnly = false) {
  ensureValidId(id);
  await connectToDatabase();
  const testimonial = await TestimonialModel.findOne({ _id: id, ...(publicOnly ? { status: "published" } : {}) }).exec();
  if (!testimonial) throw new TestimonialNotFoundError("Testimonial not found");
  return serialize(testimonial);
}

export async function createTestimonial(input: CreateTestimonialInput) {
  await connectToDatabase();
  return serialize(await TestimonialModel.create(input));
}

export async function updateTestimonial(id: string, input: UpdateTestimonialInput) {
  ensureValidId(id);
  await connectToDatabase();
  const testimonial = await TestimonialModel.findById(id).exec();
  if (!testimonial) throw new TestimonialNotFoundError("Testimonial not found");
  testimonial.set(input);
  await testimonial.save();
  return serialize(testimonial);
}

export async function deleteTestimonial(id: string) {
  ensureValidId(id);
  await connectToDatabase();
  const testimonial = await TestimonialModel.findByIdAndDelete(id).exec();
  if (!testimonial) throw new TestimonialNotFoundError("Testimonial not found");
  return serialize(testimonial);
}
