import { DataTableSkeleton } from "@acme/ui/data-table/data-table-skeleton";
import { CircleFadingPlus, Ship } from "lucide-react";
import { Suspense } from "react";
import { api } from "~/trpc/server";
import DefaultViews from "./_components/default-views";
import IssueTable from "./_components/issue-table";
import { issuesParamsCache } from "./params";

export interface IndexPageProps {
  searchParams: Record<string, string>;
}

export default function IndexPage({ searchParams }: IndexPageProps) {
  const search = issuesParamsCache.parse(searchParams);
  const issuesPromise = api.issue.all(search);

  return (
    <div className="flex flex-col gap-4 pt-4">
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
