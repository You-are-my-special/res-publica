import React from "react";
import Markdown from "react-markdown";

import { api } from "~/trpc/server";

interface IssuePageProps {
  params: {
    id: string;
  };
}
const IssuePage = async ({ params: { id } }: IssuePageProps) => {
  const issue = await api.issue.byId(id);
  if (!issue) return null;
  return (
    <div>
      <p>{issue.title}</p>

      <Markdown className="prose dark:prose-invert max-w-none">
        {issue.body}
      </Markdown>
    </div>
  );
};

export default IssuePage;
