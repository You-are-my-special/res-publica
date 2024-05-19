import type { TRPCRouterRecord } from "@trpc/server";

import { client } from "@acme/db";
import { createAI } from "@edgedb/ai";
import { publicProcedure } from "../trpc";

export const aiRouter = {
  queryWithAI: publicProcedure.query(async ({ input }) => {
    const gpt4AI = createAI(client, {
      model: "gpt-4-turbo-preview",
    });
    const issueRag = gpt4AI.withContext({
      query: "select Issue",
    });

    console.log(await issueRag.queryRag("Worst next issu?"));
  }),
} satisfies TRPCRouterRecord;
