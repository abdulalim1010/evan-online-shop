import Link from "next/link";

export default function HalfPantPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Half Pant Collection</h1>
          <p className="text-slate-600 mb-8">
            Comfortable half pants perfect for sports, gym, and casual outings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sports Half Pant</h3>
              <p className="text-slate-500 text-sm mb-4">Elastic waist, quick-dry fabric</p>
              <Link href="/cloths/half-pant/sports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Cotton Cargo Half Pant</h3>
              <p className="text-slate-500 text-sm mb-4">Multiple pockets, relaxed fit</p>
              <Link href="/cloths/half-pant/cargo" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Training Half Pant</h3>
              <p className="text-slate-500 text-sm mb-4">Flexible material, gym-ready</p>
              <Link href="/cloths/half-pant/training" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
