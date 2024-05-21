import { Octokit } from "@octokit/rest";

import { env } from "../env";

export const octo = new Octokit({
  auth: env.GITHUB_TOKEN,
});

export const cachedOcto = new Octokit({
  auth: env.GITHUB_TOKEN,
  request: {
    fetch: (url: string) =>
      fetch(url, {
        next: {
          revalidate: 24 * 60 * 60,
        },
      }),
  },
});
