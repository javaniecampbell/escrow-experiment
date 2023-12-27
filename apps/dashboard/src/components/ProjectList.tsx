// ProjectList.js
import React from 'react';
import useStore from '@/shared/store';

const ProjectList = () => {
  const { projects, addProject, selectProject } = useStore();

  const handleAddProject = () => {
    const newProject = { id: projects.length + 1, name: 'New Project' };
    addProject(newProject);
  };

const handleProjectClick = (projectId: number) => {
    selectProject(projectId);
    // You can navigate to a detailed view of the selected project
  };

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleProjectClick(project.id)}>
            {project.name}
          </li>
        ))}
      </ul>
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
};

export default ProjectList;
