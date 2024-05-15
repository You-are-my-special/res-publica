"use client";

import * as React from "react";

import { DataTableAdvancedToolbar } from "@acme/ui/data-table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@acme/ui/data-table/data-table";
import { DataTableToolbar } from "@acme/ui/data-table/data-table-toolbar";
import { DataTableFilterField } from "@acme/ui/filters";

import { useDataTable } from "~/hooks/use-data-table";
import { api } from "~/trpc/react";
import { getTasks, Issue } from "../actions";
import { columns } from "./task-table-columns";
import { useTasksTable } from "./task-table-provider";
import { TasksTableToolbarActions } from "./task-table-toolbar-actions";

interface TasksTableProps {
  tasksPromise: ReturnType<typeof getTasks>;
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useTasksTable();

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
          // icon: getStatusIcon(status),
          withCount: true,
        })),
      },
      // {
      //   label: "Priority",
      //   value: "priority",
      //   options: tasks.priority.enumValues.map((priority) => ({
      //     label: priority[0]?.toUpperCase() + priority.slice(1),
      //     value: priority,
      //     icon: getPriorityIcon(priority),
      //     withCount: true,
      //   })),
      // },
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
      {/* {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : ( */}
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </DataTableToolbar>
      {/* )} */}
    </DataTable>
  );
}
