import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { db, dbQueryBuilder } from "@acme/db";

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
  repoInDb: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      dbQueryBuilder;
      const issues = await octo.issues.listForRepo(input);
      const repo = await octo.repos.get({
        owner: input.owner,
        repo: input.repo,
      });

      await dbQueryBuilder.insert(dbQueryBuilder.GitHubRepo, {
        ...repo.data,
        issues: issues.data,
      });

      // dbQueryBuilder.insert(dbQueryBuilder.Issue, issues.data);
      // Save the data inside the db
      // await edgeClient.
      // saveData({ issues: issues.data, owner: owner.data });
      return { message: "Data saved successfully" };
    }),
} satisfies TRPCRouterRecord;
