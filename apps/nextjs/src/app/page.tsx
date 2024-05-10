import React from "react";

import { api } from "~/trpc/server";

const MainPage = async () => {
  const repos = await api.issue.all();
  const posts = await api.post.all();
  return (
    <div>
      {repos.data.map((repo) => (
        <div>{repo.name}</div>
      ))}
    </div>
  );
};

export default MainPage;
