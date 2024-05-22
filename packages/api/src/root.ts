import { aiRouter } from "./router/ai";
import { authRouter } from "./router/auth";
import { issueRouter } from "./router/issue";
import { repoRouter } from "./router/repo";
import { senateRouter } from "./router/senate";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  issue: issueRouter,
  repo: repoRouter,
  ai: aiRouter,
  senate: senateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
