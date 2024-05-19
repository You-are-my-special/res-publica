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
      <p>{repo.name}</p>

      <Markdown className="prose dark:prose-invert max-w-none">{/* {repo.base64Readme} */}</Markdown>
    </div>
  );
};

export default RepoPage;
