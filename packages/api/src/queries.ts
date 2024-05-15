import { Endpoints } from "@octokit/types";

import { db as e } from "@acme/db";
import { edgeClient } from "@acme/db/edge";

type RepoData = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type IssueData =
  Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];
const queryParams = {
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
        // user: e.tuple({
        //   githubId: e.int64,
        //   login: e.str,
        //   html_url: e.str,
        //   avatar_url: e.str,
        //   name: e.str,
        // }),
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

export const createRepoQuery = async (
  repoData: RepoData,
  issues: IssueData,
) => {
  const mappedData = {
    topics: repoData.topics?.map((val) => ({ name: val })) ?? [],

    repo: {
      githubId: repoData.id,
      url: repoData.html_url,
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description ?? "",
      issueCommentUrl: repoData.issue_comment_url,
      issuesUrl: repoData.issues_url,
      homepage: repoData.homepage ?? "",
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
      githubId: issue.id,

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
      // user: {
      //   githubId: issue.user?.id,
      //   login: issue.user?.login ?? "",
      //   html_url: issue.user?.html_url ?? "",
      //   avatar_url: issue.user?.avatar_url ?? "",
      //   name: issue.user?.name ?? "",
      // },
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
    owner: {
      githubId: repoData.owner.id,
      name: repoData.owner.login,
      avatar_url: repoData.owner.avatar_url,
      html_url: repoData.owner.html_url,
    },
  };
  const query = e.params(queryParams, (params) => {
    const topics = e.for(e.array_unpack(params.topics), (topic) => {
      return e.insert(e.Topic, topic).unlessConflict();
    });
    const issues = e.for(e.array_unpack(params.issues), (issue) => {
      const labels = e.for(e.array_unpack(issue.labels), (label) => {
        return e.insert(e.Label, label).unlessConflict();
      });

      return e
        .insert(e.Issue, {
          githubId: issue.githubId,
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
          // user: e.insert(e.GitHubUser, issue.user).unlessConflict(),
          // .unlessConflict((user) => ({
          //   on: user.html_url,
          //   else: user,
          // })),
          reactions: e.insert(e.Reaction, issue.reactions),
        })
        .unlessConflict();
    });
    return e
      .insert(e.GitHubRepo, {
        githubId: params.repo.githubId,
        url: params.repo.url,
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
        owner: e.insert(e.Owner, params.owner).unlessConflict(),
        issues,
      })
      .unlessConflict();
  });

  await query.run(edgeClient, mappedData);
};
