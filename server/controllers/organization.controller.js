import Job from "../models/job.model.js";
import Organization from "../models/organization.model.js";

export const getOrganization = async (req, res) => {
  try {
    res.send("Hello from organization routes");
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const createJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
