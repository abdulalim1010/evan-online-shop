import Link from "next/link";
import HeroBanner from "./components/HeroBanner";
import SpecialOffer from "./components/SpecialOffer";
import ProductSlider from "./components/ProductSlider";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

async function getFootballs() {
  try {
    const collection = await getCollection("footballs");
    const footballs = await collection.find({}).limit(4).toArray();
    return footballs;
  } catch (error) {
    console.error("Error fetching footballs:", error);
    return [];
  }
}

async function getCricketBats() {
  try {
    const collection = await getCollection("cricket-bats");
    const cricketBats = await collection.find({}).limit(4).toArray();
    return cricketBats;
  } catch (error) {
    console.error("Error fetching cricket bats:", error);
    return [];
  }
}

async function getVolleyball() {
  try {
    const collection = await getCollection("volleyball");
    const items = await collection.find({}).limit(4).toArray();
    return items;
  } catch (error) {
    console.error("Error fetching volleyball:", error);
    return [];
  }
}

async function getHandball() {
  try {
    const collection = await getCollection("handball");
    const items = await collection.find({}).limit(4).toArray();
    return items;
  } catch (error) {
    console.error("Error fetching handball:", error);
    return [];
  }
}

async function getCarrom() {
  try {
    const collection = await getCollection("carrom");
    const items = await collection.find({}).limit(4).toArray();
    return items;
  } catch (error) {
    console.error("Error fetching carrom:", error);
    return [];
  }
}

async function getChess() {
  try {
    const collection = await getCollection("chess");
    const items = await collection.find({}).limit(4).toArray();
    return items;
  } catch (error) {
    console.error("Error fetching chess:", error);
    return [];
  }
}

export default async function Home() {
  const footballs = await getFootballs();
  const cricketBats = await getCricketBats();
  const volleyball = await getVolleyball();
  const handball = await getHandball();
  const carrom = await getCarrom();
  const chess = await getChess();

  const allProducts = [
    ...footballs.map(p => ({ 
      _id: p._id?.toString() || p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: 'footballs'
    })),
    ...cricketBats.map(p => ({ 
      _id: p._id?.toString() || p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: 'cricket-bats'
    })),
    ...volleyball.map(p => ({ 
      _id: p._id?.toString() || p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: 'volleyball'
    })),
    ...handball.map(p => ({ 
      _id: p._id?.toString() || p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: 'handball'
    })),
    ...carrom.map(p => ({ 
      _id: p._id?.toString() || p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: 'carrom'
    })),
    ...chess.map(p => ({ 
      _id: p._id?.toString() || p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: 'chess'
    })),
  ];

  return (
    <div>
      <HeroBanner />
      <SpecialOffer />

      <section className="page-shell fade-up">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Footballs</h2>
          <a href="/footballs" className="text-blue-600 hover:underline">View All {'->'}</a>
        </div>
        
        {footballs.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No footballs available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {footballs.map((football) => (
              <div
                key={football._id}
                className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
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
                  <p className="soft-text text-sm">{football.description}</p>
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

      <section className="page-shell fade-up-delay">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Cricket Bats</h2>
          <a href="/cricket-bats" className="text-blue-600 hover:underline">View All {'->'}</a>
        </div>
        
        {cricketBats.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No cricket bats available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cricketBats.map((bat) => (
              <div
                key={bat._id}
                className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square bg-gray-100">
                  {bat.image ? (
                    <img
                      src={bat.image}
                      alt={bat.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      🏏
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{bat.name}</h3>
                  <p className="soft-text text-sm">{bat.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">৳{bat.price}</span>
                    <Link href={`/cricket-bats/${bat._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="page-shell fade-up-delay">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Volleyball</h2>
          <a href="/volleyball" className="text-blue-600 hover:underline">View All {'->'}</a>
        </div>
        
        {volleyball.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No volleyball available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {volleyball.map((item) => (
              <div
                key={item._id}
                className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      🏐
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="soft-text text-sm">{item.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">৳{item.price}</span>
                    <Link href={`/volleyball/${item._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="page-shell fade-up-delay">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Handball</h2>
          <a href="/handball" className="text-blue-600 hover:underline">View All {'->'}</a>
        </div>
        
        {handball.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No handball available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {handball.map((item) => (
              <div
                key={item._id}
                className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      🤾
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="soft-text text-sm">{item.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">৳{item.price}</span>
                    <Link href={`/handball/${item._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="page-shell fade-up-delay">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Carrom</h2>
          <a href="/carrom" className="text-blue-600 hover:underline">View All {'->'}</a>
        </div>
        
        {carrom.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No carrom available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carrom.map((item) => (
              <div
                key={item._id}
                className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      🎱
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="soft-text text-sm">{item.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">৳{item.price}</span>
                    <Link href={`/carrom/${item._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="page-shell fade-up-delay">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Chess</h2>
          <a href="/chess" className="text-blue-600 hover:underline">View All {'->'}</a>
        </div>
        
        {chess.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No chess available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chess.map((item) => (
              <div
                key={item._id}
                className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      ♟
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="soft-text text-sm">{item.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">৳{item.price}</span>
                    <Link href={`/chess/${item._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ProductSlider products={allProducts} />
    </div>
  );
}