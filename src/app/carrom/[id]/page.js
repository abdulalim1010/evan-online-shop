import Link from "next/link";
import { getCollection } from "@/lib/mongodb";
import AddToCartButton from "@/app/components/AddToCartButton";
import ReviewSection from "@/app/components/ReviewSection";

async function getCarrom(id) {
  try {
    const collection = await getCollection("carrom");
    const { ObjectId } = await import("mongodb");
    const item = await collection.findOne({ _id: new ObjectId(id) });
    return item;
  } catch (error) {
    console.error("Error fetching carrom:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await getCarrom(id);
  return {
    title: item ? `${item.name} - Evan Sports` : "Product Not Found",
    description: item?.description || "",
  };
}

export default async function CarromDetailsPage({ params }) {
  const { id } = await params;
  const item = await getCarrom(id);

  if (!item) {
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
      <Link href="/carrom" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      
      <div className="glass-card grid gap-8 p-6 md:grid-cols-2">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl text-gray-400">
              🎱
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-slate-600">{item.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Brand:</span> {item.brand}</div>
            <div><span className="font-semibold">Category:</span> {item.category}</div>
            <div><span className="font-semibold">Stock:</span> {item.stock} available</div>
          </div>
          
          <div className="text-3xl font-bold text-blue-600">৳{item.price}</div>
          
           <AddToCartButton productName={item.name} />
        </div>
      </div>

      <div className="mt-8">
        <ReviewSection
          productId={item._id.toString()}
          collectionName="carrom"
          productName={item.name}
        />
      </div>
    </div>
  );
}