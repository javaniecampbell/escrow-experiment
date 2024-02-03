// ClientProjectList.js
import React from "react";
import useStore from "@/shared/clientStore";

const ClientProjectList = () => {
  const { projects: clientProjects } = useStore();

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
      {clientProjects.length > 0 ? (
        <ul className="list-disc pl-6">
          {clientProjects.map((project) => (
            <li key={project.id} className="mb-3">
              <h3 className="text-md font-semibold">
                {project.name ?? project.title}
              </h3>
              <p>Status: {project.status}</p>
              <p>Balance: ${project.balance.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">You don't have any active projects.</p>
      )}
    </div>
  );
};

export default ClientProjectList;
