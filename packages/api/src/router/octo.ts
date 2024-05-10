import { Octokit } from "@octokit/rest";

import { env } from "../env";

export const octo = new Octokit({
  auth: env.GITHUB_TOKEN,
});
