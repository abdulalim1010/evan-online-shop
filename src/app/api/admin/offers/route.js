import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

async function verifyAdmin(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const collection = await getCollection("specialOffers");
    const offers = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ 
      offers: offers.map(o => ({ ...o, id: o._id.toString() }))
    }, { status: 200 });
  } catch (error) {
    console.error("Get offers error:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}

export async function POST(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, discount, description, bgImage, buttonText, buttonLink, active } = body;

    if (!title || !discount) {
      return NextResponse.json({ error: "Title and discount are required" }, { status: 400 });
    }

    const collection = await getCollection("specialOffers");
    const result = await collection.insertOne({
      title,
      discount,
      description: description || "",
      bgImage: bgImage || "",
      buttonText: buttonText || "Shop Now",
      buttonLink: buttonLink || "/",
      active: active !== false,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      message: "Offer created successfully",
      offerId: result.insertedId.toString()
    }, { status: 201 });
  } catch (error) {
    console.error("Create offer error:", error);
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}

export async function PUT(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { offerId, title, discount, description, bgImage, buttonText, buttonLink, active } = body;

    if (!offerId || !title || !discount) {
      return NextResponse.json({ error: "Offer ID, title and discount are required" }, { status: 400 });
    }

    const { ObjectId } = await import("mongodb");
    const collection = await getCollection("specialOffers");
    
    const result = await collection.updateOne(
      { _id: new ObjectId(offerId) },
      { $set: { 
        title, 
        discount, 
        description: description || "", 
        bgImage: bgImage || "", 
        buttonText: buttonText || "Shop Now",
        buttonLink: buttonLink || "/",
        active: active !== false,
        updatedAt: new Date() 
      } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Offer updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update offer error:", error);
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const offerId = searchParams.get("offerId");

  if (!offerId) {
    return NextResponse.json({ error: "Offer ID is required" }, { status: 400 });
  }

  try {
    const { ObjectId } = await import("mongodb");
    const collection = await getCollection("specialOffers");
    
    const result = await collection.deleteOne({ _id: new ObjectId(offerId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Offer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete offer error:", error);
    return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
  }
}