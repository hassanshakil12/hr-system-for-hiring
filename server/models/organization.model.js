import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: ["organization"],
      default: "organization",
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

export default mongoose.model("Organization", organizationSchema);