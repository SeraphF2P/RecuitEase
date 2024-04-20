import { z } from "zod";
import { ZOD } from '~/lib/ZOD'
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from "bcryptjs";

export const authanticationRouter = createTRPCRouter({
  signup: publicProcedure.input(ZOD.auth.signup).mutation(async ({ ctx, input: { username, password } }) => {
    const hashedPassword = await hash(password, 10)


    const user = await ctx.db.user.create({
      data: {
        username,
        password: hashedPassword
      }
    })
    return Boolean(user)

  }),
  usernameNotAvailable: publicProcedure.input(z.object({
    username: ZOD.username,
  }))
    .mutation(async ({ ctx, input: { username } }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username,
        }
      })
      return user === null
    })
})