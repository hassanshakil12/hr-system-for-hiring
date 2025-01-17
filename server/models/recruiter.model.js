import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      default: "recruiter",
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

export default mongoose.model("Recruiter", recruiterSchema);
