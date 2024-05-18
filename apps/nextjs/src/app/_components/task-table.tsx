"use client";

import * as React from "react";

import { DataTable } from "@acme/ui/data-table/data-table";
import { DataTableToolbar } from "@acme/ui/data-table/data-table-toolbar";
import type { DataTableFilterField } from "@acme/ui/filters";

import { useDataTable } from "~/hooks/use-data-table";
import { api } from "~/trpc/react";
import type { api as serverType } from "~/trpc/server";
import { type Issue, columns } from "./task-table-columns";
import { TasksTableToolbarActions } from "./task-table-toolbar-actions";

interface TasksTableProps {
  tasksPromise: ReturnType<typeof serverType.issue.all>;
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  const { data, pageCount } = React.use(tasksPromise);

  const { data: topics } = api.repo.topics.useQuery();

  const filterFields = React.useMemo(() => {
    const fields: DataTableFilterField<Issue>[] = [
      {
        label: "Title",
        value: "title",
        placeholder: "Filter titles...",
      },
      {
        label: "Topic",
        value: "topic",
        options: topics?.map((topic) => ({
          label: topic.name,
          value: topic.name,
          withCount: true,
        })),
      },
    ];
    return fields;
  }, [topics]);
  const { table } = useDataTable({
    data,
    columns: columns,
    pageCount,
    // optional props
    filterFields,
    enableAdvancedFilter: false,
    defaultPerPage: 10,
    defaultSort: "created_at.desc",
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
