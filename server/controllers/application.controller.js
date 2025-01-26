import JobApplication from "../models/jobApplication.model.js";

export const getAllJobApplications = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const applications = await JobApplication.find({
      organization: req.user._id,
    })
      .populate("job", "title salary")
      .populate("candidate", "username email")
      .populate("organization", "username email");

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

export const getJobApplicationById = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await JobApplication.findById(applicationId)
      .populate("job", "title salary")
      .populate("candidate", "username email")
      .populate("organization", "username email");

    if (
      !application ||
      application.organization._id.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({
        message: "You don't have access to this application",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application fetched successfully",
      application,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
