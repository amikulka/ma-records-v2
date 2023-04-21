import { api } from '@/utils/api'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { type AppProps } from 'next/app'
import NavBar from '@/components/navigation/navbar'

function MyApp({ Component, pageProps }: AppProps) {
  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <>
      <ClerkProvider {...pageProps}>
        <NavBar />
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
