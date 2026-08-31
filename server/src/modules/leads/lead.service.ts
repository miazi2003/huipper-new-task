import mongoose, { type HydratedDocument } from "mongoose";
import { connectToDatabase } from "../../lib/db.js";
import { LeadModel, type LeadDocument } from "./lead.model.js";
import type { CreateLeadInput, LeadListQuery, UpdateLeadInput } from "./lead.validation.js";

export class LeadNotFoundError extends Error {}
function escapeRegularExpression(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function ensureValidId(id: string) { if (!mongoose.isValidObjectId(id)) throw new LeadNotFoundError("Lead not found"); }
function serialize(lead: HydratedDocument<LeadDocument>) { const value = lead.toObject(); return { ...value, id: lead._id.toString(), _id: undefined }; }

export async function createLead(input: CreateLeadInput) { await connectToDatabase(); return serialize(await LeadModel.create(input)); }
export async function listLeads(query: LeadListQuery) {
  await connectToDatabase();
  const filter: { status?: "new" | "contacted" | "closed"; $or?: Array<Record<string, RegExp>> } = {};
  if (query.status) filter.status = query.status;
  if (query.search) { const search = new RegExp(escapeRegularExpression(query.search), "i"); filter.$or = [{ name: search }, { email: search }, { company: search }, { subject: search }]; }
  const skip = (query.page - 1) * query.limit;
  const [leads, total, newCount] = await Promise.all([
    LeadModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(query.limit).exec(),
    LeadModel.countDocuments(filter).exec(), LeadModel.countDocuments({ status: "new" }).exec(),
  ]);
  return { leads: leads.map(serialize), pagination: { page: query.page, limit: query.limit, total, pages: Math.ceil(total / query.limit) }, counts: { new: newCount } };
}
export async function getLeadById(id: string) { ensureValidId(id); await connectToDatabase(); const lead = await LeadModel.findById(id).exec(); if (!lead) throw new LeadNotFoundError("Lead not found"); return serialize(lead); }
export async function updateLead(id: string, input: UpdateLeadInput) { ensureValidId(id); await connectToDatabase(); const lead = await LeadModel.findByIdAndUpdate(id, input, { new: true, runValidators: true }).exec(); if (!lead) throw new LeadNotFoundError("Lead not found"); return serialize(lead); }
export async function deleteLead(id: string) { ensureValidId(id); await connectToDatabase(); const lead = await LeadModel.findByIdAndDelete(id).exec(); if (!lead) throw new LeadNotFoundError("Lead not found"); return serialize(lead); }
