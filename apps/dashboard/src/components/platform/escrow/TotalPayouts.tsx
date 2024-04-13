// TotalPayouts.js
import React from "react";
import useStore from "@/shared/store";

const TotalPayouts = () => {
  const { selectedProject, milestones } = useStore();

  // Calculate the total payouts made
  const totalPayouts = milestones
    .filter((milestone) => milestone.projectId === selectedProject)
    .reduce((sum, milestone) => sum + milestone.payout, 0);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Total Payouts</h2>
      {selectedProject ? (
        <>
          <p className="text-gray-700">Total Payouts Made: ${totalPayouts}</p>
          <div className="mt-2">
            <h3 className="text-md font-semibold">Milestones:</h3>
            <ul className="list-disc ml-4">
              {milestones
                .filter((milestone) => milestone.projectId === selectedProject)
                .map((milestone) => (
                  <li key={milestone.id}>
                    {milestone.name} - ${milestone.payout}
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-700">
          Select a project to view the total payouts made.
        </p>
      )}
    </div>
  );
};

export default TotalPayouts;
