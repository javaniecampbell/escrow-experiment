// ClientFiles.js
import React from "react";
import useStore from "@/shared/store";

const ClientFiles = () => {
  const { clientProjects } = useStore();
  const [selectedProject, setSelectedProject] = React.useState("");
  const [selectedMilestone, setSelectedMilestone] = React.useState("");

  // Function to handle file download
  const handleDownload = (projectID, milestoneID, fileName) => {
    // Replace this with your actual file download logic
    console.log(
      `Downloading ${fileName} for Project ${projectID}, Milestone ${milestoneID}`
    );
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Files</h2>
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
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
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
            {clientProjects
              .find((project) => project.id === selectedProject)
              .milestones.map((milestone) => (
                <option key={milestone.id} value={milestone.id}>
                  {milestone.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedProject && selectedMilestone && (
        <div>
          <h3 className="text-md font-semibold">Available Files</h3>
          <ul className="list-disc pl-6">
            {/* Replace with your actual file list */}
            <li>
              <button
                className="text-blue-500 hover:underline"
                onClick={() =>
                  handleDownload(
                    selectedProject,
                    selectedMilestone,
                    "SampleFile.pdf"
                  )
                }
              >
                SampleFile.pdf
              </button>
            </li>
            <li>
              <button
                className="text-blue-500 hover:underline"
                onClick={() =>
                  handleDownload(
                    selectedProject,
                    selectedMilestone,
                    "ProjectDetails.docx"
                  )
                }
              >
                ProjectDetails.docx
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientFiles;
