import { Suspense } from "react";
import Search from "./ui/search";
import Tweets from "./ui/tweets";

import { search, stats } from "@/app/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  let results = [];
  console.log({ query });
  if (query && query !== "") {
    results = await search({ text: query });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Rest In Tweet</h1>
        <div className="mb-8">
          <Search placeholder="Search Ted's tweets" />

          {results.length > 0 && (
            <Suspense fallback={<div>Loading...</div>}>
              <Tweets results={results} />
            </Suspense>
          )}
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          {/* Add your stats content here */}
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Word Cloud</h2>
          {/* Add your word cloud content here */}
        </section>
      </div>
    </main>
  );
}
