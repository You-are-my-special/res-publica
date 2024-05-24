import React from "react";

import { api } from "~/trpc/server";
import IssueInfo from "./_components/issue-info";

interface IssuePageProps {
  params: {
    id: string;
  };
}
const IssuePage = async ({ params: { id } }: IssuePageProps) => {
  const issue = await api.issue.byId(id);
  if (!issue) return null;
  return <IssueInfo issue={issue} />;
};

export default IssuePage;
