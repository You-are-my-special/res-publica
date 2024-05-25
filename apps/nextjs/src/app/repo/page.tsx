import * as React from "react";

import { DataTableSkeleton } from "@acme/ui/data-table/data-table-skeleton";

import { api } from "~/trpc/server";

import { reposParamsCache } from "../params";
import { RepoTable } from "./_components/repo-table";

export interface ReposPageProps {
  searchParams: Record<string, string>;
}

export default function ReposPage({ searchParams }: ReposPageProps) {
  const search = reposParamsCache.parse(searchParams);

  const tasksPromise = api.repo.all(search);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center py-4">
        <h1 className="text-4xl font-semibold">Github Repos</h1>
        <p className="text-muted-foreground">See people's dreams</p>
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
        <RepoTable tasksPromise={tasksPromise} />
      </React.Suspense>
    </div>
  );
}
