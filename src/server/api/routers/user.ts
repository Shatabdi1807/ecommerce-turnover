import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.password !== input.password) {
        throw new Error("Incorrect password");
      }

      return {
        message: "Login successful",
        user,
      };
    }),

  getUserDetails: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
