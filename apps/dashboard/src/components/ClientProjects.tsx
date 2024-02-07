// ClientProjects.js
import React, { useState } from "react";
import ProjectActions from "./ProjectActions";

const ClientProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App Development",
      status: "Completed",
    },
    {
      id: 3,
      name: "E-commerce Platform",
      status: "In Progress",
    },
  ]);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Project Name</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-300 p-2">{project.name}</td>
              <td className="border border-gray-300 p-2">{project.status}</td>
              <td className="border border-gray-300 p-2">
                <ProjectActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientProjects;
