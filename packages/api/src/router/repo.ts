import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { client, e } from "@acme/db";

import { mapData } from "../scrape/map";
import { createRepoQuery } from "../scrape/query";
import { publicProcedure } from "../trpc";
import { octo } from "./octo";

export const repoRouter = {
  byId: publicProcedure.input(z.string()).query(async ({ input }) => {
    const query = e.select(e.Repo, () => ({
      ...e.Repo["*"],
      filter_single: { id: input },
    }));
    return query.run(client);
  }),
  all: publicProcedure
    .input(
      z.object({
        page: z.coerce.number().default(1),
        per_page: z.coerce.number().default(10),
        sort: z.string().optional(),
        name: z.string().optional(),
        topic: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, per_page, name, topic } = input;

      const offset = (page - 1) * per_page;

      const topics = topic?.split(".") ?? [];

      const makeTopicFilter = (topics: string[]) =>
        e.shape(e.Repo, (repo) => {
          const topicsSet = e.set(...topics.map((topic) => e.str(topic)));
          return {
            filter: e.op(e.count(e.op(topicsSet, "intersect", repo.topics.name)), ">", 0),
          };
        });

      const repos = e.select(e.Repo, (repo) => {
        const ops = [] as any;
        if (topics.length > 0) {
          const topicFilter = makeTopicFilter(topics)(repo).filter;
          ops.push(topicFilter);
        }
        return {
          // ...e.Repo["*"],
          url: true,
          name: true,
          id: true,
          openIssuesCount: true,
          stargazersCount: true,
          forksCount: true,
          watchersCount: true,
          owner: {
            name: true,
            avatar_url: true,
            html_url: true,
          },
          topics: {
            name: true,
          },
          // filter: ops.length ? e.all(e.set(...ops)) : e.bool(true),
          limit: per_page,
          offset,
        };
      });
      const totalQuery = e.select({
        total: e.count(
          e.select(e.Repo, (repo) => {
            const ops = [];
            if (name) ops.push(e.op(repo.name, "ilike", `%${name}%`));
            if (topics.length > 0) {
              const topicFilter = makeTopicFilter(topics)(repo).filter;
              ops.push(topicFilter);
            }

            return {
              filter: ops.length ? e.all(e.set(...ops)) : e.bool(true),
            };
          }),
        ),
      });

      const { total } = await totalQuery.run(client);
      const result = await repos.run(client);
      const pageCount = Math.ceil(total / per_page);

      return { data: result, pageCount };
    }),
  createNewEntry: publicProcedure.input(z.object({ repo: z.string(), owner: z.string() })).query(async ({ input }) => {
    const issues = await octo.paginate(octo.rest.issues.listForRepo, input);
    const repo = await octo.repos.get(input);
    // const repoReadMe = await octo.repos.getReadme(input);
    // const data = mapData(repo.data, issues, repoReadMe?.data?.content);
    const data = mapData(repo.data, issues);

    await createRepoQuery(data);
    return { message: "Data saved successfully" };
  }),
  getRepoFromGithub: publicProcedure
    .input(z.object({ repo: z.string(), owner: z.string() }))
    .query(async ({ input }) => {
      const repo = await octo.repos.get(input);
      return repo.data;
    }),
  topics: publicProcedure.query(({ ctx }) => {
    const topics = e.select(e.Topic, (topic: any) => ({
      name: topic.name,
    }));
    const data = topics.run(client);
    return data;
  }),
} satisfies TRPCRouterRecord;
