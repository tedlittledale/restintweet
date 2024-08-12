import { NextResponse } from "next/server";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  console.log({ query });
  try {
    let keywords;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db("RestInTweet"); // Replace with your database name
      const collection = database.collection("keywords"); // Replace with your collection name
      // Fetch the top 100 keywords based on the highest count
      keywords = await collection
        .find()
        .sort({ count: -1 })
        .limit(200)
        .toArray();
    } finally {
      await client.close();
    }

    // Return the results as JSON
    return NextResponse.json(keywords);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
