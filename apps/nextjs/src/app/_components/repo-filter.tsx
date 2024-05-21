"use client";
import { DataTableFacetedFilter } from "@acme/ui/data-table/data-table-faceted-filter";
import { useQueryState } from "nuqs";
import React from "react";
import { api } from "~/trpc/react";
import { issuesParsers } from "../params";

const RepoFilter = () => {
  const { data: repos } = api.repo.filter.useQuery();
  const [values, setTopic] = useQueryState("repo", issuesParsers.topic);
  return (
    <DataTableFacetedFilter
      title="Repo"
      values={values}
      options={
        repos?.map(({ name }) => ({
          label: name,
          value: name,
        })) ?? []
      }
      onValuesChange={(values) => setTopic(values, { shallow: false })}
    />
  );
};

export default RepoFilter;
