import { EmbeddedTweet } from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";
export default async function Tweets({ results }: { results: any[] }) {
  //loop through the results and fetch the tweet data using getTweet
  //and render the EmbeddedTweet component with the tweet data
  const allTweetData: any[] = [];
  for (const tweet of results) {
    const tweetData = await getTweet(tweet.id_str);
    tweetData && allTweetData.push(tweetData);
  }
  console.log({ allTweetData });
  return (
    <>
      {allTweetData.length > 0 &&
        allTweetData.map((tweet: any) => (
          <EmbeddedTweet key={tweet.id_str} tweet={tweet} />
        ))}
    </>
  );
}
