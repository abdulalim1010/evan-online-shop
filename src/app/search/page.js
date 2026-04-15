import Link from "next/link";

export const metadata = {
  title: "Search - Evan Sports",
  description: "Search products",
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  return (
    <section className="page-shell fade-up">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-slate-600">
          {query ? `Showing results for "${query}"` : "Search by product name from the top bar."}
        </p>
        <div className="mt-8 text-center py-12 rounded-xl border border-dashed border-slate-300 bg-white">
          <p className="text-slate-500 text-lg">No results found.</p>
          <Link className="mt-4 inline-block text-blue-600 hover:underline" href="/">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}