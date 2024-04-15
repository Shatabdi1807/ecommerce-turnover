import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const interestRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.interest.create({
        data: {
          name: input.name,
        },
      });
    }),

  getInterests: publicProcedure.query(({ ctx }) => {
    return ctx.db.interest.findMany();
  }),
});
