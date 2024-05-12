import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { createRepoQuery } from "../queries";
import { publicProcedure } from "../trpc";
import { octo } from "./octo";

export const issueRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return octo.repos.listForUser({ username: "andrewdoro" });
  }),
  byRepo: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const owner = await octo.users.getByUsername({ username: input.owner });
      const issues = await octo.issues.listForRepo(input);

      return { issues: issues.data, owner: owner.data };
    }),
} satisfies TRPCRouterRecord;
