import ClientMilestoneList from "@/components/ClientMilestoneList";
import { GetStaticProps } from "next";
import React from "react";

function ClientProjectMilestoneListPage({
  projectId,
}: ProjectMilestonesPageProps) {
  return (
    <div>
      <ClientMilestoneList projectId={projectId} />
    </div>
  );
}

type ProjectMilestonesPageProps = {
  projectId: string;
};
export const getStaticProps: GetStaticProps<
  ProjectMilestonesPageProps
> = async ({ params }) => {
  const projectId = params?.projectId as string;
  return {
    props: {
      projectId: projectId,
    },
  };
};

export const getStaticPaths = async () => {
  const projects = await fetch("http://localhost:3000/api/projects")
    .then((res) => res.json())
    .then((data) => data.projects);

  const paths = projects.map((project) => ({
    params: { projectId: project.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ClientProjectMilestoneListPage;
