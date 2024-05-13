import { Endpoints } from "@octokit/types";

import { db as e } from "@acme/db";
import { edgeClient } from "@acme/db/edge";

type RepoData = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type IssueData =
  Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

const queryParams = {
  repo: e.tuple({
    url: e.str,
    name: e.str,
    fullName: e.str,
    owner: e.str,
    ownerUrl: e.str,
    description: e.str,
    issueCommentUrl: e.str,
    issuesUrl: e.str,
    homepage: e.str,
    topics: e.array(e.str),
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
  issues: e.optional(
    e.array(
      e.tuple({
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
        user: e.tuple({
          login: e.str,
          html_url: e.str,
          avatar_url: e.str,
          name: e.str,
        }),
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
};

export const createRepoQuery = async (
  repoData: RepoData,
  issues: IssueData,
) => {
  const mappedData = {
    repo: {
      url: repoData.html_url,
      name: repoData.name,
      fullName: repoData.full_name,
      owner: repoData.owner.login,
      ownerUrl: repoData.owner.html_url,
      description: repoData.description ?? "",
      issueCommentUrl: repoData.issue_comment_url,
      issuesUrl: repoData.issues_url,
      homepage: repoData.homepage ?? "",
      topics: repoData.topics ?? [],
      visibility: repoData.visibility ?? "",
      openIssuesCount: repoData.open_issues_count,
      subscribersCount: repoData.subscribers_count,
      forksCount: repoData.forks_count,
      hasIssues: repoData.has_issues,
      stargazersCount: repoData.stargazers_count,
      watchersCount: repoData.watchers_count,
      language: repoData.language ?? "",
      createdAt: new Date(repoData.created_at),
      updatedAt: new Date(repoData.updated_at),
      pushedAt: new Date(repoData.pushed_at),
    },
    issues: issues.map((issue) => ({
      url: issue.url,
      html_url: issue.html_url,
      labels: issue.labels.map((label) =>
        typeof label === "string"
          ? {
              name: label,
              color: "",
              description: "",
              default: false,
            }
          : {
              name: label.name ?? "",
              description: label.description ?? "",
              color: label.color ?? "",
              default: label.default ?? false,
            },
      ),
      repository_url: issue.repository_url,
      number: issue.number,
      title: issue.title,
      state: issue.state,
      created_at: new Date(issue.created_at),
      updated_at: new Date(issue.updated_at),
      body: issue.body ?? "",
      user: {
        login: issue.user?.login ?? "",
        html_url: issue.user?.html_url ?? "",
        avatar_url: issue.user?.avatar_url ?? "",
        name: issue.user?.name ?? "",
      },
      reactions: {
        laugh: issue.reactions?.laugh ?? 0,
        total_count: issue.reactions?.total_count ?? 0,
        confused: issue.reactions?.confused ?? 0,
        heart: issue.reactions?.heart ?? 0,
        hooray: issue.reactions?.hooray ?? 0,
        eyes: issue.reactions?.eyes ?? 0,
        rocket: issue.reactions?.rocket ?? 0,
        plusOne: issue.reactions?.["+1"] ?? 0,
        minusOne: issue.reactions?.["-1"] ?? 0,
      },
    })),
  };

  const query = e.params(queryParams, (params) => {
    const issues = e.for(e.array_unpack(params.issues), (issue) => {
      const labels = e.for(e.array_unpack(issue.labels), (label) => {
        return e.insert(e.Label, label);
        // .unlessConflict((label) => ({
        //   on: label.name,
        //   else: label,
        // }));
      });

      return e.insert(e.Issue, {
        url: issue.url,
        html_url: issue.html_url,
        repository_url: issue.repository_url,
        number: issue.number,
        title: issue.title,
        labels: labels,
        state: issue.state,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        // closed_at: issue.closed_at,
        body: issue.body,
        user: e.insert(e.GitHubUser, issue.user),
        // .unlessConflict((user) => ({
        //   on: user.html_url,
        //   else: user,
        // })),
        reactions: e.insert(e.Reaction, issue.reactions),
      });
      // .unlessConflict((issue) => ({
      //   on: issue.title,
      //   else: issue,
      // }));
    });
    return e.insert(e.GitHubRepo, {
      url: params.repo.url,
      name: params.repo.name,
      fullName: params.repo.fullName,
      owner: params.repo.owner,
      ownerUrl: params.repo.ownerUrl,
      description: params.repo.description,
      issueCommentUrl: params.repo.issueCommentUrl,
      issuesUrl: params.repo.issuesUrl,
      homepage: params.repo.homepage,
      topics: params.repo.topics,
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
      issues,
    });
  });

  await query.run(edgeClient, mappedData);
};
