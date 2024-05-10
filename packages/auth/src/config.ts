import type { DefaultSession, NextAuthConfig } from "next-auth";
import { EdgeDBAdapter } from "@auth/edgedb-adapter";
import Discord from "next-auth/providers/discord";

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
  providers: [Discord],
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
