import Link from "next/link";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

async function getFootballs() {
  try {
    const collection = await getCollection("footballs");
    const footballs = await collection.find({}).toArray();
    return footballs;
  } catch (error) {
    console.error("Error fetching footballs:", error);
    return [];
  }
}

export const metadata = {
  title: "Footballs - Evan Sports",
  description: "Shop premium footballs at Evan Sports",
};

export default async function FootballsPage() {
  const footballs = await getFootballs();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Footballs</h1>
      
      {footballs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No footballs available yet.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {footballs.map((football) => (
            <div
              key={football._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="aspect-square bg-gray-100 relative">
                {football.image ? (
                  <img
                    src={football.image}
                    alt={football.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{football.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{football.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-xl">
                    ৳{football.price}
                  </span>
                  <Link href={`/footballs/${football._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}