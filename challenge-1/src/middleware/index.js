const helpers = require("../helpers");
const fakeData = require("../fakeData");

let { requestsNumber, projects } = fakeData;

const middlewares = {
  requestCounter(req, res, next) {
    console.log(++requestsNumber);
    next();
  },
  checkIfProjectExists(req, res, next) {
    const { id } = req.params;
    try {
      const project = helpers.getProjectByID(projects, id);
      req.project = project;
      next();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
};

module.exports = middlewares;
