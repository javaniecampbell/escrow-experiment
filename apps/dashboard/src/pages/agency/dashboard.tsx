import DeliveredMilestones from "@/components/DeliveredMilestones";
import MilestonesWithPreviews from "@/components/MilestonesWithPreviews";
import MilestonesWithUpcomingPayouts from "@/components/MilestonesWithUpcomingPayouts";
import ProjectList from "@/components/ProjectList";
import ProjectOverview from "@/components/ProjectOverview";
import TotalEscrowed from "@/components/TotalEscrowed";
import TotalPayouts from "@/components/TotalPayouts";
import React from "react";

function Dashboard() {
  return (
    <div className="grid grid cols-2 gap-1">
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
