import mongoose, { Schema } from "mongoose";
import { type } from "os";

const loanSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["wedding", "home construction", "business startup", "education"],
    },
    subCategory: {
      type: String,
      required: true,
    },
    amountRequested: {
      type: Number,
      required: true,
    },
    loanPeriod: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    gauntator1: {
      email: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
      },
      cnic: {
        type: Number,
        required: true,
      },
    },
    gauntator2: {
      email: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
      },
      cnic: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const loanModel =
  mongoose.models.loans || mongoose.model("Loan", loanSchema);
