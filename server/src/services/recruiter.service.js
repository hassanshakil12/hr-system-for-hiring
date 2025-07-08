const { handlers } = require("../utils/handlers");
const sendEmail = require("../config/nodemailer");

class Service {
  constructor() {
    this.user = require("../models/User.model");
    this.job = require("../models/Job.model");
    this.application = require("../models/Application.model");
    this.request = require("../models/Request.model");
  }

  async getHiringRequests(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const requests = await this.request
        .find({ recruiterId: user._id, status: "Pending" })
        .populate("organizationId jobId");

      if (!requests) {
        return handlers.response.unavailable({
          res,
          message: "No hiring requests available.",
        });
      }

      return handlers.response.success({
        res,
        message: "Hiring requests retrieved successfully.",
        data: requests,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getHiringRequestById(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const { id } = req.params;
      const request = await this.request
        .findById(id)
        .populate("organizationId jobId");

      if (!request) {
        return handlers.response.unavailable({
          res,
          message: "Hiring request not found.",
        });
      }

      return handlers.response.success({
        res,
        message: "Hiring request retrieved successfully.",
        data: request,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async updateRequestStatus(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const { id } = req.params;
      const { status } = req.body;

      if (!["Accepted", "Rejected"].includes(status)) {
        return handlers.response.error({
          res,
          message: "Invalid status provided.",
        });
      }

      const request = await this.request
        .findByIdAndUpdate(id, { status, isCompleted: true }, { new: true })
        .populate("organizationId jobId");

      if (!request) {
        return handlers.response.unavailable({
          res,
          message: "Hiring request not found.",
        });
      }

      // Send email notification to the organization
      const organization = await this.user.findById(request.organizationId);
      if (organization && organization.email) {
        sendEmail({
          to: organization.email,
          subject: `Hiring Request ${status}`,
          text: `Your hiring request for job ${request.jobId.title} has been ${status}.`,
        });
      }

      return handlers.response.success({
        res,
        message: `Hiring request ${status.toLowerCase()} successfully.`,
        data: request,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getAcceptedRequests(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const requests = await this.request
        .find({ recruiterId: user._id, status: "Accepted" })
        .populate("organizationId jobId");

      if (!requests) {
        return handlers.response.unavailable({
          res,
          message: "No accepted hiring requests available.",
        });
      }

      return handlers.response.success({
        res,
        message: "Accepted hiring requests retrieved successfully.",
        data: requests,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async getAllApplications(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const applications = await this.application
        .find({ recruiterId: user._id })
        .populate("candidateId jobId organizationId");

      if (!applications || applications.length === 0) {
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

  async getApplicationsByJobId(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const { jobId } = req.params;
      const applications = await this.application
        .find({ jobId })
        .populate("candidateId");

      if (!applications) {
        return handlers.response.unavailable({
          res,
          message: "No applications found for this job.",
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
      if (!user || user.role !== "recruiter") {
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

  async updateApplicationStatus(req, res) {
    try {
      const user = req.user;
      if (!user._id || user.role !== "recruiter") {
        return handlers.response.unauthorized({
          res,
          message: "Only recruiters can access.",
        });
      }

      const { applicationId } = req.params;
      const { status } = req.body;

      if (!["shortlisted", "rejected"].includes(status)) {
        return handlers.response.error({
          res,
          message: "Invalid status provided.",
        });
      }

      const application = await this.application
        .findOneAndUpdate({ _id: applicationId }, { status }, { new: true })
        .populate("candidateId");

      if (!application) {
        return handlers.response.unavailable({
          res,
          message: "Application not found.",
        });
      }

      return handlers.response.success({
        res,
        message: `Application status updated to ${status}.`,
        data: application,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }
}

module.exports = new Service();
