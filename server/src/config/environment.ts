export class ConfigurationError extends Error {
  constructor(variableName: string, requirement?: string) {
    super(`${variableName} is not configured${requirement ? ` (${requirement})` : ""}.`);
    this.name = "ConfigurationError";
  }
}

export function requireMongoDbUri() {
  const value = process.env.MONGODB_URI?.trim();
  if (!value) throw new ConfigurationError("MONGODB_URI");
  return value;
}

export function requireSessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new ConfigurationError("ADMIN_SESSION_SECRET", "minimum 32 characters");
  }
  return value;
}

export function getClientOrigin() {
  return process.env.CLIENT_ORIGIN?.trim() || "http://localhost:3000";
}

export function getPort() {
  const value = Number(process.env.PORT ?? 4000);
  return Number.isInteger(value) && value > 0 && value <= 65535 ? value : 4000;
}

export function getHost() {
  return process.env.HOST?.trim() || "127.0.0.1";
}
