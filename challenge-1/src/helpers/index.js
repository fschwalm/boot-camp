const helpers = {
  findProjectIndexByID(projects, id) {
    const index = projects.findIndex(project => project.id == id);
    if (index === -1) {
        throw new Error("Project ID not found!");
    }
    return index;
  }
};

module.exports = helpers;
