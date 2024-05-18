import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { client, e } from "@acme/db";
import { getTasksSchema } from "@acme/validators";

import { publicProcedure } from "../trpc";
import { octo } from "./octo";

export const issueRouter = {
  byRepo: publicProcedure.input(z.object({ repo: z.string(), owner: z.string() })).query(async ({ input }) => {
    const owner = await octo.users.getByUsername({ username: input.owner });
    const issues = await octo.issues.listForRepo(input);

    return { issues: issues.data, owner: owner.data };
  }),
  generateGravitas: publicProcedure.query(async () => {
    const issues = await e
      .select(e.Issue, () => ({
        id: true,
        reactions: { total_count: true },
        comments: true,
        repo: {
          stargazersCount: true,
        },
      }))
      .run(client);

    //Gravitas algo

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

    const issuesWithScores = issues.map((issue) => {
      const score =
        (issue?.reactions?.total_count ?? 0) * 0.5 +
        (issue.comments ?? 0) * 0.3 +
        Math.log(issue.repo.stargazersCount ?? 0 + 1) * 0.2;
      return { id: issue.id, score: score };
    });
    return query.run(client, { issues: issuesWithScores });
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input }) => {
    const query = e.select(e.Issue, (issue) => ({
      title: true,
      body: true,
      filter_single: { id: input },
    }));
    return query.run(client);
  }),
  all: publicProcedure.input(getTasksSchema).query(async ({ ctx, input }) => {
    const { page, per_page, sort, title, topic, from, to } = input;

    const [column, order] = (sort?.split(".").filter(Boolean) ?? ["createdAt", "desc"]) as [
      keyof any | undefined,
      "asc" | "desc" | undefined,
    ];

    const offset = (page - 1) * per_page;

    const topics = topic?.split(".") ?? [];

    const makeTopicFilter = (topics: string[]) =>
      e.shape(e.Issue, (issue) => {
        const topicsSet = e.set(...topics.map((topic) => e.str(topic)));
        return {
          filter: e.op(e.count(e.op(topicsSet, "intersect", issue.repo.topics.name)), ">", 0),
        };
      });
    const issues = e.select(e.Issue, (issue) => {
      //TODO larges repos are fucking the general view
      const ops = [e.op(issue.repo.name, "!=", "prisma")] as any;
      if (title) ops.push(e.ext.pg_trgm.word_similar(title, issue.title));
      if (topics.length > 0) {
        const topicFilter = makeTopicFilter(topics)(issue).filter;
        ops.push(topicFilter);
      }

      const columns = {
        reactions_total_count: issue.reactions.total_count,
        gravitas_score: issue.gravitas.score,
      };
      const expression = columns[column as keyof typeof columns] ?? issue.created_at;

      return {
        id: true,
        title: true,
        labels: {
          name: true,
        },
        html_url: true,
        reactions: {
          total_count: true,
          heart: true,
          rocket: true,
          eyes: true,
          laugh: true,
          minusOne: true,
          plusOne: true,
        },
        created_at: true,
        gravitas_scores: true,
        gravitas: {
          score: true,
        },
        repo: {
          id: true,
          name: true,
          stargazersCount: true,
          topics: {
            name: true,
          },
          owner: {
            name: true,
            avatar_url: true,
            html_url: true,
          },
        },
        filter: ops.length ? e.all(e.set(...ops)) : e.bool(true),
        order_by: {
          expression,
          direction: order === "asc" ? "ASC" : "DESC",
          empty: "EMPTY FIRST",
        },
        limit: per_page,
        offset,
      };
    });
    const totalQuery = e.select({
      total: e.count(
        e.select(e.Issue, (issue) => {
          const ops = [];
          if (title) ops.push(e.op(issue.title, "ilike", `%${title}%`));
          if (topics.length > 0) {
            const topicFilter = makeTopicFilter(topics)(issue).filter;
            ops.push(topicFilter);
          }

          return {
            filter: ops.length ? e.all(e.set(...ops)) : e.bool(true),
          };
        }),
      ),
    });

    const { total } = await totalQuery.run(client);
    const result = await issues.run(client);
    const pageCount = Math.ceil(total / per_page);

    return { data: result, pageCount };
  }),
} satisfies TRPCRouterRecord;
