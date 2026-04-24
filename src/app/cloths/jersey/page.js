import Link from "next/link";

export default function JerseyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Jersey Collection</h1>
          <p className="text-slate-600 mb-8">
            Browse our premium collection of sports jerseys. Perfect for athletes and fans alike.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Football Jersey</h3>
              <p className="text-slate-500 text-sm mb-4">Breathable fabric, team colors available</p>
              <Link href="/cloths/jersey/football" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Basketball Jersey</h3>
              <p className="text-slate-500 text-sm mb-4">Moisture-wicking, team fit style</p>
              <Link href="/cloths/jersey/basketball" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Cricket Jersey</h3>
              <p className="text-slate-500 text-sm mb-4">Lightweight, player edition cuts</p>
              <Link href="/cloths/jersey/cricket" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
