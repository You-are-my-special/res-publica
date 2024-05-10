import { authRouter } from "./router/auth";
import { issueRouter } from "./router/issue";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  issue: issueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
