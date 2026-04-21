import { MongoClient } from "mongodb";

let client = null;
let clientPromise = null;

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!dbName) {
    throw new Error("Please define the MONGODB_DB environment variable");
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    if (process.env.NODE_ENV === "development") {
      clientPromise = global._mongoClientPromise = client.connect();
    } else {
      clientPromise = client.connect();
    }
  }

  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}