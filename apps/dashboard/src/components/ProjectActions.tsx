// ProjectActions.js
import React, { useState } from 'react';
import useStore from '@/shared/store';

const ProjectActions = () => {
  const { selectedProject, addMilestone, markMilestoneDelivered, requestPayout } = useStore();
  const [milestoneName, setMilestoneName] = useState('');
  const [milestoneAmount, setMilestoneAmount] = useState('');

  // Handle creating a new milestone
  const handleCreateMilestone = () => {
    if (milestoneName && milestoneAmount) {
      addMilestone(selectedProject, milestoneName, parseFloat(milestoneAmount));
      setMilestoneName('');
      setMilestoneAmount('');
    }
  };

  // Handle marking a milestone as delivered
  const handleMarkDelivered = (milestoneId) => {
    markMilestoneDelivered(milestoneId);
  };

  // Handle requesting a payout
  const handleRequestPayout = () => {
    requestPayout(selectedProject);
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Project Actions</h2>
      {selectedProject ? (
        <>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Create New Milestone</h3>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Milestone Name"
                className="border rounded px-2 py-1 mr-2"
                value={milestoneName}
                onChange={(e) => setMilestoneName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                className="border rounded px-2 py-1"
                value={milestoneAmount}
                onChange={(e) => setMilestoneAmount(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleCreateMilestone}
              >
                Create
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Mark Milestone Delivered</h3>
            <button
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleMarkDelivered(selectedProject)}
            >
              Mark as Delivered
            </button>
          </div>
          <div>
            <h3 className="text-md font-semibold">Request Payout</h3>
            <button
              className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              onClick={handleRequestPayout}
            >
              Request Payout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-700">Select a project to perform actions.</p>
      )}
    </div>
  );
};

export default ProjectActions;
