const { handlers } = require("../utils/handlers");
const sendEmail = require("../config/nodemailer");

class Service {
  constructor() {
    this.user = require("../models/User.model");
    this.job = require("../models/Job.model");
    this.application = require("../models/Application.model");
    this.request = require("../models/Request.model");
  }

  async getAllJobs(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "candidate") {
        return handlers.response.unauthorized({
          res,
          message: "Only candidates can access.",
        });
      }

      const jobs = await this.job
        .find({ status: "active" })
        .populate("organizationId");

      if (!jobs) {
        return handlers.response.unavailable({
          res,
          message: "No jobs available.",
        });
      }

      return handlers.response.success({
        res,
        message: "Jobs retrieved successfully.",
        data: jobs,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getJobById(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "candidate") {
        return handlers.response.unauthorized({
          res,
          message: "Only candidates can access.",
        });
      }

      const { id } = req.params;

      const job = await this.job
        .findById(id)
        .populate("organizationId")
        .populate("recruiterId");

      if (!job) {
        return handlers.response.notFound({
          res,
          message: "Job not found.",
        });
      }

      return handlers.response.success({
        res,
        message: "Job retrieved successfully.",
        data: job,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async applyForJob(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "candidate") {
        return handlers.response.unauthorized({
          res,
          message: "Only candidates can apply for jobs.",
        });
      }

      const { id } = req.params;
      const { note } = req.body;
      const job = await this.job.findOne({ _id: id, status: "active" });

      if (!job) {
        return handlers.response.notFound({
          res,
          message: "Job not found.",
        });
      }

      let cv = null;
      if (req.files?.cv?.[0]) {
        const file = req.files.cv[0];
        const folder = file.uploadFolder;
        const filename = file.savedFilename;
        cv = `uploads/${folder}/${filename}`.replace(/\\/g, "/");
      }

      const application = await this.application.create({
        organizationId: job.organizationId,
        candidateId: user._id,
        jobId: job._id,
        status: "applied",
        cv: cv,
        note: note.trim() || "",
      });

      await application.save();

      // Send email notification to the recruiter
      const recruiter = await this.user.findById(job.recruiterId);
      if (recruiter) {
        sendEmail({
          to: recruiter.email,
          subject: `New Application for ${job.title}`,
          text: `Candidate ${user.name} has applied for the job ${job.title}.`,
        });
      }

      return handlers.response.success({
        res,
        message: "Application submitted successfully.",
        data: application,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getAllApplications(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "candidate") {
        return handlers.response.unauthorized({
          res,
          message: "Only candidates can access.",
        });
      }

      const applications = await this.application
        .find({ candidateId: user._id })
        .populate("jobId")
        .populate("organizationId");

      if (!applications) {
        return handlers.response.unavailable({
          res,
          message: "No applications found.",
        });
      }

      return handlers.response.success({
        res,
        message: "Applications retrieved successfully.",
        data: applications,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getApplicationById(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "candidate") {
        return handlers.response.unauthorized({
          res,
          message: "Only candidates can access.",
        });
      }

      const { id } = req.params;

      const application = await this.application
        .findById(id)
        .populate("jobId")
        .populate("organizationId");

      if (!application) {
        return handlers.response.notFound({
          res,
          message: "Application not found.",
        });
      }

      return handlers.response.success({
        res,
        message: "Application retrieved successfully.",
        data: application,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }
}

module.exports = new Service();
