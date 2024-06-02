import DeliveredMilestones from "@/components/platform/milestones/DeliveredMilestones";
import MilestonesWithPreviews from "@/components/platform/milestones/MilestonesWithPreviews";
import MilestonesWithUpcomingPayouts from "@/components/platform/milestones/MilestonesWithUpcomingPayouts";
import ProjectList from "@/components/platform/projects/ProjectList";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import TotalEscrowed from "@/components/platform/escrow/TotalEscrowed";
import TotalPayouts from "@/components/platform/escrow/TotalPayouts";
import Sidebar from "@/components/sidebar";
import React from "react";

function GlassCard({ className }: Readonly<{ className?: string }>) {
  return (
    <section
      id="header-bento"
      className={`backdrop-filter backdrop-blur-lg backdrop-saturate-[180%] bg-[rgba(17,_25,_40,_0.75)] rounded-[12px] border-[1px] border-[rgba(255,255,255,0.125)] text-white p-2 ${className}`}

      // style={{
      //   backdropFilter: "blur(16px) saturate(180%)",
      //   WebkitBackdropFilter: "blur(16px) saturate(180%)",
      //   backgroundColor: "rgba(17, 25, 40, 0.75)",
      //   borderRadius: "12px",
      //   border: "1px solid rgba(255, 255, 255, 0.125)",
      // }}
    >
      <header>
        <h3 className="text-2xl">Section</h3>
        <h4 className="text-base">Subtext</h4>
      </header>
      <div></div>
    </section>
  );
}

function OldLayout() {
  return (
    <div className="grid grid-cols-3 h-screen w-screen bg-slate-50">
      <div className="col-span-1">
        <GlassCard />
      </div>
      <div className="col-span-2">
        <ProjectOverview />
      </div>
    </div>
  );
}

function Archive() {
  return (
    <>
      <div
        className="grid grid-cols-3 gap-1 p-4 "
        style={
          {
            // backgroundImage:
            //   "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100)",
            //   backgroundRepeat: 'no-repeat',
            //   backgroundSize: 'cover',
          }
        }
      >
        <ProjectOverview />
        <TotalEscrowed />
        <TotalPayouts />
        <DeliveredMilestones />
        <MilestonesWithPreviews />
        <MilestonesWithUpcomingPayouts />
      </div>
      <ProjectList />
    </>
  );
}

function SevenBySixContainer() {
  return (
    <div className="grid col-span-3 grid-cols-7 grid-rows-6 gap-2">
      {/* Create an empty div with a color background for one cell in grid */}
      <div className="col-span-7 row-span-1 bg-purple-500 -mx-4 -mt-4" />
      <div className="col-span-3 row-span-1 bg-purple-500 rounded" />
      <div className="col-span-4 row-span-1 bg-purple-500 rounded" />
      <div className="col-span-1 row-span-1 bg-purple-500 rounded" />
      <div className="col-span-2 row-span-1 bg-purple-500 rounded" />
      <div className="col-span-3 row-span-1 bg-purple-500 rounded" />
      <div className="col-span-1 row-span-1 bg-purple-500 rounded" />
    </div>
  );
}

function PageContentGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 grid-rows-5 gap-4 rounded">
      <GlassCard className="row-span-2 rounded-lg" />
      <div className="row-span-3 grid grid-rows-7 gap-4">
        <GlassCard className="row-span-1 " />
        <GlassCard className="row-span-6" />
      </div>
      {/* {children} */}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="grid cols-3 gap-1 h-screen w-screen bg-slate-50 p-8 overflow-x-hidden" style={
      {
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100)",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
      }}>
      <Sidebar id="1" type="agency" />
      <PageContentGrid>
        <span></span>
      </PageContentGrid>
    </div>
  );
}

export default Dashboard;
