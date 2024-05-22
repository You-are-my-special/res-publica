import type { TRPCRouterRecord } from "@trpc/server";

import { client, e } from "@acme/db";
import { protectedProcedure, publicProcedure } from "../trpc";

export const senateRouter = {
  updatePresence: protectedProcedure.mutation(async ({ ctx }) => {
    const query = e
      .insert(e.SenatePresence, {
        user: e.select(e.User, (user) => ({
          filter_single: {
            id: ctx.session.user.id,
          },
        })),
      })
      .unlessConflict((presence) => ({
        on: presence.user,
        else: e.update(presence, () => ({
          set: {
            updatedAt: new Date(),
          },
        })),
      }));
    return query.run(client);
  }),
  presence: publicProcedure.query(async ({ input }) => {
    const query = e.select(e.SenatePresence, (senatePresence) => ({
      user: {
        id: true,
        name: true,
        image: true,
      },
      updatedAt: true,
    }));
    return query.run(client);
  }),
  senators: publicProcedure.query(async ({ input }) => {
    const query = e.select(e.User, (user) => ({
      name: user.name,
      filter: e.op(e.count(user.votes), ">", 0),
    }));
    return query.run(client);
  }),
} satisfies TRPCRouterRecord;
