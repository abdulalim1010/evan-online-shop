import Link from "next/link";

export default function TrousersPantPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Trousers & Pant Collection</h1>
          <p className="text-slate-600 mb-8">
            Premium trousers and formal pants for every occasion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Formal Trousers</h3>
              <p className="text-slate-500 text-sm mb-4">Slim fit, wrinkle-resistant fabric</p>
              <Link href="/cloths/trousers-pant/formal" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Chinos</h3>
              <p className="text-slate-500 text-sm mb-4">Casual elegance, cotton twill</p>
              <Link href="/cloths/trousers-pant/chinos" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Cargo Trousers</h3>
              <p className="text-slate-500 text-sm mb-4">Durable, multiple utility pockets</p>
              <Link href="/cloths/trousers-pant/cargo" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
