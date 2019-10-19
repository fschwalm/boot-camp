const helpers = {
  getProjectByID(projects, id) {
    const project = projects.find(project => project.id == id);
    if (!project) {
        throw new Error("Project not found!");
    }
    return project;
  },
  getProjectIndexByID(projects, id) {
    return projects.findIndex(project => project.id == id);
  }
};

module.exports = helpers;
