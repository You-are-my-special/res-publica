import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { client, e } from "@acme/db";

import { mapData } from "../scrape/map";
import { createRepoQuery } from "../scrape/query";
import { publicProcedure } from "../trpc";
import { octo } from "./octo";

export const repoRouter = {
  createNewEntry: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const issues = await octo.paginate(octo.rest.issues.listForRepo, input);

      const repo = await octo.repos.get(input);
      const data = mapData(repo.data, issues);

      await createRepoQuery(data);
      return { message: "Data saved successfully" };
    }),
  getRepoFromGithub: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const repo = await octo.repos.get(input);

      return repo.data;
    }),
  topics: publicProcedure.query(({ ctx }) => {
    const topics = e.select(e.Topic, (topic) => ({
      name: topic.name,
    }));
    const data = topics.run(client);
    return data;
  }),
} satisfies TRPCRouterRecord;
