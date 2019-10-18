const express = require("express");
const helpers = require("../helpers");
const middlewares = require("../middleware");
const fakeData = require("../fakeData");

const routes = express.Router();

let { projects } = fakeData;

routes.post("/projects", (req, res) => {
  const { id, title, tasks = [] } = req.body;
  projects.push({
    id,
    title,
    tasks
  });
  return res.send(projects);
});

routes.get("/projects", (req, res) => {
  return res.json(projects);
});

routes.put("/projects/:id", middlewares.checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[helpers.findProjectIndexByID(projects, id)].title = title;

  return res.send(projects);
});

routes.delete("/projects/:id", middlewares.checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  projects.splice(helpers.findProjectIndexByID(projects, id), 1);
  return res.send();
});

routes.post(
  "/projects/:id/tasks",
  middlewares.checkIfProjectExists,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const index = helpers.findProjectIndexByID(projects, id);
    projects[index].tasks.push(title);

    res.json(projects);
  }
);

module.exports = routes;
