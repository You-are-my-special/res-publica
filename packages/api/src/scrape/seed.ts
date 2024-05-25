import { client, e } from "@acme/db";

import { octo } from "../router/octo";
import { mapData } from "./map";
import { createRepoQuery } from "./query";

const repos: { owner: string; repo: string }[] = [
  {
    owner: "facebook",
    repo: "react",
  },
  {
    owner: "steven-tey",
    repo: "novel",
  },
  {
    owner: "edgedb",
    repo: "edgedb",
  },
  {
    owner: "trpc",
    repo: "trpc",
  },
  {
    owner: "vercel",
    repo: "ai",
  },
  {
    owner: "vercel",
    repo: "next.js",
  },
  { owner: "vitejs", repo: "vite" },
  // { owner: "oven-sh", repo: "bun" },
  { owner: "nodejs", repo: "node" },
  { owner: "prisma", repo: "prisma" },
  { owner: "drizzle-team", repo: "drizzle-orm" },
  { owner: "TanStack", repo: "query" },
  { owner: "godotengine", repo: "godot" },
  { owner: "sst", repo: "ion" },
  { owner: "pingdotgg", repo: "uploadthing" },
  { owner: "solidjs", repo: "solid" },
  { owner: "PostHog", repo: "posthog" },
  { owner: "zed-industries", repo: "zed" },
  { owner: "mrdoob", repo: "three.js" },
  { owner: "ziglang", repo: "zig" },
  { owner: "sveltejs", repo: "kit" },
  { owner: "nuxt", repo: "nuxt" },
];

const seed = async () => {
  const existingReposQuery = e.select(e.Repo, (repo) => ({
    id: true,
    name: true,
    filter: e.op(repo.name, "=", e.set(...repos.map((r) => r.repo))),
  }));

  const existingRepos = await existingReposQuery.run(client);
  const filteredRepos = repos.filter((r) => !existingRepos.some((er) => er.name === r.repo));

  for (const input of filteredRepos) {
    console.log(`Scraping ${input.owner}/${input.repo}`);
    const issues = await octo.paginate(octo.rest.issues.listForRepo, input);

    const repo = await octo.repos.get(input);
    const mappedData = mapData(repo.data, issues);

    await createRepoQuery(mappedData);
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }
};

seed().catch((err) => {
  console.error(err);
});
