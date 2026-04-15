import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getCricketBats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cricket-bats`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error("Error fetching cricket bats:", error);
    return [];
  }
}

export const metadata = {
  title: "Cricket Bats - Evan Sports",
  description: "Shop premium cricket bats at Evan Sports",
};

export default async function CricketBatsPage() {
  const cricketBats = await getCricketBats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Cricket Bats</h1>
      
      {cricketBats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No cricket bats available yet.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cricketBats.map((bat) => (
            <div
              key={bat._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="aspect-square bg-gray-100 relative">
                {bat.image ? (
                  <img
                    src={bat.image}
                    alt={bat.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{bat.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{bat.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-xl">
                    ৳{bat.price}
                  </span>
                  <Link href={`/cricket-bats/${bat._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
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
