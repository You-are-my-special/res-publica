import * as React from "react";

import { DataTableSkeleton } from "@acme/ui/data-table/data-table-skeleton";
import { repoSearchParamsSchema } from "@acme/validators";

import { api } from "~/trpc/server";

import { TasksTable } from "./_components/task-table";

export interface ReposPageProps {
  searchParams: Record<string, string>;
}

export default function ReposPage({ searchParams }: ReposPageProps) {
  const search = repoSearchParamsSchema.parse(searchParams);

  // const test = api.repo.createNewEntry({ owner: "colinhacks", repo: "zod" });
  // const t = React.use(test);

  const tasksPromise = api.repo.all(search);

  return (
    <div className="gap-2">
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
