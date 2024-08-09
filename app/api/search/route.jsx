import { NextResponse } from "next/server";
import OpenAI from "openai";
import { MongoClient } from "mongodb";
import { getTweet } from "react-tweet/api";

const openai = new OpenAI();
const uri = process.env.MONGODB_URI;

async function vectorSearch(embedding, collection) {
  // Define the vector search pipeline
  const pipeline = [
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: embedding,
        numCandidates: 150,
        limit: 10,
      },
    },
  ];

  // Execute the search
  const results = await collection.aggregate(pipeline).toArray();
  return results;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  console.log({ query });
  try {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: query,
      encoding_format: "float",
    });
    let tweets = [];
    const embedding = embeddingResponse.data[0].embedding;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db("RestInTweet"); // Replace with your database name
      const collection = database.collection("tweets"); // Replace with your collection name

      const searchResults = await vectorSearch(embedding, collection);

      for (const tweet of searchResults) {
        console.log({ tweet });
        const tweetData = await getTweet(tweet.id_str);
        tweetData && tweets.push(tweetData);
      }
      console.log({ tweets });
    } finally {
      await client.close();
    }

    // Return the results as JSON
    return NextResponse.json(tweets);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
