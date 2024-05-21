import React from "react";
import Markdown from "react-markdown";

import { api } from "~/trpc/server";

interface RepoPageProps {
  params: {
    id: string;
  };
}
const RepoPage = async ({ params: { id } }: RepoPageProps) => {
  const repo = await api.repo.byId(id);
  if (!repo) return null;

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
    </div>
  );
};

export default RepoPage;
