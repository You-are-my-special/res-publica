"use client";

import * as React from "react";

import { DataTableAdvancedToolbar } from "@acme/ui/data-table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@acme/ui/data-table/data-table";
import { DataTableToolbar } from "@acme/ui/data-table/data-table-toolbar";
import { DataTableFilterField } from "@acme/ui/filters";

import { useDataTable } from "~/hooks/use-data-table";
import { getTasks } from "../actions";
import { Issue } from "./issue-table";
import { columns, getColumns } from "./task-table-columns";
import { TasksTableFloatingBar } from "./task-table-floating-bar";
import { useTasksTable } from "./task-table-provider";
import { TasksTableToolbarActions } from "./task-table-toolbar-actions";

interface TasksTableProps {
  tasksPromise: ReturnType<typeof getTasks>;
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useTasksTable();

  const { data, pageCount } = React.use(tasksPromise);

  // Memoize the columns so they don't re-render on every render

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Issue>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
    // {
    //   label: "Status",
    //   value: "status",
    //   options: tasks.status.enumValues.map((status) => ({
    //     label: status[0]?.toUpperCase() + status.slice(1),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     withCount: true,
    //   })),
    // },
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
  console.log(data);
  const { table } = useDataTable({
    data,
    columns: columns,
    pageCount,
    // optional props
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "created_at.desc",
  });

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes("floatingBar") ? (
          <TasksTableFloatingBar table={table} />
        ) : null
      }
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  );
}
