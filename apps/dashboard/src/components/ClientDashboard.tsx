// ClientDashboard.js
import React from "react";
import useStore from "@/shared/store";
import ClientProjectOverview from "./ClientProjectOverview";
import ClientProjects from "./ClientProjects";
import ClientPayments from "./ClientPayments";
import ClientNotifications from "./ClientNotifications";

const ClientDashboard = () => {
  const { clientProjects } = useStore();

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Client Dashboard</h2>
      {clientProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientProjects.map((project) => (
            <div key={project.id} className="border p-3 rounded">
              <h3 className="text-md font-semibold mb-2">{project.name}</h3>
              <p>Status: {project.status}</p>
              <p>Balance: ${project.balance.toFixed(2)}</p>
              <p>Total in Escrow: ${project.inEscrow.toFixed(2)}</p>
              <p>Total Payouts: ${project.totalPayouts.toFixed(2)}</p>
              <p>Number of Milestones: {project.milestones.length}</p>
              <button className="px-4 py-1 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">You don't have any active projects.</p>
      )}
      <ClientProjectOverview />
      <ClientProjects />
      <ClientPayments />
      <ClientNotifications />
    </div>
  );
};

export default ClientDashboard;
