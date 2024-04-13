// ClientProjectOverview.js
import React from "react";
import useStore from "@/shared/clientStore";

const ClientProjectOverview = () => {
  const { projects: clientProjects } = useStore();

  // Calculate project statistics
  const totalInEscrow = clientProjects.reduce(
    (total, project) => total + project.inEscrow,
    0
  );
  const totalPayouts = clientProjects.reduce(
    (total, project) => total + project.totalPayouts,
    0
  );
  const deliveredMilestones = clientProjects.reduce(
    (total, project) =>
      total +
      project.milestones.filter((milestone) => milestone.status === "Delivered")
        .length,
    0
  );
  const milestonesWithPreviews = clientProjects.reduce(
    (total, project) =>
      total +
      project.milestones.filter(
        (milestone) =>
          milestone.status === "Delivered" && milestone.previewed === true
      ).length,
    0
  );
  const upcomingPayouts = clientProjects.reduce(
    (total, project) =>
      total +
      project.milestones.filter(
        (milestone) =>
          milestone.status === "Delivered" && milestone.payoutDate >= new Date()
      ).length,
    0
  );

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Overview</h2>
      <div className="mb-4 grid gap-2 grid-cols-2 last:col-span-2">
        <div className="flex flex-col space-y-2 grid-item">
          <span className="text-3xl font-bold">
            ${totalInEscrow.toFixed(2)}
          </span>
          <span className="text-primary/25">Total in Escrow </span>
        </div>
        <div className="flex flex-col space-y-2 grid-item">
          <span className="text-3xl font-bold">${totalPayouts.toFixed(2)}</span>
          <span className="text-primary/25">Total Payouts</span>
        </div>
        <div className="flex flex-col space-y-2 grid-item">
          <span className="text-3xl font-bold">{deliveredMilestones}</span>
          <span className="text-primary/25">Milestones Delivered</span>
        </div>
        <div className="flex flex-col space-y-2 grid-item">
          <span className="text-3xl font-bold">{milestonesWithPreviews}</span>
          <span className="text-primary/25">Milestones with Previews </span>
        </div>
        <div className="flex flex-col space-y-2 grid-item col-span-2">
          <span className="text-3xl font-bold">{upcomingPayouts}</span>
          <span className="text-primary/25">Upcoming Payouts </span>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectOverview;
