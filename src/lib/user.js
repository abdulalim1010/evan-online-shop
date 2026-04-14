import { getCollection } from "@/lib/mongodb";

export async function createUser(userData) {
  const collection = await getCollection("users");
  const result = await collection.insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.insertedId;
}

export async function getUserByEmail(email) {
  const collection = await getCollection("users");
  const user = await collection.findOne({ email });
  return user;
}

export async function getUserById(id) {
  const { ObjectId } = await import("mongodb");
  const collection = await getCollection("users");
  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (e) {
    return null;
  }
  const user = await collection.findOne({ _id: objectId });
  return user;
}

export async function updateUser(id, userData) {
  const { ObjectId } = await import("mongodb");
  const collection = await getCollection("users");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...userData, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
}