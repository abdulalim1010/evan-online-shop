"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ChessPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/chess");
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-shell fade-up">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell fade-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Chess Collection</h1>
        <p className="mt-2 text-slate-600">Elegant chess boards, weighted pieces, and tournament accessories.</p>
      </div>
      
      {products.length === 0 ? (
        <div className="glass-card text-center py-12">
          <p className="text-slate-500 text-lg">No chess products available yet.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square bg-gray-100 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-slate-600 text-sm mt-1">{product.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-xl">
                    ৳{product.price}
                  </span>
                  <Link href={`/chess/${product._id}`} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
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