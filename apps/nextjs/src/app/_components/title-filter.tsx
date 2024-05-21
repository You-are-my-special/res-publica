"use client";
import { Input } from "@acme/ui/input";
import { useQueryState } from "nuqs";
import React from "react";
import { issuesParsers } from "../params";

const TitleFilter = () => {
  const [value, setValue] = useQueryState("title", issuesParsers.title);
  return (
    <Input
      placeholder={"Filter by title"}
      value={value}
      onChange={(val) => setValue(val.target.value, { shallow: false })}
      className="h-8 w-40 lg:w-64"
    />
  );
};

export default TitleFilter;
