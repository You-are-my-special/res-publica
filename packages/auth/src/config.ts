import { EdgeDBAdapter } from "@auth/edgedb-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Githhub from "next-auth/providers/github";

import { edgeClient } from "@acme/db/edge";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: EdgeDBAdapter(edgeClient),
  providers: [Githhub],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;
