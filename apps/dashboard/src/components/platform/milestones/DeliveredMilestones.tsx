// DeliveredMilestones.js
import React from "react";
import useStore from "@/shared/store";

const DeliveredMilestones = () => {
  const { selectedProject, milestones } = useStore();

  // Filter milestones that have been delivered
  const deliveredMilestones = milestones.filter(
    (milestone) =>
      milestone.projectId === selectedProject && milestone.delivered
  );

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Delivered Milestones</h2>
      {selectedProject ? (
        <>
          {deliveredMilestones.length > 0 ? (
            <ul>
              {deliveredMilestones.map((milestone) => (
                <li key={milestone.id}>
                  <strong>{milestone.name}</strong> - Delivered
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">
              No milestones have been delivered yet.
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-700">
          Select a project to view delivered milestones.
        </p>
      )}
    </div>
  );
};

export default DeliveredMilestones;
