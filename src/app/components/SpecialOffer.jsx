"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SpecialOffer() {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {
      const res = await fetch("/api/offers");
      const data = await res.json();
      if (res.ok && data.offers.length > 0) {
        setOffer(data.offers[0]);
      }
    } catch (error) {
      console.error("Failed to fetch offer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !offer) {
    return null;
  }

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <img
        src={offer.bgImage || "/offer-bg.jpg"}
        alt={offer.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
      <div className="relative z-10 flex h-full items-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 mb-4 bg-red-600 text-white text-sm font-semibold rounded">
            LIMITED TIME
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {offer.discount}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {offer.title}
          </h3>
          {offer.description && (
            <p className="text-lg text-gray-200 mb-6">
              {offer.description}
            </p>
          )}
          <Link
            href={offer.buttonLink || "/"}
            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {offer.buttonText || "Shop Now"}
          </Link>
        </div>
      </div>
    </section>
  );
}