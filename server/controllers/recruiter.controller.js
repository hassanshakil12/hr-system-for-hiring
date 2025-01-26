import Hiring from "../models/hiring.model.js";

export const getHiringRequests = async (req, res) => {
  try {
    const hiringRequests = await Hiring.find({ recruiter: req.user._id })
      .populate("organization", "username email")
      .populate("job", "title, salary")
      .select("__v");
    if (!hiringRequests) {
      return res
        .status(404)
        .json({ message: "No hiring requests found", success: false });
    }

    return res.status(200).json({
      message: "Hiring requests fetched successfully",
      hiringRequests,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { hiringId, status } = req.body;
  try {
    if (!["accepted", "rejected".includes(status)]) {
      return res
        .status(400)
        .json({ message: "Invalid status", success: false });
    }

    const hiringRequest = await Hiring.findOneAndUpdate(
      { _id: hiringId, recruiter: req.user._id },
      { status },
      { new: true }
    );
    if (!hiringRequest) {
      return res
        .status(404)
        .json({ message: "Hiring request not found", success: false });
    }

    return res.status(200).json({
      message: `Request status ${status} successfully`,
      hiringRequest,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
