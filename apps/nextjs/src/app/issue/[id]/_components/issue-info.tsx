import type { RouterOutputs } from "@acme/api";
import { Badge } from "@acme/ui/badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeOpenIcon,
  GitHubLogoIcon,
  HeartIcon,
  Link2Icon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import type { SVGProps } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export type Issue = RouterOutputs["issue"]["byId"];
const IssueInfo = ({ issue }: { issue: Issue }) => {
  if (!issue) return null;
  const createdAt = issue.created_at ? new Date(issue.created_at).toLocaleDateString() : null;

  return (
    <div className="dark:bg-gray-950 py-8 px-6">
      <div className="container mx-auto">
        <div className="rounded-lg dark:bg-gray-900 p-6 shadow">
          <div className="flex items-center space-x-4 pb-6">
            <Link className="font-medium" href={issue.repo.url || "#"}>
              <div className="flex flex-row space-x-2 gap-2">
                <GitHubLogoIcon className="h-6 w-6" />
                {issue?.repo?.name}
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <Link className="text-sm text-gray-400 hover:text-gray-300" href={issue.html_url || "#"}>
                <div className="flex flex-row space-x-2 gap-2">
                  <Link2Icon className="h-5 w-5" />
                  Link to the issue
                </div>
              </Link>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-white">{issue.title}</h1>
            <div className="flex items-center space-x-2">
              {issue.labels?.map((label) => (
                <Badge key={label.name} className="dark:bg-gray-800 text-gray-400" variant="secondary">
                  {label.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400">
              <ArrowUpIcon className="h-5 w-5" />
              <span>{issue.reactions?.plusOne}</span>
              <ArrowDownIcon className="h-5 w-5" />
              <span>{issue.reactions?.minusOne}</span>
              <LaughIcon className="h-5 w-5" />
              <span>{issue.reactions?.laugh}</span>
              <RocketIcon className="h-5 w-5" />
              <span>{issue.reactions?.rocket}</span>
              <HeartIcon className="h-5 w-5" />
              <span>{issue.reactions?.heart}</span>
              <EyeOpenIcon className="h-5 w-5" />
              <span>{issue.reactions?.eyes}</span>
            </div>
            <div className="text-sm dark:text-gray-400">Opened on {createdAt}</div>
          </div>
        </div>
        {issue?.body && (
          <div className="mt-6 rounded-lg dark:bg-gray-900 p-6 shadow">
            <Markdown rehypePlugins={[rehypeRaw]} className="prose dark:prose-invert max-w-none">
              {issue.body}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueInfo;

function LaughIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
