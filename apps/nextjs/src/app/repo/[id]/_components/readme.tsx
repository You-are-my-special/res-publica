"use client";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
const Readme = ({ readme }: { readme: string }) => {
  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="md" variant="outline">
            Click here to see the README
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-[800px] h-[70%]">
          <DialogHeader>
            <DialogTitle>README</DialogTitle>
          </DialogHeader>
          <div className="overflow-scroll py-10">
            <Markdown rehypePlugins={[rehypeRaw]} className="prose dark:prose-invert max-w-none">
              {atob(readme)}
            </Markdown>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => {}}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Readme;
