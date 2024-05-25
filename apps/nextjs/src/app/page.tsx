import { DataTableSkeleton } from "@acme/ui/data-table/data-table-skeleton";
import { Suspense } from "react";
import { api } from "~/trpc/server";
import IssueTable from "./_components/issue-table";
import { issuesParamsCache } from "./params";

export interface IndexPageProps {
  searchParams: Record<string, string>;
}

export default function IndexPage({ searchParams }: IndexPageProps) {
  const search = issuesParamsCache.parse(searchParams);
  const issuesPromise = api.issue.all(search);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center py-4">
        <h1 className="text-4xl font-semibold">Github Issues</h1>
        <p className="text-muted-foreground"> Exploration of sunken and uroborus issues.</p>
      </div>
      <Suspense
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
        <IssueTable issuesPromise={issuesPromise} />
      </Suspense>
    </div>
  );
}
