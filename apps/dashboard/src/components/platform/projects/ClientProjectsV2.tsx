// ClientProjects.js
import useClientStore from "@/shared/clientStore";
import React, { useState, useEffect } from "react";

const ClientProjects = () => {
  // const [projects, setProjects] = useState([]);
  const { projects } = useClientStore();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Fetch and set the client's projects
    // You can use an API call to retrieve project data
  }, []);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-4">
          <h3 className="text-md font-semibold">
            {project.name ?? project.title}
          </h3>
          <p className="text-sm text-gray-600">Status: {project.status}</p>
          <p className="text-sm text-gray-600">
            Milestones: {project.milestones.length}
          </p>
          <button
            className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mt-2"
            onClick={() => openProjectDetails(project)}
          >
            View Details
          </button>
        </div>
      ))}

      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Project Details</h2>
            <p>{selectedProject.title}</p>
            {/* Add more project details as needed */}
            <button
              className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 mt-2"
              onClick={closeProjectDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProjects;
