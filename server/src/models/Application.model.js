const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    cv: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "interviewed", "hired", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", schema);
