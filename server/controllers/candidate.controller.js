import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";

export const getJobs = async (req, res) => {
  try {
    if (!req.user._id || !req.user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const filter = req.req || {};

    const jobs = await Job.find(filter)
      .populate("organization", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ jobs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const applyForJob = async (req, res) => {
  const { job, coverLetter } = req.body;

  try {
    const jobExists = await Job.findById(job);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "CV is required", success: false });
    }

    const jobApplication = new JobApplication({
      job,
      candidate: req.user._id,
      cv: req.file.path,
      coverLetter,
    });

    await jobApplication.save();

    res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application: jobApplication,
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
