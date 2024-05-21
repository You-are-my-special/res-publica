"use client";

import * as React from "react";

import { DataTable } from "@acme/ui/data-table/data-table";

import { useDataTable } from "~/hooks/use-data-table";
import type { api as serverType } from "~/trpc/server";
import { columns } from "./columns";

interface IssueTableProps {
  issuesPromise: ReturnType<typeof serverType.issue.all>;
}

const IssueTable = ({ issuesPromise }: IssueTableProps) => {
  const { data, pageCount } = React.use(issuesPromise);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    enableAdvancedFilter: false,
    defaultPerPage: 10,
    defaultSort: "created_at.desc",
  });

  return <DataTable table={table} />;
};
export default IssueTable;
