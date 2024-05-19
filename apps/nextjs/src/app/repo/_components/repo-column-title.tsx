import type { Row } from "@tanstack/react-table";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@acme/ui/button";

import type { Repo } from "./task-table-columns";

interface RepoColumnTitleProps {
  row: Row<Repo>;
}
const RepoColumnTitle = ({ row }: RepoColumnTitleProps) => {
  return (
    <Link href={`/repo/${row.original.id}`}>
      <div className="group relative flex">
        <div className="absolute -left-1 top-0 z-0 size-full rounded-lg bg-accent opacity-0 group-hover:opacity-100" />

        <div className="relative flex flex-col gap-1">
          <span className="text-md max-w-[31.25rem] truncate font-medium">{row.getValue("name")}</span>
          <div className="flex items-center gap-1" />
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
};

export default RepoColumnTitle;
