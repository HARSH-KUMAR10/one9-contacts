import mongoose from "mongoose";
import { logger } from "../logger/index.js";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    notes: {
      type: String,
      maxlength: 500,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ name: 1 });

export const Contact = mongoose.model("Contact", contactSchema);
