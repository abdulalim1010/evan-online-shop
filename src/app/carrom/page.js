import CategoryShowcase from "../components/CategoryShowcase";

export const metadata = {
  title: "Carrom - Evan Sports",
  description: "Premium carrom boards, coins, and accessories.",
};

export default function CarromPage() {
  return (
    <CategoryShowcase
      title="Professional Carrom Collection"
      subtitle="Tournament-grade boards, smooth striker control, and durable accessories for home and club use."
      icon="🎯"
      points={[
        "Premium boards with polished playing surface",
        "Match-ready strikers and coin sets",
        "Protective covers and maintenance kits",
        "Perfect choices for beginner to pro players",
      ]}
      ctaHref="/contact"
      ctaText="Request Carrom Catalog"
    />
  );
}