import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const collection = await getCollection("specialOffers");
    const offers = await collection.find({ active: true }).sort({ createdAt: -1 }).limit(1).toArray();
    return NextResponse.json({ 
      offers: offers.map(o => ({ ...o, id: o._id.toString() }))
    }, { status: 200 });
  } catch (error) {
    console.error("Get offers error:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}