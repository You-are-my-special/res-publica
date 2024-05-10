import type { TRPCRouterRecord } from "@trpc/server";
import { Octokit } from "@octokit/rest";

import { env } from "../env";
import { publicProcedure } from "../trpc";

export const issueRouter = {
  all: publicProcedure.query(({ ctx }) => {
    const gh = new Octokit({
      auth: env.GITHUB_TOKEN,
    });
    return gh.repos.listForUser({ username: "andrewdoro" });
  }),
} satisfies TRPCRouterRecord;
