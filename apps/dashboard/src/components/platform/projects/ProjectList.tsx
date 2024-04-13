// ProjectList.js
import React from "react";
import useStore from "@/shared/store";
import { Project } from "@/shared/app.types";
import { useDialogStore } from "@/shared/dialogStore";
import BottomSheet from "../../global/bottom-sheet";
import CreateProjectForm from "../../forms/CreateProjectForm";

const ProjectList = () => {
  const { projects, addProject, selectProject } = useStore();
  const { createDialog, openDialog, closeDialog } = useDialogStore();
  const handleAddProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: "New Project",
      balance: 0,
      title: "New Project",
      inEscrow: 0,
      status: "Pending",
      totalPayouts: 0,
      milestones: [],
      clientId: 1,
    } satisfies Project;
    createDialog({
      title: "New Project",
      description: "Enter details for the new project",
      onConfirm: () => {
        addProject(newProject);
        closeDialog();
      },
      onCancel: () => {
        // Handle cancel action
        //addProject(newProject);
      },
    });
    openDialog();
  };

  const handleProjectClick = (projectId: number) => {
    selectProject(projectId);
    // You can navigate to a detailed view of the selected project
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1>Projects</h1>
          <button onClick={handleAddProject}>New Project</button>
        </div>
        <hr />
        <ul className="grid grid-cols-4 gap-2">
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => handleProjectClick(Number(project.id))}
              className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 cursor-pointer"
            >
              <p className="text-gray-800">{project.title ?? project.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <BottomSheet targetForm="create-project-form">
        <CreateProjectForm />
      </BottomSheet>
    </>
  );
};

export default ProjectList;
