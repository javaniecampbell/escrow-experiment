import React from "react";

function ProjectForm() {
  return (
    <div>
      {" "}
      <h1>Create a New Project</h1>
      <form
        id="createProjectForm"
        action="http://localhost:3000/api/projects/create-project"
        method="POST"
      >
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="projectName" required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" required></textarea>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;
