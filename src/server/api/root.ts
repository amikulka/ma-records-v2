import { createTRPCRouter } from "@/server/api/trpc";
import { albumsRouter } from "./routers/albums";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  album: albumsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
