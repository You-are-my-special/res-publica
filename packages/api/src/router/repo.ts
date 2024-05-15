import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { createRepoQuery } from "../queries";
import { publicProcedure } from "../trpc";
import { octo } from "./octo";

export const repoRouter = {
  createNewEntry: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const issues = await octo.paginate(octo.rest.issues.listForRepo, input);

      const repo = await octo.repos.get(input);

      await createRepoQuery(repo.data, issues);

      return { message: "Data saved successfully" };
    }),
  getRepoFromGithub: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const repo = await octo.repos.get(input);

      return repo.data;
    }),
} satisfies TRPCRouterRecord;
