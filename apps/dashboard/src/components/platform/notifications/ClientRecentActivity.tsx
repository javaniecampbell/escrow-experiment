// ClientRecentActivity.js
import React from "react";
import useStore from "@/shared/store";

const ClientRecentActivity = () => {
  const { clientProjects } = useStore();

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      {clientProjects.map((project) => (
        <div key={project.id} className="mb-4">
          <h3 className="text-md font-semibold">{project.name}</h3>
          <ul className="list-disc pl-6">
            {project.recentActivity.map((activity, index) => (
              <li key={index} className="mb-2">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClientRecentActivity;
