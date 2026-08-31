import { config } from "dotenv";

config({ path: [".env.local", ".env"], quiet: true });

async function createAdmin() {
  const [{ hashPassword }, { isValidEmail, normalizeEmail }, { connectToDatabase, disconnectFromDatabase }, { AdminModel }] = await Promise.all([
    import("../src/auth/password.js"),
    import("../src/auth/validation.js"),
    import("../src/lib/db.js"),
    import("../src/modules/auth/admin.model.js"),
  ]);

  const name = process.env.ADMIN_NAME?.trim() || "Huipper Admin";
  const emailValue = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!emailValue || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");

  const email = normalizeEmail(emailValue);
  if (!isValidEmail(email)) throw new Error("ADMIN_EMAIL must be a valid email address.");
  if (password.length < 8) throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  if (password.length > 128) throw new Error("ADMIN_PASSWORD must not exceed 128 characters.");

  try {
    await connectToDatabase();
    const existing = await AdminModel.exists({ email });
    if (existing) {
      console.info(`Admin already exists for ${email}. No changes were made.`);
      return;
    }

    const admin = await AdminModel.create({
      name,
      email,
      passwordHash: await hashPassword(password),
    });
    console.info(`Admin created successfully for ${admin.email} with role ${admin.role}.`);
  } finally {
    await disconnectFromDatabase();
  }
}

createAdmin().catch((error: unknown) => {
  console.error("Admin creation failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
