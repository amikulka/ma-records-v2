import { api } from "@/utils/api";
import "@/styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { type AppProps } from "next/app";
import { useRouter } from "next/router";
import NavBarSignedOut from "@/components/navigation/navbar-signed-out";
import NavBar from "@/components/navigation/navbar";

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages: Array<string> = [];

function MyApp({ Component, pageProps }: AppProps) {
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <>
          <SignedOut>
            <NavBarSignedOut />
            <Component {...pageProps} />
          </SignedOut>
          <SignedIn>
            <NavBar />
            <Component {...pageProps} />
          </SignedIn>
        </>
      ) : (
        <>
          <SignedIn>
            <NavBar />
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
