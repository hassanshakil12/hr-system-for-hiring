import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: ["recruiter"],
      default: "recruiter",
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
