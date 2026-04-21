import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { read } = await request.json();
    const collection = await getCollection("contactMessages");

    const result = await collection.updateOne(
      { _id: new (await import('mongodb')).ObjectId(id) },
      { $set: { read } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } catch (error) {
    console.error("Update message error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const collection = await getCollection("contactMessages");

    const result = await collection.deleteOne({
      _id: new (await import('mongodb')).ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
