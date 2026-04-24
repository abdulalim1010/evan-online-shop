import Link from "next/link";

export default function ClothsLayout({ children }) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 py-3 text-sm">
            <Link href="/" className="text-slate-500 hover:text-blue-600">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700 font-medium">Cloths</span>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
