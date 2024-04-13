// ClientDashboard.js
import React from "react";
import useStore from "@/shared/clientStore";
import ClientProjectsOverview from "./ClientProjectOverview";
import ClientProjects from "./platform/projects/ClientProjects";
import ClientPayments from "./platform/escrow/ClientPayments";
import ClientNotifications from "./platform/notifications/ClientNotifications";
import ClientProjectList from "./platform/projects/ClientProjectList";

const ClientDashboard = () => {
  const { projects: clientProjects } = useStore();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Client Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
        <div id="client-overview" className="grid gap-2 col-span-3">
          <ClientProjectsOverview />
          <ClientNotifications />
        </div>
        <div id="client-project-list" className="col-span-3">
          <ClientProjectList />
        </div>
      </div>

      {/* 
      <ClientProjects />
      <ClientPayments />
      <ClientNotifications /> */}
    </div>
  );
};

export default ClientDashboard;
