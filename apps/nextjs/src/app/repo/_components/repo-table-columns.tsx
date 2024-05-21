"use client";

import { StarIcon } from "@radix-ui/react-icons";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import * as React from "react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { DataTableColumnHeader } from "@acme/ui/data-table/data-table-column-header";
import { Github } from "lucide-react";
import Link from "next/link";

export type Repo = RouterOutputs["repo"]["all"]["data"][0];

const columnHelper = createColumnHelper<Repo>();
export const columns = [
  columnHelper.accessor("stargazersCount", {
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
  // columnHelper.accessor("name", {
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  //   cell: ({ row }) => <RepoColumnTitle row={row} />,
  // }),

  columnHelper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Repo" className=" w-[100px]" />,
    cell: ({ row }) => {
      const owner = row.original.owner;

      return (
        <div className="flex w-36 items-center gap-2">
          <Image
            src={owner.avatar_url || ""}
            alt={owner.html_url || ""}
            width={24}
            height={24}
            className="h-8 w-8 flex-shrink-0 rounded-md"
          />
          <div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold leading-none text-foreground">{row.original.name}</p>
              <p className="text-muted-foreground">{owner.name}</p>
            </div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("description", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Repo" />,
    cell: ({ row }) => {
      return (
        <Link href={`/repo/${row.original.id}`}>
          <div className="group relative flex">
            <div className="absolute -left-1 top-0 z-0 size-full rounded-lg bg-accent opacity-0 group-hover:opacity-100" />

            <div className="relative  flex h-10 items-center">
              <p className=" w-[400px] pl-2 text-sm inline-block whitespace-nowrap text-ellipsis overflow-clip font-normal text-muted-foreground">
                {row.original.description}
              </p>
            </div>

            <Button
              className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 rounded-full group-hover:flex"
              onClick={(e) => {
                e.preventDefault();
                if (row.original.url) window.open(row.original.url, "_blank");
              }}
              size="icon"
              variant="outline"
            >
              <Github className="size-4" />
            </Button>
          </div>
        </Link>
      );
    },
  }),
  columnHelper.accessor("openIssuesCount", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Open Issues" />,
    cell: ({ cell }) => (
      <div className="flex items-center gap-1 pl-2">
        <span className="ml-1">{cell.getValue()}</span>
      </div>
    ),
  }),
];
