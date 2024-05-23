import type { TRPCRouterRecord } from "@trpc/server";

import { client, e } from "@acme/db";
import { createAI } from "@edgedb/ai";
import { env } from "../env";
import { publicProcedure } from "../trpc";

export const aiRouter = {
  queryWithAI: publicProcedure.query(async ({ input }) => {
    const res = await fetch("https://mydb--you-are-my-special.c-75.i.aws.edgedb.cloud:5656/branch/main/ai/embeddings", {
      method: "POST",
      body: JSON.stringify({ input: "Show me nextjs issues?", model: "text-embedding-3-small" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.EDGEDB_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    const result = await client.query(
      `
      with searchTerm := <array<float32>><json>$searchTerm
       select ext::ai::search(Issue, searchTerm) limit 5;
    `,
      { searchTerm: res.data[0].embedding as number[] },
    );
    console.log(result);
    // const query = e.select(e.ext.ai.search(e.Issue, e.set(...arrayEmbedding)));
    // console.log(await query.run(client));
    // const gpt4AI = createAI(client, {
    //   model: "gpt-4o",
    // });
    // const issueRag = gpt4AI.withContext({
    //   query: "select Issue}",
    // });

    // console.log(await issueRag.queryRag("Some issues about Nextjs?"));
  }),
} satisfies TRPCRouterRecord;
