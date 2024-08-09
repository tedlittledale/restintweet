"use client";

import Search from "./ui/search";
import Tweets from "./ui/tweets";
import Stats from "./ui/stats";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  console.log({ query });

  // const keywordsData = await keywords();
  // console.log({ keywordsData });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Rest In Tweet</h1>

        <div className="mb-8">
          <Search placeholder="Search Ted's tweets" />

          {query !== "" && <Tweets query={query} />}
        </div>
        {query === "" && <Stats />}

        <section></section>
      </div>
    </main>
  );
}
