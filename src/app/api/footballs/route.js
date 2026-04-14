import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const collection = await getCollection("footballs");
    const footballs = await collection.find({}).toArray();
    return NextResponse.json(footballs);
  } catch (error) {
    console.error("Error fetching footballs:", error);
    return NextResponse.json({ error: "Failed to fetch footballs" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const collection = await getCollection("footballs");
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({ message: "Created", insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error creating football:", error);
    return NextResponse.json({ error: "Failed to create football" }, { status: 500 });
  }
}