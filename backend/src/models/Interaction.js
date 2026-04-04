import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    user: {
      type: String, // String token to match the simplistic req.userId strategy the users auth uses
      required: true,
    },
    interactionType: {
      type: String,
      required: true,
      enum: ['Meeting', 'Email', 'Call', 'Other'],
      default: 'Meeting'
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for getting a specific contact's interactions ordered by date
interactionSchema.index({ contact: 1, date: -1 });

export const Interaction = mongoose.model("Interaction", interactionSchema);
