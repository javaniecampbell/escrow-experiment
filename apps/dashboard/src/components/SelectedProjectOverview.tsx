// ProjectOverview.js
import React from 'react';
import useStore from '@/shared/store';

const ProjectOverview = () => {
  const { selectedProject, projects } = useStore();

  // Find the selected project
  const project = projects.find((p) => p.id === selectedProject);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Project Overview</h2>
      {selectedProject ? (
        <>
          <h3 className="text-md font-semibold">{project.name}</h3>
          <p className="text-gray-700">{project.description}</p>
          {/* Add more project details here */}
        </>
      ) : (
        <p className="text-gray-700">Select a project to view its overview.</p>
      )}
    </div>
  );
};

export default ProjectOverview;
