import React from "react";

import { api } from "~/trpc/server";
import IssueTable from "./_components/issue-table";

const MainPage = async () => {
  const { issues, owner } = await api.issue.byRepo({
    owner: "steven-tey",
    repo: "novel",
  });

  return <IssueTable owner={owner} issues={issues} />;
};

export default MainPage;
