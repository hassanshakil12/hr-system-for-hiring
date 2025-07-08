class Controller {
  constructor() {
    this.service = require("../services/organization.service");
  }

  async createJob(req, res) {
    await this.service.createJob(req, res);
  }

  async getAllJobs(req, res) {
    await this.service.getAllJobs(req, res);
  }

  async getJobById(req, res) {
    await this.service.getJobById(req, res);
  }

  async updateJob(req, res) {
    await this.service.updateJob(req, res);
  }

  async deleteJob(req, res) {
    await this.service.deleteJob(req, res);
  }

  async getApplicationsByJobId(req, res) {
    await this.service.getApplicationsByJobId(req, res);
  }

  async getApplicationById(req, res) {
    await this.service.getApplicationById(req, res);
  }

  async getRecruiters(req, res) {
    await this.service.getRecruiters(req, res);
  }

  async getRecruiterById(req, res) {
    await this.service.getRecruiterById(req, res);
  }

  async sendRequestToRecruiter(req, res) {
    await this.service.sendRequestToRecruiter(req, res);
  }

  async getAcceptedRequests(req, res) {
    await this.service.getAcceptedRequests(req, res);
  }
}

module.exports = new Controller();
