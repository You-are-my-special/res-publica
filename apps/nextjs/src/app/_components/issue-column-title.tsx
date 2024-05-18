import type { Row } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";

import type { Issue } from "./task-table-columns";

interface IssueColumnTitleProps {
  row: Row<Issue>;
}
const IssueColumnTitle = ({ row }: IssueColumnTitleProps) => {
  const labels = row.original.labels;
  const relativeTime = formatRelative(row.original.created_at, new Date());
  return (
    <Link href={`/issue/${row.original.id}`}>
      <div className="group relative flex">
        <div className="absolute -left-1 top-0 z-0 size-full rounded-lg bg-accent opacity-0 group-hover:opacity-100" />

        <div className="relative flex flex-col gap-1">
          <span className="text-md max-w-[31.25rem] truncate font-medium">{row.getValue("title")}</span>
          <div className="flex items-center gap-1">
            <p className="text-xs text-muted-foreground">opened {relativeTime}</p>
            {labels.slice(0, 3).map((label) => (
              <Badge key={label.name} variant="outline" className="text-muted-foreground">
                {label.name}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 rounded-full group-hover:flex"
          onClick={(e) => {
            e.preventDefault();
            if (row.original.html_url) window.open(row.original.html_url, "_blank");
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

export default IssueColumnTitle;
