"use client";

import * as React from "react";

import { DataTable } from "@acme/ui/data-table/data-table";
import { DataTableToolbar } from "@acme/ui/data-table/data-table-toolbar";
import type { DataTableFilterField } from "@acme/ui/filters";

import type { RouterOutputs } from "@acme/api";
import { useDataTable } from "~/hooks/use-data-table-repo";
import { api } from "~/trpc/react";
import type { api as serverType } from "~/trpc/server";
import { columns } from "./task-table-columns";
import { TasksTableToolbarActions } from "./task-table-toolbar-actions";

export type Repo = RouterOutputs["repo"]["all"]["data"][0];
interface TasksTableProps {
  tasksPromise: ReturnType<typeof serverType.repo.all>;
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  const { data, pageCount } = React.use(tasksPromise);

  console.log("data", data);
  const { data: topics } = api.repo.topics.useQuery();

  const filterFields: DataTableFilterField<Omit<Repo, "languages" | "owner" | "topics" | "issues">>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns: columns as any,
    pageCount,
    filterFields: filterFields,
    enableAdvancedFilter: false,
    defaultPerPage: 10,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
