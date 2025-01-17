import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      default: "candidate",
      immutable: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      reuired: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
