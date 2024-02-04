// ClientDashboard.js
import React from "react";
import useStore from "@/shared/clientStore";
import ClientProjectsOverview from "./ClientProjectOverview";
import ClientProjects from "./ClientProjects";
import ClientPayments from "./ClientPayments";
import ClientNotifications from "./ClientNotifications";
import ClientProjectList from "./ClientProjectList";

const ClientDashboard = () => {
  const { projects: clientProjects } = useStore();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Client Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
        <div id="client-project-list" className="col-span-2">
          <ClientProjectList />
        </div>
        <div id="client-overview" className="grid gap-2">
          <ClientProjectsOverview />
          <ClientNotifications />
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
