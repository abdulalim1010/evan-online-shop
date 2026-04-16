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
    const collection = await getCollection("users");
    const users = await collection.find({}, { projection: { password: 0 } }).toArray();
    
    return NextResponse.json({ 
      users: users.map(u => ({
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar,
        createdAt: u.createdAt,
      }))
    }, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json({ error: "User ID and role are required" }, { status: 400 });
    }

    if (!["user", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (userId === admin.id) {
      return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
    }

    const { ObjectId } = await import("mongodb");
    const collection = await getCollection("users");
    
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User role updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update user role error:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
