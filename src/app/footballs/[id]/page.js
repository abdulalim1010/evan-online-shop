import Link from "next/link";
import { getCollection } from "@/lib/mongodb";

async function getFootball(id) {
  try {
    const collection = await getCollection("footballs");
    const { ObjectId } = await import("mongodb");
    const football = await collection.findOne({ _id: new ObjectId(id) });
    return football;
  } catch (error) {
    console.error("Error fetching football:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const football = await getFootball(id);
  return {
    title: football ? `${football.name} - Evan Sports` : "Product Not Found",
    description: football?.description || "",
  };
}

export default async function FootballDetailsPage({ params }) {
  const { id } = await params;
  const football = await getFootball(id);

  if (!football) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {football.image ? (
            <img
              src={football.image}
              alt={football.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl text-gray-400">
              ⚽
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{football.name}</h1>
          <p className="text-gray-600">{football.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Brand:</span> {football.brand}</div>
            <div><span className="font-semibold">Category:</span> {football.category}</div>
            <div><span className="font-semibold">Stock:</span> {football.stock} available</div>
          </div>
          
          <div className="text-3xl font-bold text-blue-600">৳{football.price}</div>
          
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full md:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}