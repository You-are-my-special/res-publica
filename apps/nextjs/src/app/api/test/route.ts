import { api } from "~/trpc/server";

export const GET = async () => {
  await api.repo.createNewEntry({
    repo: "node",
    owner: "nodejs",
  });
  return Response.json({ message: "success" });
};
