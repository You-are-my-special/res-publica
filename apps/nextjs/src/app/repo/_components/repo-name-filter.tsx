"use client";
import { Input } from "@acme/ui/input";
import { useQueryState } from "nuqs";
import React from "react";
import { reposParsers } from "~/app/params";

const RepoNameFilter = () => {
  const [value, setValue] = useQueryState("name", reposParsers.name);
  return (
    <Input
      placeholder={"Filter by name"}
      value={value ?? ""}
      onChange={(event) => {
        const val = event.target.value;
        setValue(val === "" ? null : val, { shallow: false });
      }}
      className="h-8 w-40 lg:w-64"
    />
  );
};

export default RepoNameFilter;
