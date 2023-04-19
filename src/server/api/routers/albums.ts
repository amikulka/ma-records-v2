import { z } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { User } from '@clerk/nextjs/dist/api'

export const albumsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.usersAlbums.findMany({
        where: {
          ownerId: input.userId,
        },
        include: {
          album: true,
        },
      })
    }),
  addAlbum: privateProcedure
    .input(
      z.object({
        album: z.object({
          id: z.string(),
          album: z.string(),
          artist: z.string(),
          track_count: z.number(),
          disk_count: z.number(),
          art_url: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId
      const album = await ctx.prisma.albums.upsert({
        where: {
          id: input.album.id,
        },
        update: {},
        create: input.album,
      })
      const UserAlbum = await ctx.prisma.usersAlbums.create({
        data: {
          ownerId: userId,
          albumId: album.id,
        },
      })
      return {
        album,
        UserAlbum,
      }
    }),
  removeAlbum: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId
      const UserAlbum = await ctx.prisma.usersAlbums.findFirst({
        where: {
          ownerId: userId,
          albumId: input,
        },
      })
      if (UserAlbum !== null) {
        await ctx.prisma.usersAlbums.delete({
          where: {
            id: UserAlbum.id,
          },
        })
      }
      return UserAlbum
    }),
})

// model Album {
//   id          String        @id @default(cuid())
//   createdAt   DateTime      @default(now())
//   album       String
//   artist      String
//   track_count Int
//   disk_count  Int
//   art_url     String
//   users       UsersAlbums[]
// }

// model UsersAlbums {
//   ownerId   String
//   album     Album    @relation(fields: [albumId], references: [id])
//   albumId   String // relation scalar field (used in the `@relation` attribute above)
//   createdAt DateTime @default(now())
