import { type RouterOutputs, api } from '@/utils/api'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import AlbumCard from '@/components/albumCard/AlbumCard'
import Head from 'next/head'
import InputWithLabel from '@/components/input/InputWithLabel'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { prisma } from '@/server/db'
import { appRouter } from '@/server/api/root'
import superjson from 'superjson'

import type { Albums } from '@prisma/client'
import type { GetStaticProps, NextPage } from 'next'
type AlbumsAndInfo = RouterOutputs['albums']['getAll']
type AlbumAndInfo = {
  album: Albums
}

function sortAlphabetically(a: AlbumAndInfo, b: AlbumAndInfo) {
  return a.album.artist
    .toLowerCase()
    .localeCompare(b.album.artist.toLowerCase())
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  })

  const userId = context.params?.userId

  if (typeof userId !== 'string') throw new Error('no user id supplied')

  await ssg.albums.getAll.prefetch({ userId })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
  }
}
export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

const MyRecords: NextPage<{ userId: string }> = ({ userId }) => {
  const { user } = useUser()
  const currentUserId = user?.id
  const [searchQuery, setSearchQuery] = useState('')
  const [albumList, setAlbumList] = useState<AlbumsAndInfo>([])
  function handleQueryChange(e: React.FormEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value)
  }

  const { data } = api.albums.getAll.useQuery({ userId })
  useEffect(() => {
    if (data) {
      setAlbumList(data.sort(sortAlphabetically))
    }
  }, [data])
  const filteredAlbums = useMemo(() => {
    return albumList.filter((albumData) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      return (
        albumData.album.album.toLowerCase().includes(lowerCaseSearchQuery) ||
        albumData.album.artist.toLowerCase().includes(lowerCaseSearchQuery)
      )
    })
  }, [albumList, searchQuery])
  return (
    <>
      <Head>
        <title>MA-Records</title>
        <meta name="description" content="Keep your vinyls in order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center ">
        <div className="w-80 py-10">
          <InputWithLabel
            placeholder="Search..."
            query={searchQuery}
            handleChange={handleQueryChange}
          />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start">
          {/* {isLoading && <LoadingSpinner />} */}
          {filteredAlbums &&
            filteredAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album.album}
                cardType={currentUserId === userId ? 'remove' : 'display'}
              />
            ))}

          <SignedIn>
            {albumList.length === 0 && (
              <div className="flex flex-col items-center justify-center text-xl">
                <div>No albums added yet!</div>
                <div>
                  Click{' '}
                  <Link href={'/admin/add'} className="underline">
                    here
                  </Link>{' '}
                  to add albums
                </div>
              </div>
            )}
          </SignedIn>
          <SignedOut>
            {albumList.length === 0 && (
              <div className="flex flex-col items-center justify-center text-xl">
                <div>This user has not added any albums yet!</div>
                <div>Check back later</div>
              </div>
            )}
          </SignedOut>
        </div>
      </main>
    </>
  )
}

export default MyRecords
