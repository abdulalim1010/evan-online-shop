import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  { id: "footballs", name: "Footballs", collection: "footballs" },
  { id: "cricket-bats", name: "Cricket Bats", collection: "cricket-bats" },
  { id: "chess", name: "Chess", collection: "chess" },
  { id: "carrom", name: "Carrom", collection: "carrom" },
  { id: "volleyball", name: "Volleyball", collection: "volleyball" },
  { id: "handball", name: "Handball", collection: "handball" },
];

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

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    const cat = CATEGORIES.find(c => c.id === category);
    if (!cat) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    try {
      const collection = await getCollection(cat.collection);
      const products = await collection.find({}).toArray();
      return NextResponse.json({ 
        products: products.map(p => ({ ...p, id: p._id.toString() })),
        category: cat
      }, { status: 200 });
    } catch (error) {
      console.error("Get products error:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }

  return NextResponse.json({ categories: CATEGORIES }, { status: 200 });
}

export async function POST(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { category, name, price, description, image, stock } = body;

    if (!category || !name || !price) {
      return NextResponse.json({ error: "Category, name and price are required" }, { status: 400 });
    }

    const cat = CATEGORIES.find(c => c.id === category);
    if (!cat) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const collection = await getCollection(cat.collection);
    const result = await collection.insertOne({
      name,
      price: parseFloat(price),
      description: description || "",
      image: image || "",
      stock: parseInt(stock) || 0,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      message: "Product created successfully",
      productId: result.insertedId.toString()
    }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId, category, name, price, description, image, stock } = body;

    if (!productId || !category || !name || !price) {
      return NextResponse.json({ error: "Product ID, category, name and price are required" }, { status: 400 });
    }

    const cat = CATEGORIES.find(c => c.id === category);
    if (!cat) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const { ObjectId } = await import("mongodb");
    const collection = await getCollection(cat.collection);
    
    const result = await collection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { name, price: parseFloat(price), description: description || "", image: image || "", stock: parseInt(stock) || 0, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const category = searchParams.get("category");

  if (!productId || !category) {
    return NextResponse.json({ error: "Product ID and category are required" }, { status: 400 });
  }

  try {
    const cat = CATEGORIES.find(c => c.id === category);
    if (!cat) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const { ObjectId } = await import("mongodb");
    const collection = await getCollection(cat.collection);
    
    const result = await collection.deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}