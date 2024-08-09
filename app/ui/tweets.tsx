import React, { useEffect, useState } from "react";
import { EmbeddedTweet } from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";

export default function Tweets({ query }: { query: string }) {
  //loop through the results and fetch the tweet data using getTweet
  //and render the EmbeddedTweet component with the tweet data
  const [results, setResults] = useState<Tweet[]>([]);
  useEffect(() => {
    const fetchTweets = async (query: string) => {
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
      {results.length > 0 &&
        results.map((tweet: any) => (
          <EmbeddedTweet key={tweet.id_str} tweet={tweet} />
        ))}
    </>
  );
}
