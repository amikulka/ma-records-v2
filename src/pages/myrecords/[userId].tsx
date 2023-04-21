import { api } from '@/utils/api'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import AlbumCard from '@/components/albumCard/AlbumCard'
import Head from 'next/head'
import LoadingSpinner from '@/components/loading/LoadingSpinner'

export default function MyRecords() {
  const router = useRouter()
  const { user } = useUser()
  const { userId } = router.query
  const currentUserId = user?.id
  try {
    if (typeof userId !== 'string') throw new Error('Invalid User Id')
    const { data, isLoading } = api.albums.getAll.useQuery({ userId })

    return (
      <>
        <Head>
          <title>MA-Records</title>
          <meta name="description" content="Keep your vinyls in order" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center md:justify-start">
            {isLoading && <LoadingSpinner />}
            {data &&
              data.map((album) => (
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
  } catch (err) {
    return <div>Something went wrong...</div>
  }
}
