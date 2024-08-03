import Head from "next/head";
import BannerList from "@/components/BannerList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page with ad banners" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
        <BannerList />
      </main>
    </>
  );
}
