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
    <main className="flex min-h-screen flex-col items-center text-center justify-between p-6 sm:p-24">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Rest In Tweet
        </h1>
        <p className="text-l mb-8 text-white">
          Version 1.0 of an archive of Ted&apos;s tweets, indexed using AI
          embeddings to allow powerful search of my tweets and likes form the
          good old days (also includes Tweets from the bad new days).
        </p>
        <div className="mb-8">
          <Search placeholder="Show me tweets about..." />

          {query !== "" && <Tweets query={query} />}
        </div>
        {query === "" && <Stats />}

        <section></section>
      </div>
    </main>
  );
}
