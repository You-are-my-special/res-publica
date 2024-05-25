import React from "react";
import { issuesParamsCache } from "~/app/params";

import { api } from "~/trpc/server";
import IssueTable from "./_components/issue-table";
import RepoInfo from "./_components/repo-info";

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
      <RepoInfo data={repo} />
      <div className="py-10">
        <IssueTable issuesPromise={issuesPromise} />
      </div>
    </div>
  );
};

export default RepoPage;
