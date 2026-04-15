import Link from "next/link";
import { getCollection } from "@/lib/mongodb";
import AddToCartButton from "@/app/components/AddToCartButton";

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
    <div className="page-shell fade-up">
      <Link href="/footballs" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      
      <div className="glass-card grid gap-8 p-6 md:grid-cols-2">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
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
          <p className="text-slate-600">{football.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Brand:</span> {football.brand}</div>
            <div><span className="font-semibold">Category:</span> {football.category}</div>
            <div><span className="font-semibold">Stock:</span> {football.stock} available</div>
          </div>
          
          <div className="text-3xl font-bold text-blue-600">৳{football.price}</div>
          
          <AddToCartButton productName={football.name} />
        </div>
      </div>
    </div>
  );
}