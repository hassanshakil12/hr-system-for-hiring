import Job from "../models/job.model.js";
import Organization from "../models/organization.model.js";
import JobApplication from "../models/jobApplication.model.js";

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
