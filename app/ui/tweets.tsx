import React, { useEffect, useState } from "react";
import { EmbeddedTweet } from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";

export default function Tweets({ query }: { query: string }) {
  const [results, setResults] = useState<Tweet[]>([]);
  const [toggle, setToggle] = useState<string>("tweets");
  const [likeResults, setLikeResults] = useState<Tweet[]>([]);
  useEffect(() => {
    const fetchTweets = async (query: string) => {
      setResults([]);
      const tweets = await fetch(`/api/search?q=${query}`).then((res) =>
        res.json()
      );
      console.log({ tweets });

      setResults(tweets);
    };
    const fetchLikes = async (query: string) => {
      setLikeResults([]);
      const likes = await fetch(`/api/searchlikes?q=${query}`).then((res) =>
        res.json()
      );
      console.log({ likes });

      setLikeResults(likes);
    };
    fetchTweets(query);
    fetchLikes(query);
    return () => {};
  }, [query]);

  return (
    <>
      <div className="inline-flex rounded-md shadow-sm mt-6" role="group">
        <button
          type="button"
          onClick={() => setToggle("tweets")}
          className={`${
            toggle === "tweets"
              ? "text-white bg-blue-900"
              : "text-blue-900 bg-white"
          } px-4 py-2 text-sm font-medium border border-white rounded-s-lg`}
        >
          Tweets / Retweets
        </button>

        <button
          type="button"
          onClick={() => setToggle("likes")}
          className={`${
            toggle === "likes"
              ? "text-white bg-blue-900"
              : "text-blue-900 bg-white"
          } px-4 py-2 text-sm font-medium border border-white rounded-e-lg`}
        >
          Likes
        </button>
      </div>
      {toggle === "tweets" ? (
        <>
          {results.length > 0 ? (
            results.map((tweet: any) => (
              <EmbeddedTweet key={tweet.id_str} tweet={tweet} />
            ))
          ) : (
            <>
              <div className="tweet-skeleton p-4 rounded-md border-white border mt-6 animate-pulse">
                <div className="avatar bg-white w-12 h-12 rounded-full"></div>
                <div className="content my-4">
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="tweet-skeleton p-4 rounded-md border-white border mt-6 animate-pulse">
                <div className="avatar bg-white w-12 h-12 rounded-full"></div>
                <div className="content m-4">
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 rounded animate-pulse"></div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {likeResults.length > 0 ? (
            likeResults.map((tweet: any) => (
              <EmbeddedTweet key={tweet.id_str} tweet={tweet} />
            ))
          ) : (
            <>
              <div className="tweet-skeleton p-4 rounded-md border-white border mt-6 animate-pulse">
                <div className="avatar bg-white w-12 h-12 rounded-full"></div>
                <div className="content my-4">
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="tweet-skeleton p-4 rounded-md border-white border mt-6 animate-pulse">
                <div className="avatar bg-white w-12 h-12 rounded-full"></div>
                <div className="content m-4">
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 mb-2 rounded animate-pulse"></div>
                  <div className="line bg-white h-4 rounded animate-pulse"></div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
