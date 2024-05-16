import { api } from "~/trpc/server";

export const POST = async (request: Request) => {
  const { repo, owner } = await request.json();
  await api.issue.generateGravitas();
  return Response.json({ message: "success" });
};
