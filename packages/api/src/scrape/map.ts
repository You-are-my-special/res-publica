import type { Endpoints } from "@octokit/types";

type RepoData = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type IssueData = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

export const mapData = (repoData: RepoData, issues: IssueData) => {
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
      labels: issue.labels
        .filter((label) => typeof label !== "string")
        .map((label) => {
          const cast = label as {
            id: number;
            name: string;
            description: string;
            color: string;
            default: boolean;
          };
          return {
            repoId: Number(repoData.id),
            name: cast.name ?? "",
            description: cast.description ?? "",
            color: cast.color ?? "",
            default: cast.default ?? false,
          };
        }),
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
  return mappedData;
};
export type QueryData = ReturnType<typeof mapData>;
