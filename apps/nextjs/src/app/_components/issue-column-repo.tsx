import type { Row } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import Image from "next/image";
import type { Issue } from "./issue-columns";

interface IssueColumnRepoProps {
  row: Row<Issue>;
}
const IssueColumnRepo = ({ row }: IssueColumnRepoProps) => {
  const repo = row.original.repo;
  return (
    <Link href={`/repo/${repo.id}`}>
      <div className="group relative flex">
        <div className="absolute -left-1 top-0 z-0 size-full rounded-lg bg-accent opacity-0 group-hover:opacity-100" />

        <div className="relative flex w-36 items-center gap-2">
          <Image
            src={repo.owner.avatar_url || ""}
            alt={repo.owner.html_url || ""}
            width={24}
            height={24}
            className="h-8 w-8 flex-shrink-0 rounded-md"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold leading-none text-foreground">{repo.name}</p>
            <p className="text-muted-foreground">{repo?.owner.name}</p>
          </div>
        </div>
        <Button
          className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 rounded-full group-hover:flex"
          onClick={(e) => {
            e.preventDefault();
            if (repo.url) window.open(repo.url, "_blank");
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

export default IssueColumnRepo;
