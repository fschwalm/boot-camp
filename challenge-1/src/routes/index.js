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
  const { title } = req.body;
  const { project } = req;

  project.title = title;

  return res.send(project);
});

routes.delete("/projects/:id", middlewares.checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  projects.splice(helpers.getProjectIndexByID(projects, id), 1);
  return res.send();
});

routes.post(
  "/projects/:id/tasks",
  middlewares.checkIfProjectExists,
  (req, res) => {
    const { project } = req;
    const { title } = req.body;

    project.tasks.push(title);

    res.json(projects);
  }
);

module.exports = routes;
