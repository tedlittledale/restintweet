import OpenAI from "openai";
import { MongoClient } from "mongodb";

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

export async function search({ text }) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
    encoding_format: "float",
  });

  const embedding = embeddingResponse.data[0].embedding;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("RestInTweet"); // Replace with your database name
    const collection = database.collection("tweets"); // Replace with your collection name

    const searchResults = await vectorSearch(embedding, collection);

    return searchResults;
  } finally {
    await client.close();
  }

  console.log({ embedding });
  // Use the queryEmbedding for further processing
}

export async function stats() {
  //fetch the stats from the database
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("RestInTweet"); // Replace with your database name
    const collection = database.collection("stats"); // Replace with your collection name

    //fetch the first row from the stats collection
    const stats = await collection.findOne();
    return stats;
  } finally {
    await client.close();
  }
}

export async function keywords() {
  //fetch the keywords from the database
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("RestInTweet"); // Replace with your database name
    const collection = database.collection("keywords"); // Replace with your collection name

    //fetch all the keywords from the keywords collection
    const keywords = await collection.find().toArray();
    return keywords;
  } finally {
    await client.close();
  }
}
