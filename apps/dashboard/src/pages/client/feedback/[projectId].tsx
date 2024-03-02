import ClientFeedback from "@/components/ClientFeedback";
import { GetStaticProps } from "next";
import React from "react";

function ProjectFeedbackPage({ projectId }: ProjectFeedbackPageProps) {
  return (
    <div>
      <h1 className="">Project Feedback Page</h1>
      <ClientFeedback projectId={projectId} />
    </div>
  );
}

type ProjectFeedbackPageProps = {
  projectId: string;
};
export const getStaticProps: GetStaticProps<ProjectFeedbackPageProps> = async ({
  params,
}) => {
  const projectId = params?.projectId as string;
  return {
    props: {
      projectId: projectId,
    },
  };
};

export default ProjectFeedbackPage;
