import { type RouterOutputs, api } from '@/utils/api'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import AlbumCard from '@/components/albumCard/AlbumCard'
import Head from 'next/head'
import LoadingSpinner from '@/components/loading/LoadingSpinner'
import InputWithLabel from '@/components/input/InputWithLabel'
import { useEffect, useMemo, useState } from 'react'
import type { Albums } from '@prisma/client'

type AlbumsAndInfo = RouterOutputs['albums']['getAll']
type AlbumAndInfo = {
  album: Albums
}
function sortAlphabetically(a: AlbumAndInfo, b: AlbumAndInfo) {
  return a.album.artist
    .toLowerCase()
    .localeCompare(b.album.artist.toLowerCase())
}

export default function MyRecords() {
  const router = useRouter()
  const { user } = useUser()
  const { userId } = router.query as { userId: string }
  const currentUserId = user?.id
  const [searchQuery, setSearchQuery] = useState('')
  const [albumList, setAlbumList] = useState<AlbumsAndInfo>([])
  function handleQueryChange(e: React.FormEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value)
  }

  const { data, isLoading } = api.albums.getAll.useQuery({ userId })
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
          {isLoading && <LoadingSpinner />}
          {filteredAlbums &&
            filteredAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album.album}
                cardType={currentUserId === userId ? 'remove' : 'display'}
              />
            ))}
        </div>
      </main>
    </>
  )
}
