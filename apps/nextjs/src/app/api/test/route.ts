import { api } from "~/trpc/server";

export const GET = async () => {
  await api.repo.createNewEntry({
    repo: "novel",
    owner: "steven-tey",
  });
  return Response.json({ message: "success" });
};
