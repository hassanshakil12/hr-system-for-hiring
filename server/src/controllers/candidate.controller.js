class Controller {
  constructor() {
    this.service = require("../services/candidate.service");
  }

  async getAllJobs(req, res) {
    await this.service.getAllJobs(req, res);
  }

  async getJobById(req, res) {
    await this.service.getJobById(req, res);
  }

  async applyForJob(req, res) {
    await this.service.applyForJob(req, res);
  }

  async getAllApplications(req, res) {
    await this.service.getAllApplications(req, res);
  }

  async getApplicationById(req, res) {
    await this.service.getApplicationById(req, res);
  }

  async getMyApplications(req, res) {
    await this.service.getMyApplications(req, res);
  }
}

module.exports = new Controller();
