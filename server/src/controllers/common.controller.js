class Controller {
  constructor() {
    this.service = require("../services/common.service");
  }

  async getProfile(req, res) {
    await this.service.getProfile(req, res);
  }

  async updateProfile(req, res) {
    await this.service.updateProfile(req, res);
  }
}

module.exports = new Controller();
