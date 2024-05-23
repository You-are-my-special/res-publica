import React from "react";
import Markdown from "react-markdown";
import { issuesParamsCache } from "~/app/params";

import { api } from "~/trpc/server";
import IssueTable from "./_components/issue-table";

interface RepoPageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
}
const RepoPage = async ({ params: { id }, searchParams }: RepoPageProps) => {
  const repo = await api.repo.byId(id);
  if (!repo) return null;

  const search = issuesParamsCache.parse(searchParams);
  const issuesPromise = api.issue.all({ ...search, ...(repo.name && { repo: [repo.name] }) });
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mb-7">{repo.name}</h1>
        <p className="mb-10">Description: {repo.description}</p>
      </div>

      <div>
        <p>Readme:</p>
        <div className="relative overflow-hidden h-[100px]">
          <Markdown className="prose dark:prose-invert max-w-none">
            {repo.base64Readme && atob(repo.base64Readme)}
          </Markdown>
        </div>
      </div>
      <div className="py-10">
        <IssueTable issuesPromise={issuesPromise} />
      </div>
    </div>
  );
};

export default RepoPage;
