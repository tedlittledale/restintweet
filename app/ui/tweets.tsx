import React, { useEffect, useState } from "react";
import { EmbeddedTweet } from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";

export default function Tweets({ query }: { query: string }) {
  const [results, setResults] = useState<Tweet[]>([]);
  useEffect(() => {
    const fetchTweets = async (query: string) => {
      setResults([]);
      const tweets = await fetch(`/api/search?q=${query}`).then((res) =>
        res.json()
      );
      console.log({ tweets });

      setResults(tweets);
    };
    fetchTweets(query);
    return () => {};
  }, [query]);

  return (
    <>
      {results.length > 0 ? (
        results.map((tweet: any) => (
          <EmbeddedTweet key={tweet.id_str} tweet={tweet} />
        ))
      ) : (
        <>
          <div className="tweet-skeleton p-4 rounded-md border-gray-300 border mt-6 animate-pulse">
            <div className="avatar bg-gray-300 w-12 h-12 rounded-full"></div>
            <div className="content my-4">
              <div className="line bg-gray-300 h-4 mb-2 rounded animate-pulse"></div>
              <div className="line bg-gray-300 h-4 mb-2 rounded animate-pulse"></div>
              <div className="line bg-gray-300 h-4 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="tweet-skeleton p-4 rounded-md border-gray-300 border mt-6 animate-pulse">
            <div className="avatar bg-gray-300 w-12 h-12 rounded-full"></div>
            <div className="content m-4">
              <div className="line bg-gray-300 h-4 mb-2 rounded animate-pulse"></div>
              <div className="line bg-gray-300 h-4 mb-2 rounded animate-pulse"></div>
              <div className="line bg-gray-300 h-4 rounded animate-pulse"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
