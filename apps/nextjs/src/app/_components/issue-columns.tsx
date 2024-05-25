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
    enableSorting: false,
  }),

  columnHelper.accessor("title", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <IssueColumnTitle row={row} />,
    enableSorting: false,
  }),
  columnHelper.accessor("repo.topics", {
    id: "topic",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Topics" />,
    cell: ({ cell }) => {
      const topics = cell.getValue();
      return (
        <div className="flex flex-wrap">
          {topics.slice(0, 1).map((topic) => (
            <Badge key={topic.name} variant="outline">
              {topic.name}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
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
];
