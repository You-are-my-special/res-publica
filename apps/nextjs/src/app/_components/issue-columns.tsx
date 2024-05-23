"use client";

import { StarIcon } from "@radix-ui/react-icons";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import * as React from "react";

import type { RouterOutputs } from "@acme/api";
import { Badge } from "@acme/ui/badge";
import { DataTableColumnHeader } from "@acme/ui/data-table/data-table-column-header";

import GravitasScore from "./gravitas";
import IssueColumnRepo from "./issue-column-repo";
import IssueColumnTitle from "./issue-column-title";
import TopReactions from "./top-reactions";

export type Issue = RouterOutputs["issue"]["all"]["data"][0];

const columnHelper = createColumnHelper<Issue>();
export const columns = [
  columnHelper.accessor("repo.stargazersCount", {
    header: ({ column }) => (
      <div className="pl-2">
        <DataTableColumnHeader column={column} title="Stars" />
      </div>
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-1 pl-2">
        <StarIcon className="h-4 w-4 text-[#e3b341]" />
        <span className="ml-1">{cell.getValue()}</span>
      </div>
    ),
  }),

  columnHelper.accessor("repo.name", {
    id: "repo.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Repo" />,
    cell: ({ row }) => {
      return <IssueColumnRepo row={row} />;
    },
  }),

  columnHelper.accessor("title", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <IssueColumnTitle row={row} />,
  }),
  columnHelper.accessor("repo.topics", {
    id: "topic",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Topics" />,
    cell: ({ cell }) => {
      const topics = cell.getValue();
      return (
        <div className="flex flex-wrap">
          {topics.slice(0, 1).map((topic) => (
            <Badge key={topic.name} variant="outline" className="text-muted-foreground">
              {topic.name}
            </Badge>
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor("reactions.total_count", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reactions" />,
    cell: ({ cell, row }) => {
      const reactions = row.original.reactions;
      return <TopReactions reactions={reactions} />;
    },
  }),
  columnHelper.accessor("gravitas.score", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gravitas" />,
    cell: ({ cell }) => <GravitasScore score={cell.getValue() ?? 0} />,
  }),
  // columnHelper.accessor("created_at", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   cell: ({ cell }) => formatDate(cell.getValue()!),
  // }),

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
];
