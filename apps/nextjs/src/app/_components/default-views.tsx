"use client";
import { Button } from "@acme/ui/button";
import type { GetIssuesSchema } from "@acme/validators";
import { RectangleVerticalIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import React, { type ReactNode } from "react";
import Prisma from "~/components/icons/prisma";
import ReactIcon from "~/components/icons/react";
import { issuesParsers } from "../params";

const DefaultViews = () => {
  return (
    <div className="flex gap-2">
      <DefaultView
        filters={{
          page: 1,
          per_page: 10,
          topic: ["react"],
          repo: [],
        }}
      >
        <ReactIcon />
        React
      </DefaultView>
      <DefaultView
        filters={{
          page: 1,
          per_page: 10,
          topic: ["prisma"],
          repo: [],
        }}
      >
        <Prisma />
        Prisma
      </DefaultView>
    </div>
  );
};

interface DefaultViewProps {
  children: ReactNode;
  filters: GetIssuesSchema;
}
const DefaultView = ({ children, filters }: DefaultViewProps) => {
  const [_, setParams] = useQueryStates(issuesParsers, { shallow: false });
  return (
    <Button variant="outline" className="gap-2 text-lg" onClick={() => setParams(filters)}>
      {children}
    </Button>
  );
};
export default DefaultViews;
