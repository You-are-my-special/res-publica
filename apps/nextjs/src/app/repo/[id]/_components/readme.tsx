"use client";

import { Card } from "@acme/ui/card";
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import rehypeRaw from "rehype-raw";
const Readme = ({ readme }: { readme: string }) => {
  const content = atob(readme);
  const isLargeReadme = content.length > 500;
  const [collapsed, setCollapsed] = React.useState(isLargeReadme);

  useEffect(() => {}, []);
  return (
    <Card className={cn("relative p-6 pb-12", collapsed && isLargeReadme && "h-[50vh] overflow-hidden")}>
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkHtml]}
        className="prose dark:prose-invert max-w-none"
      >
        {atob(readme)}
      </Markdown>
      {isLargeReadme && collapsed && (
        <div className="absolute bottom-0 w-full left-0 bg-gradient-to-t from-background to-transparent py-12 flex justify-center">
          <Button variant="secondary" onClick={() => setCollapsed(false)}>
            Reveal full readme
          </Button>
        </div>
      )}
      {isLargeReadme && !collapsed && (
        <div className="absolute bottom-0 w-full left-0 bg-gradient-to-t from-background to-transparent py-12 flex justify-center">
          <Button variant="secondary" onClick={() => setCollapsed(true)}>
            Collapse readme
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Readme;
