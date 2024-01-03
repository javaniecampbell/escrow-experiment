import React, { useEffect, useState } from "react";
import useStore from "@/shared/store";

const ProjectOverview = () => {
  const [projectOverview, setProjectOverview] = useState({
    totalEscrowed: 0,
    totalPayouts: 0,
    deliveredMilestones: 0,
    milestonesWithPreviews: 0,
    milestonesWithUpcomingPayouts: 0,
  });
  const { selectedProject, milestones } = useStore();

  useEffect(() => {
    // Calculate project overview information based on selected project and milestones
    if (selectedProject) {
      const projectMilestones = milestones.filter(
        (milestone) => milestone.projectId === selectedProject
      );
      const totalEscrowed = projectMilestones.reduce(
        (sum, milestone) => sum + milestone.amount,
        0
      );
      const totalPayouts = projectMilestones.reduce(
        (sum, milestone) => sum + milestone.payout,
        0
      );
      const deliveredMilestones = projectMilestones.filter(
        (milestone) => milestone.delivered
      ).length;
      const milestonesWithPreviews = projectMilestones.filter(
        (milestone) => milestone.hasPreview
      ).length;
      const milestonesWithUpcomingPayouts = projectMilestones.filter(
        (milestone) => !milestone.paidOut
      ).length;

      setProjectOverview({
        totalEscrowed,
        totalPayouts,
        deliveredMilestones,
        milestonesWithPreviews,
        milestonesWithUpcomingPayouts,
      });
    }
  }, [selectedProject, milestones]);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Project Overview</h2>
      {selectedProject ? (
        <div>
          <p className="text-gray-700">
            Total Escrowed Amount: ${projectOverview.totalEscrowed}
          </p>
          <p className="text-gray-700">
            Total Payouts: ${projectOverview.totalPayouts}
          </p>
          <p className="text-gray-700">
            Delivered Milestones: {projectOverview.deliveredMilestones}
          </p>
          <p className="text-gray-700">
            Milestones with Previews: {projectOverview.milestonesWithPreviews}
          </p>
          <p className="text-gray-700">
            Milestones with Upcoming Payouts:{" "}
            {projectOverview.milestonesWithUpcomingPayouts}
          </p>
        </div>
      ) : (
        <p className="text-gray-700">Select a project to view the overview.</p>
      )}
    </div>
  );
};

export default ProjectOverview;
