import React, { useEffect, useState } from "react";
import { Tweet } from "react-tweet";

export default function Tweets({ query }: { query: string }) {
  //loop through the results and fetch the tweet data using getTweet
  //and render the EmbeddedTweet component with the tweet data
  const [results, setResults] = useState<[]>([]);
  useEffect(() => {
    const fetchTweets = async (query: string) => {
      const searchResults = await fetch(`/api/search?q=${query}`).then((res) =>
        res.json()
      );
      console.log({ searchResults });

      setResults(searchResults);
    };
    fetchTweets(query);
    return () => {};
  }, [query]);

  return (
    <>
      {results.length > 0 &&
        results.map((tweet: any) => (
          <Tweet key={tweet.id_str} id={tweet.id_str} />
        ))}
    </>
  );
}
