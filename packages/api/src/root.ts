import { authRouter } from "./router/auth";
import { issueRouter } from "./router/issue";
import { repoRouter } from "./router/repo";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  issue: issueRouter,
  repo: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
