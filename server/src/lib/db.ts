import mongoose from "mongoose";
import { requireMongoDbUri } from "../config/environment.js";

let connectionPromise: Promise<typeof mongoose> | null = null;

mongoose.set("bufferCommands", false);

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(requireMongoDbUri(), { serverSelectionTimeoutMS: 5000 })
      .then((connection) => {
        console.info("[database] MongoDB connected.");
        return connection;
      })
      .catch((error: unknown) => {
        connectionPromise = null;
        console.error("[database] MongoDB connection failed.");
        throw error;
      });
  }

  return connectionPromise;
}

export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  connectionPromise = null;
}
