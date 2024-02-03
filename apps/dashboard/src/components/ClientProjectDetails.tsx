// ClientProjectDetails.js
import React, { useState } from "react";
import useStore from "@/shared/clientStore";

const ClientProjectDetails = () => {
  const {
    projects: clientProjects,
    markMilestonePreviewed,
    releaseEscrow,
  } = useStore();
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [previewed, setPreviewed] = useState(false);
  const [released, setReleased] = useState(false);

  // Handle marking a milestone as previewed
  const handlePreviewMilestone = () => {
    if (selectedMilestone) {
      markMilestonePreviewed(selectedMilestone);
      setPreviewed(true);
    }
  };

  // Handle releasing escrowed funds
  const handleReleaseEscrow = () => {
    if (selectedMilestone) {
      releaseEscrow(selectedMilestone);
      setReleased(true);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Project Details</h2>
      {clientProjects.length > 0 ? (
        <>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Select Project</h3>
            <select
              className="border rounded px-2 py-1 w-full"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="" disabled>
                Select Project
              </option>
              {clientProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name ?? project.title}
                </option>
              ))}
            </select>
          </div>
          {selectedProject && (
            <>
              <div className="mb-4">
                <h3 className="text-md font-semibold">Milestones</h3>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={selectedMilestone}
                  onChange={(e) => setSelectedMilestone(e.target.value)}
                >
                  <option value="" disabled>
                    Select Milestone
                  </option>
                  {clientProjects
                    .find((project) => project.id === selectedProject)
                    ?.milestones.map((milestone) => (
                      <option key={milestone.id} value={milestone.id}>
                        {milestone.name} - {milestone.status}
                      </option>
                    ))}
                </select>
              </div>
              {selectedMilestone && (
                <div className="mb-4">
                  <button
                    className={`px-4 py-1 rounded ${
                      selectedMilestone && !previewed
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handlePreviewMilestone}
                    disabled={!selectedMilestone || previewed}
                  >
                    {previewed ? "Previewed" : "Preview Milestone"}
                  </button>
                  <button
                    className={`px-4 py-1 ml-4 rounded ${
                      selectedMilestone && !released
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleReleaseEscrow}
                    disabled={!selectedMilestone || released}
                  >
                    {released ? "Released" : "Release Escrow"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <p className="text-gray-700">You don't have any active projects.</p>
      )}
    </div>
  );
};

export default ClientProjectDetails;
