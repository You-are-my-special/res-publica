import { auth } from "@acme/auth";
import { api } from "~/trpc/server";

export const POST = async (request: Request) => {
  // const { repo, owner } = await request.json();
  // await api.ai.queryWithAI();
  // await api.repo.createNewEntry({
  //   repo: repo,
  //   owner: owner,
  // });

  return Response.json({ message: "success" });
};
