import { type NextPage } from 'next'
import Head from 'next/head'

import { SignedOut, RedirectToSignUp, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  if (user) {
    router.push(`/myrecords/${user.id}`).catch((err) => console.error(err))
  }

  return (
    <>
      <Head>
        <title>MA-Records</title>
        <meta name="description" content="Keep your vinyls in order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <SignedOut>
          <RedirectToSignUp />
        </SignedOut>
      </main>
    </>
  )
}

export default Home
