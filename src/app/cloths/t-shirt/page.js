import Link from "next/link";

export default function TshirtPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">T-Shirt Collection</h1>
          <p className="text-slate-600 mb-8">
            Discover our range of comfortable and stylish t-shirts for everyday wear and sports.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Cotton T-Shirt</h3>
              <p className="text-slate-500 text-sm mb-4">100% pure cotton, soft and breathable</p>
              <Link href="/cloths/t-shirt/cotton" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sports T-Shirt</h3>
              <p className="text-slate-500 text-sm mb-4">Moisture-wicking fabric for active use</p>
              <Link href="/cloths/t-shirt/sports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">V-Neck T-Shirt</h3>
              <p className="text-slate-500 text-sm mb-4">Classic fit, available in multiple colors</p>
              <Link href="/cloths/t-shirt/vneck" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
