import { ZOD, z } from '~/lib/ZOD';
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const formRouter = createTRPCRouter({
  saveForm: protectedProcedure.input(ZOD.form).mutation(async ({ ctx }) => {
    return

  }),
  checkIfAvailable: protectedProcedure.input(z.object({ name: z.string().min(1).max(64) })).mutation(async ({ ctx }) => {
    const user = ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id
      },
      select: {
        forms: true
      }
    })
    return
  }),
})