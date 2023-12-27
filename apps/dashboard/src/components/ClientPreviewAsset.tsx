// ClientPreviewAsset.js
import React, { useState } from 'react';
import useStore from '@shared/store';

const ClientPreviewAsset = () => {
  const { clientProjects, markMilestonePreviewed } = useStore();
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [previewed, setPreviewed] = useState(false);

  // Handle marking a milestone as previewed
  const handlePreviewMilestone = () => {
    if (selectedMilestone) {
      markMilestonePreviewed(selectedMilestone);
      setPreviewed(true);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Preview Asset</h2>
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
              selectedMilestone && !previewed ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handlePreviewMilestone}
            disabled={!selectedMilestone || previewed}
          >
            {previewed ? 'Previewed' : 'Preview Milestone'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientPreviewAsset;
