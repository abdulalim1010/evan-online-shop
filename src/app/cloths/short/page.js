import Link from "next/link";

export default function ShortPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Short Collection</h1>
          <p className="text-slate-600 mb-8">
            Stylish and comfortable shorts for sports, beach, and casual wear.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Beach Short</h3>
              <p className="text-slate-500 text-sm mb-4">Quick-dry, lightweight fabric</p>
              <Link href="/cloths/short/beach" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Running Short</h3>
              <p className="text-slate-500 text-sm mb-4">Built-in liner, moisture-wicking</p>
              <Link href="/cloths/short/running" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Denim Short</h3>
              <p className="text-slate-500 text-sm mb-4">Classic denim, casual style</p>
              <Link href="/cloths/short/denim" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
