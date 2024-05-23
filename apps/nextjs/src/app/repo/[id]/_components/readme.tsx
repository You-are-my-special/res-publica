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
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16 dark:bg-gray-950 dark:text-gray-50 max-w-xl">
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">README</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Read More
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
        </div>
      </div>
    </div>
  );
};

export default Readme;
