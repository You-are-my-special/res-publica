"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@acme/ui/badge";
import { Checkbox } from "@acme/ui/checkbox";
import { DataTableColumnHeader } from "@acme/ui/data-table/data-table-column-header";

import { formatDate } from "~/lib/utils";
import { Issue } from "./issue-table";

export function getColumns(): ColumnDef<Issue>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const label = row.original.labels[0];
        const text = typeof label === "string" ? label : label?.name;
        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{text}</Badge>}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "title",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Title" />
    //   ),
    //   cell: ({ row }) => {
    //     const label = tasks.label.enumValues.find(
    //       (label) => label === row.original.label,
    //     );

    //     return (
    //       <div className="flex space-x-2">
    //         {label && <Badge variant="outline">{label}</Badge>}
    //         <span className="max-w-[31.25rem] truncate font-medium">
    //           {row.getValue("title")}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Status" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = tasks.status.enumValues.find(
    //       (status) => status === row.original.status,
    //     );

    //     if (!status) return null;

    //     const Icon = getStatusIcon(status);

    //     return (
    //       <div className="flex w-[6.25rem] items-center">
    //         <Icon
    //           className="mr-2 size-4 text-muted-foreground"
    //           aria-hidden="true"
    //         />
    //         <span className="capitalize">{status}</span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    // {
    //   accessorKey: "priority",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Priority" />
    //   ),
    //   cell: ({ row }) => {
    //     const priority = tasks.priority.enumValues.find(
    //       (priority) => priority === row.original.priority,
    //     );

    //     if (!priority) return null;

    //     const Icon = getPriorityIcon(priority);

    //     return (
    //       <div className="flex items-center">
    //         <Icon
    //           className="mr-2 size-4 text-muted-foreground"
    //           aria-hidden="true"
    //         />
    //         <span className="capitalize">{priority}</span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
  ];
}
