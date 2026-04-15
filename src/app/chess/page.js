import CategoryShowcase from "../components/CategoryShowcase";

export const metadata = {
  title: "Chess - Evan Sports",
  description: "Shop professional chess sets and learning boards.",
};

export default function ChessPage() {
  return (
    <CategoryShowcase
      title="Chess Collection"
      subtitle="Elegant chess boards, weighted pieces, and tournament accessories designed for strategy lovers."
      icon="♟️"
      points={[
        "Wooden and magnetic chess board options",
        "Weighted pieces for stable gameplay",
        "Beginner learning sets for schools",
        "Premium tournament edition boards",
      ]}
      ctaHref="/contact"
      ctaText="View Chess Selection"
    />
  );
}