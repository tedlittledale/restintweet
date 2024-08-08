import { Suspense } from "react";
import Search from "./ui/search";
import Tweets from "./ui/tweets";
import WordCloud from "./ui/wordcloud";

import { search, stats, keywords } from "@/app/lib/data";

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
  const statsData = await stats();
  console.log({ statsData });
  const keywordsData = await keywords();
  console.log({ keywordsData });
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
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
              <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Original Tweets</h3>
              </div>
              <p
                className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
              >
                {new Intl.NumberFormat().format(statsData?.tweets)}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
              <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Retweets</h3>
              </div>
              <p
                className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
              >
                {new Intl.NumberFormat().format(statsData?.retweets)}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
              <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Likes gained</h3>
              </div>
              <p
                className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
              >
                {new Intl.NumberFormat().format(statsData?.favorite_count)}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
              <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Retweets gained</h3>
              </div>
              <p
                className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
              >
                {new Intl.NumberFormat().format(statsData?.retweet_count)}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
              <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Hashtags used</h3>
              </div>
              <p
                className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
              >
                {new Intl.NumberFormat().format(statsData?.hashtags_count)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
              <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Tweets with media</h3>
              </div>
              <p
                className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
              >
                {new Intl.NumberFormat().format(
                  statsData?.video_count + statsData?.image_count
                )}
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Word Cloud</h2>
          {/* Add your word cloud content here */}
          {keywordsData && (
            <WordCloud
              words={
                keywordsData
                  ? keywordsData.map(({ count, keyword }) => ({
                      text: keyword,
                      value: count,
                    }))
                  : []
              }
            />
          )}
        </section>
      </div>
    </main>
  );
}
