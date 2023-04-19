import { type NextPage } from 'next'
import Head from 'next/head'

import { api } from '@/utils/api'
import AlbumCard from '@/components/albumCard/AlbumCard'
import { useUser } from '@clerk/nextjs'

const Home: NextPage = () => {
  const { user } = useUser()
  if (!user) return <div>Something went wrong...</div>
  const userId = user.id
  const { data } = api.albums.getAll.useQuery({ userId })
  console.log(user)
  // console.log(data)

  // const { mutate } = api.album.addAlbum.useMutation()

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-100">
        <div>
          {data?.map((album) => (
            <AlbumCard key={album.id} album={album.album} cardType="display" />
          ))}
        </div>
      </main>
    </>
  )
}

export default Home
