// MilestonesWithUpcomingPayouts.js
import React from 'react';
import useStore from '@/shared/store';

const MilestonesWithUpcomingPayouts = () => {
  const { selectedProject, milestones } = useStore();

  // Filter milestones with upcoming payouts
  const milestonesWithUpcomingPayouts = milestones
    .filter((milestone) => milestone.projectId === selectedProject && !milestone.paidOut);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Milestones with Upcoming Payouts</h2>
      {selectedProject ? (
        <>
          {milestonesWithUpcomingPayouts.length > 0 ? (
            <ul>
              {milestonesWithUpcomingPayouts.map((milestone) => (
                <li key={milestone.id}>
                  <strong>{milestone.name}</strong> - Upcoming Payout
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No milestones have upcoming payouts.</p>
          )}
        </>
      ) : (
        <p className="text-gray-700">Select a project to view milestones with upcoming payouts.</p>
      )}
    </div>
  );
};

export default MilestonesWithUpcomingPayouts;
