"use client";

import * as React from "react";

import { DataTable } from "@acme/ui/data-table/data-table";

import { DataTableViewOptions } from "@acme/ui/data-table/data-table-view-options";
import { useDataTable } from "~/hooks/use-data-table";
import type { api as serverType } from "~/trpc/server";
import { columns } from "./issue-columns";
import RepoFilter from "./repo-filter";
import TitleFilter from "./title-filter";
import TopicFilter from "./topic-filter";

interface IssueTableProps {
  issuesPromise: ReturnType<typeof serverType.issue.all>;
}

const IssueTable = ({ issuesPromise }: IssueTableProps) => {
  const { data, pageCount } = React.use(issuesPromise);

  const { table } = useDataTable({
    data,
    columns: columns as any,
    pageCount,
    enableAdvancedFilter: false,
    defaultPerPage: 10,
    defaultSort: "created_at.desc",
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <TitleFilter />
        <TopicFilter />
        <RepoFilter />
        <DataTableViewOptions table={table} />
      </div>
      <DataTable table={table} />
    </div>
  );
};
export default IssueTable;
