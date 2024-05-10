import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { dbQueryBuilder } from "@acme/db";
import { CreatePostSchema } from "@acme/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return dbQueryBuilder
      .select(dbQueryBuilder.BlogPost, () => ({
        id: true,
        title: true,
        content: true,
      }))
      .run(ctx.db);
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return dbQueryBuilder
        .select(dbQueryBuilder.BlogPost, (post) => ({
          id: true,
          title: true,
          content: true,
          filter_single: dbQueryBuilder.op(
            post.id,
            "=",
            dbQueryBuilder.uuid(input.id.toString()),
          ),
        }))
        .run(ctx.db);
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return dbQueryBuilder.insert(dbQueryBuilder.BlogPost, input).run(ctx.db);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return dbQueryBuilder
      .delete(dbQueryBuilder.BlogPost, () => ({
        filter_single: { id: input },
      }))
      .run(ctx.db);
  }),
} satisfies TRPCRouterRecord;
