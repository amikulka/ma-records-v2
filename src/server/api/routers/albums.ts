import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const albumsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.album.findMany();
  }),
});
