import Head from "next/head";
import BannerSearch from "@/components/BannerSearch";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page with ad banners" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
          Generate banners for your products
        </h1>
        <BannerSearch  />
      </main>
    </>
  );
}
