import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { TRPCError } from '@trpc/server';
import { getServerAuthSession } from '~/server/auth';

type Context = {
  userId: string;
};

async function createContext(): Promise<Context> {
  const session = await getServerAuthSession();
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
  return {
    userId: session?.user.id,
  };
}

const es = initEdgeStore.context<Context>().create();


/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    maxSize: 1024 * 1024 * 2,
  })
    .path(({ ctx }) => [
      { auther: ctx.userId }
    ]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;