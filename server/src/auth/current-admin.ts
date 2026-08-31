import type { Request } from "express";
import mongoose from "mongoose";
import { connectToDatabase } from "../lib/db.js";
import { AdminModel } from "../modules/auth/admin.model.js";
import { getAdminIdFromSession } from "./session.js";

export async function getCurrentAdmin(request: Request) {
  const adminId = await getAdminIdFromSession(request);
  if (!adminId || !mongoose.isValidObjectId(adminId)) return null;

  await connectToDatabase();
  const admin = await AdminModel.findById(adminId).select("name email role").exec();

  if (!admin) return null;

  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
}
