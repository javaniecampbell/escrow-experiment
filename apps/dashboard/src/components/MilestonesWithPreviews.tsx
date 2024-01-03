// MilestonesWithPreviews.js
import React from "react";
import useStore from "@/shared/store";

const MilestonesWithPreviews = () => {
  const { selectedProject, milestones } = useStore();

  // Filter milestones with previews
  const milestonesWithPreviews = milestones.filter(
    (milestone) =>
      milestone.projectId === selectedProject && milestone.hasPreview
  );

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Milestones with Previews</h2>
      {selectedProject ? (
        <>
          {milestonesWithPreviews.length > 0 ? (
            <ul>
              {milestonesWithPreviews.map((milestone) => (
                <li key={milestone.id}>
                  <strong>{milestone.name}</strong> - Preview Available
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">
              No milestones have associated previews.
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-700">
          Select a project to view milestones with previews.
        </p>
      )}
    </div>
  );
};

export default MilestonesWithPreviews;
