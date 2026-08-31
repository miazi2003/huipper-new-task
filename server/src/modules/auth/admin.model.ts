import mongoose, { type InferSchemaType, type Model } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminSchema.index({ email: 1 }, { unique: true });

export type Admin = InferSchemaType<typeof adminSchema>;

export const AdminModel =
  (mongoose.models.Admin as Model<Admin> | undefined) ?? mongoose.model<Admin>("Admin", adminSchema);
