"use client";
import { DataTableFacetedFilter } from "@acme/ui/data-table/data-table-faceted-filter";
import { useQueryState } from "nuqs";
import React from "react";
import { api } from "~/trpc/react";
import { issuesParsers } from "../params";

const TopicFilter = () => {
  const { data: topics } = api.repo.topics.useQuery();
  const [values, setTopic] = useQueryState("topic", issuesParsers.topic);
  return (
    <DataTableFacetedFilter
      title="Topic"
      values={values}
      options={
        topics?.map(({ name }) => ({
          label: name,
          value: name,
        })) ?? []
      }
      onValuesChange={(values) => setTopic(values, { shallow: false })}
    />
  );
};

export default TopicFilter;
