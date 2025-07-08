const { handlers } = require("../utils/handlers");
const sendEmail = require("../config/nodemailer");

class Service {
  constructor() {
    this.user = require("../models/User.model");
    this.job = require("../models/Job.model");
    this.application = require("../models/Application.model");
    this.request = require("../models/Request.model");
  }

  async createJob(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const {
        title,
        description,
        location,
        employmentType,
        salaryRange,
        keywords,
      } = req.body;

      // Validate required fields
      if (
        !title ||
        !description ||
        !location ||
        !employmentType ||
        !salaryRange ||
        !keywords
      ) {
        return handlers.response.error({
          res,
          message: "All fields are required...",
        });
      }

      const orgUser = await this.user.findById(user._id);
      if (!orgUser || orgUser.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Invalid organization user",
        });
      }

      const job = await this.job.create({
        organizationId: user._id,
        title,
        description,
        location,
        employmentType,
        salaryRange,
        keywords,
      });

      return handlers.response.success({
        res,
        message: "Job created successfully.",
        data: job,
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "Job", message: error.message });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getAllJobs(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const jobs = await this.job.find().populate("organizationId");
      return handlers.response.success({
        res,
        message: "Jobs fetched successfully.",
        data: jobs,
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "Job", message: error.message });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getJobById(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const { id } = req.params;
      const job = await this.job.findById(id).populate("organizationId");

      if (!job) {
        return handlers.response.unavailable({
          res,
          message: "Job not found",
        });
      }

      return handlers.response.success({
        res,
        message: "Job fetched successfully.",
        data: job,
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "Job", message: error.message });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async updateJob(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const { id } = req.params;
      const updateData = req.body;

      const job = await this.job.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!job) {
        return handlers.response.unavailable({
          res,
          message: "Job not found for update",
        });
      }

      return handlers.response.success({
        res,
        message: "Job updated successfully.",
        data: job,
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "Job", message: error.message });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async deleteJob(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const { id } = req.params;

      const job = await this.job.findByIdAndDelete(id);
      if (!job) {
        return handlers.response.unavailable({
          res,
          message: "Job not found for deletion",
        });
      }

      return handlers.response.success({
        res,
        message: "Job deleted successfully.",
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "Job", message: error.message });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getApplicationsByJobId(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const { jobId } = req.params;
      const organizationId = req.user?._id; // assuming req.user is set via auth middleware

      // Validate job ownership
      const job = await this.job.findById(jobId);
      if (!job) {
        return handlers.response.unavailable({ res, message: "Job not found" });
      }

      if (String(job.organizationId) !== String(organizationId)) {
        return handlers.response.unauthorized({
          res,
          message: "You are not authorized to view applications for this job",
        });
      }

      const applications = await this.application
        .find({ jobId, organizationId })
        .populate("candidateId", "fullName email phoneNumber image bio");

      return handlers.response.success({
        res,
        message: "Applications fetched successfully",
        data: applications,
      });
    } catch (error) {
      handlers.logger.failed({
        objectType: "Application",
        message: error.message,
      });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getApplicationById(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can create jobs.",
        });
      }

      const { id } = req.params;
      const application = await this.application
        .findById(id)
        .populate("candidateId jobId organizationId");

      if (!application) {
        return handlers.response.unavailable({
          res,
          message: "Application not found",
        });
      }

      return handlers.response.success({
        res,
        message: "Application fetched successfully.",
        data: application,
      });
    } catch (error) {
      handlers.logger.failed({
        message: error.message,
      });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getRecruiters(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can access recruiters.",
        });
      }

      const recruiters = await this.user.find({ role: "recruiter" });
      return handlers.response.success({
        res,
        message: "Recruiters fetched successfully.",
        data: recruiters,
      });
    } catch (error) {
      handlers.logger.failed({
        objectType: "Recruiter",
        message: error.message,
      });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getRecruiterById(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can access recruiters.",
        });
      }

      const { id } = req.params;
      const recruiter = await this.user.findById(id);

      if (!recruiter || recruiter.role !== "recruiter") {
        return handlers.response.unavailable({
          res,
          message: "Recruiter not found",
        });
      }

      return handlers.response.success({
        res,
        message: "Recruiter fetched successfully.",
        data: recruiter,
      });
    } catch (error) {
      handlers.logger.failed({
        objectType: "Recruiter",
        message: error.message,
      });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async sendRequestToRecruiter(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can send requests to recruiters.",
        });
      }

      const { recruiterId } = req.params;
      const { jobId, message } = req.body;

      // Validate required fields
      if (!recruiterId || !message) {
        return handlers.response.error({
          res,
          message: "Recruiter ID and message are required.",
        });
      }

      const recruiter = await this.user.findById(recruiterId);
      if (!recruiter || recruiter.role !== "recruiter") {
        return handlers.response.unavailable({
          res,
          message: "Recruiter not found",
        });
      }

      const job = await this.job.findById(jobId);
      if (!job) {
        return handlers.response.unavailable({
          res,
          message: "Job not found",
        });
      }

      const request = await this.request.create({
        organizationId: user._id,
        recruiterId: recruiter._id,
        jobId: job._id,
        message,
      });

      // Send email notification to the recruiter
      await sendEmail({
        to: recruiter.email,
        subject: "New Request from Organization",
        text: `You have received a new request from ${user.fullName}: ${message}`,
      });

      return handlers.response.success({
        res,
        message: "Request sent successfully.",
        data: request,
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "Request", message: error.message });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getAcceptedRequests(req, res) {
    try {
      const user = req.user;
      if (!user || user.role !== "organization") {
        return handlers.response.error({
          res,
          message: "Only organization users can access accepted requests.",
        });
      }

      const requests = await this.request
        .find({ organizationId: user._id, status: "Accepted" })
        .populate("recruiterId jobId");

      if (!requests) {
        return handlers.response.unauthorized({
          res,
          message: "Requests not found.",
        });
      }

      return handlers.response.success({
        res,
        message: "Accepted requests fetched successfully.",
        data: requests,
      });
    } catch (error) {
      handlers.logger.failed({
        objectType: "Request",
        message: error.message,
      });
      return handlers.response.failed({ res, message: error.message });
    }
  }
}

module.exports = new Service();
