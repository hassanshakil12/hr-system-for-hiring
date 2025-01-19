import Job from "../models/job.model.js";
import Organization from "../models/organization.model.js";
import JobApplication from "../models/jobApplication.model.js";
import Recruiter from "../models/recruiter.model.js";

export const getOrganization = async (req, res) => {
  try {
    res.send("Hello from organization routes");
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
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
    res.status(500).json({ message: error.message, success: false });
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
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getJobApplications = async (req, res) => {
  const { jobId } = req.params;
  try {
    const jobExists = await Job.findById(jobId);
    if (
      !jobExists ||
      jobExists.organization._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(400)
        .json({ message: "You cannot access this job", success: false });
    }

    const applications = await JobApplication.find({ job: jobId })
      .populate("candidate", "username email")
      .populate("job", "title salary")
      .populate("organization", "username, email");
    if (!applications || applications.length === 0) {
      return res
        .status(400)
        .json({ message: "No applications recieved", success: false });
    }

    return res.status(200).json({
      message: "job fetched successfully",
      applications,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getRecruiters = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const filter = {};
    const recruiters = await Recruiter.find(filter);

    if (!recruiters || recruiters.length === 0) {
      return res
        .status(404)
        .json({ message: "No recruiters found", success: false });
    }

    return res.status(200).json({
      message: "Recruiters fetched successfully",
      recruiters,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getRecruiterById = async (req, res) => { 
  const { recruiterId } = req.params;
  try {
    const recruiter = await Recruiter.findById(recruiterId);

    if (!recruiter) {
      return res
        .status(404)
        .json({ message: "Recruiter not found", success: false });
    }

    return res.status(200).json({
      message: "Recruiter fetched successfully",
      recruiter,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}