import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const collection = await getCollection("cricket-bats");
    const cricketBats = await collection.find({}).toArray();
    return NextResponse.json(cricketBats);
  } catch (error) {
    console.error("Error fetching cricket bats:", error);
    return NextResponse.json({ error: "Failed to fetch cricket bats" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const collection = await getCollection("cricket-bats");
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({ message: "Created", insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error creating cricket bat:", error);
    return NextResponse.json({ error: "Failed to create cricket bat" }, { status: 500 });
  }
}
