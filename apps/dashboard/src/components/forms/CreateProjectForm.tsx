import { classNames } from "@/lib/utils";
import { Milestone, Project } from "@/shared/app.types";
import { useProjectStore } from "@/shared/clientStore";
import React, { useState } from "react";

const CreateProjectForm = () => {
  /**
   * This component is a form that allows users to create a new project.
   * It uses the useState hook to track the project name and description.
   * id: number | string;
   * title: string;
   * name?: string;
   * description?: string;
   * balance: number;
   * inEscrow: number;
   * totalPayouts: number;
   * milestones: Milestone[];
   * recentActivity: string[];
   * status: string;
   * clientId: number;
   * messages: string[];
   */
  // create state based on the project model
  const [id, idSet] = useState<number | string>("");
  const [title, titleSet] = useState<string>("");
  const [name, nameSet] = useState<string>("");
  const [description, descriptionSet] = useState<string>("");
  const [balance, balanceSet] = useState<number>(0);
  const [inEscrow, inEscrowSet] = useState<number>(0);
  const [totalPayouts, totalPayoutsSet] = useState<number>(0);
  const [milestones, milestonesSet] = useState<Milestone[]>([]);
  const [recentActivity, recentActivitySet] = useState<string[]>([]);
  const [status, statusSet] = useState<string>("");
  const [clientId, clientIdSet] = useState<number>(0);
  const [messages, messagesSet] = useState<string[]>([]);

  const addProject = useProjectStore((state) => state.addProject);

  // create a function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create a new project
      const response = await fetch("/api/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          projectTitle: title,
          projectName: name,
          description,
          balance,
          inEscrow,
          totalPayouts,
          milestones,
          recentActivity,
          status,
          clientId,
          messages,
        }),
      });

      const data = await response.json();
      console.log("Project created:", data);
      // You can redirect the user to another page or update the UI here
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // create a function to handle the form change
  const handleFormChange = (e) => {
    // Update the state based on the input field name
    switch (e.target.name) {
      case "projectName":
        nameSet(e.target.value);
        break;
      case "description":
        descriptionSet(e.target.value);
        break;
      case "balance":
        balanceSet(+e.target.value);
        break;
      case "inEscrow":
        inEscrowSet(+e.target.value);
        break;
      case "totalPayouts":
        totalPayoutsSet(+e.target.value);
        break;
      case "milestones":
        milestonesSet(e.target.value);
        break;
      case "recentActivity":
        recentActivitySet(e.target.value.split(","));
        break;
      case "status":
        statusSet(e.target.value);
        break;
      case "clientId":
        clientIdSet(+e.target.value);
        break;
      case "messages":
        messagesSet(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleAddProject = () => {
    // create a new project object with a unique ID
    const newProject = {
      id,
      title,
      name,
      description,
      balance,
      inEscrow,
      totalPayouts,
      milestones,
      recentActivity,
      status,
      clientId,
      messages,
    } satisfies Project;

    addProject(newProject);
    reset();
  };

  // create a function to handle the form reset
  const reset = () => {
    // Reset the form
    idSet("");
    titleSet("");
    nameSet("");
    descriptionSet("");
    balanceSet(0);
    inEscrowSet(0);
    totalPayoutsSet(0);
    milestonesSet([]);
    recentActivitySet([]);
    statusSet("");
    clientIdSet(0);
    messagesSet([]);
    // You can redirect the user to another page or update the UI here
  };

  const handleReset = (e) => {
    // Reset the form
    e.preventDefault();
    reset();
    console.log("Form reset");
  };

  return (
    <div
      className={classNames(
        "p-4"
        // "border border-gray-300 rounded"
      )}
    >
      {/* <h2 className="text-lg font-semibold mb-2">Create a New Project</h2> */}
      <form onSubmit={handleSubmit} id="create-project-form">
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-gray-700">
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={name}
            onChange={(e) => nameSet(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={description}
            onChange={(e) => descriptionSet(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="balance" className="block text-gray-700">
            Balance:
          </label>
          <input
            type="number"
            id="balance"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={balance}
            onChange={(e) => balanceSet(+e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inEscrow" className="block text-gray-700">
            In Escrow:
          </label>
          <input
            type="number"
            id="inEscrow"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={inEscrow}
            onChange={(e) => inEscrowSet(+e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalPayouts" className="block text-gray-700">
            Total Payouts:
          </label>
          <input
            type="number"
            id="totalPayouts"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={totalPayouts}
            onChange={(e) => totalPayoutsSet(+e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="milestones" className="block text-gray-700">
            Milestones:
          </label>
          <input
            type="text"
            id="milestones"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={milestones}
            onChange={(e) => milestonesSet(e.target.value)}
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="recentActivity" className="block text-gray-700">
            Recent Activity:
          </label>
          <input
            type="text"
            id="recentActivity"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={recentActivity}
            onChange={(e) => recentActivitySet(e.target.value.split(","))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">
            Status:
          </label>
          <select
            id="status"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={status}
            onChange={(e) => statusSet(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="paused">Paused</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="clientId" className="block text-gray-700">
            Client ID:
          </label>
          <input
            type="number"
            id="clientId"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={clientId}
            onChange={(e) => clientIdSet(+e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="messages" className="block text-gray-700">
            Messages:
          </label>
          <input
            type="text"
            id="messages"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={messages}
            onChange={(e) => messagesSet(e.target.value)}
          />
        </div> */}

        {/* <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Project
        </button> */}
      </form>
    </div>
  );
};

export default CreateProjectForm;
