import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    cnic: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose.models.users || mongoose.model("User", userSchema);
