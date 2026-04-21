import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const collectionName = searchParams.get("collection");

    if (!productId || !collectionName) {
      return NextResponse.json(
        { error: "productId and collection are required" },
        { status: 400 }
      );
    }

    const collection = await getCollection("reviews");
    const { ObjectId } = await import("mongodb");

    const reviews = await collection
      .find({
        productId,
        collectionName,
      })
      .sort({ createdAt: -1 })
      .toArray();

    const reviewsData = reviews.map((review) => ({
      id: review._id.toString(),
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    }));

    // Calculate average rating
    const avgRating = reviewsData.length > 0
      ? (reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length).toFixed(1)
      : 0;

    return NextResponse.json({
      reviews: reviewsData,
      averageRating: avgRating,
      totalReviews: reviewsData.length,
    }, { status: 200 });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, collectionName, userName, rating, comment } = body;

    if (!productId || !collectionName || !userName || !rating || !comment) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const collection = await getCollection("reviews");
    const result = await collection.insertOne({
      productId,
      collectionName,
      userName,
      rating,
      comment,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Review added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add review error:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
