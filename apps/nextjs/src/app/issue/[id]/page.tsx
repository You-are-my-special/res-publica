import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { api } from "~/trpc/server";
import IssueInfo from "./_components/IssueInfo";

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
