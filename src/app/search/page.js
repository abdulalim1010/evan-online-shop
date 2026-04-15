export const metadata = {
  title: "Search - Evan Sports",
  description: "Search products",
};

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No results found.</p>
      </div>
    </div>
  );
}