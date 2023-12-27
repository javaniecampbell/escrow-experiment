// ClientReleaseEscrow.js
import React, { useState } from 'react';
import useStore from '@/shared/store';

const ClientReleaseEscrow = () => {
  const { clientProjects, releaseEscrow } = useStore();
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [released, setReleased] = useState(false);

  // Handle releasing escrowed funds
  const handleReleaseEscrow = () => {
    if (selectedMilestone) {
      releaseEscrow(selectedMilestone);
      setReleased(true);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Release Escrow</h2>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Select Milestone</h3>
        <select
          className="border rounded px-2 py-1 w-full"
          value={selectedMilestone}
          onChange={(e) => setSelectedMilestone(e.target.value)}
        >
          <option value="" disabled>
            Select Milestone
          </option>
          {clientProjects.map((project) =>
            project.milestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.name} - {milestone.status}
              </option>
            ))
          )}
        </select>
      </div>
      {selectedMilestone && (
        <div className="mb-4">
          <button
            className={`px-4 py-1 rounded ${
              selectedMilestone && !released ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleReleaseEscrow}
            disabled={!selectedMilestone || released}
          >
            {released ? 'Released' : 'Release Escrow'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientReleaseEscrow;
