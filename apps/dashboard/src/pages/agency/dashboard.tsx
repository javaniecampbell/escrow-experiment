import DeliveredMilestones from "@/components/platform/milestones/DeliveredMilestones";
import MilestonesWithPreviews from "@/components/platform/milestones/MilestonesWithPreviews";
import MilestonesWithUpcomingPayouts from "@/components/platform/milestones/MilestonesWithUpcomingPayouts";
import ProjectList from "@/components/platform/projects/ProjectList";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import TotalEscrowed from "@/components/platform/escrow/TotalEscrowed";
import TotalPayouts from "@/components/platform/escrow/TotalPayouts";
import Sidebar from "@/components/sidebar";
import React from "react";

function Dashboard() {
  return (
    <div className="grid cols-3 gap-1">
      <Sidebar id="1" type="agency" />
      <div className="grid grid-cols-3 gap-1  p-4">
        <ProjectOverview />
        <TotalEscrowed />
        <TotalPayouts />
        <DeliveredMilestones />
        <MilestonesWithPreviews />
        <MilestonesWithUpcomingPayouts />
      </div>
      <ProjectList />
    </div>
  );
}

export default Dashboard;
