import DeliveredMilestones from "@/components/DeliveredMilestones";
import MilestonesWithPreviews from "@/components/MilestonesWithPreviews";
import MilestonesWithUpcomingPayouts from "@/components/MilestonesWithUpcomingPayouts";
import ProjectOverview from "@/components/ProjectOverview";
import TotalEscrowed from "@/components/TotalEscrowed";
import TotalPayouts from "@/components/TotalPayouts";
import React from "react";

function Dashboard() {
  return (
    <div>
      <ProjectOverview />
      <TotalEscrowed />
      <TotalPayouts />
      <DeliveredMilestones />
      <MilestonesWithPreviews />
      <MilestonesWithUpcomingPayouts /> 
    </div>
  );
}

export default Dashboard;
