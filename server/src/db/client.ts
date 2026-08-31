import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { requireDatabaseUrl } from "../config/environment.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getDb() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const adapter = new PrismaPg({ connectionString: requireDatabaseUrl() });
  const db = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
  }

  return db;
}
