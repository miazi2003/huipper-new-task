import mongoose, { type HydratedDocument } from "mongoose";
import { connectToDatabase } from "../../lib/db.js";
import { ProjectModel, type ProjectDocument } from "./project.model.js";
import type { CreateProjectInput, ProjectListQuery, UpdateProjectInput } from "./project.validation.js";

export class ProjectNotFoundError extends Error {}

function escapeRegularExpression(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializeProject(project: HydratedDocument<ProjectDocument>) {
  const value = project.toObject();
  return { ...value, id: project._id.toString(), _id: undefined };
}

function ensureValidId(id: string) {
  if (!mongoose.isValidObjectId(id)) throw new ProjectNotFoundError("Project not found");
}

export async function listProjects(query: ProjectListQuery, publicOnly = false) {
  await connectToDatabase();
  const filter: {
    status?: "draft" | "published";
    featured?: boolean;
    $or?: Array<Record<string, RegExp>>;
  } = {};
  if (publicOnly) filter.status = "published";
  else if (query.status) filter.status = query.status;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.search) {
    const search = new RegExp(escapeRegularExpression(query.search), "i");
    filter.$or = [{ title: search }, { slug: search }, { clientName: search }, { industry: search }, { category: search }];
  }

  const skip = (query.page - 1) * query.limit;
  const [projects, total] = await Promise.all([
    ProjectModel.find(filter).sort({ order: 1, updatedAt: -1 }).skip(skip).limit(query.limit).exec(),
    ProjectModel.countDocuments(filter).exec(),
  ]);

  return {
    projects: projects.map(serializeProject),
    pagination: { page: query.page, limit: query.limit, total, pages: Math.ceil(total / query.limit) },
  };
}

export async function getProjectById(id: string) {
  ensureValidId(id);
  await connectToDatabase();
  const project = await ProjectModel.findById(id).exec();
  if (!project) throw new ProjectNotFoundError("Project not found");
  return serializeProject(project);
}

export async function getPublishedProjectBySlug(slug: string) {
  await connectToDatabase();
  const project = await ProjectModel.findOne({ slug, status: "published" }).exec();
  if (!project) throw new ProjectNotFoundError("Project not found");
  return serializeProject(project);
}

export async function createProject(input: CreateProjectInput) {
  await connectToDatabase();
  const project = await ProjectModel.create(input);
  return serializeProject(project);
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  ensureValidId(id);
  await connectToDatabase();
  const project = await ProjectModel.findByIdAndUpdate(id, input, { new: true, runValidators: true }).exec();
  if (!project) throw new ProjectNotFoundError("Project not found");
  return serializeProject(project);
}

export async function deleteProject(id: string) {
  ensureValidId(id);
  await connectToDatabase();
  const project = await ProjectModel.findByIdAndDelete(id).exec();
  if (!project) throw new ProjectNotFoundError("Project not found");
  return serializeProject(project);
}
