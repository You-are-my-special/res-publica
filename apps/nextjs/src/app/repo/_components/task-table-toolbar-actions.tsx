"use client";

import type { Table } from "@tanstack/react-table";

import type { Repo } from "./task-table";

interface TasksTableToolbarActionsProps {
  table: Table<Repo>;
}

export function TasksTableToolbarActions({ table }: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "tasks",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button> */}
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
