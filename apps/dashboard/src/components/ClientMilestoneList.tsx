// ClientMilestoneList.js
import React from "react";
import useStore from "@/shared/store";

const ClientMilestoneList = () => {
  const { clientProjects } = useStore();
  const selectedProject = ""; // Set the selected project here

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Milestones</h2>
      {selectedProject ? (
        <ul className="list-disc pl-6">
          {clientProjects
            .find((project) => project.id === selectedProject)
            .milestones.map((milestone) => (
              <li key={milestone.id} className="mb-4">
                <h3 className="text-md font-semibold">{milestone.name}</h3>
                <p>Description: {milestone.description}</p>
                <p>Status: {milestone.status}</p>
                <p>Balance: ${milestone.balance.toFixed(2)}</p>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-700">Select a project to view milestones.</p>
      )}
    </div>
  );
};

export default ClientMilestoneList;
