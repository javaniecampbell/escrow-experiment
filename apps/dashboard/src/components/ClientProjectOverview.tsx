// ClientProjectOverview.js
import React from 'react';
import useStore from '@/shared/store';

const ClientProjectOverview = () => {
  const { clientProjects } = useStore();

  // Calculate project statistics
  const totalInEscrow = clientProjects.reduce((total, project) => total + project.inEscrow, 0);
  const totalPayouts = clientProjects.reduce((total, project) => total + project.totalPayouts, 0);
  const deliveredMilestones = clientProjects.reduce(
    (total, project) => total + project.milestones.filter((milestone) => milestone.status === 'Delivered').length,
    0
  );
  const milestonesWithPreviews = clientProjects.reduce(
    (total, project) =>
      total +
      project.milestones.filter(
        (milestone) => milestone.status === 'Delivered' && milestone.previewed === true
      ).length,
    0
  );
  const upcomingPayouts = clientProjects.reduce(
    (total, project) =>
      total +
      project.milestones.filter(
        (milestone) => milestone.status === 'Delivered' && milestone.payoutDate >= new Date()
      ).length,
    0
  );

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
      <div className="mb-4">
        <p>Total in Escrow: ${totalInEscrow.toFixed(2)}</p>
        <p>Total Payouts: ${totalPayouts.toFixed(2)}</p>
        <p>Milestones Delivered: {deliveredMilestones}</p>
        <p>Milestones with Previews: {milestonesWithPreviews}</p>
        <p>Upcoming Payouts: {upcomingPayouts}</p>
      </div>
    </div>
  );
};

export default ClientProjectOverview;
