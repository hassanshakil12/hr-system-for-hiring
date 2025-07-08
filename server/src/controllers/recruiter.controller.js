class Controller {
  constructor() {
    this.service = require("../services/recruiter.service");
  }

  async getHiringRequests(req, res) {
    await this.service.getHiringRequests(req, res);
  }

  async getHiringRequestById(req, res) {
    await this.service.getHiringRequestById(req, res);
  }

  async updateRequestStatus(req, res) {
    await this.service.updateRequestStatus(req, res);
  }

  async getAcceptedRequests(req, res) {
    await this.service.getAcceptedRequests(req, res);
  }

  async getApplicationsByJobId(req, res) {
    await this.service.getApplicationsByJobId(req, res);
  }

  async getApplicationById(req, res) {
    await this.service.getApplicationById(req, res);
  }

  async updateApplicationStatus(req, res) {
    await this.service.updateApplicationStatus(req, res);
  }

  async getAllApplications(req, res) {
    await this.service.getAllApplications(req, res);
  }
}

module.exports = new Controller();
