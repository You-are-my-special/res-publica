"use client";

import * as React from "react";

import { DataTable } from "@acme/ui/data-table/data-table";

import type { RouterOutputs } from "@acme/api";
import TopicFilter from "~/app/_components/topic-filter";
import { useDataTable } from "~/hooks/use-data-table";
import type { api as serverType } from "~/trpc/server";
import RepoNameFilter from "./repo-name-filter";
import { columns } from "./repo-table-columns";

export type Repo = RouterOutputs["repo"]["all"]["data"][0];
interface RepoTableProps {
  tasksPromise: ReturnType<typeof serverType.repo.all>;
}

export function RepoTable({ tasksPromise }: RepoTableProps) {
  const { data, pageCount } = React.use(tasksPromise);

  const { table } = useDataTable({
    data,
    columns: columns as any,
    pageCount,
    enableAdvancedFilter: false,
    defaultPerPage: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <RepoNameFilter />
        <TopicFilter />
      </div>
      <DataTable table={table} />
    </div>
  );
}
