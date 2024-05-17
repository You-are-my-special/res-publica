import { e } from "@acme/db";

export const queryParams = {
  repo: e.tuple({
    githubId: e.int64,
    url: e.str,
    name: e.str,
    fullName: e.str,
    description: e.str,
    issueCommentUrl: e.str,
    issuesUrl: e.str,
    homepage: e.str,
    visibility: e.str,
    openIssuesCount: e.int64,
    subscribersCount: e.int64,
    forksCount: e.int64,
    hasIssues: e.bool,
    stargazersCount: e.int64,
    watchersCount: e.int64,
    language: e.str,
    createdAt: e.datetime,
    updatedAt: e.datetime,
    pushedAt: e.datetime,
  }),
  topics: e.array(
    e.tuple({
      name: e.str,
    }),
  ),
  issues: e.optional(
    e.array(
      e.tuple({
        githubId: e.int64,
        url: e.str,
        html_url: e.str,
        repository_url: e.str,
        number: e.int64,
        title: e.str,
        labels: e.array(
          e.tuple({
            name: e.str,
            color: e.str,
            description: e.str,
            default: e.bool,
          }),
        ),
        state: e.str,
        created_at: e.datetime,
        updated_at: e.datetime,
        body: e.str,

        reactions: e.tuple({
          total_count: e.int64,
          plusOne: e.int64,
          minusOne: e.int64,
          laugh: e.int64,
          hooray: e.int64,
          confused: e.int64,
          heart: e.int64,
          rocket: e.int64,
          eyes: e.int64,
        }),
      }),
    ),
  ),
  owner: e.tuple({
    githubId: e.int64,
    name: e.str,
    avatar_url: e.str,
    html_url: e.str,
  }),
};
