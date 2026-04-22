'use client';

import Link from 'next/link';

export default function ProductSlider({ products }) {
  if (!products || products.length === 0) return null;

  const duplicatedProducts = [...products, ...products];
  const emojis = {
    footballs: '⚽',
    'cricket-bats': '🏏',
    volleyball: '🏐',
    handball: '🤾',
    carrom: '🎱',
    chess: '♟',
  };

  return (
    <section className="overflow-hidden py-4 bg-gray-50">
      <div className="mb-3 page-shell">
        <h2 className="section-title text-2xl">All Products</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden">
          <div className="animate-scroll-left product-slider-track">
            {duplicatedProducts.map((product, index) => (
              <Link 
                key={`row1-${product._id}-${index}`} 
                href={`/${product.category}/${product._id}`}
                className="w-48 flex-shrink-0 mx-3 block"
              >
                <div className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="aspect-square bg-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-3xl">
                        {emojis[product.category] || '🏃'}
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-semibold text-xs truncate">{product.name}</h3>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-blue-600 font-bold text-sm">৳{product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div className="animate-scroll-right product-slider-track">
            {duplicatedProducts.map((product, index) => (
              <Link 
                key={`row2-${product._id}-${index}`} 
                href={`/${product.category}/${product._id}`}
                className="w-48 flex-shrink-0 mx-3 block"
              >
                <div className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="aspect-square bg-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-3xl">
                        {emojis[product.category] || '🏃'}
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-semibold text-xs truncate">{product.name}</h3>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-blue-600 font-bold text-sm">৳{product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}