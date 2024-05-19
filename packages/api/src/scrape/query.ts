import { client, e } from "@acme/db";

import type { QueryData } from "./map";
import { queryParams } from "./params";

export const createRepoQuery = async (data: QueryData) => {
  const repoQuery = e.params(queryParams, (params) => {
    const topics = e.for(e.array_unpack(params.topics), (topic) => {
      return e.insert(e.Topic, topic).unlessConflict((topic) => ({
        on: topic.name,
        else: topic,
      }));
    });

    const repo = e
      .insert(e.Repo, {
        githubId: params.repo.githubId,
        url: params.repo.url,
        // base64Readme: params.repo.base64Readme,
        name: params.repo.name,
        fullName: params.repo.fullName,
        description: params.repo.description,
        issueCommentUrl: params.repo.issueCommentUrl,
        issuesUrl: params.repo.issuesUrl,
        homepage: params.repo.homepage,
        visibility: params.repo.visibility,
        openIssuesCount: params.repo.openIssuesCount,
        forksCount: params.repo.forksCount,
        hasIssues: params.repo.hasIssues,
        stargazersCount: params.repo.stargazersCount,
        watchersCount: params.repo.watchersCount,
        language: params.repo.language,
        createdAt: params.repo.createdAt,
        updatedAt: params.repo.updatedAt,
        pushedAt: params.repo.pushedAt,
        topics: topics,
        owner: e.insert(e.Owner, params.owner).unlessConflict((owner) => ({
          on: owner.githubId,
          else: owner,
        })),
      })
      .unlessConflict();
    return repo;
  });
  const query = e.params(queryParams, (params) => {
    const labels = e.for(e.op("distinct", e.array_unpack(e.array_unpack(params.issues).labels)), (label) => {
      return e.insert(e.Label, label).unlessConflict((label) => ({
        on: e.tuple([label.name, label.repoId]),
        else: label,
      }));
    });
    return e.with(
      [labels],
      e.for(e.array_unpack(params.issues), (issue) => {
        return e.insert(e.Issue, {
          githubId: issue.githubId,
          url: issue.url,
          html_url: issue.html_url,
          repository_url: issue.repository_url,
          number: issue.number,
          title: issue.title,
          labels: e.assert_distinct(
            e.select(labels, (label) => ({
              filter: e.op(label.name, "in", e.array_unpack(issue.labels).name),
            })),
          ),
          state: issue.state,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          repo: e.select(e.Repo, (repo) => ({
            filter_single: {
              githubId: params.repo.githubId,
            },
          })),
          // closed_at: issue.closed_at,
          body: issue.body,

          // user: e.insert(e.GitHubUser, issue.user).unlessConflict(),
          // .unlessConflict((user) => ({
          //   on: user.html_url,
          //   else: user,
          // })),
          reactions: e.insert(e.Reaction, issue.reactions),
        });
      }),
    );
  });
  await client.transaction(async (tx) => {
    await repoQuery.run(tx, data);
    await query.run(tx, data);
  });
};
