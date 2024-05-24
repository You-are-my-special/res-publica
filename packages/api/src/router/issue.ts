import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { client, e } from "@acme/db";
import { getIssuesSchema } from "@acme/validators";

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
        url: true,
        topics: {
          name: true,
        },
        owner: {
          name: true,
          avatar_url: true,
          html_url: true,
        },
      },
      filter_single: { id: input },
    }));
    return query.run(client);
  }),
  all: publicProcedure.input(getIssuesSchema).query(async ({ ctx, input }) => {
    const { page, per_page, title, topic, sort_col: column, sort_dir: order, repo } = input;

    const offset = (page - 1) * per_page;

    const makeTopicFilter = (topics: string[]) =>
      e.shape(e.Issue, (issue) => {
        const topicsSet = e.set(...topics.map((topic) => e.str(topic)));
        return {
          filter: e.op(e.count(e.op(topicsSet, "intersect", issue.repo.topics.name)), ">", 0),
        };
      });

    const makeRepoFilter = (repos: string[]) =>
      e.shape(e.Issue, (issue) => {
        const reposSet = e.set(...repos.map((topic) => e.str(topic)));
        return {
          filter: e.op(e.count(e.op(reposSet, "intersect", issue.repo.name)), ">", 0),
        };
      });
    const issues = e.select(e.Issue, (issue) => {
      const ops = [];
      if (title) ops.push(e.ext.pg_trgm.word_similar(title, issue.title));
      if (topic.length > 0) {
        const topicFilter = makeTopicFilter(topic)(issue).filter;
        ops.push(topicFilter);
      }
      if (repo.length > 0) {
        const repoFilter = makeRepoFilter(repo)(issue).filter;
        ops.push(repoFilter);
      }
      const columns = {
        repo_stargazersCount: issue.repo.stargazersCount,
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
          url: true,
          topics: {
            name: true,
          },
          owner: {
            name: true,
            avatar_url: true,
            html_url: true,
          },
        },
        filter: ops.length
          ? ops.reduce((merged, op) => (merged ? e.op(merged, "and", op) : (op as any)))
          : e.bool(true),
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
          if (title) ops.push(e.ext.pg_trgm.word_similar(title, issue.title));
          if (topic.length > 0) {
            const topicFilter = makeTopicFilter(topic)(issue).filter;
            ops.push(topicFilter);
          }
          if (repo.length > 0) {
            const repoFilter = makeRepoFilter(repo)(issue).filter;
            ops.push(repoFilter);
          }

          return {
            filter: ops.length
              ? ops.reduce((merged, op) => (merged ? e.op(merged, "and", op) : (op as any)))
              : e.bool(true),
          };
        }),
      ),
    });

    const [result, { total }] = await Promise.all([issues.run(client), totalQuery.run(client)]);
    const pageCount = Math.ceil(total / per_page);

    return { data: result, pageCount };
  }),
} satisfies TRPCRouterRecord;
