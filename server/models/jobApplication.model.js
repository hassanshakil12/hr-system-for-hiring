import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "reviewed", "shortlisted", "rejected"],
      default: "applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
