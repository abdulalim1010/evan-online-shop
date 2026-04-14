import Link from "next/link";
import HeroBanner from "./components/HeroBanner";

async function getFootballs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/footballs`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 4);
  } catch (error) {
    console.error("Error fetching footballs:", error);
    return [];
  }
}

export default async function Home() {
  const footballs = await getFootballs();

  return (
    <div>
      <HeroBanner/>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Footballs</h2>
          <a href="/footballs" className="text-blue-600 hover:underline">View All →</a>
        </div>
        
        {footballs.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No footballs available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {footballs.map((football) => (
              <div
                key={football._id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="aspect-square bg-gray-100">
                  {football.image ? (
                    <img
                      src={football.image}
                      alt={football.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      ⚽
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{football.name}</h3>
                  <p className="text-gray-600 text-sm">{football.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">৳{football.price}</span>
                    <Link href={`/footballs/${football._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}