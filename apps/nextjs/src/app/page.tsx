import * as React from "react";

import { DataTableSkeleton } from "@acme/ui/data-table/data-table-skeleton";
import { searchParamsSchema } from "@acme/validators";

import { CircleFadingPlus, Ship } from "lucide-react";
import { api } from "~/trpc/server";
import DefaultViews from "./_components/default-views";
import { TasksTable } from "./_components/task-table";

export interface IndexPageProps {
  searchParams: Record<string, string>;
}

export default function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  const tasksPromise = api.issue.all(search);
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-bold">Github Issues</h1>
          <h3 className="text-2xl text-muted-foreground flex items-center gap-2">
            Exploration of <Ship className="inline-block" />
            sunken and <CircleFadingPlus className="inline-block" /> uroborus issues.
          </h3>
        </div>
        <DefaultViews />
      </div>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <TasksTable tasksPromise={tasksPromise} />
      </React.Suspense>
    </div>
  );
}
