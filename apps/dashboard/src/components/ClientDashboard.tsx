// ClientDashboard.js
import React from "react";
import useStore from "@/shared/clientStore";
import ClientProjectOverview from "./ClientProjectOverview";
import ClientProjects from "./ClientProjects";
import ClientPayments from "./ClientPayments";
import ClientNotifications from "./ClientNotifications";
import { MilestoneStepper } from "./MilestoneStepper";
import { ClientDetails } from "./ClientDetails";

const ClientDashboard = () => {
  const { projects: clientProjects } = useStore();

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Client Dashboard</h2>
      <div>
        {clientProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {clientProjects.map((project) => (
              <div
                key={project.id}
                className="flex justify-between border p-3 rounded"
              >
                <div className="flex flex-col w-3/4 gap-2">
                  <h3 className="text-md font-semibold mb-2">
                    {project.name ?? project.title}
                  </h3>
                  <p className="">{project.description}</p>
                  <div className="flex gap-2 w-full">
                    <p>Status: {project.status}</p>
                    <p>Balance: ${project.balance.toFixed(2)}</p>
                    <p>Total in Escrow: ${project.inEscrow.toFixed(2)}</p>
                    <p>Total Payouts: ${project.totalPayouts.toFixed(2)}</p>
                    <p>Number of Milestones: {project.milestones.length}</p>
                  </div>
                  <div className="w-full flex items-center ml-7 mb-8">
                    <MilestoneStepper />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-1/4">
                  <ClientDetails />
                  <div className="actions flex flex-col gap-1">
                    <button className="px-4 py-1 mt-2 border border-slate-500 bg-slate-300 text-gray-600 rounded hover:bg-slate-600 hover:text-white">
                      Contact
                    </button>
                    <button className="px-4 py-1 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">You don't have any active projects.</p>
        )}
      </div>

      {/* <ClientProjectOverview />
      <ClientProjects />
      <ClientPayments />
      <ClientNotifications /> */}
    </div>
  );
};

export default ClientDashboard;
