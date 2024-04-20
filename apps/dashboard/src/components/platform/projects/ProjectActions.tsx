// ProjectActions.js
import React, { use, useEffect, useState } from "react";
import useStore from "@/shared/store";

type Props = {
  projectId: string | number | null;
};

const ProjectActions = ({ projectId }: Props) => {
  const {
    selectedProject,
    selectProject,
    addMilestone,
    markMilestoneDelivered,
    requestPayout,
  } = useStore();
  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneAmount, setMilestoneAmount] = useState("");

  // useEffect(() => {
  //   selectProject(projectId);
  // }, []);
  // Handle creating a new milestone
  const handleCreateMilestone = () => {
    if (milestoneName && milestoneAmount) {
      // Add the milestone to the selected project
      // Use a sheet or side panel to create a new milestone
      // addMilestone(selectedProject, milestoneName, parseFloat(milestoneAmount));
      setMilestoneName("");
      setMilestoneAmount("");
    }
  };

  // Handle marking a milestone as delivered
  const handleMarkDelivered = (milestoneId: string) => {
    markMilestoneDelivered(milestoneId);
  };

  // Handle requesting a payout
  const handleRequestPayout = () => {
    requestPayout(projectId);
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Project Actions</h2>
      {projectId ? (
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
              onClick={() => handleMarkDelivered("")}
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
