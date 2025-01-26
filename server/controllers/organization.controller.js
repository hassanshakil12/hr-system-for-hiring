import Job from "../models/job.model.js";
import Organization from "../models/organization.model.js";

export const getOrganizationJobs = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const filter = { organization: req.user._id };
    const jobs = await Job.find(filter);

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createJob = async (req, res) => {
  const { title, description, location, salary, requirements } = req.body;
  try {
    if (req.user.entityType !== "organization") {
      return res
        .status(400)
        .json({ message: "Only Organizations can add Jobs", success: false });
    }

    const organizationExists = await Organization.findById(req.user._id);
    if (!organizationExists) {
      return res
        .status(400)
        .json({ message: "Organization does not exist", success: false });
    }

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      requirements,
      organization: req.user._id,
    });
    await newJob.save();

    res
      .status(201)
      .json({ message: "Job created successfully", success: true, newJob });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  const { jobId } = req.params;
  try {
    const jobExists = await Job.findById(jobId).populate(
      "organization",
      "username, email"
    );
    if (
      !jobExists ||
      jobExists.organization._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(404)
        .json({ message: "You don't have access to this job", success: false });
    }

    return res
      .status(200)
      .json({ message: "job fetched successfully", jobExists, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
