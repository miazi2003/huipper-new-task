import type { Request } from "express";
import { getDb } from "../db/client.js";
import { getAdminIdFromSession } from "./session.js";

export async function getCurrentAdmin(request: Request) {
  const adminId = await getAdminIdFromSession(request);
  if (!adminId) return null;

  return getDb().admin.findUnique({
    where: { id: adminId },
    select: { id: true, name: true, email: true, role: true },
  });
}
