import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { createRepoQuery } from "../queries";
import { publicProcedure } from "../trpc";
import { octo } from "./octo";

export const repoRouter = {
  createNewEntry: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const issues = await octo.issues.listForRepo(input);
      const repo = await octo.repos.get(input);

      await createRepoQuery(repo.data, issues.data);

      return { message: "Data saved successfully" };
    }),
} satisfies TRPCRouterRecord;
