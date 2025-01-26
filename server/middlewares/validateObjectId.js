import mongoose from "mongoose";
export const validateObjectId = (req, res, next) => {
  const { applicationId, jobId } = req.params;
  if (applicationId && !mongoose.isValidObjectId(applicationId)) {
    return res.status(400).json({ message: "Invalid application ID" });
  }
  if (jobId && !mongoose.isValidObjectId(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  next();
};
