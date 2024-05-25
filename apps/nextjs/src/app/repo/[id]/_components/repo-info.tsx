import type { RouterOutputs } from "@acme/api";
import { Badge } from "@acme/ui/badge";
import { Card } from "@acme/ui/card";
import { CalendarIcon, CodeIcon, EyeOpenIcon, StarIcon } from "@radix-ui/react-icons";
import React from "react";
import Readme from "./readme";

export type Repo = RouterOutputs["repo"]["byId"];

const RepoInfo = ({ data }: { data: Repo }) => {
  const updatedAt = data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-4 w-4" />
                  <span>{data.stargazersCount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitForkIcon className="h-4 w-4" />
                  <span>{data.forksCount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <EyeOpenIcon className="h-4 w-4" />
                  <span>{data.watchersCount?.toLocaleString()}</span>
                </div>
                {data.subscribersCount && (
                  <div className="flex items-center space-x-1">
                    <DoorOpenIcon className="h-4 w-4" />
                    <span>{data.subscribersCount?.toLocaleString()}</span>
                  </div>
                )}
                <div>
                  <span>Updated on {updatedAt}</span>
                </div>
              </div>
            </div>
            {/* <Button className="px-4 py-2 text-sm" variant="outline">
                <StarIcon className="mr-2 h-4 w-4" />
                Star
              </Button> */}
          </div>
          <div>
            <p>Description: </p>
            <p className="text-muted-foreground">{data.description || "No description provided."}</p>
          </div>
        </div>
        <Card className="rounded-lg  h-auto border bg-background p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CodeIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{data.language}</span>
              </div>
              <Badge className="px-2 py-1 text-xs" variant="secondary">
                Language
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 " />
                <span className="text-sm font-medium">{updatedAt}</span>
              </div>
              <Badge className="px-2 py-1 text-xs" variant="secondary">
                Last updated
              </Badge>
            </div>
          </div>
        </Card>
      </div>
      {data.base64Readme && <Readme readme={data.base64Readme} />}
    </div>
  );
};

export default RepoInfo;

const DoorOpenIcon = (props: any) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
    </svg>
  );
};
const GitForkIcon = (props: any) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
      <path d="M12 12v3" />
    </svg>
  );
};
