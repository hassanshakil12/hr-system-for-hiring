import fs from "fs";
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

    if (!jobs || jobs.length === 0) {
      return res.status(400).json({ message: "No jobs found", success: false });
    }

    res.status(200).json({ jobs, success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOne({ _id: id }).populate(
      "organization",
      "username email"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    res.status(200).json({ job, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const applyForJob = async (req, res) => {
  const { job } = req.params;
  const { coverLetter } = req.body;

  try {
    const jobExists = await Job.findById(job).populate("organization");
    if (!jobExists) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const existingApplication = await JobApplication.findOne().where({
      job,
      candidate: req.user._id,
    });

    if (existingApplication) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "You have already applied to this job",
        success: false,
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "CV is required", success: false });
    }

    const jobApplication = new JobApplication({
      job,
      candidate: req.user._id,
      organization: jobExists.organization._id,
      cv: req.file.path,
      coverLetter,
    });

    await jobApplication.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application: jobApplication,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({
      candidate: req.user._id,
    }).populate("job", "title salary description");
    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({
      message: "Applications fetched successfully",
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
