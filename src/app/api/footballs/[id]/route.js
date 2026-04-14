import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const { ObjectId } = await import("mongodb");
    const collection = await getCollection("footballs");
    const football = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!football) {
      return NextResponse.json({ error: "Football not found" }, { status: 404 });
    }
    
    return NextResponse.json(football);
  } catch (error) {
    console.error("Error fetching football:", error);
    return NextResponse.json({ error: "Failed to fetch football" }, { status: 500 });
  }
}