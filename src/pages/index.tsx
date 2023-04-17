import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

const Home: NextPage = () => {
  const { data } = api.albums.getAll.useQuery();
  console.log(data);

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
            <div key={album.id}>{album.album}</div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
