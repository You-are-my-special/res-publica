import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { client, e } from "@acme/db";

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
  generateGravitas: publicProcedure.query(async () => {
    const issues = await e.select(e.Issue).run(client);
    const query = e.params(
      {
        issues: e.array(
          e.tuple({
            id: e.uuid,
            score: e.float64,
          }),
        ),
      },
      (params) => {
        return e.for(e.array_unpack(params.issues), (issue) => {
          return e.update(e.Issue, () => ({
            filter_single: { id: issue.id },
            set: {
              gravitas_scores: {
                "+=": e.insert(e.Gravitas, { score: issue.score }),
              },
            },
          }));
        });
      },
    );

    const issuesWithScores = issues.map((issue) => ({
      id: issue.id,
      score: Math.random(),
    }));

    return query.run(client, { issues: issuesWithScores });
  }),
} satisfies TRPCRouterRecord;
