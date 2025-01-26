import Job from "../models/job.model.js";
import Recruiter from "../models/recruiter.model.js";
import Hiring from "../models/hiring.model.js";

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
      success: true,
      recruiters,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
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
      success: true,
      recruiter,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const hireRecruiter = async (req, res) => {
  const { recruiterId, jobId, note } = req.body;

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res
        .status(404)
        .json({ message: "Recruiter not found", success: false });
    }

    if (jobId) {
      const job = await Job.findById(jobId);
      if (!job || job.organization.toString() !== req.user._id.toString()) {
        return res.status(404).json({
          message: "You don't have access to this job!!!",
          success: false,
        });
      }
    }

    if (!note) {
      return res.status(404).json({ message: "No Note Found", success: false });
    }

    const requestExists = await Hiring.findOne({
      organization: req.user._id,
      recruiter: recruiterId,
      job: jobId || null,
    });

    if (requestExists) {
      return res.status(400).json({
        message: "Request already exists",
        success: false,
      });
    }

    const newhiring = new Hiring({
      organization: req.user._id,
      recruiter: recruiterId,
      job: jobId || null,
      note,
    });

    await newhiring.save();

    return res.status(201).json({
      message: "Hiring request sent successfully",
      success: true,
      newhiring,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getRequestStatus = async (req, res) => {
  const { requestId } = req.params;

  try {
    const hiringRequest = await Hiring.findById(requestId)
      .populate("recruiter", "username email")
      .populate("job", "title salary");

    if (!hiringRequest) {
      return res
        .status(404)
        .json({ message: "Request not found", success: false });
    }

    if (
      !hiringRequest.organization ||
      hiringRequest.organization._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not authorized to access this request",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Request fetched successfully",
      success: true,
      hiringRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
