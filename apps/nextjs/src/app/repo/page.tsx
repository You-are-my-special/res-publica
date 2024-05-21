import * as React from "react";

import { DataTableSkeleton } from "@acme/ui/data-table/data-table-skeleton";

import { api } from "~/trpc/server";

import TopicFilter from "../_components/topic-filter";
import { reposParamsCache } from "../params";
import { RepoTable } from "./_components/repo-table";

export interface ReposPageProps {
  searchParams: Record<string, string>;
}

export default function ReposPage({ searchParams }: ReposPageProps) {
  const search = reposParamsCache.parse(searchParams);

  const tasksPromise = api.repo.all(search);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <TopicFilter />
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
