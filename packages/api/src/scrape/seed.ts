import { octo } from "../router/octo";
import { mapData } from "./map";
import { createRepoQuery } from "./query";

const repos: { owner: string; repo: string }[] = [
  // {
  //   owner: "facebook",
  //   repo: "react",
  // },
  {
    owner: "steven-tey",
    repo: "novel",
  },
  // {
  //   owner: "edgedb",
  //   repo: "edgedb",
  // },
];

const seed = async () => {
  for (const input of repos) {
    console.log(`Scraping ${input.owner}/${input.repo}`);
    const issues = await octo.paginate(octo.rest.issues.listForRepo, input);

    const repo = await octo.repos.get(input);
    const mappedData = mapData(repo.data, issues);

    console.log(mappedData);
    await createRepoQuery(mappedData);
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }
};

seed().catch((err) => {
  console.error(err);
});
